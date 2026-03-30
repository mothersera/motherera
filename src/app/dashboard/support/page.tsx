"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, MessageSquare, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = { role: "user" | "assistant"; content: string; loading?: boolean };

export default function SupportPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [remainingCount, setRemainingCount] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const cleanText = (text: string) => {
    return text
      .replace(/\*\*/g, "")
      .replace(/\n/g, "\n\n");
  };

  async function typeMessage(fullText: string) {
    let current = "";
    const cleaned = cleanText(fullText);
    for (let i = 0; i < cleaned.length; i++) {
      current += cleaned[i];
      setMessages(prev => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].role === "assistant") {
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: current, loading: false };
        }
        return updated;
      });
      await new Promise(res => setTimeout(res, 10));
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    const userMsg = newMessage.trim();
    setNewMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setIsLoading(true);
    const isPremium =
      session?.user?.subscriptionPlan === "premium" || session?.user?.subscriptionPlan === "specialized";
    
    setMessages(prev => [
      ...prev,
      { role: "user", content: userMsg },
      { role: "assistant", content: "Typing...", loading: true }
    ]);

    try {
      const res = await fetch("/api/mother-era-counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, userId: session?.user?.id, isPremium, history: messages }),
      });
      
      if (res.ok) {
        const data = await res.json();
        const reply = String(data?.reply || "Something went wrong. Please try again.");
        if (typeof data?.remaining === "number") setRemainingCount(data.remaining);

        await typeMessage(reply);
      } else {
        const err = await res.json().catch(() => ({} as any));
        if (err?.error === "LIMIT_REACHED") {
          setLimitReached(true);
          setMessages(prev => prev.filter(m => !m.loading));
        } else {
          setMessages(prev => {
            const updated = prev.filter(m => !m.loading);
            return [...updated, { role: "assistant", content: "Something went wrong. Please try again." }];
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => {
        const updated = prev.filter(m => !m.loading);
        return [...updated, { role: "assistant", content: "Something went wrong. Please try again." }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl h-[calc(100vh-100px)]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-6 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-medium mb-1">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">AI Counselor</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900">Live Chat</h1>
            <p className="text-stone-500 mt-1">
              Compassionate, motherhood-focused guidance. Free users get 10 messages/day.
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col border-stone-200 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="bg-white border-b border-stone-100 px-6 py-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                   <Bot className="w-6 h-6" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <CardTitle className="text-base font-bold text-stone-900">MotherEra AI Counselor</CardTitle>
                <CardDescription className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online & Ready to Help
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden p-0 bg-stone-50/50 relative">
            <div 
              ref={scrollRef} 
              className="h-full overflow-y-auto p-6 space-y-6"
              onScroll={() => {
                if (!scrollRef.current) return;
                const el = scrollRef.current;
                const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 50;
                setShowScrollBtn(!nearBottom);
              }}
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto opacity-70">
                  <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">Start a New Conversation</h3>
                  <p className="text-stone-500 text-sm">
                    Ask me anything about motherhood, parenting, or emotional support 💛
                  </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  {messages.map((msg, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      {msg.role === "user" ? (
                        <div className="bg-red-500 text-white px-4 py-2 rounded-2xl max-w-[70%] self-end shadow-md">
                          {msg.content}
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 max-w-[70%] self-start">
                          <div className="w-8 h-8 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center text-rose-600 border border-rose-200">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className={`bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl shadow-sm whitespace-pre-line ${msg.loading ? "animate-pulse" : ""}`}>
                            {msg.loading ? (
                              msg.content
                            ) : (
                              msg.content.split("\n").map((line, i) => (
                                <p key={i} className={line.trim() ? "mb-2" : "h-2"}>
                                  {line}
                                </p>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
              {showScrollBtn && (
                <div className="sticky bottom-4 flex justify-end pr-2">
                  <Button variant="outline" size="sm" className="rounded-full bg-white/70 backdrop-blur-sm" onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}>
                    Scroll to latest
                  </Button>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="sticky bottom-0 bg-white p-3 border-t flex flex-col gap-2">
            {limitReached ? (
              <div className="w-full">
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
                  <p className="text-sm text-stone-800">
                    You’ve reached your free daily limit. Upgrade to Premium for unlimited AI support and deeper personalized guidance.
                  </p>
                  <div className="mt-3 flex justify-center">
                    <Button className="rounded-full" onClick={() => (window.location.href = "/pricing")}>
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <div className="flex flex-wrap gap-2">
                  {messages.length === 0 && ["How can I improve sleep?", "What should I eat today?", "I feel overwhelmed—any tips?", "How do I build a routine?"].map((s) => (
                    <Button
                      key={s}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-white/70"
                      onClick={() => setNewMessage(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex w-full gap-2 items-end">
                  <input
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !newMessage.trim()} 
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:scale-105 transition h-10"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
                {typeof remainingCount === "number" && (
                  <div className="text-[11px] text-stone-500 text-center">
                    Free messages remaining today: {remainingCount}
                  </div>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

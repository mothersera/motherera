"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, MessageSquare, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function SupportPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatAIResponse = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\d+\.\s/g, "\n• ")
      .replace(/\n/g, "\n\n");
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {};

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    const isPremium =
      session?.user?.subscriptionPlan === "premium" || session?.user?.subscriptionPlan === "specialized";
    const outgoing = { role: "user", content: newMessage.trim() } as ChatMessage;
    setMessages(prev => [...prev, outgoing, { role: "assistant", content: "MotherEra AI is typing..." }]);
    try {
      const res = await fetch("/api/mother-era-counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.trim(), userId: session?.user?.id, isPremium, history: messages }),
      });
      if (res.ok) {
        const data = await res.json();
        const reply = String(data?.reply || "Something went wrong. Please try again.");
        setMessages(prev => {
          const updated = [...prev];
          const idx = updated.findIndex(m => m.role === "assistant" && m.content === "MotherEra AI is typing...");
          if (idx !== -1) {
            updated[idx] = { role: "assistant", content: reply };
          } else {
            updated.push({ role: "assistant", content: reply });
          }
          return updated;
        });
        setNewMessage("");
      } else {
        const err = await res.json().catch(() => ({} as any));
        if (err?.error === "LIMIT_REACHED") {
          setLimitReached(true);
          setMessages(prev => prev.filter(m => !(m.role === "assistant" && m.content === "MotherEra AI is typing...")));
        } else {
          setMessages(prev => {
            const updated = prev.filter(m => !(m.role === "assistant" && m.content === "Thinking..."));
            return [...updated, { role: "assistant", content: "Something went wrong. Please try again." }];
          });
        }
      }
    } catch {
      setMessages(prev => {
        const updated = prev.filter(m => !(m.role === "assistant" && m.content === "Thinking..."));
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
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto opacity-70">
                  <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">Start a New Conversation</h3>
                  <p className="text-stone-500 text-sm">
                    Hi {session?.user?.name?.split(' ')[0] || 'there'}! Ask anything about pregnancy, nutrition, postpartum recovery, and emotional well-being.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                      {msg.role === "user" ? (
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-end gap-2 max-w-[70%]">
                            <div className="p-4 rounded-2xl rounded-br-none text-sm leading-relaxed shadow-sm bg-red-500 text-white">
                              {msg.content}
                            </div>
                          </div>
                          <span className="text-[10px] text-stone-400 mr-1">Sent</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-end gap-3 max-w-[70%]">
                            <div className="w-8 h-8 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center text-rose-600 border border-rose-200">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl text-sm shadow-sm leading-relaxed whitespace-pre-line max-w-full">
                              {formatAIResponse(msg.content).split("\n").map((line, i) => (
                                <p key={i} className="mb-2">{line}</p>
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] text-stone-400 ml-12">Reply</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <CardFooter className="p-4 bg-white border-t border-stone-100">
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
            <form onSubmit={handleSendMessage} className="flex w-full gap-3 items-center">
              <div className="relative flex-1">
                <Input 
                  placeholder="Type your message here..." 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={isLoading}
                  className="pr-12 py-6 bg-stone-50 border-stone-200 focus-visible:ring-rose-500 rounded-xl"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !newMessage.trim()} 
                className="h-12 w-12 rounded-xl bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200 flex-shrink-0"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

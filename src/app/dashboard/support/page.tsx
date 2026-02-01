"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, MessageSquare, Bot, User, Phone, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  _id: string;
  message: string;
  status: 'open' | 'replied' | 'closed';
  createdAt: string;
  userName: string;
  adminReply?: {
    text: string;
    repliedAt: string;
    repliedBy: string;
  };
}

export default function SupportPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/support/messages");
      if (res.ok) {
        const data = await res.json();
        // Only update if data changed to prevent flickering if we were using animations improperly
        // For now, simpler is better
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/support/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
      });

      if (res.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to send message", error);
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
              <span className="text-sm uppercase tracking-wider">Expert Support</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900">Live Chat</h1>
            <p className="text-stone-500 mt-1">
              Connect directly with our care specialists. We typically reply within 1 hour.
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
                <CardTitle className="text-base font-bold text-stone-900">MotherEra Care Team</CardTitle>
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
              {isFetching ? (
                <div className="flex flex-col justify-center items-center h-full gap-3 text-stone-400">
                  <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
                  <p className="text-sm">Loading your conversation...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto opacity-70">
                  <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">Start a New Conversation</h3>
                  <p className="text-stone-500 text-sm">
                    Hi {session?.user?.name?.split(' ')[0] || 'there'}! Ask us anything about your pregnancy, nutrition, or postpartum recovery.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Intro Message */}
                  <div className="flex justify-center">
                    <span className="text-xs font-medium text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                      Chat started {new Date(messages[0].createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div key={msg._id} className="flex flex-col gap-4">
                      {/* User Message */}
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-end gap-2 max-w-[85%] md:max-w-[70%]">
                           <div className={`px-5 py-3 rounded-2xl rounded-br-none text-sm leading-relaxed shadow-sm ${
                             'bg-rose-600 text-white'
                           }`}>
                             {msg.message}
                           </div>
                           {/* Optional: User Avatar could go here */}
                        </div>
                        <span className="text-[10px] text-stone-400 mr-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {msg.status === 'open' && " • Sent"}
                          {msg.status === 'replied' && " • Replied"}
                        </span>
                      </div>

                      {/* Admin Reply */}
                      {msg.adminReply && (
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-end gap-3 max-w-[85%] md:max-w-[70%]">
                             <div className="w-8 h-8 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center text-rose-600 border border-rose-200">
                                <Bot className="w-4 h-4" />
                             </div>
                             <div className="bg-white border border-stone-200 px-5 py-3 rounded-2xl rounded-bl-none text-sm text-stone-800 shadow-sm leading-relaxed">
                               <p className="font-bold text-xs text-rose-600 mb-1">
                                 {msg.adminReply.repliedBy || 'Care Specialist'}
                               </p>
                               {msg.adminReply.text}
                             </div>
                          </div>
                          <span className="text-[10px] text-stone-400 ml-12">
                             {new Date(msg.adminReply.repliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 bg-white border-t border-stone-100">
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
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

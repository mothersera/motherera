"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"; // Assume this exists or use div with overflow

interface Message {
  _id: string;
  message: string;
  status: 'open' | 'replied' | 'closed';
  createdAt: string;
  userName: string;
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
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/support/messages");
      if (res.ok) {
        const data = await res.json();
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
        fetchMessages(); // Refresh messages
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Support Chat</h1>
          <p className="text-stone-600">Private, secure channel to ask MotherEra experts.</p>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col border-rose-100 shadow-md">
        <CardHeader className="bg-rose-50/50 border-b border-rose-100">
          <CardTitle className="text-rose-800">Chat History</CardTitle>
          <CardDescription>Your conversation with our support team.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 relative">
          <div 
            ref={scrollRef} 
            className="h-full overflow-y-auto p-4 space-y-4"
          >
            {isFetching ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-stone-500 mt-10">
                <p>No messages yet. Start a conversation below!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className={`flex flex-col ${msg.userName === session?.user?.name ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.userName === session?.user?.name 
                        ? 'bg-rose-600 text-white rounded-tr-none' 
                        : 'bg-stone-100 text-stone-800 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.message}</p>
                  </div>
                  <span className="text-xs text-stone-400 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.status !== 'open' && <span className="ml-2 capitalize">({msg.status})</span>}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t border-rose-100 bg-white">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input 
              placeholder="Type your message..." 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !newMessage.trim()} className="bg-rose-600 hover:bg-rose-700">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

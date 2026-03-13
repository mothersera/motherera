"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useFirebase } from "@/components/providers/FirebaseProvider";
import { Chat, subscribeToUserChats, subscribeToChatMessages, sendMessage, Message, reportUser, blockUser, getOrCreateChat } from "@/lib/chat";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MoreVertical, ShieldAlert, Ban, Info, Loader2 } from "lucide-react";

function MessagesContent() {
  const { firebaseUser, loading } = useFirebase();
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetUserId = searchParams.get('userId');

  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check plan
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.subscriptionPlan === 'basic') {
      router.push('/pricing?reason=messaging');
    }
  }, [session, status, router]);

  // Handle direct message link from profile
  useEffect(() => {
    // Wait for auth to be ready
    if (loading || !firebaseUser || !targetUserId) return;

    const initializeChat = async () => {
      try {
        console.log("Initializing chat with target:", targetUserId);
        
        // 1. Check if we already have the chat loaded in 'chats'
        const existingChat = chats.find(c => 
            c.participants.includes(targetUserId) && 
            c.participants.includes(firebaseUser.uid)
        );

        if (existingChat) {
            console.log("Found existing chat in state, selecting:", existingChat.id);
            setSelectedChat(existingChat);
            return;
        }

        // 2. If not found in state, try to fetch/create it from backend
        // Only do this if we haven't already selected a chat (prevent loops)
        if (!selectedChat) {
            console.log("Chat not in state, creating/fetching from backend...");
            await getOrCreateChat(firebaseUser.uid, targetUserId);
            // We rely on the subscription to update 'chats' and trigger this effect again to select it
        }

      } catch (error) {
        console.error("Error in chat initialization:", error);
      }
    };

    initializeChat();
  }, [firebaseUser, targetUserId, loading, chats]); 
  // Added chats to dependency to select it once it appears in the list

  // Subscribe to chats
  useEffect(() => {
    if (!firebaseUser) return;
    const unsubscribe = subscribeToUserChats(firebaseUser.uid, (updatedChats) => {
      setChats(updatedChats);
    });
    return () => unsubscribe();
  }, [firebaseUser]);

  // Subscribe to messages when chat selected
  useEffect(() => {
    if (!selectedChat) return;
    const unsubscribe = subscribeToChatMessages(selectedChat.id, (msgs) => {
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [selectedChat]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !firebaseUser || !newMessage.trim()) return;
    
    try {
      await sendMessage(selectedChat.id, firebaseUser.uid, newMessage);
      setNewMessage("");
    } catch (error: any) {
      alert(error.message || "Failed to send message");
    }
  };

  const handleReportUser = async () => {
    if (!selectedChat || !firebaseUser) return;
    const reason = window.prompt("Please provide a reason for reporting this user:");
    if (reason) {
      const otherUserId = selectedChat.otherUser?.id || selectedChat.participants.find(id => id !== firebaseUser.uid);
      if (otherUserId) {
        await reportUser(firebaseUser.uid, otherUserId, reason);
        alert("User reported. Thank you for keeping the community safe.");
      }
    }
  };

  const handleBlockUser = async () => {
    if (!selectedChat || !firebaseUser) return;
    if (confirm("Are you sure you want to block this user? They will not be able to message you.")) {
       const otherUserId = selectedChat.otherUser?.id || selectedChat.participants.find(id => id !== firebaseUser.uid);
       if (otherUserId) {
         await blockUser(firebaseUser.uid, otherUserId);
         alert("User blocked.");
         setSelectedChat(null); // Close chat
       }
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Chat List */}
        <Card className="col-span-1 h-full overflow-hidden flex flex-col rounded-3xl border-stone-200 shadow-sm">
           {/* Header */}
           <div className="p-6 border-b border-stone-100 bg-white">
             <h2 className="font-serif text-2xl text-stone-900">Messages</h2>
           </div>
           {/* List */}
           <div className="flex-1 overflow-y-auto bg-white">
             {chats.length === 0 ? (
                <div className="p-8 text-center text-stone-400">
                    <p>No conversations yet.</p>
                </div>
             ) : (
                chats.map(chat => (
                <div 
                    key={chat.id} 
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 border-b border-stone-50 cursor-pointer hover:bg-stone-50 transition-colors ${selectedChat?.id === chat.id ? 'bg-stone-50 border-l-4 border-l-rose-500' : 'border-l-4 border-l-transparent'}`}
                >
                    <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden shrink-0">
                        {chat.otherUser?.avatar ? (
                        <img src={chat.otherUser.avatar} alt={chat.otherUser.name} className="w-full h-full object-cover" />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold text-lg bg-stone-100">
                            {chat.otherUser?.name?.[0] || "?"}
                        </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-stone-900 truncate">{chat.otherUser?.name || "Unknown User"}</h3>
                            <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                                {chat.lastMessageTime?.seconds ? new Date(chat.lastMessageTime.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                            </span>
                        </div>
                        <p className="text-sm text-stone-500 truncate font-medium">{chat.lastMessage || "Start a conversation"}</p>
                    </div>
                    </div>
                </div>
                ))
             )}
           </div>
        </Card>

        {/* Chat Window */}
        <Card className="col-span-1 md:col-span-2 h-full flex flex-col overflow-hidden rounded-3xl border-stone-200 shadow-sm">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-white z-10 shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden">
                     {selectedChat.otherUser?.avatar ? (
                       <img src={selectedChat.otherUser.avatar} alt={selectedChat.otherUser.name} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold bg-stone-100">
                         {selectedChat.otherUser?.name?.[0] || "?"}
                       </div>
                     )}
                   </div>
                   <div>
                     <h3 className="font-bold text-stone-900">{selectedChat.otherUser?.name}</h3>
                     <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <p className="text-xs text-stone-500 font-medium">Online</p>
                     </div>
                   </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-full" title="Report User" onClick={handleReportUser}>
                        <ShieldAlert className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-900 rounded-full" onClick={handleBlockUser} title="Block User">
                        <Ban className="w-5 h-5" />
                    </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/50">
                <div className="flex justify-center">
                    <div className="bg-amber-50 border border-amber-100 text-amber-800 text-xs px-4 py-3 rounded-xl max-w-md text-center shadow-sm flex gap-2 items-start">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>
                            MotherEra messaging is intended for supportive conversations between members. 
                            Do not share personal contact details, financial information, or sensitive data. 
                            If you experience inappropriate behavior, please report the user.
                        </p>
                    </div>
                </div>
                
                {messages.map(msg => {
                  const isMe = msg.senderId === firebaseUser?.uid;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${
                        isMe 
                          ? 'bg-stone-900 text-white rounded-tr-none' 
                          : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-stone-100">
                <form onSubmit={handleSendMessage} className="flex gap-3 items-center">
                  <Input 
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a supportive message..."
                    className="flex-1 rounded-full bg-stone-50 border-stone-200 h-12 px-6 focus:ring-rose-200 focus:border-rose-300 transition-all"
                  />
                  <Button type="submit" size="icon" className="rounded-full bg-rose-500 hover:bg-rose-600 h-12 w-12 shrink-0 shadow-lg hover:shadow-xl transition-all" disabled={!newMessage.trim()}>
                    <Send className="w-5 h-5 text-white ml-0.5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-stone-400 bg-stone-50/30">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-stone-100">
                <Send className="w-8 h-8 text-rose-300 ml-1" />
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2">Your Messages</h3>
              <p className="max-w-xs text-center text-stone-500">Select a conversation from the left to start messaging other parents.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="h-[calc(100vh-100px)] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>}>
      <MessagesContent />
    </Suspense>
  );
}

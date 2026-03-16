"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useFirebase } from "@/components/providers/FirebaseProvider";
import { 
  Conversation, 
  Message, 
  getOrCreateConversation, 
  subscribeToConversations, 
  subscribeToMessages, 
  sendMessage,
  cleanupDuplicateConversations,
  setTypingStatus,
  markAsRead
} from "@/lib/chatService";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ShieldAlert, Ban, Info, Loader2, Search, X } from "lucide-react";
import { reportUser, blockUser } from "@/lib/chat"; // Keep these utils if needed, or move to chatService

function MessagesContent() {
  const { firebaseUser, loading } = useFirebase();
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetUserId = searchParams.get('userId');

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Check plan
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.subscriptionPlan === 'basic') {
      router.push('/pricing?reason=messaging');
    }
  }, [session, status, router]);

  // 2. Subscribe to user's conversation list
  useEffect(() => {
    if (!session?.user?.id) return;
    
    // Cleanup duplicates on load (can be removed later)
    cleanupDuplicateConversations(session.user.id).catch(console.error);

    // Subscribe using the new service
    const unsubscribe = subscribeToConversations(session.user.id, (updatedConversations) => {
      setConversations(updatedConversations);
      
      // Removed the logic that updates selectedConversation here.
      // Updating selectedConversation based on the list subscription causes race conditions and loops.
      // The selectedConversation should be stable and only change on user interaction.
    });
    
    return () => unsubscribe();
  }, [session?.user?.id]); // Removed selectedConversation dependency

  // 3. Handle direct message link from profile (auto-create/select)
  useEffect(() => {
    const currentUserId = session?.user?.id;
    if (loading || !currentUserId || !targetUserId) return;

    // Prevent re-running if already selected
    if (selectedConversation?.otherUser?.id === targetUserId) return;

    const initChat = async () => {
      try {
        console.log("Initializing chat with:", targetUserId);
        
        // Optimistic check: is it already in our list?
        const existing = conversations.find(c => 
            c.participants.includes(targetUserId) && 
            c.participants.includes(currentUserId)
        );

        if (existing) {
            console.log("Found existing conversation, selecting:", existing.id);
            setSelectedConversation(existing);
            return;
        }

        // If not in list, create/fetch from backend
        console.log("Creating/Fetching conversation...");
        const newConv = await getOrCreateConversation(currentUserId, targetUserId);
        
        // Fetch other user details if missing (for immediate UI display)
        if (!newConv.otherUser) {
           try {
             const res = await fetch(`/api/users/${targetUserId}`);
             if (res.ok) {
                const userData = await res.json();
                newConv.otherUser = {
                    id: targetUserId,
                    name: userData.name || "User",
                    avatar: userData.image || ""
                };
             }
           } catch(e) { console.error(e); }
        }

        setSelectedConversation(newConv);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initChat();
  }, [session?.user?.id, targetUserId, loading]); // Removed conversations dependency to prevent loop

  // 4. Subscribe to messages and mark as read
  useEffect(() => {
    if (!selectedConversation || !session?.user?.id) return;
    
    console.log("Subscribing to messages for:", selectedConversation.id);

    // Mark as read
    markAsRead(selectedConversation.id, session.user.id);

    const unsubscribe = subscribeToMessages(selectedConversation.id, (msgs) => {
      setMessages(msgs);
    });
    
    return () => unsubscribe();
  }, [selectedConversation?.id]); // Only re-run if ID changes, not other fields

  // 5. Typing Indicator Logic
  useEffect(() => {
    if (!selectedConversation || !session?.user?.id || !newMessage.trim()) {
        if (selectedConversation && session?.user?.id) {
            setTypingStatus(selectedConversation.id, session.user.id, false);
        }
        return;
    }
    
    setTypingStatus(selectedConversation.id, session.user.id, true);
    
    const timeout = setTimeout(() => {
        setTypingStatus(selectedConversation.id, session.user.id, false);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [newMessage, selectedConversation?.id, session?.user?.id]);

  // 6. User Search Debounce
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

  // 7. Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || !session?.user?.id || !newMessage.trim()) return;
    
    try {
      await sendMessage(selectedConversation.id, session.user.id, newMessage);
      setNewMessage("");
      // Reset typing status immediately
      setTypingStatus(selectedConversation.id, session.user.id, false);
    } catch (error: any) {
      alert("Failed to send message: " + error.message);
    }
  };

  const startSearchChat = async (userId: string) => {
    if (!session?.user?.id) return;
    setSearchQuery("");
    setSearchResults([]);
    
    try {
      const newConv = await getOrCreateConversation(session.user.id, userId);
      setSelectedConversation(newConv);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReportUser = async () => {
     if (!selectedConversation || !session?.user?.id) return;
     const reason = window.prompt("Reason for reporting:");
     if (reason && selectedConversation.otherUser?.id) {
         await reportUser(session.user.id, selectedConversation.otherUser.id, reason);
         alert("User reported.");
     }
  };

  const handleBlockUser = async () => {
    if (!selectedConversation || !session?.user?.id) return;
    if (confirm("Block this user?")) {
        if (selectedConversation.otherUser?.id) {
            await blockUser(session.user.id, selectedConversation.otherUser.id);
            alert("User blocked.");
            setSelectedConversation(null);
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

  const otherUserIsTyping = selectedConversation?.typingUsers?.some(uid => uid !== session?.user?.id);

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Conversation List */}
        <Card className="col-span-1 h-full overflow-hidden flex flex-col rounded-3xl border-stone-200 shadow-sm">
           <div className="p-6 border-b border-stone-100 bg-white">
             <h2 className="font-serif text-2xl text-stone-900 mb-4">Messages</h2>
             
             {/* User Search Bar */}
             <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                    className="pl-9 pr-8 rounded-full bg-stone-50 border-stone-100 focus:ring-rose-200 h-10"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="w-4 h-4 text-stone-400" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {searchQuery.length >= 2 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 z-50 max-h-60 overflow-y-auto p-2">
                    {isSearching ? (
                      <div className="p-4 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-rose-500" /></div>
                    ) : searchResults.length === 0 ? (
                      <div className="p-4 text-center text-stone-500 text-sm">No users found.</div>
                    ) : (
                      searchResults.map(user => (
                        <div 
                          key={user.id} 
                          onClick={() => startSearchChat(user.id)}
                          className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-xl cursor-pointer transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-stone-100 overflow-hidden shrink-0">
                            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-stone-400">{user.name?.[0]}</div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-stone-900 truncate">{user.name}</p>
                            <p className="text-xs text-stone-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
             </div>
           </div>

           <div className="flex-1 overflow-y-auto bg-white">
             {conversations.length === 0 ? (
                <div className="p-8 text-center text-stone-400">
                    <p>No conversations yet.</p>
                </div>
             ) : (
                conversations.map(conv => (
                <div 
                    key={conv.id} 
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 border-b border-stone-50 cursor-pointer hover:bg-stone-50 transition-colors relative ${selectedConversation?.id === conv.id ? 'bg-stone-50 border-l-4 border-l-rose-500' : 'border-l-4 border-l-transparent'}`}
                >
                    <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden shrink-0">
                        {conv.otherUser?.avatar ? (
                        <img src={conv.otherUser.avatar} alt={conv.otherUser.name} className="w-full h-full object-cover" />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold text-lg bg-stone-100">
                            {conv.otherUser?.name?.[0] || "?"}
                        </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-stone-900 truncate">{conv.otherUser?.name || "Unknown User"}</h3>
                            <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                                {conv.updatedAt?.seconds ? new Date(conv.updatedAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                            </span>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <p className={`text-sm truncate font-medium ${conv.unreadCount ? 'text-rose-600 font-bold' : 'text-stone-500'}`}>
                            {conv.typingUsers?.some(uid => uid !== session?.user?.id) ? "Typing..." : (conv.lastMessage || "Start a conversation")}
                          </p>
                          {conv.unreadCount !== undefined && conv.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                                {conv.unreadCount}
                            </div>
                          )}
                        </div>
                    </div>
                    </div>
                </div>
                ))
             )}
           </div>
        </Card>

        {/* Chat Window */}
        <Card className="col-span-1 md:col-span-2 h-full flex flex-col overflow-hidden rounded-3xl border-stone-200 shadow-sm">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-white z-10 shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden">
                     {selectedConversation.otherUser?.avatar ? (
                       <img src={selectedConversation.otherUser.avatar} alt={selectedConversation.otherUser.name} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold bg-stone-100">
                         {selectedConversation.otherUser?.name?.[0] || "?"}
                       </div>
                     )}
                   </div>
                   <div>
                     <h3 className="font-bold text-stone-900">{selectedConversation.otherUser?.name}</h3>
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
                  const isMe = msg.senderId === session?.user?.id;
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
                {otherUserIsTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-stone-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
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

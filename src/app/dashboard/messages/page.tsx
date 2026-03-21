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
  markAsRead,
  hideConversation
} from "@/lib/chatService";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ShieldAlert, Ban, Info, Loader2, Search, X, Trash2, ArrowLeft } from "lucide-react";
import { reportUser, blockUser } from "@/lib/chat"; // Keep these utils if needed, or move to chatService
import { useSwipeable } from "react-swipeable";

function SwipeableConversationItem({ 
  conversation, 
  isSelected, 
  onSelect, 
  onDelete,
  currentUserId 
}: { 
  conversation: Conversation, 
  isSelected: boolean, 
  onSelect: () => void, 
  onDelete: () => void,
  currentUserId: string
}) {
  const [swiped, setSwiped] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setSwiped(true),
    onSwipedRight: () => setSwiped(false),
    trackMouse: true
  });

  return (
    <div className="relative overflow-hidden group">
        {/* Background Action (Delete) */}
        <div className="absolute inset-0 flex justify-end items-center bg-red-500 text-white pr-4">
            <Trash2 className="w-5 h-5" />
        </div>

        {/* Swipeable Content */}
        <div 
            {...handlers}
            onClick={() => {
                if (swiped) {
                    setSwiped(false);
                } else {
                    onSelect();
                }
            }}
            className={`relative p-4 border-b border-stone-50 cursor-pointer transition-transform duration-300 ease-out bg-white ${
                isSelected ? 'bg-stone-50 border-l-4 border-l-rose-500' : 'border-l-4 border-l-transparent'
            }`}
            style={{ transform: swiped ? 'translateX(-80px)' : 'translateX(0)' }}
        >
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden shrink-0">
                    {conversation.otherUser?.avatar ? (
                    <img src={conversation.otherUser.avatar} alt={conversation.otherUser.name} className="w-full h-full object-cover" />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold text-lg bg-stone-100">
                        {conversation.otherUser?.name?.[0] || "?"}
                    </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-stone-900 truncate">{conversation.otherUser?.name || "Unknown User"}</h3>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                            {conversation.updatedAt?.seconds ? new Date(conversation.updatedAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                        </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <p className={`text-sm truncate font-medium ${conversation.unreadCount ? 'text-rose-600 font-bold' : 'text-stone-500'}`}>
                        {conversation.typingUsers?.some(uid => uid !== currentUserId) ? "Typing..." : (conversation.lastMessage || "Start a conversation")}
                        </p>
                        {conversation.unreadCount !== undefined && conversation.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                            {conversation.unreadCount}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Delete Button (Overlay for click) */}
        {swiped && (
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="absolute right-0 top-0 bottom-0 w-[80px] z-10 flex items-center justify-center"
            >
            </button>
        )}
    </div>
  );
}

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

  // Load cached conversations on mount for instant load
  useEffect(() => {
    try {
      const cached = localStorage.getItem("motherera_conversations");
      if (cached) {
        setConversations(JSON.parse(cached));
      }
    } catch (e) {
      console.error("Failed to parse cached conversations", e);
    }
  }, []);

  // Save conversations to cache when they update
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("motherera_conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

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

  // Preload last chat if none selected and not on mobile (to avoid sliding over list on mobile)
  useEffect(() => {
    // Only auto-select on desktop screens to preserve mobile UX
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop && conversations.length > 0 && !selectedConversation && !targetUserId && !searchParams.get('chat')) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations, selectedConversation, targetUserId, searchParams]);

  // 3. Handle direct message link from profile or URL params
  useEffect(() => {
    const currentUserId = session?.user?.id;
    
    // Also check if we have a chatId in URL (e.g. from notifications or direct link)
    const chatIdParam = searchParams.get('chat');
    
    if (loading || !currentUserId) return;
    
    // If we have a specific chat ID, try to select it
    if (chatIdParam && conversations.length > 0) {
        const found = conversations.find(c => c.id === chatIdParam);
        if (found && selectedConversation?.id !== found.id) {
            setSelectedConversation(found);
        }
    }

    if (!targetUserId) return;

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

    const unsubscribe = subscribeToMessages(selectedConversation.id, (newMessages, isInitial) => {
      if (isInitial) {
        setMessages(newMessages);
      } else {
        setMessages(prev => {
          // Deduplicate based on message ID
          const existingIds = new Set(prev.map(m => m.id));
          const uniqueNewMessages = newMessages.filter(m => !existingIds.has(m.id));
          
          if (uniqueNewMessages.length === 0) return prev;
          
          return [...prev, ...uniqueNewMessages];
        });
      }
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

  const handleDeleteConversation = async (conversationId: string) => {
    if (!session?.user?.id) return;
    if (confirm("Delete this conversation? It will be hidden from your list until a new message is sent.")) {
        await hideConversation(conversationId, session.user.id);
        if (selectedConversation?.id === conversationId) {
            setSelectedConversation(null);
        }
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="container mx-auto px-0 md:px-4 py-0 md:py-8 h-[calc(100vh-64px)] md:h-[calc(100vh-100px)]">
        <div className="flex md:grid md:grid-cols-3 gap-0 md:gap-6 h-full relative overflow-hidden md:overflow-visible">
          {/* Skeleton Conversation List */}
          <Card className="w-full md:col-span-1 h-full overflow-hidden flex flex-col rounded-none md:rounded-3xl border-0 md:border md:border-stone-200 shadow-none md:shadow-sm">
            <div className="p-6 border-b border-stone-100 bg-white/80">
              <div className="h-8 bg-stone-200 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="h-10 bg-stone-100 rounded-full w-full animate-pulse"></div>
            </div>
            <div className="flex-1 overflow-y-auto bg-white p-4 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stone-200 shrink-0 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-stone-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-stone-100 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Skeleton Chat Window */}
          <Card className="hidden md:flex md:col-span-2 h-full flex-col overflow-hidden rounded-3xl border border-stone-200 shadow-sm bg-stone-50/50">
            <div className="p-4 border-b border-stone-100 flex items-center gap-3 bg-white/90">
              <div className="w-11 h-11 rounded-full bg-stone-200 shrink-0 animate-pulse"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-stone-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-3 bg-stone-100 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1 p-6 flex items-center justify-center">
               <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const otherUserIsTyping = selectedConversation?.typingUsers?.some(uid => uid !== session?.user?.id);

  return (
    <div className="container mx-auto px-0 md:px-4 py-0 md:py-8 h-[calc(100vh-64px)] md:h-[calc(100vh-100px)]">
      <div className="flex md:grid md:grid-cols-3 gap-0 md:gap-6 h-full relative overflow-hidden md:overflow-visible">
        {/* Conversation List */}
        <Card className={`w-full md:col-span-1 h-full overflow-hidden flex flex-col rounded-none md:rounded-3xl border-0 md:border md:border-stone-200 shadow-none md:shadow-sm absolute md:relative transition-transform duration-300 ${selectedConversation ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-6 border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
             <h2 className="font-serif text-2xl text-stone-900 mb-4 tracking-tight">Messages</h2>
             
             {/* User Search Bar */}
             <div className="relative group">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-rose-500 transition-colors" />
                  <Input 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                    className="pl-9 pr-8 rounded-full bg-stone-50 border-stone-100 focus:ring-2 focus:ring-rose-100 focus:border-rose-300 h-10 transition-all shadow-sm"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-stone-100 rounded-full p-0.5 transition-colors">
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
                  <SwipeableConversationItem 
                    key={conv.id}
                    conversation={conv}
                    isSelected={selectedConversation?.id === conv.id}
                    onSelect={() => setSelectedConversation(conv)}
                    onDelete={() => handleDeleteConversation(conv.id)}
                    currentUserId={session?.user?.id || ""}
                  />
                ))
             )}
           </div>
        </Card>

        {/* Chat Window */}
        <Card className={`w-full md:col-span-2 h-full flex flex-col overflow-hidden rounded-none md:rounded-3xl border-0 md:border md:border-stone-200 shadow-none md:shadow-sm absolute md:relative transition-transform duration-300 ${selectedConversation ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} bg-stone-50/50`}>
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="p-3 md:p-4 border-b border-stone-100 flex justify-between items-center bg-white/90 backdrop-blur-md z-10 shadow-sm sticky top-0">
                <div className="flex items-center gap-2 md:gap-3">
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     className="md:hidden -ml-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100"
                     onClick={() => setSelectedConversation(null)}
                   >
                     <ArrowLeft className="w-5 h-5" />
                   </Button>
                   <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                     {selectedConversation.otherUser?.avatar ? (
                       <img src={selectedConversation.otherUser.avatar} alt={selectedConversation.otherUser.name} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold bg-stone-100 text-lg">
                         {selectedConversation.otherUser?.name?.[0] || "?"}
                       </div>
                     )}
                   </div>
                   <div>
                     <h3 className="font-bold text-stone-900 leading-tight">{selectedConversation.otherUser?.name}</h3>
                     <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
                        <p className="text-[10px] md:text-xs text-stone-500 font-medium">Online</p>
                     </div>
                   </div>
                </div>
                <div className="flex gap-1 md:gap-2">
                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-full h-8 w-8 md:h-10 md:w-10" title="Report User" onClick={handleReportUser}>
                        <ShieldAlert className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-900 rounded-full h-8 w-8 md:h-10 md:w-10" onClick={handleBlockUser} title="Block User">
                        <Ban className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-stone-50/50">
                <div className="flex justify-center mb-2 md:mb-4">
                    <div className="bg-amber-50 border border-amber-100 text-amber-800 text-[10px] md:text-xs px-3 py-2 md:px-4 md:py-3 rounded-xl max-w-md text-center shadow-sm flex gap-1.5 md:gap-2 items-start">
                        <Info className="w-3 h-3 md:w-4 md:h-4 shrink-0 mt-0.5" />
                        <p>
                            MotherEra messaging is intended for supportive conversations. 
                            Do not share personal contact details or sensitive data.
                        </p>
                    </div>
                </div>
                
                {messages.map(msg => {
                  const isMe = msg.senderId === session?.user?.id;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
                      <div className={`max-w-[75%] md:max-w-[70%] p-3 md:p-4 text-sm shadow-sm leading-relaxed relative ${
                        isMe 
                          ? 'bg-stone-900 text-white rounded-2xl rounded-tr-sm' 
                          : 'bg-white text-stone-800 border border-stone-100 rounded-2xl rounded-tl-sm'
                      }`}>
                        {msg.text}
                        <div className={`text-[10px] mt-1 opacity-70 ${isMe ? 'text-stone-300' : 'text-stone-400'}`}>
                          {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {otherUserIsTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-stone-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 md:p-4 bg-white border-t border-stone-100 mt-auto">
                <form onSubmit={handleSendMessage} className="flex gap-2 md:gap-3 items-center">
                  <Input 
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a supportive message..."
                    className="flex-1 rounded-full bg-stone-50 border-stone-200 h-10 md:h-12 px-4 md:px-6 focus:ring-rose-200 focus:border-rose-300 transition-all text-sm"
                  />
                  <Button type="submit" size="icon" className="rounded-full bg-rose-500 hover:bg-rose-600 h-10 w-10 md:h-12 md:w-12 shrink-0 shadow-lg hover:shadow-xl transition-all" disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 hidden md:flex flex-col items-center justify-center text-stone-400 bg-stone-50/30">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-stone-100">
                <Send className="w-10 h-10 text-rose-200 ml-1" />
              </div>
              <h3 className="text-2xl font-serif text-stone-900 mb-2 font-medium">Your Messages</h3>
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

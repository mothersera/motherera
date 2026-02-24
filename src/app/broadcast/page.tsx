"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  useCallStateHooks,
  User,
  Call,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Loader2, Users, Send, Video, AlertCircle, Heart, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const callId = "motherera-live-broadcast";
const callType = "default"; // In production, consider 'livestream' type

// --- Components ---

function BroadcastHeader({ isAdmin, onEndStream }: { isAdmin: boolean; onEndStream?: () => void }) {
  const { useParticipantCount } = useCallStateHooks();
  const participantCount = useParticipantCount();

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300 pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-2 bg-red-600/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg shadow-red-900/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold text-white tracking-widest uppercase">LIVE</span>
        </div>
        <h1 className="text-lg md:text-xl font-serif font-bold text-white hidden md:block drop-shadow-md">
          MotherEra Live
        </h1>
      </div>
      
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-white/90 text-xs md:text-sm font-medium transition-colors hover:bg-black/60">
          <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>{participantCount} Watching</span>
        </div>
        {isAdmin && (
           <Button 
             variant="destructive" 
             size="sm" 
             className="bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-900/20"
             onClick={onEndStream}
           >
             End Stream
           </Button>
        )}
      </div>
    </div>
  );
}

function ChatPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ user: string; text: string; isSystem?: boolean; time: string }[]>([
    { user: "System", text: "Welcome to the live broadcast! Please be respectful.", isSystem: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { 
      user: "You", 
      text: message, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[40vh] lg:h-full bg-white lg:border-l border-stone-100 w-full lg:w-96 flex-shrink-0 shadow-xl z-20">
      <div className="p-4 border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <h3 className="font-serif font-bold text-stone-900 flex items-center gap-2">
          Live Chat
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/30 scroll-smooth">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={cn(
              "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.user === "You" ? "self-end items-end" : "self-start items-start",
              msg.isSystem && "self-center items-center max-w-full w-full"
            )}
          >
            {!msg.isSystem && (
              <span className="text-[10px] font-semibold text-stone-400 mb-1 px-1">
                {msg.user} • {msg.time}
              </span>
            )}
            
            <div className={cn(
              "text-sm px-3.5 py-2.5 shadow-sm",
              msg.user === "You" 
                ? "bg-stone-900 text-white rounded-2xl rounded-tr-sm" 
                : msg.isSystem 
                  ? "bg-stone-100 text-stone-500 text-xs py-1 px-3 rounded-full border border-stone-200"
                  : "bg-white text-stone-800 border border-stone-100 rounded-2xl rounded-tl-sm"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-stone-100 bg-white">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something..."
              className="w-full text-sm bg-stone-50 border border-stone-200 rounded-full pl-4 pr-10 py-3 focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 outline-none transition-all placeholder:text-stone-400"
            />
            <button 
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 disabled:opacity-50 disabled:hover:bg-stone-900 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-3 flex justify-center">
           <button className="text-xs text-rose-500 font-medium flex items-center gap-1 hover:bg-rose-50 px-3 py-1 rounded-full transition-colors">
             <Heart className="w-3 h-3 fill-rose-500" /> Send Love
           </button>
        </div>
      </div>
    </div>
  );
}

function BroadcastView({ isAdmin, onEndStream }: { isAdmin: boolean; onEndStream?: () => void }) {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-black overflow-hidden">
      <div className="flex-1 flex flex-col relative h-full bg-stone-950">
        <BroadcastHeader isAdmin={isAdmin} onEndStream={onEndStream} />
        
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          <div className="w-full h-full relative">
            <StreamTheme>
              <SpeakerLayout participantsBarPosition="bottom" />
              {isAdmin && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-xl rounded-full p-1.5 border border-white/10 shadow-2xl transition-transform hover:scale-105">
                  <CallControls onLeave={onEndStream} />
                </div>
              )}
              {!isAdmin && (
                 // Hide controls for viewers or provide simplified controls if needed (e.g. just leave)
                 <div className="hidden"></div>
              )}
            </StreamTheme>
          </div>
          
          {/* Subtle gradient overlay at bottom for better text visibility if needed */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>
      
      <ChatPanel />
    </div>
  );
}

function AdminStartScreen({ onStart, isStarting }: { onStart: () => void; isStarting: boolean }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-stone-50 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-stone-200/40 rounded-full blur-3xl" />
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-white/50 relative z-10 transition-all hover:shadow-stone-200/50">
        <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner rotate-3 hover:rotate-6 transition-transform duration-500">
          <Video className="w-10 h-10 text-rose-600 drop-shadow-sm" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3 tracking-tight">
          Ready to go live?
        </h1>
        <p className="text-stone-500 mb-10 text-lg leading-relaxed">
          Start your broadcast to connect with the MotherEra community in real-time.
        </p>
        
        <Button 
          size="lg" 
          className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-full h-14 text-lg font-medium shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          onClick={onStart}
          disabled={isStarting}
        >
          {isStarting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Starting Studio...
            </>
          ) : (
            "Start Broadcast"
          )}
        </Button>
        
        <p className="mt-6 text-xs text-stone-400 font-medium">
          Only secure connections allowed.
        </p>
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function BroadcastPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // @ts-ignore - Role check
  const isAdmin = session?.user?.email === "support@motherera.com";

  // Check auth
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin?callbackUrl=/broadcast");
    }
  }, [status, router]);

  // Initialize Client
  useEffect(() => {
    if (!session?.user || !apiKey || client) return;

    const initClient = async () => {
      try {
        const userId = session.user.email?.replace(/[^a-zA-Z0-9]/g, "_") || `user_${Date.now()}`;
        const userName = session.user.name || "Anonymous";
        const userImage = session.user.image || undefined;

        const response = await fetch("/api/stream-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, name: userName, image: userImage }),
        });

        if (!response.ok) throw new Error("Failed to fetch token");
        const { token } = await response.json();

        const user: User = {
          id: userId,
          name: userName,
          image: userImage,
          type: "authenticated",
        };

        const streamClient = new StreamVideoClient({ apiKey, user, token });
        setClient(streamClient);
        
        // Pre-create call instance but don't join yet
        const streamCall = streamClient.call(callType, callId);
        setCall(streamCall);
        
        // Auto-join for non-admins
        if (!isAdmin) {
          setIsJoining(true);
          // Viewers join as 'viewer' role (cannot publish)
          await streamCall.join({ create: false });
          setIsJoined(true);
          setIsJoining(false);
        }
      } catch (err: any) {
        console.error("Stream init error:", err);
        setError(err.message || "Failed to initialize broadcast");
        setIsJoining(false);
      }
    };

    initClient();

    return () => {
      if (client) {
        // client.disconnectUser(); // Removed as it might not be available or needed
        setClient(null);
        setCall(null);
        setIsJoined(false);
      }
    };
  }, [session, status, isAdmin]); // Only run once session is ready

  // Listen for call ended event
  useEffect(() => {
    if (!call) return;

    const unsubscribe = call.on('call.ended', () => {
      router.push("/");
    });

    return () => {
      unsubscribe();
    };
  }, [call, router]);

  const handleStartBroadcast = async () => {
    if (!call) return;
    setIsJoining(true);
    try {
      // Host joins with default (admin/host) capabilities
      await call.join({ create: true });
      setIsJoined(true);
    } catch (err: any) {
      console.error("Failed to start broadcast:", err);
      setError("Failed to start broadcast. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  const handleEndStream = async () => {
    if (!call) return;
    
    if (isAdmin) {
      await call.endCall();
    }
    
    await call.leave();
    setIsJoined(false);
    router.push("/");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
        <p className="text-stone-500 font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">Connection Error</h2>
          <p className="text-stone-500 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
        <p className="text-stone-500 font-medium">Connecting to studio...</p>
      </div>
    );
  }

  // Admin Start Screen
  if (isAdmin && !isJoined) {
    return <AdminStartScreen onStart={handleStartBroadcast} isStarting={isJoining} />;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <BroadcastView isAdmin={isAdmin} onEndStream={handleEndStream} />
      </StreamCall>
    </StreamVideo>
  );
}

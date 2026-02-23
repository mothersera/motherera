"use client";

import { useState, useEffect } from "react";
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
import { Loader2, Users, Send, Video, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const callId = "motherera-live-broadcast";
const callType = "default"; // In production, consider 'livestream' type

// --- Components ---

function BroadcastHeader({ isAdmin, onEndStream }: { isAdmin: boolean; onEndStream?: () => void }) {
  const { useParticipantCount } = useCallStateHooks();
  const participantCount = useParticipantCount();

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-stone-100 shadow-sm sticky top-0 z-10 h-16">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-full">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <span className="text-xs font-bold text-rose-600 tracking-wider">LIVE</span>
        </div>
        <h1 className="text-lg font-serif font-bold text-stone-900 hidden md:block">
          MotherEra Live
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-stone-100 px-3 py-1 rounded-full text-stone-600 text-sm">
          <Users className="w-4 h-4" />
          <span className="font-medium">{participantCount} Viewers</span>
        </div>
        {isAdmin && (
           <Button 
             variant="destructive" 
             size="sm" 
             className="bg-rose-600 hover:bg-rose-700"
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
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([
    { user: "System", text: "Welcome to the live broadcast! Please be respectful." },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { user: "You", text: message }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[50vh] lg:h-full bg-white border-t lg:border-t-0 lg:border-l border-stone-100 w-full lg:w-80 flex-shrink-0">
      <div className="p-4 border-b border-stone-100 font-serif font-bold text-stone-900 bg-stone-50/50">
        Live Chat
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="text-xs font-bold text-stone-500 mb-1">{msg.user}</span>
            <p className="text-sm text-stone-800 bg-stone-50 p-2.5 rounded-2xl rounded-tl-none inline-block self-start border border-stone-100 shadow-sm">
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-stone-100 flex gap-2 bg-white">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 text-sm bg-stone-50 border border-stone-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-rose-100 focus:border-rose-300 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 bg-stone-900 text-white rounded-full hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-stone-900 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

function BroadcastView({ isAdmin, onEndStream }: { isAdmin: boolean; onEndStream?: () => void }) {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-stone-50 overflow-hidden">
      <div className="flex-1 flex flex-col relative h-full">
        <BroadcastHeader isAdmin={isAdmin} onEndStream={onEndStream} />
        
        <div className="flex-1 bg-black/95 relative flex items-center justify-center p-0 lg:p-4 overflow-hidden">
          <div className="w-full h-full lg:max-w-6xl lg:aspect-video lg:rounded-2xl overflow-hidden bg-stone-900 shadow-2xl ring-1 ring-white/10 relative">
            <StreamTheme>
              <SpeakerLayout participantsBarPosition="bottom" />
              {isAdmin && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-stone-900/90 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-xl">
                  <CallControls onLeave={onEndStream} />
                </div>
              )}
            </StreamTheme>
          </div>
        </div>
      </div>
      
      <ChatPanel />
    </div>
  );
}

function AdminStartScreen({ onStart, isStarting }: { onStart: () => void; isStarting: boolean }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-stone-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-stone-100">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Video className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">Ready to Broadcast?</h1>
        <p className="text-stone-500 mb-8">
          You are about to start a live stream for all MotherEra users. Make sure your camera and microphone are ready.
        </p>
        <Button 
          size="lg" 
          className="w-full bg-stone-900 hover:bg-rose-600 text-white rounded-full h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all"
          onClick={onStart}
          disabled={isStarting}
        >
          {isStarting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Starting...
            </>
          ) : (
            "Start Broadcast"
          )}
        </Button>
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

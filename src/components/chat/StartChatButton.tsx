"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useFirebase } from "@/components/providers/FirebaseProvider";
import { getOrCreateChat } from "@/lib/chat";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface StartChatButtonProps {
  targetUserId: string;
  targetUserName?: string;
  targetUserAvatar?: string;
  className?: string;
}

export function StartChatButton({ targetUserId, targetUserName, targetUserAvatar, className }: StartChatButtonProps) {
  const { firebaseUser } = useFirebase();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartChat = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("StartChatButton clicked:", { targetUserId, firebaseUser: firebaseUser?.uid, sessionUser: session?.user?.id });

    if (!session || session.user.subscriptionPlan === 'basic') {
      console.log("Redirecting to pricing: Plan is basic or no session");
      router.push('/pricing?reason=messaging');
      return;
    }

    // We don't necessarily need firebaseUser loaded to redirect, 
    // the messages page handles waiting for auth.
    // But we do need to know we aren't messaging ourselves.
    if (session.user.id === targetUserId) {
        console.log("Cannot message self");
        return; 
    }
    
    // Check firebaseUser if available, but don't block just for redirect if session is ok
    if (firebaseUser && firebaseUser.uid === targetUserId) {
         console.log("Cannot message self (firebase check)");
         return;
    }

    setLoading(true);
    try {
      console.log(`Redirecting to: /dashboard/messages?userId=${targetUserId}`);
      router.push(`/dashboard/messages?userId=${targetUserId}`);
    } catch (error) {
      console.error("Error redirecting to chat:", error);
      setLoading(false);
    } 
    // Note: We don't set loading false immediately if successful because the page is navigating away
  };

  // Don't render if it's the current user
  if (session?.user?.id === targetUserId) {
      console.log("StartChatButton: Hiding button because target is self", targetUserId);
      return (
        <Button variant="ghost" size="icon" disabled className="h-8 w-8 rounded-full opacity-20" title="You cannot message yourself">
            <MessageCircle className="w-4 h-4 text-stone-400" />
        </Button>
      );
  }

  return (
    <Button 
      variant={className?.includes("bg-rose-600") ? "default" : "ghost"}
      size={className?.includes("h-10") ? "default" : "icon"} 
      className={className || "h-8 w-8 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-full"}
      onClick={handleStartChat}
      disabled={loading}
      title={targetUserName ? `Message ${targetUserName}` : "Message User"}
    >
      <MessageCircle className="w-4 h-4" />
      {className?.includes("h-10") && <span className="ml-2">Message</span>}
    </Button>
  );
}

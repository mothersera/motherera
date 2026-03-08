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

    if (!session || session.user.subscriptionPlan === 'basic') {
      router.push('/pricing?reason=messaging');
      return;
    }

    if (!firebaseUser) return;
    
    // Check if target is same as current user
    if (firebaseUser.uid === targetUserId || session.user.id === targetUserId) return; 

    setLoading(true);
    try {
      await getOrCreateChat(firebaseUser.uid, targetUserId);
      router.push('/dashboard/messages');
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setLoading(false);
    }
  };

  // Don't render if it's the current user
  if (session?.user?.id === targetUserId) return null;

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={className || "h-8 w-8 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-full"}
      onClick={handleStartChat}
      disabled={loading}
      title="Message User"
    >
      <MessageCircle className="w-4 h-4" />
    </Button>
  );
}

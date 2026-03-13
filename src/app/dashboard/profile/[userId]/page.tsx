"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, User, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { StartChatButton } from "@/components/chat/StartChatButton";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const params = useParams();
  const userId = params.userId as string;
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    
    // If viewing self, redirect to the editable profile page
    if (session?.user?.id === userId) {
      router.replace('/dashboard/profile');
      return;
    }

    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) {
          throw new Error("User not found");
        }
        const data = await res.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 gap-4">
        <h2 className="text-xl font-bold text-stone-900">User not found</h2>
        <Link href="/dashboard/community">
          <Button variant="outline">Back to Community</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header Background */}
      <div className="h-48 bg-gradient-to-r from-rose-100 to-purple-100 w-full absolute top-0 left-0 z-0" />

      <div className="container mx-auto px-4 pt-24 relative z-10 max-w-4xl">
        <div className="flex items-center gap-4 mb-8 justify-between">
            <Link href="/dashboard/community">
              <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white text-stone-600 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Community
              </Button>
            </Link>
          </div>

        <div className="grid gap-8">
          {/* Profile Header Card */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-3xl font-bold border-4 border-white shadow-md overflow-hidden">
                    {userData.image ? (
                      <img src={userData.image} alt={userData.name} className="w-full h-full object-cover" />
                    ) : (
                      userData.name ? userData.name.charAt(0).toUpperCase() : <User className="w-10 h-10" />
                    )}
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-2xl font-bold text-stone-900">{userData.name}</h1>
                  <p className="text-stone-500 mb-2 capitalize">{userData.motherhoodStage?.replace('_', ' ') || 'Member'}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                    <StartChatButton 
                        targetUserId={userId} 
                        targetUserName={userData.name} 
                        targetUserAvatar={userData.image}
                        className="h-10 px-6 flex items-center gap-2 text-white bg-rose-600 hover:bg-rose-700 rounded-full shadow-md"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-8 text-center text-stone-500">
                <p>This is the public profile of {userData.name}.</p>
                <p className="text-sm mt-2">Joined {new Date(userData.createdAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

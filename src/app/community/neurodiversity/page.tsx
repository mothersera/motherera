"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, MessageSquare, Heart, Loader2, Lock, Shield, Sparkles, BookOpen, GraduationCap, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  topic?: string;
  authorName: string;
  authorId: string;
  authorImage?: string;
  createdAt: string;
  likes: string[];
}

const TOPICS = [
  "All Topics",
  "Early Diagnosis Support",
  "School-Age Navigation",
  "Teenage & Transition Years",
  "Sibling & Family Dynamics",
  "Parent Regulation & Burnout"
];

const RESOURCES = [
  { title: "Advanced IEP Negotiation Framework", type: "PDF", locked: true },
  { title: "Teen Transition Planning Toolkit", type: "PDF", locked: true },
  { title: "Expert Recorded Session: Dr. Smith", type: "Video", locked: true },
  { title: "Sensory Regulation Guide", type: "PDF", locked: false }, // One free resource
];

export default function NeurodiversityPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTopic, setCurrentTopic] = useState("All Topics");

  // Access Control Check
  useEffect(() => {
    if (status === "loading") return;
    
    const plan = session?.user?.subscriptionPlan;
    if (!session || !plan || plan === "basic") {
      router.push("/pricing?error=premium_required");
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchPosts();
  }, [currentTopic]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let url = "/api/forum/posts?category=Neurodiversity";
      if (currentTopic !== "All Topics") {
        url += `&topic=${encodeURIComponent(currentTopic)}`;
      }
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSpecialized = session?.user?.subscriptionPlan === "specialized";

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center bg-stone-50"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Premium Header */}
      <div className="bg-white border-b border-stone-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-medium mb-3">
                <Shield className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wider">Private Community</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-2">
                Neurodiverse Family Community
              </h1>
              <p className="text-stone-500 max-w-2xl">
                A structured, safe space for parents navigating the unique journey of neurodiversity.
              </p>
            </div>
            
            <Link href="/dashboard/community/create?category=Neurodiversity">
              <Button size="lg" className="bg-stone-900 hover:bg-stone-800 text-white rounded-full px-8 shadow-lg">
                <Plus className="mr-2 h-5 w-5" /> New Discussion
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar: Topics & Resources */}
          <div className="lg:col-span-1 space-y-8">
            {/* Topics Filter */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-stone-900 mb-4 px-2">Discussion Rooms</h3>
              <div className="space-y-1">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setCurrentTopic(topic)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                      currentTopic === topic 
                        ? "bg-rose-50 text-rose-700 font-bold" 
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {topic}
                    {currentTopic === topic && <Sparkles className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Locked Resources */}
            <div className="bg-stone-900 p-6 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-[40px]" />
              <div className="relative z-10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-rose-400" /> Expert Library
                </h3>
                <div className="space-y-3">
                  {RESOURCES.map((res, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-xl border ${
                        res.locked && !isSpecialized 
                          ? "border-stone-700 bg-stone-800/50 opacity-70 cursor-not-allowed" 
                          : "border-stone-700 bg-stone-800 hover:bg-stone-700 cursor-pointer"
                      } transition-colors flex items-center justify-between group`}
                    >
                      <div className="flex items-center gap-3">
                        {res.type === "Video" ? <Video className="w-4 h-4 text-stone-400" /> : <GraduationCap className="w-4 h-4 text-stone-400" />}
                        <span className="text-sm font-medium truncate max-w-[120px]">{res.title}</span>
                      </div>
                      {res.locked && !isSpecialized ? (
                        <Lock className="w-3 h-3 text-rose-500" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      )}
                    </div>
                  ))}
                </div>
                {!isSpecialized && (
                  <div className="mt-6 pt-6 border-t border-stone-700 text-center">
                    <p className="text-xs text-stone-400 mb-3">Upgrade to Specialized to unlock full toolkit.</p>
                    <Link href="/pricing">
                      <Button size="sm" variant="secondary" className="w-full rounded-full text-xs">Upgrade Now</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-900">
                {currentTopic === "All Topics" ? "Latest Discussions" : currentTopic}
              </h2>
              <span className="text-sm text-stone-500">{posts.length} discussions</span>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-100">
                <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-stone-900">No discussions yet</h3>
                <p className="text-stone-500 mb-6">Be the first to start a conversation in this room.</p>
                <Link href="/dashboard/community/create?category=Neurodiversity">
                  <Button className="bg-stone-900 text-white rounded-full">Start Discussion</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Link key={post._id} href={`/dashboard/community/${post._id}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:border-rose-100 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-xs font-bold text-rose-600">
                             {post.authorImage ? (
                               <img src={post.authorImage} alt={post.authorName} className="w-full h-full object-cover rounded-full" />
                             ) : (
                               post.authorName?.charAt(0) || 'M'
                             )}
                           </div>
                           <div>
                             <p className="text-sm font-bold text-stone-900">{post.authorName}</p>
                             <p className="text-xs text-stone-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                           </div>
                        </div>
                        {post.topic && (
                          <span className="px-2 py-1 bg-stone-50 text-stone-600 text-xs rounded-lg font-medium">
                            {post.topic}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-rose-600 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-stone-400">
                        <span className="flex items-center gap-1 group-hover:text-rose-500 transition-colors">
                          <MessageSquare className="w-3 h-3" /> Read Thread
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {post.likes?.length || 0} Likes
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
  { title: "Advanced IEP Navigation", type: "Page", locked: false, href: "/community/library/advanced-iep-navigation" },
  { title: "Teen Transition Planning", type: "Page", locked: false, href: "/community/library/teen-transition-planning" },
  { title: "Sensory Regulation", type: "Page", locked: false, href: "/community/library/sensory-regulation" },
  { title: "Expert Recorded Session: Dr. Smith", type: "Video", locked: true, href: "#" },
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

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>;

  return (
    <div className="min-h-screen bg-[#FDFCF8] selection:bg-rose-100 selection:text-rose-900 font-sans">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-rose-100/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-100/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow delay-1000" />
      </div>

      {/* Premium Header */}
      <div className="relative z-10 border-b border-stone-200/50 bg-white/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-rose-600 font-medium mb-3">
                <Shield className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Private Sanctuary</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-medium text-stone-900 mb-2 tracking-tight">
                Neurodiverse Family Community
              </h1>
              <p className="text-stone-500 max-w-2xl text-lg font-light">
                A structured, safe space for parents navigating the unique journey of neurodiversity.
              </p>
            </motion.div>
            
            <Link href="/dashboard/community/create?category=Neurodiversity">
              <Button size="lg" className="bg-stone-900 hover:bg-stone-800 text-white rounded-full px-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
                <Plus className="mr-2 h-5 w-5" /> New Discussion
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar: Topics & Resources */}
          <div className="lg:col-span-1 space-y-8">
            {/* Topics Filter */}
            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 sticky top-24">
              <h3 className="font-serif font-medium text-stone-900 mb-4 px-2 text-lg">Discussion Rooms</h3>
              <div className="space-y-1">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setCurrentTopic(topic)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                      currentTopic === topic 
                        ? "bg-rose-50 text-rose-700 font-bold shadow-sm" 
                        : "text-stone-600 hover:bg-white/80 hover:text-stone-900"
                    }`}
                  >
                    {topic}
                    {currentTopic === topic && <Sparkles className="w-3 h-3 text-rose-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Locked Resources */}
            <div className="bg-stone-900 p-6 rounded-[2rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/20 rounded-full blur-[50px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px]" />
              <div className="relative z-10">
                <h3 className="font-serif font-medium mb-6 flex items-center gap-2 text-lg">
                  <BookOpen className="w-4 h-4 text-rose-400" /> Expert Library
                </h3>
                <div className="space-y-3">
                  {RESOURCES.map((res, i) => (
                    <Link key={i} href={res.href || "#"}>
                      <div 
                        className={`p-4 rounded-xl border backdrop-blur-sm ${
                          res.locked && !isSpecialized 
                            ? "border-stone-800 bg-stone-800/30 opacity-60 cursor-not-allowed" 
                            : "border-stone-700 bg-stone-800/50 hover:bg-stone-700/80 cursor-pointer hover:border-stone-600"
                        } transition-all duration-300 flex items-center justify-between group`}
                      >
                        <div className="flex items-center gap-3">
                          {res.type === "Video" ? <Video className="w-4 h-4 text-stone-400 group-hover:text-rose-400 transition-colors" /> : <BookOpen className="w-4 h-4 text-stone-400 group-hover:text-rose-400 transition-colors" />}
                          <span className="text-sm font-medium truncate max-w-[160px] text-stone-200 group-hover:text-white transition-colors">{res.title}</span>
                        </div>
                        {res.locked && !isSpecialized ? (
                          <Lock className="w-3 h-3 text-rose-500" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgb(34,197,94)]" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                {!isSpecialized && (
                  <div className="mt-8 pt-6 border-t border-stone-800/50 text-center">
                    <p className="text-xs text-stone-400 mb-4 font-light">Upgrade to Specialized to unlock full toolkit.</p>
                    <Link href="/pricing">
                      <Button size="sm" variant="secondary" className="w-full rounded-full text-xs font-medium h-9 bg-white text-stone-900 hover:bg-stone-100">Upgrade Now</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <div className="mb-8 flex items-center justify-between px-2">
              <h2 className="text-2xl font-serif font-medium text-stone-900">
                {currentTopic === "All Topics" ? "Latest Discussions" : currentTopic}
              </h2>
              <span className="text-sm font-medium text-stone-400 bg-white/50 px-3 py-1 rounded-full border border-stone-100">{posts.length} discussions</span>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-32">
                <Loader2 className="h-10 w-10 animate-spin text-rose-500/50" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-32 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-stone-200/50 border-dashed">
                <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">No discussions yet</h3>
                <p className="text-stone-500 mb-8 font-light">Be the first to start a conversation in this room.</p>
                <Link href="/dashboard/community/create?category=Neurodiversity">
                  <Button className="bg-stone-900 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all">Start Discussion</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Link key={post._id} href={`/dashboard/community/${post._id}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/70 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-white/50 hover:border-rose-200/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-50 to-stone-50 border border-white shadow-sm flex items-center justify-center text-sm font-bold text-rose-600">
                             {post.authorImage ? (
                               <img src={post.authorImage} alt={post.authorName} className="w-full h-full object-cover rounded-full" />
                             ) : (
                               post.authorName?.charAt(0) || 'M'
                             )}
                           </div>
                           <div>
                             <p className="text-sm font-bold text-stone-900 group-hover:text-rose-600 transition-colors">{post.authorName}</p>
                             <p className="text-xs text-stone-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                           </div>
                        </div>
                        {post.topic && (
                          <span className="px-3 py-1 bg-stone-50 border border-stone-100 text-stone-500 text-xs rounded-full font-medium tracking-wide">
                            {post.topic}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-rose-600 transition-colors mb-3">
                        {post.title}
                      </h3>
                      <p className="text-stone-600 text-base leading-relaxed line-clamp-2 mb-6 font-light">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-6 text-xs font-medium text-stone-400">
                        <span className="flex items-center gap-2 group-hover:text-rose-500 transition-colors bg-stone-50 px-3 py-1.5 rounded-full">
                          <MessageSquare className="w-3 h-3" /> Read Thread
                        </span>
                        <span className="flex items-center gap-2">
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

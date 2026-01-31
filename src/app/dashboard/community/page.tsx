"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Plus, MessageSquare, Heart, Loader2, Trash2, Search, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  likes: string[];
}

const CATEGORIES = ['All', 'Pregnancy', 'Postpartum', 'Child Nutrition', 'Mental Wellness', 'Single Parents', 'General'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function CommunityContent() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, [currentCategory]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const url = currentCategory === 'All' 
        ? "/api/forum/posts" 
        : `/api/forum/posts?category=${encodeURIComponent(currentCategory)}`;
      
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

  const handleDelete = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/forum/posts/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(prev => prev.filter(p => p._id !== postId));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/50">
      {/* Premium Header Background */}
      <div className="w-full bg-white border-b border-stone-100 py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-rose-600 font-medium mb-3">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wider">Community Forum</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-4">
                Share, Connect, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                  & Grow Together
                </span>
              </h1>
              <p className="text-stone-500 text-lg max-w-2xl">
                A safe, judgment-free space for mothers to share experiences, ask questions, and support one another through every stage of the journey.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/dashboard/community/create">
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 rounded-full px-8 h-12 text-base">
                  <Plus className="mr-2 h-5 w-5" /> Start Discussion
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Navigation & Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 sticky top-24">
              <h3 className="font-bold text-stone-900 mb-6 px-2">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => router.push(`/dashboard/community?category=${encodeURIComponent(cat)}`)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                      currentCategory === cat 
                        ? "bg-stone-900 text-white shadow-md" 
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    {cat}
                    {currentCategory === cat && <Sparkles className="w-3 h-3 text-rose-300" />}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-stone-100">
                <h3 className="font-bold text-stone-900 mb-4 px-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-500" /> Trending Topics
                </h3>
                <div className="space-y-3 px-2">
                  {['#SleepTraining', '#PostpartumRecovery', '#FirstFoods', '#SelfCare'].map((tag) => (
                    <div key={tag} className="text-sm text-stone-500 hover:text-rose-600 cursor-pointer transition-colors">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-stone-100">
                <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
                  <div className="flex items-center gap-2 text-rose-700 font-bold mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Community Guidelines</span>
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    We foster a supportive environment. Be kind, respectful, and non-judgmental.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content - Posts Feed */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-rose-500" />
              </div>
            ) : posts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm"
              >
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-stone-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">No discussions yet</h3>
                <p className="text-stone-500 mb-8 max-w-md mx-auto">
                  Be the first to start a conversation in this category. Your experience matters!
                </p>
                <Link href="/dashboard/community/create">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full">
                    Start a Discussion
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {posts.map((post) => (
                  <Link key={post._id} href={`/dashboard/community/${post._id}`}>
                    <motion.div variants={item}>
                      <Card className="border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white rounded-2xl overflow-hidden group relative ring-1 ring-stone-100">
                        <CardHeader className="pb-4 pt-6 px-6 md:px-8">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-rose-600 font-bold text-sm">
                                {post.authorName?.charAt(0) || 'M'}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-stone-900">{post.authorName || 'Anonymous Mom'}</div>
                                <div className="text-xs text-stone-400">{new Date(post.createdAt).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex px-3 py-1 bg-stone-50 text-stone-600 text-xs font-medium rounded-full border border-stone-100">
                                {post.category}
                              </span>
                              {session?.user?.id === post.authorId && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                                  onClick={(e) => handleDelete(e, post._id)}
                                  title="Delete post"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-xl md:text-2xl font-serif font-bold text-stone-900 group-hover:text-rose-600 transition-colors leading-tight mb-3">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-base text-stone-600 line-clamp-2 leading-relaxed">
                            {post.content}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="px-6 md:px-8 pb-6 pt-2 flex items-center justify-between border-t border-stone-50 mt-2">
                          <div className="flex items-center gap-6 text-sm text-stone-500 font-medium">
                            <div className="flex items-center gap-2 group-hover:text-rose-500 transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              <span>Read & Reply</span>
                            </div>
                            <div className="flex items-center gap-2 group-hover:text-rose-500 transition-colors">
                              <Heart className="h-4 w-4" />
                              <span>Like</span>
                            </div>
                          </div>
                          <div className="text-xs text-stone-400 font-medium group-hover:translate-x-1 transition-transform">
                            View Thread →
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>}>
      <CommunityContent />
    </Suspense>
  );
}

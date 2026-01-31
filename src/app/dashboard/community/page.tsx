"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Plus, MessageSquare, Heart, Loader2, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Community Forum</h1>
          <p className="text-stone-600">A safe space for mothers to share and support each other.</p>
        </div>
        <Link href="/dashboard/community/create">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Plus className="mr-2 h-4 w-4" /> Create Post
          </Button>
        </Link>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={currentCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => router.push(`/dashboard/community?category=${encodeURIComponent(cat)}`)}
            className={currentCategory === cat ? "bg-stone-800 text-white" : "text-stone-600 border-stone-200"}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-100">
          <h3 className="text-lg font-medium text-stone-900">No posts found in this category</h3>
          <p className="text-stone-500 mb-4">Be the first to share your experience!</p>
          <Link href="/dashboard/community/create">
            <Button variant="outline">Create a Post</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Link key={post._id} href={`/dashboard/community/${post._id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-stone-200 group relative">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 bg-rose-50 text-rose-600 text-xs rounded-full mb-2 font-medium">
                        {post.category}
                      </span>
                      <CardTitle className="text-xl text-stone-900">{post.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-400 whitespace-nowrap">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      {session?.user?.id === post.authorId && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-stone-400 hover:text-red-600 hover:bg-red-50 -mr-2"
                          onClick={(e) => handleDelete(e, post._id)}
                          title="Delete post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {post.content}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 text-sm text-stone-500 flex gap-4">
                  <span className="font-medium text-stone-700">By {post.authorName}</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>View Discussion</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
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

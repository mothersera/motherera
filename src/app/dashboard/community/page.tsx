"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Assuming this exists or I'll use simple span
import { Plus, MessageSquare, Heart, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  createdAt: string;
  likes: string[];
}

const CATEGORIES = ['All', 'Pregnancy', 'Postpartum', 'Child Nutrition', 'Mental Wellness', 'Single Parents', 'General'];

export default function CommunityPage() {
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
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-stone-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 bg-rose-50 text-rose-600 text-xs rounded-full mb-2 font-medium">
                        {post.category}
                      </span>
                      <CardTitle className="text-xl text-stone-900">{post.title}</CardTitle>
                    </div>
                    <span className="text-xs text-stone-400 whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
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

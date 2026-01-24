"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, ArrowLeft, User, MessageCircle } from "lucide-react";

interface Comment {
  _id: string;
  content: string;
  authorName: string;
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  createdAt: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPostAndComments();
    }
  }, [params.id]);

  const fetchPostAndComments = async () => {
    setIsLoading(true);
    try {
      // Fetch Post
      const postRes = await fetch(`/api/forum/posts/${params.id}`);
      if (!postRes.ok) throw new Error("Post not found");
      const postData = await postRes.json();
      setPost(postData);

      // Fetch Comments
      const commentsRes = await fetch(`/api/forum/comments?postId=${params.id}`);
      if (commentsRes.ok) {
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forum/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: params.id,
          content: newComment
        }),
      });

      if (res.ok) {
        setNewComment("");
        // Refresh comments only
        const commentsRes = await fetch(`/api/forum/comments?postId=${params.id}`);
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        }
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-4">Post not found</h2>
        <Link href="/dashboard/community">
          <Button variant="outline">Back to Community</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/dashboard/community" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Community
      </Link>

      {/* Main Post */}
      <Card className="mb-8 border-rose-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
             <span className="px-2 py-1 bg-rose-50 text-rose-600 text-xs rounded-full font-medium">{post.category}</span>
             <span className="text-stone-400 text-xs">•</span>
             <span className="text-stone-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <CardTitle className="text-3xl text-stone-900 mb-2">{post.title}</CardTitle>
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <User className="h-4 w-4" />
            <span>Posted by {post.authorName}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-stone max-w-none text-stone-700 whitespace-pre-wrap">
            {post.content}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comments ({comments.length})
        </h3>
        
        <div className="space-y-4 mb-8">
          {comments.length === 0 ? (
            <p className="text-stone-500 italic">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-sm text-stone-900">{comment.authorName}</span>
                  <span className="text-xs text-stone-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-stone-700 text-sm">{comment.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 mb-4"
                placeholder="Write a supportive comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Post Comment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

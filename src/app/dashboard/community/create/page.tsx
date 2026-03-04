"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CATEGORIES = ['Pregnancy', 'Postpartum', 'Child Nutrition', 'Mental Wellness', 'Single Parents', 'General', 'Neurodiversity'];

const NEURODIVERSITY_TOPICS = [
  "Early Diagnosis Support",
  "School-Age Navigation",
  "Teenage & Transition Years",
  "Sibling & Family Dynamics",
  "Parent Regulation & Burnout"
];

function CreatePostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    topic: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setFormData(prev => ({ ...prev, category: categoryParam }));
    }
  }, [searchParams]);

  // Protect Neurodiversity category creation
  useEffect(() => {
    if (formData.category === 'Neurodiversity') {
      const plan = session?.user?.subscriptionPlan;
      if (plan === 'basic') {
        // Redirect if basic user tries to post in premium category
        router.push('/pricing?error=premium_required');
      }
    }
  }, [formData.category, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        if (formData.category === 'Neurodiversity') {
          router.push("/community/neurodiversity");
        } else {
          router.push("/dashboard/community");
        }
        router.refresh();
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button 
        onClick={() => router.back()} 
        className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 mb-6 text-sm text-yellow-800">
            <strong>Community Guidelines:</strong> Please be respectful, avoid medical misinformation, and support fellow members. 
            This is a safe space for everyone.
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                placeholder="Give your post a clear title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                maxLength={150}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value, topic: ""})}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {formData.category === 'Neurodiversity' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-medium text-rose-600">Discussion Room (Topic)</label>
                <select
                  className="flex h-10 w-full rounded-md border border-rose-200 bg-rose-50/50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  required
                >
                  <option value="" disabled>Select a specific room...</option>
                  {NEURODIVERSITY_TOPICS.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <textarea
                className="flex min-h-[200px] w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950"
                placeholder="Share your thoughts, questions, or experiences..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post to Community
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>}>
      <CreatePostContent />
    </Suspense>
  );
}

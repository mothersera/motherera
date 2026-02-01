"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motherhoodStage: 'pregnancy',
    dietaryPreference: 'veg'
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || session?.user?.name || '',
            email: data.email || session?.user?.email || '',
            motherhoodStage: data.motherhoodStage || 'pregnancy',
            dietaryPreference: data.dietaryPreference || 'veg'
          });
        } else {
          // Fallback to session data if profile fetch fails (e.g. 404 or first login)
          setFormData(prev => ({
            ...prev,
            name: session?.user?.name || '',
            email: session?.user?.email || ''
          }));
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        // Fallback to session data on error
        setFormData(prev => ({
          ...prev,
          name: session?.user?.name || '',
          email: session?.user?.email || ''
        }));
      } finally {
        setIsFetching(false);
      }
    }
    
    if (session) {
      fetchProfile();
    } else if (status !== 'loading') {
       // If no session and not loading, stop fetching
       setIsFetching(false);
    }
  }, [session]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          motherhoodStage: formData.motherhoodStage,
          dietaryPreference: formData.dietaryPreference
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      // Update session to reflect changes
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.name,
          motherhoodStage: formData.motherhoodStage,
          dietaryPreference: formData.dietaryPreference
        }
      });

      setMessage({ type: 'success', text: 'Profile updated successfully! Redirecting...' });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

          } catch (err: any) {
            console.error(err);
            setMessage({ type: 'error', text: err.message || 'Something went wrong. Please try again.' });
          } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">My Profile</h1>
      {/* Database IDs are intentionally hidden from the UI for security and abstraction purposes. */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-sm font-medium">Name</label>
                   <Input 
                     value={formData.name} 
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     required
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">Email</label>
                   <Input value={formData.email} disabled className="bg-stone-100" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Stage</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950"
                    value={formData.motherhoodStage}
                    onChange={(e) => setFormData({...formData, motherhoodStage: e.target.value})}
                  >
                    <option value="pregnancy">Pregnancy</option>
                    <option value="postpartum">Postpartum</option>
                    <option value="child_0_5">Child (0-5 Years)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dietary Preference</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950"
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({...formData, dietaryPreference: e.target.value})}
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="egg">Eggetarian</option>
                  </select>
                </div>
             </div>
             <Button type="submit" disabled={isLoading}>
               {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
               Save Changes
             </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

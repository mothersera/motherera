"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, Baby, Utensils, Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
          // Fallback to session data
          setFormData(prev => ({
            ...prev,
            name: session?.user?.name || '',
            email: session?.user?.email || ''
          }));
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
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
       setIsFetching(false);
    }
  }, [session, status]);

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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header Background */}
      <div className="h-48 bg-gradient-to-r from-rose-100 to-purple-100 w-full absolute top-0 left-0 z-0" />

      <div className="container mx-auto px-4 pt-24 relative z-10 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white text-stone-600 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid gap-8">
          {/* Profile Header Card */}
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-3xl font-bold border-4 border-white shadow-md">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : <User className="w-10 h-10" />}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-stone-100 hover:bg-stone-50 transition-colors">
                    <Camera className="w-4 h-4 text-stone-600" />
                  </button>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-stone-900">{formData.name || 'Your Profile'}</h1>
                  <p className="text-stone-500">{formData.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={onSubmit}>
            <Card className="border-none shadow-md">
              <CardHeader className="border-b border-stone-100 bg-white/50">
                <CardTitle className="text-xl font-bold text-stone-800">Edit Profile</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {message && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {message.type === 'success' ? '✨' : '⚠️'} {message.text}
                  </div>
                )}

                {/* Account Info Section */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-rose-500" /> Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">Full Name</label>
                      <Input 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="bg-stone-50 border-stone-200 focus:border-rose-500 focus:ring-rose-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">Email Address</label>
                      <div className="relative">
                        <Input 
                          value={formData.email} 
                          disabled 
                          className="bg-stone-100 border-stone-200 pl-10 text-stone-500" 
                        />
                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                      </div>
                      <p className="text-xs text-stone-400">Email cannot be changed</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-stone-100" />

                {/* Preferences Section */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                    <Baby className="w-4 h-4 text-rose-500" /> Your Journey
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">Current Stage</label>
                      <div className="relative">
                        <select 
                          className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 pl-10 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                          value={formData.motherhoodStage}
                          onChange={(e) => setFormData({...formData, motherhoodStage: e.target.value})}
                        >
                          <option value="pregnancy">Pregnancy</option>
                          <option value="postpartum">Postpartum</option>
                          <option value="child_0_5">Child (0-5 Years)</option>
                          <option value="toddler">Toddler Care</option>
                        </select>
                        <Baby className="absolute left-3 top-2.5 w-4 h-4 text-stone-500 pointer-events-none" />
                      </div>
                      <p className="text-xs text-stone-500">We'll customize your dashboard based on this.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">Dietary Preference</label>
                      <div className="relative">
                        <select 
                          className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 pl-10 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                          value={formData.dietaryPreference}
                          onChange={(e) => setFormData({...formData, dietaryPreference: e.target.value})}
                        >
                          <option value="veg">Vegetarian</option>
                          <option value="non-veg">Non-Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="egg">Eggetarian</option>
                        </select>
                        <Utensils className="absolute left-3 top-2.5 w-4 h-4 text-stone-500 pointer-events-none" />
                      </div>
                      <p className="text-xs text-stone-500">For personalized nutrition plans.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-4">
                  <Link href="/dashboard">
                    <Button type="button" variant="outline" className="border-stone-200 hover:bg-stone-50">
                      Cancel
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-rose-600 hover:bg-rose-700 text-white min-w-[140px]"
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

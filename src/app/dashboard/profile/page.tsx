"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, Baby, Utensils, Camera, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { StartChatButton } from "@/components/chat/StartChatButton";

function ProfileContent() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Get profile ID from URL query param if viewing another user
  const viewUserId = searchParams.get('id');
  const isViewingOther = !!viewUserId && viewUserId !== session?.user?.id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motherhoodStage: 'pregnancy',
    dietaryPreference: 'veg',
    image: '',
    expectedDueDate: '',
    childBirthDate: '',
    gestationalAgeWeeks: '',
    wellnessObjectives: [] as string[]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lifecycleMeta, setLifecycleMeta] = useState({
    stageLabel: '',
    stageId: '',
    confidence: '',
    derivedFrom: ''
  });

  const toggleObjective = (value: string) => {
    setFormData(prev => ({
      ...prev,
      wellnessObjectives: prev.wellnessObjectives.includes(value)
        ? prev.wellnessObjectives.filter(v => v !== value)
        : [...prev.wellnessObjectives, value]
    }));
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const url = isViewingOther ? `/api/user/profile?id=${viewUserId}` : '/api/user/profile';
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const expectedDueDate = typeof data?.lifecycle?.expectedDueDate === "string" ? data.lifecycle.expectedDueDate.slice(0, 10) : "";
          const childBirthDate =
            Array.isArray(data?.lifecycle?.childBirthDates) && typeof data.lifecycle.childBirthDates?.[0] === "string"
              ? data.lifecycle.childBirthDates[0].slice(0, 10)
              : "";
          const gestationalAgeWeeks = typeof data?.lifecycle?.gestationalAgeWeeks === "number" ? String(data.lifecycle.gestationalAgeWeeks) : "";
          const wellnessObjectives = Array.isArray(data?.lifecycle?.wellnessObjectives)
            ? data.lifecycle.wellnessObjectives.map((v: unknown) => String(v || "").trim()).filter(Boolean).slice(0, 12)
            : [];
          setFormData({
            name: data.name || '',
            email: data.email || '',
            motherhoodStage: data.motherhoodStage || 'pregnancy',
            dietaryPreference: data.dietaryPreference || 'veg',
            image: data.image || '',
            expectedDueDate,
            childBirthDate,
            gestationalAgeWeeks,
            wellnessObjectives
          });
          setLifecycleMeta({
            stageLabel: String(data?.lifecycle?.stageLabel || ""),
            stageId: String(data?.lifecycle?.stageId || ""),
            confidence: String(data?.lifecycle?.confidence || ""),
            derivedFrom: String(data?.lifecycle?.derivedFrom || "")
          });
        } else {
          // If viewing self and fetch fails, fallback to session data
          if (!isViewingOther) {
            setFormData(prev => ({
              ...prev,
              name: session?.user?.name || '',
              email: session?.user?.email || '',
              image: session?.user?.image || ''
            }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        if (!isViewingOther) {
            setFormData(prev => ({
            ...prev,
            name: session?.user?.name || '',
            email: session?.user?.email || '',
            image: session?.user?.image || ''
            }));
        }
      } finally {
        setIsFetching(false);
      }
    }
    
    if (session) {
      fetchProfile();
    } else if (status !== 'loading') {
       setIsFetching(false);
    }
  }, [session, status, isViewingOther, viewUserId]);

  // Handle re-fetching when URL changes
  useEffect(() => {
    // This effect ensures we refetch if the ID in the URL changes
    // The main fetch logic is in the other useEffect, but adding searchParams as a dep there is tricky
    // because it's an object. Relying on viewUserId (string) is better.
  }, [viewUserId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Please upload a valid image (JPG, PNG).' });
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setMessage({ type: 'error', text: 'Image size must be less than 2MB.' });
      return;
    }

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

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
          dietaryPreference: formData.dietaryPreference,
          image: formData.image,
          lifecycle: {
            expectedDueDate: formData.expectedDueDate || undefined,
            childBirthDate: formData.childBirthDate || undefined,
            gestationalAgeWeeks: formData.gestationalAgeWeeks ? Number(formData.gestationalAgeWeeks) : undefined,
            wellnessObjectives: formData.wellnessObjectives
          }
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
          dietaryPreference: formData.dietaryPreference,
          image: formData.image
        }
      });

      setMessage({ type: 'success', text: 'Profile updated successfully! Redirecting...' });
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (err: unknown) {
      console.error(err);
      setMessage({ type: 'error', text: (err as Error).message || 'Something went wrong. Please try again.' });
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
        <div className="flex items-center gap-4 mb-8 justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white text-stone-600 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/orders">
              <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white text-stone-600 backdrop-blur-sm border-stone-200">
                <ShoppingBag className="w-4 h-4 mr-2" /> My Orders
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
                    {formData.image ? (
                      <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      formData.name ? formData.name.charAt(0).toUpperCase() : <User className="w-10 h-10" />
                    )}
                  </div>
                  {!isViewingOther && (
                    <>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-stone-100 hover:bg-stone-50 transition-colors"
                      >
                        <Camera className="w-4 h-4 text-stone-600" />
                      </button>
                    </>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-stone-900">{formData.name || 'Your Profile'}</h1>
                  <p className="text-stone-500 mb-2">{formData.email}</p>
                  {isViewingOther && viewUserId && (
                    <StartChatButton 
                        targetUserId={viewUserId} 
                        targetUserName={formData.name} 
                        targetUserAvatar={formData.image}
                        className="h-10 px-4 flex items-center gap-2 text-white bg-rose-600 hover:bg-rose-700 rounded-full shadow-md"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Only show edit form if viewing own profile */}
          {!isViewingOther && (
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
                        <p className="text-xs text-stone-500">We&apos;ll customize your dashboard based on this.</p>
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
                            <option value="keto">Keto</option>
                          </select>
                          <Utensils className="absolute left-3 top-2.5 w-4 h-4 text-stone-500 pointer-events-none" />
                        </div>
                        <p className="text-xs text-stone-500">For personalized nutrition plans.</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-stone-100" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-stone-900 uppercase tracking-wider">Lifecycle Mapping Engine</div>
                        <div className="text-xs text-stone-500 mt-0.5">Smart stage detection with time-based progression.</div>
                      </div>
                      {(lifecycleMeta.stageLabel || lifecycleMeta.stageId) && (
                        <div className="shrink-0">
                          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-gradient-to-r from-rose-50 to-purple-50 px-3 py-1 text-xs font-semibold text-stone-800 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                            {lifecycleMeta.stageLabel || lifecycleMeta.stageId}
                          </span>
                          {lifecycleMeta.confidence && (
                            <div className="text-[11px] text-stone-400 mt-1 text-right">Confidence: {lifecycleMeta.confidence}</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white/60 backdrop-blur-md shadow-sm">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.10),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.10),transparent_45%),radial-gradient(circle_at_30%_80%,rgba(14,165,233,0.08),transparent_45%)]" />
                      <div className="relative p-5 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-stone-700">Expected due date</label>
                            <Input
                              value={formData.expectedDueDate}
                              onChange={(e) => setFormData({ ...formData, expectedDueDate: e.target.value })}
                              type="date"
                              className="bg-white/70 border-stone-200 focus:border-rose-500 focus:ring-rose-500"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-stone-700">Gestational weeks</label>
                            <Input
                              value={formData.gestationalAgeWeeks}
                              onChange={(e) => setFormData({ ...formData, gestationalAgeWeeks: e.target.value })}
                              type="number"
                              min={0}
                              max={42}
                              placeholder="e.g. 18"
                              className="bg-white/70 border-stone-200 focus:border-rose-500 focus:ring-rose-500"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-stone-700">Child birth date</label>
                            <Input
                              value={formData.childBirthDate}
                              onChange={(e) => setFormData({ ...formData, childBirthDate: e.target.value })}
                              type="date"
                              className="bg-white/70 border-stone-200 focus:border-rose-500 focus:ring-rose-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs font-medium text-stone-700">Wellness objectives</div>
                          <div className="flex flex-wrap gap-2">
                            {["Sleep", "Nutrition", "Mental Wellness", "Recovery", "Baby Care", "Routine", "Fitness", "Work-Life"].map((o) => (
                              <button
                                key={o}
                                type="button"
                                onClick={() => toggleObjective(o)}
                                className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                                  formData.wellnessObjectives.includes(o)
                                    ? "bg-rose-50 border-rose-200 text-rose-700"
                                    : "bg-white/70 border-stone-200 text-stone-600 hover:border-stone-300"
                                }`}
                                disabled={isLoading}
                              >
                                {o}
                              </button>
                            ))}
                          </div>
                          <div className="text-[11px] text-stone-500">This powers automatic stage transitions and personalization across modules.</div>
                        </div>
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
          )}
          
          {/* If viewing other, maybe show something else or just the header */}
          {isViewingOther && (
            <Card className="border-none shadow-md">
                <CardContent className="p-8 text-center text-stone-500">
                    <p>You are viewing {formData.name}&apos;s profile.</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>}>
      <ProfileContent />
    </Suspense>
  );
}

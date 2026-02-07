"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Utensils, 
  Calendar, 
  User, 
  MessageSquare, 
  HeartHandshake, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  Clock,
  Check
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    motherhoodStage?: string | null;
    subscriptionPlan?: string | null;
    subscriptionStatus?: string | null;
    dietaryPreference?: string | null;
  };
}

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

interface MealItem {
  id: string;
  meal: string;
  food: string;
  status: 'completed' | 'pending';
  time: string;
}

const DEFAULT_MEALS: MealItem[] = [
  { id: 'breakfast', meal: "Breakfast", food: "Oats Porridge with Almonds & Berries", status: "completed", time: "8:00 AM" },
  { id: 'lunch', meal: "Lunch", food: "Spinach Dal, Multigrain Roti & Curd", status: "pending", time: "1:00 PM" },
  { id: 'snack', meal: "Snack", food: "Fresh Fruit Bowl & Green Tea", status: "pending", time: "4:00 PM" },
  { id: 'dinner', meal: "Dinner", food: "Grilled Paneer Salad with Soup", status: "pending", time: "8:00 PM" },
];

const QUOTES = [
  { text: "Motherhood is the greatest thing and the hardest thing.", author: "Ricki Lake" },
  { text: "There is no way to be a perfect mother, and a million ways to be a good one.", author: "Jill Churchill" },
  { text: "To the world you may be one person; but to one person you may be the world.", author: "Dr. Seuss" },
  { text: "A mother's arms are more comforting than anyone else's.", author: "Princess Diana" },
  { text: "Motherhood: All love begins and ends there.", author: "Robert Browning" },
  { text: "The influence of a mother in the lives of her children is beyond calculation.", author: "James E. Faust" },
  { text: "Youth fades; love droops; the leaves of friendship fall; A mother’s secret hope outlives them all.", author: "Oliver Wendell Holmes" },
  { text: "Motherhood is the exquisite inconvenience of being another person's everything.", author: "Unknown" },
  { text: "A mother understands what a child does not say.", author: "Jewish Proverb" },
  { text: "Life began with waking up and loving my mother's face.", author: "George Eliot" },
  { text: "We have a secret in our culture, and it's not that birth is painful. It's that women are strong.", author: "Laura Stavoe Harm" },
  { text: "Whatever else is unsure in this stinking dunghill of a world a mother's love is not.", author: "James Joyce" },
  { text: "The natural state of motherhood is unselfishness.", author: "Jessica Lange" },
  { text: "Sometimes the strength of motherhood is greater than natural laws.", author: "Barbara Kingsolver" },
  { text: "A mother is she who can take the place of all others but whose place no one else can take.", author: "Cardinal Mermillod" }
];

export default function DashboardClient({ user }: DashboardClientProps) {
  const { update } = useSession();
  const firstName = user.name?.split(' ')[0] || 'Mom';
  const stage = user.motherhoodStage?.replace(/_/g, ' ') || 'Welcome';
  
  // Journey Stages
  const JOURNEY_STAGES = [
    { id: 'pregnancy', label: 'Pregnancy', icon: '🤰', desc: 'Tracking trimesters, health tips, and preparation.' },
    { id: 'postpartum', label: 'Postpartum', icon: '👶', desc: 'Recovery, mental wellness, and adjusting to new life.' },
    { id: 'newborn', label: 'Newborn Care', icon: '🍼', desc: 'Feeding, sleep schedules, and developmental milestones.' },
    { id: 'toddler', label: 'Toddler Care', icon: '🧸', desc: 'Nutrition, behavior, and early learning activities.' }
  ];

  const currentStageIndex = Math.max(0, JOURNEY_STAGES.findIndex(s => stage.toLowerCase().includes(s.id)) !== -1 
    ? JOURNEY_STAGES.findIndex(s => stage.toLowerCase().includes(s.id)) 
    : 0);

  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    // Calculate profile completion
    let completed = 0;
    let total = 4; // Name, Email, Stage, Dietary Preference
    
    // Check fields
    if (user.name && user.name !== 'Mother') completed++;
    if (user.email) completed++;
    if (user.motherhoodStage) completed++;
    if (user.dietaryPreference) completed++;
    
    // Calculate percentage
    setProfileCompletion(Math.round((completed / total) * 100));
    
  }, [user]);

  const [meals, setMeals] = useState<MealItem[]>([]);
  const [nextMeal, setNextMeal] = useState<string>("Lunch");
  const [dailyQuote, setDailyQuote] = useState(QUOTES[0]);
  const [waterCount, setWaterCount] = useState(0);
  const [mood, setMood] = useState<string | null>(null);

  const isPremium = user.subscriptionStatus === 'active' && user.subscriptionPlan === 'premium';
  const isSpecialized = user.subscriptionStatus === 'active' && user.subscriptionPlan === 'specialized';
  const isSubscribed = isPremium || isSpecialized;

  // Theme configurations based on plan
  const getTheme = () => {
    if (isSpecialized) {
      return {
        bgGradient: "from-amber-50 via-white to-stone-50",
        accentColor: "text-amber-700",
        accentBg: "bg-amber-50 border-amber-200",
        buttonGradient: "bg-gradient-to-r from-amber-600 to-amber-800",
        cardBorder: "border-amber-100",
        badge: "Specialized Access"
      };
    } else if (isPremium) {
      return {
        bgGradient: "from-rose-50 via-white to-stone-50",
        accentColor: "text-rose-600",
        accentBg: "bg-rose-50 border-rose-200",
        buttonGradient: "bg-gradient-to-r from-rose-500 to-rose-700",
        cardBorder: "border-rose-100",
        badge: "Premium Member"
      };
    }
    return {
      bgGradient: "from-stone-50 via-white to-stone-50",
      accentColor: "text-stone-600",
      accentBg: "bg-white border-stone-200",
      buttonGradient: "bg-stone-900",
      cardBorder: "border-stone-200",
      badge: "Free Plan"
    };
  };

  const theme = getTheme();

  useEffect(() => {
    // Check for subscription success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscribed') === 'true') {
      // Refresh the session to get the latest subscription status
      update();
      
      // Refresh the page to update session data or show a toast
      // For now, let's just clean the URL
      window.history.replaceState({}, '', '/dashboard');
      // Ideally show a toast here: "You're now on the Premium plan 🎉"
    }

    // Daily Wisdom Logic
    const todayDate = new Date();
    const startOfYear = new Date(todayDate.getFullYear(), 0, 0);
    const diff = todayDate.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const quoteIndex = dayOfYear % QUOTES.length;
    setDailyQuote(QUOTES[quoteIndex]);

    // Load wellness data
    const today = todayDate.toISOString().split('T')[0];
    const wellnessKey = `motherera_wellness_${today}_${user.email || 'guest'}`;
    const storedWellness = localStorage.getItem(wellnessKey);
    if (storedWellness) {
      const { water, currentMood } = JSON.parse(storedWellness);
      setWaterCount(water || 0);
      setMood(currentMood || null);
    }
  }, [user.email]);

  useEffect(() => {
    const fetchDailyNutrition = async () => {
      try {
        const res = await fetch('/api/nutrition-plan');
        if (res.ok) {
          const data = await res.json();
          if (data.meals) {
            // Map API meals to dashboard format
            const apiMeals = data.meals.map((m: any, index: number) => ({
              id: m.meal.toLowerCase().replace(/\s/g, ''),
              meal: m.meal,
              food: m.food,
              status: 'pending',
              time: index === 0 ? "8:00 AM" : index === 1 ? "11:00 AM" : index === 2 ? "1:00 PM" : index === 3 ? "4:00 PM" : "8:00 PM"
            }));
            
            // Check local storage for completion status
            const today = new Date().toISOString().split('T')[0];
            const storageKey = `motherera_nutrition_plan_${today}_${user.email || 'guest'}`;
            const stored = localStorage.getItem(storageKey);
            
            if (stored) {
              const storedMeals = JSON.parse(stored);
              // Merge status from storage with fresh data from API
              const mergedMeals = apiMeals.map((apiMeal: any, i: number) => ({
                ...apiMeal,
                status: storedMeals[i]?.status || 'pending'
              }));
              setMeals(mergedMeals);
              calculateNextMeal(mergedMeals);
            } else {
              setMeals(apiMeals);
              calculateNextMeal(apiMeals);
            }
          } else {
             // Fallback if no meals returned (shouldn't happen with updated API)
             setMeals(DEFAULT_MEALS);
          }
        }
      } catch (error) {
        console.error("Failed to fetch daily nutrition", error);
        setMeals(DEFAULT_MEALS);
      }
    };

    fetchDailyNutrition();
  }, [user.email]);

  const updateWellness = (newWater: number, newMood: string | null) => {
    setWaterCount(newWater);
    if (newMood !== undefined) setMood(newMood);
    
    const today = new Date().toISOString().split('T')[0];
    const wellnessKey = `motherera_wellness_${today}_${user.email || 'guest'}`;
    localStorage.setItem(wellnessKey, JSON.stringify({ 
      water: newWater, 
      currentMood: newMood !== undefined ? newMood : mood 
    }));
  };

  const calculateNextMeal = (currentMeals: MealItem[]) => {
    const next = currentMeals.find(m => m.status === 'pending');
    if (next) {
      setNextMeal(next.meal);
    } else {
      setNextMeal("All meals completed for today 🎉");
    }
  };

  const markAsDone = (index: number) => {
    const newMeals = [...meals];
    newMeals[index].status = 'completed';
    setMeals(newMeals);
    calculateNextMeal(newMeals);
    
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `motherera_nutrition_plan_${today}_${user.email || 'guest'}`;
    localStorage.setItem(storageKey, JSON.stringify(newMeals));
  };

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-[#FDFCF8] pb-20 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className={`fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b ${theme.bgGradient} to-transparent pointer-events-none -z-10`} />
      <div className={`fixed -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -z-10 ${isSpecialized ? 'bg-amber-100/30' : 'bg-purple-100/30'}`} />
      <div className={`fixed top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -z-10 ${isSpecialized ? 'bg-orange-100/30' : 'bg-rose-100/30'}`} />
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          {/* Header Section */}
          <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className={`flex items-center gap-2 font-medium mb-3 w-fit px-3 py-1 rounded-full border ${theme.accentBg} ${theme.accentColor}`}>
                <Sparkles className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-bold">{theme.badge}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-stone-900 leading-tight tracking-tight">
                {greeting}, <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isSpecialized ? 'from-amber-600 via-orange-600 to-amber-800' : 'from-rose-500 via-purple-500 to-indigo-500'} font-bold`}>
                  {firstName}
                </span>
              </h1>
              <p className="text-stone-500 mt-4 text-lg font-light tracking-wide">
                Your journey: <span className="capitalize font-medium text-stone-900 border-b-2 border-rose-200 pb-0.5">{stage}</span>
              </p>

              {/* Journey Timeline */}
              <div className="mt-6">
                <div className="flex items-start gap-0 relative">
                  {/* Connecting Line Background */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-stone-100 -z-10" />
                  
                  {JOURNEY_STAGES.map((s, i) => {
                    const isCompleted = i < currentStageIndex;
                    const isCurrent = i === currentStageIndex;
                    
                    return (
                      <div key={s.id} className="flex-1 flex flex-col items-center group relative">
                        {/* Icon Circle */}
                        <div 
                          className={`relative flex items-center justify-center w-10 h-10 rounded-full text-sm transition-all duration-300 cursor-help ${
                            isCurrent 
                              ? "bg-rose-500 text-white shadow-lg shadow-rose-200 scale-110 font-bold z-10" 
                              : isCompleted 
                                ? "bg-rose-100 text-rose-400" 
                                : "bg-stone-100 text-stone-300"
                          }`}
                        >
                          {s.icon}
                          {isCurrent && (
                            <motion.div 
                              layoutId="activeRing"
                              className="absolute inset-0 rounded-full border-2 border-rose-200" 
                              initial={{ scale: 1 }}
                              animate={{ scale: 1.5, opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 text-center bg-stone-900 text-white text-xs p-2 rounded-lg shadow-xl z-50">
                            <p className="font-bold mb-1">{s.label}</p>
                            <p className="font-light text-stone-300">{s.desc}</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                          </div>
                        </div>

                        {/* Labels */}
                        <div className="mt-3 text-center">
                          <p className={`text-xs font-bold transition-colors ${isCurrent ? "text-stone-900" : "text-stone-400"}`}>
                            {s.label}
                          </p>
                          {isCurrent && (
                            <span className="inline-block mt-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Current Stage
                            </span>
                          )}
                        </div>

                        {/* Connecting Line Fill */}
                        {i < JOURNEY_STAGES.length - 1 && (
                          <div 
                            className={`absolute top-5 left-[50%] w-full h-0.5 -z-10 transition-colors duration-500 ${
                              isCompleted ? "bg-rose-200" : "bg-transparent"
                            }`} 
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-center text-xs text-stone-400 mt-6 font-medium">
                  We’re guiding you through this stage step by step.
                </p>
              </div>
            </div>
            
            <Link href="/dashboard/subscription">
              <Button 
                size="lg" 
                className={`${
                  isSubscribed
                    ? "bg-white text-stone-900 border border-stone-200 hover:bg-stone-50"
                    : "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200" 
                } transition-all duration-300`}
              >
                {isSubscribed ? 'Manage Subscription' : 'Upgrade to Premium'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                label: "Health Status", 
                value: "Good", 
                sub: "Last check: 2d ago", 
                icon: Activity, 
                color: "text-rose-600", 
                bg: "bg-gradient-to-br from-rose-50 to-white border-rose-100",
                iconBg: "bg-white shadow-sm"
              },
              { 
                label: "Next Meal", 
                value: nextMeal, 
                sub: nextMeal.includes("completed") ? "Great job!" : meals.find(m => m.meal === nextMeal)?.food || "Healthy choice", 
                icon: Utensils, 
                color: "text-emerald-600", 
                bg: "bg-gradient-to-br from-emerald-50 to-white border-emerald-100",
                iconBg: "bg-white shadow-sm"
              },
              { 
                label: "Appointment", 
                value: "Tomorrow", 
                sub: "10:00 AM - Dr. Sharma", 
                icon: Calendar, 
                color: "text-blue-600", 
                bg: "bg-gradient-to-br from-blue-50 to-white border-blue-100",
                iconBg: "bg-white shadow-sm"
              },
              { 
                label: "Profile", 
                value: `${profileCompletion}%`, 
                sub: profileCompletion === 100 ? "All set!" : "Complete setup →", 
                icon: User, 
                color: "text-purple-600", 
                bg: "bg-gradient-to-br from-purple-50 to-white border-purple-100",
                iconBg: "bg-white shadow-sm",
                href: "/dashboard/profile"
              },
            ].map((stat, i) => (
              <Link href={stat.href || "#"} key={i} className="block group">
                <div className={`p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full border ${stat.bg}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-stone-500 text-sm font-medium mb-1 tracking-wide uppercase text-[10px]">{stat.label}</h3>
                    <div className="text-xl font-bold text-stone-900 tracking-tight">{stat.value}</div>
                    <p className={`text-xs mt-2 font-medium ${stat.href ? "text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center" : "text-stone-400"}`}>
                      {stat.sub} {stat.href && <ChevronRight className="w-3 h-3 ml-0.5" />}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area (Left) */}
            <motion.div variants={item} className="lg:col-span-2 space-y-8">
              
              {/* Nutrition Plan */}
              <Card className="border-white/40 shadow-xl shadow-stone-200/40 bg-white/60 backdrop-blur-xl overflow-hidden rounded-[2rem] ring-1 ring-stone-100">
                <CardHeader className="border-b border-stone-100/50 bg-white/40 p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-serif text-2xl text-stone-900 mb-1">Today's Nutrition</CardTitle>
                      <p className="text-sm text-stone-500">Your personalized meal plan for today</p>
                    </div>
                    <Link href={isSubscribed ? "/dashboard/nutrition-plan/full" : "/dashboard/nutrition-plan"}>
                      <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-full px-4">
                        {isSubscribed ? "View Full 7-Day Plan" : "View Full Plan"} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-stone-100/50">
                    {meals.map((item, i) => (
                      <div key={i} className="flex items-center p-6 hover:bg-stone-50/50 transition-colors group">
                        <div className="mr-4 flex flex-col items-center">
                          <div 
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                              item.status === 'completed' ? 'bg-green-500' : 'bg-stone-300'
                            }`} 
                          />
                          {i !== 3 && <div className="w-0.5 h-full bg-stone-100 mt-2" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-medium transition-colors ${item.status === 'completed' ? 'text-stone-500' : 'text-stone-900'}`}>
                              {item.meal}
                            </h4>
                            <span className="text-xs font-mono text-stone-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {item.time}
                            </span>
                          </div>
                          <p className={`text-sm transition-colors ${item.status === 'completed' ? 'text-stone-400 line-through decoration-stone-300' : 'text-stone-600'}`}>
                            {item.food}
                          </p>
                        </div>
                        <div className="ml-4 min-w-[100px] flex justify-end">
                          {item.status === 'pending' ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0"
                              onClick={() => markAsDone(i)}
                              aria-label={`Mark ${item.meal} as completed`}
                            >
                              Mark Done
                            </Button>
                          ) : (
                            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full animate-in fade-in zoom-in duration-300">
                              <Check className="w-3 h-3 mr-1" /> Done
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions / Community */}
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/dashboard/community" className="block group">
                  <div className="bg-gradient-to-br from-white to-rose-50/50 p-8 rounded-[2rem] border border-white/60 shadow-lg shadow-rose-100/20 hover:shadow-xl hover:shadow-rose-200/30 transition-all duration-300 h-full backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-rose-100">
                      <MessageSquare className="w-7 h-7 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif">Community Forum</h3>
                    <p className="text-stone-600 text-sm mb-6 leading-relaxed">Connect with other mothers, share experiences, and find your tribe.</p>
                    <div className="flex items-center text-rose-600 text-sm font-bold tracking-wide uppercase">
                      Join Discussions <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                <Link href={isSubscribed ? "/dashboard/support" : "/pricing?source=expert-support"} className="block group">
                  <div className={`p-8 rounded-[2rem] border transition-all duration-300 h-full relative overflow-hidden backdrop-blur-md ${
                    isSubscribed 
                      ? `bg-gradient-to-br from-white ${isSpecialized ? 'to-amber-50/50' : 'to-emerald-50/50'} border-white/60 hover:shadow-xl ${isSpecialized ? 'hover:shadow-amber-100/30' : 'hover:shadow-emerald-100/30'}`
                      : "bg-gradient-to-br from-white to-stone-50/50 border-white/60 hover:shadow-xl hover:shadow-stone-100/30"
                  }`}>
                    {!isSubscribed && (
                      <div className="absolute top-4 right-4 bg-amber-100/80 backdrop-blur-sm text-amber-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-amber-200 shadow-sm">
                        Premium Feature
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-stone-100">
                      <HeartHandshake className={`w-7 h-7 ${isSubscribed ? (isSpecialized ? "text-amber-500" : "text-emerald-500") : "text-stone-400"}`} />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif">Expert Support</h3>
                    <p className="text-stone-600 text-sm mb-6 leading-relaxed">Chat privately with our care team for personalized guidance.</p>
                    <div className={`flex items-center text-sm font-bold tracking-wide uppercase ${isSubscribed ? (isSpecialized ? "text-amber-600" : "text-emerald-600") : "text-stone-500"}`}>
                      {isSubscribed ? "Get Help" : "Unlock Access"} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Sidebar (Right) */}
            <motion.div variants={item} className="space-y-6">
              {/* Daily Wisdom */}
              <div className="bg-stone-900 text-white p-8 rounded-[2rem] relative overflow-hidden shadow-2xl shadow-stone-900/20 group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-stone-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-900/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6 text-stone-400">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-xs uppercase tracking-widest font-bold">Daily Wisdom</span>
                  </div>
                  <blockquote className="text-xl italic font-light leading-relaxed mb-6 font-serif text-stone-100">
                    "{dailyQuote.text}"
                  </blockquote>
                  <p className="text-xs text-stone-400 uppercase tracking-widest font-medium border-t border-stone-800 pt-4 inline-block pr-8">— {dailyQuote.author}</p>
                </div>
              </div>

              {/* Wellness Tracker */}
              <Card className="border-white/40 shadow-xl shadow-stone-200/40 bg-white/60 backdrop-blur-xl rounded-[2rem] ring-1 ring-stone-100 overflow-hidden">
                <CardHeader className="pb-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-b border-blue-100/30">
                  <CardTitle className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" /> Wellness Check-in
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-8 px-6 pb-8">
                  {/* Hydration */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-stone-600 flex items-center gap-2">
                        💧 Hydration
                      </span>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">{waterCount} / 8 glasses</span>
                    </div>
                    <div className="flex justify-between gap-1.5">
                      {[...Array(8)].map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => updateWellness(i + 1 === waterCount ? i : i + 1, null)}
                          className={`w-full h-10 rounded-xl transition-all duration-300 ${
                            i < waterCount 
                              ? "bg-gradient-to-b from-blue-400 to-blue-500 shadow-lg shadow-blue-200 scale-105" 
                              : "bg-stone-100 hover:bg-blue-50 hover:shadow-inner"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mood */}
                  <div>
                    <span className="text-sm font-medium text-stone-600 block mb-4 flex items-center gap-2">
                       ✨ How are you feeling?
                    </span>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { icon: "😊", label: "Happy", color: "hover:bg-green-50 hover:border-green-200 hover:text-green-600" },
                        { icon: "😌", label: "Calm", color: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600" },
                        { icon: "😐", label: "Okay", color: "hover:bg-stone-50 hover:border-stone-200 hover:text-stone-600" },
                        { icon: "😫", label: "Tired", color: "hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600" },
                      ].map((m) => (
                        <button
                          key={m.label}
                          onClick={() => updateWellness(waterCount, m.label)}
                          className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                            mood === m.label 
                              ? "bg-stone-900 border-stone-900 text-white scale-105 shadow-xl" 
                              : `bg-white border-stone-100 text-stone-400 ${m.color} hover:shadow-md`
                          }`}
                        >
                          <span className="text-2xl filter drop-shadow-sm">{m.icon}</span>
                          <span className="text-[10px] font-bold tracking-wide uppercase">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experts List */}
              <Card className="border-white/40 shadow-xl shadow-stone-200/40 bg-white/60 backdrop-blur-xl rounded-[2rem] ring-1 ring-stone-100">
                <CardHeader className="border-b border-stone-100/50 pb-4">
                  <CardTitle className="text-lg font-bold text-stone-900">Recommended Experts</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {[
                      { name: "Dr. Anjali Gupta", role: "Nutritionist", exp: "10 Yrs Exp", img: "bg-orange-100 text-orange-600" },
                      { name: "Ms. Riya Singh", role: "Yoga Expert", exp: "5 Yrs Exp", img: "bg-blue-100 text-blue-600" },
                      { name: "Dr. Sarah Lee", role: "Pediatrician", exp: "8 Yrs Exp", img: "bg-purple-100 text-purple-600" },
                    ].map((expert, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 hover:bg-white hover:shadow-md hover:shadow-stone-100 rounded-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-stone-100 group">
                        <div className={`w-12 h-12 rounded-2xl ${expert.img} flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform`}>
                          {expert.name.split(' ')[1][0]}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-stone-900 text-sm">{expert.name}</h4>
                          <p className="text-xs text-stone-500 font-medium">{expert.role} • {expert.exp}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-stone-300 group-hover:text-rose-500 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-2">
                    <Link href="/dashboard/experts">
                      <Button className="w-full rounded-xl" variant="outline">Find More Experts</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

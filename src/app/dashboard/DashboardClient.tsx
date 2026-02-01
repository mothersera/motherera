"use client";

import { useState, useEffect } from "react";
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

  const [meals, setMeals] = useState<MealItem[]>(DEFAULT_MEALS);
  const [nextMeal, setNextMeal] = useState<string>("Lunch");
  const [dailyQuote, setDailyQuote] = useState(QUOTES[0]);
  const [waterCount, setWaterCount] = useState(0);
  const [mood, setMood] = useState<string | null>(null);

  const isPremium = user.subscriptionPlan === 'premium' || user.subscriptionPlan === 'specialized';

  useEffect(() => {
    // Daily Wisdom Logic
    const todayDate = new Date();
    const startOfYear = new Date(todayDate.getFullYear(), 0, 0);
    const diff = todayDate.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const quoteIndex = dayOfYear % QUOTES.length;
    setDailyQuote(QUOTES[quoteIndex]);

    // Load state from local storage on mount
    const today = todayDate.toISOString().split('T')[0];
    const storageKey = `motherera_nutrition_plan_${today}_${user.email || 'guest'}`;
    const stored = localStorage.getItem(storageKey);
    
    // Load wellness data
    const wellnessKey = `motherera_wellness_${today}_${user.email || 'guest'}`;
    const storedWellness = localStorage.getItem(wellnessKey);
    if (storedWellness) {
      const { water, currentMood } = JSON.parse(storedWellness);
      setWaterCount(water || 0);
      setMood(currentMood || null);
    }
    
    if (stored) {
      try {
        const storedMeals = JSON.parse(stored);
        setMeals(storedMeals);
        calculateNextMeal(storedMeals);
      } catch (e) {
        console.error("Failed to parse stored meals", e);
        calculateNextMeal(DEFAULT_MEALS);
      }
    } else {
      calculateNextMeal(DEFAULT_MEALS);
    }
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
    <div className="min-h-screen bg-stone-50/50 pb-20">
      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-rose-50/80 to-transparent pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-medium mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wider">Dashboard</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                {greeting}, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                  {firstName}
                </span>
              </h1>
              <p className="text-stone-500 mt-3 text-lg mb-4">
                Your journey: <span className="capitalize font-medium text-stone-800">{stage}</span>
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
                  user.subscriptionPlan === 'basic' 
                    ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200" 
                    : "bg-white text-stone-900 border border-stone-200 hover:bg-stone-50"
                } transition-all duration-300`}
              >
                {user.subscriptionPlan === 'basic' ? 'Upgrade to Premium' : 'Manage Subscription'}
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
                color: "text-rose-500", 
                bg: "bg-rose-50" 
              },
              { 
                label: "Next Meal", 
                value: nextMeal, 
                sub: nextMeal.includes("completed") ? "Great job!" : meals.find(m => m.meal === nextMeal)?.food || "Healthy choice", 
                icon: Utensils, 
                color: "text-emerald-500", 
                bg: "bg-emerald-50" 
              },
              { 
                label: "Appointment", 
                value: "Tomorrow", 
                sub: "10:00 AM - Dr. Sharma", 
                icon: Calendar, 
                color: "text-blue-500", 
                bg: "bg-blue-50" 
              },
              { 
                label: "Profile", 
                value: "85%", 
                sub: "Complete setup →", 
                icon: User, 
                color: "text-purple-500", 
                bg: "bg-purple-50",
                href: "/dashboard/profile"
              },
            ].map((stat, i) => (
              <Link href={stat.href || "#"} key={i} className="block group">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:border-stone-200 transition-all duration-300 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-stone-500 text-sm font-medium mb-1">{stat.label}</h3>
                    <div className="text-xl font-bold text-stone-900">{stat.value}</div>
                    <p className={`text-xs mt-1 ${stat.href ? "text-rose-600 font-medium group-hover:translate-x-1 transition-transform inline-block" : "text-stone-400"}`}>
                      {stat.sub}
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
              <Card className="border-none shadow-lg shadow-stone-200/50 bg-white overflow-hidden rounded-3xl">
                <CardHeader className="border-b border-stone-100 bg-white/50 p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-xl text-stone-900">Today's Nutrition</CardTitle>
                    <Link href="/dashboard/nutrition-plan">
                      <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                        View Full Plan
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-stone-100">
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
                  <div className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-3xl border border-rose-100 hover:shadow-lg hover:shadow-rose-100/50 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6 text-rose-500" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">Community Forum</h3>
                    <p className="text-stone-600 text-sm mb-4">Connect with other mothers, share experiences, and find your tribe.</p>
                    <div className="flex items-center text-rose-600 text-sm font-medium">
                      Join Discussions <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                <Link href={isPremium ? "/dashboard/support" : "/pricing?source=expert-support"} className="block group">
                  <div className={`p-6 rounded-3xl border transition-all duration-300 h-full relative overflow-hidden ${
                    isPremium 
                      ? "bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/50" 
                      : "bg-gradient-to-br from-amber-50 to-white border-amber-300 hover:shadow-lg hover:shadow-amber-100/50"
                  }`}>
                    {!isPremium && (
                      <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border border-amber-200">
                        Premium Feature
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <HeartHandshake className={`w-6 h-6 ${isPremium ? "text-emerald-500" : "text-amber-500"}`} />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">Expert Support</h3>
                    <p className="text-stone-600 text-sm mb-4">Chat privately with our care team for personalized guidance.</p>
                    <div className={`flex items-center text-sm font-medium ${isPremium ? "text-emerald-600" : "text-amber-600"}`}>
                      {isPremium ? "Get Help" : "Unlock Access"} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Sidebar (Right) */}
            <motion.div variants={item} className="space-y-6">
              {/* Daily Wisdom */}
              <div className="bg-stone-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-stone-800 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <h3 className="font-serif text-xl mb-4 text-stone-200">Daily Wisdom</h3>
                  <blockquote className="text-lg italic font-light leading-relaxed mb-4">
                    "{dailyQuote.text}"
                  </blockquote>
                  <p className="text-xs text-stone-400 uppercase tracking-widest">— {dailyQuote.author}</p>
                </div>
              </div>

              {/* Wellness Tracker */}
              <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                  <CardTitle className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" /> Wellness Check-in
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Hydration */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-stone-600">Hydration</span>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{waterCount} / 8 glasses</span>
                    </div>
                    <div className="flex justify-between gap-1">
                      {[...Array(8)].map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => updateWellness(i + 1 === waterCount ? i : i + 1, null)}
                          className={`w-full h-8 rounded-lg transition-all duration-300 ${
                            i < waterCount 
                              ? "bg-blue-400 shadow-md shadow-blue-200 scale-105" 
                              : "bg-stone-100 hover:bg-blue-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mood */}
                  <div>
                    <span className="text-sm font-medium text-stone-600 block mb-3">How are you feeling?</span>
                    <div className="flex justify-between gap-2">
                      {[
                        { icon: "😊", label: "Happy", color: "hover:bg-green-50 hover:border-green-200" },
                        { icon: "😌", label: "Calm", color: "hover:bg-blue-50 hover:border-blue-200" },
                        { icon: "😐", label: "Okay", color: "hover:bg-stone-50 hover:border-stone-200" },
                        { icon: "😫", label: "Tired", color: "hover:bg-amber-50 hover:border-amber-200" },
                      ].map((m) => (
                        <button
                          key={m.label}
                          onClick={() => updateWellness(waterCount, m.label)}
                          className={`flex-1 p-2 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1 ${
                            mood === m.label 
                              ? "bg-stone-900 border-stone-900 text-white scale-105 shadow-md" 
                              : `bg-white border-stone-100 text-stone-600 ${m.color}`
                          }`}
                        >
                          <span className="text-xl">{m.icon}</span>
                          <span className="text-[10px] font-medium">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experts List */}
              <Card className="border-none shadow-sm bg-white rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-stone-900">Recommended Experts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Dr. Anjali Gupta", role: "Nutritionist", exp: "10 Yrs Exp", img: "bg-orange-100 text-orange-600" },
                      { name: "Ms. Riya Singh", role: "Yoga Expert", exp: "5 Yrs Exp", img: "bg-blue-100 text-blue-600" },
                      { name: "Dr. Sarah Lee", role: "Pediatrician", exp: "8 Yrs Exp", img: "bg-purple-100 text-purple-600" },
                    ].map((expert, i) => (
                      <div key={i} className="flex items-center gap-4 p-2 hover:bg-stone-50 rounded-xl transition-colors cursor-pointer">
                        <div className={`w-12 h-12 rounded-full ${expert.img} flex items-center justify-center font-bold text-sm`}>
                          {expert.name.split(' ')[1][0]}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-stone-900 text-sm">{expert.name}</h4>
                          <p className="text-xs text-stone-500">{expert.role} • {expert.exp}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-stone-400">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <Link href="/dashboard/experts">
                      <Button className="w-full" variant="outline">Find More Experts</Button>
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

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

export default function DashboardClient({ user }: DashboardClientProps) {
  const firstName = user.name?.split(' ')[0] || 'Mom';
  const stage = user.motherhoodStage?.replace(/_/g, ' ') || 'Welcome';
  
  const [meals, setMeals] = useState<MealItem[]>(DEFAULT_MEALS);

  useEffect(() => {
    // Load state from local storage on mount
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `motherera_nutrition_plan_${today}_${user.email || 'guest'}`;
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
      try {
        setMeals(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored meals", e);
      }
    } else {
      // If it's a new day (no storage for today), we could reset breakfast to pending if desired.
      // For now, we'll respect the default mock state where Breakfast is already done.
    }
  }, [user.email]);

  const markAsDone = (index: number) => {
    const newMeals = [...meals];
    newMeals[index].status = 'completed';
    setMeals(newMeals);
    
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
              <p className="text-stone-500 mt-3 text-lg">
                Your journey: <span className="capitalize font-medium text-stone-800">{stage}</span>
              </p>
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
                value: "Lunch", 
                sub: "Spinach Dal & Roti", 
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
                sub: "Complete setup", 
                icon: User, 
                color: "text-purple-500", 
                bg: "bg-purple-50" 
              },
            ].map((stat, i) => (
              <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-stone-500 text-sm font-medium mb-1">{stat.label}</h3>
                  <div className="text-xl font-bold text-stone-900">{stat.value}</div>
                  <p className="text-xs text-stone-400 mt-1">{stat.sub}</p>
                </div>
              </div>
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

                <Link href="/dashboard/support" className="block group">
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-3xl border border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <HeartHandshake className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">Expert Support</h3>
                    <p className="text-stone-600 text-sm mb-4">Chat privately with our care team for personalized guidance.</p>
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      Get Help <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                    "Motherhood is the greatest thing and the hardest thing."
                  </blockquote>
                  <p className="text-xs text-stone-400 uppercase tracking-widest">— Ricki Lake</p>
                </div>
              </div>

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

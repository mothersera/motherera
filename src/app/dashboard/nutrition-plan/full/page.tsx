
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Check, Lock, ChevronRight, Sparkles, Coffee, Sun, Moon, Utensils, Apple } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Meal {
  name: string;
  description: string;
  benefits: string;
}

interface DailyPlan {
  day: number;
  meals: {
    breakfast: Meal;
    midMorningSnack: Meal;
    lunch: Meal;
    eveningSnack: Meal;
    dinner: Meal;
  };
}

interface FullPlan {
  dietType: string;
  stage: string;
  days: DailyPlan[];
  supplements: string[];
}

export default function FullDietPlanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<'select' | 'plan'>('select');
  const [plan, setPlan] = useState<FullPlan | null>(null);
  const [selectedDiet, setSelectedDiet] = useState<string>("");
  const [dietOptions, setDietOptions] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      checkAccessAndFetch();
    }
  }, [status]);

  const checkAccessAndFetch = async () => {
    try {
      const res = await fetch('/api/nutrition-plan/full');
      
      if (res.status === 403) {
        router.push('/pricing?source=diet-plan');
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setPlan(data.plan);
        setDietOptions(data.dietOptions);
        setSelectedDiet(data.userPreference);
        // If plan exists, go straight to plan view? Or let them choose?
        // Let's default to selection view if they want to change, but show plan if generated.
        // Actually, let's show selection first to confirm intent, or just show plan.
        // Prompt says: "Page 1: Selection... Page 2: 7-Day Plan"
        setStep('select'); 
      }
    } catch (error) {
      console.error("Error fetching plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/nutrition-plan/full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dietType: selectedDiet }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setPlan(data.plan);
        setStep('plan');
      }
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] pb-20">
      <div className="fixed top-0 left-0 w-full h-[400px] bg-gradient-to-b from-rose-50 via-white to-transparent -z-10" />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-rose-600 font-bold mb-2 uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" /> Premium Feature
          </div>
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
            Full 7-Day Diet Plan
          </h1>
          <p className="text-stone-600 text-lg">
            Personalized nutrition roadmap for your {plan?.stage} journey.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Card className="border-none shadow-xl shadow-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Choose Your Preference</CardTitle>
                  <CardDescription>Select a diet type to generate your customized weekly plan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dietOptions.map((option) => (
                      <div 
                        key={option.id}
                        onClick={() => setSelectedDiet(option.id)}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${
                          selectedDiet === option.id 
                            ? "border-rose-500 bg-rose-50 shadow-md" 
                            : "border-stone-100 bg-white hover:border-rose-200 hover:shadow-lg"
                        }`}
                      >
                        {selectedDiet === option.id && (
                          <div className="absolute top-3 right-3 text-rose-600 bg-white rounded-full p-1 shadow-sm">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                        <h3 className={`font-bold text-lg mb-2 ${selectedDiet === option.id ? "text-rose-700" : "text-stone-800"}`}>
                          {option.label}
                        </h3>
                        <p className="text-sm text-stone-500 leading-relaxed">
                          {option.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button 
                      size="lg" 
                      onClick={handleGenerate} 
                      disabled={isGenerating}
                      className="bg-gradient-to-r from-rose-500 to-rose-700 text-white shadow-lg shadow-rose-200 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-8"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                        </>
                      ) : (
                        <>
                          Generate My 7-Day Plan <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'plan' && plan && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Controls */}
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-stone-500 font-medium">Current Plan:</span>
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-bold capitalize">
                    {plan.dietType}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep('select')} className="text-stone-500 hover:text-stone-900">
                  Switch Diet
                </Button>
              </div>

              {/* Supplements Card */}
              <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-indigo-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Recommended Supplements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {plan.supplements.map((sup, i) => (
                      <div key={i} className="bg-white text-indigo-700 px-4 py-2 rounded-xl font-medium shadow-sm border border-indigo-100">
                        {sup}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-indigo-400 font-medium italic">
                    * Always consult a healthcare professional before taking supplements.
                  </p>
                </CardContent>
              </Card>

              {/* 7 Days Grid */}
              <div className="space-y-6">
                {plan.days.map((day) => (
                  <Card key={day.day} className="overflow-hidden border-stone-200 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="bg-stone-50 border-b border-stone-100 py-4">
                      <CardTitle className="text-lg font-bold text-stone-800 flex items-center">
                        <span className="bg-stone-900 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">
                          {day.day}
                        </span>
                        Day {day.day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-stone-100">
                        <MealItem type="Breakfast" icon={<Coffee className="w-4 h-4 text-amber-600" />} meal={day.meals.breakfast} />
                        <MealItem type="Mid-Morning" icon={<Apple className="w-4 h-4 text-red-500" />} meal={day.meals.midMorningSnack} />
                        <MealItem type="Lunch" icon={<Sun className="w-4 h-4 text-orange-500" />} meal={day.meals.lunch} />
                        <MealItem type="Evening Snack" icon={<Coffee className="w-4 h-4 text-stone-500" />} meal={day.meals.eveningSnack} />
                        <MealItem type="Dinner" icon={<Utensils className="w-4 h-4 text-blue-500" />} meal={day.meals.dinner} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MealItem({ type, icon, meal }: { type: string, icon: React.ReactNode, meal: Meal }) {
  return (
    <div className="p-4 md:p-6 flex gap-4 md:gap-6 hover:bg-stone-50/50 transition-colors">
      <div className="w-24 flex-shrink-0 pt-1">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
          {icon} {type}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-stone-900 text-base mb-1">{meal.name}</h4>
        <p className="text-stone-600 text-sm mb-2 leading-relaxed">{meal.description}</p>
        <div className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md font-medium border border-green-100">
          🌱 {meal.benefits}
        </div>
      </div>
    </div>
  );
}

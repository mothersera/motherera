"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Utensils, Coffee, Sun, Moon, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MealPlan {
  title: string;
  description: string;
  calories: number;
  nutrients: {
    protein: string;
    carbs: string;
    fats: string;
    fiber: string;
  };
  meals: {
    breakfast: string[];
    midMorningSnack: string[];
    lunch: string[];
    eveningSnack: string[];
    dinner: string[];
    bedtime: string[];
  };
}

export default function NutritionPlanPage() {
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const res = await fetch('/api/nutrition-plan');
        if (!res.ok) {
           if (res.status === 404) {
             throw new Error("No plan found for your current profile settings. Please update your profile.");
           }
           throw new Error("Failed to load nutrition plan");
        }
        const data = await res.json();
        setPlan(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlan();
  }, []);

  if (isLoading) {
    return <div className="flex min-h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          {error}
        </div>
        <div className="mt-4">
          <Button onClick={() => window.location.href = '/dashboard/profile'}>Update Profile</Button>
        </div>
      </div>
    );
  }

  if (!plan) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">{plan.title}</h1>
        <p className="text-stone-600">{plan.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <Card className="bg-rose-50 border-none">
           <CardContent className="pt-6 text-center">
             <div className="text-2xl font-bold text-rose-600">{plan.calories}</div>
             <div className="text-xs text-stone-600 uppercase tracking-wide">Calories</div>
           </CardContent>
         </Card>
         <Card className="bg-blue-50 border-none">
           <CardContent className="pt-6 text-center">
             <div className="text-2xl font-bold text-blue-600">{plan.nutrients.protein}</div>
             <div className="text-xs text-stone-600 uppercase tracking-wide">Protein</div>
           </CardContent>
         </Card>
         <Card className="bg-amber-50 border-none">
           <CardContent className="pt-6 text-center">
             <div className="text-2xl font-bold text-amber-600">{plan.nutrients.carbs}</div>
             <div className="text-xs text-stone-600 uppercase tracking-wide">Carbs</div>
           </CardContent>
         </Card>
         <Card className="bg-green-50 border-none">
           <CardContent className="pt-6 text-center">
             <div className="text-2xl font-bold text-green-600">{plan.nutrients.fats}</div>
             <div className="text-xs text-stone-600 uppercase tracking-wide">Fats</div>
           </CardContent>
         </Card>
      </div>

      <div className="space-y-6">
        <MealSection 
          title="Breakfast" 
          icon={<Coffee className="w-5 h-5 text-amber-600" />} 
          items={plan.meals.breakfast} 
        />
        <MealSection 
          title="Mid-Morning Snack" 
          icon={<Apple className="w-5 h-5 text-red-500" />} 
          items={plan.meals.midMorningSnack} 
        />
        <MealSection 
          title="Lunch" 
          icon={<Sun className="w-5 h-5 text-orange-500" />} 
          items={plan.meals.lunch} 
        />
        <MealSection 
          title="Evening Snack" 
          icon={<Coffee className="w-5 h-5 text-stone-500" />} 
          items={plan.meals.eveningSnack} 
        />
        <MealSection 
          title="Dinner" 
          icon={<Utensils className="w-5 h-5 text-blue-500" />} 
          items={plan.meals.dinner} 
        />
        <MealSection 
          title="Bedtime" 
          icon={<Moon className="w-5 h-5 text-indigo-500" />} 
          items={plan.meals.bedtime} 
        />
      </div>
    </div>
  );
}

function MealSection({ title, icon, items }: { title: string, icon: React.ReactNode, items: string[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        {icon}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

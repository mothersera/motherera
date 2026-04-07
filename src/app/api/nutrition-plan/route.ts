import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import NutritionPlan from '@/models/NutritionPlan';
import UserModel from '@/models/User';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object';
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await UserModel.findById(session.user.id);
    
    // Check for Active Premium Plan first
    if (user?.activeDietPlan && user?.weeklyPlan) {
      const weeklyPlanUnknown: unknown = user.weeklyPlan;
      const daysUnknown =
        isRecord(weeklyPlanUnknown) && Array.isArray(weeklyPlanUnknown.days) ? (weeklyPlanUnknown.days as unknown[]) : null;

      if (!daysUnknown) {
        // Fall back to legacy logic if plan structure is not what we expect
        user.activeDietPlan = false;
      }

      // Find today's weekday
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date();
      const currentWeekday = weekdays[today.getDay()];

      // Find the meal plan for this weekday
      const dailyPlan = (daysUnknown || []).find((d) => {
        if (!isRecord(d)) return false;
        return String(d.weekday || '') === currentWeekday;
      }) as Record<string, unknown> | undefined;
      
      if (dailyPlan) {
        const meals = isRecord(dailyPlan.meals) ? (dailyPlan.meals as Record<string, unknown>) : {};
        const breakfast = isRecord(meals.breakfast) ? (meals.breakfast as Record<string, unknown>) : {};
        const midMorningSnack = isRecord(meals.midMorningSnack) ? (meals.midMorningSnack as Record<string, unknown>) : {};
        const lunch = isRecord(meals.lunch) ? (meals.lunch as Record<string, unknown>) : {};
        const eveningSnack = isRecord(meals.eveningSnack) ? (meals.eveningSnack as Record<string, unknown>) : {};
        const dinner = isRecord(meals.dinner) ? (meals.dinner as Record<string, unknown>) : {};

        // Return in the structure expected by the dashboard
        return NextResponse.json({
          stage: user.motherhoodStage,
          dietaryPreference: user.dietaryPreference,
          meals: [
            { meal: 'Breakfast', food: String(breakfast.name || ''), calories: '350 kcal' },
            { meal: 'Mid-Morning Snack', food: String(midMorningSnack.name || ''), calories: '150 kcal' },
            { meal: 'Lunch', food: String(lunch.name || ''), calories: '500 kcal' },
            { meal: 'Evening Snack', food: String(eveningSnack.name || ''), calories: '200 kcal' },
            { meal: 'Dinner', food: String(dinner.name || ''), calories: '400 kcal' }
          ]
        });
      }
    }

    // Fallback to legacy static plan logic for Free users or missing data
    let plan = await NutritionPlan.findOne({
      stage: user?.motherhoodStage,
      dietaryPreference: user?.dietaryPreference || 'vegetarian' // Fallback to veg if not set or found
    });

    if (!plan) {
       // Fallback to generic stage plan if specific preference not found
       plan = await NutritionPlan.findOne({
         stage: user?.motherhoodStage
       });
    }

    if (!plan) {
      return NextResponse.json({ error: 'No plan found for your profile' }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

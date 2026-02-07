import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import NutritionPlan from '@/models/NutritionPlan';
import UserModel from '@/models/User';

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
      // Find today's weekday
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date();
      const currentWeekday = weekdays[today.getDay()];

      // Find the meal plan for this weekday
      const dailyPlan = user.weeklyPlan.days.find((d: any) => d.weekday === currentWeekday);
      
      if (dailyPlan) {
        // Return in the structure expected by the dashboard
        return NextResponse.json({
          stage: user.motherhoodStage,
          dietaryPreference: user.dietaryPreference,
          meals: [
            { meal: 'Breakfast', food: dailyPlan.meals.breakfast.name, calories: '350 kcal' }, // Mock cals
            { meal: 'Mid-Morning Snack', food: dailyPlan.meals.midMorningSnack.name, calories: '150 kcal' },
            { meal: 'Lunch', food: dailyPlan.meals.lunch.name, calories: '500 kcal' },
            { meal: 'Evening Snack', food: dailyPlan.meals.eveningSnack.name, calories: '200 kcal' },
            { meal: 'Dinner', food: dailyPlan.meals.dinner.name, calories: '400 kcal' }
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

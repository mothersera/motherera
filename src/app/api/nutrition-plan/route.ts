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
    
    // Find plan matching user's stage and dietary preference
    // In a real app, this logic would be more complex (trimester, age, etc.)
    // For now we map strictly to stage + preference, fallback to 'vegetarian' if preference not found
    
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


import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import { generateWeeklyPlan, DIET_TYPES } from '@/lib/diet-plans';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  
  // 1. Check Subscription Access
  const user = await UserModel.findById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isPremium = user.subscriptionStatus === 'active' && 
    (user.subscriptionPlan === 'premium' || user.subscriptionPlan === 'specialized');

  if (!isPremium) {
    return NextResponse.json({ error: 'Premium subscription required' }, { status: 403 });
  }

  // 2. Check if plan exists and user hasn't requested reset
  if (user.activeDietPlan && user.weeklyPlan) {
    return NextResponse.json({
      plan: user.weeklyPlan,
      userPreference: user.dietaryPreference,
      dietOptions: DIET_TYPES,
      startDate: user.planStartDate
    });
  }

  // 3. If no active plan, return null plan but with options
  return NextResponse.json({
    plan: null,
    userPreference: user.dietaryPreference || 'vegetarian',
    dietOptions: DIET_TYPES
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  // 1. Check Access
  const user = await UserModel.findById(session.user.id);
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isPremium = user.subscriptionStatus === 'active' && 
    (user.subscriptionPlan === 'premium' || user.subscriptionPlan === 'specialized');

  if (!isPremium) {
    return NextResponse.json({ error: 'Premium subscription required' }, { status: 403 });
  }

  // 2. Get new preference or reset request
  const { dietType, action } = await req.json();

  if (action === 'reset') {
    user.activeDietPlan = false;
    user.weeklyPlan = undefined;
    user.planStartDate = undefined;
    await user.save();
    return NextResponse.json({ success: true });
  }

  if (!dietType) {
    return NextResponse.json({ error: 'Diet type is required' }, { status: 400 });
  }

  // 3. Update Profile
  user.dietaryPreference = dietType;
  
  // 4. Generate new plan
  const stage = user.motherhoodStage || 'pregnancy';
  const rawPlan = generateWeeklyPlan(stage, dietType);

  // 5. Convert to Real Weekdays
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date(); // Plan starts today
  const planStartDate = today;

  // Map day numbers to weekdays starting from today's weekday? 
  // Requirement: "If planStartDate is Wednesday... Wednesday -> Day 1 meals"
  // Actually, let's keep it simple: Just label them Monday-Sunday in the DB structure?
  // Or better: Store as Day 1-7, but mapping happens on client/server based on startDate.
  // Wait, requirement says: "Replace Day 1... With Monday... The plan must align to real calendar days."
  // "WeeklyPlan: { monday: {...}, tuesday: {...} }" <- The DB structure requested.
  
  const weeklyPlanMap: any = {
    dietType: rawPlan.dietType,
    stage: rawPlan.stage,
    supplements: rawPlan.supplements,
    days: [] // We'll keep array for easy iteration, but label them
  };

  // We map the generated 7 days to Mon-Sun fixed structure?
  // Or do we just generate a generic Mon-Sun plan?
  // Let's make the generateWeeklyPlan return Mon-Sun structure effectively.
  // Since we want "Today = Wednesday -> show Wednesday meals", the plan needs to be static per weekday.
  
  const daysMap = rawPlan.days.map((day, index) => {
    return {
      ...day,
      weekday: weekdays[index] // 0=Mon, 1=Tue... (assuming generateWeeklyPlan returns 7 days)
    };
  });

  // Save to User
  user.activeDietPlan = true;
  user.planStartDate = planStartDate;
  user.weeklyPlan = {
    ...rawPlan,
    days: daysMap
  };
  
  await user.save();

  return NextResponse.json({
    plan: user.weeklyPlan,
    userPreference: dietType,
    startDate: planStartDate
  });
}

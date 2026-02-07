
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

  // 2. Generate Plan based on current profile
  const stage = user.motherhoodStage || 'pregnancy';
  const diet = user.dietaryPreference || 'vegetarian';
  
  const plan = generateWeeklyPlan(stage, diet);

  return NextResponse.json({
    plan,
    userPreference: diet,
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

  // 2. Get new preference
  const { dietType } = await req.json();
  if (!dietType) {
    return NextResponse.json({ error: 'Diet type is required' }, { status: 400 });
  }

  // 3. Update Profile
  user.dietaryPreference = dietType;
  await user.save();

  // 4. Generate new plan
  const stage = user.motherhoodStage || 'pregnancy';
  const plan = generateWeeklyPlan(stage, dietType);

  return NextResponse.json({
    plan,
    userPreference: dietType
  });
}

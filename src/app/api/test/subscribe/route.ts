import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import mongoose from 'mongoose';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const plan = searchParams.get('plan');

  if (!plan || (plan !== 'premium' && plan !== 'specialized')) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  await dbConnect();

  try {
    let userId = session.user.id;
    let user;

    // 1. Try to find user by ID (only if valid ObjectId)
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      user = await UserModel.findById(userId);
    }

    // 2. Fallback: Find by email
    if (!user && session.user.email) {
      user = await UserModel.findOne({ email: session.user.email });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Simulate successful subscription
    await UserModel.findByIdAndUpdate(user._id, {
      subscriptionPlan: plan,
      subscriptionStatus: 'active',
      subscriptionSource: 'test',
      subscribedAt: new Date()
    });

    return NextResponse.json({ 
      success: true, 
      plan: plan, 
      message: "Test subscription activated" 
    });
  } catch (error) {
    console.error('Subscription Test Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
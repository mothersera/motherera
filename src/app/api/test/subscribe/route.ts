import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import { redirect } from 'next/navigation';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { searchParams } = new URL(req.url);
  const plan = searchParams.get('plan');

  if (!plan || (plan !== 'premium' && plan !== 'specialized')) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  await dbConnect();

  try {
    // Simulate successful subscription
    await UserModel.findByIdAndUpdate(session.user.id, {
      subscriptionPlan: plan,
      subscriptionStatus: 'active'
    });

    // Redirect to dashboard with success message
    return NextResponse.redirect(new URL('/dashboard?subscribed=true', req.url));
  } catch (error) {
    console.error('Subscription Test Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
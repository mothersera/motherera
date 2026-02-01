import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    let userId = session.user.id;
    let user;

    if (userId) {
      user = await UserModel.findById(userId).select('-password -_id -__v');
    }

    // Fallback: Find by email if ID lookup failed or ID was missing
    if (!user && session.user.email) {
      user = await UserModel.findOne({ email: session.user.email }).select('-password -_id -__v');
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { name, motherhoodStage, dietaryPreference } = body;

    let userId = session.user.id;
    let user;

    // 1. Try to find user by ID
    if (userId) {
      user = await UserModel.findById(userId);
    }

    // 2. Fallback: Find by email
    if (!user && session.user.email) {
      user = await UserModel.findOne({ email: session.user.email });
    }

    // 3. If still no user, create one (Self-healing for OAuth users)
    if (!user && session.user.email) {
      console.log("Creating missing user for email:", session.user.email);
      try {
        user = await UserModel.create({
          name: name || session.user.name || 'Mother',
          email: session.user.email,
          image: session.user.image || undefined,
          role: 'mother',
          motherhoodStage: motherhoodStage || 'pregnancy',
          subscriptionPlan: 'basic',
          dietaryPreference: dietaryPreference, // Set initial preference if provided
          password: '' // Passwordless
        });
        
        // Return immediately since we just created it with the right data
        return NextResponse.json({
          name: user.name,
          email: user.email,
          role: user.role,
          motherhoodStage: user.motherhoodStage,
          dietaryPreference: user.dietaryPreference,
          subscriptionPlan: user.subscriptionPlan,
          image: user.image
        });
      } catch (createError) {
        console.error("Error creating user in PUT:", createError);
        return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found and could not be created' }, { status: 404 });
    }

    // 4. Update existing user
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { 
        name, 
        motherhoodStage,
        dietaryPreference
      },
      { new: true }
    ).select('-password -_id -__v');

    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

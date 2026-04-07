import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import mongoose from 'mongoose';
import { evaluateLifecycle } from '@/lib/lifecycle';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const userId = session.user.id;
    let user;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      user = await UserModel.findById(userId).select('-password -__v');
    }

    // Fallback: Find by email if ID lookup failed or ID was missing
    if (!user && session.user.email) {
      user = await UserModel.findOne({ email: session.user.email }).select('-password -__v');
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const evaluation = evaluateLifecycle({
      expectedDueDate: user.lifecycle?.expectedDueDate || null,
      gestationalAgeWeeks: user.lifecycle?.gestationalAgeWeeks || null,
      childBirthDates: user.lifecycle?.childBirthDates || null,
      wellnessObjectives: user.lifecycle?.wellnessObjectives || null,
    });

    const lifecycleNeedsUpdate =
      user.lifecycle?.stageId !== evaluation.stageId ||
      user.lifecycle?.stageLabel !== evaluation.label ||
      user.lifecycle?.confidence !== evaluation.confidence ||
      user.lifecycle?.derivedFrom !== evaluation.derivedFrom ||
      user.motherhoodStage !== evaluation.motherhoodStage;

    if (lifecycleNeedsUpdate) {
      await UserModel.findByIdAndUpdate(user._id, {
        motherhoodStage: evaluation.motherhoodStage,
        lifecycle: {
          ...(user.lifecycle || {}),
          stageId: evaluation.stageId,
          stageLabel: evaluation.label,
          confidence: evaluation.confidence,
          derivedFrom: evaluation.derivedFrom,
          updatedAt: new Date(),
        },
      });
      user.motherhoodStage = evaluation.motherhoodStage;
      user.lifecycle = {
        ...(user.lifecycle || {}),
        stageId: evaluation.stageId,
        stageLabel: evaluation.label,
        confidence: evaluation.confidence,
        derivedFrom: evaluation.derivedFrom,
        updatedAt: new Date(),
      };
    }

    const response = user.toObject() as unknown as { [key: string]: unknown; _id?: unknown; __v?: unknown };
    delete response._id;
    delete response.__v;
    return NextResponse.json(response);
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
    const { name, motherhoodStage, dietaryPreference, image, lifecycle } = body;

    const userId = session.user.id;
    let user;

    // 1. Try to find user by ID (only if valid ObjectId)
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
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
    const updateData: Record<string, unknown> = { name, motherhoodStage, dietaryPreference };

    if (image) {
      updateData.image = image;
    }

    const lifecycleInput = typeof lifecycle === "object" && lifecycle ? (lifecycle as Record<string, unknown>) : null;
    if (lifecycleInput) {
      const due = typeof lifecycleInput.expectedDueDate === "string" ? new Date(lifecycleInput.expectedDueDate) : null;
      const dueDate = due && !Number.isNaN(due.getTime()) ? due : null;
      const ga = typeof lifecycleInput.gestationalAgeWeeks === "number" ? lifecycleInput.gestationalAgeWeeks : null;
      const birth = typeof lifecycleInput.childBirthDate === "string" ? new Date(lifecycleInput.childBirthDate) : null;
      const birthDate = birth && !Number.isNaN(birth.getTime()) ? birth : null;
      const objectives = Array.isArray(lifecycleInput.wellnessObjectives)
        ? lifecycleInput.wellnessObjectives.map(v => String(v || "").trim()).filter(Boolean).slice(0, 12)
        : [];

      const evaluation = evaluateLifecycle({
        expectedDueDate: dueDate,
        gestationalAgeWeeks: ga,
        childBirthDates: birthDate ? [birthDate] : [],
        wellnessObjectives: objectives,
      });

      updateData.motherhoodStage = evaluation.motherhoodStage;
      updateData.lifecycle = {
        ...(typeof user.lifecycle === "object" && user.lifecycle ? user.lifecycle : {}),
        expectedDueDate: dueDate || undefined,
        gestationalAgeWeeks: ga ?? undefined,
        childBirthDates: birthDate ? [birthDate] : [],
        wellnessObjectives: objectives,
        stageId: evaluation.stageId,
        stageLabel: evaluation.label,
        confidence: evaluation.confidence,
        derivedFrom: evaluation.derivedFrom,
        updatedAt: new Date(),
      };
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      updateData,
      { new: true }
    ).select('-password -__v');

    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

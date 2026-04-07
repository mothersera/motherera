import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import UserModel from "@/models/User";
import { evaluateLifecycle } from "@/lib/lifecycle";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const user = await UserModel.findById(session.user.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

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
  }

  return NextResponse.json({
    motherhoodStage: evaluation.motherhoodStage,
    lifecycleStageId: evaluation.stageId,
    lifecycleStageLabel: evaluation.label,
    lifecycleConfidence: evaluation.confidence,
    derivedFrom: evaluation.derivedFrom,
    updated: lifecycleNeedsUpdate,
  });
}


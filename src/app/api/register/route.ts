import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";
import { evaluateLifecycle } from "@/lib/lifecycle";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["mother", "expert"]).default("mother"),
  motherhoodStage: z.enum(["pregnancy", "postpartum", "child_0_5"]).optional(),
  expectedDueDate: z.string().optional(),
  gestationalAgeWeeks: z.number().int().min(0).max(42).optional(),
  childBirthDate: z.string().optional(),
  wellnessObjectives: z.array(z.string()).max(12).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Log request (excluding password)
    const logBody: Record<string, unknown> = typeof body === "object" && body ? { ...(body as Record<string, unknown>) } : {};
    delete logBody.password;
    console.log("Register API Request:", JSON.stringify(logBody, null, 2));

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      console.error("Zod Validation Error:", result.error.issues);
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, password, role, motherhoodStage, expectedDueDate, gestationalAgeWeeks, childBirthDate, wellnessObjectives } = result.data;

    // Check DB Connection
    try {
      await dbConnect();
      console.log("MongoDB connected successfully");
    } catch (dbError) {
      console.error("MongoDB Connection Error:", dbError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`Registration failed: User already exists (${email})`);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const due = expectedDueDate ? new Date(expectedDueDate) : null;
    const dueDate = due && !Number.isNaN(due.getTime()) ? due : null;
    const birth = childBirthDate ? new Date(childBirthDate) : null;
    const birthDate = birth && !Number.isNaN(birth.getTime()) ? birth : null;

    let evaluation = evaluateLifecycle({
      expectedDueDate: dueDate,
      gestationalAgeWeeks: gestationalAgeWeeks ?? null,
      childBirthDates: birthDate ? [birthDate] : [],
      wellnessObjectives: wellnessObjectives ?? [],
    });

    const hasLifecycleSignals =
      Boolean(dueDate) ||
      Boolean(birthDate) ||
      typeof gestationalAgeWeeks === "number" ||
      Boolean((wellnessObjectives || []).length);

    if (!hasLifecycleSignals && motherhoodStage) {
      if (motherhoodStage === "postpartum") {
        evaluation = {
          ...evaluation,
          stageId: "postpartum_3_12",
          label: "Extended Postpartum (3–12 months)",
          motherhoodStage: "postpartum",
          confidence: "low",
          derivedFrom: "fallback",
        };
      } else if (motherhoodStage === "child_0_5") {
        evaluation = {
          ...evaluation,
          stageId: "parenting",
          label: "Active Parenting & Child Development",
          motherhoodStage: "child_0_5",
          confidence: "low",
          derivedFrom: "fallback",
        };
      } else {
        evaluation = {
          ...evaluation,
          motherhoodStage: "pregnancy",
        };
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      motherhoodStage: role === "mother" ? evaluation.motherhoodStage : undefined,
      subscriptionPlan: 'basic',
      lifecycle: role === "mother" ? {
        expectedDueDate: dueDate || undefined,
        gestationalAgeWeeks: gestationalAgeWeeks ?? undefined,
        childBirthDates: birthDate ? [birthDate] : [],
        wellnessObjectives: wellnessObjectives ?? [],
        stageId: evaluation.stageId,
        stageLabel: evaluation.label,
        confidence: evaluation.confidence,
        derivedFrom: evaluation.derivedFrom,
        updatedAt: new Date(),
      } : undefined,
    });

    console.log(`User created successfully: ${user._id}`);

    return NextResponse.json(
      { success: true, message: "Account created successfully", userId: user._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration Critical Error:", error);
    
    // Handle Mongoose Validation Errors
    if (typeof error === "object" && error && "name" in error && (error as { name?: unknown }).name === "ValidationError") {
       const raw = (error as { errors?: Record<string, { message?: unknown }> }).errors || {};
       const messages = Object.values(raw).map(e => String(e?.message || "")).filter(Boolean);
       return NextResponse.json({ error: "Validation Error", details: messages }, { status: 400 });
    }

    // Handle Duplicate Key Error (if race condition occurs)
    if (typeof error === "object" && error && "code" in error && (error as { code?: unknown }).code === 11000) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

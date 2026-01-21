import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["mother", "expert"]).default("mother"),
  motherhoodStage: z.enum(["pregnancy", "postpartum", "child_0_5"]).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Log request (excluding password)
    const { password: _, ...logBody } = body;
    console.log("Register API Request:", JSON.stringify(logBody, null, 2));

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      console.error("Zod Validation Error:", result.error.issues);
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, password, role, motherhoodStage } = result.data;

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

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      motherhoodStage: role === 'mother' ? motherhoodStage : undefined,
      subscriptionPlan: 'basic',
    });

    console.log(`User created successfully: ${user._id}`);

    return NextResponse.json(
      { success: true, message: "Account created successfully", userId: user._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration Critical Error:", error);
    
    // Handle Mongoose Validation Errors
    if (error.name === 'ValidationError') {
       const messages = Object.values(error.errors).map((err: any) => err.message);
       return NextResponse.json({ error: "Validation Error", details: messages }, { status: 400 });
    }

    // Handle Duplicate Key Error (if race condition occurs)
    if (error.code === 11000) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

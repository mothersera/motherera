import { NextResponse } from "next/server";
import { getAuthenticatedDbUser } from "@/lib/access.server";
import { ADMIN_EMAIL, normalizeEmail } from "@/lib/access";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const admin = await getAuthenticatedDbUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (normalizeEmail(admin.email) !== ADMIN_EMAIL) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body: unknown = await req.json().catch(() => null);
  const userId = typeof body === "object" && body && "userId" in body ? String((body as any).userId || "") : "";
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  const user = await UserModel.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  user.subscriptionPlan = "basic";
  user.subscriptionStatus = "inactive";
  user.subscriptionEndDate = null as any;
  user.subscriptionStartDate = null as any;
  user.subscriptionSource = "admin";
  await user.save();

  return NextResponse.json({ success: true });
}

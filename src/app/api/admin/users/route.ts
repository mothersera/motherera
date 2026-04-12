import { NextResponse } from "next/server";
import { getAuthenticatedDbUser } from "@/lib/access.server";
import { ADMIN_EMAIL, normalizeEmail } from "@/lib/access";
import UserModel from "@/models/User";

export async function GET() {
  const admin = await getAuthenticatedDbUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (normalizeEmail(admin.email) !== ADMIN_EMAIL) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = await UserModel.find({})
    .select("name email subscriptionPlan subscriptionStatus subscriptionEndDate subscriptionStartDate")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(
    users.map((u: any) => ({
      id: String(u._id),
      name: String(u.name || ""),
      email: String(u.email || ""),
      subscriptionPlan: u.subscriptionPlan || "basic",
      subscriptionStatus: u.subscriptionStatus || "inactive",
      subscriptionStartDate: u.subscriptionStartDate || null,
      subscriptionEndDate: u.subscriptionEndDate || null,
    }))
  );
}


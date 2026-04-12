import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import UserModel from "@/models/User";
import { normalizeEmail } from "@/lib/access";

export async function getAuthenticatedDbUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  await dbConnect();

  const sessionUserId = session.user.id;
  let user: any = null;

  if (sessionUserId && mongoose.Types.ObjectId.isValid(sessionUserId)) {
    user = await UserModel.findById(sessionUserId);
  }

  if (!user && session.user.email) {
    user = await UserModel.findOne({ email: normalizeEmail(session.user.email) });
  }

  return user;
}


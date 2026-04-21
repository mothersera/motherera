import { StreamClient } from "@stream-io/node-sdk";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_EMAIL, normalizeEmail } from "@/lib/access";

function toStreamUserId(email?: string | null) {
  const normalized = normalizeEmail(email);
  if (!normalized) return `user_${Date.now()}`;
  return normalized.replace(/[^a-zA-Z0-9]/g, "_");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const secret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secret) {
    console.error("Missing Stream API Key or Secret");
    return NextResponse.json(
      { error: "Server configuration error: Missing Stream API keys" },
      { status: 500 }
    );
  }

  const client = new StreamClient(apiKey, secret);

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const streamUserId = toStreamUserId(session.user.email);
    const isAdmin = normalizeEmail(session.user.email) === ADMIN_EMAIL;
    const role = isAdmin ? "admin" : "user";
    
    // Create or update user in Stream with correct role
    await client.upsertUsers([
      {
        id: streamUserId,
        role,
        name: session.user.name || "MotherEra User",
        image: session.user.image || undefined,
      },
    ]);

    const token = client.generateCallToken({
      user_id: streamUserId,
      role,
      call_cids: [`${process.env.NEXT_PUBLIC_STREAM_CALL_TYPE || "default"}:${process.env.NEXT_PUBLIC_STREAM_CALL_ID || "motherera-live-broadcast"}`],
    });

    return NextResponse.json({ token, userId: streamUserId, role });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { StreamClient } from "@stream-io/node-sdk";
import { authOptions } from "@/lib/auth";
import { ADMIN_EMAIL, normalizeEmail } from "@/lib/access";

const CALL_ID = "motherera-live-broadcast";
const CALL_TYPE = "default";

function toStreamUserId(email?: string | null) {
  const normalized = normalizeEmail(email);
  if (!normalized) return `user_${Date.now()}`;
  return normalized.replace(/[^a-zA-Z0-9]/g, "_");
}

type AdminAction = "mute" | "unmute" | "video-off" | "video-on";

function isAdminAction(value: unknown): value is AdminAction {
  return value === "mute" || value === "unmute" || value === "video-off" || value === "video-on";
}

export async function POST(req: Request) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const secret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secret) {
    return NextResponse.json({ error: "Stream server keys missing" }, { status: 500 });
  }

  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email || null;
  if (!session?.user || !sessionEmail) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (normalizeEmail(sessionEmail) !== ADMIN_EMAIL) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const targetUserId = typeof (body as any)?.targetUserId === "string" ? String((body as any).targetUserId) : "";
  const action = (body as any)?.action;

  if (!targetUserId) {
    return NextResponse.json({ error: "targetUserId is required" }, { status: 400 });
  }
  if (!isAdminAction(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const client = new StreamClient(apiKey, secret);
  const call = client.video.call(CALL_TYPE, CALL_ID);
  const mutedById = toStreamUserId(sessionEmail);

  if (action === "mute") {
    await call.muteUsers({ user_ids: [targetUserId], audio: true, muted_by_id: mutedById });
    await call.updateUserPermissions({ user_id: targetUserId, revoke_permissions: ["send-audio"] });
  } else if (action === "unmute") {
    await call.updateUserPermissions({ user_id: targetUserId, grant_permissions: ["send-audio"] });
  } else if (action === "video-off") {
    await call.muteUsers({ user_ids: [targetUserId], video: true, muted_by_id: mutedById });
    await call.updateUserPermissions({ user_id: targetUserId, revoke_permissions: ["send-video"] });
  } else if (action === "video-on") {
    await call.updateUserPermissions({ user_id: targetUserId, grant_permissions: ["send-video"] });
  }

  return NextResponse.json({ success: true });
}


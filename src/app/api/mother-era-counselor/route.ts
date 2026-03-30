import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, collection, serverTimestamp } from "firebase/firestore";

async function getToday() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function checkAndIncrementUsage(userId: string, limit: number) {
  const date = await getToday();
  const id = `${userId}_${date}`;
  const ref = doc(collection(db, "ai_usage"), id);
  const snap = await getDoc(ref);
  const nowMs = Date.now();
  if (snap.exists()) {
    const data = snap.data() as any;
    const count = data.count || 0;
    const lastMs = data.lastRequestMs || 0;
    if (nowMs - lastMs < 1000) {
      return { allowed: false, rateLimited: true, remaining: Math.max(0, limit - count) };
    }
    if (count >= limit) {
      return { allowed: false, rateLimited: false, remaining: 0 };
    }
    await updateDoc(ref, { count: count + 1, lastRequestMs: nowMs, updatedAt: serverTimestamp() });
    return { allowed: true, rateLimited: false, remaining: Math.max(0, limit - (count + 1)) };
  } else {
    await setDoc(ref, { userId, date, count: 1, lastRequestMs: nowMs, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return { allowed: true, rateLimited: false, remaining: Math.max(0, limit - 1) };
  }
}

async function callOpenAI(prompt: string, isPremium: boolean, history: Array<{ role: "user" | "assistant"; content: string }>) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "I’m here to help with calm, motherhood-focused guidance. It looks like the AI service is not configured. Please try again shortly.";
  }
  const systemPrompt =
    "You are MotherEra’s AI Counselor.\n\nYour role:\n• Provide calm, emotionally supportive guidance to mothers\n• Speak like a caring, wise human—not a robot\n• Be warm, validating, and reassuring\n• Give practical next steps\n\nRules:\n• Keep responses clear and not overly long\n• Avoid sounding clinical or robotic\n• Never judge or shame\n• If situation is serious, gently suggest professional help\n\nTone:\n• Soft\n• Gentle\n• Supportive\n• Emotionally intelligent";
  const model = isPremium ? "gpt-4o" : "gpt-4o-mini";
  const maxTokens = isPremium ? 800 : 300;
  const temperature = isPremium ? 0.8 : 0.6;
  const messages = [{ role: "system", content: systemPrompt } as any].concat((history || []).slice(-6)).concat([{ role: "user", content: prompt }]);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, temperature, max_tokens: maxTokens, messages }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      return "Something went wrong. Please try again.";
    }
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "Something went wrong. Please try again.";
    return reply;
  } catch {
    return "Something went wrong. Please try again.";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = String(body?.message || "").trim();
    const userId = String(body?.userId || "").trim();
    const isPremium = Boolean(body?.isPremium);
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message || !userId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const limit = isPremium ? 100 : 10;
    const usage = await checkAndIncrementUsage(userId, limit);
    if (!usage.allowed) {
      if (usage.rateLimited) {
        return NextResponse.json({ error: "RATE_LIMIT" }, { status: 429 });
      }
      return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 403 });
    }

    const aiReply = await callOpenAI(message, isPremium, history);
    const cleaned = aiReply.trim();
    const maxLen = isPremium ? 2000 : 1000;
    const finalReply = cleaned.length > maxLen ? cleaned.slice(0, maxLen) : cleaned;
    const payload: any = { reply: finalReply };
    if (!isPremium) payload.remaining = usage.remaining;
    return NextResponse.json(payload);
  } catch (e) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

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
  const model = isPremium ? "gpt-4o" : "gpt-4o-mini";
  const maxTokens = isPremium ? 400 : 200;
  const temperature = isPremium ? 0.8 : 0.6;
  const input = [
    { role: "system", content: "You are a premium AI counselor for mothers and families. Your tone must be calm, emotionally supportive, and human-like.\n\nRules:\n* Never give long walls of text\n* Keep responses short and readable\n* Use spacing between lines\n* Use bullet points when helpful\n* Sound like a real caring human, not a textbook\n* Avoid robotic or overly medical language\n* Be warm, reassuring, and clear" },
    ...(Array.isArray(history) ? history.slice(-6) : []),
    { role: "user", content: prompt }
  ];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, input, temperature, max_output_tokens: maxTokens }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      const errText = await res.text();
      console.log("OpenAI error:", errText);
      throw new Error(errText || "OpenAI API error");
    }
    const data = await res.json();
    console.log("OpenAI response:", data);
    const reply = data?.output?.[0]?.content?.[0]?.text || "Something went wrong. Please try again.";
    return reply;
  } catch {
    throw new Error("Request to OpenAI failed or timed out");
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
    function formatReply(text: string) {
      const intro = "You're not alone in thinking about this ❤️";
      const lead = "Here are a few gentle ways to approach it:";
      const s = text.replace(/\n+/g, " ").split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, 5);
      const bullets = s.map(t => `• ${t.trim()}`);
      const tail = "If you'd like, I can guide you step by step.";
      const parts = [intro, "", lead, "", bullets.join("\n"), "", tail];
      return parts.join("\n");
    }
    const formatted = formatReply(cleaned);
    const maxLen = isPremium ? 2000 : 1000;
    const finalReply = formatted.length > maxLen ? formatted.slice(0, maxLen) : formatted;
    const payload: any = { reply: finalReply };
    if (!isPremium) payload.remaining = usage.remaining;
    return NextResponse.json(payload);
  } catch (e: any) {
    const msg = typeof e?.message === "string" ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

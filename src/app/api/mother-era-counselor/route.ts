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

async function checkAndIncrementUsage(userId: string) {
  const date = await getToday();
  const id = `${userId}_${date}`;
  const ref = doc(collection(db, "ai_usage"), id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as any;
    const count = data.count || 0;
    if (count >= 10) {
      return { allowed: false };
    }
    await updateDoc(ref, { count: count + 1, updatedAt: serverTimestamp() });
    return { allowed: true };
  } else {
    await setDoc(ref, { userId, date, count: 1, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return { allowed: true };
  }
}

async function callOpenAI(prompt: string, isPremium: boolean) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "I’m here to help with calm, motherhood-focused guidance. It looks like the AI service is not configured. Please try again shortly.";
  }

  const systemPrompt =
    "You are MotherEra’s AI Counselor for mothers and caregivers. Provide emotionally supportive, calm, safe, practical guidance rooted in motherhood contexts. Be empathetic, non-judgmental, and actionable. Avoid medical claims; encourage professional help when appropriate.";

  const model = isPremium ? "gpt-4o" : "gpt-4o-mini";
  const maxTokens = isPremium ? 800 : 300;
  const temperature = isPremium ? 0.8 : 0.6;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    return "Something went wrong. Please try again.";
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content || "Something went wrong. Please try again.";
  return reply;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = String(body?.message || "").trim();
    const userId = String(body?.userId || "").trim();
    const isPremium = Boolean(body?.isPremium);

    if (!message || !userId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (!isPremium) {
      const usage = await checkAndIncrementUsage(userId);
      if (!usage.allowed) {
        return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 403 });
      }
    }

    const reply = await callOpenAI(message, isPremium);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

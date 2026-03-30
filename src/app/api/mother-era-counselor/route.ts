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
  try {
    const date = await getToday();
    const id = `${userId}_${date}`;
    const ref = doc(collection(db, "ai_usage"), id);
    
    console.log("Checking usage for:", userId);
    const snap = await getDoc(ref);
    const nowMs = Date.now();

    if (snap.exists()) {
      const data = snap.data() as any;
      const count = data.count || 0;
      const lastMs = data.lastRequestMs || 0;
      
      console.log("Current count:", count);

      if (nowMs - lastMs < 1000) {
        return { allowed: false, rateLimited: true, remaining: Math.max(0, limit - count) };
      }
      if (count >= limit) {
        return { allowed: false, rateLimited: false, remaining: 0 };
      }
      await updateDoc(ref, { 
        count: count + 1, 
        lastRequestMs: nowMs, 
        updatedAt: serverTimestamp() 
      });
      return { allowed: true, rateLimited: false, remaining: Math.max(0, limit - (count + 1)) };
    } else {
      await setDoc(ref, { 
        userId, 
        date, 
        count: 1, 
        lastRequestMs: nowMs, 
        createdAt: serverTimestamp(), 
        updatedAt: serverTimestamp() 
      });
      return { allowed: true, rateLimited: false, remaining: Math.max(0, limit - 1) };
    }
  } catch (err) {
    console.error("Usage check failed:", err);
    return { allowed: true, rateLimited: false, remaining: limit }; // NEVER block user on error
  }
}

async function callOpenAI(prompt: string, isPremium: boolean, history: Array<{ role: "user" | "assistant"; content: string }>) {
  console.log("Calling OpenAI...");
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "I’m here to help with calm, motherhood-focused guidance. It looks like the AI service is not configured. Please try again shortly.";
  }
  const model = isPremium ? "gpt-4o" : "gpt-4o-mini";
  const maxTokens = 150;
  const temperature = isPremium ? 0.8 : 0.6;
  const messages = [
    { role: "system", content: "You are a premium AI counselor.\n\nRules:\n\n* Be emotionally supportive\n* Start responses naturally (not the same sentence every time)\n* Vary your tone\n* Sometimes show empathy, sometimes be direct\n* Never repeat the same opening line\n* Sound human, not scripted\n* Max 5 lines per response\n* No long paragraphs\n* Use bullet points when needed\n* Keep it short, calm, human\n* Avoid numbered lists like 1,2,3\n* Speak like a real person, not an article" },
    ...(Array.isArray(history) ? history.slice(-6).map(m => ({ role: m.role, content: m.content })) : []),
    { role: "user", content: prompt }
  ];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ 
        model, 
        messages, 
        temperature, 
        max_tokens: maxTokens 
      }),
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
    const reply = data?.choices?.[0]?.message?.content || "Something went wrong. Please try again.";
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
    function formatAIResponse(text: string) {
      const noBold = text.replace(/\*\*(.*?)\*\*/g, "$1");
      const bullets = noBold.replace(/\d+\.\s/g, "\n• ");
      const spaced = bullets.replace(/\n/g, "\n\n");
      return spaced;
    }
    const formatted = formatAIResponse(cleaned);
    const maxLen = isPremium ? 2000 : 1000;
    
    const openings = [
      "I understand how you might be feeling 💛",
      "That’s a really valid concern",
      "I’m glad you asked this",
      "This is something many people wonder about",
      ""
    ];
    const randomOpening = openings[Math.floor(Math.random() * openings.length)];
    let finalReply = randomOpening ? `${randomOpening}\n\n${formatted}` : formatted;

    if (finalReply.length > maxLen) finalReply = finalReply.slice(0, maxLen);
    const payload: any = { reply: finalReply };
    if (!isPremium) payload.remaining = usage.remaining;
    return NextResponse.json(payload);
  } catch (err: any) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

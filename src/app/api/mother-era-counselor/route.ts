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
  // 1. INTENT DETECTION LOGIC
  const lowerPrompt = prompt.toLowerCase().trim();
  const words = lowerPrompt.split(/\s+/);
  const wordCount = words.length;

  const greetings = ["hi", "hey", "hello", "good morning", "good evening", "hi there", "hello there"];
  const isGreeting = greetings.includes(lowerPrompt) || (wordCount <= 2 && greetings.some(g => lowerPrompt.startsWith(g)));

  const gratitude = ["thanks", "thank you", "thanks so much", "thank you so much"];
  const isGratitude = gratitude.includes(lowerPrompt);

  if (isGreeting) {
    const greetingReplies = [
      "Hey 😊 How are you feeling today?",
      "Hi! I'm here for you. What's on your mind?",
      "Hello 💛 How can I support you right now?"
    ];
    return greetingReplies[Math.floor(Math.random() * greetingReplies.length)];
  }

  if (isGratitude) {
    return "You're always welcome 💛 I'm here whenever you need me.";
  }

  if (wordCount < 5 && !lowerPrompt.includes("?")) {
    // Treat as casual small talk if it's very short and not a question
    const casualReplies = [
      "I hear you. Tell me a bit more about that.",
      "I'm listening 💛",
      "That's completely understandable. Want to share more?"
    ];
    return casualReplies[Math.floor(Math.random() * casualReplies.length)];
  }

  // 2. SERIOUS INTENT -> Send to OpenAI
  console.log("Calling OpenAI for serious intent...");
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "I’m here to help with calm, motherhood-focused guidance. It looks like the AI service is not configured. Please try again shortly.";
  }
  const model = isPremium ? "gpt-4o" : "gpt-4o-mini";
  const maxTokens = isPremium ? 250 : 150;
  const temperature = isPremium ? 0.7 : 0.6;
  const messages = [
    { 
      role: "system", 
      content: `You are MotherEra Companion, a smart and emotionally intelligent AI for mothers.

Rules:
- Adapt tone based on user input
- If user greets → respond casually and friendly
- If user asks a serious question → respond empathetically and helpfully
- Do NOT overuse emotional validation
- Do NOT say 'that's a valid concern' unless truly serious
- Be natural, human-like, and conversational
- Keep responses clean, structured, and easy to read (max 6-8 lines)
- Avoid robotic or repetitive phrases
- Give practical, clear advice when needed`
    },
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
    console.log("OpenAI response received");
    
    // 3. RESPONSE CLEANING
    let reply = data?.choices?.[0]?.message?.content || "Something went wrong. Please try again.";
    
    // Remove unnecessary repetition and clean up formatting
    reply = reply.replace(/\*\*(.*?)\*\*/g, "$1"); // remove bolding
    reply = reply.replace(/\d+\.\s/g, "\n• "); // convert numbered lists to bullets
    reply = reply.replace(/\n{3,}/g, "\n\n"); // ensure max double spacing
    
    return reply.trim();
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
    
    // Format the response and add variation if it was generated by AI
    // (We skip adding the random opening if the response was a short hardcoded greeting/casual reply)
    let finalReply = aiReply;
    const isHardcodedReply = aiReply.includes("How are you feeling today?") || 
                            aiReply.includes("What's on your mind?") || 
                            aiReply.includes("How can I support you right now?") ||
                            aiReply.includes("You're always welcome") ||
                            aiReply.includes("Tell me a bit more about that") ||
                            aiReply.includes("I'm listening") ||
                            aiReply.includes("Want to share more?");
                            
    if (!isHardcodedReply) {
      function formatAIResponse(text: string) {
        // Cleaning is now done in callOpenAI, just return as is
        return text;
      }
      const formatted = formatAIResponse(aiReply);
      const maxLen = isPremium ? 2000 : 1000;
      
      const openings = [
        "I understand how you might be feeling 💛",
        "That’s a really valid concern",
        "I’m glad you asked this",
        "This is something many people wonder about",
        ""
      ];
      // Only add opening 50% of the time for even more natural flow
      const shouldAddOpening = Math.random() > 0.5;
      const randomOpening = shouldAddOpening ? openings[Math.floor(Math.random() * openings.length)] : "";
      
      finalReply = randomOpening ? `${randomOpening}\n\n${formatted}` : formatted;

      if (finalReply.length > maxLen) finalReply = finalReply.slice(0, maxLen);
    }
    
    const payload: any = { reply: finalReply };
    if (!isPremium) payload.remaining = usage.remaining;
    return NextResponse.json(payload);
  } catch (err: any) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

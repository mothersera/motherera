import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, collection, serverTimestamp } from "firebase/firestore";
import dbConnect from "@/lib/db";
import WebsiteContent from "@/models/WebsiteContent";
import UserModel from "@/models/User";
import { ADMIN_EMAIL, canAccessPremium, normalizeEmail } from "@/lib/access";

type HistoryItem = { role: "user" | "assistant"; content: string };
type RagLink = { title: string; url: string; description: string; tag: string; icon: string };
type CallResult = { reply: string; links?: RagLink[]; usedRag?: boolean; isShortCircuit?: boolean };
type UsageDoc = { count?: number; lastRequestMs?: number };

const RAG_INDEX_NAME = "website_content_embedding_index";
const RAG_VECTOR_PATH = "embedding";
const RAG_CACHE_TTL_MS = 10 * 60 * 1000;

const ragCache = new Map<string, { expiresAt: number; links: RagLink[]; context: string }>();
const embeddingCache = new Map<string, { expiresAt: number; embedding: number[] }>();

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
      const data = snap.data() as UsageDoc;
      const count = data.count ?? 0;
      const lastMs = data.lastRequestMs ?? 0;
      
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

async function getEmbedding(text: string, apiKey: string) {
  const key = text.toLowerCase().trim();
  const cached = embeddingCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.embedding;

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "OpenAI embeddings error");
  }

  const data = await res.json();
  const embedding = data?.data?.[0]?.embedding;
  if (!Array.isArray(embedding)) {
    throw new Error("Invalid embeddings response");
  }

  embeddingCache.set(key, { expiresAt: Date.now() + RAG_CACHE_TTL_MS, embedding });
  return embedding;
}

function extractTextForContext(raw: string, maxChars: number) {
  const normalized = raw.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxChars) return normalized;
  return normalized.slice(0, maxChars);
}

function normalizeUrl(raw: string) {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return "";
  try {
    const u = new URL(trimmed);
    u.hash = "";
    u.search = "";
    const normalized = u.toString();
    if (normalized.endsWith("/") && u.pathname !== "/") return normalized.slice(0, -1);
    return normalized;
  } catch {
    const noHash = trimmed.split("#")[0];
    const noQuery = noHash.split("?")[0];
    if (noQuery.endsWith("/") && noQuery !== "/") return noQuery.slice(0, -1);
    return noQuery;
  }
}

function toTitleCase(text: string) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function deriveTitleFromUrl(url: string) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    const slug = (parts[parts.length - 1] || "").trim();
    if (!slug) return "MotherEra Resource";
    const decoded = decodeURIComponent(slug);
    const cleaned = decoded
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const lower = cleaned.toLowerCase();
    if (lower.includes("pregnan")) return "Pregnancy Guide";
    if (lower.includes("newborn")) return "Newborn Care Guide";
    if (lower.includes("baby")) return "Baby Care Tips";
    if (lower.includes("postpartum")) return "Postpartum Support";
    if (lower.includes("sleep")) return "Baby Sleep Tips";
    if (lower.includes("nutrition") || lower.includes("food") || lower.includes("diet")) return "Nutrition Guide";
    return toTitleCase(cleaned);
  } catch {
    return "MotherEra Resource";
  }
}

function cleanRagTitle(title: string, url: string) {
  const raw = String(title || "").replace(/\s+/g, " ").trim();
  const parts = raw.split("|").map(s => s.trim()).filter(Boolean);
  const withoutBrand = parts.filter(p => !/mother\s*era/i.test(p));
  const candidate = (withoutBrand.length > 0 ? withoutBrand.join(" — ") : raw).trim();
  const lower = candidate.toLowerCase();
  const isGeneric =
    lower === "motherera" ||
    lower === "mother era" ||
    lower === "guided journey through motherhood" ||
    lower === "mother era guided journey through motherhood" ||
    lower === "home";
  if (!candidate || candidate.length < 6 || isGeneric) return deriveTitleFromUrl(url);
  return candidate;
}

function deriveDescriptionFromContent(content: string) {
  const normalized = String(content || "").replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  const max = 180;
  const min = 90;
  const slice = normalized.slice(0, max);
  const m = slice.slice(min).match(/[.!?]\s/);
  if (m?.index != null) return slice.slice(0, min + m.index + 1).trim();
  return slice.trim().replace(/[,:;]\s*$/, "");
}

function deriveTagAndIcon(title: string, url: string, description: string) {
  const text = `${title} ${url} ${description}`.toLowerCase();
  if (/(pregnan|trimester|prenatal|conception)/.test(text)) return { tag: "Pregnancy", icon: "🤰" };
  if (/(breastfeed|lactation|pumping|milk)/.test(text)) return { tag: "Feeding", icon: "🍼" };
  if (/(newborn|infant|baby|toddler)/.test(text)) return { tag: "Baby Care", icon: "👶" };
  if (/(sleep|nap|bedtime)/.test(text)) return { tag: "Sleep", icon: "😴" };
  if (/(nutrition|diet|meal|food|vitamin|protein)/.test(text)) return { tag: "Nutrition", icon: "🥗" };
  if (/(postpartum|ppd|anxiety|stress|overwhelm|mental|burnout)/.test(text)) return { tag: "Wellbeing", icon: "💛" };
  return { tag: "Motherhood", icon: "✨" };
}

async function retrieveWebsiteContext(query: string, apiKey: string) {
  const key = query.toLowerCase().trim();
  const cached = ragCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached;

  await dbConnect();
  const queryVector = await getEmbedding(query, apiKey);

  let docs: Array<{ title: string; url: string; content: string; score?: number }> = [];
  try {
    docs = await WebsiteContent.aggregate([
      {
        $vectorSearch: {
          index: RAG_INDEX_NAME,
          path: RAG_VECTOR_PATH,
          queryVector,
          numCandidates: 100,
          limit: 5,
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          url: 1,
          content: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);
  } catch (e) {
    console.error("RAG vector search failed:", e);
    docs = [];
  }

  const uniqueDocs: Array<{ title: string; url: string; content: string; score?: number }> = [];
  const seen = new Set<string>();
  for (const d of docs) {
    if (typeof d?.url !== "string" || typeof d?.title !== "string") continue;
    const normalized = normalizeUrl(d.url);
    if (!normalized) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    uniqueDocs.push({ ...d, url: normalized });
    if (uniqueDocs.length >= 5) break;
  }

  const links: RagLink[] = uniqueDocs.slice(0, 2).map(d => {
    const title = cleanRagTitle(d.title, d.url);
    const description = deriveDescriptionFromContent(d.content);
    const { tag, icon } = deriveTagAndIcon(title, d.url, description);
    return { title, url: d.url, description, tag, icon };
  });

  const context = uniqueDocs
    .map(d => `Title: ${d.title}\nURL: ${d.url}\nContent: ${extractTextForContext(d.content || "", 800)}`)
    .join("\n\n---\n\n");

  const result = { expiresAt: Date.now() + RAG_CACHE_TTL_MS, links, context };
  ragCache.set(key, result);
  return result;
}

function limitToLines(text: string, maxLines: number) {
  const lines = text.split("\n").map(l => l.trimEnd());
  const pruned = lines.filter((l, idx) => !(idx > 0 && l === "" && lines[idx - 1] === ""));
  return pruned.slice(0, maxLines).join("\n").trim();
}

async function callOpenAI(prompt: string, isPremium: boolean, history: HistoryItem[]): Promise<CallResult> {
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
    return { reply: greetingReplies[Math.floor(Math.random() * greetingReplies.length)], isShortCircuit: true };
  }

  if (isGratitude) {
    return { reply: "You're always welcome 💛 I'm here whenever you need me.", isShortCircuit: true };
  }

  if (wordCount < 5 && !lowerPrompt.includes("?")) {
    // Treat as casual small talk if it's very short and not a question
    const casualReplies = [
      "I hear you. Tell me a bit more about that.",
      "I'm listening 💛",
      "That's completely understandable. Want to share more?"
    ];
    return { reply: casualReplies[Math.floor(Math.random() * casualReplies.length)], isShortCircuit: true };
  }

  // 2. SERIOUS INTENT -> Send to OpenAI
  console.log("Calling OpenAI for serious intent...");
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      reply:
        "I’m here to help with calm, motherhood-focused guidance. It looks like the AI service is not configured. Please try again shortly.",
      isShortCircuit: true,
    };
  }

  const { links, context } = await retrieveWebsiteContext(prompt, apiKey);

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
- Give practical, clear advice when needed

Knowledge:
- Use the provided MotherEra website context when relevant.
- Do not invent or guess URLs.`
    },
    ...(Array.isArray(history) ? history.slice(-6).map(m => ({ role: m.role, content: m.content })) : []),
    {
      role: "user",
      content:
        `MotherEra website context (use this when helpful):\n\n${context || "No relevant internal page context found."}\n\n` +
        `User message:\n${prompt}\n\n` +
        `Reply with a short answer (2–4 lines). Do not include URLs.`,
    },
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
    
    reply = reply.trim();
    const maxLines = isPremium ? 10 : 8;
    reply = limitToLines(reply, maxLines);

    return { reply, links, usedRag: links.length > 0 };
  } catch {
    throw new Error("Request to OpenAI failed or timed out");
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    const body = await request.json();
    const message = String(body?.message || "").trim();
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await dbConnect();
    let user: any = null;
    const sessionUserId = session.user.id;
    if (sessionUserId && mongoose.Types.ObjectId.isValid(sessionUserId)) {
      user = await UserModel.findById(sessionUserId);
    }
    if (!user && session.user.email) {
      user = await UserModel.findOne({ email: normalizeEmail(session.user.email) });
    }
    if (!user) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    const userEmail = normalizeEmail(user.email);
    const isAdminUser = userEmail === ADMIN_EMAIL;
    if (!isAdminUser && user.subscriptionStatus !== "active") {
      return NextResponse.json({ error: "UPGRADE_REQUIRED", message: "Upgrade to access this feature" }, { status: 403 });
    }

    const isPremiumAccess = isAdminUser || canAccessPremium(user);
    const limit = isAdminUser ? 100000 : isPremiumAccess ? 100 : 10;
    const usage = isAdminUser ? { allowed: true, rateLimited: false, remaining: limit } : await checkAndIncrementUsage(String(user._id), limit);
    if (!usage.allowed) {
      if (usage.rateLimited) return NextResponse.json({ error: "RATE_LIMIT" }, { status: 429 });
      return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 403 });
    }

    const result = await callOpenAI(message, isPremiumAccess, history);
    
    // Format the response and add variation if it was generated by AI
    // (We skip adding the random opening if the response was a short hardcoded greeting/casual reply)
    let finalReply = result.reply;
    const isHardcodedReply =
      result.isShortCircuit === true ||
      result.reply.includes("How are you feeling today?") ||
      result.reply.includes("What's on your mind?") ||
      result.reply.includes("How can I support you right now?") ||
      result.reply.includes("You're always welcome") ||
      result.reply.includes("Tell me a bit more about that") ||
      result.reply.includes("I'm listening") ||
      result.reply.includes("Want to share more?");
                            
    if (result.usedRag && result.links && result.links.length > 0) {
      const overview = limitToLines(result.reply, isPremiumAccess ? 8 : 6);
      finalReply = `Here’s a quick overview: ${overview}`;
    } else if (!isHardcodedReply) {
      const maxLen = isPremiumAccess ? 2000 : 1000;
      const openings = [
        "I understand how you might be feeling 💛",
        "I’m glad you asked this",
        "",
      ];
      const shouldAddOpening = Math.random() > 0.6;
      const randomOpening = shouldAddOpening ? openings[Math.floor(Math.random() * openings.length)] : "";
      finalReply = randomOpening ? `${randomOpening}\n\n${result.reply}` : result.reply;
      if (finalReply.length > maxLen) finalReply = finalReply.slice(0, maxLen);
    }
    
    const payload: { reply: string; links?: RagLink[]; remaining?: number } = { reply: finalReply };
    if (result.usedRag && result.links && result.links.length > 0) {
      payload.links = result.links;
    }
    if (!isPremiumAccess) payload.remaining = usage.remaining;
    return NextResponse.json(payload);
  } catch (err: unknown) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

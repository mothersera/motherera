const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = process.env.BASE_URL || "https://motherera.com";
const SITEMAP_URL = process.env.SITEMAP_URL || `${BASE_URL.replace(/\/$/, "")}/sitemap.xml`;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}
if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function decodeEntities(str) {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(html) {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  const text = withoutScripts.replace(/<[^>]+>/g, " ");
  return decodeEntities(text).replace(/\s+/g, " ").trim();
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return "";
  return decodeEntities(match[1]).replace(/\s+/g, " ").trim();
}

async function getEmbedding(text) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Embeddings error");
  }
  const data = await res.json();
  const emb = data?.data?.[0]?.embedding;
  if (!Array.isArray(emb)) throw new Error("Invalid embedding response");
  return emb;
}

async function getUrlsFromSitemap() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${SITEMAP_URL}`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) => m[1].trim());
  return urls
    .filter((u) => u.startsWith(BASE_URL))
    .filter((u) => !u.includes("/dashboard"))
    .filter((u) => !u.includes("/api/"));
}

async function main() {
  console.log("Connecting MongoDB...");
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });

  const WebsiteContentSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      url: { type: String, required: true, unique: true, index: true },
      content: { type: String, required: true },
      embedding: { type: [Number], required: true },
    },
    { timestamps: true, collection: "website_content" }
  );
  const WebsiteContent =
    mongoose.models.WebsiteContent || mongoose.model("WebsiteContent", WebsiteContentSchema);

  const urls = await getUrlsFromSitemap();
  console.log(`Found ${urls.length} URLs`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      console.log(`[${i + 1}/${urls.length}] Fetching ${url}`);
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`Skip (HTTP ${res.status}): ${url}`);
        continue;
      }
      const html = await res.text();
      const title = extractTitle(html) || url.replace(BASE_URL, "");
      const content = stripHtml(html);
      if (!content || content.length < 200) {
        console.log(`Skip (too little content): ${url}`);
        continue;
      }

      const embedding = await getEmbedding(content.slice(0, 8000));

      await WebsiteContent.updateOne(
        { url },
        { $set: { title, url, content, embedding } },
        { upsert: true }
      );

      await sleep(250);
    } catch (e) {
      console.error(`Failed: ${url}`, e?.message || e);
      await sleep(500);
    }
  }

  console.log("Done.");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldSkipUrl(url) {
  return (
    url.includes("/dashboard") ||
    url.includes("/api/") ||
    url.includes("/login") ||
    url.includes("/register") ||
    url.includes("/checkout") ||
    url.includes("/pricing?") ||
    url.endsWith(".pdf") ||
    url.endsWith(".png") ||
    url.endsWith(".jpg") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".webp")
  );
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
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

function stripNonContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<(header|footer|nav|aside)[\s\S]*?<\/\1>/gi, " ");
}

function stripHtml(html) {
  const withoutScripts = stripNonContent(html)
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

function normalizeUrl(url, baseUrl) {
  try {
    const u = new URL(url, baseUrl);
    u.hash = "";
    u.search = "";
    const pathname = u.pathname.replace(/\/+$/, "") || "/";
    return `${u.origin}${pathname}`;
  } catch {
    return null;
  }
}

function extractInternalLinks(html, baseUrl) {
  const links = [];
  const hrefMatches = html.matchAll(/href\s*=\s*["']([^"']+)["']/gi);
  for (const match of hrefMatches) {
    const raw = match[1].trim();
    if (!raw) continue;
    if (raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("#")) continue;
    const normalized = normalizeUrl(raw, baseUrl);
    if (!normalized) continue;
    if (!normalized.startsWith(baseUrl)) continue;
    if (shouldSkipUrl(normalized)) continue;
    links.push(normalized);
  }
  return links;
}

async function crawlSite(startUrl, baseUrl, maxPages) {
  const queue = [startUrl];
  const visited = new Set();

  while (queue.length > 0 && visited.size < maxPages) {
    const current = queue.shift();
    if (!current) continue;
    if (visited.has(current)) continue;
    visited.add(current);

    try {
      const res = await fetch(current, {
        headers: {
          "User-Agent": "MotherEra-RAG-Ingestion/1.0",
          Accept: "text/html,*/*",
        },
      });
      if (!res.ok) continue;
      const html = await res.text();
      const links = extractInternalLinks(html, baseUrl);
      for (const l of links) {
        if (!visited.has(l) && !queue.includes(l) && visited.size + queue.length < maxPages * 2) {
          queue.push(l);
        }
      }
    } catch {
      continue;
    }
    await sleep(100);
  }

  return Array.from(visited);
}

async function getEmbedding(text, apiKey) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
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
  if (emb.length !== 1536) throw new Error(`Unexpected embedding length: ${emb.length}`);
  return emb;
}

async function getEmbeddingWithRetry(text, apiKey, attempts = 3) {
  let lastErr = null;
  for (let i = 0; i < attempts; i++) {
    try {
      return await getEmbedding(text, apiKey);
    } catch (e) {
      lastErr = e;
      const backoff = 500 * Math.pow(2, i) + Math.floor(Math.random() * 250);
      await sleep(backoff);
    }
  }
  throw lastErr || new Error("Embedding failed");
}

async function getUrlsFromSitemap(sitemapUrl, baseUrl) {
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${sitemapUrl}`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) => m[1].trim());
  const set = new Set();
  for (const u of urls) {
    const normalized = normalizeUrl(u, baseUrl);
    if (!normalized) continue;
    if (!normalized.startsWith(baseUrl)) continue;
    if (normalized.includes("/dashboard")) continue;
    if (normalized.includes("/api/")) continue;
    set.add(normalized);
  }
  return Array.from(set);
}

async function main() {
  loadEnvFile(path.join(process.cwd(), ".env.local"));
  loadEnvFile(path.join(process.cwd(), ".env"));

  const MONGODB_URI = process.env.MONGODB_URI;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const BASE_URL = (process.env.BASE_URL || "https://motherera.com").replace(/\/+$/, "");
  const SITEMAP_URL = process.env.SITEMAP_URL || `${BASE_URL}/sitemap.xml`;
  const MAX_PAGES = Number(process.env.MAX_PAGES || "80");

  if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
  if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");

  console.log("Connecting MongoDB...");
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log(`Connected to DB: ${mongoose.connection.name}`);

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

  let urls = [];
  try {
    urls = await getUrlsFromSitemap(SITEMAP_URL, BASE_URL);
  } catch (e) {
    console.log(`Sitemap fetch failed, falling back to crawling: ${SITEMAP_URL}`);
    const start = normalizeUrl(BASE_URL, BASE_URL);
    urls = start ? await crawlSite(start, BASE_URL, MAX_PAGES) : [];
  }

  console.log(`Pages found: ${urls.length}`);

  let embeddedCount = 0;
  let upsertedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      console.log(`[${i + 1}/${urls.length}] Fetching ${url}`);
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`Skip (HTTP ${res.status}): ${url}`);
        skippedCount++;
        continue;
      }
      const html = await res.text();
      const title = extractTitle(html) || url.replace(BASE_URL, "");
      const content = stripHtml(html).slice(0, 5000);
      if (!content || content.length < 200) {
        console.log(`Skip (too little content): ${url}`);
        skippedCount++;
        continue;
      }

      const embedding = await getEmbeddingWithRetry(content, OPENAI_API_KEY, 3);
      if (!Array.isArray(embedding) || embedding.length !== 1536) {
        console.log(`Skip (invalid embedding): ${url}`);
        skippedCount++;
        continue;
      }
      embeddedCount++;

      const result = await WebsiteContent.updateOne(
        { url },
        { $set: { title, url, content, embedding } },
        { upsert: true }
      );
      if (result && (result.upsertedCount || result.modifiedCount || result.matchedCount)) {
        upsertedCount++;
      }

      await sleep(250);
    } catch (e) {
      console.error(`Failed: ${url}`, e?.message || e);
      failedCount++;
      await sleep(500);
    }
  }

  const totalDocs = await WebsiteContent.countDocuments({});
  const withEmbeddings = await WebsiteContent.countDocuments({ embedding: { $exists: true, $type: "array" } });

  console.log(`Embedded: ${embeddedCount}`);
  console.log(`Inserted/Updated: ${upsertedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Collection count: ${totalDocs}`);
  console.log(`With embeddings: ${withEmbeddings}`);
  console.log(`RAG ingestion complete: ${withEmbeddings} documents with embeddings stored`);

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

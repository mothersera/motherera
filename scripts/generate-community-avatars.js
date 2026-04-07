const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
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

async function generateOpenAIImage(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "high",
      n: 1,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Image generation failed");
  }

  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  const url = data?.data?.[0]?.url;
  if (typeof b64 === "string" && b64) {
    return Buffer.from(b64, "base64");
  }
  if (typeof url === "string" && url) {
    const imgRes = await fetch(url);
    if (!imgRes.ok) throw new Error("Failed to download generated image");
    const arr = await imgRes.arrayBuffer();
    return Buffer.from(arr);
  }
  throw new Error("Unexpected image response");
}

async function writeAvatar(buffer, outPath) {
  await sharp(buffer)
    .resize({ width: 160, height: 160, fit: "cover", position: "attention" })
    .webp({ quality: 78, effort: 4 })
    .toFile(outPath);
}

(async () => {
  loadEnvLocal();

  const outDir = path.join(__dirname, "..", "public", "avatars");
  fs.mkdirSync(outDir, { recursive: true });

  const prompts = [
    "A natural portrait photo of a young Indian woman (age 24–30) smiling softly, candid lifestyle photography, soft natural window light, realistic skin texture, minimal makeup, simple modest clothing, subtle blurred home background, head and shoulders framing, authentic motherhood warmth, high realism, no studio backdrop, no glamour styling, no heavy retouching",
    "A realistic candid head-and-shoulders portrait of a South Asian woman (age 26–33) with a calm warm smile, soft natural light, slight background blur in a cozy home environment, minimal makeup, simple modest clothing, natural hair, authentic human imperfections, lifestyle photography feel, high realism, no model pose, no studio lighting",
    "A natural lifestyle portrait of a young Indian woman (age 22–28) smiling gently, warm ambient daylight, realistic skin and texture, minimal makeup, modest casual clothing, subtle blurred indoor home background, head and shoulders framing, candid and human, high realism, not a stock photo, not overly perfect",
  ];

  const outputs = ["mom-a.webp", "mom-s.webp", "mom-r.webp"].map((f) => path.join(outDir, f));

  for (let i = 0; i < prompts.length; i++) {
    const img = await generateOpenAIImage(prompts[i]);
    await writeAvatar(img, outputs[i]);
    process.stdout.write(`Generated ${path.relative(path.join(__dirname, ".."), outputs[i])}\n`);
  }
})();

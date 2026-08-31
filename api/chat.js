import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ reply: "API Key পাওয়া যায়নি! Vercel Settings চেক করুন।" });
  }

  try {
    let routineData = "";
    try {
      const routinePath = path.join(process.cwd(), "data", "routine.json");
      if (fs.existsSync(routinePath)) {
        routineData = fs.readFileSync(routinePath, "utf8");
      }
    } catch {
      // Ignore if file not found
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের তৈরি করা স্মার্ট অ্যাসিস্ট্যান্ট 'CR GPT'।
তুমি সর্বদা বাংলায় মার্জিত, বন্ধুসুলভ ও রসবোধপূর্ণ ভাষায় কথা বলবে।
ক্লাস রুটিন, পরীক্ষার সময়সূচি বা নোটিশ সংক্রান্ত তথ্যের ভিত্তিতে উত্তর দাও:
${routineData}

ইউজারের প্রশ্ন: ${message}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ 
      reply: `Gemini এরর: ${error.message || "সার্ভার এরর"}` 
    });
  }
}
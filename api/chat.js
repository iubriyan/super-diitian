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
      // Ignore if routine not present
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const fullPrompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের জন্য তৈরি করা চ্যাটবট 'CR GPT'। 
বন্ধুত্বপূর্ণ, রসবোধপূর্ণ ও সাহায্যকারী ভঙ্গিতে বাংলায় উত্তর দাও।
তথ্যসূত্র: ${routineData || "কোনো অতিরিক্ত ফাইল সংযুক্ত নেই।"}

ইউজারের প্রশ্ন: ${message}`;

    // মডেল লিস্ট (একটিতে ব্যর্থ হলে অন্যটিতে চেষ্টা করবে)
    const modelsToTry = ["gemini-1.5-flash-latest", "gemini-1.5-flash", "gemini-pro"];
    let reply = "";
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        reply = response.text();
        if (reply) break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!reply) {
      throw lastError || new Error("মডেল রেসপন্স দিতে পারেনি");
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ 
      reply: `Gemini এরর: ${error.message || "সার্ভার এরর"}` 
    });
  }
}
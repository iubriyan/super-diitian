import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  // CORS ও মেথড ভ্যালিডেশন
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Gemini API key is not configured" });
  }

  try {
    // রুটিন ডেটা লোড করা (যদি data/routine.json থাকে)
    let routineData = "";
    try {
      const routinePath = path.join(process.cwd(), "data", "routine.json");
      if (fs.existsSync(routinePath)) {
        routineData = fs.readFileSync(routinePath, "utf8");
      }
    } catch (e) {
      console.log("No routine file found, continuing without it.");
    }

    const systemPrompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের তৈরি করা স্মার্ট অ্যাসিস্ট্যান্ট 'CR GPT'।
তুমি সর্বদা বাংলায় মার্জিত, বন্ধুসুলভ ও রসবোধপূর্ণ ভাষায় কথা বলবে।
ক্লাস রুটিন, পরীক্ষার সময়সূচি বা নোটিশ সংক্রান্ত প্রশ্নের উত্তর নিচের তথ্যের ভিত্তিতে দেবে:
${routineData}
যদি কোনো তথ্য তোমার কাছে না থাকে, তবে বিনয়ের সাথে বলো যে তথ্যটি তোমার কাছে নেই এবং সিআরের সাথে যোগাযোগ করতে বলো।`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ reply: "এআই রেসপন্স তৈরিতে সমস্যা হয়েছে। কিছুক্ষণ পর চেষ্টা করো।" });
  }
}
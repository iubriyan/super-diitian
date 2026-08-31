import fs from "fs";
import path from "path";

let cachedRoutine = null;

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
    return res.status(500).json({ reply: "API Key পাওয়া যায়নি।" });
  }

  try {
    // বারবার ফাইল রিড না করে মেমোরিতে ক্যাশ রাখা
    if (!cachedRoutine) {
      try {
        const routinePath = path.join(process.cwd(), "data", "routine.json");
        if (fs.existsSync(routinePath)) {
          cachedRoutine = fs.readFileSync(routinePath, "utf8");
        }
      } catch {
        cachedRoutine = "কোনো রুটিন ডেটা নেই";
      }
    }

    const systemPrompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের চ্যাটবট 'CR GPT'। খুব সংক্ষেপে ও পয়েন্ট আকারে বাংলায় দ্রুত উত্তর দাও।
তথ্যসূত্র: ${cachedRoutine}
প্রশ্ন: ${message}`;

    // সরাসরি সবচেয়ে দ্রুতগতির মডেল এবং টোকেন রেস্ট্রিকশন
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          maxOutputTokens: 300, // দ্রুত আউটপুটের জন্য সংক্ষেপ করা
          temperature: 0.7
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "গুগল এপিআই এরর");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "কোনো উত্তর পাওয়া যায়নি।";
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Fast API Error:", error);
    return res.status(500).json({ reply: "সার্ভারে সাময়িক সমস্যা হচ্ছে।" });
  }
}
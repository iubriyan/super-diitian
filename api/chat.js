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
      // রুটিন ফাইল না থাকলে উপেক্ষা করবে
    }

    const systemPrompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের জন্য তৈরি করা চ্যাটবট 'CR GPT'। 
বন্ধুত্বপূর্ণ, রসবোধপূর্ণ ও সাহায্যকারী ভঙ্গিতে বাংলায় উত্তর দাও।
তথ্যসূত্র: ${routineData || "কোনো অতিরিক্ত ফাইল সংযুক্ত নেই।"}

ইউজারের প্রশ্ন: ${message}`;

    // ১. গুগলের কাছে বর্তমানে সক্রিয় ও অনুমোদিত মডেলের তালিকা চাওয়া
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResponse = await fetch(listUrl);
    const listData = await listResponse.json();

    if (!listResponse.ok) {
      throw new Error(listData.error?.message || "এপিআই কি দিয়ে মডেল লিস্ট পাওয়া যায়নি");
    }

    // ২. জেনারেট সাপোর্ট করে এমন মডেল ফিল্টার করা
    const validModels = (listData.models || [])
      .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => m.name.replace("models/", ""));

    if (validModels.length === 0) {
      throw new Error("আপনার এপিআই কি-তে কোনো সক্রিয় মডেল পাওয়া যায়নি।");
    }

    // ৩. অগ্রাধিকার অনুযায়ী সেরা মডেল বাছাই
    let chosenModel =
      validModels.find((m) => m.includes("flash") && !m.includes("exp")) ||
      validModels.find((m) => m.includes("flash")) ||
      validModels.find((m) => m.includes("gemini")) ||
      validModels[0];

    // ৪. লাইভ মডেল এন্ডপয়েন্টে রিকোয়েস্ট পাঠানো
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${apiKey}`;
    const response = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemPrompt }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "কনটেন্ট জেনারেশনে সমস্যা হয়েছে");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "দুঃখিত, উত্তর পাওয়া যায়নি।";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini Live Resolver Error:", error);
    return res.status(500).json({ 
      reply: `Gemini এরর: ${error.message || "সার্ভার এরর"}` 
    });
  }
}
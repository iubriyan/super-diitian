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
      // রুটিন ফাইল না থাকলে কোনো সমস্যা নেই
    }

    const systemPrompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের জন্য তৈরি করা চ্যাটবট 'CR GPT'। 
বন্ধুত্বপূর্ণ, রসবোধপূর্ণ ও সাহায্যকারী ভঙ্গিতে বাংলায় উত্তর দাও।
তথ্যসূত্র: ${routineData || "কোনো অতিরিক্ত ফাইল সংযুক্ত নেই।"}

ইউজারের প্রশ্ন: ${message}`;

    // স্টেবল v1 এন্ডপয়েন্ট এবং সাপোর্টেড মডেলগুলোর লিস্ট
    const modelCandidates = ["gemini-2.5-flash", "gemini-1.5-flash-8b", "gemini-2.0-flash"];
    let reply = "";
    let lastErrorMsg = "";

    for (const model of modelCandidates) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
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
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          reply = data.candidates[0].content.parts[0].text;
          break;
        } else {
          lastErrorMsg = data.error?.message || "Model request failed";
        }
      } catch (err) {
        lastErrorMsg = err.message;
      }
    }

    if (!reply) {
      throw new Error(lastErrorMsg || "কোনো মডেল থেকে উত্তর পাওয়া যায়নি");
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ 
      reply: `Gemini এরর: ${error.message || "সার্ভার এরর"}` 
    });
  }
}
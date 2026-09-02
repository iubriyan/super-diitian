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

  const { message, history } = req.body || {};
  
  // Vercel Environment Variable অথবা ডিরেক্ট ওপেনরাউটার কী
  const apiKey = process.env.OPENROUTER_API_KEY;

  try {
    if (!cachedRoutine) {
      try {
        const routinePath = path.join(process.cwd(), "data", "routine.json");
        if (fs.existsSync(routinePath)) {
          cachedRoutine = fs.readFileSync(routinePath, "utf8");
        }
      } catch {
        cachedRoutine = "";
      }
    }

    const systemPrompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের জন্য তৈরি করা এআই সহকারী 'CR GPT'। 
তোমার কাজ ক্লাসের রুটিন, রুম নম্বর, ক্লাস শিডিউল ও স্টাডি মেটেরিয়াল সম্পর্কে শিক্ষার্থীদের সাহায্য করা। 
সর্বদা বন্ধুত্বপূর্ণ, হাসিখুশি ও রসবোধপূর্ণ ভঙ্গিতে বাংলায় ছোট ও স্পষ্ট উত্তর দাও।

তথ্যসূত্র:
- ব্যাচ: DIIT CSE 26th Batch (1st Year, 2nd Semester)
- ক্লাস বার: রবিবার থেকে বুধবার (Sunday to Wednesday)
- রুম: Section A = Room 704, Section B = Room 706
- সময়সূচি: 11:40 AM - 12:50 PM, 12:50 PM - 02:00 PM, 02:20 PM - 03:30 PM
- শিক্ষকবৃন্দ: Poly Bhoumik (PB), Md. Zakir Hossain (MZH), Saidur Rahman (SR), Md. Imran Hossain (MIH), Md. Mushfiqur Rahaman (MMR), Ramen Kumar Das (RKD), Md. Parvezur Rahman Mahin (PRM), Mubtasim Fuad Opee (MFO), Sabrina Quadir (SQ), Farjana Parvin (FP)
${cachedRoutine ? "অতিরিক্ত রুটিন ফাইল: " + cachedRoutine : ""}`;

    const messages = [{ role: "system", content: systemPrompt }];

    if (Array.isArray(history)) {
      history.slice(-4).forEach(h => {
        messages.push({
          role: h.role === "model" ? "assistant" : "user",
          content: h.text || h.content || ""
        });
      });
    }

    messages.push({ role: "user", content: message });

    // OpenRouter API কল (Gemini 2.0 Flash Free)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://super-diitian.vercel.app",
        "X-Title": "Super DIITian CR GPT",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: messages,
        max_tokens: 300,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "OpenRouter এপিআই থেকে রেসপন্স আসেনি");
    }

    const reply = data.choices?.[0]?.message?.content || "দুঃখিত, কোনো উত্তর তৈরি করা যায়নি।";
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("OpenRouter Backend Error:", error);
    return res.status(500).json({ 
      reply: `CR GPT এরর: ${error.message || "সার্ভারে সাময়িক সমস্যা হচ্ছে।"}` 
    });
  }
}
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
    const systemPrompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের জন্য তৈরি করা চ্যাটবট 'CR GPT'। 
সর্বদা বিনয়ী, রসবোধপূর্ণ ও সাহায্যকারী ভঙ্গিতে বাংলায় উত্তর দাও।

ইউজারের প্রশ্ন: ${message}`;

    // ধাপ ১: আপনার API Key-তে অনুমোদিত কার্যকর মডেল স্বয়ংক্রিয়ভাবে খুঁজে বের করা
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const listData = await listRes.json();

    if (!listRes.ok) {
      throw new Error(listData.error?.message || "API Key ভ্যালিড নয় বা পারমিশন নেই");
    }

    const availableModels = (listData.models || [])
      .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
      .map(m => m.name);

    // অগ্রাধিকার অনুযায়ী মডেল নির্বাচন (flash -> pro -> প্রথম যেকোনোটি)
    let selectedModel = availableModels.find(m => m.includes("flash") && !m.includes("experimental")) 
      || availableModels.find(m => m.includes("gemini"))
      || availableModels[0];

    if (!selectedModel) {
      selectedModel = "models/gemini-1.5-flash-latest";
    }

    // ধাপ ২: নির্বাচিত মডেল দিয়ে কনটেন্ট তৈরি
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`;

    const generateRes = await fetch(generateUrl, {
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

    const generateData = await generateRes.json();

    if (!generateRes.ok) {
      throw new Error(generateData.error?.message || "কনটেন্ট তৈরিতে সমস্যা হয়েছে");
    }

    const reply = generateData.candidates?.[0]?.content?.parts?.[0]?.text || "দুঃখিত, কোনো উত্তর তৈরি করা যায়নি।";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini Final Error:", error);
    return res.status(500).json({ 
      reply: `Gemini এরর: ${error.message || "সার্ভার এরর"}` 
    });
  }
}
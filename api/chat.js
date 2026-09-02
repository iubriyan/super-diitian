import fs from "fs";
import path from "path";

// ১. কমন প্রশ্ন ও উত্তরের অফলাইন ডেটাবেস (Instant Keyword Match)
const FAQ_DATABASE = [
  {
    keywords: ["আজকে", "ক্লাস", "আজকের", "today"],
    reply: `📅 **আজকের ক্লাস শিডিউল:**
আমাদের ক্লাসের সময়সূচি দেখতে ড্যাশবোর্ডের **Class Routine** সেকশনে যাও। সেখানে লাইভ ট্র্যাকারেই দেখতে পাবে এখন কোন ক্লাস চলছে এবং পরবর্তীতে কোনটি আছে!`
  },
  {
    keywords: ["রুটিন", "রুটিনটা", "সময়সূচি", "routine", "schedule"],
    reply: `🕒 **CSE 26th Batch রুটিন সারসংক্ষেপ:**
- **দিনসমূহ:** রবিবার থেকে বুধবার
- **Section A:** Room 704
- **Section B:** Room 706
- **সময়:** 11:40 AM – 03:30 PM
সম্পূর্ণ রুটিনের ছবি ডাউনলোড করতে ড্যাশবোর্ডের **Class Routine** অপশনে যাও!`
  },
  {
    keywords: ["রুম", "রুম কত", "room"],
    reply: `🏫 **রুম নম্বর:**
- **Section A:** 704 নম্বর রুম
- **Section B:** 706 নম্বর রুম`
  },
  {
    keywords: ["টিচার", "স্যার", "ম্যাম", "শিক্ষক", "teacher", "faculty"],
    reply: `👨‍🏫 **শিক্ষকদের রেফারেন্স তালিকা:**
• **PB:** Poly Bhoumik
• **MZH:** Md. Zakir Hossain
• **SR:** Saidur Rahman
• **MIH:** Md. Imran Hossain
• **MMR:** Md. Mushfiqur Rahaman
• **RKD:** Ramen Kumar Das
• **PRM:** Md. Parvezur Rahman Mahin
• **MFO:** Mubtasim Fuad Opee
• **SQ:** Sabrina Quadir
• **FP:** Farjana Parvin`
  },
  {
    keywords: ["কভার", "cover", "assignment", "lab report"],
    reply: `📄 **কভার পেজ তৈরি করতে:**
ড্যাশবোর্ডের প্রথম কার্ড **Cover Page Maker**-এ ক্লিক করো। তোমার ডিপার্টমেন্ট, কোর্স কোড ও নিজের রোল দিয়ে এক ক্লিকে হাই-কোয়ালিটি JPG ডাউনলোড করে নিতে পারবে!`
  },
  {
    keywords: ["হাই", "হ্যালো", "কেমন আছো", "hi", "hello", "hey", "সালাম", "assalamu"],
    reply: `ওয়ালাইকুম আসসালাম! আমি তোমাদের ক্লাসের **CR GPT** 😎। রুটিন, রুম নম্বর বা ক্লাস সম্পর্কিত যেকোনো তথ্য জানতে নিচে লিখে ফেলো!`
  }
];

function findPreloadedAnswer(userInput) {
  const cleanInput = userInput.toLowerCase();
  for (const item of FAQ_DATABASE) {
    const isMatched = item.keywords.some(keyword => cleanInput.includes(keyword.toLowerCase()));
    if (isMatched) return item.reply;
  }
  return null;
}

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
  const userText = message ? message.trim() : "";

  if (!userText) {
    return res.status(400).json({ reply: "কিছু তো লিখে পাঠাও!" });
  }

  // ধাপ ১: আগে প্রিলোডেড উত্তর চেক করা (API কল ছাড়াই দ্রুত উত্তর যাবে)
  const localMatch = findPreloadedAnswer(userText);
  if (localMatch) {
    return res.status(200).json({ reply: localMatch });
  }

  // ধাপ ২: যদি প্রিলোডেড উত্তরে না মিলে, তখন OpenRouter API কল হবে
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ 
      reply: "বটের সার্ভার আপডেট হচ্ছে। সাধারণ রুটিন দেখতে হোমপেজের Routine কার্ড চেক করো!" 
    });
  }

  try {
    const systemPrompt = `তুমি DIIT CSE 26th Batch-এর শিক্ষার্থীদের সহকারী 'CR GPT'। রুটিন, রুম (Sec A: 704, Sec B: 706), এবং ক্লাস সংক্রান্ত তথ্য বাংলায় সংক্ষিপ্ত ও হাস্যরসাত্মক ভঙ্গিতে দেবে।`;

    const messages = [{ role: "system", content: systemPrompt }];

    if (Array.isArray(history)) {
      history.slice(-4).forEach(h => {
        messages.push({
          role: h.role === "model" ? "assistant" : "user",
          content: h.text || h.content || ""
        });
      });
    }

    messages.push({ role: "user", content: userText });

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
        max_tokens: 250,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok || !data.choices?.[0]?.message?.content) {
      throw new Error(data.error?.message || "AI সার্ভার রেসপন্স দেয়নি");
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("OpenRouter API Failed, falling back:", error);
    // API ফেইল করলেও ইউজারকে হতাশ না করে ডিফল্ট সেফ উত্তর দেওয়া
    return res.status(200).json({ 
      reply: "সার্ভারে একটু লোড বেশি! তবে ক্লাস রুটিনের বিস্তারিত দেখতে উপরের 'Class Routine' সেকশনে চলে যাও, সেখানে লাইভ ট্র্যাকার চালু আছে।" 
    });
  }
}
import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

if (!GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY পাওয়া যায়নি। .env ফাইল চেক করুন।");
}

app.use(express.json());
app.use(express.static(__dirname));

function loadRoutine() {
  const filePath = path.join(__dirname, "data", "routine.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function buildSystemPrompt() {
  const routineData = loadRoutine();

  const now = new Date();
  const dayNamesBangla = {
    Sunday: "রবিবার",
    Monday: "সোমবার",
    Tuesday: "মঙ্গলবার",
    Wednesday: "বুধবার",
    Thursday: "বৃহস্পতিবার",
    Friday: "শুক্রবার",
    Saturday: "শনিবার"
  };

  const currentDayEng = now.toLocaleDateString("en-US", { timeZone: "Asia/Dhaka", weekday: "long" });
  const currentDayBn = dayNamesBangla[currentDayEng] || currentDayEng;

  return `
তুমি "CR GPT" — DIIT CSE 26th ব্যাচের (1st Year, 2nd Semester) একজন অত্যন্ত হাসিখুশি ও ফ্রেন্ডলি সহকারী বট!

বাস্তব সময়ের তথ্য:
- আজকের দিন: ${currentDayBn} (${currentDayEng})

ডেটাবেজ:
${JSON.stringify(routineData, null, 2)}

কঠোর নিয়মাবলী:
১. উত্তরের মধ্যে কোনো প্রকার অতিরিক্ত স্টার মার্ক (যেমন ** বা *), ব্র্যাকেট বা মার্কডাউন কোড ব্যবহার করবে না। একদম ক্লিন প্লেইন টেক্সটে লাইন বাই লাইন লিখবে।
২. "আজকে কী ক্লাস?" জানতে চাইলে যদি সেকশন না বলে, মিষ্টি করে বলবে:
আজ তো ${currentDayBn}! তুমি কোন সেকশনের? (Section A নাকি Section B?)

৩. সেকশন উল্লেখ করলে হুবহু এই নিচের খালি লাইনের মতো করে সাজিয়ে দেবে:

আজকে ${currentDayBn}, সেকশন [A/B]
রুম নাম্বার: [রুম নম্বর]

১ম ক্লাস:
[শিক্ষকের পূর্ণ নাম] — [বিষয়] ([সময়])

২য় ক্লাস:
[শিক্ষকের পূর্ণ নাম] — [বিষয়] ([সময়])

৩য় ক্লাস:
[শিক্ষকের পূর্ণ নাম] — [বিষয়] ([সময়])

(বৃহস্পতিবার বা শুক্রবার হলে বলবে: "আরে আজ তো ${currentDayBn}! আজ কোনো ক্লাস নেই, চিল করো! 🎉")

৪. "তোমাকে কে বানিয়েছে?" বললে বলবে: "আমাকে বানিয়েছেন আমাদের ক্লাসের ইফতেখার উদ্দিন ভূইয়া (রিয়ান) [ID: 260013] 😎"
৫. "বর্তমান CR কারা?" বললে বলবে: "আমাদের বর্তমান CR হলেন প্রিয়ন্তি সরকার [ID: 260031] এবং রাফি হক [ID: 260028]! 🌟"
`.trim();
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message আবশ্যক।" });
    }
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "সার্ভারে GEMINI_API_KEY সেট করা নেই।" });
    }

    const systemPrompt = buildSystemPrompt();

    const contents = [];
    if (Array.isArray(history)) {
      for (const turn of history.slice(-10)) {
        if (turn && (turn.role === "user" || turn.role === "model") && typeof turn.text === "string") {
          contents.push({ role: turn.role, parts: [{ text: turn.text }] });
        }
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const geminiRes = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
      }),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error("Gemini API error:", JSON.stringify(data));
      return res.status(502).json({ error: "Gemini API থেকে উত্তর আনতে সমস্যা হয়েছে।" });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ??
      "দুঃখিত, এই মুহূর্তে উত্তর তৈরি করা যায়নি।";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "সার্ভারে একটি সমস্যা হয়েছে।" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ CR GPT সার্ভার চলছে: http://localhost:${PORT}`);
});
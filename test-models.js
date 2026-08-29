import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function checkModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.models) {
      console.log("আপনার কী-তে সাপোর্ট করা মডেলগুলোর তালিকা:");
      data.models
        .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
        .forEach(m => console.log(`- ${m.name.replace("models/", "")}`));
    } else {
      console.error("এরর রেসপন্স:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("কানেকশন এরর:", err);
  }
}

checkModels();
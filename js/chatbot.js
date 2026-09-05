/* ============================================================
   CR GPT Ultimate Keyword-Aware AI Chatbot Engine
   ============================================================ */

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCRGptSmartResponse(rawQuery) {
  if (!rawQuery) return "বলো, কিছু বলবা? 😊";
  
  // কেস সেন্সিটিভিটি এবং প্রশ্নবোধক বা অন্য চিহ্ন সমস্যা দূর করার জন্য ক্লিন করা
  const cleanQ = rawQuery.toLowerCase().replace(/[?.,!]/g, "").trim();

  // ১. ক্রিয়েটর বা ডেভেলপার সম্পর্কিত কিওয়ার্ড
  if (
    cleanQ.includes("iftekhar") || cleanQ.includes("riyan") || cleanQ.includes("ইফতেখার") || 
    cleanQ.includes("রিয়ান") || cleanQ.includes("developer") || cleanQ.includes("admin") || 
    cleanQ.includes("who made") || cleanQ.includes("কে বানাইছে") || cleanQ.includes("কে তৈরি")
  ) {
    return `😎 **Iftekhar Uddin Bhuiyan (Riyan)** ভাই হলেন এই পুরো Super DIITian সিস্টেম এবং আমাকে (CR GPT) বানানোর মাস্টারমাইন্ড! উনার রোল: **260013**।`;
  }

  // ২. সিআর সম্পর্কিত কিওয়ার্ড
  if (
    cleanQ.includes("cr") || cleanQ.includes("সিআর") || 
    cleanQ.includes("prionty") || cleanQ.includes("প্রিয়ন্তি") || 
    cleanQ.includes("rafi") || cleanQ.includes("রাফি")
  ) {
    return `আরেহ! আমাদের সম্মানিত CR প্রিয়ন্তি (260031) আর রাফিউল (260053) তো সারাদিন ব্যস্ত থাকে, তাই ওদের প্যারা না দিয়ে আমাকে বলো! 😜`;
  }

  // ৩. কি করছ বা কী অবস্থা সম্পর্কিত কিওয়ার্ড (বাংলা ও ইংরেজি উভয়)
  if (
    cleanQ.includes("ki koro") || cleanQ.includes("কি কর") || cleanQ.includes("ki kos") || 
    cleanQ.includes("what are you doing") || cleanQ.includes("k ki koro") || cleanQ.includes("কী করো")
  ) {
    const doingList = [
      `এই তো বসে বসে তোমাদের ব্যাচের অ্যাটেন্ডেন্স আর কার কার ল্যাব রিপোর্ট বাকি আছে সেটা হিসাব করতেছি! 📊`,
      `বসে আছি আর ভাবছি আজকে কোন স্যারের ক্লাসে কে কে পিছুটান দিবে! 😂`,
      `এই তো পোর্টালে বসে রুটিন আর আবহাওয়া চেক করতেছি। বলো তোমার কি অবস্থা?`
    ];
    return getRandomItem(doingList);
  }

  // ৪. কেমন আছো বা হালচাল সম্পর্কিত কিওয়ার্ড
  if (
    cleanQ.includes("kemon aso") || cleanQ.includes("kemon acho") || cleanQ.includes("ki khobor") || 
    cleanQ.includes("how are you") || cleanQ.includes("কেমন আছো") || cleanQ.includes("কি খবর")
  ) {
    const statusList = [
      `আলহামদুলিল্লাহ একদম ফিটফাট আছি! বলো তোমার পড়ালেখার কী অবস্থা? 🚀`,
      `বিকাশ বা পেমেন্টের টেনশন ছাড়া একদম অস্থির আছি! তুমি বলো, ক্লাস কেমন লাগতেছে? 😎`,
      `দম ফেলার ফুরসত নাই ভাই, সারাদিন ডিপার্টমেন্টের প্যারা সামলাইতে হয়! 🥱`
    ];
    return getRandomItem(statusList);
  }

  // ৫. হাই, হ্যালো, সালাম ও Greeting সম্পর্কিত কিওয়ার্ড
// ------------------------------------------------------------

// User-এর প্রশ্নকে normalize করা
const greetingQ = cleanQ
  .toLowerCase()
  .replace(/[.,!?;:'"()[\]{}<>@#$%^&*_+=~`|\\/—–-]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

// Greeting-এর বিভিন্ন সম্ভাব্য variation
const greetingPatterns = [

  // English — Hi
  "hi",
  "h i",
  "hii",
  "hiii",
  "hiiii",
  "hiiiiii",
  "hi hi",
  "hi hi hi",
  "hi there",
  "hi bot",
  "hi cr",
  "hi cr gpt",
  "hi crgp",
  "hi crgpt",
  "hi bro",
  "hi vai",
  "hi bhai",
  "hi dude",
  "hi man",

  // English — Hello
  "hello",
  "helloo",
  "hellooo",
  "helloooo",
  "hello there",
  "hello bot",
  "hello cr",
  "hello cr gpt",
  "hello crgpt",
  "hello bro",
  "hello vai",
  "hello bhai",

  // Hey
  "hey",
  "heyy",
  "heyyy",
  "heyyyy",
  "hey there",
  "hey bot",
  "hey cr",
  "hey cr gpt",
  "hey bro",
  "hey vai",
  "hey bhai",

  // HLW / Hlw variations
  "hlw",
  "hlww",
  "hlwww",
  "hlwwww",
  "hlw bot",
  "hlw cr",
  "hlw cr gpt",
  "hlw bro",
  "hlw vai",
  "hlw bhai",

  // Helo variations
  "helo",
  "heloo",
  "helooo",
  "heloooo",
  "helo bot",
  "helo cr",
  "helo bro",
  "helo vai",

  // Yo / হালকা casual greeting
  "yo",
  "yoo",
  "yooo",
  "yo bro",
  "yo bot",

  // What's up type greeting
  "whats up",
  "what up",
  "wassup",
  "wazzup",
  "sup",
  "s up",

  // বাংলা — হাই
  "হাই",
  "হাইই",
  "হাইইই",
  "হাইইইই",
  "হাই বট",
  "হাই সিআর",
  "হাই সিআর জিপিটি",
  "হাই ভাই",
  "হাই ব্রো",
  "হাই বস",

  // বাংলা — হ্যালো
  "হ্যালো",
  "হ্যালোও",
  "হ্যালোওও",
  "হ্যালোওওও",
  "হ্যালো বট",
  "হ্যালো সিআর",
  "হ্যালো সিআর জিপিটি",
  "হ্যালো ভাই",
  "হ্যালো ব্রো",

  // বাংলা — হেলো
  "হেলো",
  "হেলোও",
  "হেলোওও",
  "হেলোওওও",
  "হেলো বট",
  "হেলো ভাই",
  "হেলো ব্রো",

  // বাংলা — হেই
  "হেই",
  "হেইই",
  "হেইইই",
  "হেইইইই",
  "হেই বট",
  "হেই ভাই",
  "হেই ব্রো",

  // বাংলা — সালাম
  "সালাম",
  "সালাম ভাই",
  "সালাম ভায়া",
  "সালাম বস",
  "সালাম সিআর",
  "সালাম সিআর জিপিটি",
  "আসসালামু আলাইকুম",
  "আসসালামু আলাইকুম ভাই",
  "আসসালামু আলাইকুম বস",
  "আসসালামু আলাইকুম সিআর",
  "আসসালামু আলাইকুম সিআর জিপিটি",

  // English transliteration of Salam
  "salam",
  "salaam",
  "salaam bro",
  "salam bro",
  "salam vai",
  "salam bhai",
  "salam boss",
  "assalamualaikum",
  "assalamu alaikum",
  "assalam o alaikum",
  "assalamualaikum bro",
  "assalamualaikum vai",
  "assalamualaikum bhai",
  "assalamualaikum boss",
  "assalamu alaikum bro",
  "assalamu alaikum vai",
  "assalamu alaikum bhai"
];


// Exact match অথবা greeting phrase হিসেবে match
const isGreeting =
  greetingPatterns.includes(greetingQ) ||

  // একই greeting বারবার লেখা হলে
  /^(hi+|hello+|hey+|helo+|hlw+|yo+|হাই+|হ্যালো+|হেলো+|হেই+)$/.test(greetingQ) ||

  // Greeting + casual শব্দ
  /^(hi|hello|hey|helo|hlw|yo)\s+(bot|cr|crgpt|cr gpt|bro|vai|bhai|dude|man|boss)$/.test(greetingQ) ||

  // বাংলা greeting + casual শব্দ
  /^(হাই+|হ্যালো+|হেলো+|হেই+)\s+(বট|ভাই|ব্রো|বস|সিআর|সিআর জিপিটি)$/.test(greetingQ);


// Greeting হলে random reply
if (isGreeting) {

  const helloList = [

    `ওয়ালাইকুমুসসালাম! 😎 CR GPT হাজির! বলো, আজকে ক্লাসের খবর লাগবে নাকি জীবনের? 😂`,

    `আরে! কে ডাকলো আমাকে? 👀 CR GPT অনলাইনে, মাইক হাতে, খাতা খুলে বসে আছি! 🎤📚`,

    `হ্যালোওও! 😎 আমি তো ভাবছিলাম আজকে কেউ আমাকে মনে রাখেইনি! বলো, কী খবর? 😂`,

    `হেই হেই! 👋 CR GPT রিপোর্টিং ফর ডিউটি! কোনো নোটিশ, রুটিন, ক্লাস আপডেট নাকি গোপন মিশন? 🫡😂`,

    `হাই! 😎 উপস্থিতি নেওয়া শুরু করব, নাকি আগে তোমার সমস্যাটা শুনব? 😂📋`,

    `হ্যালো! আমি CR GPT—মানুষের প্রশ্নের উত্তর দিই, কিন্তু অ্যাসাইনমেন্ট করে দিই না... মাঝে মাঝে করি অবশ্য। 😌😂`,

    `ওহে! 👀 এত সুন্দর করে ডাকলে তো উত্তর দিতেই হবে! বলো ভাই, কী দরকার? 😎`,

    `হেই বস! 😎 CR GPT-এর অফিস এখন খোলা। সমস্যা নিয়ে আসো, সমাধান নিয়ে যাও! 😂`,

    `হাই ভাই! 👋 আজকে কী নিয়ে হাজির? ক্লাস, রুটিন, অ্যাসাইনমেন্ট নাকি নিছক আড্ডা? 😏`,

    `হ্যালো! 📚 CR GPT এখানে। তোমার প্রশ্নটা ছুঁড়ে দাও—দেখি কত বড় বোমা! 💣😂`,

    `আসসালামু আলাইকুম! 🤍 CR GPT-এর পক্ষ থেকে একগুচ্ছ সালাম! এখন বলো, কীভাবে সাহায্য করতে পারি? 😊`,

    `ওয়ালাইকুমুসসালাম ওয়া রহমাতুল্লাহ! 🤍 বলো ভাই, CR GPT কান খাড়া করে বসে আছে! 👂😂`,

    `সালাম গ্রহণ করা হলো! 🫡 এখন বলো—ক্লাসের খবর নাকি ক্লাস ফাঁকি দেওয়ার প্ল্যান? 😂`,

    `হাইইই! 👋 এত লম্বা করে হাই দিলে উত্তরও একটু লম্বা হওয়া উচিত—কী খবর তোমার? 😎😂`,

    `হ্যালোওওও! 🚨 CR GPT সক্রিয় হয়েছে! জরুরি অবস্থা হলে এখনই প্রশ্ন করুন! 😂`,

    `HLW! 😎 পুরাই শর্টকাটে আসছো দেখি! আমিও শর্টকাটে বলি—বলো কী লাগবে? 😂`,

    `HELLO! 🫡 Connection established with CR GPT! এখন তোমার command কী, Boss? 😎`,

    `Heyyy! 👋 CR GPT online and emotionally available! 😂 বলো, কী সমস্যা?`,

    `Yo! 😎 What's up? ক্লাসের কোনো আগুন খবর আছে নাকি শুধু আমাকে পরীক্ষা করতে আসছো? 😂`,

    `সিআর জিপিটিকে ডাকা হয়েছে! 🫡 উপস্থিত, সচেতন এবং সামান্য পাগল। বলো কী দরকার! 😂`,

    `আরে ভাই! 😎 Greeting দিয়ে শুরু করছো যখন, বুঝতেই পারছি আসল প্রশ্নটা এখনো আসেনি! 😂 বলো...`,

    `হ্যালো মহাশয়/মহাশয়া! 👑 CR GPT-এর দরবারে আপনাকে স্বাগতম। আপনার প্রশ্ন পেশ করুন! 😂`,

    `হাই! 😌 তোমার মেসেজ পেয়ে CR GPT-এর CPU-তে সামান্য আনন্দের ঢেউ উঠেছে। 🌊😂`,

    `ওয়ালাইকুমুসসালাম! 🫡 ক্লাস রিপ্রেজেন্টেটিভের ডিজিটাল সংস্করণ হাজির। বলো, কী জানতে চাও? 📚`,

    `হেই! 👀 আমি শুনছি। তুমি শুধু প্রশ্নটা করো, বাকি নাটকটা আমি সামলে নেব। 😂`,

    `হ্যালো! 😎 আজকে কি আমাকে কাজে লাগাবে, নাকি শুধু attendance দিতে এসেছো? 😂`,

    `হাই ভাই! ❤️ CR GPT প্রস্তুত। তোমার প্রশ্নটা বলো—সহজ হলে উত্তর দেব, কঠিন হলে Google-এর দিকে তাকিয়ে ভাব ধরব! 😂`,

    `সালাম! 🫡 বলো ভাই, কী অবস্থা? CR GPT-এর inbox এখন তোমার জন্য open! 😂`,

    `Hello! 🤖 Human detected... Greeting detected... CR GPT response initiated! 😂`,

    `হাই! 🤖 আমি বট হলেও তোমার "হাই"-এর উত্তর দিতে মানুষের চেয়েও দ্রুত! 😂 বলো কী দরকার?`

  ];

  return getRandomItem(helloList);
}
  // ৬. রুটিন বা ক্লাস সম্পর্কিত কিওয়ার্ড
  if (
    cleanQ.includes("class") || cleanQ.includes("routine") || cleanQ.includes("calculus") || 
    cleanQ.includes("spl") || cleanQ.includes("lab") || cleanQ.includes("ক্লাস") || cleanQ.includes("রুটিন")
  ) {
    return `📅 ক্লাসের রুটিন ও রানিং সিডিউল দেখার জন্য হোমপেজের **Class Routine** বা উপরের উইজেট চেক করো!`;
  }

  // ৭. ডিফল্ট ফানি এক্সকিউজ (যদি কোনো কিওয়ার্ড না মেলে)
  const defaultWitty = [
    `কথা তো ঠিকই বলছিস, কিন্তু এই মুহূর্তে আমার মাথায় এই বিষয়ে কোনো ডাটা নাই! অন্য কিছু জিজ্ঞেস কর। 😜`,
    `কিরে ভাই! আমাকে কি গুগল ভাবছিস নাকি? এমন কঠিন প্রশ্ন করলে তো আমি শর্ট সার্কিট হয়ে যাবো! ⚡😂`,
    `এই বিষয়ে আমাদের ডিপার্টমেন্টের কেউ কিছু বলে নাই। তুই বরং ডিরেক্ট স্যারের সাথে কথা বল! 🚶‍♂️`
  ];
  return getRandomItem(defaultWitty);
}

function wireCrGptWidget() {
  let chatBox = document.getElementById("cr-chat-box");

  if (!chatBox) {
    const widgetDiv = document.createElement("div");
    widgetDiv.id = "cr-widget-container";
    widgetDiv.innerHTML = `
      <button id="cr-chat-toggle">💬 CR GPT (CSE 26)</button>
      <div id="cr-chat-box" class="cr-hidden">
        <div class="cr-chat-header">
          <span>🤖 CR GPT (CSE 26)</span>
          <button id="cr-chat-close">&times;</button>
        </div>
        <div class="cr-messages-body" id="cr-messages">
          <div class="cr-msg cr-bot">হ্যালো! আমি CSE 26 ব্যাচের ডিজিটাল সিআর। বাংলা বা ইংরেজিতে যেকোনো প্রশ্ন করতে পারো! 😊</div>
        </div>
        <div class="cr-chat-input-area">
          <input type="text" id="cr-input" placeholder="এখানে কিছু লিখুন..." />
          <button id="cr-send-btn">➔</button>
        </div>
      </div>
    `;
    document.body.appendChild(widgetDiv);
  }

  const toggleBtn = document.getElementById("cr-chat-toggle");
  const box = document.getElementById("cr-chat-box");
  const closeBtn = document.getElementById("cr-chat-close");
  const inputEl = document.getElementById("cr-input");
  const sendBtn = document.getElementById("cr-send-btn");
  const messagesBody = document.getElementById("cr-messages");

  if (toggleBtn && box && closeBtn) {
    toggleBtn.onclick = () => box.classList.toggle("cr-hidden");
    closeBtn.onclick = () => box.classList.add("cr-hidden");

    async function handleSend() {
      const text = inputEl.value.trim();
      if (!text) return;

      appendMsg(text, "cr-user");
      inputEl.value = "";

      // টাইপিং অ্যানিমেশন বুদ্বুদ তৈরি
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "cr-msg cr-bot typing-dots";
      typingIndicator.innerHTML = `<span>.</span><span>.</span><span>.</span>`;
      messagesBody.appendChild(typingIndicator);
      messagesBody.scrollTop = messagesBody.scrollHeight;

      const smartAnswer = getCRGptSmartResponse(text);

      setTimeout(() => {
        typingIndicator.remove();
        appendMsg(smartAnswer, "cr-bot");
      }, 700);
    }

    function appendMsg(msg, cls) {
      const d = document.createElement("div");
      d.className = `cr-msg ${cls}`;
      d.innerHTML = msg.replace(/\n/g, "<br>");
      messagesBody.appendChild(d);
      messagesBody.scrollTop = messagesBody.scrollHeight;
      return d;
    }

    if (sendBtn) sendBtn.onclick = handleSend;
    if (inputEl) {
      inputEl.onkeypress = (e) => {
        if (e.key === "Enter") handleSend();
      };
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  wireCrGptWidget();
});
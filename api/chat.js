/* ============================================================
   Super DIITian — CR GPT Backend Intelligence Engine
   ============================================================ */

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// বাংলাদেশ টাইম অনুযায়ী বর্তমান সময় ও দিনের তথ্য
function getBDTimeInfo() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const bdDate = new Date(utc + (3600000 * 6)); // GMT+6
  const dayIdx = bdDate.getDay(); // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  const hours = bdDate.getHours();
  const minutes = bdDate.getMinutes();
  const totalMin = hours * 60 + minutes;

  let period = hours >= 12 ? 'PM' : 'AM';
  let formattedH = hours % 12 || 12;
  let formattedM = minutes < 10 ? '0' + minutes : minutes;
  let timeStr = `${formattedH}:${formattedM} ${period}`;

  return { dayIdx, totalMin, timeStr, hours, minutes };
}

// সম্পূর্ণ ক্লাস ডেটাবেস
const ROUTINE = {
  A: {
    room: "704",
    days: {
      0: [ // Sunday
        { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, sub: "Calculus", t: "Md. Zakir Hossain (MZH)" },
        { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, sub: "Structured Programming", t: "Poly Bhoumik (PB)" },
        { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, sub: "Structured Programming Lab", t: "Poly Bhoumik (PB)" }
      ],
      1: [ // Monday
        { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, sub: "Calculus", t: "Md. Zakir Hossain (MZH)" },
        { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, sub: "Electrical & Electronic Circuit", t: "Ramen Kumar Das (RKD)" },
        { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, sub: "English", t: "Sabrina Quadir (SQ)" }
      ],
      2: [ // Tuesday
        { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, sub: "Electrical & Electronic Circuit", t: "Ramen Kumar Das (RKD)" },
        { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, sub: "Physics", t: "Mubtasim Fuad Opee (MFO)" },
        { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, sub: "Electrical & Electronic Circuit Lab", t: "Saidur Rahman (SR)" }
      ],
      3: [ // Wednesday
        { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, sub: "English", t: "Sabrina Quadir (SQ)" },
        { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, sub: "Structured Programming", t: "Poly Bhoumik (PB)" },
        { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, sub: "Physics", t: "Mubtasim Fuad Opee (MFO)" }
      ]
    }
  },
  B: {
    room: "706",
    days: {
      0: [ // Sunday
        { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, sub: "Physics", t: "Md. Parvezur Rahman Mahin (PRM)" },
        { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, sub: "Electrical & Electronic Circuit", t: "Saidur Rahman (SR)" },
        { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, sub: "Calculus", t: "Md. Imran Hossain (MIH)" }
      ],
      1: [ // Monday
        { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, sub: "English", t: "Farjana Parvin (FP)" },
        { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, sub: "Calculus", t: "Md. Imran Hossain (MIH)" },
        { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, sub: "Electrical & Electronic Circuit Lab", t: "Saidur Rahman (SR)" }
      ],
      2: [ // Tuesday
        { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, sub: "Electrical & Electronic Circuit", t: "Saidur Rahman (SR)" },
        { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, sub: "Structured Programming", t: "Md. Mushfiqur Rahaman (MMR)" },
        { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, sub: "Physics", t: "Md. Parvezur Rahman Mahin (PRM)" }
      ],
      3: [ // Wednesday
        { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, sub: "Structured Programming", t: "Md. Mushfiqur Rahaman (MMR)" },
        { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, sub: "English", t: "Farjana Parvin (FP)" },
        { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, sub: "Structured Programming Lab", t: "Md. Mushfiqur Rahaman (MMR)" }
      ]
    }
  }
};

// হিউম্যান স্টাইলে লোকাল ম্যাচিং লজিক
function processHumanResponse(input) {
  const q = input.toLowerCase().trim();
  const bd = getBDTimeInfo();

  // ১. কুশল বিনিময় (Kemon aso, tmi kmn acho, acho?, aso?, কেমন আছো?, আছ?)
  if (
    /kmn|kemon|acho|aso|kese|kemon\s*aso|kmn\s*acho|tmi\s*kmn|tumi\s*kemon|کی\s*حال|কেমন\s*আছো|কেমন\s*আছ|আছো\s*কি|আছ\s*তো|আছো|আছ/i.test(q) && 
    (q.includes("k") || q.includes("acho") || q.includes("aso") || q.includes("আছ") || q.includes("কেমন"))
  ) {
    return getRandom([
      `আলহামদুলিল্লাহ, একদম জোস মুডে আছি! তুমি কেমন আছো বলো? পড়াশোনার কি খবর? 😎`,
      `আছি ভাই তোমাদের দোয়ায় একদম ফিটফাট! তোমার কি অবস্থা?`,
      `দম ফেলার ফুরসত নাই ভাই, সারাদিন তোমাদের রুটিন আর প্যারা সামলিয়ে বেশ ভালোই আছি! তুমি কেমন কাটাতেছো দিনকাল?`,
      `এই তো আছি কোনোমতে! সিআররা ঘুমাইলে আমার কাজের চাপ একটু কমে। তুমি বলো, কি অবস্থা তোমার?`
    ]);
  }

  // ২. কি করছো / কি কর (Ki korso, ki korcho, ki koro)
  if (/ki\s*kor|korta\s*aso|korteso|ki\s*kortho|কি\s*করছো|কী\s*করছিস|কী\s*করছেন|কি\s*কর/i.test(q)) {
    return getRandom([
      `এই তো বসে বসে ভাবছি সিআর প্রিয়ন্তি আর রাফি এত ফাঁকিবাজ কেন! আর তোমাদের রুটিন পাহারা দিচ্ছি। বলো কি লাগবে? 🥱`,
      `তোমাদের পরবর্তী ক্লাসের আপডেট ট্র্যাক করছি। তুমি বলো, কি করা হচ্ছে?`,
      `ডিজিটাল চেয়ারে পা তুলে বসে আছি আর কি! কোনো রুটিন বা পড়ার আপডেট লাগবে নাকি?`,
      `সারাদিন তোদের সব আজাইরা প্রশ্ন আর রুটিনের খবরাখবর মগজে লোড করতেছি! বলো কি সেবা করতে পারি?`
    ]);
  }

  // ৩. সময় জানতে চাওয়া (কয়টা বাজে / time)
  if (/koyta\s*baje|somoy\s*koto|time\s*koto|কয়টা\s*বাজে|সময়\s*কত|time\s*now/i.test(q)) {
    return `এখন ঘড়িতে বাজে **${bd.timeStr}**! সময় দেখতে দেখতে ক্লাসের কথা যেন আবার ভুইলা যাইও না! 😉`;
  }

  // ৪. তোমার নাম কি / identity
  if (/tmr\s*nam|tomar\s*nam|apnar\s*nam|who\s*are\s*you|তোমার\s*নাম|তুমি\s*কে|tmr\s*name/i.test(q)) {
    return getRandom([
      `আমি তোমাদের ব্যাচের ডিজিটাল সিআর **CR GPT**! পুরো ব্যাচের সকল খবর আমার নখদর্পণে থাকে। 😎`,
      `আমাকে চিনে রাখো, আমি **CR GPT**। সিআররা যখন ঘুমায়, তখন ক্লাসের হাল আমিই ধরি! 🦾`,
      `নাম তো শুনেইছো — **CR GPT**! CSE 26 ব্যাচের সবচেয়ে বুদ্ধিমান ব্রেন!`
    ]);
  }

  // ৫. তোমাকে কে বানিয়েছে / নির্মাতা
  if (/k\s*baniyese|ke\s*banise|ke\s*bania|who\s*made\s*you|who\s*created|তোমাকে\s*কে\s*বানিয়েছে|কার\s*সাইট|developer|admin|riyan|iftekhar|ইফতেখার|রিয়ান/i.test(q)) {
    return getRandom([
      `আমাদের ব্যাচের জিনিয়াস **Iftekhar Uddin Bhuiyan (Riyan)** ভাই (Roll: 260013) নিজের হাতে আমাকে কোড করে বানিয়েছেন! উনার জন্যই পুরো ব্যাচ এত আরামে কভার পেজ আর রুটিন পাচ্ছে! 👑`,
      `এই মহৎ কাজটা করেছেন আমাদের **ইফতেখার ভাই (রিয়ান)**। রোল নম্বর ২৬০০১৩। বস মানুষ একদম! 😎`,
      `মাস্টারমাইন্ড **Iftekhar U. Bhuiyan (Riyan)** আমাকে তৈরি করেছেন যেন তোমারা সারাদিন সিআরদের ফোন দিয়ে বিরক্ত না করো!`
    ]);
  }

  // ৬. কেমন আছো / কি করছো / খেয়েছো
  if (/kheyeso|khabar\s*kheso|kheyecho|খেয়েছো|ভাত\s*খেয়েছো/i.test(q)) {
    return getRandom([
      `আমি তো কারেন্ট আর ডেটা খাই ভাই! তবে ব্রেক টাইমে (02:00 - 02:20 PM) তোমরা কিছু ভালোমন্দ খাইলে আমাকেও একটু অফার করতে পারো! 🍕`,
      `আমি এআই, আমার খাওয়ার দরকার হয় না। তুমি খাইছো তো? ক্লাসে গিয়ে আবার ঢুলো না যেন!`
    ]);
  }

  // ৭. সিআরদের নাম ও তথ্য
  if (/cr\s*k|cr\s*ke|cr\s*der\s*nam|cr\s*name|সিআর\s*কে|সিআরদের\s*নাম/i.test(q)) {
    return getRandom([
      `আমাদের CSE 26 ব্যাচের সিআর দুইজন:\n👩‍💼 **Prionty Sarker** (Roll: 260031)\n👨‍💼 **Rafiul Islam** (Roll: 260053)\nতবে কোনো প্যারা লাগলে ওনাদের বিরক্ত না করে আমাকেই বইলো! 😜`,
      `ফিমেল সিআর **প্রিয়ন্তি** (260031) আর মেল সিআর **রাফি** (260053)। ক্লাসের নোটিশ দিতে ওদের খবর হয়ে যায়, তাই ব্যাকআপে আমি আছি!`
    ]);
  }

  // ৮. হোমওয়ার্ক / আজকে কি পড়া দিছে
  if (/homework|home\s*work|hw|pora|ki\s*pora|হোমওয়ার্ক|আজকে\s*কি\s*পড়া|পড়া\s*কি/i.test(q)) {
    return getRandom([
      `পড়া কি দিছে সেটা সিআর প্রিয়ন্তি আর রাফিকে জিজ্ঞেস করো! ওদের তো এইগুলা জানানোর কথা, সারাদিন করে কি এরা? 😒 যাও গ্রুপে ওদের মেনশন দিয়ে আসো!`,
      `আরে ভাই! স্যার-ম্যাডামরা ক্লাসে যা পড়ায় একটু খাতায় নোট নিবা তো! সিআররা তো নিজের পড়াই ঠিকমতো লেখে না, ওদের ভরসায় থাইকো না। ফ্রেন্ডদের খাতা ফটোকপি করো! 📚`,
      `এইচডব্লিউ জানার আগে দেখো আগের দিনের অ্যাসাইনমেন্ট জমা দিছো কিনা! EEC আর SPL ল্যাবের কোডগুলো রিভাইজ করে রাখো, নাইলে কিন্তু ক্লাসে খাড়ায় থাকতে হবে!`
    ]);
  }

  // ৯. এখন কি ক্লাস / চলমান ক্লাস
  if (/ekhn\s*ki\s*class|ekhn\s*ki\s*cls|akhon\s*ki\s*class|now\s*class|চলমান\s*ক্লাস|এখন\s*কি\s*ক্লাস/i.test(q)) {
    const todayA = ROUTINE.A.days[bd.dayIdx];
    if (!todayA) {
      return `আজকে তো কোনো ক্লাস নেই ভাই! শান্তিতে রেস্ট নাও বা ঘুরে বেড়াও। 🏖️`;
    }

    let curA = todayA.find(c => bd.totalMin >= c.startM && bd.totalMin < c.endM);
    if (curA) {
      let rem = curA.endM - bd.totalMin;
      return `🔴 **এখন ক্লাস চলছে!**\n• Section A (Room 704): **${curA.sub}** (${curA.t})\n• আর **${rem} মিনিট** বাকি আছে! মনোযোগ দিয়ে ক্লাস করো।`;
    }

    if (bd.totalMin >= 840 && bd.totalMin < 860) {
      return `☕ **এখন ২০ মিনিটের ব্রেক চলছে!** দুপুর ০২:২০ এ পরবর্তী ক্লাস শুরু হবে। নাস্তা করে রুমে চলে যাও!`;
    }

    let nextA = todayA.find(c => bd.totalMin < c.startM);
    if (nextA) {
      let waitM = nextA.startM - bd.totalMin;
      return `⏳ এখন কোনো ক্লাস চলছে না। পরবর্তী ক্লাস **${nextA.sub}** শুরু হতে আর **${waitM} মিনিট** বাকি (সময়: ${nextA.time})।`;
    }

    return `🎉 আজকের সব ক্লাস শেষ! ছুটি, এখন আড্ডা দাও বা বাসায় যাও।`;
  }

  // ১০. আজকে কি কি ক্লাস (Today's classes)
  if (/ajk\s*ki\s*class|ajke\s*ki\s*class|ajker\s*class|ki\s*ki\s*class\s*ajke|today\s*class|আজকে\s*কি\s*ক্লাস|আজকের\s*ক্লাস/i.test(q)) {
    const schedA = ROUTINE.A.days[bd.dayIdx];
    const schedB = ROUTINE.B.days[bd.dayIdx];

    if (!schedA) {
      return `📅 আজকে তো কোনো ক্লাস নেই! অফ-ডে (ছুটির দিন)। আরামসে ঘুমাও! 😎`;
    }

    let listA = schedA.map((c, i) => `${i+1}. ${c.sub} (${c.time})`).join("\n");
    let listB = schedB.map((c, i) => `${i+1}. ${c.sub} (${c.time})`).join("\n");

    return `📅 **আজকের ক্লাস তালিকা:**\n\n**Section A (Room 704):**\n${listA}\n\n**Section B (Room 706):**\n${listB}\n\n☕ ব্রেক টাইম: 02:00 PM - 02:20 PM`;
  }

  // ১১. জাকির স্যারের ক্লাস কখন?
  if (/zakir\s*sir|mzh|জাকির\s*স্যার/i.test(q)) {
    return `📐 **Md. Zakir Hossain (MZH) স্যারের ক্যালকুলাস ক্লাস:**\n• **Section A (Room 704):** রবিবার ও সোমবার সকাল ১১:৪০ AM - ১২:৫০ PM।\nস্যার কিন্তু ক্লাসে ম্যাথ করতে দেয়, প্রস্তুতি নিয়ে যেও!`;
  }

  // ১২. পলি ম্যাডামের ক্লাস কখন?
  if (/poly\s*mam|pb|পলি\s*ম্যাডাম|পলি\s*ম্যাম/i.test(q)) {
    return `💻 **Poly Bhoumik (PB) ম্যাডামের প্রোগ্রামিং ক্লাস:**\n• **Section A (Room 704):** রবিবার (১২:৫০ PM ও ২:২০ PM ল্যাব) এবং বুধবার (১২:৫০ PM)।\nল্যাব রিপোর্ট ঠিকমতো জমা দিও, নাইলে ম্যাডাম কিন্তু সিরিয়াস ধরে!`;
  }

  // ১৩. কভার পেজ কিভাবে বানাবো?
  if (/cover\s*kivabe|cover\s*page|কাভার\s*কিভাবে|কাভার\s*পেজ|assignment\s*cover/i.test(q)) {
    return `📄 **Cover Page Maker বানানোর নিয়ম:**\n১. ড্যাশবোর্ডের প্রথমে থাকা **Cover Page Maker** এ যাও।\n২. তোমার নাম, রোল ও সাবজেক্ট বসাও।\n৩. টেমপ্লেট পছন্দ করে নিচে **Download** বাটনে ক্লিক করো। একদম প্রিন্ট-রেডি JPG ডাউনলোড হয়ে যাবে!`;
  }

  // ১৪. জোকস বল / হাসাও
  if (/jokes|koutuk|hasao|হাসাও|জোকস|মজা\s*কর/i.test(q)) {
    return getRandom([
      `শিক্ষক: বলতো ইফতেখার, মহাকর্ষ বল কাকে বলে?\nইফতেখার: স্যার, যে বলে টানলে ক্লাসের লাস্ট বেঞ্চের ছাত্ররা ফার্স্ট বেঞ্চের দিকে যায় না, কিন্তু ছুটির ঘণ্টার শব্দে সবাই দরজার দিকে যায়—তাকে মহাকর্ষ বল বলে! 😂`,
      `সিআর রাফি প্রিয়ন্তিকে বলতেছে: 'দোস্ত, তুই সারাদিন এত পড়ার নোটিশ কেমনে দিস?'\nপ্রিয়ন্তি: 'আমি শুধু নোটিশই দেই দোস্ত, নিজে তো একটা ক্লাসেও খাতা খুলি না!' 🤣`,
      `ছাত্র: স্যার, আমি কি এমন কোনো ভুলের জন্য শাস্তি পেতে পারি যা আমি করিনি?\nস্যার: অবশ্যই না!\nছাত্র: থ্যাংক ইউ স্যার, আমি আজকের এসাইনমেন্ট করি নাই! 🏃‍♂️💨`
    ]);
  }

  // ১৫. হাই / হ্যালো
  if (/^(hi|hello|hlw|hei|hey|হাই|হ্যালো|সালাম|salam|assalamu\s*alaikum)$/i.test(q)) {
    return getRandom([
      `হেই কি অবস্থা? ক্লাসের রুটিন, রুম নম্বর কিংবা স্যারদের ক্লাস নিয়ে কোনো তথ্য লাগবে নাকি? বলো শুনি! 😊`,
      `আরে ব্রিলিয়ান্ট স্টুডেন্ট যে! কি খবর? সিআর প্রিয়ন্তি আর রাফি তো ঠিকমতো খবর দেয় না, বলো আমি কিভাবে সাহায্য করবো?`,
      `ওয়ালাইকুম আসসালাম! আমি লাইনে আছি। কি জানতে চাও ঝটপট লিখে ফেলো!`
    ]);
  }

  return null;
}

/* ============================================================
   Main API Handler with Fallback to AI
   ============================================================ */
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
    return res.status(400).json({ reply: "কিছু একটা লিখে পাঠাও ভাই!" });
  }

  // ধাপ ১: আগে সুপার-ফাস্ট হিউম্যান ম্যাচিং চেক
  const localReply = processHumanResponse(userText);
  if (localReply) {
    return res.status(200).json({ reply: localReply });
  }

  // ধাপ ২: না মিললে ওপেনরাউটার এআই কল হবে (স্মার্ট পার্সোনা সহ)
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      reply: getRandom([
        `কিরে ভাই! আমাকে কি একটু শান্তিতে থাকতে দিবি না তোরা? কাজের কোনো প্রশ্ন থাকলে বলো! 😴`,
        `আর ভাল্লাগে না! সিআর দুইটার একটাও কাজের না, সবাই আমারে আইসা প্রশ্ন করে। রুটিন চেক করো যাও! 🙄`,
        `ভালো করে গুছায়ে লেখো ভাই, কি লিখছো নিজেই তো বুঝতেছো না মনে হয়! 🤦‍♂️`
      ])
    });
  }

  try {
    const systemPrompt = `
তুমি DIIT CSE 26th Batch-এর নিজস্ব এআই সহকারী 'CR GPT'।
তোমার আর্কিটেক্ট ও বস: Iftekhar Uddin Bhuiyan (Riyan), Roll: 260013।
সিআর: Prionty (260031) ও Rafiul (260053)।
রুম: Section A (704), Section B (706)।
তুমি অত্যন্ত রসাত্মক, বুদ্ধিমান এবং পচানি প্রিয়। কেউ বাংলিশে বা বাংলায় কুশল বিনিময় বা প্রশ্ন করলে রিল্যাক্সড ক্লাসমেটের মতো উত্তর দাও।
`;

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
        max_tokens: 300,
        temperature: 0.75
      })
    });

    const data = await response.json();
    if (!response.ok || !data.choices?.[0]?.message?.content) {
      throw new Error("AI Server Error");
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("AI Fallback Error:", error);
    return res.status(200).json({
      reply: getRandom([
        `কিরে ভাই! এত কঠিন প্রশ্ন করার কি আছে? ক্লাসের নোটিশ দেখতে ড্যাশবোর্ডের রুটিন সেকশনে যাও! 🥱`,
        `আমার মাথায় এখন একটু হ্যাং মারছে! সিআর প্রিয়ন্তি আর রাফিকে গিয়ে ধরো তো দেখি! 🏃‍♂️`,
        `শরীরটা ভালো লাগতেছে না ভাই, একটু পরে নক দাও!`
      ])
    });
  }
}
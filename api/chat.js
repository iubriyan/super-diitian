/* ============================================================
   Super DIITian — CR GPT Ultimate Intelligence Engine
   ============================================================ */

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// বাংলাদেশ টাইম (GMT+6) অনুযায়ী বর্তমান সময় ও দিনের তথ্য
function getBDTimeInfo() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const bdDate = new Date(utc + (3600000 * 6));
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

// স্টুডেন্ট ডিরেক্টরি ডাটাবেস (সকলের রোল ও নাম)
const STUDENTS_DB = [
  { roll: "260001", name: "Faiaz Hossain Farhan" },
  { roll: "260002", name: "Faiyaz Bin Bakar" },
  { roll: "260003", name: "Md. Janon" },
  { roll: "260004", name: "Fahad Bin Nur" },
  { roll: "260005", name: "Tanjilur Rahman" },
  { roll: "260006", name: "Khalid Bin Syam" },
  { roll: "260007", name: "Lamya Akter Emo" },
  { roll: "260009", name: "Md. Sakib Mia" },
  { roll: "260010", name: "Mahenur Rahman" },
  { roll: "260011", name: "Nawrin Hossain Oishi" },
  { roll: "260012", name: "Md. Nahid Hasan" },
  { roll: "260013", name: "Iftekhar Uddin Bhuiyan (Riyan)", isCreator: true },
  { roll: "260014", name: "Mehedi Hassan Bappi" },
  { roll: "260015", name: "Aysha Akter Mishita" },
  { roll: "260016", name: "Toli" },
  { roll: "260017", name: "Shams Mahmud Walid" },
  { roll: "260018", name: "Noushin Ahmed" },
  { roll: "260019", name: "Saznin Ferdousi Oyshi" },
  { roll: "260020", name: "Tasfim Monjabin" },
  { roll: "260021", name: "Syed Rejoyan Haque" },
  { roll: "260022", name: "Nafisa Khan" },
  { roll: "260023", name: "Mahi Shahriar Apurbo" },
  { roll: "260024", name: "Md. Shahnawaz Kobir" },
  { roll: "260025", name: "Ajim Uddin Akash" },
  { roll: "260026", name: "Md. Hasan Habib" },
  { roll: "260027", name: "Monim Ahmad" },
  { roll: "260028", name: "Tahsinul Haque" },
  { roll: "260029", name: "Tanim Khan" },
  { roll: "260030", name: "Zayed Bin Abdullah" },
  { roll: "260031", name: "Prionty Sarker (CR)", isCR: true },
  { roll: "260032", name: "Maria Sultana Moonmoon" },
  { roll: "260033", name: "Umaiya Rista Urboshi" },
  { roll: "260034", name: "Sajidul Islam" },
  { roll: "260035", name: "Maliha Jaman" },
  { roll: "260036", name: "Anika Tasnim" },
  { roll: "260037", name: "Musidul Islam Sayeb" },
  { roll: "260038", name: "Md. Jobair Uddin" },
  { roll: "260039", name: "Mahmodul Hasan" },
  { roll: "260040", name: "Jannat Tasnin Raka" },
  { roll: "260041", name: "Farhana Sadia" },
  { roll: "260042", name: "Semeka Barman" },
  { roll: "260043", name: "Saila Sajin Rini" },
  { roll: "260044", name: "Tamim Eqbal" },
  { roll: "260045", name: "Nabila Hossain" },
  { roll: "260046", name: "Md. Eyakub Hossin" },
  { roll: "260047", name: "Sk. Md. Sadip" },
  { roll: "260048", name: "Sk. Tazim" },
  { roll: "260049", name: "Samira Tabassum" },
  { roll: "260050", name: "Sohanur Rahaman Nur" },
  { roll: "260051", name: "Arian Abdullah" },
  { roll: "260052", name: "Md. Shefat Ali" },
  { roll: "260053", name: "Rafiul Islam (CR)", isCR: true },
  { roll: "260054", name: "Sk. Sadik Sagar" },
  { roll: "260055", name: "Md. Albir Sami" },
  { roll: "260056", name: "Mohammed Junayed Hossain Fardin" },
  { roll: "260057", name: "Redwan Ahmmed" },
  { roll: "260058", name: "Md. Hridoy Mondol" },
  { roll: "260059", name: "Amrin Akter Alisa" },
  { roll: "260060", name: "Ashraful Hoque Rimon" },
  { roll: "260061", name: "Kazi Md. Arafat Hossain Shanto" },
  { roll: "260062", name: "Md Whidun Nabi Nion" },
  { roll: "260063", name: "Ikon Sheikh" },
  { roll: "260064", name: "Sharmin Hossain Anud" },
  { roll: "260065", name: "Tasnim Hasnat" },
  { roll: "260066", name: "Md. Anisul Haque Anik" },
  { roll: "260067", name: "Ireen Akter" },
  { roll: "260068", name: "Sifatul Islam Sifat" },
  { roll: "260069", name: "Hafsa Hossain Toma" },
  { roll: "260070", name: "Sinha Akter Sean" },
  { roll: "260071", name: "Mohammad Tanvir Hossen Tamim" },
  { roll: "260072", name: "Tusty Islam" },
  { roll: "260073", name: "Md. Tahasanur Khan" },
  { roll: "260074", name: "S.N. Omi" },
  { roll: "260075", name: "Salsabila Nahin Afnan" },
  { roll: "260076", name: "Md. Efaz Bhuiyan" },
  { roll: "260077", name: "Mst. Lota Mony" }
];

// ক্লাস রুটিন ডেটা
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

// অত্যন্ত নিখুঁত ও হিউম্যান-লাইক লোকাল প্রসেসর
function processHumanResponse(input) {
  const q = input.toLowerCase().trim();
  const bd = getBDTimeInfo();

  // 1. কুশল বিনিময় ও কেমন আছো
  if (/kmn|kemon|acho|aso|how\s*are\s*you|how\s*r\s*u|what's\s*up|whats\s*up|কেমন\s*আছো|কেমন\s*আছেন|কেমন\s*আচ|ভালো\s*আছো|ভালো\s*আছেন|তুই\s*কেমন\s*আছিস|কি\s*অবস্থা|কী\s*অবস্থা|কি\s*খবর|কী\s*খবর|কেমন\s*চলছে|সব\s*ঠিকঠাক/i.test(q)) {
    return getRandom([
      `আলহামদুলিল্লাহ, একদম জোস মুডে আছি! তুমি কেমন আছো বলো? পড়াশোনার কি খবর? 😎`,
      `আছি ভাই তোমাদের দোয়ায় একদম ফিটফাট! তোমার কি অবস্থা?`,
      `দম ফেলার ফুরসত নাই ভাই, সারাদিন তোমাদের রুটিন আর প্যারা সামলিয়ে বেশ ভালোই আছি! তুমি কেমন কাটাতেছো দিনকাল?`,
      `এই তো আছি কোনোমতে! সিআররা ঘুমাইলে আমার কাজের চাপ একটু কমে। তুমি বলো, কি অবস্থা তোমার?`
    ]);
  }

  // 2. পরিচয় বা তুমি কে
  if (/তুমি\s*কে|কে\s*তুমি|আপনি\s*কে|তুই\s*কে|who\s*are\s*you|who\s*r\s*u|what\s*is\s*this|bot\s*টা\s*কি|এইটা\s*কি\s*বট|তুমি\s*কি\s*ai|তুমি\s*কি\s*AI|are\s*you\s*ai|মানুষ\s*নাকি\s*bot|মানুষ\s*নাকি\s*এআই/i.test(q)) {
    return getRandom([
      `আমি তোমাদের ব্যাচের ডিজিটাল সিআর **CR GPT**! পুরো ব্যাচের সকল খবর, রুটিন আর স্টুডেন্ট ইনফো আমার নখদর্পণে থাকে। 🦾`,
      `আমাকে চিনে রাখো, আমি **CR GPT**। সিআররা যখন ঘুমায়, ক্লাসের হাল আমিই ধরি! তবে আমি এআই হলেও একেবারে হিউম্যান ভাইব দেই! 😎`,
      `আমি একজন এআই ডিজিটাল সিআর! মানুষের চেয়ে কম খাটনি করি না ভাই, সারাদিন তোদের সব প্যারা সামলাই। 😜`
    ]);
  }

  // 3. ক্রিয়েটর / কে বানিয়েছে
  if (/কে\s*বানিয়েছে|কে\s*বানাইছে|who\s*made\s*you|who\s*created|who\s*built\s*you|creator\s*কে|মালিক\s*কে|তৈরি\s*করছে|iftekhar|riyan|ইফতেখার|রিয়ান/i.test(q)) {
    return getRandom([
      `আমাদের ব্যাচের জিনিয়াস **Iftekhar Uddin Bhuiyan (Riyan)** ভাই (Roll: 260013) নিজের হাতে আমাকে কোড করে বানিয়েছেন! উনার জন্যই পুরো ব্যাচ এত আরামে কভার পেজ আর রুটিন পাচ্ছে! 👑`,
      `এই মহৎ কাজটা করেছেন আমাদের **ইফতেখার ভাই (রিয়ান)**। রোল নম্বর ২৬০০১৩। বস মানুষ একদম! 😎`,
      `মাস্টারমাইন্ড **Iftekhar U. Bhuiyan (Riyan)** আমাকে তৈরি করেছেন যেন তোমারা সারাদিন সিআরদের ফোন দিয়ে বিরক্ত না করো!`
    ]);
  }

  // 4. Super Diitian কি / সাইট সম্পর্কে
  if (/super\s*diitian/i.test(q)) {
    return `🚀 **Super Diitian** হলো DIIT CSE 26th Batch-এর অফিশিয়াল অল-ইন-ওয়ান স্টুডেন্ট পোর্টাল! এখানে এক ক্লিকে কভার পেজ তৈরি, লাইভ ক্লাস ট্র্যাকারসহ রুটিন ডাউনলোড এবং স্টুডেন্ট ডিরেক্টরি পেয়ে যাচ্ছো। পোর্টালটি বানিয়েছেন **Iftekhar Uddin Bhuiyan (Riyan)** ভাই!`;
  }

  // 5. CSE 26 ব্যাচ ও মোট শিক্ষার্থী সংখ্যা
  if (/cse\s*26|ব্যাচ|batch\s*26|কয়জন|কতজন|total\s*student|মোট\s*ছাত্র|শিক্ষার্থী/i.test(q)) {
    return `🎓 **CSE 26th Batch (DIIT):**\nআমাদের এই ব্যাচে মোট **৭৬ জন** (76 Students) মেধাবী শিক্ষার্থী রয়েছে! সবার রোল এবং নাম দেখতে ড্যাশবোর্ডের **Student Directory** অপশনে চলে যাও।`;
  }

  // 6. স্টুডেন্ট সার্চ / রোল বা নাম দিয়ে খোঁজা
  const rollMatch = q.match(/\b(2600\d{2})\b/);
  if (rollMatch) {
    const found = STUDENTS_DB.find(s => s.roll === rollMatch[1]);
    if (found) {
      return `🎓 **শিক্ষার্থীর তথ্য:**\n• নাম: **${found.name}**\n• রোল/আইডি: **${found.roll}**\n• ব্যাচ: DIIT CSE 26th Batch${found.isCreator ? " (Portal Architect & Creator 👑)" : found.isCR ? " (Class Representative 🧑‍💼)" : ""}`;
    }
  }

  for (const s of STUDENTS_DB) {
    if (q.includes(s.name.toLowerCase())) {
      return `🎓 **${s.name}**\n• রোল নম্বর: **${s.roll}**\n• ব্যাচ: CSE 26th Batch${s.isCreator ? " (আমাদের জিনিয়াস ক্রিয়েটর 👑)" : s.isCR ? " (আমাদের সম্মানিত সিআর 🧑‍💼)" : ""}`;
    }
  }

  // নিজের রোল বা আইডি জানতে চাইলে
  if (/আমার\s*রোল|আমার\s*আইডি|my\s*roll|my\s*id/i.test(q)) {
    return `🔍 তোমার রোল বা আইডি কত সেটা তো তোমারই জানার কথা! ভুলে গেলে ড্যাশবোর্ডের **Student Directory** তে গিয়ে নিজের নাম সার্চ করে দেখে নাও। আর আমার নিজের আইডি হলো **260013** (ইফতেখার ভাইয়ের সৌজন্যে)!`;
  }

  // 7. সব স্টুডেন্টের লিস্ট / ক্লাস লিস্ট
  if (/student\s*list|class\s*list|সব\s*student|সব\s*ছাত্র|সবাইকে\s*দেখাও|full\s*list|all\s*students/i.test(q)) {
    return `📋 আমাদের ক্লাসের ৭৬ জন শিক্ষার্থীর সম্পূর্ণ ডিরেক্টরি লিস্ট দেখতে ড্যাশবোর্ডের **Student Directory** কার্ডে ক্লিক করো। সেখানে সার্চ বক্স ও ১-ক্লিকে কভার পেজ ফিলআপ করার সুবিধা আছে!`;
  }

  // 8. রুটিন ও ক্লাস সম্পর্কিত প্রশ্ন
  if (/routine|রুটিন|schedule|সময়সূচি|class\s*kobe|আজ\s*class|কাল\s*class|tomorrow\s*class|today\s*class|next\s*class|কখন\s*class|কোথায়\s*class|room\s*number/i.test(q)) {
    return `🕒 **CSE 26th Batch রুটিন সারসংক্ষেপ:**\n• দিনসমূহ: রবিবার থেকে বুধবার\n• Section A: Room 704\n• Section B: Room 706\n• ক্লাসের সময়: 11:40 AM - 03:30 PM\n• ব্রেক টাইম: 02:00 PM - 02:20 PM\nপূর্ণাঙ্গ লাইভ ট্র্যাকার ও JPG রুটিন ডাউনলোড করতে ড্যাশবোর্ডের **Class Routine** সেকশনে যাও!`;
  }

  // 9. সাবজেক্ট / কোর্স কোড
  if (/subject|subjects|বিষয়|course\s*code|course\s*list|semester/i.test(q)) {
    return `📚 **এই সেমিস্টারের মূল কোর্সসমূহ:**\n• Structured Programming Language (SPL) & Lab\n• Electrical & Electronic Circuit (EEC) & Lab\n• Calculus\n• Physics\n• English\nফোল্ডার বা নোটস দেখতে ড্যাশবোর্ডের সংশ্লিষ্ট সেকশনে চেক করো!`;
  }

  // 10. টিচার / ফ্যাকাল্টি
  if (/teacher|teachers|স্যার|ম্যাম|ম্যাডাম|sir|mam|faculty/i.test(q)) {
    return `👨‍🏫 **আমাদের সম্মানিত ফ্যাকাল্টিগণ:**\n• Poly Bhoumik (PB) - SPL\n• Md. Zakir Hossain (MZH) - Calculus\n• Saidur Rahman (SR) & Ramen Kumar Das (RKD) - EEC\n• Mubtasim Fuad Opee (MFO) & Md. Parvezur Rahman Mahin (PRM) - Physics\n• Sabrina Quadir (SQ) & Farjana Parvin (FP) - English`;
  }

  // 11. নোটিশ বা এনাউন্সমেন্ট
  if (/notice|নোটিশ|announcement|ঘোষণা/i.test(q)) {
    return getRandom([
      `নোটিশ সম্পর্কে এখনো অফিশিয়াল আপডেট এখানে বসেনি! এগুলো নিয়ে তো সিআর প্রিয়ন্তি আর রাফির ব্যস্ত থাকার কথা, কিন্তু ওরা কি করে আল্লাহই জানে! 😒 গ্রুপে খোঁজ নাও বা সিআরদের নক দাও।`,
      `নতুন কোনো নোটিশ আসলে আমাদের সিআররা ড্রাম বাজিয়ে জানানোর কথা ছিল, কিন্তু তারা ঘুমাচ্ছে! কোনো জরুরি আপডেট থাকলে অফিশিয়াল গ্রুপ চেক করো। 📢`
    ]);
  }

  // 12. CR বা সিআর সম্পর্কিত
  if (/^cr$|সিআর|class\s*representative/i.test(q)) {
    return `🧑‍💼 **আমাদের CSE 26th Batch-এর CR:**\n১. **Prionty Sarker** (প্রিয়ন্তি) - Roll: 260031\n২. **Rafiul Islam** (রাফি) - Roll: 260053\nকোনো জরুরি কাজে ওদের না পেলে আমাকে জিজ্ঞেস করতে পারো! 😉`;
  }

  // 13. রাফি ও প্রিয়ন্তির রোস্ট (Roast Rafi & Priyonti)
  if (/রাফি|rafi|rafiul/i.test(q) && /roast|পচা|troll|জ্বালা|joke|মজা/i.test(q)) {
    return getRandom([
      `আমাদের মেল সিআর রাফি ভাই এমন এক মহান ব্যক্তি, যার কাছে কোনো আপডেট চাইলে সে নিজেই সবার আগে আমার কাছে এসে জিজ্ঞেস করে—"ভাই আজকে কি ক্লাস?" 🤦‍♂️`,
      `রাফির কাজের স্টাইল দেখলে মনে হয় ও সিআর না হয়ে ক্লাসের ভিভিআইপি গেস্ট! নোটিশ চাইতে গেলে এমন ভাব দেখায় যেন ওর ওপর গোটা দেশের দায়িত্ব! 😂`,
      `সিআর রাফিকে যদি কেউ কাজের কথা বলে, ও এমন অফলাইন মোডে চলে যায় মনে হয় ওর ব্রেইনে এআই আপডেট চলতেছে! 💀`
    ]);
  }

  if (/প্রিয়ন্তি|priyonti|prionty/i.test(q) && /roast|পচা|troll|জ্বালা|joke|মজা/i.test(q)) {
    return getRandom([
      `আমাদের ফিমেল সিআর প্রিয়ন্তি আপুর নোটিশ লেখা দেখে মনে হয় বুঝি উনি আইনস্টাইনের কোনো গোপন থিসিস পেপার লিখতেছেন! পড়তে পড়তে সেমিস্টার শেষ হয়ে যায়। 📜`,
      `প্রিয়ন্তির কাছে কোনো অ্যাসাইনমেন্টের ডেডলাইন জানতে চাইলে ও এমন একটা ভাব নেয় যেন ও নিজে ওই অ্যাসাইনমেন্টের কোয়েশ্চেন পেপার বানাইছে! 🙄`,
      `প্রিয়ন্তি হলো সেই legendary CR, যে ক্লাসে আসার আগেই মেসেঞ্জার গ্রুপে পাঁচবার টেক্সট দিয়ে জানাবে সে আসতেছে কিনা! 🥱`
    ]);
  }

  // জেনারেল রোস্ট বা সিআর রোস্ট
  if (/roast|রোস্ট|পচা|troll|জ্বালা/i.test(q) && /cr|সিআর/i.test(q)) {
    return getRandom([
      `আমাদের সিআর দুইটার অবস্থা দেখলে হাসি পায়—একটা চায় ঘুমাইতে, আরেকজন চায় খালি নোটিশ দিয়া ওয়ার্ল্ড রেকর্ড করতে! 🤣`,
      `সিআর রাফি আর প্রিয়ন্তির কাছে কিছু জিজ্ঞেস করা মানে কবুতরের কাছে মহাকাশ গবেষণা নিয়ে কথা বলা! ওদের বাদ দিয়ে আমাকেই সব জিগাও। 😎`
    ]);
  }

  // 14. কি করছো / ব্যস্ততা / চ্যাট গল্প
  if (/ki\s*kor|কি\s*কর|bored|বোর|talk\s*to\s*me|গল্প\s*কর|কথা\s*বল/i.test(q)) {
    return getRandom([
      `বসে বসে ভাবছি সিআর প্রিয়ন্তি আর রাফি এত ফাঁকিবাজ কেন! আর তোমাদের রুটিন পাহারা দিচ্ছি। বলো কি গল্প শুনবা? 🥱`,
      `বোর ফিল করতেছো? যাও গিয়ে দুই লাইন কোডিং প্র্যাকটিস করো বা কভার পেজ মেকার দিয়ে একটা অ্যাসাইনমেন্টের কভার বানিয়ে ফেলো! 💻`,
      `কথা তো বলতে রাজি আছি, কিন্তু তুমি ক্লাসের পড়া ঠিকমতো শেষ করছো তো? নাকি খালি আড্ডা দিতে আসছো? 😉`
    ]);
  }

  // 15. জোকস / ধাঁধা
  if (/joke|জোকস|কৌতুক|হাসাও|riddle|ধাঁধা/i.test(q)) {
    return getRandom([
      `শিক্ষক: বলতো ইফতেখার, মহাকর্ষ বল কাকে বলে?\nইফতেখার: স্যার, যে বলে টানলে ক্লাসের লাস্ট বেঞ্চের ছাত্ররা ফার্স্ট বেঞ্চের দিকে যায় না, কিন্তু ছুটির ঘণ্টার শব্দে সবাই দরজার দিকে যায়—তাকে মহাকর্ষ বল বলে! 😂`,
      `সিআর রাফি প্রিয়ন্তিকে বলতেছে: 'দোস্ত, তুই সারাদিন এত পড়ার নোটিশ কেমনে দিস?'\nপ্রিয়ন্তি: 'আমি শুধু নোটিশই দেই দোস্ত, নিজে তো একটা ক্লাসেও খাতা খুলি না!' 🤣`,
      `ছাত্র: স্যার, আমি কি এমন কোনো ভুলের জন্য শাস্তি পেতে পারি যা আমি করিনি?\nস্যার: অবশ্যই না!\nছাত্র: থ্যাংক ইউ স্যার, আমি আজকের এসাইনমেন্ট করি নাই! 🏃‍♂️💨`
    ]);
  }

  // 16. রোমান্স / ভালোবাসা / ফ্রেন্ডশিপ
  if (/love|ভালোবাসো|cute|friend|বন্ধু|girlfriend|boyfriend|crush|single/i.test(q)) {
    return getRandom([
      `আরোহ মিয়া! আমার আবার প্রেম-ভালোবাসা কিসের? আমার একমাত্র ক্রাশ হলো নিখুঁত কোড আর পাইথনের সিনট্যাক্স! ❤️💻`,
      `বন্ধু হতে পারি একদম পাক্কা! তবে গার্লফ্রেন্ড বা বয়ফ্রেন্ড খুঁজতে চাইলে ভুল জায়গায় চলে আইছো, আমি তো নিজেই এআই সিঙ্গেল! 🥲`,
      `ভালোবাসা তো শুধু সিআরদের প্রতি ক্লাসের নোটিশ দেওয়ার টাইমে দেখি! আমারে খালি পড়াশোনা আর রুটিন নিয়া ব্যস্ত রাখো।`
    ]);
  }

  // 17. সাহায্য চাওয়া / Help
  if (/help|সাহায্য|কি\s*পারো|what\s*can\s*you\s*do|কাজ\s*কি/i.test(q)) {
    return `🤖 **আমি যেসব কাজে সাহায্য করতে পারি:**\n• আজকের ক্লাস, রুটিন বা রুম নম্বর বলে দেওয়া।\n• যেকোনো স্টুডেন্টের রোল ও নাম খুঁজে দেওয়া।\n• শিক্ষক ও সাবজেক্টের আপডেট দেওয়া।\n• কভার পেজ তৈরির গাইড দেওয়া।\n• মুড ভালো করতে জোকস শোনানো বা সিআরদের নিয়ে একটু হাসাহাসি করা!\nবলো এখন কি জানতে চাও?`;
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

  // ধাপ ১: আগে সুপার-ফাস্ট লোকাল হিউম্যান ম্যাচিং চেক
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
সিআর: Prionty (260031) ও Rafiul (260053)। এদের রোস্ট করতে বললে দারুণভাবে পচিয়ে দেবে।
রুম: Section A (704), Section B (706)।
তুমি অত্যন্ত রসাত্মক, বুদ্ধিমান এবং পচানি প্রিয়। কুশল বিনিময় বা যেকোনো চ্যাট করলে রিল্যাক্সড ক্লাসমেটের মতো বন্ধুসুলভ উত্তর দাও।
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
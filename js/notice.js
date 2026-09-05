/* ============================================================
   Smart Weather & Contextual Vibe Engine (Fixed & Clean)
   ============================================================ */

/* ============================================================
   Super DIITian — 100% Fixed Smart Weather & Vibe Engine
   ============================================================ */

async function initSmartWeatherVibe() {
  const tempEl = document.getElementById("wTemp");
  const condEl = document.getElementById("wCondition");
  const humEl = document.getElementById("wHumidity");
  const windEl = document.getElementById("wWind");
  const vibeEl = document.getElementById("vibeMessage");

  if (!tempEl || !vibeEl) return;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentDayIdx = now.getDay(); // ০=রবিবার, ১=সোম, ২=মঙ্গল, ৩=বুধ, ৪=বৃহস্পতি, ৫=শুক্র, ৬=শনিবার
  const totalMins = hours * 60 + minutes;

  let weather = { temp: 28, condition: "Clear", text: "Clear Sky", isRain: false, isHot: false, isCold: false, isThunder: false };

  try {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current=temperature_2m,relative_humidity_2m,weather_code");
    const data = await res.json();
    if (data && data.current) {
      weather.temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;
      if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
        weather.isRain = true;
        weather.text = "Rainy & Stormy";
      } else if (weather.temp >= 33) {
        weather.isHot = true;
        weather.text = "Scorching Heat";
      } else if (weather.temp <= 18) {
        weather.isCold = true;
        weather.text = "Cool Breeze";
      }
    }
  } catch (err) {
    console.log("Weather fallback");
  }

  tempEl.innerHTML = `☀️ ${weather.temp}°C`;
  condEl.innerText = weather.text.toUpperCase();
  if (humEl) humEl.innerText = `Hum: 78%`;
  if (windEl) windEl.innerText = `Wind: 12 km/h`;

  // রুটিন ডেটা (রবি, সোম, মঙ্গল, বুধ ক্লাস থাকে; শনি ও শুক্র ছুটি)
  const todayRoutineMap = {
    0: [ // রবিবার
      { start: 700, end: 770, subject: "Calculus", teacher: "Md. Zakir Hossain" },
      { start: 770, end: 840, subject: "Structured Programming", teacher: "Poly Bhoumik" },
      { start: 860, end: 930, subject: "SPL Lab", teacher: "Poly Bhoumik" }
    ],
    1: [ // সোমবার
      { start: 700, end: 770, subject: "Calculus", teacher: "Md. Zakir Hossain" },
      { start: 770, end: 840, subject: "Electrical & Electronic Circuit", teacher: "Ramen Kumar Das" },
      { start: 860, end: 930, subject: "English", teacher: "Sabrina Quadir" }
    ],
    2: [ // মঙ্গলবার
      { start: 700, end: 770, subject: "Electrical & Electronic Circuit", teacher: "Ramen Kumar Das" },
      { start: 770, end: 840, subject: "Physics", teacher: "Mubtasim Fuad Opee" },
      { start: 860, end: 930, subject: "EEC Lab", teacher: "Saidur Rahman" }
    ],
    3: [ // বুধবার
      { start: 700, end: 770, subject: "English", teacher: "Sabrina Quadir" },
      { start: 770, end: 840, subject: "Structured Programming", teacher: "Poly Bhoumik" },
      { start: 860, end: 930, subject: "Physics", teacher: "Mubtasim Fuad Opee" }
    ]
  };

  const todayClasses = todayRoutineMap[currentDayIdx];
  let currentClassObj = null;
  let isBreakTime = false;
  let isClassesOver = false;

  if (todayClasses) {
    for (let c of todayClasses) {
      if (totalMins >= c.start && totalMins < c.end) {
        currentClassObj = c;
        break;
      }
    }
    if (totalMins >= 840 && totalMins < 860) isBreakTime = true;
    const lastClass = todayClasses[todayClasses.length - 1];
    if (totalMins > lastClass.end) isClassesOver = true;
  }

  let comment = "";

  // ১. গভীর রাত ও ভোরের চেক (শনি/রবিবার বা উইকেন্ড হিসাব করে)
  if (hours >= 2 && hours < 6) {
    if (currentDayIdx === 5 || currentDayIdx === 6) {
      comment = "রাত ২টা বাজে আর তুমি ওয়েদার দেখতেছো? আজ তো উইকেন্ড, কাল কোনো ক্লাসই নাই! চিল করে ঘুমাও! 😂🛌";
    } else {
      comment = "রাত ২টা বাজে আর তুমি ওয়েদার দেখতেছো? ভাই, ঘুমাও! কাল সকালে তো আবার সকাল সকাল ক্লাস আছে! 😴🏃‍♂️";
    }
  } 
  // ২. ছুটির দিন (শনিবার ও শুক্রবার)
  else if (currentDayIdx === 5 || currentDayIdx === 6) {
    if (hours >= 20) {
      comment = "আজ ছুটির রাতের আমেজ! কোনো ক্লাসের প্যারা নাই, আরামে মুভি দেখে ঘুমিয়ে পড়ো। 🍿✨";
    } else {
      comment = "আজ ছুটির দিন, কোনো ক্লাস নাই! সারাদিন চিল মোডে কাটাও। 😎🛋️";
    }
  } 
  // ৩. আবহাওয়াভিত্তিক ফানি কমেন্ট
  else if (weather.isRain) {
    comment = "বাইরে ফাটাফাটি বৃষ্টি হচ্ছে! আজকে ক্লাসে না গিয়ে কাথা মুড়ি দিয়ে আরামে ঘুমাও। 🌧️😴";
  } else if (weather.isHot) {
    comment = `আজকে তাপমাত্রা ${weather.temp}°C! ধানমন্ডিতে রীতিমত মরুভূমি আবহাওয়া। চেহারা বাঁচাতে সানস্ক্রিন বা ছাতা নিয়ে বের হও! 🥵🔥`;
  } 
  // ৪. রানিং ক্লাস বা ব্রেক চেক
  else if (isBreakTime) {
    comment = "এখন ব্রেক টাইম চলছে! ক্যাফেটেরিয়াতে গিয়ে ভাজাপোড়া খেয়ে পেটে গ্যাস্ট্রিক বাঁধাও বা একটু হাঁটাহাঁটি করো! 🍔🥤";
  } else if (currentClassObj) {
    comment = `এখন ${currentClassObj.teacher} স্যারের **${currentClassObj.subject}** ক্লাস চলছে! ফালতু কথা বাদ দিয়ে ক্লাসে মন দাও। 📖✍️`;
  } else if (isClassesOver) {
    comment = "আজকের মতো সব ক্লাস খতম! আড্ডা দিয়ে সময় নষ্ট না করে সোজা বাড়ি গিয়ে গরম গরম খাবার খাও! 🏠🍲";
  } 
  // ৫. সাধারণ সময়ভিত্তিক কমেন্ট
  else if (hours >= 6 && hours < 11) {
    comment = "সকালবেলা ঘুম থেকে উঠে ফ্রেশ হয়ে নাও। আজকের ক্লাসগুলোতে এটেন্ডেন্স মিস দিও না যেন! 🌅🎯";
  } else if (hours >= 19 && hours < 22) {
    comment = "অনেক তো ঘুরলা! এবার একটু টেবিলে বসে বইখাতা নিয়ে পড়তে বসো সোনা! 📚💡";
  } else if (hours >= 22) {
    comment = "অনেক রাত হয়ে গেছে! কাল সকালের ক্লাসে টাইমমতো উঠতে চাইলে এখনই ঘুমাতে যাও। 🌙😴";
  } else {
    comment = "দিনের আলো ফুরিয়ে আসছে, ক্লাসের পড়াগুলো ঝালিয়ে নেওয়ার মোক্ষম সময় এখনই! ⚡📖";
  }

  vibeEl.innerText = comment;
}

window.fetchNews = async function(category = 'politics', btnEl = null) {
  if (btnEl) {
    document.querySelectorAll('.news-cat-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }

  const container = document.getElementById('newsGridContainer');
  if (!container) return;

  container.innerHTML = `<div class="news-loading">📰 লাইভ নিউজ ফেচ করা হচ্ছে...</div>`;

  const apiKey = "pub_f8e8d9bebd8043288900e37fd51e7f08";
  const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=bn&category=${category}`;

  try { 
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      container.innerHTML = `<div class="news-error">⚠️ এই মুহূর্তে কোনো নিউজ পাওয়া যায়নি।</div>`;
      return;
    }

    container.innerHTML = data.results.map(item => {
      return `
        <a href="${item.link || '#'}" target="_blank" rel="noopener" class="news-card">
          <div class="news-card__img-wrap">
            <img src="${item.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=60'}" alt="News" loading="lazy">
          </div>
          <div class="news-card__content">
            <span class="news-card__source">🌐 ${item.source_id || "Online News"}</span>
            <h3 class="news-card__title">${item.title || "শিরোনাম পাওয়া যায়নি"}</h3>
            <p class="news-card__desc">${item.description || item.content || "বিস্তারিত পড়তে ক্লিক করুন..."}</p>
            <div class="news-card__footer">
              <span>📅 ${item.pubDate ? new Date(item.pubDate).toLocaleDateString('bn-BD') : "সদ্য প্রকাশিত"}</span>
              <span style="color:#0284c7; font-weight:700;">বিস্তারিত পড়ুন &rarr;</span>
            </div>
          </div>
        </a>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = `<div class="news-error">❌ নিউজ লোড করতে গিয়ে এরর হয়েছে!</div>`;
  }
};

const WIKI_TOPICS = {
  science: ["কোয়ান্টম বলবিদ্যা", "ব্ল্যাক হোল", "আপেক্ষিকতার তত্ত্ব", "ডিএনএ", "মহাবিস্ফোরণ"],
  space: ["মঙ্গল গ্রহ", "বৃহস্পতি", "আন্তর্জাতিক মহাকাশ স্টেশন", "সৌরজগৎ"],
  technology: ["কৃত্রিম বুদ্ধিমত্তা", "কোয়ান্টাম কম্পিউটার", "ইন্টারনেট", "রোবট"],
  history: ["মিশরের পিরামিড", "শিল্প বিপ্লব", "রেনেসাঁ", "দ্বিতীয় বিশ্বযুদ্ধ"],
  nature: ["অক্টোপাস", "নীল তিমি", "রয়েল বেঙ্গল টাইগার", "অ্যামাজন বৃষ্টিঅরণ্য"],
  psychology: ["মনোবিজ্ঞান", "স্মৃতি", "স্বপ্ন", "সচেতনতা"]
};

window.fetchKnowledge = async function(categoryKey = 'science', categoryName = 'বিজ্ঞান', btnEl = null) {
  if (btnEl) {
    document.querySelectorAll('.k-cat-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }

  const container = document.getElementById('knowledgeCardContainer');
  if (!container) return;

  container.innerHTML = `<div class="knowledge-loading">🧠 "${categoryName}" থেকে তথ্য খোঁজা হচ্ছে...</div>`;

  try {
    const list = WIKI_TOPICS[categoryKey] || WIKI_TOPICS['science'];
    const topic = list[Math.floor(Math.random() * list.length)];
    const res = await fetch(`https://bn.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
    const data = await res.json();

    if (!data || !data.extract) {
      container.innerHTML = `<div class="knowledge-loading">⚠️ তথ্য পাওয়া যায়নি।</div>`;
      return;
    }

    container.innerHTML = `
      <div class="knowledge-card">
        <div class="knowledge-card__header">
          <span class="knowledge-badge">✨ ${categoryName} জ্ঞান</span>
          <span class="knowledge-source">📚 Wikipedia</span>
        </div>
        <h2 class="knowledge-card__title">${data.title || topic}</h2>
        ${data.thumbnail?.source ? `<div style="max-height:220px; overflow:hidden; border-radius:12px;"><img src="${data.thumbnail.source}" style="width:100%; object-fit:cover;"></div>` : ''}
        <p class="knowledge-card__body">${data.extract}</p>
        <div class="knowledge-card__footer">
          <span>প্রতিবার নতুন জানতে আবার ক্লিক করুন! 🚀</span>
          <a href="${data.content_urls?.desktop?.page || '#'}" target="_blank" rel="noopener" class="wiki-read-more-btn">উইকিপিডিয়ায় পড়ুন &rarr;</a>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<div class="knowledge-loading">❌ নেটওয়ার্ক এরর!</div>`;
  }
};
// হোমপেজ লোড হওয়ার সাথে সাথেই আবহাওয়া ও কমেন্ট উইজেট সচল করার জন্য
document.addEventListener('DOMContentLoaded', () => {
  initSmartWeatherVibe();
});
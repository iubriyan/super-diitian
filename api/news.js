/* ============================================================
   Super DIITian — Live News API Proxy
   ============================================================ */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") return res.status(200).end();

  const category = req.query.category || "politics";
  const apiKey = "pub_f8e8d9bebd8043288900e37fd51e7f08";
  const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=bd&language=bn&category=${category}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch news from newsdata.io");
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("News API Error:", error);
    return res.status(500).json({ status: "error", message: "নিউজ লোড করতে সমস্যা হচ্ছে। একটু পরে আবার চেষ্টা করুন।" });
  }
}
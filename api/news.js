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
  
  // ফ্রি প্ল্যানে অনেক সময় কান্ট্রি ফিল্টার ছাড়া শুধু ল্যাঙ্গুয়েজ দিলে ডেটা ভালো আসে
  const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=bn&category=${category}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      console.error("Newsdata API Error Response:", data);
      return res.status(500).json({ status: "error", message: data.results?.message || "API limit or key error" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Fetch Exception:", error);
    return res.status(500).json({ status: "error", message: "Internal server error connecting to news" });
  }
}
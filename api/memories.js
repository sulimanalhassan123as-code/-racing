// /api/memories.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { prompt } = req.body;
  const API_KEY = process.env.MEMORIES_API_KEY;

  try {
    const response = await fetch("https://api.memories.ai/v1/video/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Memories API Error:", errorText);
      return res.status(500).json({ error: "Video generation failed" });
    }

    const data = await response.json();
    res.status(200).json({ videoUrl: data.video_url });
  } catch (error) {
    console.error("Memories API Error:", error);
    res.status(500).json({ error: "Suleiman AI Video failed to generate." });
  }
}

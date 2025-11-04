export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    // Replace with your real video generation API call
    const response = await fetch("https://api.memories-ai.com/video", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MEMORIES_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    res.status(200).json({ videoUrl: data.video_url || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

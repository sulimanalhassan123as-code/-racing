// /api/video.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://veo3api.com/api/video/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VEO3_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        duration: 5,
        resolution: "720p",
      }),
    });

    const data = await response.json();

    if (!response.ok || !data?.videoUrl) {
      return res.status(400).json({ error: "Failed to generate video." });
    }

    res.status(200).json({ videoUrl: data.videoUrl });
  } catch (error) {
    res.status(500).json({ error: "Server error generating video." });
  }
}

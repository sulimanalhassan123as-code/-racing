// api/video.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing video prompt" });

  try {
    // Replace YOUR_API_KEY_HERE with your Veo3 API key
    const response = await fetch("https://api.veo3api.com/api/v1/video/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE",
      },
      body: JSON.stringify({
        prompt,
        duration: 10, // seconds
        resolution: "720p",
      }),
    });

    const data = await response.json();

    if (data && data.video_url) {
      return res.status(200).json({ videoUrl: data.video_url });
    } else {
      return res.status(500).json({ error: "Failed to generate video." });
    }
  } catch (error) {
    console.error("Veo3 Error:", error);
    return res.status(500).json({ error: "Server error generating video." });
  }
                                 }

import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing video prompt" });

  try {
    const response = await fetch("https://veo3api.com/api/v1/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.VEO3_API_KEY,
      },
      body: JSON.stringify({
        prompt,
        duration: 10,
        resolution: "720p",
      }),
    });
    const data = await response.json();
    if (data && data.video_url) {
      return res.status(200).json({ videoUrl: data.video_url });
    } else {
      return res.status(500).json({
        error: data.error || "Failed to generate video from Veo3 API.",
      });
    }
  } catch (err) {
    console.error("Veo3 error:", err);
    return res.status(500).json({ error: "Server error generating video." });
  }
      }

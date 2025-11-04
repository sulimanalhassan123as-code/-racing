// /api/video.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { prompt } = req.body;
  const API_KEY = process.env.VEO_API_KEY;

  try {
    const response = await fetch("https://api.veo3api.com/v1/videos", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "veo-3.1",
        prompt,
        output_format: "mp4",
        duration: 8
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Veo3API Error:", data);
      return res.status(500).json({ error: "Video generation failed." });
    }

    res.status(200).json({ videoUrl: data.video_url });
  } catch (error) {
    console.error("Veo3API Error:", error);
    res.status(500).json({ error: "Suleiman AI Video failed to generate." });
  }
      }

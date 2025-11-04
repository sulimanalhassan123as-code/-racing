export default async function handler(req, res) {
  const { MEMORIES_API_KEY } = process.env;
  const { prompt } = req.body;

  if (!MEMORIES_API_KEY) {
    return res.status(500).json({ error: "MEMORIES_API_KEY not set." });
  }
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided." });
  }

  try {
    // Confirm the actual API endpoint and request format matches your service
    const response = await fetch("https://api.memories-ai.com/video", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MEMORIES_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Video API returned error:", errorText);
      return res.status(response.status).json({ error: "Failed to generate video." });
    }

    const data = await response.json();

    if (!data.video_url) {
      console.error("Video API returned no video_url:", data);
      return res.status(500).json({ error: "No video URL received." });
    }

    res.status(200).json({ videoUrl: data.video_url });
  } catch (error) {
    console.error("Error calling Memories API:", error);
    res.status(500).json({ error: "Error connecting to video AI." });
  }
        }

export default async function handler(req, res) {
  const { GEMINI_API_KEY, MEMORIES_API_KEY } = process.env;
  const { message } = req.body;

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
        safetySettings: [{ category: "HARM_CATEGORY_DEROGATORY", threshold: "BLOCK_NONE" }],
      }),
    });

    const result = await response.json();
    const aiReply = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply.";

    res.status(200).json({ reply: aiReply });
  } catch (err) {
    res.status(500).json({ reply: "Error connecting to Gemini API." });
  }
      }

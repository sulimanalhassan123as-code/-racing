// /api/gemini.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { message } = req.body;
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-latest:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t get a reply.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Network error. Please try again." });
  }
}

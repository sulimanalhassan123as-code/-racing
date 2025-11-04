export default async function handler(req, res) {
  const { GEMINI_API_KEY } = process.env;
  const { message } = req.body;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ reply: "GEMINI_API_KEY is not set." });
  }
  if (!message) {
    return res.status(400).json({ reply: "No message provided." });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          safetySettings: [{ category: "HARM_CATEGORY_DEROGATORY", threshold: "BLOCK_NONE" }],
          maxOutputTokens: 2048,  // Added this to get full reply
        }),
      }
    );

    const result = await response.json();

    if (!result.candidates || !result.candidates[0]?.content?.parts?.[0]?.text) {
      console.error("Gemini API empty response:", result);
      return res.status(500).json({ reply: "No reply from Gemini API." });
    }

    const aiReply = result.candidates[0].content.parts[0].text;

    res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error("Error connecting to Gemini API:", err);
    res.status(500).json({ reply: "Error connecting to Gemini API." });
  }
        }

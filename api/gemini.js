import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro" });
    const result = await model.generateContent(message);
    res.status(200).json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ reply: "Error: " + error.message });
  }
}

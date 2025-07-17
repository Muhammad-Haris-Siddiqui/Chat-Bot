const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // ✅ Load environment variables

const app = express(); // ✅ Must come BEFORE using middleware like cors

// ✅ Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body

const port = 5000;

// ✅ Main Route
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const botReply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({ error: "Failed to fetch Gemini response" });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
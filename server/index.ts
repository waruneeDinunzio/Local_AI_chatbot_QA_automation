import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        stream: false,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!ollamaResponse.ok) {
      return res.status(500).json({
        error: "Unable to connect to local AI model.",
      });
    }

    const data = await ollamaResponse.json();

    return res.json({
      reply: data.message.content,
    });
  } catch {
    return res.status(500).json({
      error: "Unable to connect to local AI model.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
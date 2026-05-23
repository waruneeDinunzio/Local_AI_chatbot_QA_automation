import express from "express";
import cors from "cors";

// --- Type definitions ---
// This describes the shape of one chat message.
// "role" can only be "user" or "assistant", nothing else.
// "content" is the actual text of the message.
type Message = {
  role: "user" | "assistant";
  content: string;
};

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    // ✅ Now we receive the full "messages" array from the frontend
    // instead of a single "message" string.
    // Example of what req.body now looks like:
    // {
    //   messages: [
    //     { role: "user",      content: "my name is tester" },
    //     { role: "assistant", content: "Hello Tester!" },
    //     { role: "user",      content: "what is my name?" }
    //   ]
    // }
    const { messages }: { messages: Message[] } = req.body;

    // Check that messages exists AND is an array AND has at least one item.
    // The "!" is the logical NOT operator — it flips true to false and vice versa.
    // Array.isArray() returns true if the value is an array.
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Messages are required.",
      });
    }

    // Get the very last message in the array.
    // .at(-1) means "give me the last item" — same as messages[messages.length - 1]
    // but shorter and easier to read.
    const lastMessage = messages.at(-1);

    // Check that the last message is from the user and has actual text.
    // .trim() removes spaces from both ends — so "   " becomes "" which is falsy.
    if (!lastMessage || lastMessage.role !== "user" || !lastMessage.content.trim()) {
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
        // ✅ Pass the full messages array to Ollama.
        // This is the key fix — Ollama now sees the entire conversation,
        // not just the latest message, so it can remember context.
        messages: messages,
      }),
    });

    if (!ollamaResponse.ok) {
      return res.status(500).json({
        error: "Unable to connect to local AI model.",
      });
    }

    const data = await ollamaResponse.json();

    // data.message.content is Ollama's reply text.
    // We send it back to the frontend as { reply: "..." }
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
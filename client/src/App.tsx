import { useState } from "react";
import "./App.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) {
      setError("Please enter a message.");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
    };
    // ✅ Build the full history as a variable first,
    // because we need to send it to the backend immediately.
    // We can't rely on "messages" state here since setMessages
    // hasn't run yet — React state updates are async.
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }), // full history sent to backend for context, not just latest message
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch {
      setError("Unable to connect to local AI model. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
    setInput("");
  };

  return (
    <main>
      <h1>Local AI Chatbot</h1>
      <p>Powered by Ollama, tested with Playwright.</p>

      <section data-testid="chat-window">
        {messages.map((message, index) => (
          <div key={index} data-testid={`${message.role}-message`}>
            <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
            {message.content.split("\n").map((line, i) => (
              <span key={i}>
                {line}
              </span>
            ))}
          </div>
        ))}

        {isLoading && <p data-testid="loading-message">AI is processing...</p>}
      </section>

      {error && <p data-testid="error-message">{error}</p>}

      <textarea
        data-testid="chat-input"
        value={input}
        placeholder="Ask the local AI something..."
        disabled={isLoading}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
          }
        }}
      />

      <div>
        <button
          data-testid="send-button"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Send
        </button>

        <button data-testid="clear-button" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
    </main>
  );
}

export default App;

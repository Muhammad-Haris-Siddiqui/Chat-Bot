import axios from "axios";
import { useState } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp?: number;
  error?: boolean;
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    const userMessage: Message = { text: message, sender: "user", timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message,
      });
      const botMessage: Message = { text: response.data.reply, sender: "bot", timestamp: Date.now() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setError("Sorry, something went wrong!");
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong!", sender: "bot", timestamp: Date.now(), error: true },
      ]);
      console.error("Error fetching AI response:", err);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading, error };
};

export default useChatbot;
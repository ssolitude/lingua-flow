import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "こんにちは！ I'm your AI Japanese tutor. Ask me anything about grammar, vocabulary, sentence breakdown, or get help with your studies. Try sending me a Japanese sentence to break down! 🎌",
  },
];

const Tutor = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Great question! Let me help you with "${input}". In a full implementation, this would connect to an AI service for detailed grammar explanations, sentence breakdowns, and personalized vocabulary help. 📚`,
        },
      ]);
    }, 800);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="mb-4">
          <h1 className="font-display text-2xl font-bold text-foreground">AI Tutor</h1>
          <p className="text-sm text-muted-foreground mt-1">Ask questions about grammar, vocabulary, and more</p>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
              }`}>
                {msg.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "assistant"
                  ? "bg-card shadow-card text-foreground"
                  : "bg-primary text-primary-foreground"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about grammar, vocabulary, or paste a sentence..."
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleSend}
            className="w-11 h-11 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Tutor;

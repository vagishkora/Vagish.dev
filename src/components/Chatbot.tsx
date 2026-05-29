"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Terminal } from "lucide-react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "System online. I am Vagish's AI assistant. State your query." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.choices && data.choices[0]?.message) {
        setMessages((prev) => [...prev, data.choices[0].message]);
      } else {
        throw new Error("Invalid response from AI core.");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "[ERROR]: Connection to AI core severed. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        suppressHydrationWarning
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-500/20 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/40 hover:scale-110 shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-black/90 border border-cyan-500/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.1)] font-mono flex flex-col transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-[#141419] px-4 py-3 flex items-center justify-between border-b border-cyan-500/20 shrink-0">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal size={16} />
            <span className="text-xs tracking-[2px] uppercase font-semibold drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">AI_Agent.exe</span>
          </div>
          <button suppressHydrationWarning onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10"></div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-20 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-50' : 'bg-gray-800/50 border border-gray-700 text-gray-300'}`}>
                {msg.role === 'assistant' && <span className="text-cyan-400 text-[10px] uppercase block mb-1">System &gt;</span>}
                {msg.role === 'user' && <span className="text-gray-400 text-[10px] uppercase block mb-1 text-right">&lt; Guest</span>}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300">
                <span className="animate-pulse">Processing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-3 border-t border-cyan-500/20 bg-black shrink-0 relative z-20 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your query..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <button
            type="submit"
            suppressHydrationWarning
            disabled={isLoading || !input.trim()}
            className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-3 py-2 rounded hover:bg-cyan-500/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}

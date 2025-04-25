"use client";

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingBubble from "./TypingBubble";

type Message = {
  from: "bot" | "user";
  text: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsTyping(true);
    const introDelay = Math.random() * (2700 - 1200) + 1200;
    setTimeout(() => {
      setMessages([
        {
          from: "bot",
          text: "E aí, FURIOSO(A)! 👊 Sou o bot da FURIA. Manda aí sua pergunta!",
        },
      ]);
      setIsTyping(false);
    }, introDelay);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setIsTyping(true);
    const delay = Math.random() * (2700 - 1200) + 1200;
    setTimeout(() => {
      const response = simulateBotResponse(text);
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
      setIsTyping(false);
    }, delay);
  };

  const simulateBotResponse = (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes("art")) return "O Art é o capitão agressivo que não recua nunca 💥";
    if (lower.includes("proximo jogo")) return "O próximo jogo da FURIA é dia 27/04 às 18h 🕕 contra a NAVI.";
    if (lower.includes("curiosidade")) return "Você sabia que a FURIA já bateu top 3 mundial em 2021?";
    if (lower.includes("quiz")) return "Modo quiz ainda está em construção. Fica ligado! 👀";
    return "Boa pergunta! Mas não entendi ainda. Tente perguntar sobre jogadores, próximos jogos ou curiosidades 😉";
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-md text-white rounded-2xl px-6 pt-6 pb-3 shadow-xl border border-zinc-700/40 max-w-xl w-full h-[600px] flex flex-col justify-between transition-all duration-300">
      <div className="overflow-y-auto scroll-smooth space-y-2 mb-4 flex-1 pr-2">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} from={msg.from} text={msg.text} />
        ))}
        {isTyping && <TypingBubble />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingBubble from "./TypingBubble";
import ExternalLinkBubble from "./ExternalLinkBubble";

import rawResponsesData from "@/data/responses.json";

const helpCategories = ["jogadores", "jogos", "curiosidade", "quiz"];

const responsesData = rawResponsesData as {
  responses: { [key: string]: string[] };
};

type Message = {
  from: "bot" | "user";
  text: string;
  type?: "text" | "link";
  url?: string;
};

type SpecialMode = "jogadores" | "jogo" | null;

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [specialMode, setSpecialMode] = useState<SpecialMode>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsTyping(true);
    const introDelay = Math.random() * (2700 - 1200) + 1200;
    setTimeout(() => {
      setMessages([
        { from: "bot", type: "text", text: getResponse("intro") },
      ]);
      setIsTyping(false);
      playNotificationSound();
    }, introDelay);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const playNotificationSound = () => {
    const audio = new Audio("/sounds/notification.mp3");
    audio.volume = 0.5;
    audio.play();
  };

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const getLiquipediaLink = (category: string) => {
    const links: { [key: string]: string } = {
      jogadoresCS: "https://liquipedia.net/counterstrike/FURIA_Esports",
      jogadoresValorant: "https://liquipedia.net/valorant/FURIA",
      jogadoresLoL: "https://liquipedia.net/leagueoflegends/FURIA_Esports",
      jogosCS: "https://liquipedia.net/counterstrike/Liquipedia:Matches",
      jogosValorant: "https://liquipedia.net/valorant/Liquipedia:Matches",
      jogosLoL: "https://liquipedia.net/leagueoflegends/Liquipedia:Matches",
    };
    return links[category] || null;
  };

  const getResponse = (key: string) => {
    const options = responsesData.responses[key];
    if (!options) return "Desculpe, não achei essa informação.";
    return options[Math.floor(Math.random() * options.length)];
  };

  const simulateBotResponse = (input: string): Message[] => {
    const lower = input.toLowerCase();

    switch (lower) {
      case "cs":
        return [
          { from: "bot", type: "text", text: getResponse("cs") },
          { from: "bot", type: "link", text: "", url: getLiquipediaLink("jogadoresCS")! },
        ];
      case "valorant":
        return [
          { from: "bot", type: "text", text: getResponse("valorant") },
          { from: "bot", type: "link", text: "", url: getLiquipediaLink("jogadoresValorant")! },
        ];
      case "lol":
        return [
          { from: "bot", type: "text", text: getResponse("lol") },
          { from: "bot", type: "link", text: "", url: getLiquipediaLink("jogadoresLoL")! },
        ];
      case "jogos cs":
        return [
          { from: "bot", type: "text", text: getResponse("jogos cs") },
          { from: "bot", type: "link", text: "", url: getLiquipediaLink("jogosCS")! },
        ];
      case "jogos valorant":
        return [
          { from: "bot", type: "text", text: getResponse("jogos valorant") },
          { from: "bot", type: "link", text: "", url: getLiquipediaLink("jogosValorant")! },
        ];
      case "jogos lol":
        return [
          { from: "bot", type: "text", text: getResponse("jogos lol") },
          { from: "bot", type: "link", text: "", url: getLiquipediaLink("jogosLoL")! },
        ];
      case "quiz":
        return [{ from: "bot", type: "text", text: getResponse("quiz") }];
      case "curiosidade":
        return [{ from: "bot", type: "text", text: getResponse("curiosidade") }];
      default:
        break;
    }

    if (lower.includes("ajuda")) {
      setShowHelpOptions(true);
      return [{ from: "bot", type: "text", text: getResponse("ajuda") }];
    }

    if (lower.includes("jogadores")) {
      setSpecialMode("jogadores");
      return [
        { from: "bot", type: "text", text: getResponse("jogadores pergunta") },
      ];
    }

    if (lower.includes("jogos") && !specialMode) {
      setSpecialMode("jogo");
      return [
        { from: "bot", type: "text", text: getResponse("jogos pergunta") },
      ];
    }

    return [
      { from: "bot", type: "text", text: capitalize(getResponse("fallback")) },
    ];
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", type: "text", text: text.trim() },
    ]);
    setIsTyping(true);
    setShowHelpOptions(false);
    setSpecialMode(null);

    try {
      const recent = messages.slice(-5).map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const payload = [...recent, { role: "user", content: text.trim() }];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      const botMsg = data.reply;

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: "bot", type: "text", text: botMsg },
        ]);
        setIsTyping(false);
        playNotificationSound();
      }, Math.random() * (2700 - 1200) + 1200);
    } catch (error) {
      const fallback = simulateBotResponse(text);
      setTimeout(() => {
        setMessages((prev) => [...prev, ...fallback]);
        setIsTyping(false);
        playNotificationSound();
      }, Math.random() * (2700 - 1200) + 1200);
    }
  };

  const handleOptionSelect = (key: string) => {
    const formatted = capitalize(key);

    if (specialMode === "jogadores") {
      handleSend(formatted);
      setSpecialMode(null);
    } else if (specialMode === "jogo") {
      handleSend(`Jogos ${formatted}`);
      setSpecialMode(null);
    } else {
      handleSend(formatted === "Jogo" ? "Jogos" : formatted);
    }
  };

  const renderSpecialOptions = () => {
    if ((specialMode === "jogadores" || specialMode === "jogo") && !isTyping) {
      return (
        <div className="flex flex-wrap gap-4 justify-center mt-8 mb-8 px-2">
          {["cs", "valorant", "lol"].map((key) => (
            <button
              key={key}
              onClick={() => handleOptionSelect(key)}
              className="px-5 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-full 
                        text-sm font-medium hover:bg-purple-600 hover:border-purple-500 
                        active:scale-95 transition-all duration-300 shadow-md"
            >
              {capitalize(key)}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative bg-zinc-900/80 backdrop-blur-md text-white rounded-2xl px-6 pt-6 
                    pb-4 shadow-xl border border-zinc-700/40 w-full max-w-xl sm:max-w-md md:max-w-lg 
                    lg:max-w-xl h-[600px] flex flex-col justify-between transition-all duration-300">
      <Link
        href="/"
        className="absolute top-3 right-4 text-zinc-400 hover:text-white text-xl font-bold"
        aria-label="Fechar"
      >
        ✕
      </Link>

      <div className="overflow-y-auto scroll-smooth space-y-2 mb-8 flex-1 pr-2">
        {messages.map((msg, idx) =>
          msg.type === "link" ? (
            <ExternalLinkBubble key={idx} url={msg.url!} />
          ) : (
            <MessageBubble key={idx} from={msg.from} text={msg.text} />
          )
        )}
        {isTyping && <TypingBubble />}
        {renderSpecialOptions()}
        {showHelpOptions && !isTyping && (
          <div className="flex flex-wrap gap-4 justify-center mt-8 mb-8 px-2">
            {helpCategories.map((key) => (
              <button
                key={key}
                onClick={() => handleOptionSelect(key)}
                className="px-5 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-full 
                          text-sm font-medium hover:bg-purple-600 hover:border-purple-500 
                          active:scale-95 transition-all duration-300 shadow-md"
              >
                {capitalize(key)}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

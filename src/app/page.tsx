"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white px-4 text-center"
    >
      <div className="mb-8">
        <Image
          src="/avatar-furia.png"
          alt="FURIA Avatar"
          width={80}
          height={80}
          className="rounded-full shadow-md transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold mb-4">FURIA Chatbot</h1>

      <p className="text-zinc-400 mb-6 max-w-md">
        Assistente interativo para fãs da FURIA tirarem dúvidas sobre o time, jogadores e curiosidades. Desenvolvido com animações, foco em UX e estilo dark.
      </p>

      <Link
        href="/chat"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors px-6 py-3 rounded-xl text-sm font-semibold shadow-md mb-4"
      >
        Testar o Chatbot
      </Link>

      <p className="text-xs text-zinc-600 italic">
        Repositório no GitHub em breve...
      </p>
    </motion.main>
  );
}

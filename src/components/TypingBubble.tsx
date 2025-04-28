"use client";

import { motion } from "framer-motion";

export default function TypingBubble() {
  const dots = [0, 0.2, 0.4];

  return (
    <div className="flex justify-start">
      <motion.div
        className="flex gap-1 px-4 py-2 rounded-xl max-w-[70%] text-sm 
                   bg-gray-700 text-green-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span>Digitando</span>
        {dots.map((delay, idx) => (
          <motion.span
            key={idx}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1, delay }}
          >
            .
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

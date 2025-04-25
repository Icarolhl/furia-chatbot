import { motion } from "framer-motion";

export default function TypingBubble() {
  return (
    <div className="flex justify-start">
      <motion.div
        className="px-4 py-2 rounded-xl max-w-[70%] text-sm bg-gray-700 text-green-300 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span>Digitando</span>
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
        >
          .
        </motion.span>
      </motion.div>
    </div>
  );
}

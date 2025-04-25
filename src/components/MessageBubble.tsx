type Props = {
  from: "user" | "bot";
  text: string;
};

export default function MessageBubble({ from, text }: Props) {
  const isUser = from === "user";
  const senderName = isUser ? "Você" : "FURIA BOT";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3 mb-2 items-center`}
    >
      {!isUser && (
        <img
          src="/avatar-furia.png"
          alt="Bot Avatar"
          className="w-10 h-10 rounded-full shrink-0"
        />
      )}
      <div className="flex flex-col space-y-1 max-w-[70%]">
        <span
          className={`text-xs font-semibold ${
            isUser ? "text-right text-purple-300" : "text-green-300"
          }`}
        >
          {senderName}
        </span>
        <div
          className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm 
            ${isUser ? "bg-purple-600 text-white self-end" : "bg-zinc-800 text-zinc-100"}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

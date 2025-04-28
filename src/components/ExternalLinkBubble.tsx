"use client";

import Link from "next/link";

type Props = {
  url: string;
};

export default function ExternalLinkBubble({ url }: Props) {
  return (
    <div className="mt-5 ml-13 max-w-[80%]">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 
                   text-sm font-medium"
      >
        🔗 Clique para mais detalhes
      </Link>
    </div>
  );
}

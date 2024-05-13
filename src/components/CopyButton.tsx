"use client";

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data).then(() => setCopied(true));
  }

  return (
    <button
      onClick={!copied ? copy : () => setCopied(false)}
      className={twMerge(
        "p-2 rounded-md bg-zinc-800 border border-zinc-700 hover:bg-zinc-700",
        copied && "hover:bg-zinc-800 text-green-400"
      )}
    >
      {!copied && (
        <Image
          className="min-w-[20px]"
          src="copy.svg"
          alt="copy"
          width={20}
          height={20}
        />
      )}
      {copied && (
        <Image
          className="min-w-[20px]"
          src="check.svg"
          alt="check"
          width={20}
          height={20}
        />
      )}
      <p className="sr-only">copy to clipboard</p>
    </button>
  );
}

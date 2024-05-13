"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Spoiler({ children }: { children: string }) {
  const [hidden, setHidden] = useState(true);

  const spoilerText = "*".repeat(children.length);

  return (
    <span
      onClick={() => setHidden((prev) => !prev)}
      className={twMerge(
        "bg-zinc-700 cursor-pointer",
        hidden && "text-zinc-600"
      )}
    >
      {hidden ? spoilerText : children}
    </span>
  );
}

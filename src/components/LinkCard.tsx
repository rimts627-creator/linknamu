"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialCount: number | null;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    // 페이지를 떠나도 요청이 전송되도록 sendBeacon 사용
    const body = JSON.stringify({ id: link.id });
    const sent =
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
    if (!sent) {
      fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
    setCount((c) => (c === null ? c : c + 1));
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <span className="text-xl" aria-hidden>
        {link.icon}
      </span>
      <span className="flex-1 text-center font-medium">{link.title}</span>
      {count !== null && (
        <span className="min-w-[3rem] text-right text-xs tabular-nums text-neutral-500">
          {count.toLocaleString()}회
        </span>
      )}
    </a>
  );
}

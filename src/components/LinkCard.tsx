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
      className="group flex items-center gap-3 rounded-[1.25rem] border border-white/70 bg-white/45 px-5 py-[1.125rem] shadow-[0_8px_28px_-12px_rgba(70,90,140,0.22),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_12px_32px_-12px_rgba(70,90,140,0.3),inset_0_1px_0_rgba(255,255,255,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:bg-white/[0.1]"
    >
      <span className="w-12 text-xl leading-none" aria-hidden>
        {link.icon}
      </span>
      <span className="flex-1 text-center text-[0.9375rem] font-semibold tracking-tight">
        {link.title}
      </span>
      {/* 아이콘 칸과 같은 폭을 둬서 제목이 항상 정가운데에 오도록 */}
      <span className="w-12 text-right text-xs tabular-nums text-[var(--muted)] opacity-80">
        {count !== null && `${count.toLocaleString()}회`}
      </span>
    </a>
  );
}

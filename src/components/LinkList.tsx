"use client";

import { useEffect, useRef, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  // 데이터를 받기 전에는 모든 링크를 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>({});
  // 서버 값이 오기 전에 누른 클릭도 잃지 않도록 따로 기억
  const pendingClicks = useRef<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();

    // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옴
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<Record<string, number>>) : null))
      .then((serverCounts) => {
        if (!serverCounts) return;
        const merged: Record<string, number> = {};
        for (const link of links) {
          merged[link.id] = (serverCounts[link.id] ?? 0) + (pendingClicks.current[link.id] ?? 0);
        }
        pendingClicks.current = {};
        setCounts(merged);
      })
      .catch(() => {
        // 실패하면 0회 표시를 유지
      });

    return () => controller.abort();
  }, [links]);

  const handleClicked = (id: string) => {
    pendingClicks.current[id] = (pendingClicks.current[id] ?? 0) + 1;
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-12 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClicked={handleClicked} />
        </li>
      ))}
    </ul>
  );
}

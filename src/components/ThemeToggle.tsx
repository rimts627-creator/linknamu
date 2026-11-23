"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-base shadow-[0_6px_20px_-10px_rgba(70,90,140,0.3)] backdrop-blur-xl transition duration-300 hover:bg-white/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
    >
      <span aria-hidden>{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}

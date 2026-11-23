import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

// 방문할 때마다 최신 클릭 수를 보여주기 위해 동적 렌더링
export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[26rem] px-6 pb-16 pt-24 sm:pt-28">
      {/* 다크모드 토글 */}
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      {/* 상단: 원형 프로필 사진 · 이름 · 한 줄 소개 */}
      <ProfileHeader profile={profile} />

      {/* 하단: 링크 카드 목록 (세로 배치) */}
      <ul className="mt-12 flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} initialCount={counts ? counts[link.id] ?? 0 : null} />
          </li>
        ))}
      </ul>
    </main>
  );
}

import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[26rem] px-6 pb-16 pt-24 sm:pt-28">
      {/* 다크모드 토글 */}
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      {/* 상단: 원형 프로필 사진 · 이름 · 한 줄 소개 */}
      <ProfileHeader profile={profile} />

      {/* 하단: 링크 카드 목록 — 클릭 수는 페이지가 열린 뒤 /api/clicks 에서 한 번에 받아옴 */}
      <LinkList links={links} />
    </main>
  );
}

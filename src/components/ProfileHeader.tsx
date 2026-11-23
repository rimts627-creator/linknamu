import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 푸른 그림자로 살짝 떠 있는 듯한 입체감 */}
      <div className="rounded-full bg-gradient-to-b from-white to-white/40 p-1 shadow-[0_18px_40px_-14px_rgba(70,92,150,0.45),0_2px_6px_rgba(40,55,90,0.08)] dark:from-white/25 dark:to-white/5 dark:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)]">
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={112}
          height={112}
          priority
          className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
        />
      </div>
      <h1 className="mt-6 text-[1.375rem] font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-[18rem] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
        {profile.bio}
      </p>
    </header>
  );
}

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  icon: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
};

// TODO: 보여주기용 더미 값입니다. 실제 이름·소개·사진으로 교체하세요.
export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  image: "/profile.svg",
};

// TODO: 보여주기용 더미 링크입니다. 실제 주소로 교체하세요.
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com", icon: "💻" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com", icon: "💼" },
  { id: "blog", title: "Blog", url: "https://velog.io", icon: "✍️" },
];

export const linkIds = new Set(links.map((link) => link.id));

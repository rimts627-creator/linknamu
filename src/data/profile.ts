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

export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "/github.png",
};

// TODO: 보여주기용 더미 링크입니다. 실제 주소로 교체하세요.
export const links: LinkItem[] = [
  { id: "github", title: "깃허브", url: "https://github.com/rimts627-creator/", icon: "🐙" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com", icon: "💼" },
  { id: "blog", title: "Blog", url: "https://velog.io", icon: "✍️" },
];

export const linkIds = new Set(links.map((link) => link.id));

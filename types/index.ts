export type ProjectStatus = "live" | "in-progress" | "open-source" | "archived";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  stack: string[];
  github?: string;
  live?: string;
  status: ProjectStatus;
  featured: boolean;
  year: string;
  highlights?: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  current?: boolean;
  website?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface Community {
  name: string;
  role: string;
  description: string;
  type: "ambassador" | "expert" | "community";
  url?: string;
}

export interface Achievement {
  title: string;
  context: string;
  year: string;
  highlight?: boolean;
}

export interface Involvement {
  title: string;
  description: string;
}

export type PostCategory =
  | "fintech"
  | "engineering"
  | "ai"
  | "career"
  | "open-source";

export interface PostMeta {
  title: string;
  excerpt: string;
  date: string;
  category: PostCategory;
  tags: string[];
  published: boolean;
}

export interface PostSummary {
  slug: string;
  meta: PostMeta;
  readingMinutes: number;
}

export interface PostDetail extends PostSummary {
  raw: string;
  related: PostSummary[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  updatedAt: string;
  pushedAt: string;
  language: { name: string; color: string } | null;
  archived: boolean;
}

export interface GithubPinnedRepo {
  name: string;
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  language: { name: string; color: string } | null;
}

export interface GithubStats {
  login: string;
  name: string;
  avatarUrl: string;
  url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  totalContributions: number;
  contributionCalendar: ContributionDay[];
  repositories: GithubRepo[];
  pinned: GithubPinnedRepo[];
  languages: { name: string; color: string | null; percentage: number }[];
  accountCreatedAt: string;
}

export interface BlogComment {
  id: string;
  post_slug: string;
  name: string;
  message: string;
  created_at: string;
  likes: number;
  liked_by: string[];
}

export interface BlogCommentInsert {
  post_slug: string;
  name: string;
  message: string;
}

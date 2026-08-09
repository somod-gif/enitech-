export const SITE = {
  name: "Eniola.dev",
  author: "Badmus Samad Eniola",
  title: "Badmus Samad Eniola — Software Engineer",
  role: "Software Engineer",
  subtitle:
    "Building scalable fintech systems, AI-powered products, developer tools, and modern SaaS applications.",
  description:
    "Software engineer building scalable fintech systems, AI-powered products, developer tools, and modern SaaS applications. Available for internships, freelance work, startup collaborations, and junior software engineering roles.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
  email: "eniolabadmus351@gmail.com",
  location: "Nigeria",
  availability:
    "Available for internships, freelance work, startup collaborations, and junior software engineering roles.",
  github: "somod-gif",
  githubUrl: "https://github.com/somod-gif",
  linkedinUrl: "https://linkedin.com/in/badmus-eniola001",
  twitterUrl: "https://x.com/BadmusEniola07",
  twitterHandle: "@BadmusEniola07",
  resume: "/resume.pdf",
  keywords: [
    "Badmus Samad Eniola",
    "Software Engineer",
    "Fintech Engineer",
    "Full Stack Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Java Spring Boot",
    "NestJS",
    "Nigeria Developer",
  ],
} as const;

export const THEME_STORAGE_KEY = "enitech-theme";

export const GITHUB = {
  username: SITE.github,
  token: process.env.GITHUB_TOKEN ?? "",
} as const;

export const SUPABASE = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

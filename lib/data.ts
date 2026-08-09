import {
  Award,
  GitBranch,
  Trophy,
  Users,
  Workflow,
  CodeXml,
  Mic,
  BookOpen,
  FileText,
  Globe,
  ChevronRight,
  Building2,
  Github,
  Linkedin,
  Twitter,
  Mail,
  PenTool,
  Youtube,
  Clock,
  MousePointerClick,
  Moon,
  Activity,
  CalendarDays,
  ExternalLink,
  MapPin,
  Calendar,
  Heart,
  MessageCircle,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export type SkillGroup = {
  category: string;
  icon: LucideIcon;
  skills: string[];
};

export const hero = {
  firstName: "Samad",
  lastName: "Eniola",
  footnote:
    '[1] "A software engineer who builds scalable web, mobile, and enterprise systems — from idea to deployment, with clean architecture and reliable infrastructure."',
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Platform & DevOps",
    icon: Workflow,
    skills: ["Docker", "Oracle Cloud", "AWS", "Vercel", "CI/CD", "Linux"],
  },
  {
    category: "Software Engineering",
    icon: GitBranch,
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Node.js",
      "PHP",
      "Java",
    ],
  },
  {
    category: "Developer Relations",
    icon: Mic,
    skills: [
      "Community Building",
      "Collaboration",
      "Technical Writing",
      "Developer Experience (DX)",
    ],
  },
];

export type Experience = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

// TODO: Confirm the employment periods below.
export const experiences: Experience[] = [
  {
    title: "Software Engineer",
    company: "Ashlab Technologies",
    period: "2023 – 2024",
    bullets: [
      "Built scalable applications using Vue.js and Laravel, shipping production web and mobile systems for enterprise clients.",
      "Designed RESTful APIs and structured backend systems with clean, maintainable architecture.",
      "Implemented authentication and role-based access control workflows across client products.",
      "Optimized database performance and application architecture for high-traffic workloads.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Quodel Technologies",
    period: "2024 – 2025",
    bullets: [
      "Developed scalable web platforms from requirements through to deployment.",
      "Architected backend systems and APIs powering client-facing products.",
      "Built responsive UI systems and admin dashboards with consistent design systems.",
      "Implemented secure authentication workflows and contributed to solution design and consultation.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Techera",
    period: "2025 – Present",
    bullets: [
      "Developed cloud-native applications using Next.js, TypeScript, and TailwindCSS.",
      "Managed deployments on Oracle Cloud Infrastructure (OCI) and automated release pipelines.",
      "Implemented CI/CD pipelines to ship features faster and more reliably.",
      "Built scalable frontend systems and dashboards, optimizing performance for enterprise applications.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  github: string | null;
  demo: string | null;
};

export const projects: Project[] = [
  {
    title: "Dhaat Hub",
    description:
      "An integrated Islamic services platform providing authentic knowledge, ethical services, and community development. Multi-service platform covering Arabic classes, wears, and logistics, with WhatsApp and Telegram integration, an e-commerce system with payments, and an admin dashboard for content management.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Shadcn/ui", "Vercel", "WhatsApp API"],
    github: null,
    demo: "https://dhaathub.vercel.app",
  },
  {
    title: "59Minutes Prints",
    description:
      "A print-on-demand platform for efficient browsing and checkout. Features dynamic product rendering, an optimized UX for faster purchasing decisions, a custom product customization interface, and a multi-step checkout system.",
    technologies: ["Next.js", "TailwindCSS", "JSON APIs", "Vercel"],
    github: null,
    demo: "https://59minutesprint.com",
  },
  {
    title: "Meu Deliver",
    description:
      "A nationwide delivery platform for food, groceries, and packages. Built with a scalable UI architecture, interactive dashboards, real-time tracking interfaces, and a multi-vendor management system.",
    technologies: ["Next.js", "TailwindCSS", "Firebase", "PostgreSQL", "REST APIs"],
    github: null,
    demo: "https://www.meudeliver.com",
  },
  {
    title: "Accessivo",
    description:
      "An enterprise-grade fintech platform with secure dashboards and API-driven views. Includes role-based dashboard components, real-time API integrations, data visualization interfaces, and an enterprise authentication system.",
    technologies: ["React", "TailwindCSS", "REST APIs", "PostgreSQL"],
    github: null,
    demo: "https://accessivo.io",
  },
  {
    title: "CartWave",
    description:
      "A SaaS e-commerce platform for businesses with persistent cart state management, multi-step checkout optimization, an admin dashboard interface, and a product management system. Reduced store setup time by 70%.",
    technologies: ["Next.js", "TailwindCSS", "PostgreSQL", "Spring Boot", "REST APIs"],
    github: null,
    demo: "https://cartwave.vercel.app",
  },
  {
    title: "Water Groove",
    description:
      "An investment platform connecting investors to sustainable projects. Features an investment dashboard and portfolio system, modern brand-aligned UI, performance optimization, and an interactive project showcase.",
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "PostgreSQL", "Auth0"],
    github: null,
    demo: "https://www.watergrooveinvestment.com",
  },
];

export type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
  description: string;
};

// Hardcoded follower counts are static; update them when needed.
export const externalStats: Stat[] = [
  {
    label: "GitHub Public Repos",
    value: "...", // filled from the GitHub API
    icon: Github,
    description: "Open source projects, libraries, and lab experiments.",
  },
  {
    label: "GitHub Followers",
    value: "...", // filled from the GitHub API
    icon: Users,
    description: "Developers following my technical journey.",
  },
  {
    label: "LinkedIn Followers",
    value: "500+", // TODO: update
    icon: Linkedin,
    description: "Professionals following my technical insights and articles.",
  },
  {
    label: "X (Twitter) Followers",
    value: "250+", // TODO: update
    icon: Twitter,
    description: "Developers following my open source and engineering updates.",
  },
  {
    label: "Core Focus",
    value: "JS & TS",
    icon: CodeXml,
    description: "Primary languages for current full-stack development tasks.",
  },
  {
    label: "Active Deployments",
    value: "6",
    icon: Activity,
    description: "Live projects running in production.",
  },
];

export const localStats: Stat[] = [
  {
    label: "Session Time",
    value: "0 min",
    icon: Clock,
    description: "Time you've spent exploring this portfolio.",
  },
  {
    label: "Interactions",
    value: "0",
    icon: MousePointerClick,
    description: "Total clicks and navigation actions recorded locally.",
  },
  {
    label: "Theme Preference",
    value: "System",
    icon: Moon,
    description: "Your currently active UI theme setting.",
  },
];

export type Recognition = {
  title: string;
  category: string;
  icon: LucideIcon;
  link?: string;
};

export const recognitions: Recognition[] = [
  {
    title: "GitHub Developer Program Member",
    category: "Open Source & GitHub",
    icon: Award,
    link: "https://github.com/somod-gif",
  },
  {
    title: "Pull Shark Achievement ×2",
    category: "Open Source Contribution",
    icon: GitBranch,
  },
  {
    title: "YOLO Achievement",
    category: "First Pull Request Merged",
    icon: Trophy,
  },
  {
    title: "70+ Public Repositories",
    category: "Open Source Activity",
    icon: Users,
  },
];

export type LogEntry = {
  date: string;
  type: string;
  title: string;
  context: string;
};

// TODO: Add your speaking engagements, publications, and community roles below.
export const speakingLog: LogEntry[] = [];

export const publications: LogEntry[] = [];

export type Leadership = {
  role: string;
  organization: string;
  description: string;
};

export const leadership: Leadership[] = [
  {
    role: "Contributor",
    organization: "Open Source — GitHub",
    description:
      "Active open source contributor with 70+ repositories spanning web, mobile, and backend projects.",
  },
];

export type Channel = {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
  href: string;
};

export const channels: Channel[] = [
  {
    icon: Mail,
    title: "Email",
    description: "eniolabadmus351@gmail.com",
    action: "Send Email",
    href: "mailto:eniolabadmus351@gmail.com",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "@somod-gif",
    action: "View Code",
    href: "https://github.com/somod-gif",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect professionally",
    action: "Connect",
    href: "https://linkedin.com/in/badmus-eniola",
  },
  {
    icon: Twitter,
    title: "X (Twitter)",
    description: "@BadmusEniola07",
    action: "Follow",
    href: "https://x.com/BadmusEniola07",
  },
  {
    icon: PenTool,
    title: "Dev.to",
    description: "Technical Writing",
    action: "Read Articles",
    href: "https://dev.to/somod-gif",
  },
  {
    icon: BookOpen,
    title: "Medium",
    description: "Tech Thoughts",
    action: "Read Posts",
    href: "https://medium.com/@eniolabadmus351",
  },
  {
    icon: Youtube,
    title: "YouTube",
    description: "Video Tutorials",
    action: "Watch",
    href: "https://www.youtube.com",
  },
];

export const footerSocials = [
  {
    icon: Github,
    title: "GitHub",
    href: "https://github.com/somod-gif",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    href: "https://linkedin.com/in/badmus-eniola",
  },
  {
    icon: Twitter,
    title: "X (Twitter)",
    href: "https://x.com/BadmusEniola07",
  },
  {
    icon: Mail,
    title: "Email",
    href: "mailto:eniolabadmus351@gmail.com",
  },
];

export const aboutIcons = {
  download: FileText,
  independent: Globe,
  company: Building2,
  bullet: ChevronRight,
  date: CalendarDays,
  external: ExternalLink,
  heart: Heart,
  message: MessageCircle,
  newspaper: Newspaper,
  pin: MapPin,
  calendar: Calendar,
  award: Award,
  mic: Mic,
  users: Users,
};

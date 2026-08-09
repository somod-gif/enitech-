import type {
  Achievement,
  Community,
  Experience,
  Involvement,
  Project,
  SkillCategory,
} from "@/types";

export const HERO_ROLES = [
  "Full Stack Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Fintech Engineer",
  "Startup Founder",
  "Open Source Contributor",
];

export const HERO_INTRO_FIRST = "Building the systems";
export const HERO_INTRO_SECOND = "that move money, product, and people";

export const SKILL_GROUPS: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces that feel effortless and ship fast.",
    icon: "layout",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "React Native",
      "Expo",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs, services and systems that stay reliable under load.",
    icon: "server",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "Java",
      "Spring Boot",
      "Spring",
      "REST APIs",
      "JWT",
      "Microservices",
    ],
  },
  {
    id: "database",
    label: "Database",
    description: "Modeling, querying and scaling the source of truth.",
    icon: "database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    description: "Shipping, monitoring and operating in production.",
    icon: "cloud",
    skills: [
      "AWS",
      "Oracle Cloud",
      "Digital Ocean",
      "Docker",
      "Git",
      "GitHub",
      "Vercel",
      "Firebase",
      "Supabase",
    ],
  },
  {
    id: "relations",
    label: "Developer Relations",
    description: "Teaching, writing and growing communities around the tools we build.",
    icon: "megaphone",
    skills: [
      "Community Building",
      "Technical Writing",
      "Public Speaking",
      "Developer Experience (DX)",
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Carticom",
    role: "Software Engineer",
    period: "May 2026 — Present",
    summary:
      "Designed and developed a multi-tenant AI-powered commerce platform using Java Spring Boot, Next.js, PostgreSQL, and Redis. Implemented secure payment workflows, escrow transactions, role-based access control (RBAC), and third-party payment integrations with Paystack and Flutterwave. Built scalable backend APIs and responsive frontend applications while collaborating on system architecture, testing, deployments, and continuous platform improvements.",
    stack: [
      "Java Spring Boot",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Escrow",
      "RBAC",
      "Paystack",
      "Flutterwave",
    ],
    current: true,
    website: "#",
  },
  {
    company: "Accessivo",
    role: "Frontend Engineer",
    period: "Aug 2025 — Jan 2026",
    summary:
      "Built responsive and accessible user interfaces using React, Next.js, TypeScript, and Tailwind CSS with reusable component architecture. Integrated REST APIs, optimized state management, and improved application performance for scalable fintech products. Collaborated with designers and backend engineers to deliver new features, resolve bugs, and maintain a high-quality codebase.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "State management",
    ],
  },
  {
    company: "Meu Deliver",
    role: "Software Developer",
    period: "Jun 2025 — Dec 2025",
    summary:
      "Developed scalable backend services with NestJS and PostgreSQL, implementing REST APIs for authentication, orders, delivery, and user management. Built responsive frontend applications with Next.js and TypeScript, delivering seamless experiences for customers, vendors, and riders. Collaborated with product, design, and engineering teams to deliver new features, optimize database performance, and improve application reliability.",
    stack: [
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "TypeScript",
      "REST APIs",
      "Authentication",
    ],
  },
  {
    company: "59Minutes Print",
    role: "Software Engineer",
    period: "Jan 2025 — Dec 2025",
    summary:
      "Developed and maintained responsive frontend features and reusable UI components, improving user experience and application performance. Built backend APIs for product ordering, vendor management, authentication, and business operations using modern web technologies. Collaborated with cross-functional teams on feature development, debugging, deployments, code reviews, and technical documentation.",
    stack: [
      "Frontend",
      "Backend APIs",
      "Product ordering",
      "Vendor management",
      "Authentication",
    ],
  },
  {
    company: "BanffPay Limited",
    role: "Backend Engineering Intern",
    period: "May 2026 — Nov 2026",
    summary:
      "Collaborated with senior backend engineers to develop and maintain Java Spring Boot microservices, contributing to scalable fintech payment infrastructure. Integrated and tested third-party payment APIs, verified REST endpoints with Postman, and participated in debugging and validating secure transaction workflows. Worked within an enterprise microservices architecture, implementing backend features, API integrations, and following software engineering best practices for financial systems.",
    stack: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Payment APIs",
      "REST endpoints",
      "Fintech infrastructure",
    ],
    website: "https://banffpay.com",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "carticom",
    title: "Carticom",
    tagline: "AI commerce platform",
    description:
      "A multi-tenant commerce platform pairing AI discovery with secure escrow-powered payments. Built to make buying and selling online safer and smarter.",
    image: "/projects/carticom.svg",
    stack: [
      "Java Spring Boot",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Escrow",
      "Payments",
    ],
    github: "https://github.com/somod-gif/carticom",
    live: "#",
    status: "in-progress",
    featured: true,
    year: "2024",
    highlights: [
      "Multi-tenant architecture",
      "AI-powered product discovery",
      "Escrow-backed payments",
    ],
  },
  {
    slug: "agentpay",
    title: "AgentPay",
    tagline: "Agent banking network",
    description:
      "Agent banking infrastructure that connects agents, merchants and banks on a single payments rail — settlement, reconciliation, the works.",
    image: "/projects/agentpay.svg",
    stack: ["Next.js", "Full Stack", "Monnify API", "Gemini AI"],
    github: "https://github.com/somod-gif/agentpay",
    live: "#",
    status: "in-progress",
    featured: true,
    year: "2025",
    highlights: ["Agent settlement flows", "Bank-grade reconciliation", "Microservice architecture"],
  },
  {
    slug: "opportunity-ai",
    title: "Opportunity AI",
    tagline: "AI-powered opportunity discovery",
    description:
      "An AI engine that scans grants, internships, hackathons and open roles, then ranks them against your profile — deadlines, match scores and application signals in one place.",
    image: "/projects/opportunity-ai.svg",
    stack: ["Next.js", "OpenAI", "TypeScript", "PostgreSQL"],
    github: "https://github.com/somod-gif/opportunity-ai",
    live: "#",
    status: "in-progress",
    featured: false,
    year: "2026",
    highlights: ["AI match scoring", "Deadline tracking", "Personalized rankings"],
  },
  {
    slug: "meu-deliver",
    title: "Meu Deliver",
    tagline: "Delivery platform",
    description:
      "An on-demand delivery platform with order management, live tracking flows and role-based access for riders, vendors and customers.",
    image: "/projects/meu-deliver.svg",
    stack: ["NestJS", "Next.js", "PostgreSQL", "TypeScript", "JWT"],
    github: "https://github.com/somod-gif/meu-deliver",
    live: "#",
    status: "live",
    featured: false,
    year: "2024",
    highlights: ["Order management", "Vendor ecosystem", "RBAC"],
  },
  {
    slug: "mama-connect",
    title: "MamaConnect",
    tagline: "Social commerce for small traders",
    description:
      "A community commerce app that helps everyday traders list, sell and get paid — mobile-first, offline-friendly, and dead simple.",
    image: "/projects/mama-connect.svg",
    stack: ["React Native", "Expo", "Express", "MongoDB"],
    github: "https://github.com/somod-gif/mama-connect",
    live: "#",
    status: "open-source",
    featured: false,
    year: "2024",
  },
  {
    slug: "inventory-saas",
    title: "Inventory SaaS",
    tagline: "Inventory management, as a service",
    description:
      "A tenant-scoped inventory SaaS with products, stock levels, low-stock alerts and CSV exports — the boring stuff, done extremely well.",
    image: "/projects/inventory.svg",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Tailwind"],
    github: "https://github.com/somod-gif/inventory-saas",
    live: "#",
    status: "open-source",
    featured: false,
    year: "2023",
  },
  {
    slug: "pdf-editor",
    title: "PDF Editor",
    tagline: "Docs you can edit in the browser",
    description:
      "A browser-native PDF editor with text overlays, signing and layout control. No upload, no dependencies, no nonsense.",
    image: "/projects/pdf-editor.svg",
    stack: ["React", "React PDF", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/somod-gif/pdf-editor",
    live: "#",
    status: "open-source",
    featured: false,
    year: "2023",
  },
  {
    slug: "rate-limiter-saas",
    title: "RateLimiter SaaS",
    tagline: "Rate limiting as an API",
    description:
      "A drop-in rate-limiting service with Redis-backed token buckets and per-key analytics — the piece every developer has re-built.",
    image: "/projects/rate-limiter.svg",
    stack: ["NestJS", "Redis", "Docker", "TypeScript"],
    github: "https://github.com/somod-gif/rate-limiter-saas",
    live: "#",
    status: "archived",
    featured: false,
    year: "2023",
  },
];

export const COMMUNITIES: Community[] = [
  {
    name: "Postman",
    role: "Student Expert",
    description:
      "Teaching students and developers how to design and test APIs with Postman.",
    type: "expert",
    url: "https://www.postman.com",
  },
  {
    name: "Cowrywise",
    role: "Campus Ambassador",
    description:
      "Championing financial literacy and savings culture on campus.",
    type: "ambassador",
    url: "https://cowrywise.com",
  },
  {
    name: "Google Developer Groups",
    role: "Member",
    description:
      "Part of the GDG community — workshops, hackathons and developer knowledge sharing.",
    type: "community",
    url: "https://developers.google.com/community/gdg",
  },
  {
    name: "Microsoft Learn Student Ambassadors",
    role: "Community Member",
    description:
      "Learning, teaching and building with Microsoft technologies alongside peers.",
    type: "community",
    url: "https://mvp.microsoft.com/studentambassadors",
  },
  {
    name: "AWS Community",
    role: "Member",
    description:
      "Exploring cloud architecture and serverless patterns with the AWS community.",
    type: "community",
    url: "https://aws.amazon.com/developer/community",
  },
  {
    name: "GitHub Community",
    role: "Member & Contributor",
    description:
      "Open source contributes, PRs, issue triage, and never-ending curiosity.",
    type: "community",
    url: "https://github.com",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "HelpMum CareCode Finalist",
    context:
      "Reached the finals of a national healthcare-tech build challenge, shipping a working product under deadline pressure.",
    year: "2024",
    highlight: true,
  },
  {
    title: "Startup Bridge — Stage 2",
    context:
      "Advanced to stage two of a structured startup program while building Carticom.",
    year: "2024",
    highlight: true,
  },
  {
    title: "Hackathon Builder",
    context:
      "Built and demoed products across multiple hackathons — rapid prototyping on unfamiliar stacks counts as home turf.",
    year: "2023 — Present",
  },
  {
    title: "Technical Workshops",
    context:
      "Taught API design, Git workflows and web fundamentals to students and community members.",
    year: "2023 — Present",
  },
];

export const INVOLVEMENT: Involvement[] = [
  {
    title: "Hackathons",
    description:
      "Prototype-fast, ship-faster competitor. I've built for edtech, healthtech and fintech challenges.",
  },
  {
    title: "Open Source",
    description:
      "Contributing to projects I use, filing good issues, and maintaining open-source tools from this site.",
  },
  {
    title: "Speaking",
    description:
      "Workshops and lightning talks on building APIs, getting your first engineering job, and shipping side projects.",
  },
  {
    title: "Mentoring",
    description:
      "Helping juniors transition into engineering careers — resume reviews, mock interviews, code buddies.",
  },
  {
    title: "Campus Leadership",
    description:
      "Growing developer ecosystems on campus through communities, clubs and hands-on learning.",
  },
];

export const OPEN_SOURCE_PROJECTS = PROJECTS.filter((p) => p.status === "open-source");

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
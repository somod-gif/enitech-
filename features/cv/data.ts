export type CvExperience = {
  id: string;
  company: string;
  role: string;
  dates: string;
  tech: string;
  bullets: string[];
};

export type CvProject = {
  id: string;
  name: string;
  link: string;
  dates: string;
  description: string;
  bullets: string[];
};

export type CvEducation = {
  id: string;
  school: string;
  degree: string;
  dates: string;
  bullets: string[];
};

export type CvData = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string[];
  experience: CvExperience[];
  projects: CvProject[];
  education: CvEducation[];
  skills: { group: string; items: string }[];
};

export const CV_STORAGE_KEY = "enitech-cv-v1";

export function createId() {
  return Math.random().toString(36).slice(2, 10);
}

export function defaultCvData(): CvData {
  return {
    name: "Badmus Samad Eniola",
    role: "Software Engineer",
    email: "eniolabadmus351@gmail.com",
    phone: "+234 814 643 8621",
    location: "Nigeria",
    website: "badmuseniola.vercel.app",
    github: "github.com/somod-gif",
    linkedin: "linkedin.com/in/badmus-eniola001",
    summary: [
      "Software Engineer with experience building scalable frontend and backend applications using React, Next.js, TypeScript, Node.js, NestJS, Java Spring Boot, and PostgreSQL.",
      "Experienced in developing REST APIs, payment integrations, enterprise microservices, and full-stack web applications across fintech, SaaS, and e-commerce platforms.",
      "Passionate about writing clean, maintainable code, solving complex engineering problems, and building reliable software that delivers real business impact while continuously learning and collaborating in high-performing engineering teams.",
    ],
    experience: [
      {
        id: "59minutes-print",
        company: "59Minutes Print",
        role: "Software Engineer",
        dates: "Jan 2025 – Dec 2025",
        tech: "React, Next.js, TypeScript, Node.js, PostgreSQL",
        bullets: [
          "Developed and maintained responsive frontend features and reusable UI components, improving user experience and application performance.",
          "Built backend APIs for product ordering, vendor management, authentication, and business operations using modern web technologies.",
          "Collaborated with cross-functional teams on feature development, debugging, deployments, code reviews, and technical documentation.",
        ],
      },
      {
        id: "accessivo",
        company: "Accessivo",
        role: "Frontend Engineer",
        dates: "Aug 2025 – Jan 2026",
        tech: "React, Next.js, TypeScript, Tailwind CSS",
        bullets: [
          "Built responsive and accessible user interfaces using React, Next.js, TypeScript, and Tailwind CSS with a reusable component architecture.",
          "Integrated REST APIs, optimized state management, and improved application performance for scalable fintech products.",
          "Collaborated with designers and backend engineers to deliver new features, resolve bugs, and maintain a high-quality codebase.",
        ],
      },
      {
        id: "meu-deliver",
        company: "Meu Deliver",
        role: "Software Developer",
        dates: "Jun 2025 – Dec 2025",
        tech: "NestJS, PostgreSQL, Next.js, TypeScript",
        bullets: [
          "Developed scalable backend services with NestJS and PostgreSQL, implementing REST APIs for authentication, orders, delivery, and user management.",
          "Built responsive frontend applications with Next.js and TypeScript, delivering seamless experiences for customers, vendors, and riders.",
          "Collaborated with product, design, and engineering teams to deliver new features, optimize database performance, and improve application reliability.",
        ],
      },
      {
        id: "carticom",
        company: "Carticom",
        role: "Software Engineer",
        dates: "May 2026 – Present",
        tech: "Java Spring Boot, Next.js, PostgreSQL, Redis, Paystack, Flutterwave",
        bullets: [
          "Designed and developed a multi-tenant AI-powered commerce platform using Java Spring Boot, Next.js, PostgreSQL, and Redis.",
          "Implemented secure payment workflows, escrow transactions, role-based access control (RBAC), and third-party payment integrations with Paystack and Flutterwave.",
          "Built scalable backend APIs and responsive frontend applications while collaborating on system architecture, testing, deployments, and continuous platform improvements.",
        ],
      },
      {
        id: "banffpay",
        company: "BanffPay Limited",
        role: "Backend Engineering Intern",
        dates: "May 2026 – Nov 2026",
        tech: "Java, Spring Boot, Microservices, PostgreSQL",
        bullets: [
          "Collaborated with senior backend engineers to develop and maintain Java Spring Boot microservices, contributing to scalable fintech payment infrastructure.",
          "Integrated and tested third-party payment APIs, verified REST endpoints with Postman, and participated in debugging and validating secure transaction workflows.",
          "Worked within an enterprise microservices architecture, implementing backend features, API integrations, and following software engineering best practices for financial systems.",
        ],
      },
    ],
    projects: [],
    education: [
      {
        id: "futminna",
        school: "Federal University of Technology Minna",
        degree: "B.Tech Information Technology",
        dates: "2023 – Present",
        bullets: [],
      },
    ],
    skills: [
      {
        group: "Programming Languages",
        items: "Java, JavaScript, TypeScript, PHP",
      },
      {
        group: "Frontend",
        items: "React, Next.js, React Native, Expo, HTML5, CSS3, Tailwind CSS",
      },
      {
        group: "Backend",
        items: "Node.js, Express.js, NestJS, Spring Boot, REST APIs, JWT Authentication",
      },
      {
        group: "Databases",
        items: "PostgreSQL, MySQL, Redis, Firebase Firestore, Supabase",
      },
      {
        group: "Cloud & DevOps",
        items: "Git, GitHub, Docker, Postman, AWS, Azure, Oracle Cloud, Vercel, Render",
      },
      {
        group: "Architecture & Engineering",
        items: "Microservices, API Integration, Authentication & Authorization (JWT/RBAC), AI Integration",
      },
      {
        group: "Testing",
        items: "Jest, JUnit, Postman",
      },
      {
        group: "Methodologies",
        items: "Agile, Scrum",
      },
      {
        group: "Concepts",
        items: "Object-Oriented Programming (OOP), SOLID Principles, ACID Transactions, Design Patterns",
      },
    ],
  };
}
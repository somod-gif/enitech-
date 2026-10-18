export const SITE = {
  name: "Enitech",
  author: "Enitech",
  title: "ENITECH — Engineering Studio & Business Software Solutions",
  role: "Engineering Studio",
  subtitle:
    "Custom business software, inventory systems, e-commerce stores, AI automations and web applications — for businesses, founders and agencies.",
  description:
    "ENITECH is a full-stack engineering studio building business management software, inventory and sales systems, e-commerce stores, AI automations and mobile apps for businesses in Nigeria and worldwide. Projects from ₦50,000.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://enitech.vercel.app",
  email: "eniolabadmus351@gmail.com",
  location: "Nigeria · Serving clients worldwide",
  availability: "Booking projects for October & November 2026.",
  github: "somod-gif",
  githubUrl: "https://github.com/somod-gif",
  linkedinUrl: "https://linkedin.com/in/badmus-eniola001",
  twitterUrl: "https://x.com/BadmusEniola07",
  twitterHandle: "@BadmusEniola07",
  keywords: [
    "Enitech",
    "Software engineering studio Nigeria",
    "Custom business software",
    "Business website Nigeria",
    "E-commerce development",
    "Inventory management system",
    "AI automation",
    "WhatsApp automation",
    "Agency white-label development",
    "Mobile app development",
    "School management platform",
  ],
} as const;

export const THEME_STORAGE_KEY = "enitech-theme";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/demos", label: "Demos" },
  { href: "/contact", label: "Contact" },
] as const;

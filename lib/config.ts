export const SITE = {
  name: "Enitech",
  author: "Enitech",
  title: "Enitech — Websites, Booking & Call Management Systems",
  role: "Web & Smart Systems Studio",
  subtitle:
    "Websites, online booking systems, and call & lead management for small businesses — live in days, not months.",
  description:
    "Enitech builds fast, modern websites, booking systems, and call-management systems for businesses in Nigeria and worldwide. Fixed pricing from ₦50,000. 50% deposit to start.",
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
    "Web design Nigeria",
    "Business websites",
    "Booking system",
    "Appointment scheduling software",
    "Call management system",
    "Lead management CRM",
    "WhatsApp automation",
  ],
} as const;

export const THEME_STORAGE_KEY = "enitech-theme";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/demos", label: "Demos" },
  { href: "/contact", label: "Contact" },
] as const;

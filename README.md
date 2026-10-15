# Enitech — Websites, Booking & Call Management Systems

Official site for **Enitech**, a web & smart-systems studio building fast, modern websites, online booking systems, and call/lead management systems for small businesses in Nigeria and worldwide. Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, Framer Motion and shadcn/ui-style components.

> Looking for Badmus's personal engineering portfolio? It lives separately at [eniola.dev](https://eniola.dev).

## Pages

| Route | What's there |
| --- | --- |
| `/` | Studio homepage — offers, industries, process, CTA |
| `/services` | Service packages & fixed pricing — websites, booking systems, call-management systems from ₦50,000 |
| `/demos` | Industry demo gallery — salons, clinics, gyms, hotels, real estate & more |
| `/contact` | Resend-powered contact form + direct email links |

SEO: generated metadata + JSON-LD (Organization), `sitemap.ts`, `robots.ts`, `manifest.ts`, dynamic OpenGraph image, theme-color viewport.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first config), `@tailwindcss/typography`
- **Motion/UI:** Framer Motion, Radix UI primitives, sonner toasts, next-themes (dark/light)
- **Forms:** Resend (server-side, via `/api/contact`)

## Getting started

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Used for | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG images | No (defaults to `https://enitech.vercel.app`) |
| `RESEND_API_KEY` | Contact form (server-side, via `/api/contact`) | No |
| `CONTACT_FROM_EMAIL` | Contact form sender address | No (defaults to `onboarding@resend.dev`) |

## Scripts

```
npm run dev       # dev server (Turbopack)
npm run build     # production build
npm run start     # serve production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## Deploy on Vercel

Push to GitHub and import in Vercel — zero config. Add the env vars in Project Settings → Environment Variables.

## Identity

Enitech — [eniolabadmus351@gmail.com](mailto:eniolabadmus351@gmail.com) · github.com/somod-gif · linkedin.com/in/badmus-eniola001

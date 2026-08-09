# Enitech — Badmus Samad Eniola · Portfolio

Production-ready personal portfolio and blog for a software engineer — fintech, SaaS and developer-tooling focus. Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, Framer Motion and shadcn/ui-style components.

## Pages

| Route           | What's there                                                        |
| --------------- | ------------------------------------------------------------------- |
| `/`             | Hero, skills, experience, featured projects, latest posts, CTA      |
| `/projects`     | All projects, featured + rest, tags, GitHub link                    |
| `/insights`     | GitHub contributions graph (via GraphQL, graceful fallback), stats  |
| `/community`    | Open-source work, speaking, mentoring, campus leadership             |
| `/blog`         | MDX posts, category + tag filter, search, pagination                |
| `/blog/[slug]`  | MDX render, reading time, related posts, Supabase comments + likes  |
| `/contact`      | Resend-powered contact form + direct email links                     |

SEO: generated metadata + JSON-LD (person/article), `sitemap.ts`, `robots.ts`, `feed.xml` RSS, `manifest.ts`, dynamic OpenGraph image, theme-color viewport.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first config), `@tailwindcss/typography`
- **Motion/UI:** Framer Motion, Radix UI primitives, sonner toasts, next-themes (dark/light)
- **Content:** MDX (`@next/mdx`), `gray-matter` for frontmatter + reading time
- **Data:** GitHub GraphQL (insights), Supabase (comments + likes w/ realtime), Resend (contact form)
- **Fonts:** Inter, JetBrains Mono, Instrument Serif via `next/font`

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in optional keys — see below
npm run dev
```

Open http://localhost:3000.

## Environment variables

All optional except `NEXT_PUBLIC_SITE_URL` at build time. The site runs fully without the others (graceful fallbacks).

| Variable                          | Used for                                   | Required |
| --------------------------------- | ------------------------------------------ | -------- |
| `NEXT_PUBLIC_SITE_URL`            | Canonical URLs, sitemap, RSS               | No (defaults to `http://localhost:3000`) |
| `GITHUB_TOKEN`                    | `/insights` — GitHub GraphQL (read-only)   | No       |
| `RESEND_API_KEY`                  | Contact form (server-side, via `/api/contact`) | No   |
| `CONTACT_FROM_EMAIL`              | Contact form sender address                | No (defaults to `onboarding@resend.dev`) |
| `NEXT_PUBLIC_SUPABASE_URL`        | Comments + likes (realtime)                | No       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Comments + likes (realtime)                | No       |

### GitHub insights

Generate a fine-grained personal access token (read-only metadata, public repos) at github.com/settings/personal-access-tokens and set `GITHUB_TOKEN`. Without it, `/insights` shows a graceful offline message.

### Comments (Supabase)

1. Create a free Supabase project.
2. Run `supabase/schema.sql` in the SQL editor (creates `blog_comments`, `blog_likes`, RLS policies, realtime publication).
3. Enable **Realtime** for the `blog_comments` table (Database → Replication).
4. Add `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

### Contact form (Resend)

1. Create an API key at resend.com/api-keys, add `RESEND_API_KEY`.
2. Before verifying a domain you must send from `onboarding@resend.dev` (default). After verifying, set `CONTACT_FROM_EMAIL` to your address and add it as a "Send From" address in Resend.
3. Messages are delivered to `SITE.email` (`lib/config.ts`).

## Content

Blog posts live in `content/posts/*.mdx`. Frontmatter:

```mdx
---
title: Post title
excerpt: One-liner used on cards and meta description
date: 2026-05-12
category: fintech   # fintech | engineering | open-source | ai | career
tags: [nextjs, payments]
published: true    # omit to keep the post invisible
---
```

Projects, skills, experience and community data live in `lib/profile.ts`. Site constants (name, links, nav) in `lib/config.ts`.

## Scripts

```bash
npm run dev       # dev server (Turbopack)
npm run build     # production build
npm run start     # serve production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## Deploy on Vercel

Push to GitHub and import in Vercel — zero config. Add the env vars and `NEXT_PUBLIC_SITE_URL` (no trailing slash) in Project Settings → Environment Variables. Pages that use unauthenticated GitHub data fall back to demo data in production if `GITHUB_TOKEN` is missing.

## Identity

Badmus Samad Eniola — <eniolabadmus351@gmail.com> · github.com/somod-gif · linkedin.com/in/badmus-eniola001
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Rss,
  Twitter,
} from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/config";

const SOCIALS = [
  { label: "GitHub", href: SITE.githubUrl, icon: Github },
  { label: "LinkedIn", href: SITE.linkedinUrl, icon: Linkedin },
  { label: "X / Twitter", href: SITE.twitterUrl, icon: Twitter },
  { label: "Email", href: `mailto:${SITE.email}`, icon: Mail },
  { label: "RSS", href: "/feed.xml", icon: Rss },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t">
      <div className="section-shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="Eniola.dev — home"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-xs font-bold text-background">
                E
              </span>
              <span className="font-mono text-base font-medium">
                eniola<span className="text-primary">.dev</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.role} building {SITE.subtitle.toLowerCase()}
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {SITE.location}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
              </span>
              <span className="text-foreground">
                Available for work
              </span>
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Navigation
            </h2>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Elsewhere
            </h2>
            <ul className="space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <social.icon className="h-4 w-4" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.author}. Built with Next.js,
            Tailwind and a lot of caffeine.
          </p>
          <Link
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            @{SITE.github}
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
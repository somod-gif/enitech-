"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/config";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-24 pb-20">
      <div aria-hidden className="hero-grid absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-foreground/5 blur-[120px]"
      />

      <div className="section-shell relative mx-auto flex max-w-4xl flex-col">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="inline-flex h-px w-8 bg-foreground/30" />
            [ 1 ]
            <span className="inline-flex h-px w-8 bg-foreground/30" />
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display mt-7 text-5xl font-semibold leading-[1.04] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="text-gradient block">Badmus Samad Eniola</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-7 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground"
          >
            [ Software Engineering · Web &amp; Mobile ]
          </motion.div>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            &ldquo;{SITE.subtitle}&rdquo;
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" variant="gradient">
              <Link href="/projects">
                View Work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/insights">
                Read Insights
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-10 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4" />
            {SITE.location} · Open to remote &amp; on-site
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
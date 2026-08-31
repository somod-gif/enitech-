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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-24 pb-20">
      <div aria-hidden className="hero-grid absolute inset-0" />
      <div className="section-shell relative mx-auto flex max-w-4xl flex-col">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Badmus Samad Eniola
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-lg font-medium text-emerald sm:text-xl"
          >
            {SITE.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-1 text-sm text-muted-foreground sm:text-base"
          >
            Web &amp; Mobile Products
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {SITE.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" variant="gradient">
              <Link href="/projects">
                View Work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Get in Touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4" />
            {SITE.location} · Open to remote &amp; on-site
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

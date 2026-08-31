import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/features/hero/hero";
import { Skills } from "@/features/skills/skills";
import { ExperienceTimeline } from "@/features/experience/experience-timeline";
import { ProjectCard } from "@/features/projects/project-card";
import { BlogCard } from "@/features/blog/blog-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { FEATURED_PROJECTS } from "@/lib/profile";
import { getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="pb-24">
      <Hero />

      <Skills />

      <div className="border-y bg-muted/30">
        <ExperienceTimeline />
      </div>

      <section aria-labelledby="featured-projects" className="py-24 sm:py-32">
        <div className="section-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured work"
              title="Projects"
              description="Fintech, AI products, and developer tools — the things I keep coming back to."
            />
            <Reveal delay={0.2} className="shrink-0">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/projects">
                  All projects
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {FEATURED_PROJECTS.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="latest-writing" className="border-t py-24 sm:py-32">
        <div className="section-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Writing"
              title="Blog"
              description="Notes on engineering, fintech, and lessons from shipping real products."
            />
            <Reveal delay={0.2} className="shrink-0">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/blog">
                  All posts
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cta" className="py-24">
        <div className="section-shell">
          <Reveal>
            <div className="rounded-2xl border bg-card px-6 py-16 text-center shadow-sm sm:px-16 sm:py-20">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald">
                Let&apos;s work together
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Available for roles, freelance &amp; collaborations
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                Open to junior software engineering positions, internships, and startup collaborations.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" variant="gradient">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/projects">See My Work</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

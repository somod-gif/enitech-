import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

      <div className="mx-auto max-w-2xl border-y px-6 py-10 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Currently
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Software Engineer at Carticom · Building fintech, SaaS & AI
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                </span>
                Open to new opportunities
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4"
              >
                Let&apos;s talk <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <Skills />

      <div className="border-y bg-muted/30">
        <ExperienceTimeline />
      </div>

      <section aria-labelledby="featured-projects" className="py-24 sm:py-32">
        <div className="section-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured work"
              title="Projects I'm building"
              description="Fintech infrastructure, AI products and tools — the things I keep coming back to."
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
              title="Notes from the build"
              description="Fintech, engineering practice, and lessons from shipping real products."
            />
            <Reveal delay={0.2} className="shrink-0">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/blog">
                  Read the blog
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
            <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center shadow-sm sm:px-16 sm:py-24">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-foreground/5 blur-[100px]"
              />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                  Building in public
                </p>
                <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl md:text-5xl">
                  Let&apos;s build the next thing that{" "}
                  <span className="text-gradient">moves money</span> — or
                  something entirely new
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {`Available for internships, freelance work, startup collaborations and junior software engineering roles.`}
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <Button asChild size="lg" variant="gradient">
                    <Link href="/contact">Start a conversation</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/community">See what I&apos;m part of</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
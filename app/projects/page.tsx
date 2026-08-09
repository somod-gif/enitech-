import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WorkFilters } from "@/features/projects/work-filters";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Fintech platforms, SaaS tools, delivery systems and AI products built by Badmus Samad Eniola.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Work"
          title="Things I've built"
          description="A collection of fintech rails, SaaS products, delivery platforms and developer tools — each one a lesson in what survives production."
        />

        <div className="mt-14">
          <WorkFilters projects={PROJECTS} />

          <Reveal>
            <div className="glass mt-14 flex flex-col items-center gap-4 rounded-2xl border p-8 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <p className="font-display-sm font-semibold">
                  Want to see the code up close?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Every repository is public on GitHub — issue, PR or discussion
                  is welcome.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {["fintech", "saas", "ai", "open-source"].map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background",
                    )}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href="https://github.com/somod-gif?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                github.com/somod-gif
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
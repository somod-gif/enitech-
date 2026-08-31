import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";

export function ExperienceTimeline() {
  return (
    <section aria-labelledby="experience" className="py-24 sm:py-32">
      <div className="section-shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked"
            description="The teams and projects that shaped how I build software."
          />
          <Reveal delay={0.2} className="shrink-0">
            <Link
              href="https://www.linkedin.com/in/badmus-eniola001"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              Full history on LinkedIn
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <ol className="relative mt-14 space-y-8 border-l border-border/70 pl-6 sm:pl-10" aria-label="Career timeline">
          {EXPERIENCE.map((exp, index) => (
            <Reveal key={`${exp.company}-${exp.role}`} delay={Math.min(index * 0.06, 0.3)}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-1.5 grid h-3.5 w-3.5 place-items-center sm:-left-[43px]"
                >
                  <span className="relative h-2 w-2 rounded-full bg-muted-foreground" />
                </span>

                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold">
                          {exp.role}
                          <span className="text-muted-foreground"> · {exp.company}</span>
                        </h3>
                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                    {exp.current ? (
                      <Badge variant="success" className="gap-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald" />
                        Current
                      </Badge>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {exp.summary}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${exp.company} stack`}>
                    {exp.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

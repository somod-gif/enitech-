"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types";
import { ProjectCard } from "@/features/projects/project-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function WorkFilters({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");

  const tags = useMemo(() => {
    const unique = new Set<string>();
    projects.forEach((project) =>
      project.stack.forEach((tech) => unique.add(tech)),
    );
    return ["All", ...Array.from(unique).sort()];
  }, [projects]);

  const visible =
    active === "All"
      ? projects
      : projects.filter((project) => project.stack.includes(active));

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by technology"
        className="mb-10 flex flex-wrap gap-2"
      >
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={active === tag}
            onClick={() => setActive(tag)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors",
              active === tag
                ? "border-transparent bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {visible.length === 0 ? (
        <Reveal>
          <p className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            No projects tagged with “{active}” yet.
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
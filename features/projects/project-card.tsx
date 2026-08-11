import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_META: Record<
  Project["status"],
  { label: string; className: string }
> = {
  live: { label: "Live", className: "text-foreground" },
  "in-progress": {
    label: "In progress",
    className: "text-muted-foreground",
  },
  "open-source": {
    label: "Open source",
    className: "text-foreground/80",
  },
  archived: {
    label: "Archived",
    className: "text-muted-foreground",
  },
};

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const status = STATUS_META[project.status];

  return (
    <article
      className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm"
      style={{ transitionDelay: `${index * 30}ms` }}
    >
      <Link
        href={project.live ?? project.github ?? "#"}
        target={project.live?.startsWith("http") || project.github?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="relative block aspect-[16/9] overflow-hidden border-b"
        aria-label={`${project.title} — view project`}
      >
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-semibold text-background">
            ★ Featured
          </span>
        )}
        <span
          className={cn(
            "absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm",
            status.className,
          )}
        >
          {status.label}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display-sm text-base font-semibold">
              {project.title}
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {project.tagline}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.slice(0, 6).map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-4 border-t pt-3">
          {project.live?.startsWith("http") ? (
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </Link>
          ) : project.live ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" />
              In development
            </span>
          ) : null}
          {project.github ? (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
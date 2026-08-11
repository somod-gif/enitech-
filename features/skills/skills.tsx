import { Banknote, Cloud, Database, FlaskConical, Layout, Megaphone, MessageSquare, Server } from "lucide-react";
import { SKILL_GROUPS } from "@/lib/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

const ICONS = {
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  megaphone: Megaphone,
  banknote: Banknote,
  message: MessageSquare,
  flask: FlaskConical,
} as const;

export function Skills() {
  return (
    <section aria-labelledby="skills" className="py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="Core Capabilities"
          description="The stack I reach for — from payment rails to pixel-perfect interfaces."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => {
            const Icon = ICONS[group.icon as keyof typeof ICONS] ?? Layout;
            return (
              <Reveal key={group.id} delay={index * 0.07}>
                <div className="card-hover group relative h-full overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-foreground/10 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  />
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display-sm font-semibold">{group.label}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2" aria-label={`${group.label} skills`}>
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          "border-border bg-secondary/50 text-secondary-foreground",
                          "group-hover:border-primary/30 group-hover:text-foreground",
                        )}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
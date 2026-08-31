import { Banknote, Cloud, Database, FlaskConical, Layout, Megaphone, MessageSquare, Server } from "lucide-react";
import { SKILL_GROUPS } from "@/lib/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

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
          title="Skills & Tools"
          description="The technologies I work with daily."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => {
            const Icon = ICONS[group.icon as keyof typeof ICONS] ?? Layout;
            return (
              <Reveal key={group.id} delay={index * 0.05}>
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold">{group.label}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2" aria-label={`${group.label} skills`}>
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
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

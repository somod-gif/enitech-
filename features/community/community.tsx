import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Mic,
  Rocket,
  Trophy,
  Users,
} from "lucide-react";
import { ACHIEVEMENTS, COMMUNITIES, INVOLVEMENT } from "@/lib/profile";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const INVOLVEMENT_META = {
  Hackathons: { icon: Rocket, accent: "bg-foreground" },
  "Open Source": { icon: GithubMark, accent: "bg-foreground/85" },
  Speaking: { icon: Mic, accent: "bg-foreground/70" },
  Mentoring: { icon: HeartHandshake, accent: "bg-foreground/60" },
  "Campus Leadership": { icon: Users, accent: "bg-foreground/50" },
};

const TYPE_META = {
  ambassador: { label: "Ambassador", icon: Handshake, className: "text-foreground bg-muted" },
  expert: { label: "Expert", icon: BadgeCheck, className: "text-foreground bg-muted" },
  community: { label: "Community", icon: Users, className: "text-muted-foreground bg-muted" },
};

export function InvolvementGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {INVOLVEMENT.map((item, index) => {
        const meta =
          INVOLVEMENT_META[item.title as keyof typeof INVOLVEMENT_META] ??
          INVOLVEMENT_META.Hackathons;
        return (
          <Reveal key={item.title} delay={index * 0.06}>
            <div className="card-hover group h-full rounded-2xl border bg-card p-6 shadow-sm">
              <span
                className={cn(
                  "mb-5 grid h-11 w-11 place-items-center rounded-xl text-background",
                  meta.accent,
                )}
              >
                <meta.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function CommunitiesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {COMMUNITIES.map((community, index) => {
        const type = TYPE_META[community.type];
        return (
          <Reveal key={community.name} delay={index * 0.06}>
            <Link
              href={community.url ?? "#"}
              target={community.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={cn(
                "card-hover group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm",
                !community.url && "pointer-events-none",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                    type.className,
                  )}
                >
                  <type.icon className="h-3 w-3" />
                  {type.label}
                </span>
                {community.url ? (
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                ) : null}
              </div>
              <h3 className="font-display-sm mt-4 text-lg font-semibold">
                {community.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-primary">
                {community.role}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {community.description}
              </p>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

export function AchievementsList() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {ACHIEVEMENTS.map((achievement, index) => (
        <Reveal key={achievement.title} delay={index * 0.06}>
          <div
            className={cn(
              "card-hover flex h-full gap-4 rounded-2xl border p-6 shadow-sm",
              achievement.highlight
                ? "border-foreground/30 bg-muted/50"
                : "bg-card",
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                achievement.highlight
                  ? "bg-foreground text-background"
                  : "bg-muted text-foreground",
              )}
            >
              {achievement.highlight ? (
                <Trophy className="h-5 w-5" />
              ) : (
                <Lightbulb className="h-5 w-5" />
              )}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display-sm font-semibold">
                  {achievement.title}
                </h3>
                {achievement.highlight ? (
                  <Badge variant="outline" className="rounded-full text-[10px] uppercase tracking-wider">
                    Highlight
                  </Badge>
                ) : null}
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {achievement.year}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {achievement.context}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.61-5.47 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}
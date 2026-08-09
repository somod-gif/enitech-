"use client";

import { Clock, Eye, MousePointerClick, SunMoon } from "lucide-react";
import { useInteractionStats } from "@/hooks/use-interaction-stats";
import { Reveal } from "@/components/reveal";

export function InteractionData() {
  const { ready, sessionMinutes, interactions, theme } = useInteractionStats();

  const stats = [
    {
      label: "Session Time",
      value: ready ? sessionMinutes : 0,
      suffix: "min",
      note: "Time you've spent exploring this portfolio.",
      icon: Clock,
    },
    {
      label: "Interactions",
      value: ready ? interactions : 0,
      suffix: "",
      note: "Total clicks and keyboard actions recorded locally.",
      icon: MousePointerClick,
    },
    {
      label: "Theme Preference",
      value: ready ? theme : "—",
      suffix: "",
      note: "Your currently active UI theme setting.",
      icon: SunMoon,
    },
  ];

  return (
    <Reveal>
      <section aria-labelledby="interaction-heading" className="mt-16">
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-foreground text-background">
              <Eye className="h-5 w-5" />
            </span>
            <div>
              <h2 id="interaction-heading" className="font-display text-xl font-semibold">
                Your Interaction Data
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Live, in your browser only — no analytics trackers.
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Showing exactly what this site observes about your visit. Privacy
            first: all local metrics stay strictly in your browser and reset
            with your browsing data.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border bg-background/50 p-5"
              >
                <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <stat.icon className="h-3.5 w-3.5" />
                  {stat.label}
                </dt>
                <dd className="mt-2 flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-bold tabular-nums">
                    {stat.value}
                  </span>
                  {stat.suffix ? (
                    <span className="font-mono text-sm text-muted-foreground">
                      {stat.suffix}
                    </span>
                  ) : null}
                </dd>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {stat.note}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </Reveal>
  );
}
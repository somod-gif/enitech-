import type { ContributionDay } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

const LEVEL_CLASSES: Record<number, string> = {
  0: "bg-muted",
  1: "bg-muted-foreground/30",
  2: "bg-muted-foreground/50",
  3: "bg-foreground/60",
  4: "bg-foreground",
};

export function ContributionGraph({
  calendar,
  totalContributions,
}: {
  calendar: ContributionDay[];
  totalContributions: number;
}) {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }
  const visibleWeeks = weeks.slice(-52);

  return (
    <Reveal>
      <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display-sm font-semibold">Contributions</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Last 365 days ·{" "}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(totalContributions)}{" "}
              total
            </p>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="mr-1 text-[10px] text-muted-foreground">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={cn("h-2.5 w-2.5 rounded-[3px]", LEVEL_CLASSES[level])}
              />
            ))}
            <span className="ml-1 text-[10px] text-muted-foreground">More</span>
          </div>
        </div>

        <div
          role="img"
          aria-label={`Contribution heatmap of the last 365 days`}
          className="flex gap-[3px] overflow-x-auto pb-2"
        >
          {visibleWeeks.map((week, index) => (
            <div key={index} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${formatDate(day.date)} — ${day.count} ${day.count === 1 ? "contribution" : "contributions"}`}
                  className={cn(
                    "h-[10px] w-[10px] rounded-[3px] transition-transform duration-150",
                    LEVEL_CLASSES[day.level],
                    day.count > 0 &&
                      "hover:scale-125 hover:ring-1 hover:ring-primary",
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
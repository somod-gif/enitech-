import { getGithubStats } from "@/services/github";
import { GitHubOverview } from "@/features/insights/github-overview";
import { ContributionGraph } from "@/features/insights/contribution-graph";
import { InteractionData } from "@/features/insights/interaction-data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Live GitHub activity — contributions, repositories, stars, followers and languages, updated automatically via the GitHub GraphQL API.",
  path: "/insights",
});

export const revalidate = 21600;

export default async function InsightsPage() {
  const stats = await getGithubStats();

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Insights"
          title="My GitHub, in real time"
          description={
            stats
              ? "Contribution activity, repositories, stars, followers and language breakdown — pulled live from the GitHub GraphQL API."
              : "This page pulls live data from GitHub — add a GITHUB_TOKEN environment variable to light it up."
          }
        />

        <div className="mt-14">
          {stats ? (
            <>
              <ContributionGraph
                calendar={stats.contributionCalendar}
                totalContributions={stats.totalContributions}
              />
              <div className="mt-8">
                <GitHubOverview stats={stats} />
              </div>
            </>
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-dashed bg-card/50 p-10 text-center">
                <p className="font-mono text-sm text-muted-foreground">
                  GITHUB_TOKEN not found
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Create a fine-grained token (read-only) at{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    github.com/settings/tokens
                  </code>{" "}
                  with the{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    Metadata: read
                  </code>{" "}
                  permission, then add it to your environment. The page will
                  start showing live stats automatically.
                </p>
              </div>
            </Reveal>
          )}

          <InteractionData />
        </div>
      </div>
    </div>
  );
}
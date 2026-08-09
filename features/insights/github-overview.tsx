import Link from "next/link";
import {
  Activity,
  FolderGit2,
  GitCommitHorizontal,
  GitFork,
  Star,
  Users,
} from "lucide-react";
import type { GithubPinnedRepo, GithubRepo, GithubStats } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { formatDate, formatCompactNumber } from "@/lib/utils";

function StatCard({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: typeof Star;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="card-hover flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-2xl font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function GitHubOverview({ stats }: { stats: GithubStats }) {
  return (
    <div className="space-y-16">
      <Reveal>
        <div className="card-hover flex flex-col gap-6 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="relative shrink-0">
            <Avatar className="h-20 w-20 rounded-2xl ring-2 ring-primary/30">
              <AvatarImage src={stats.avatarUrl} alt={stats.name} />
              <AvatarFallback>{stats.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-semibold sm:text-2xl">
                {stats.name}
              </h2>
              <Badge variant="secondary" className="rounded-full">
                @{stats.login}
              </Badge>
            </div>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {stats.bio ?? "Software engineer building fintech and SaaS."}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Active since{" "}
              {new Date(stats.accountCreatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <Link
            href={stats.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            Visit GitHub →
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={GitCommitHorizontal}
          label="Contributions (year)"
          value={formatCompactNumber(stats.totalContributions)}
          delay={0}
        />
        <StatCard
          icon={Users}
          label="Followers"
          value={formatCompactNumber(stats.followers)}
          delay={0.06}
        />
        <StatCard
          icon={Star}
          label="Total stars"
          value={formatCompactNumber(
            stats.repositories.reduce((acc, repo) => acc + repo.stars, 0),
          )}
          delay={0.12}
        />
        <StatCard
          icon={FolderGit2}
          label="Public repos"
          value={String(stats.repositories.length)}
          delay={0.18}
        />
      </div>

      <Section subtitle="Pinned repositories" title="What I keep front and center">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.pinned.map((repo) => (
            <PinnedRepo key={repo.name} repo={repo} />
          ))}
        </div>
      </Section>

      <Section subtitle="Languages" title="Where my stack lands">
        <LanguageBars stats={stats} />
      </Section>

      <Section subtitle="Repositories" title="Most recent work">
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.repositories.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </Section>

      <div className="flex justify-center">
        <Link
          href={stats.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40"
        >
          <Activity className="h-4 w-4" />
          See full activity on GitHub
        </Link>
      </div>
    </div>
  );
}

function Section({
  subtitle,
  title,
  children,
}: {
  subtitle: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {subtitle}
        </p>
        <h3 className="font-display mt-2 text-xl font-semibold sm:text-2xl">
          {title}
        </h3>
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function PinnedRepo({ repo }: { repo: GithubPinnedRepo }) {
  return (
    <Reveal>
      <Link
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover group block h-full rounded-2xl border bg-card p-5 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <FolderGit2 className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate font-mono text-sm font-semibold">
              {repo.name}
            </span>
          </div>
          <Badge variant="secondary" className="shrink-0 rounded-full">
            ★ {formatCompactNumber(repo.stars)}
          </Badge>
        </div>
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {repo.description ?? "No description provided."}
        </p>
        {repo.language ? (
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: repo.language.color ?? undefined }}
            />
            {repo.language.name}
          </p>
        ) : null}
      </Link>
    </Reveal>
  );
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <Reveal>
      <Link
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover group block h-full rounded-2xl border bg-card p-5 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-mono text-sm font-semibold">
            {repo.name}
          </span>
          <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {formatCompactNumber(repo.stars)}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" />
              {formatCompactNumber(repo.forks)}
            </span>
          </span>
        </div>
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {repo.description ?? "No description provided."}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {repo.language ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: repo.language.color ?? undefined }}
              />
              {repo.language.name}
            </span>
          ) : null}
          <span>Updated {formatDate(repo.pushedAt)}</span>
          {repo.archived ? <span className="text-muted-foreground">Archived</span> : null}
        </div>
      </Link>
    </Reveal>
  );
}

function LanguageBars({ stats }: { stats: GithubStats }) {
  const top = stats.languages.slice(0, 8);

  if (top.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Not enough language data yet — keep an eye on this space.
      </p>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
      {top.map((lang, index) => (
        <Reveal key={lang.name} delay={index * 0.05}>
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-medium">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: lang.color ?? undefined }}
                />
                {lang.name}
              </span>
              <span className="font-mono text-muted-foreground">
                {lang.percentage}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground"
                style={{ width: `${lang.percentage}%` }}
              />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
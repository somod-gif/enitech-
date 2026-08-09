import "server-only";

import { cache } from "react";
import { GITHUB } from "@/lib/config";
import type {
  ContributionDay,
  GithubRepo,
  GithubStats,
} from "@/types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const OVERVIEW_QUERY = /* GraphQL */ `
  query PortfolioOverview($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      url
      bio
      location
      createdAt
      followers {
        totalCount
      }
      following {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
          }
        }
      }
      repositories(
        first: 8
        orderBy: { field: PUSHED_AT, direction: DESC }
        ownerAffiliations: OWNER
        isFork: false
      ) {
        nodes {
          name
          description
          url
          isArchived
          stargazerCount
          forkCount
          updatedAt
          pushedAt
          primaryLanguage {
            name
            color
          }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            url
            description
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

const LANGUAGE_QUERY = /* GraphQL */ `
  query RepoLanguages($login: String!) {
    user(login: $login) {
      repositories(
        first: 30
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface GraphQlError {
  message: string;
}

async function graphql<T>(query: string, variables: Record<string, string>) {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB.token}`,
      "User-Agent": "enitech-portfolio",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 21600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status}`);
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: GraphQlError[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}

async function fetchLanguages(login: string) {
  const data = await graphql<{
    user: {
      repositories: {
        nodes: {
          name: string;
          languages: {
            edges: { size: number; node: { name: string; color: string } }[];
          };
        }[];
      };
    };
  }>(LANGUAGE_QUERY, { login });

  const totals = new Map<string, { bytes: number; color: string | null }>();
  let sum = 0;

  for (const repo of data.user.repositories.nodes) {
    const edge = repo.languages.edges[0];
    if (!edge) continue;
    const existing = totals.get(edge.node.name);
    if (existing) {
      existing.bytes += edge.size;
    } else {
      totals.set(edge.node.name, {
        bytes: edge.size,
        color: edge.node.color ?? null,
      });
    }
    sum += edge.size;
  }

  return [...totals.entries()]
    .map(([name, { bytes, color }]) => ({
      name,
      color,
      percentage: sum > 0 ? Math.round((bytes / sum) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

async function fetchOverview(login: string): Promise<GithubStats> {
  const data = await graphql<{
    user: {
      name: string;
      login: string;
      avatarUrl: string;
      url: string;
      bio: string | null;
      location: string | null;
      createdAt: string;
      followers: { totalCount: number };
      following: { totalCount: number };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      };
      repositories: {
        nodes: {
          name: string;
          description: string | null;
          url: string;
          isArchived: boolean;
          stargazerCount: number;
          forkCount: number;
          updatedAt: string;
          pushedAt: string;
          primaryLanguage: { name: string; color: string } | null;
        }[];
      };
      pinnedItems: {
        nodes: {
          name: string;
          url: string;
          description: string | null;
          stargazerCount: number;
          forkCount: number;
          primaryLanguage: { name: string; color: string } | null;
        }[];
      };
    };
  }>(OVERVIEW_QUERY, { login });

  const user = data.user;

  const contributionCalendar: ContributionDay[] =
    user.contributionsCollection.contributionCalendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      })),
    );

  const repositories: GithubRepo[] = user.repositories.nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    updatedAt: repo.updatedAt,
    pushedAt: repo.pushedAt,
    language: repo.primaryLanguage
      ? { name: repo.primaryLanguage.name, color: repo.primaryLanguage.color }
      : null,
    archived: repo.isArchived,
  }));

  return {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatarUrl,
    url: user.url,
    bio: user.bio,
    location: user.location,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    totalContributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
    contributionCalendar,
    repositories,
    pinned: user.pinnedItems.nodes.map((repo) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage,
    })),
    languages: await fetchLanguages(login),
    accountCreatedAt: user.createdAt,
  };
}

export const getGithubStats = cache(async () => {
  if (!GITHUB.token) return null;
  try {
    return await fetchOverview(GITHUB.username);
  } catch (error) {
    console.error("[github] failed to load portfolio stats:", error);
    return null;
  }
});

import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { estimateReadingMinutes } from "@/utils/text";
import type { PostDetail, PostMeta, PostSummary } from "@/types";

export const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const CATEGORIES = new Set([
  "fintech",
  "engineering",
  "ai",
  "career",
  "open-source",
]);

function normalizeMeta(raw: Record<string, unknown>, slug: string): PostMeta {
  const category = String(raw.category ?? "engineering");
  return {
    title: String(raw.title ?? slug),
    excerpt: String(raw.excerpt ?? ""),
    date: String(raw.date ?? new Date().toISOString().slice(0, 10)),
    category: CATEGORIES.has(category) ? (category as PostMeta["category"]) : "engineering",
    tags: Array.isArray(raw.tags)
      ? raw.tags.map((tag) => String(tag))
      : [],
    published: raw.published !== false,
  };
}

function listPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => path.join(POSTS_DIR, file))
    .sort();
}

export const getAllPosts = cache((): PostSummary[] => {
  const posts: PostSummary[] = [];

  for (const file of listPostFiles()) {
    const source = fs.readFileSync(file, "utf-8");
    const { data } = matter(source);
    const meta = normalizeMeta(data, path.basename(file, path.extname(file)));

    if (!meta.published) continue;

    posts.push({
      slug: path.basename(file, path.extname(file)),
      meta,
      readingMinutes: estimateReadingMinutes(source),
    });
  }

  return posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );
});

export const getPost = cache((slug: string): PostDetail | null => {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const source = fs.readFileSync(file, "utf-8");
  const { data } = matter(source);
  const meta = normalizeMeta(data, slug);

  const related = getAllPosts()
    .filter(
      (post) =>
        post.slug !== slug &&
        post.meta.tags.some((tag) => meta.tags.includes(tag)),
    )
    .slice(0, 3);

  return {
    slug,
    meta,
    readingMinutes: estimateReadingMinutes(source),
    raw: source,
    related,
  };
});

export const getPostSlugs = cache(() =>
  getAllPosts().map((post) => ({ slug: post.slug })),
);

export function getCategories() {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    counts.set(post.meta.category, (counts.get(post.meta.category) ?? 0) + 1);
  }
  return [...counts.entries()].map(([category, count]) => ({
    category: category as PostMeta["category"],
    count,
  }));
}

export function getAllTags() {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.meta.tags) tags.add(tag);
  }
  return [...tags].sort();
}

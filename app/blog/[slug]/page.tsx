import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  FolderOpen,
} from "lucide-react";
import { getPost, getPostSlugs } from "@/lib/posts";
import { buildMetadata, articleJsonLd, jsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { readingTimeLabel } from "@/utils/text";
import { Comments } from "@/features/blog/comments";
import { ShareButtons } from "@/features/blog/share-buttons";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

const CATEGORY_LABELS: Record<string, string> = {
  fintech: "Fintech",
  engineering: "Engineering",
  ai: "AI",
  career: "Career",
  "open-source": "Open Source",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.meta.title,
    description: post.meta.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.meta.date,
    tags: post.meta.tags,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell">
        <Reveal>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All posts
          </Link>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl">
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                <FolderOpen className="h-3 w-3" />
                {CATEGORY_LABELS[post.meta.category] ?? post.meta.category}
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {readingTimeLabel(post.readingMinutes)}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              {post.meta.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {post.meta.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground font-mono text-sm font-bold text-background">
                  B
                </span>
                <div>
                  <p className="text-sm font-semibold">Badmus Samad Eniola</p>
                  <p className="text-xs text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <ShareButtons slug={slug} title={post.meta.title} />
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="prose prose-lg">{<Post />}</div>
        </div>

        {post.meta.tags.length > 0 && (
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Tags
            </span>
            {post.meta.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <Comments key={slug} postSlug={slug} />

        {post.related.length > 0 && (
          <section aria-labelledby="related-posts" className="mt-20">
            <Reveal>
              <h2
                id="related-posts"
                className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-muted-foreground"
              >
                <span className="h-px w-8 bg-primary" />
                Keep reading
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {post.related.map((related, index) => (
                <Reveal key={related.slug} delay={index * 0.05}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="card-hover group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm"
                  >
                    <p className="font-mono text-xs text-muted-foreground">
                      {formatDate(related.meta.date)}
                    </p>
                    <h3 className="font-display-sm mt-2 flex-1 font-semibold leading-snug transition-colors group-hover:text-primary">
                      {related.meta.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary">
                      Read post
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto mt-20 max-w-3xl overflow-hidden rounded-2xl border bg-card">
          <div className="relative border-b px-6 py-10 text-center sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-16 h-40 bg-foreground/5 blur-3xl"
            />
            <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Enjoyed this?
            </p>
            <h2 className="relative mt-3 font-display text-2xl font-semibold sm:text-3xl">
              There&apos;s more where this came from
            </h2>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex h-11 items-center rounded-xl bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Read more posts
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-xl border border-border px-6 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
              >
                Say hello
              </Link>
            </div>
          </div>
        </div>
      </div>

      {jsonLd(articleJsonLd(post.meta, slug))}
    </article>
  );
}
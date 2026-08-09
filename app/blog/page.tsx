import type { Metadata } from "next";
import { BlogFilters } from "@/features/blog/blog-filters";
import { BlogCard } from "@/features/blog/blog-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Writing on fintech, engineering practice, AI products and lessons from shipping software in the real world.",
  path: "/blog",
});

const POSTS_PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string; page?: string }>;
}) {
  const { q, category, tag, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const allPosts = getAllPosts();

  const query = q?.trim().toLowerCase() ?? "";
  const filtered = allPosts.filter((post) => {
    if (category && post.meta.category !== category) return false;
    if (tag && !post.meta.tags.includes(tag)) return false;
    if (query) {
      const haystack = [
        post.meta.title,
        post.meta.excerpt,
        post.meta.category,
        ...post.meta.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const visible = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Blog"
          title="Writing, in public"
          description="Fintech, engineering practice, AI and career lessons — written down so the next person builds faster."
        />

        <div className="mt-12">
          <BlogFilters />
        </div>

        {visible.length === 0 ? (
          <Reveal>
            <div className="mt-10 rounded-2xl border border-dashed p-12 text-center">
              <p className="font-medium">No posts match those filters.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search, category or tag.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <Reveal key={post.slug} delay={Math.min(index * 0.05, 0.3)}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Blog pagination"
            className="mt-14 flex items-center justify-center gap-2"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
              const params = new URLSearchParams();
              if (q) params.set("q", q);
              if (category) params.set("category", category);
              if (tag) params.set("tag", tag);
              if (num > 1) params.set("page", String(num));
              const active = num === currentPage;
              return (
                <a
                  key={num}
                  href={`/blog?${params}`}
                  aria-current={active ? "page" : undefined}
                  className={`grid h-10 w-10 place-items-center rounded-xl border text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {num}
                </a>
              );
            })}
          </nav>
        )}

        {!q && !category && !tag && (
          <Reveal className="mt-16">
            <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              Like source code over prose? The posts live in{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                content/posts
              </code>{" "}
              as MDX — new files are published automatically.
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
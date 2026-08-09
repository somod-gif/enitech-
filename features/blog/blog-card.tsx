import Link from "next/link";
import { ArrowUpRight, Clock, FolderOpen } from "lucide-react";
import type { PostSummary } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { readingTimeLabel } from "@/utils/text";

const CATEGORY_LABELS: Record<string, string> = {
  fintech: "Fintech",
  engineering: "Engineering",
  ai: "AI",
  career: "Career",
  "open-source": "Open Source",
};

export function BlogCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-hover group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary" className="rounded-full normal-case">
          <FolderOpen className="h-3 w-3" />
          {CATEGORY_LABELS[post.meta.category] ?? post.meta.category}
        </Badge>
        <time dateTime={post.meta.date} className="font-mono">
          {formatDate(post.meta.date)}
        </time>
        <span className="ml-auto inline-flex items-center gap-1 font-mono">
          <Clock className="h-3 w-3" />
          {readingTimeLabel(post.readingMinutes)}
        </span>
      </div>

      <h2 className="font-display-sm mt-4 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
        {post.meta.title}
      </h2>

      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.meta.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <ul className="flex flex-wrap gap-1.5">
          {post.meta.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-secondary/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              #{tag}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
          Read
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
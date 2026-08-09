"use client";

import { Suspense, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  { value: "", label: "All categories" },
  { value: "fintech", label: "Fintech" },
  { value: "engineering", label: "Engineering" },
  { value: "ai", label: "AI" },
  { value: "career", label: "Career" },
  { value: "open-source", label: "Open Source" },
];

function BlogFiltersInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const tag = searchParams.get("tag") ?? "";

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="glass sticky top-20 z-30 rounded-2xl border p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => updateParams({ q: event.target.value })}
            placeholder="Search posts, topics, tags…"
            aria-label="Search blog posts"
            className="rounded-xl pl-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          {CATEGORIES.map((item) => {
            const active =
              item.value === ""
                ? category === "" 
                : category === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => updateParams({ category: item.value })}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {(tag || query) && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {query ? (
            <button
              type="button"
              onClick={() => updateParams({ q: "" })}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs hover:bg-accent"
            >
              “{query}”
              <X className="h-3 w-3" />
            </button>
          ) : null}
          {tag ? (
            <button
              type="button"
              onClick={() => updateParams({ tag: "" })}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs hover:bg-accent"
            >
              #{tag}
              <X className="h-3 w-3" />
            </button>
          ) : null}
        </div>
      )}

      {isPending && (
        <p className="sr-only" role="status">
          Updating results…
        </p>
      )}
    </div>
  );
}

export function BlogFilters() {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <BlogFiltersInner />
    </Suspense>
  );
}
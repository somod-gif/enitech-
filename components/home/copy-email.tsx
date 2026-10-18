"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SITE } from "@/lib/config";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — reveal the address instead
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex w-full items-center justify-between rounded-xl border bg-muted/40 p-3 text-left transition-colors hover:border-brand"
      aria-label={`Copy email address ${SITE.email}`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {copied ? (
          <Check className="h-4 w-4 shrink-0 text-brand" />
        ) : (
          <Copy className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className="truncate font-mono text-sm font-semibold">
          {copied ? "Copied to clipboard" : SITE.email}
        </span>
      </span>
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {copied ? "✓" : "Copy"}
      </span>
    </button>
  );
}

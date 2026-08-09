"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { absoluteUrl } from "@/lib/utils";

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = absoluteUrl(`/blog/${slug}`);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the link");
    }
  };

  const shareLinks = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: Linkedin,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Share
      </span>
      {shareLinks.map((share) => (
        <button
          key={share.label}
          type="button"
          aria-label={share.label}
          onClick={() => {
            window.open(share.href, "_blank", "noopener,noreferrer,width=600,height=500");
          }}
          className="grid h-9 w-9 place-items-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <share.icon className="h-4 w-4" />
        </button>
      ))}
      <motion.button
        type="button"
        aria-label={copied ? "Copied" : "Copy link to clipboard"}
        onClick={copyLink}
        whileTap={{ scale: 0.9 }}
        className="grid h-9 w-9 place-items-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        {copied ? <Check className="h-4 w-4 text-foreground" /> : <Link2 className="h-4 w-4" />}
      </motion.button>
    </div>
  );
}
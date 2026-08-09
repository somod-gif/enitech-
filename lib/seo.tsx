import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import type { PostMeta } from "@/types";

export function jsonLd(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.author,
    jobTitle: "Software Engineer",
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    sameAs: [
      SITE.githubUrl,
      SITE.linkedinUrl,
      SITE.twitterUrl,
    ],
    knowsAbout: [
      "Fintech",
      "Full Stack Engineering",
      "Payments",
      "SaaS",
      "AI Applications",
      "Microservices",
    ],
  };
}

export function articleJsonLd(meta: PostMeta, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    dateModified: meta.date,
    url: absoluteUrl(`/blog/${slug}`),
    author: {
      "@type": "Person",
      name: SITE.author,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name ?? SITE.author,
    },
    keywords: meta.tags.join(", "),
  };
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  tags,
}: {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? `${SITE.url}/opengraph-image`;

  return {
    title: title ? `${title} — ${SITE.author}` : SITE.title,
    description: description ?? SITE.description,
    alternates: { canonical: url },
    openGraph: {
      title: title ?? `${SITE.author} — ${SITE.role}`,
      description: description ?? SITE.description,
      url,
      siteName: SITE.name,
      type,
      locale: "en_NG",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.author }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE.title,
      description: description ?? SITE.description,
      images: [ogImage],
    },
    keywords: tags ? [...SITE.keywords, ...tags] : [...SITE.keywords],
  };
}
import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";

export function jsonLd(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    areaServed: "Worldwide",
    sameAs: [SITE.githubUrl, SITE.linkedinUrl, SITE.twitterUrl],
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
    title: title ? `${title} — ${SITE.name}` : SITE.title,
    description: description ?? SITE.description,
    alternates: { canonical: url },
    openGraph: {
      title: title ?? `${SITE.name} — ${SITE.role}`,
      description: description ?? SITE.description,
      url,
      siteName: SITE.name,
      type,
      locale: "en_NG",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
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

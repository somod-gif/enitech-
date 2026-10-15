import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/demos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];
}

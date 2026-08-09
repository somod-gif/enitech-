import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";
import { stripMarkdown } from "@/utils/text";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const description = stripMarkdown(post.meta.excerpt).slice(0, 280);
      return `
    <item>
      <title>${escapeXml(post.meta.title)}</title>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
      <category>${escapeXml(post.meta.category)}</category>
      ${post.meta.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(`${SITE.author} — Blog`)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE.url}/icon.svg</url>
      <title>${escapeXml(SITE.author)}</title>
      <link>${SITE.url}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
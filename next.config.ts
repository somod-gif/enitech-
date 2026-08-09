import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "meta" }],
      "remark-gfm",
    ],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-highlight", { detect: true, plainText: ["txt", "text"] }],
    ],
  },
});

export default withMDX(nextConfig);
import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";

const SITE_URL = "https://snehashish.is-a.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dynamically read all blog slugs from data/ so the sitemap stays in sync
  // with new posts without any manual updates.
  const dataDir = path.join(process.cwd(), "data");
  const files = await fs.readdir(dataDir);
  const blogSlugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    // Home page (one-page portfolio)
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    // Blog listing page
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Individual blog posts
    ...blogEntries,
  ];
}

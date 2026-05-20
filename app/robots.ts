import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all well-behaved crawlers (Google, Bing, etc.)
        userAgent: "*",
        allow: "/",
        // Disallow build artifacts, API internals, and private routes
        disallow: ["/api/", "/_next/", "/static/"],
      },
      {
        // GPTBot (OpenAI) — allow indexing for AI training / plugin discovery
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        // Google-Extended (Gemini training) — allow
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        // Anthropic Claude crawler
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        // Perplexity AI crawler
        userAgent: "PerplexityBot",
        allow: "/",
      },
    ],
    sitemap: "https://snehashish.is-a.dev/sitemap.xml",
    host: "https://snehashish.is-a.dev",
  };
}

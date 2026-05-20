import type React from "react";
import type { Metadata } from "next";

const SITE_URL = "https://snehashish.is-a.dev";

/**
 * Consolidated metadata for ALL routes under /blogs.
 *
 * This is the single source of truth for the /blogs segment:
 * - /blogs  (listing page) — inherits everything from here directly.
 * - /blogs/[slug] — overrides title, description, openGraph, twitter,
 *   and alternates via generateMetadata(); the rest (keywords, authors,
 *   creator, publisher, appleWebApp, formatDetection) are still inherited.
 *
 * Next.js merges metadata top-down: root layout → blogs layout → page.
 * Nested objects (openGraph, twitter) are fully replaced when a child page
 * defines them, so blog posts can provide their own article-specific OG data.
 */
export const metadata: Metadata = {
  title: "Blogs | Snehashish Mishra",
  description:
    "Explore blog posts by Snehashish Mishra on web development, software engineering, and practical programming tips. Discover insights, tutorials, and real-world solutions for developers and designers.",

  generator: "Snehashish Mishra",
  keywords: [
    "Snehashish Mishra",
    "Web Developer",
    "Frontend Developer",
    "MERN Stack",
    "Next.js",
    "React Developer",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Cloud Computing",
    "UI UX Designer",
    "Blog",
    "Blogs",
    "Blogging",
    "Tech Blog",
    "Developer Blog",
    "Web Development Blog",
    "Software Engineering",
    "Programming Tips",
    "Tutorials",
  ],
  authors: [
    {
      name: "Snehashish Mishra",
      url: "https://snehashish.is-a.dev/blogs",
    },
  ],
  creator: "Snehashish Mishra",
  publisher: "Snehashish Mishra",

  openGraph: {
    title: "Blogs | Snehashish Mishra",
    description:
      "Explore blog posts by Snehashish Mishra on web development, software engineering, and practical programming tips. Discover insights, guides, and real-world solutions for developers and designers.",
    url: `${SITE_URL}/blogs`,
    siteName: "Snehashish Mishra Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/Images/blog/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Snehashish Mishra | Blogs",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Blogs | Snehashish Mishra",
    description:
      "Explore blog posts by Snehashish Mishra on web development, software engineering, and practical programming tips. Discover insights, guides, and real-world solutions for developers and designers.",
    creator: "@snehashish_mishra",
    site: "@snehashish_mishra",
    images: [`${SITE_URL}/Images/blog/og-image.png`],
  },

  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },

  appleWebApp: {
    capable: true,
    title: "Blogs | Snehashish Mishra",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Transparent wrapper — the root layout already provides the full shell.
  // This layout exists purely to scope and own all /blogs metadata.
  return <>{children}</>;
}

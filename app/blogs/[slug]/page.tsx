import type { Metadata } from "next";
import { redirect } from "next/navigation";

import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { getBlogFrontMatterFromSlug, getSingleBlog } from "@/utils/mdx";

const SITE_URL = "https://snehashish.is-a.dev";

// Shared fields (keywords, authors, creator, publisher, appleWebApp,
// formatDetection) are inherited from app/blogs/layout.tsx.
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const frontmatter = await getBlogFrontMatterFromSlug(slug);

  if (!frontmatter) return { title: "Blog not found" };

  const pageUrl = `${SITE_URL}/blogs/${slug}`;
  const ogImage = frontmatter.image
    ? [
        {
          url: `${SITE_URL}${frontmatter.image}`,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
          type: "image/png",
        },
      ]
    : [{ url: `${SITE_URL}/Images/blog/og-image.png`, width: 1200, height: 630, alt: frontmatter.title, type: "image/png" }];

  return {
    title: `${frontmatter.title} | Snehashish Mishra`,
    description: frontmatter.description,

    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: pageUrl,
      siteName: "Snehashish Mishra Portfolio",
      type: "article",
      locale: "en_IN",
      images: ogImage,
    },

    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      creator: "@snehashish_mishra",
      site: "@snehashish_mishra",
      images: frontmatter.image
        ? [`${SITE_URL}${frontmatter.image}`]
        : [`${SITE_URL}/Images/blog/og-image.png`],
    },

    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) redirect("/blogs");

  const { content, frontmatter } = blog;
  const pageUrl = `${SITE_URL}/blogs/${slug}`;

  // JSON-LD: BlogPosting for Google Article Rich Results
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    url: pageUrl,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    image: frontmatter.image
      ? `${SITE_URL}${frontmatter.image}`
      : `${SITE_URL}/Images/blog/og-image.png`,
    author: {
      "@type": "Person",
      name: "Snehashish Mishra",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Snehashish Mishra",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${SITE_URL}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="flex min-h-screen justify-center overflow-x-hidden">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Container className="min-h-screen px-8 pt-20 pb-10">
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          className="mx-auto mb-12 max-h-96 w-full max-w-2xl rounded-2xl object-cover shadow-xl"
        />
        <div className="prose prose-neutral dark:prose-invert mx-auto max-w-2xl wrap-break-word">
          {content}
        </div>
      </Container>
    </div>
  );
}

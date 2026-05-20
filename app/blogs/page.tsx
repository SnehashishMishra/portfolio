import { Link } from "next-view-transitions";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import JsonLd from "@/components/JsonLd";
import Subheading from "@/components/Subheading";
import { getBlogs } from "@/utils/mdx";

export default async function BlogsPage() {
  const allBlogs = await getBlogs();

  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  // JSON-LD: CollectionPage + BreadcrumbList for Google Rich Results
  const blogsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blogs | Snehashish Mishra",
    description:
      "Technical blog posts by Snehashish Mishra on web development, Next.js, React, TypeScript, and modern software engineering.",
    url: "https://snehashish.is-a.dev/blogs",
    author: {
      "@type": "Person",
      name: "Snehashish Mishra",
      url: "https://snehashish.is-a.dev",
    },
    hasPart: allBlogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      url: `https://snehashish.is-a.dev/blogs/${blog.slug}`,
      datePublished: blog.date,
      author: {
        "@type": "Person",
        name: "Snehashish Mishra",
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://snehashish.is-a.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://snehashish.is-a.dev/blogs",
      },
    ],
  };

  return (
    <div className={`flex min-h-screen items-center justify-center`}>
      <JsonLd data={blogsSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Container className="min-h-screen px-8 pt-20 pb-10">
        <Heading>My Blogs</Heading>
        <Subheading>
          I'm a software engineer with passion for building scalable and
          efficient systems. I am currently pursuing MCA at SRM.
        </Subheading>
        <div className="flex flex-col gap-8 px-4 py-10">
          {allBlogs.map((blog, idx) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="animate-fade-up transition-all hover:scale-[1.01]"
              style={{
                animationDelay: `${idx * 100 + 300}ms`,
              }}
            >
              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <h2 className="from-primary via-secondary to-primary bg-linear-to-r bg-clip-text text-sm font-bold tracking-tight text-transparent md:text-base">
                  {blog.title}
                </h2>
                <p className="text-tertiary-blog hidden text-right text-[0.625rem] font-light md:block md:text-sm">
                  {new Date(blog.date || "").toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex flex-col items-start justify-between gap-1 md:flex-row md:items-center">
                <p className="text-secondary-blog max-w-lg pt-2 text-justify text-xs font-light md:text-sm">
                  {truncate(blog.description || "", 150)}
                </p>
                <p className="text-tertiary-blog block self-end text-[0.625rem] font-light md:hidden md:text-sm">
                  {new Date(blog.date || "").toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

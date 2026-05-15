import { Metadata } from "next";
import { Link } from "next-view-transitions";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import { cn } from "@/lib/utils";
import { getBlogs } from "@/utils/mdx";

export const metadata: Metadata = {
  title: "All blogs - Tylor Durden",
  description:
    "A perfects portfolio website template that showcases your skills, minimal and smooth microinteractions, perfect for devlopers and designers",
};

export default async function BlogsPage() {
  const allBlogs = await getBlogs();

  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container className="min-h-screen px-8 pt-20 pb-10">
        <Heading>All Blogs</Heading>
        <Subheading className="text-justify font-semibold">
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
                <h2 className="text-primary-blog text-sm font-bold tracking-tight md:text-base">
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

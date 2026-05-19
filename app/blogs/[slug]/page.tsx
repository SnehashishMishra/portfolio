import { redirect } from "next/navigation";

import Container from "@/components/Container";
import { getBlogFrontMatterFromSlug, getSingleBlog } from "@/utils/mdx";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const frontmatter = await getBlogFrontMatterFromSlug(slug);
  if (!frontmatter) return { title: "Blog not found" };
  return {
    title: frontmatter.title,
    description: frontmatter.description,
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
  return (
    <div className="flex min-h-screen justify-center overflow-x-hidden">
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

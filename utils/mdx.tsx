import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/MdxComponents";

type FrontMatter = {
  title: string;
  description: string;
  date: string;
  image: string;
};

// Used on the blog detail page — returns compiled JSX + frontmatter
export const getSingleBlog = async (slug: string) => {
  try {
    const singleBlog = await fs.readFile(
      path.join(process.cwd(), "data/", `${slug}.mdx`),
      "utf-8",
    );

    if (!singleBlog) return null;

    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source: singleBlog,
      options: {
        parseFrontmatter: true,
        mdxOptions: { remarkPlugins: [remarkGfm] },
      },
      components: mdxComponents,
    });

    return { content, frontmatter };
  } catch (error) {
    console.log(`Error reading blog file for slug "${slug}"`, error);
    return null;
  }
};

// Used on the listing page — returns frontmatter only for all posts
export const getBlogs = async () => {
  const files = await fs.readdir(path.join(process.cwd(), "data"));

  const allBlogs = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(".mdx", "");
      const frontmatter = await getBlogFrontMatterFromSlug(slug);
      return { slug, ...frontmatter };
    }),
  );

  return allBlogs;
};

// Used internally by getBlogs — cheaper than getSingleBlog (no content compile)
export const getBlogFrontMatterFromSlug = async (slug: string) => {
  const singleBlog = await fs.readFile(
    path.join(process.cwd(), "data/", `${slug}.mdx`),
    "utf-8",
  );

  if (!singleBlog) return null;

  const { frontmatter } = await compileMDX<FrontMatter>({
    source: singleBlog,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  return frontmatter;
};

import { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Link } from "next-view-transitions";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import { getBlogs } from "@/utils/mdx";

export const metadata: Metadata = {
  title: "My blogs - Snehashish Mishra",
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
    "Portfolio",
    "TypeScript",
    "Framer Motion",
    "React Motion",
    " ",
    "",
    "JavaScript",
    "Tailwind CSS",
    "Cloud Computing",
    "UI UX Designer",
    "Blog",
    "Blogs",
    "Bloging",
  ],
  authors: [
    {
      name: "Snehashish Mishra",
      url: "https://snehashish.is-a.dev/blogs",
    },
  ],
  creator: "Snehashish Mishra",
  publisher: "Snehashish Mishra",

  icons: {
    icon: "/logo_dark.svg",
    shortcut: "/logo_dark.svg",
  },

  openGraph: {
    title: "Snehashish Mishra | Web Developer Portfolio",
    description:
      "Explore blog posts by Snehashish Mishra on web development, software engineering, and practical programming tips. Discover insights, guides, and real-world solutions for developers and designers.",
    url: "https://snehashish.is-a.dev/blogs",
    siteName: "Snehashish Mishra Blogs",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://snehashish.is-a.dev/Images/blog/og-image.png",
        width: 1200,
        height: 630,
        alt: "Snehashish Mishra | Blogs",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Snehashish Mishra | Web Developer Portfolio",
    description:
      "Explore blog posts by Snehashish Mishra on web development, software engineering, and practical programming tips. Discover insights, guides, and real-world solutions for developers and designers.",
    creator: "@snehashish_mishra",
    site: "@snehashish_mishra",
    images: ["https://snehashish.is-a.dev/Images/blog/og-image.png"],
  },

  alternates: {
    canonical: "https://snehashish.is-a.dev/blogs",
  },

  appleWebApp: {
    capable: true,
    title: "Snehashish Mishra Portfolio",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default async function BlogsPage() {
  const allBlogs = await getBlogs();

  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  return (
    <div className={`flex min-h-screen items-center justify-center`}>
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

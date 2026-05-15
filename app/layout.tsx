import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ViewTransitions } from "next-view-transitions";

import { ThemeProvider } from "@/components/theme-provider";

// @ts-ignore: CSS module declarations not found
import "./globals.css";

import { Toaster } from "@/components/ui/toast";
import FaviconSwitcher from "@/components/FaviconSwitcher";
import Navigation from "@/components/navigation";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

/* 🚀 FULL ENHANCED SEO + SOCIAL MEDIA METADATA */
export const metadata = {
  title: "Snehashish Mishra | Web Developer Portfolio",
  description:
    "Explore the portfolio of Snehashish Mishra — a passionate Web Developer skilled in MERN stack, Next.js, and modern UI/UX design. Let's build something amazing together!",
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
  ],
  authors: [
    {
      name: "Snehashish Mishra",
      url: "https://snehashish.is-a.dev",
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
      "Hi, I'm Snehashish — a web developer crafting beautiful and performant websites using Next.js, React, and Tailwind CSS.",
    url: "https://snehashish.is-a.dev",
    siteName: "Snehashish Mishra Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://snehashish.is-a.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Snehashish Mishra | Web Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Snehashish Mishra | Web Developer Portfolio",
    description:
      "Discover Snehashish's journey in web development. Clean code, modern design, and creative web experiences.",
    creator: "@snehashish_mishra",
    site: "@snehashish_mishra",
    images: ["https://snehashish.is-a.dev/og-image.png"],
  },

  alternates: {
    canonical: "https://snehashish.is-a.dev",
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

/* ✅ Move viewport + themeColor here (required by Next.js 15+) */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFD700" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark relative scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className="bg-background text-foreground relative font-sans antialiased">
        <ThemeProvider>
          <ViewTransitions>
            <Navigation />
            <FaviconSwitcher />
            {children}
            <Toaster />
            <Analytics />
          </ViewTransitions>
        </ThemeProvider>
      </body>
    </html>
  );
}

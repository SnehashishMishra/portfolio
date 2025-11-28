import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import FaviconSwitcher from "@/components/FaviconSwitcher";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

/* ✅ Enhanced SEO Metadata */
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
    "JavaScript",
    "Tailwind CSS",
  ],
  authors: [
    {
      name: "Snehashish Mishra",
      url: "https://snehashish-portfolio.vercel.app",
    },
  ],
  creator: "Snehashish Mishra",
  publisher: "Snehashish Mishra",

  /* ✅ Favicon */
  icons: {
    icon: "/logo_dark.svg", // dark (default)
    shortcut: "/logo_light.svg", // light mode handled by your switcher
  },

  /* ✅ Open Graph (for social sharing) */
  openGraph: {
    title: "Snehashish Mishra | Web Developer Portfolio",
    description:
      "Hi, I'm Snehashish — a web developer crafting beautiful and performant websites using Next.js, React, and Tailwind CSS.",
    url: "https://snehashish-portfolio.vercel.app",
    siteName: "Snehashish Mishra Portfolio",
    images: [
      {
        url: "/og-image.png", // Place an image in /public/og-image.png
        width: 1200,
        height: 630,
        alt: "Snehashish Mishra | Web Developer Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  /* ✅ Twitter Card */
  twitter: {
    card: "summary_large_image",
    title: "Snehashish Mishra | Web Developer Portfolio",
    description:
      "Discover Snehashish's journey in web development. Clean code, modern design, and creative web experiences.",
    creator: "@snehashish_m", // replace with your actual handle if any
    images: ["/og-image.png"],
  },

  /* ✅ Canonical URL */
  alternates: {
    canonical: "https://snehashish-portfolio.vercel.app",
  },

  /* ✅ Theme color for browser tabs */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFD700" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1E1E" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="font-sans antialiased bg-background text-foreground scroll-smooth">
        <ThemeProvider>
          <FaviconSwitcher />
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

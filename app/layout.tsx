import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import FaviconSwitcher from "@/components/FaviconSwitcher";

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
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo_dark.svg",
    shortcut: "/logo_light.svg",
    apple: "/logo_light.svg",
  },

  /* 🟩 Universal Open Graph (used by WhatsApp, LinkedIn, Instagram, Discord, Telegram, Slack) */
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

  /* 🟦 Twitter (X) Card */
  twitter: {
    card: "summary_large_image",
    title: "Snehashish Mishra | Web Developer Portfolio",
    description:
      "Discover Snehashish's journey in web development. Clean code, modern design, and creative web experiences.",
    creator: "@snehashish_m",
    site: "@snehashish_m",
    images: ["https://snehashish.is-a.dev/og-image.png"],
  },

  /* 🔗 Canonical URL */
  alternates: {
    canonical: "https://snehashish.is-a.dev",
  },

  /* 📱 Apple + Mobile + PWA Friendly */
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
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",

  /* 🎨 Dynamic Browser Theme Colors */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFD700" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
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

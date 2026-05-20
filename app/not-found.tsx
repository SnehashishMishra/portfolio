"use client";

import Link from "next/link";
import { AlertTriangle, BookOpen, House } from "lucide-react";
import { motion } from "motion/react";

import MagneticGrid from "@/components/MagneticGrid";
import { useTheme } from "@/components/theme-provider";

/* ─── 404 Not Found Page ────────────────────────────────────────────────────
 *  This file is the Next.js App Router root "not-found" boundary.
 *  It renders when notFound() is called anywhere in the tree, OR when
 *  the user navigates to a URL that matches no route.
 *
 *  The MagneticGrid background and card colours fully respond to the
 *  portfolio's light / dark theme toggle via useTheme().
 * ─────────────────────────────────────────────────────────────────────────── */

export default function NotFoundPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* ── Theme-keyed design tokens ─────────────────────────────────────────── */
  const tokens = {
    // MagneticGrid
    colorTheme: isDark ? ("cyan" as const) : ("amber" as const),

    // Icon badge
    badgeBg: isDark ? "bg-cyan-500/15" : "bg-amber-500/15",
    badgeRing: isDark ? "ring-cyan-400/30" : "ring-amber-500/30",
    iconColor: isDark ? "text-cyan-400" : "text-[var(--primary)]",

    // "Error 404" label
    labelColor: isDark ? "text-cyan-400/70" : "text-[var(--secondary)]/70",

    // Headline gradient
    headingGradient: isDark
      ? "bg-gradient-to-br from-white via-cyan-100 to-cyan-400"
      : "bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)]",

    // Description text
    descriptionText: isDark ? "text-white/55" : "text-foreground/60",

    // Glass card
    cardBorder: isDark ? "border-white/10" : "border-black/8",
    cardBg: isDark ? "bg-white/5" : "var(--background/50)",

    // Divider
    divider: isDark ? "bg-white/10" : "bg-black/10",

    // Primary CTA (home)
    primaryBtn: isDark
      ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-gray-950 shadow-cyan-500/25 hover:shadow-cyan-400/40"
      : "bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] text-white shadow-amber-500/25 hover:shadow-amber-400/40",

    // Secondary CTA (blogs)
    secondaryBtnBorder: isDark ? "border-white/15" : "border-black/15",
    secondaryBtnBg: isDark ? "bg-white/5" : "bg-black/5",
    secondaryBtnText: isDark ? "text-white/80" : "text-foreground/75",
    secondaryBtnHover: isDark
      ? "hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
      : "hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-foreground",
  };

  return (
    <>
      {/* ── Full-viewport interactive background ── */}
      <div className="fixed inset-0 z-0">
        <MagneticGrid
          key={theme} /* re-mount on theme change so dots re-colour */
          density="balanced"
          colorTheme={tokens.colorTheme}
          interactionMode="repel"
          aurora={false}
          auroraIntensity={isDark ? 0.9 : 0.6}
          radius={170}
          magneticStrength={0.17}
          scaleIntensity={2.3}
          repelZone={0.2}
        />
      </div>

      {/* ── Centred card ── */}
      <main
        className="relative z-10 flex min-h-screen items-center justify-center px-4"
        id="not-found-root"
      >
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`flex w-full max-w-lg flex-col items-center gap-6 rounded-2xl border px-8 py-10 text-center shadow-2xl backdrop-blur-xl backdrop-saturate-150 ${tokens.cardBorder} ${tokens.cardBg}`}
        >
          {/* ── Icon badge ── */}
          <motion.div
            initial={{ scale: 0.6, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 18,
              delay: 0.15,
            }}
            className={`flex h-16 w-16 items-center justify-center rounded-full ring-1 ${tokens.badgeBg} ${tokens.badgeRing}`}
          >
            <AlertTriangle
              className={`h-8 w-8 ${tokens.iconColor}`}
              strokeWidth={1.8}
            />
          </motion.div>

          {/* ── 404 label ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className={`text-xs font-semibold tracking-[0.25em] uppercase ${tokens.labelColor}`}
          >
            Error 404
          </motion.p>

          {/* ── Headline ── */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`bg-clip-text text-3xl leading-tight font-bold tracking-tight text-transparent sm:text-4xl ${tokens.headingGradient}`}
          >
            Page Not Found
          </motion.h1>

          {/* ── Description ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`max-w-xs text-sm leading-relaxed ${tokens.descriptionText}`}
          >
            The page you're looking for doesn't exist, has been removed, or is
            temporarily unavailable. Let me help you find your way back.
          </motion.p>

          {/* ── Divider ── */}
          <div className={`h-px w-16 rounded-full ${tokens.divider}`} />

          {/* ── Action buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex w-full flex-wrap justify-center gap-3"
          >
            {/* Primary — go home */}
            <Link
              href="/"
              id="not-found-home-btn"
              className={`group flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95 ${tokens.primaryBtn}`}
            >
              <House size={15} strokeWidth={2.2} />
              Back to Home
            </Link>

            {/* Secondary — blogs */}
            <Link
              href="/blogs"
              id="not-found-blogs-btn"
              className={`group flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 ${tokens.secondaryBtnBorder} ${tokens.secondaryBtnBg} ${tokens.secondaryBtnText} ${tokens.secondaryBtnHover}`}
            >
              <BookOpen size={15} strokeWidth={2.2} />
              Read Blogs
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}

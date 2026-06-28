"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { Link } from "next-view-transitions";

import { cn } from "@/lib/utils";

import { useTheme } from "./theme-provider";

const NAV_ITEMS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "blogs",
];

export default function Navigation() {
  const [isActive, setIsActive] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  // Track whether viewport is at or above Tailwind's md breakpoint (768px)
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsMd(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Lock/unlock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Detect active section via scroll (only on home page)
  useEffect(() => {
    const isOnBlogsPage =
      pathname === "/blogs" || pathname.startsWith("/blogs/");

    if (isOnBlogsPage) {
      setIsActive("blogs");
      return; // skip scroll listener on blogs pages
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });
      if (current) setIsActive(current);
    };

    // Run once on mount to set initial active state
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Track scrolled state on all pages
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On arriving at "/", poll sessionStorage for a scroll target
  useEffect(() => {
    if (pathname !== "/") return;
    const target = sessionStorage.getItem("scrollTarget");
    if (!target) return;
    sessionStorage.removeItem("scrollTarget");

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const el = document.getElementById(target);
      if (el) {
        clearInterval(interval);
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts >= 20) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pathname]);

  /**
   * Handles navigation for non-blog items.
   * - If already on home page: smooth-scroll to the section.
   * - If on /blogs (or sub-page): navigate to home, then scroll after mount.
   */
  /** True only when the user is on the home page ("/") */
  const isHomePage = pathname === "/";

  const handleSectionNav = (sectionId: string) => {
    if (isHomePage) {
      // Already on home — just scroll to the section
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Any other page — store target in sessionStorage, navigate to "/"
      // This keeps the address bar clean (no /#hash)
      sessionStorage.setItem("scrollTarget", sectionId);
      router.push("/");
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume/resume-snehashish.pdf";
    link.download = "Snehashish_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderNavItem = (item: string, isMobile = false) => {
    const isBlogs = item === "blogs";
    const isItemActive = isActive === item;
    const label = item.charAt(0).toUpperCase() + item.slice(1);
    const commonClass = isMobile
      ? "relative text-lg tracking-wide font-semibold text-muted-foreground hover:text-primary transition-colors"
      : "relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer";

    const underline = (
      <motion.div
        className="from-primary to-secondary absolute right-0 bottom-0 left-0 h-0.5 origin-center bg-linear-to-r"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isItemActive ? 1 : 0,
          opacity: isItemActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    );

    // Blogs always navigates to /blogs
    if (isBlogs) {
      return (
        <Link
          key={item}
          href="/blogs"
          onClick={() => isMobile && setIsOpen(false)}
          className={commonClass}
        >
          {label}
          {underline}
        </Link>
      );
    }

    // When NOT on the home page, use a button that navigates via sessionStorage
    // so the URL stays clean (no /#hash)
    if (!isHomePage) {
      return (
        <button
          key={item}
          onClick={() => {
            handleSectionNav(item);
            if (isMobile) setIsOpen(false);
          }}
          className={commonClass}
        >
          {label}
          {underline}
        </button>
      );
    }

    // On the home page — smooth-scroll button (existing behaviour)
    return (
      <button
        key={item}
        onClick={() => {
          handleSectionNav(item);
          if (isMobile) setIsOpen(false);
        }}
        className={commonClass}
      >
        {label}
        {underline}
      </button>
    );
  };

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 60], [0, 10]);
  const marginLeft = useTransform(scrollY, [0, 60], ["0px", "10px"]);
  const marginRight = useTransform(scrollY, [0, 60], ["0px", "10px"]);
  const borderRadius = useTransform(scrollY, [0, 60], ["0px", "100px"]);
  const borderWidth = useTransform(scrollY, [0, 60], [0, 2]);
  const blurValue = useTransform(scrollY, [0, 60], [0, 12]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <>
      {/* ✅ Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          y: isMd ? 0 : y,
          marginLeft: isMd ? 0 : marginLeft,
          marginRight: isMd ? 0 : marginRight,
          borderRadius: isMd ? 0 : borderRadius,
          borderWidth: isMd ? 0 : borderWidth,
          backdropFilter: filter,
        }}
        className={cn(
          `duration-300, border-accent/20 fixed top-0 right-0 left-0 z-50 transition-all md:border-0`,
          ` ${isScrolled ? "bg-background/60" : "bg-transparent"}`,
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          {/* LOGO */}
          <button
            onClick={() => handleSectionNav("hero")}
            className="cursor-pointer"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
              <Image
                src={theme === "dark" ? "/logo_dark.svg" : "/logo_light.svg"}
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </motion.div>
          </button>

          {/* DESKTOP NAV */}
          <div className="relative hidden gap-8 md:flex">
            {NAV_ITEMS.map((item) => renderNavItem(item, false))}
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden items-center gap-3 md:flex">
            <motion.button
              onClick={downloadResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 hover:border-primary/40 hidden cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all sm:flex"
            >
              <Download className="h-4 w-4" />
              Resume
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary/10 hover:bg-primary/20 text-foreground border-primary/20 hover:border-primary/40 cursor-pointer rounded-full border p-2 transition-all"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>
          </div>

          {/* HAMBURGER BUTTON */}
          <button className="block md:hidden" onClick={() => setIsOpen(true)}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Menu />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* ✅ GLASSMORPHIC HAMBURGER OVERLAY — OUTSIDE NAV */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={isOpen ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        // style={{ backgroundColor: "var(--background)" }}
        className={`from-background via-centre to-background border-border fixed inset-0 z-9999 border-l bg-conic-180 to-90% shadow-2xl backdrop-blur-3xl md:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"} `}
      >
        {/* CLOSE BUTTON */}
        <motion.button
          onClick={() => setIsOpen(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-foreground hover:text-primary absolute top-5 right-4 text-2xl transition-colors"
        >
          <X />
        </motion.button>

        {/* MENU CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex h-full flex-col items-center justify-center gap-6"
        >
          {NAV_ITEMS.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.07 }}
            >
              {renderNavItem(item, true)}
            </motion.div>
          ))}

          <div className="bg-border my-4 h-px w-32"></div>

          <motion.button
            onClick={() => {
              downloadResume();
              setIsOpen(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 w-40 rounded-full border px-4 py-2 font-medium transition-all"
          >
            Resume
          </motion.button>

          <motion.button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-muted text-foreground hover:bg-muted/80 border-border w-40 rounded-full border px-4 py-2 font-medium transition-all"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}

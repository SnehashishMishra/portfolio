"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Download, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function Navigation() {
  const [isActive, setIsActive] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // enable scroll back
    }
  }, [isOpen]);

  useEffect(() => {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume-snehashish.pdf";
    link.download = "Snehashish_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* ✅ Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* LOGO */}
          <motion.button
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <img
              className="w-8 h-8"
              src={theme === "dark" ? "/logo_dark.svg" : "/logo_light.svg"}
              alt="Logo"
            />
          </motion.button>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex gap-8">
            {[
              "hero",
              "about",
              "skills",
              "projects",
              "experience",
              "contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {isActive === item && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary to-secondary"
                  />
                )}
              </button>
            ))}
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={downloadResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium transition-all border border-primary/20 hover:border-primary/40 sm:flex hidden"
            >
              <Download className="w-4 h-4" />
              Resume
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-all border border-border hover:border-primary/40"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* HAMBURGER BUTTON */}
          <button className="md:hidden block" onClick={() => setIsOpen(true)}>
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
        style={{ backgroundColor: "var(--background)" }}
        className={`
        fixed inset-0 z-9999 md:hidden
        bg-background/60 backdrop-blur-3xl shadow-2xl
        border-l border-border
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      >
        {/* CLOSE BUTTON */}
        <motion.button
          onClick={() => setIsOpen(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-5 right-4 text-foreground hover:text-primary transition-colors text-2xl"
        >
          <X />
        </motion.button>

        {/* MENU CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col justify-center items-center h-full gap-6"
        >
          {["hero", "about", "skills", "projects", "experience", "contact"].map(
            (item, index) => (
              <motion.button
                key={item}
                onClick={() => {
                  scrollToSection(item);
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.07 }}
                className="text-lg tracking-wide font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.button>
            )
          )}

          <div className="w-32 h-px bg-border my-4"></div>

          <motion.button
            onClick={() => {
              downloadResume();
              setIsOpen(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-40 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all font-medium"
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
            className="w-40 px-4 py-2 rounded-full bg-muted text-foreground hover:bg-muted/80 border border-border transition-all font-medium"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}

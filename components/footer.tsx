"use client";

import { ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const MotionLink = motion.create(Link);

  return (
    <footer className="border-border bg-background/50 relative border-t backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-12"
        >
          {/* ================= ROW 1 ================= */}
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
            {/* === Quick Links === */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-foreground mb-4 font-semibold">
                Quick Links
              </h3>
              <div className="text-muted-foreground flex flex-col items-center space-y-2 text-sm md:items-start">
                <motion.button
                  onClick={() => scrollTo("about")}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  About
                </motion.button>

                <motion.button
                  onClick={() => scrollTo("skills")}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Skills
                </motion.button>

                <motion.button
                  onClick={() => scrollTo("projects")}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Projects
                </motion.button>
              </div>
            </div>

            {/* === Resources === */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-foreground mb-4 font-semibold">Resources</h3>
              <div className="text-muted-foreground flex flex-col items-center space-y-2 text-sm md:items-start">
                <motion.button
                  onClick={() => scrollTo("contact")}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Contact
                </motion.button>

                <a
                  href="https://github.com/SnehashishMishra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/snehashish-mishra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* === Social Icons === */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-foreground mb-4 font-semibold">Social</h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/SnehashishMishra"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15 }}
                    className="bg-card border-border hover:border-primary hover:bg-primary/10 hover:text-primary text-muted-foreground rounded-lg border p-2 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/snehashish-mishra"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15 }}
                    className="bg-card border-border hover:border-primary hover:bg-primary/10 hover:text-primary text-muted-foreground rounded-lg border p-2 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>

                  <motion.a
                    onClick={() => scrollTo("contact")}
                    whileHover={{ scale: 1.15 }}
                    className="bg-card border-border hover:border-primary hover:bg-primary/10 hover:text-primary text-muted-foreground cursor-pointer rounded-lg border p-2 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </motion.a>
                </div>

                <MotionLink
                  href="/blogs"
                  className="md:text-muted-foreground hover:text-primary group text-primary ml-7 flex items-center justify-center gap-2 text-sm transition-colors md:ml-0 md:items-end md:justify-start"
                >
                  Blogs
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.span>
                </MotionLink>
              </div>
            </div>
          </div>

          {/* ================= ROW 2 ================= */}
          <div className="border-border flex flex-col items-center justify-between gap-3 border-t pt-6 text-center md:flex-row md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Snehashish. All rights reserved.
            </p>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              className="text-primary hover:bg-primary/10 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Back to top ↑
            </motion.button>

            <p className="text-muted-foreground text-sm">
              Designed & Built with ❤️ by Snehashish
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

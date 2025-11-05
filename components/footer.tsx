"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* ================= ROW 1 ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* === Quick Links === */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <div className="space-y-2 text-muted-foreground text-sm flex flex-col items-center md:items-start">
                <motion.button
                  onClick={() => scrollTo("about")}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  About
                </motion.button>

                <motion.button
                  onClick={() => scrollTo("skills")}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Skills
                </motion.button>

                <motion.button
                  onClick={() => scrollTo("projects")}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Projects
                </motion.button>
              </div>
            </div>

            {/* === Resources === */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <div className="space-y-2 text-muted-foreground text-sm flex flex-col items-center md:items-start">
                <motion.button
                  onClick={() => scrollTo("contact")}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-primary transition-colors cursor-pointer"
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
              <h3 className="font-semibold text-foreground mb-4">Social</h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/SnehashishMishra"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/snehashish-mishra"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>

                <motion.a
                  onClick={() => scrollTo("contact")}
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors cursor-pointer"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* ================= ROW 2 ================= */}
          <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Snehashish. All rights reserved.
            </p>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
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

"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="text-lg font-semibold text-primary mb-4">
            Welcome to my portfolio
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4">
            <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Snehashish
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl sm:text-2xl text-muted-foreground mb-4">
            Aspiring Web Developer | MERN Stack | Cloud Enthusiast
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about building modern web experiences with React,
            Next.js, and animated interactions. Currently pursuing a Master's
            degree at SRMIST, Chennai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-full font-semibold hover:shadow-lg transition-all cursor-pointer"
          >
            Explore My Work
          </motion.button>

          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, borderColor: "#06b6d4" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all cursor-pointer"
          >
            Get in Touch
          </motion.button>
        </motion.div>

        <motion.button
          onClick={scrollToProjects}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex justify-center mx-auto cursor-pointer"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.button>
      </div>
    </section>
  );
}

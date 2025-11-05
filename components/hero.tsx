"use client";

import { motion } from "framer-motion";
import { ChevronDown, Mail, Linkedin, Github } from "lucide-react";
import Particles from "./Particles";
import { useTheme } from "@/components/theme-provider";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const { theme } = useTheme();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:snehashishmishra38@gmail.com",
      color: "hover:text-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/snehashish-mishra",
      color: "hover:text-primary",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/SnehashishMishra",
      color: "hover:text-primary",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          key={theme}
          className="w-full h-full"
          particleCount={220}
          particleSpread={12}
          speed={0.12}
          particleBaseSize={120}
          sizeRandomness={1}
          moveParticlesOnHover
          particleHoverFactor={1.3}
          particleColors={[
            theme === "dark" ? "#06b6d4" : "#ff9d00",
            theme === "dark" ? "#0ea5e9" : "#fa812f",
          ]}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="text-lg font-semibold text-primary mb-4">
            Welcome to my portfolio
          </div>
          <h1 className="text-4xl sm:text-7xl font-bold mb-4">
            <TypeAnimation
              sequence={[
                "Snehashish",
                2000,
                "",
                1000,
                "Web Developer",
                2000,
                "",
                1000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              deletionSpeed={10}
              cursor={false}
              className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent inline-block"
            />
            {/* <span className="cursor-blink">|</span> */}
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
          className="flex flex-col sm:flex-row gap-12 justify-center mt-12 mb-7 sm:mb-12"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 sm:px-8 sm:py-3 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-full font-semibold hover:shadow-lg transition-all cursor-pointer"
          >
            Explore My Work
          </motion.button>

          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((link, index) => {
              const isMail = link.label === "Email";

              return isMail ? (
                <motion.button
                  key={index}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full bg-card border border-border transition-colors hover:border-primary ${link.color} cursor-pointer`}
                >
                  <link.icon className="w-6 h-6" />
                </motion.button>
              ) : (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full bg-card border border-border transition-colors hover:border-primary ${link.color} cursor-pointer`}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mx-auto mt-10 cursor-pointer"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.button>
      </div>
    </section>
  );
}

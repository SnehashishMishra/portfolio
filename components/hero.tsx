"use client";

import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";

import { useTheme } from "@/components/theme-provider";

import Particles from "./Particles";

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
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-20 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          key={theme}
          className="h-full w-full"
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

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="text-primary mb-4 text-lg font-semibold">
            Welcome to my portfolio
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-7xl">
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
              className="from-primary via-secondary to-primary inline-block bg-linear-to-r bg-clip-text text-transparent"
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
          <h2 className="text-muted-foreground mb-4 text-xl sm:text-2xl">
            Web Developer | MERN Stack | Cloud Enthusiast
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Passionate about building modern web experiences with React,
            Next.js, and animated interactions. Currently pursuing a Master's
            degree at SRMIST, Chennai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 mb-7 flex flex-col justify-center gap-12 p-10 sm:mb-12 sm:flex-row"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="from-primary to-secondary text-primary-foreground cursor-pointer rounded-full bg-linear-to-r px-6 py-2 font-semibold transition-all hover:shadow-lg sm:px-8 sm:py-3"
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
                  className={`bg-card border-border hover:border-primary rounded-full border p-3 transition-colors ${link.color} cursor-pointer`}
                >
                  <link.icon className="h-6 w-6" />
                </motion.button>
              ) : (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className={`bg-card border-border hover:border-primary rounded-full border p-3 transition-colors ${link.color} cursor-pointer`}
                >
                  <link.icon className="h-6 w-6" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto my-5 flex cursor-pointer justify-center"
        >
          <ChevronDown className="text-primary h-6 w-6" />
        </motion.button>
      </div>
    </section>
  );
}

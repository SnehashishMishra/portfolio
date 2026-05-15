"use client";

import { ExternalLink, Github } from "lucide-react";
import { motion, Variants } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const projects = [
    {
      title: "Ether ML",
      description:
        "A full-stack machine learning platform where users upload datasets, automatically train multiple models, compare results in real time, and download the best performing model through an interactive dashboard.",
      tech: ["Next.js", "FastAPI", "Python", "Scikit-learn", "MongoDB"],
      image: "/etherml-landing-page.png",
      github: "https://github.com/SnehashishMishra/MLModels-frontend",
      demo: "https://etherml.vercel.app",
    },
    {
      title: "E-Notes App",
      description:
        "A modern note-taking application with real-time synchronization, cloud storage, and rich text editing capabilities.",
      tech: ["React", "MongoDB", "Express.JS", "Tailwind CSS"],
      image: "/enotes-landing-page.png",
      github: "https://github.com/SnehashishMishra/eNotes",
      demo: "https://enotesapp.vercel.app",
    },
    {
      title: "E-Commerce Website",
      description:
        "Full-stack e-commerce platform built with MERN stack. Features product browsing, shopping cart, secure checkout, and admin dashboard.",
      tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
      image: "/ecommerce-landing-page.png",
      github: "https://github.com/SnehashishMishra/annapurna_agency",
      demo: "https://annapurnaagency.vercel.app",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <section id="projects" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <div className="from-primary to-secondary h-1 w-20 rounded-full bg-linear-to-r"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                }}
                className="group bg-card border-border hover:border-primary overflow-hidden rounded-lg border transition-all"
              >
                <div className="bg-muted relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="from-background/80 absolute inset-0 bg-linear-to-t to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary/10 text-primary hover:bg-primary/20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    >
                      <Github className="h-4 w-auto" />
                      Code
                    </motion.a>

                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="from-primary to-secondary text-primary-foreground flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-linear-to-r px-4 py-2 text-sm font-medium transition-all hover:shadow-lg"
                    >
                      <ExternalLink className="h-4 w-auto" />
                      Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

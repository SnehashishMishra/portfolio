"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-primary to-secondary rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                }}
                className="group overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
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
                      className="flex justify-center w-full items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium cursor-pointer"
                    >
                      <Github className="w-auto h-4" />
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
                      className="flex justify-center w-full  items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-lg hover:shadow-lg transition-all text-sm font-medium cursor-pointer"
                    >
                      <ExternalLink className="w-auto h-4" />
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

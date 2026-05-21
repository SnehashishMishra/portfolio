"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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
    <section id="about" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="text-primary">About</span> Me
            </h2>
            <div className="from-primary to-secondary h-1 w-20 rounded-full bg-linear-to-r"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm Snehashish, an aspiring web developer pursuing a Master's
                degree at SRMIST, Chennai. I'm passionate about creating
                beautiful, functional web experiences using modern technologies.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                With expertise in the MERN stack (MongoDB, Express, React,
                Node.js), I've built several projects including an E-Notes App
                and an E-Commerce Website. My interest spans across frontend
                development, cloud technologies, and creating smooth, animated
                web experiences.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I recently completed the AWS Cloud Virtual Internship through
                AICTE and EduSkills (Jan–Mar 2025), deepening my knowledge of
                cloud services and scalable architectures.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Projects", value: "5+" },
                { label: "Years Learning", value: "3+" },
                { label: "Technologies", value: "15+" },
                { label: "Freelance Project", value: "1" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card border-border hover:border-primary rounded-lg border p-6 transition-colors"
                >
                  <div className="text-primary mb-2 text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

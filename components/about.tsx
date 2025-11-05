"use client";

import { motion } from "framer-motion";
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-primary">About</span> Me
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-primary to-secondary rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Snehashish, an aspiring web developer pursuing a Master's
                degree at SRMIST, Chennai. I'm passionate about creating
                beautiful, functional web experiences using modern technologies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With expertise in the MERN stack (MongoDB, Express, React,
                Node.js), I've built several projects including an E-Notes App
                and an E-Commerce Website. My interest spans across frontend
                development, cloud technologies, and creating smooth, animated
                web experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
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
                { label: "Years Learning", value: "2+" },
                { label: "Technologies", value: "15+" },
                { label: "Internships", value: "1" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                >
                  <div className="text-2xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
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

"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
    },
    {
      category: "Tools & Cloud",
      skills: ["Git", "AWS", "Sanity.io", "Vercel", "Render"],
    },
    {
      category: "Design & Animation",
      skills: [
        "Figma",
        "CSS Animations",
        "UI/UX",
        "Responsive Design",
        "Web Performance",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="skills"
      className="bg-card/30 relative px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="text-primary">Technical</span> Skills
            </h2>
            <div className="from-primary to-secondary h-1 w-20 rounded-full bg-linear-to-r"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  translateY: -5,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.1)",
                }}
                className="bg-background border-border hover:border-primary rounded-lg border p-6 transition-all"
              >
                <h3 className="text-primary mb-4 text-xl font-bold">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <div className="bg-primary h-2 w-2 rounded-full"></div>
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

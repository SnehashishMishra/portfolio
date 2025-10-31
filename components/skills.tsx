"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
    },
    {
      category: "Tools & Cloud",
      skills: ["Git", "AWS", "Docker", "Firebase", "Vercel"],
    },
    {
      category: "Design & Animation",
      skills: ["Figma", "CSS Animations", "UI/UX", "Responsive Design", "Web Performance"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-primary">Technical</span> Skills
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ translateY: -5, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.1)" }}
                className="p-6 rounded-lg bg-background border border-border hover:border-primary transition-all"
              >
                <h3 className="text-xl font-bold text-primary mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
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
  )
}

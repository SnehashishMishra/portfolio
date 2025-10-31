"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin } from "lucide-react"

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const experiences = [
    {
      title: "AWS Cloud Virtual Internship",
      company: "AICTE & EduSkills",
      period: "Jan – Mar 2025",
      location: "Online",
      description:
        "Completed comprehensive AWS cloud training covering EC2, S3, Lambda, RDS, and other AWS services. Gained hands-on experience with cloud infrastructure and deployment.",
      highlights: ["Cloud Architecture", "AWS Services", "Infrastructure Design", "Best Practices"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-primary">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="relative pl-8 pb-8 border-l-2 border-primary last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full transform -translate-x-2.5"></div>

                <motion.div
                  whileHover={{ boxShadow: "0 10px 30px rgba(6, 182, 212, 0.1)" }}
                  className="p-6 rounded-lg bg-background border border-border"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{experience.title}</h3>
                      <p className="text-primary font-semibold">{experience.company}</p>
                    </div>
                    <div className="mt-4 md:mt-0 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {experience.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{experience.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {experience.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

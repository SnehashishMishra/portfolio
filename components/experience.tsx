"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin } from "lucide-react";

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const timelineRef = useRef<HTMLDivElement>(null);

  // observe scroll progress relative to timelineRef
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.9", "end 0.4"],
  });

  // smooth the growth of the line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.6,
  });

  // beam position (as percentage from top)
  const beamTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const beamTopSmooth = useSpring(beamTop, { stiffness: 120, damping: 28 });

  const experiences = [
    {
      title: "AWS Cloud Virtual Internship",
      company: "AICTE & EduSkills",
      period: "Jan – Mar 2025",
      location: "Online",
      description:
        "Completed comprehensive AWS cloud training covering EC2, S3, Lambda, RDS, and other AWS services. Gained hands-on experience with cloud infrastructure and deployment.",
      highlights: [
        "Cloud Architecture",
        "AWS Services",
        "EC2 & S3",
        "Best Practices",
      ],
    },
    {
      title: "Cloud Computing (Swayam-NPTEL Certification by IIT Kharagpur)",
      company: "AICTE & EduSkills",
      period: "Oct – Oct 2022",
      location: "Remote",
      description:
        "Completed an in-depth course on Cloud Computing, covering fundamental concepts, service models, deployment models, and hands-on labs with leading cloud platforms.",
      highlights: [
        "Cloud Computing",
        "Virtualization",
        "Best Practices",
        "Labs",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-primary">Experience</span> Timeline
            </h2>
            <div className="mx-auto w-32 h-1 bg-linear-to-r from-primary to-secondary rounded-full"></div>
          </motion.div>

          {/* Timeline container */}
          <div ref={timelineRef} className="relative">
            {/* Center Line - spans full height of timeline container and grows */}
            {/* ✅ Mobile Timeline (left side) */}
            <motion.div
              style={{ scaleY }}
              className="absolute left-0 top-0 bottom-0 w-[3px] origin-top bg-gradient-to-b from-primary to-secondary rounded-full md:hidden"
            />

            {/* ✅ Desktop Timeline (center) */}
            <motion.div
              style={{ scaleY }}
              className="hidden md:absolute left-1/2 top-0 bottom-0 w-[3px] origin-top -translate-x-1/2 bg-gradient-to-b from-primary to-secondary rounded-full md:block"
            />

            {/* Scroll Beam - follows progress along the line (top as percent) Shadow afrer the timeline line */}
            {/* <motion.div
              style={{ top: beamTopSmooth }}
              className="absolute left-1/2 -translate-x-1/2 w-10 h-28 rounded-full bg-primary/30 dark:bg-primary/25 blur-xl mix-blend-screen z-10"
            /> */}

            <div className="space-y-16 relative z-20">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className={`md:w-1/2 pl-6 md:pl-0 ${
                      index % 2 === 0 ? "md:pr-10" : "md:pl-10 md:text-right"
                    }`}
                  >
                    <div className="p-6 rounded-xl bg-background border border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-2xl font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-medium mb-2">
                        {exp.company}
                      </p>

                      <div className="flex flex-wrap justify-start md:justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot - positioned exactly at the center line */}
                  <div className="absolute md:left-1/2 left-0.5 top-6 transform md:-translate-x-1/2 -translate-x-1/2">
                    <div className="w-5 h-5 bg-primary rounded-full border-4 border-background shadow-lg" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

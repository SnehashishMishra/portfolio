"use client";

import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.9", "end 0.745"],
  });

  // smooth the growth of the line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.6,
  });

  // beam position (as percentage from top)
  // const beamTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // const beamTopSmooth = useSpring(beamTop, { stiffness: 120, damping: 28 });

  const experiences = [
    {
      title: "Cloud Computing (Swayam-NPTEL Certification by IIT Kharagpur)",
      company: "AICTE & EduSkills",
      period: "Oct - Oct 2022",
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
    {
      title: "Freelance Frontend Developer",
      company: "Ravi Pankha (India) Private Limited",
      period: "Jan - Apr 2024",
      location: "Remote",
      description:
        "Developed and deployed a dynamic web solution using React.js, Tailwind CSS, and Sanity.io, ensuring responsive UI and scalable backend integrations. Collaborated remotely with clients to deliver business-oriented features.",
      highlights: [
        "React.js",
        "Tailwind CSS",
        "Sanity.io",
        "Git",
        "AWS Deployment",
      ],
    },
    {
      title: "AWS Cloud Virtual Internship",
      company: "AICTE & EduSkills",
      period: "Jan - Mar 2025",
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
    <section
      id="experience"
      className="bg-card/30 relative px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="text-primary">Experience</span> Timeline
            </h2>
            <div className="from-primary to-secondary mx-auto h-1 w-32 rounded-full bg-linear-to-r"></div>
          </motion.div>

          {/* Timeline container */}
          <div ref={timelineRef} className="relative">
            {/* Center Line - spans full height of timeline container and grows */}
            {/* ✅ Mobile Timeline (left side) */}
            <motion.div
              style={{ scaleY }}
              className="from-primary to-secondary absolute top-0 bottom-0 left-0 w-0.75 origin-top rounded-full bg-linear-to-b md:hidden"
            />

            {/* ✅ Desktop Timeline (center) */}
            <motion.div
              style={{ scaleY }}
              className="from-primary to-secondary top-0 bottom-0 left-1/2 hidden w-0.75 origin-top -translate-x-1/2 rounded-full bg-linear-to-b md:absolute md:block"
            />

            {/* Scroll Beam - follows progress along the line (top as percent) Shadow afrer the timeline line */}
            {/* <motion.div
              style={{ top: beamTopSmooth }}
              className="absolute left-1/2 -translate-x-1/2 w-10 h-28 rounded-full bg-primary/30 dark:bg-primary/25 blur-xl mix-blend-screen z-10"
            /> */}

            <div className="relative z-20 space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className={`pl-6 md:w-1/2 md:pl-0 ${
                      index % 2 === 0 ? "md:pr-10" : "md:pl-10 md:text-left"
                    }`}
                  >
                    <div className="bg-background border-border rounded-xl border p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                      <h3 className="text-foreground text-2xl font-semibold">
                        {exp.title}
                      </h3>
                      <p className="text-primary mb-2 font-medium">
                        {exp.company}
                      </p>

                      <div className="text-muted-foreground mb-3 flex flex-wrap justify-start gap-4 text-sm md:justify-center lg:justify-start">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
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
                            className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot - positioned exactly at the center line */}
                  <div className="absolute top-6 left-0.5 -translate-x-1/2 transform md:left-1/2 md:-translate-x-1/2">
                    <div className="bg-primary border-background h-5 w-5 rounded-full border-4 shadow-lg" />
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

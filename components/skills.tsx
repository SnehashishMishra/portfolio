"use client";

import { useState } from "react";
import { Cloud, Monitor, Palette, Server, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useInView } from "react-intersection-observer";

interface SkillCategory {
  category: string;
  icon: LucideIcon;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: Monitor,
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
  },
  {
    category: "Tools & Cloud",
    icon: Cloud,
    skills: ["Git", "AWS", "Sanity.io", "Vercel", "Render"],
  },
  {
    category: "Design & Animation",
    icon: Palette,
    skills: [
      "Figma",
      "CSS Animations",
      "UI/UX",
      "Responsive Design",
      "Web Performance",
    ],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = skillCategories[activeIndex];
  const ActiveIcon = activeCategory.icon;

  const headerVariants = {
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
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* ── Section Header ── */}
          <motion.div
            variants={headerVariants}
            className="mb-14 md:text-center"
          >
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="text-primary">Technical</span> Skills
            </h2>
            <div className="from-primary to-secondary h-1 w-32 rounded-full bg-linear-to-r md:mx-auto" />
            <p className="text-muted-foreground mt-4 max-w-lg text-lg md:mx-auto">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </motion.div>

          {/* ── Category Tab Selector ── */}
          <motion.div
            variants={headerVariants}
            className="mb-10 flex justify-center"
          >
            <div className="no-scrollbar border-border bg-background/60 flex gap-2 overflow-x-auto rounded-full border p-1.5 backdrop-blur-sm">
              {skillCategories.map((cat, i) => {
                const Icon = cat.icon;
                const isActive = activeIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative flex w-18 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 md:w-auto md:justify-normal ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {/* Sliding active pill background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillTab"
                        className="from-primary to-secondary absolute inset-0 rounded-full bg-linear-to-r"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{cat.category}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── Skill Showcase Area ── */}
          <div className="border-border bg-background/40 relative min-h-70 overflow-hidden rounded-2xl border backdrop-blur-sm">
            {/* Watermark icon */}
            <div className="pointer-events-none absolute right-4 bottom-4 opacity-[0.04] sm:right-8 sm:bottom-8">
              <ActiveIcon className="h-32 w-32 sm:h-48 sm:w-48" />
            </div>

            <div className="relative z-10 p-6 sm:p-10">
              {/* Category label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${activeIndex}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="mb-6 flex items-center gap-3"
                >
                  <div className="from-primary/20 to-secondary/20 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br">
                    <ActiveIcon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground text-xl font-bold">
                      {activeCategory.category}
                    </h3>
                    {/* <p className="text-muted-foreground text-xs">
                      {activeCategory.skills.length} skills
                    </p> */}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Skill Tiles */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`skills-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-3"
                >
                  {activeCategory.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          delay: idx * 0.07,
                          duration: 0.35,
                          ease: "easeOut" as const,
                        },
                      }}
                      whileHover={{
                        y: -3,
                        boxShadow: "0 8px 25px -5px var(--primary)/20",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group/tile border-border bg-card/70 hover:border-primary/40 active:bg-primary/10 cursor-default rounded-xl border px-5 py-3 transition-colors duration-200 select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="from-primary to-secondary h-2 w-2 rounded-full bg-linear-to-br transition-transform duration-200 group-hover/tile:scale-125" />
                        <span className="text-foreground text-sm font-medium">
                          {skill}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom gradient fade */}
            <div className="from-background/60 pointer-events-none absolute right-0 bottom-0 left-0 h-12 bg-linear-to-t to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

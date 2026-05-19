"use client";

import React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const Subheading = ({
  as: Tag = "h1",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3" | "h4" | "h4" | "h5";
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true }}
    >
      <Tag
        className={cn(
          "from-primary via-secondary to-primary max-w-lg bg-linear-to-r bg-clip-text px-4 pt-4 text-justify text-sm font-semibold text-transparent md:text-sm",
          className,
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default Subheading;

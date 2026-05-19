"use client";

import React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const Heading = ({
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
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <Tag
        className={cn(
          "from-secondary via-primary-blog to-primary bg-linear-to-r bg-clip-text px-4 text-2xl font-bold tracking-tight text-transparent drop-shadow-lg md:text-4xl",
          className,
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default Heading;

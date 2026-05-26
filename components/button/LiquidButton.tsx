"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

// ─── SVG gooey filter ────────────────────────────────────────────────────────
// Rendered once; referenced by id from any LiquidButton on the page.
export function GooeyFilter() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  /** Tailwind bg color for the button pill, e.g. "bg-violet-600" */
  color?: string;
  /** Tailwind text color, e.g. "text-white" */
  textColor?: string;
  /** Tailwind bg color for the blob, defaults to same as color */
  blobColor?: string;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

// ─── Spring config ────────────────────────────────────────────────────────────
const SPRING = { stiffness: 180, damping: 18, mass: 0.8 };

// ─── Component ────────────────────────────────────────────────────────────────
export function LiquidButton({
  children,
  onClick,
  color = "bg-violet-600",
  textColor = "text-white",
  blobColor,
  className = "",
  buttonClassName,
  disabled = false,
}: LiquidButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Spring-tracked cursor position relative to button center (−1 → +1)
  const rawX = useSpring(0, SPRING);
  const rawY = useSpring(0, SPRING);

  // Scale the blob: hidden at rest, expands on hover, nudges toward cursor
  const blobX = useTransform(rawX, (v) => `${v * 70}px`);
  const blobY = useTransform(rawY, (v) => `${v * 10}px`);
  const blobScale = useSpring(0, { stiffness: 260, damping: 22 });

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setHovered(true);
    blobScale.set(1);
  }, [disabled, blobScale]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    blobScale.set(0);
    rawX.set(0);
    rawY.set(0);
  }, [blobScale, rawX, rawY]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!wrapRef.current || disabled) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) / (rect.width / 2));
      rawY.set((e.clientY - cy) / (rect.height / 2));
    },
    [disabled, rawX, rawY],
  );

  const resolvedBlobColor = blobColor ?? color;

  return (
    <div
      ref={wrapRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/*
       * The gooey filter is applied to this wrapper group.
       * Both the pill and the blob must be siblings inside it
       * so their blurred halos can merge.
       */}
      <div
        className="relative"
        style={{ filter: hovered ? "url(#gooey)" : "none" }}
      >
        {/* Blob — trails behind cursor, merges with pill edge */}
        <motion.div
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 left-1/2 rounded-full ${resolvedBlobColor}`}
          style={{
            width: "56px",
            height: "56px",
            marginLeft: "-28px",
            marginTop: "-28px",
            x: blobX,
            y: blobY,
            scale: blobScale,
          }}
        />

        {/* Button pill */}
        <motion.button
          onClick={onClick}
          disabled={disabled}
          whileTap={disabled ? {} : { scale: 0.96 }}
          className={[
            "relative z-10 flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5",
            "font-medium tracking-wide outline-none select-none",
            "transition-opacity duration-150",
            color,
            textColor,
            buttonClassName,
            disabled ? "cursor-not-allowed opacity-40" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </motion.button>
      </div>
    </div>
  );
}

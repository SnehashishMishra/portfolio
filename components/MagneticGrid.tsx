"use client";

import { memo, useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "motion/react";

/* ─── Types ─────────────────────────────────────────────── */

type Density = "balanced" | "dense" | "ultra";
type InteractionMode = "mixed" | "attract" | "repel";
type ColorTheme = "indigo" | "cyan" | "white" | "amber";

type MagneticGridProps = {
  density?: Density;
  interactionMode?: InteractionMode;
  scaleIntensity?: number;
  radius?: number;
  magneticStrength?: number;
  repelZone?: number;
  colorTheme?: ColorTheme;
  aurora?: boolean;
  auroraIntensity?: number;
  className?: string;
};

type DotData = { id: number; x: number; y: number };

/* ─── Config maps ────────────────────────────────────────── */

const densityMap: Record<Density, number> = {
  balanced: 32, // slightly sparser for the portfolio – better perf
  dense: 22,
  ultra: 16,
};

/* Each entry carries pre-built colour strings used by the Dot component.
 * For amber we use color-mix() so the dots always follow var(--primary)
 * from the portfolio CSS variables — no hardcoded hex required.           */
const colorMap: Record<
  ColorTheme,
  {
    dotFull: string; // dot background at full opacity
    glowStrong: string; // box-shadow inner glow
    glowSoft: string; // box-shadow outer glow
    aura1: string;
    aura2: string;
  }
> = {
  indigo: {
    dotFull: "rgba(176,160,255,1)",
    glowStrong: "rgba(124,92,255,0.55)",
    glowSoft: "rgba(124,92,255,0.18)",
    aura1: "rgba(124,92,255,0.18)",
    aura2: "rgba(90,58,255,0.13)",
  },
  cyan: {
    dotFull: "rgba(120,240,255,1)",
    glowStrong: "rgba(0,200,255,0.55)",
    glowSoft: "rgba(0,200,255,0.18)",
    aura1: "rgba(0,200,255,0.18)",
    aura2: "rgba(0,140,255,0.13)",
  },
  white: {
    dotFull: "rgba(255,255,255,1)",
    glowStrong: "rgba(210,210,255,0.55)",
    glowSoft: "rgba(210,210,255,0.18)",
    aura1: "rgba(255,255,255,0.14)",
    aura2: "rgba(180,180,255,0.10)",
  },
  // Light mode — follows var(--primary) / var(--secondary) exactly
  amber: {
    dotFull: "color-mix(in srgb, var(--primary) 100%, transparent)",
    glowStrong: "color-mix(in srgb, var(--primary) 55%, transparent)",
    glowSoft: "color-mix(in srgb, var(--secondary) 18%, transparent)",
    aura1: "color-mix(in srgb, var(--primary) 18%, transparent)",
    aura2: "color-mix(in srgb, var(--secondary) 13%, transparent)",
  },
};

/* ─── Single Dot ─────────────────────────────────────────── */

type DotProps = {
  x: number;
  y: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  radius: number;
  magneticStrength: number;
  interactionMode: InteractionMode;
  scaleIntensity: number;
  repelZone: number;
  colorTheme: ColorTheme;
};

const Dot = memo(function Dot({
  x,
  y,
  mouseX,
  mouseY,
  radius,
  magneticStrength,
  interactionMode,
  scaleIntensity,
  repelZone,
  colorTheme,
}: DotProps) {
  const springX = useSpring(0, { stiffness: 200, damping: 22, mass: 0.4 });
  const springY = useSpring(0, { stiffness: 200, damping: 22, mass: 0.4 });
  const scale = useSpring(1, { stiffness: 220, damping: 22 });
  const opacity = useSpring(0.13, { stiffness: 160, damping: 26 });

  useEffect(() => {
    return mouseX.on("change", (mx) => {
      const my = mouseY.get();
      const dx = mx - x;
      const dy = my - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > radius) {
        springX.set(0);
        springY.set(0);
        scale.set(1);
        opacity.set(0.13);
        return;
      }

      const normalized = distance / radius;
      // Gaussian falloff
      const influence = Math.exp(-(normalized * normalized * 2.4));
      const repelDistance = radius * repelZone;

      let direction = 1;
      if (interactionMode === "mixed") {
        direction = distance < repelDistance ? -1 : 1;
      } else if (interactionMode === "repel") {
        direction = -1;
      }

      const strength = magneticStrength * influence * direction;
      springX.set(dx * strength);
      springY.set(dy * strength);
      scale.set(1 + influence * (scaleIntensity - 1));
      opacity.set(0.1 + influence * 0.9);
    });
  }, [
    mouseX,
    mouseY,
    x,
    y,
    radius,
    magneticStrength,
    interactionMode,
    scaleIntensity,
    repelZone,
    springX,
    springY,
    scale,
    opacity,
  ]);

  const colors = colorMap[colorTheme];

  return (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={{
        left: x,
        top: y,
        x: springX,
        y: springY,
        scale,
        opacity,
        width: 4,
        height: 4,
        background: colors.dotFull,
        boxShadow: `0 0 8px ${colors.glowStrong}, 0 0 18px ${colors.glowSoft}`,
      }}
    />
  );
});

/* ─── Grid ───────────────────────────────────────────────── */

export default function MagneticGrid({
  density = "balanced",
  interactionMode = "mixed",
  scaleIntensity = 2.4,
  radius = 160,
  magneticStrength = 0.16,
  repelZone = 0.18,
  colorTheme = "cyan",
  aurora = true,
  auroraIntensity = 0.85,
  className = "",
}: MagneticGridProps) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const leave = () => {
      mouseX.set(-9999);
      mouseY.set(-9999);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [mouseX, mouseY]);

  const dots = useMemo<DotData[]>(() => {
    if (viewport.width === 0) return [];
    const gap = densityMap[density];
    const generated: DotData[] = [];
    let id = 0;
    for (let y = 0; y <= viewport.height; y += gap) {
      for (let x = 0; x <= viewport.width; x += gap) {
        generated.push({ id: id++, x, y });
      }
    }
    return generated;
  }, [density, viewport.width, viewport.height]);

  const colors = colorMap[colorTheme];

  return (
    <div
      className={`bg-background absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Base radial background — adapts via CSS variables */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--background-container)_0%,var(--background)_55%,var(--background)_100%)]" />

      {/* Aurora blobs */}
      {aurora && (
        <>
          <motion.div
            className="absolute top-[-12%] left-[-22%] h-168 w-4xl rounded-full blur-[110px]"
            style={{ background: colors.aura1, opacity: auroraIntensity }}
            animate={{ x: [0, 110, 0], y: [0, 45, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[-12%] bottom-[-12%] h-136 w-136 rounded-full blur-[110px]"
            style={{ background: colors.aura2, opacity: auroraIntensity }}
            animate={{ x: [0, -70, 0], y: [0, -35, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Dots */}
      {dots.map((dot) => (
        <Dot
          key={dot.id}
          x={dot.x}
          y={dot.y}
          mouseX={mouseX}
          mouseY={mouseY}
          radius={radius}
          magneticStrength={magneticStrength}
          interactionMode={interactionMode}
          scaleIntensity={scaleIntensity}
          repelZone={repelZone}
          colorTheme={colorTheme}
        />
      ))}

      {/* Vignette overlay — dark themes get the deep black mask;
           amber (light mode) gets a soft warm-neutral edge fade only */}
      {colorTheme === "amber" ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,color-mix(in_srgb,var(--background)_60%,transparent)_100%)]" />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.72)_100%)]" />
      )}
    </div>
  );
}

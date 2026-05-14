"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PILLARS } from "@/lib/pillars";

export function ThreePillars() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const xLeft = useTransform(scrollYProgress, [0.2, 0.7], [-200, 0]);
  const xRight = useTransform(scrollYProgress, [0.2, 0.7], [200, 0]);
  const scaleSide = useTransform(scrollYProgress, [0.2, 0.7], [1, 0.7]);
  const opacitySide = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);
  const opacityLogo = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const scaleLogo = useTransform(scrollYProgress, [0.65, 0.85], [0.6, 1]);

  return (
    <section
      id="scene-pillars"
      aria-label="Três pilares"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-20 mx-auto max-w-3xl text-[clamp(2rem,4vw,3.5rem)] font-extralight leading-tight tracking-tight">
          Plataforma de IA para serviços e processos.
        </h2>

        <div className="relative mx-auto flex h-80 w-full max-w-3xl items-center justify-center">
          <motion.div
            style={{ x: xLeft, scale: scaleSide, opacity: opacitySide }}
            className="absolute left-0 size-56 rounded-full bg-gradient-to-br from-blue-400/40 to-blue-600/20 shadow-[0_0_80px_rgba(59,130,246,0.35)]"
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <p className="text-2xl font-light">{PILLARS[0].title}</p>
              <p className="mt-2 px-2 text-center text-xs text-text-muted">{PILLARS[0].sub}</p>
            </div>
          </motion.div>

          <motion.div
            style={{ x: xRight, scale: scaleSide, opacity: opacitySide }}
            className="absolute right-0 size-56 rounded-full border border-border bg-gradient-to-br from-surface-2 to-black shadow-[0_0_60px_rgba(0,0,0,0.6)]"
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <p className="text-2xl font-light">{PILLARS[1].title}</p>
              <p className="mt-2 px-2 text-center text-xs text-text-muted">{PILLARS[1].sub}</p>
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scaleLogo, opacity: opacityLogo }}
            className="absolute size-72 rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_120px_var(--color-accent-glow)]"
          >
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/80">Desk Manager</p>
              <p className="mt-3 text-2xl font-light text-white">{PILLARS[2].title}</p>
              <p className="mt-2 text-xs text-white/70">{PILLARS[2].sub}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

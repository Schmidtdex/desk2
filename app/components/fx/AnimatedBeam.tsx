"use client";

import { motion } from "motion/react";

type Point = { x: number; y: number };

export function AnimatedBeam({
  from,
  to,
  delay = 0,
  duration = 1.2,
  color = "var(--color-accent)",
}: {
  from: Point;
  to: Point;
  delay?: number;
  duration?: number;
  color?: string;
}) {
  const midX = (from.x + to.x) / 2;
  const d = `M ${from.x} ${from.y} Q ${midX} ${from.y - 40}, ${to.x} ${to.y}`;
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.6 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: "easeOut" }}
    />
  );
}

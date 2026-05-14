"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
};

export function MagneticButton({ children, className, onClick, strength = 0.35 }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(dx * strength);
    my.set(dy * strength);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-accent px-10 py-5 text-lg font-semibold text-white shadow-[0_0_80px_var(--color-accent-glow)] transition-shadow hover:shadow-[0_0_120px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        className
      )}
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-accent blur-2xl opacity-50" />
      {children}
    </motion.button>
  );
}

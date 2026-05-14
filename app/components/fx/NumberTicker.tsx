"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  durationMs?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function NumberTicker({ value, durationMs = 1800, suffix = "", prefix = "", className }: Props) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const obs = new IntersectionObserver(
      (entries) => {
        if (started.current) return;
        if (entries.some((e) => e.isIntersecting)) {
          started.current = true;
          if (prefersReduced) {
            setDisplay(value);
            return;
          }
          const start = performance.now();
          function tick(now: number) {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}
      {display.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

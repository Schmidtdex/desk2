"use client";

import { useEffect, useRef, useState } from "react";

export function parseAnimatable(
  v: string,
): { prefix: string; n: number; suffix: string } | null {
  const m = v.match(/^([+\-~]?)(\d+)(K|%|)$/);
  if (!m) return null;
  return { prefix: m[1], n: parseInt(m[2]), suffix: m[3] };
}

export function useCountUp(target: number, enabled: boolean, duration = 950): number {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!enabled) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, enabled]);
  return val;
}

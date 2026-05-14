"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      ScrollTrigger = stMod.ScrollTrigger;
      gsapMod.gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsapMod.gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsapMod.gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger?.killAll();
    };
  }, []);

  return <>{children}</>;
}

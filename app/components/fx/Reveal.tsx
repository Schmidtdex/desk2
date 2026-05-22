"use client";

import { useEffect } from "react";

/**
 * Adds the `in` class to all `.reveal` elements when they enter the viewport.
 * Respects prefers-reduced-motion via the CSS rule in globals.css.
 * Render once near the top of any page that uses .reveal animations.
 */
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 120px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

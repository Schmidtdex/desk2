"use client";

import { useEffect, useRef } from "react";
import { PHASES } from "@/esm/lib/data";

/**
 * Steps grid — same template as ITSM's StepsGrid (4-card horizontal,
 * animated top rule, progressive dot ignition). ESM uses different
 * phase names because the rollout is corporate, not IT-departmental.
 */
export default function StepsGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");

      if (prefersReduced) {
        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>(".step-card", root);
          gsap.to(cards, { opacity: 1, duration: 0.25, stagger: 0.05, ease: "power1.out" });
          gsap.to(
            root.querySelectorAll(".step-rule"),
            { scaleX: 1, duration: 0.35, stagger: 0.05, ease: "power1.out" },
          );
        }, root);
        cleanup = () => ctx.revert();
        return;
      }

      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".step-card", root);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
          defaults: { ease: "power3.out" },
        });

        cards.forEach((card, i) => {
          const offset = i * 0.12;
          tl.fromTo(
            card,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.7 },
            offset,
          );
          tl.fromTo(
            card.querySelector(".step-rule"),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
            offset + 0.1,
          );
          tl.fromTo(
            card.querySelector(".step-num"),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6 },
            offset + 0.15,
          );
          tl.fromTo(
            card.querySelectorAll(".step-body > *"),
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
            offset + 0.3,
          );
        });
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        steps-grid relative grid grid-cols-1 gap-px overflow-hidden rounded-3xl
        border border-border bg-border md:grid-cols-2 xl:grid-cols-4
      "
    >
      {PHASES.map((s) => (
        <article
          key={s.num}
          className="
            step-card relative z-10 flex min-h-[320px] flex-col bg-bg
            px-7 pt-8 pb-10 transition-colors duration-300 hover:bg-surface
          "
          style={{ opacity: 0 }}
        >
          <span
            aria-hidden="true"
            className="
              step-rule absolute left-0 right-0 top-0 h-[2px] origin-left
              bg-gradient-to-r from-accent via-accent-2 to-transparent
            "
            style={{ transform: "scaleX(0)" }}
          />

          <div className="step-num relative text-[3.5rem] font-extralight leading-none tracking-[-0.05em]">
            {s.num}
          </div>

          <div className="step-body">
            <h3 className="mt-5 text-[1.35rem] tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-text-muted">
              {s.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

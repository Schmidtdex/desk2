"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_METRICS, type HeroMetric } from "@/esm/lib/data";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * ESM metrics band — four equal columns with consistent visual weight.
 * GSAP staggered entrance with an accent rule rising above each metric.
 * Numeric metrics count up in sync with the scroll-trigger reveal.
 */
export default function Metrics() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};

    (async () => {
      const { gsap } = await import("gsap");

      if (prefersReduced) {
        const ctx = gsap.context(() => {
          gsap.set(root.querySelectorAll<HTMLElement>("[data-metric-cell]"), { opacity: 1 });
          gsap.set(root.querySelectorAll<HTMLElement>("[data-metric-rule]"), { scaleX: 1 });
        }, root);
        setActive(true);
        cleanup = () => ctx.revert();
        return;
      }

      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const cells = gsap.utils.toArray<HTMLElement>("[data-metric-cell]", root);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
          onStart: () => setActive(true),
          defaults: { ease: "power3.out" },
        });

        cells.forEach((cell, i) => {
          const offset = i * 0.1;
          tl.fromTo(
            cell,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7 },
            offset,
          );
          tl.fromTo(
            cell.querySelector("[data-metric-rule]"),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
            offset + 0.08,
          );
        });
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      aria-label="Escala da operação ESM"
      className="
        relative border-y border-border px-6 py-16 md:py-20
        bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(26,77,255,0.08),transparent_70%)]
      "
    >
      <div
        ref={rootRef}
        className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px bg-border md:grid-cols-4"
      >
        {HERO_METRICS.map((m, i) => (
          <MetricCell key={i} metric={m} animateCounter={active} />
        ))}
      </div>
    </section>
  );
}

function MetricCell({
  metric,
  animateCounter,
}: {
  metric: HeroMetric;
  animateCounter: boolean;
}) {
  const counted = useCountUp(metric.count ?? 0, animateCounter && !!metric.count, 1100);

  return (
    <div
      data-metric-cell
      className="relative flex flex-col bg-bg px-6 py-8 md:px-8 md:py-10"
      style={{ opacity: 0 }}
    >
      <span
        aria-hidden="true"
        data-metric-rule
        className="
          mb-6 block h-px w-12 origin-left
          bg-gradient-to-r from-accent via-accent-2 to-transparent
        "
        style={{ transform: "scaleX(0)" }}
      />

      <div
        className="
          text-[clamp(2.5rem,5vw,3.75rem)] font-extralight leading-none
          tabular-nums tracking-[-0.04em] text-text
        "
      >
        {renderMetricValue(metric, counted)}
      </div>

      <div className="mt-4 max-w-[230px] text-[0.92rem] leading-snug text-text-muted">
        {metric.label}
      </div>
    </div>
  );
}

function renderMetricValue(metric: HeroMetric, counted: number) {
  if (!metric.count) return metric.value;
  const prefix = metric.value.startsWith("+") ? "+" : "";
  const suffix = metric.suffix && metric.suffix !== "+" ? metric.suffix : "";
  return `${prefix}${counted}${suffix}`;
}

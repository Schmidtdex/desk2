"use client";

import { useEffect, useRef } from "react";
import { TIMELINE } from "@/lib/timeline";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const totalScroll = track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      id="scene-timeline"
      aria-label="Linha do tempo Desk Manager"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-bg"
    >
      <div className="absolute inset-x-0 top-12 z-10 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Nossa história</p>
        <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,3rem)] font-extralight tracking-tight">
          Evolução dos produtos · 2009 → 2025
        </h2>
      </div>

      <div ref={trackRef} className="absolute inset-y-0 left-0 flex items-center gap-12 pl-[10vw] pr-[10vw] will-change-transform">
        {TIMELINE.map((m) => (
          <article key={m.year} className="flex w-[420px] shrink-0 flex-col gap-6">
            <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/30 via-surface to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(26,77,255,0.4),transparent_60%)]" />
              <div className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-white/70">
                {m.tag}
              </div>
            </div>
            <div>
              <p className="font-mono text-5xl font-light text-accent">{m.year}</p>
              <p className="mt-3 text-xl font-light">{m.title}</p>
              <p className="mt-2 text-sm text-text-muted">{m.sub}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

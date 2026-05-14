"use client";

import { useEffect, useRef } from "react";
import { CASES } from "@/lib/cases";

export function CasesSticky() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = section.querySelectorAll<HTMLElement>("[data-case]");
      const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];
      cards.forEach((card) => {
        const t = ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
        triggers.push(t);
      });

      cleanup = () => triggers.forEach((t) => t.kill());
    })();

    return () => cleanup();
  }, []);

  return (
    <section id="scene-cases" aria-label="Casos de sucesso" ref={sectionRef} className="relative">
      {CASES.map((c) => (
        <div
          key={c.slug}
          data-case
          className="relative flex h-screen w-full items-center overflow-hidden px-6 py-12"
          style={{ background: `linear-gradient(135deg, hsl(${c.hue} 50% 8%) 0%, var(--color-bg) 60%)` }}
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Caso de uso · {c.brand}</p>
              <h3 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-extralight leading-[1.05] tracking-tight">
                {c.headline}
              </h3>
              <p className="mt-6 max-w-md text-lg text-text-muted">{c.quote}</p>
            </div>
            <div className="grid content-center gap-6">
              {c.kpis.map((k) => (
                <div key={k.label} className="border-l-2 border-accent pl-6">
                  <p className="text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-none tracking-tight text-accent">
                    {k.value}
                  </p>
                  <p className="mt-2 text-sm text-text-muted">{k.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

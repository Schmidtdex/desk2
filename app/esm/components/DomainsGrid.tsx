"use client";

import { useEffect, useRef } from "react";
import { ESM_DOMAINS } from "@/esm/lib/data";

const GROUPS = ESM_DOMAINS.groups;

/**
 * Domains bento — same Ring 2 anatomy as ITSM's PracticesGrid
 * (2x2 cells, each cell is a category with a list of items),
 * but instead of ITIL practices the cells are corporate domains:
 * Gente & cultura, Operação física, Risco & contrato, Negócio & receita.
 */
export default function DomainsGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const cells = gsap.utils.toArray<HTMLElement>(".bento-cell", root);

      if (prefersReduced) {
        gsap.to(cells, { opacity: 1, duration: 0.25, stagger: 0.06 });
        return;
      }

      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          cells,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: root, start: "top 78%", once: true },
          },
        );
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      id="dominios"
      aria-label="Domínios corporativos cobertos pela plataforma"
      className="relative px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="reveal mx-auto mb-14 max-w-[860px] text-center md:mb-20">
          <h2 className="text-[clamp(2.2rem,4vw,3.4rem)] font-extralight leading-[1.05] tracking-tight">
            <em className="not-italic text-accent-2">Quatro domínios</em>, uma plataforma
            <br className="hidden md:block" />
            Mesma operação, áreas diferentes
          </h2>
          <p className="mx-auto mt-6 max-w-[58ch] text-[1rem] leading-relaxed text-text-muted">
            {ESM_DOMAINS.asideBody}
          </p>
        </div>

        {/* 2x2 bento — each cell is a corporate domain */}
        <div
          ref={rootRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
        >
          {GROUPS.map((g) => (
            <article
              key={g.domain}
              className="bento-cell"
              style={{ opacity: 0 }}
            >
              <header className="bento-head">
                <h3 className="bento-cat">{g.domain}</h3>
                <p className="bento-lead">{g.lead}</p>
              </header>

              <ul className="bento-list">
                {g.practices.map((p) => (
                  <li key={p.title} className="bento-item">
                    <h4 className="bento-item-title">{p.title}</h4>
                    <div className="bento-item-desc-wrap">
                      <p className="bento-item-desc">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

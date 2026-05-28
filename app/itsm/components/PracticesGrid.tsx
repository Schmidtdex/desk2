"use client";

import { useEffect, useRef } from "react";
import { ANCHOR_ITSM } from "@/itsm/lib/data";

const GROUPS = ANCHOR_ITSM.groups;

const GROUP_LEAD: Record<string, string> = {
  "Operação": "Tudo que precisa estar em pé hoje",
  "Mudança & ativos": "Quem muda o que, com qual risco",
  "Experiência": "A camada que toca o usuário final",
  "Governança": "Visibilidade executiva e maturidade",
};

export default function PracticesGrid() {
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
      id="praticas"
      aria-label="Práticas ITIL certificadas"
      className="relative scroll-mt-32 px-6 py-20 md:scroll-mt-40 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="reveal mx-auto mb-14 max-w-[820px] text-center md:mb-20">
          <h2 className="text-[clamp(2.2rem,4vw,3.4rem)] font-extralight leading-[1.05] tracking-tight">
            As <em className="not-italic text-accent-2">12 práticas</em> ITIL com IA aplicada
            <br className="hidden md:block" />
            na operação, não na consultoria
          </h2>
          <p className="mx-auto mt-6 max-w-[58ch] text-[1rem] leading-relaxed text-text-muted">
            {ANCHOR_ITSM.asideBody}
          </p>
        </div>

        {/* 2x2 bento grid — each cell is a category */}
        <div
          ref={rootRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
        >
          {GROUPS.map((g) => (
            <article
              key={g.cat}
              className="bento-cell"
              style={{ opacity: 0 }}
            >
              <header className="bento-head">
                <h3 className="bento-cat">{g.cat}</h3>
                <p className="bento-lead">{GROUP_LEAD[g.cat]}</p>
              </header>

              <ul className="bento-list">
                {g.practices.map((p) => (
                  <li key={p.title} className="bento-item">
                    <h4 className="bento-item-title">{p.title}</h4>
                    <div className="bento-item-desc-wrap">
                      <p className="bento-item-desc">{p.body}</p>
                      <ul className="bento-item-bullets">
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
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

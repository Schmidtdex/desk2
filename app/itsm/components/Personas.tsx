"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Section from "./Section";
import { PERSONAS } from "@/itsm/lib/data";

export default function Personas() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-persona-card]", root);

        if (prefersReduced) {
          gsap.set(cards, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
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
    <Section
      id="personas"
      centered
      className="scroll-mt-32 md:scroll-mt-40"
      title={
        <>
          ITSM com leitura<br />
          em <em className="not-italic text-accent-2">três alturas</em>
        </>
      }
      lead="Do C-level ao time operacional, a Desk Manager entrega o nível certo de visibilidade, controle e ferramenta pra cada camada da TI."
    >
      <div ref={rootRef} className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
        {PERSONAS.map((p) => (
          <article
            key={p.level}
            data-persona-card
            className="
              group relative flex flex-col overflow-hidden rounded-2xl
              border border-border bg-surface opacity-0
              transition-[border-color,box-shadow] duration-300 ease-out
              hover:border-accent-2/40
              hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18)]
            "
          >
            {p.image ? (
              <div className="relative aspect-16/10 overflow-hidden bg-bg">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="
                    object-cover object-top
                    transition-transform duration-700 ease-out
                    group-hover:scale-[1.03]
                  "
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-accent-2/40 to-transparent"
                />
              </div>
            ) : null}

            <div className="flex flex-1 flex-col p-8">
              <h3 className="text-[2rem] font-extralight leading-[1.05] tracking-[-0.02em]">
                {p.level}
              </h3>
              <p className="mt-2 text-[0.92rem] leading-snug text-text-muted">
                {p.roles}
              </p>
              <p className="mt-7 text-[1rem] leading-relaxed text-text-muted">
                {p.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

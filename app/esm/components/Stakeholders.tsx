"use client";

import { useEffect, useRef } from "react";
import { STAKEHOLDERS } from "@/esm/lib/data";

/**
 * Stakeholders (C-level audience for ESM).
 * Custom layout — does NOT use the shared Section component because the
 * title is a two-line statement that needs its own line-break rhythm and
 * the card row is animated with GSAP (cards rise, hairline expands,
 * role number ticks in).
 */
export default function Stakeholders() {
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
          gsap.to(root.querySelectorAll<HTMLElement>("[data-sh-card]"), {
            opacity: 1,
            duration: 0.25,
            stagger: 0.05,
          });
          gsap.to(root.querySelectorAll<HTMLElement>("[data-sh-rule]"), {
            scaleX: 1,
            duration: 0.35,
            stagger: 0.05,
          });
        }, root);
        cleanup = () => ctx.revert();
        return;
      }

      const ctx = gsap.context(() => {
        // Title lines reveal
        gsap.fromTo(
          root.querySelectorAll<HTMLElement>("[data-sh-line]"),
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: root, start: "top 78%", once: true },
          },
        );

        // Lead body
        gsap.fromTo(
          root.querySelector("[data-sh-lead]"),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.35,
            scrollTrigger: { trigger: root, start: "top 78%", once: true },
          },
        );

        // Card row stagger
        const cards = gsap.utils.toArray<HTMLElement>("[data-sh-card]", root);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-sh-grid]", start: "top 82%", once: true },
          defaults: { ease: "power3.out" },
        });

        cards.forEach((card, i) => {
          const offset = i * 0.1;
          tl.fromTo(
            card,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.75 },
            offset,
          );
          tl.fromTo(
            card.querySelector("[data-sh-role]"),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.55 },
            offset + 0.1,
          );
          tl.fromTo(
            card.querySelector("[data-sh-rule]"),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
            offset + 0.15,
          );
          tl.fromTo(
            card.querySelectorAll<HTMLElement>("[data-sh-body] > *"),
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
            offset + 0.28,
          );
        });
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      id="stakeholders"
      ref={rootRef}
      aria-labelledby="stakeholders-heading"
      className="band-soft relative px-6 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header — two-line title with measured line-break */}
        <div className="mx-auto mb-16 max-w-[860px] text-center md:mb-24">
          <h2
            id="stakeholders-heading"
            className="text-[clamp(2.25rem,5vw,3.75rem)] font-extralight leading-[1.04] tracking-[-0.025em]"
          >
            <span data-sh-line className="block opacity-0">
              O problema não é mais um departamento,
            </span>
            <span data-sh-line className="mt-2 block opacity-0">
              é <em className="not-italic text-accent-2">a empresa inteira</em>{" "}
              desconectada.
            </span>
          </h2>

          <p
            data-sh-lead
            className="mx-auto mt-10 max-w-[640px] text-[1.08rem] leading-relaxed text-text-muted opacity-0"
          >
            ESM não é uma compra de TI. É uma decisão de modelo operacional.
            Quando entra na pauta, entra pelo C-level, cada um pelo ângulo que
            enxerga primeiro.
          </p>
        </div>

        {/* Card row */}
        <div
          data-sh-grid
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6"
        >
          {STAKEHOLDERS.map((s, i) => (
            <article
              key={s.role}
              data-sh-card
              className="
                group relative flex flex-col overflow-hidden rounded-2xl
                border border-border bg-surface
                p-7 md:p-8
                transition-[background,border-color,box-shadow] duration-300 ease-out
                hover:border-accent-2/45
                hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_24px_48px_-12px_rgba(26,77,255,0.18)]
              "
              style={{ opacity: 0 }}
            >
              {/* Index numeral, top-right */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none absolute right-5 top-5
                  font-mono text-[0.72rem] tracking-[0.22em] text-text-muted/70
                "
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Role: large display */}
              <h3
                data-sh-role
                className="
                  text-[2rem] font-extralight leading-none tracking-[-0.03em]
                  opacity-0
                "
              >
                {s.role}
              </h3>

              {/* Animated accent rule */}
              <span
                aria-hidden="true"
                data-sh-rule
                className="
                  mt-6 block h-px w-12 origin-left
                  bg-gradient-to-r from-accent via-accent-2 to-transparent
                  transition-[width] duration-300 ease-out
                  group-hover:w-20
                "
                style={{ transform: "scaleX(0)" }}
              />

              <div
                data-sh-body
                className="mt-6 flex flex-col gap-3"
              >
                <p className="text-[1.04rem] leading-snug tracking-[-0.01em] text-text">
                  {s.pain}.
                </p>
                <p className="text-[0.92rem] leading-relaxed text-text-muted">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

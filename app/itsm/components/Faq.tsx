"use client";

import { useEffect, useRef, useState } from "react";
import { FAQS } from "@/itsm/lib/data";

export default function Faq() {
  const [open, setOpen] = useState<number>(-1);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      FAQS.forEach((_, i) => {
        const panel = panelRefs.current[i];
        const inner = innerRefs.current[i];
        if (!panel || !inner) return;
        const isOpen = open === i;

        gsap.killTweensOf([panel, inner]);

        // Reduced motion: short fade + height tween, no Y translation
        const openDur = prefersReduced ? 0.22 : 0.55;
        const closeDur = prefersReduced ? 0.18 : 0.45;
        const ease = prefersReduced ? "power1.out" : "power3.inOut";

        if (isOpen) {
          const target = inner.offsetHeight;
          gsap.fromTo(
            panel,
            { height: panel.offsetHeight },
            {
              height: target,
              duration: openDur,
              ease,
              onComplete: () => { panel.style.height = "auto"; },
            },
          );
          gsap.fromTo(
            inner,
            { opacity: 0, y: prefersReduced ? 0 : 8 },
            { opacity: 1, y: 0, duration: openDur * 0.7, ease: "power2.out", delay: prefersReduced ? 0 : 0.1 },
          );
        } else {
          gsap.to(panel, { height: 0, duration: closeDur, ease });
          gsap.to(inner, {
            opacity: 0,
            y: prefersReduced ? 0 : -4,
            duration: closeDur * 0.5,
            ease: "power2.in",
          });
        }
      });
    })();

    return () => { cancelled = true; };
  }, [open]);

  return (
    <section id="faq" aria-label="Perguntas frequentes" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="reveal mx-auto mb-14 max-w-[680px] text-center md:mb-20">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extralight leading-[1.05] tracking-tight">
            Perguntas{" "}
            <em className="not-italic text-accent-2">frequentes</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-[1rem] leading-relaxed text-text-muted">
            Cinco anos respondendo CIOs, gerentes de service desk e times de
            compliance. Se a sua pergunta não está aqui, é porque ainda não
            ouvimos. Fale com nosso time.
          </p>
        </div>

        <div
          className="reveal mx-auto flex max-w-[860px] flex-col"
          style={{ "--delay": "120ms" } as React.CSSProperties}
        >
          <div className="flex flex-col">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                const btnId = `faq-btn-${i}`;
                const panelId = `faq-panel-${i}`;
                return (
                  <div
                    key={f.q}
                    className={[
                      "faq-row group border-t border-border px-2 py-6 -mx-2 rounded",
                      "transition-[background] duration-150 ease-out hover:bg-white/[0.015]",
                      i === FAQS.length - 1 ? "border-b" : "",
                    ].join(" ")}
                  >
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="
                        flex w-full items-center justify-between gap-6 py-1
                        text-left text-[1.1rem] font-normal tracking-[-0.01em] text-text
                      "
                    >
                      <span>{f.q}</span>
                      <PlusCross open={isOpen} />
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      aria-hidden={!isOpen}
                      ref={(el) => { panelRefs.current[i] = el; }}
                      className="faq-answer-gsap overflow-hidden"
                      style={{ height: 0 }}
                    >
                      <div
                        ref={(el) => { innerRefs.current[i] = el; }}
                        className="max-w-[620px] pt-4 text-[0.95rem] leading-[1.7] text-text-muted"
                        style={{ opacity: 0 }}
                      >
                        {f.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
  );
}

function PlusCross({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative grid size-6 shrink-0 place-items-center rounded-full border border-border",
        "transition-[background,border-color,box-shadow,transform] duration-250 ease-out",
        open
          ? "rotate-45 border-accent bg-accent shadow-[0_0_16px_var(--color-accent-glow)]"
          : "",
      ].join(" ")}
      style={{ transitionDuration: "250ms" }}
    >
      <span className="absolute h-px w-2.5 bg-text" />
      <span className="absolute h-2.5 w-px bg-text" />
    </span>
  );
}

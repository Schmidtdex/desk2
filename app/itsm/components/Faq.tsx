"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS } from "@/itsm/lib/data";
import { buttonClasses } from "@/components/ui/Button";

export default function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <aside className="reveal">
            <span className="kicker">FAQ</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-extralight leading-[1.05] tracking-tight">
              Perguntas frequentes.
            </h2>
            <p className="mt-6 max-w-[380px] text-[1rem] leading-relaxed text-text-muted">
              O que ouvimos das equipes de TI e operações nas primeiras
              conversas. Se a sua não está aqui, fale com nosso time.
            </p>
          </aside>

          <div
            className="reveal flex flex-col"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            <div className="flex flex-col">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={[
                      "border-t border-border py-6",
                      i === FAQS.length - 1 ? "border-b" : "",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="
                        flex w-full items-center justify-between gap-6 py-1
                        text-left text-[1.1rem] font-normal tracking-[-0.01em] text-text
                      "
                    >
                      <span>{f.q}</span>
                      <PlusMinus open={isOpen} />
                    </button>
                    <div
                      className="
                        max-w-[620px] overflow-hidden
                        text-[0.95rem] leading-[1.7] text-text-muted
                        transition-[max-height,margin] duration-[350ms] ease-[cubic-bezier(0.2,0,0,1)]
                      "
                      style={{
                        maxHeight: isOpen ? "400px" : "0px",
                        marginTop: isOpen ? "1rem" : "0",
                      }}
                    >
                      {f.a}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slim closing CTA */}
            <div
              id="faq-cta"
              className="
                mt-10 flex flex-wrap items-center justify-between gap-5
                rounded-2xl border border-border bg-surface px-7 py-6
                bg-[linear-gradient(135deg,rgba(26,77,255,0.06),transparent_60%),var(--color-surface)]
              "
            >
              <div className="text-[0.98rem] text-text">
                Sua dúvida não está aqui?
                <small className="
                  mt-1 block font-mono text-[0.65rem] font-normal uppercase
                  tracking-[0.2em] text-text-muted
                ">
                  Diagnóstico em 30 minutos · proposta em fases
                </small>
              </div>
              <Link href="/contato" className={buttonClasses({ variant: "primary", size: "sm" })}>
                Falar com especialista
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative size-6 shrink-0 rounded-full border border-border",
        "transition-[background,border-color,box-shadow] duration-200",
        open ? "border-accent bg-accent shadow-[0_0_16px_var(--color-accent-glow)]" : "",
      ].join(" ")}
    >
      <span className="absolute left-1/2 top-1/2 h-px w-2.5 -translate-x-1/2 -translate-y-1/2 bg-text" />
      <span
        className={[
          "absolute left-1/2 top-1/2 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-text",
          "transition-opacity duration-200",
          open ? "opacity-0" : "",
        ].join(" ")}
      />
    </span>
  );
}

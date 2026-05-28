"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export default function Hero() {
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mockupRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      if (prefersReduced) {
        gsap.to(el, { opacity: 1, duration: 0.25 });
        return;
      }
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.25 },
        );
      });
      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);
  return (
    <section
      id="top"
      className="
        relative isolate flex min-h-screen items-center overflow-hidden
        px-6 pt-32 pb-8
      "
    >
      {/* Drenched background */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(26,77,255,0.25),transparent_60%),radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(26,77,255,0.08),transparent_70%)]
        "
      />
      <div aria-hidden="true" className="hero-grid-bg absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="
          absolute bottom-0 inset-x-0 -z-10 h-[180px]
          bg-[linear-gradient(to_bottom,transparent,var(--color-bg))]
        "
      />

      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div>
            <h1
              className="reveal text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.035em]"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              ITSM estratégico certificado pela{" "}
              <em className="not-italic text-accent-2">ITIL</em>{" "}
              com IA nativa
            </h1>

            <p
              className="reveal mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              A operação de TI deixa de ser reativa e passa a ser orientada
              por dados, governança estruturada e inteligência contínua.
            </p>

            <div
              className="reveal mt-10 flex flex-col items-start gap-4"
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <Link href="/contato" className={buttonClasses({ variant: "primary", className: "group" })}>
                Fale com um especialista
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div
            ref={mockupRef}
            className="relative opacity-0 lg:scale-[1.06] lg:-translate-x-2"
          >
            {/* Glow halo behind the mockup */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute -inset-8 -z-10
                bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(26,77,255,0.28),transparent_70%)]
              "
            />

            <div
              className="
                mockup-border relative overflow-hidden rounded-3xl border border-border
                bg-surface
                shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_100px_rgba(26,77,255,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]
              "
            >
              <Image
                src="/hero-itsm2.png"
                alt="Painel da Desk Manager mostrando SLA, tickets abertos, MTTR e fluxo de atendimento ITSM."
                width={1600}
                height={1000}
                priority
                sizes="(min-width: 1024px) 720px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

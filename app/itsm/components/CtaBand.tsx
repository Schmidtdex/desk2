"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { CTA_BAND } from "@/itsm/lib/data";

export default function CtaBand() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const ctx = gsap.context(() => {
        const rule = root.querySelector<HTMLElement>("[data-cta-rule]");
        const heading = root.querySelector<HTMLElement>("[data-cta-heading]");
        const body = root.querySelector<HTMLElement>("[data-cta-body]");
        const buttons = root.querySelector<HTMLElement>("[data-cta-buttons]");

        if (prefersReduced) {
          gsap.set([rule, heading, body, buttons], { opacity: 1, y: 0, scaleX: 1 });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
          defaults: { ease: "power3.out" },
        });

        // Single bright rule — draws out from center, then breathes quietly
        tl.fromTo(
          rule,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 1.1, ease: "power3.inOut" },
          0,
        );
        tl.to(
          rule,
          {
            opacity: 0.6,
            duration: 2.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          1.1,
        );

        tl.fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3);
        tl.fromTo(body, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.85 }, 0.44);
        tl.fromTo(buttons, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.58);
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Próximo passo"
      className="relative isolate overflow-hidden px-6 py-32 md:py-44"
    >
      {/* Quiet drenched glow — continuous with the page, not a contained card */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_60%_55%_at_50%_55%,rgba(26,77,255,0.16),transparent_70%)]
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 -z-10 h-px
          bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.06)_30%,rgba(255,255,255,0.06)_70%,transparent)]
        "
      />

      <div className="mx-auto max-w-[860px] text-center">
        <span
          data-cta-rule
          aria-hidden="true"
          className="
            mx-auto mb-12 block h-[2px] w-64 origin-center scale-x-0 opacity-0
            bg-linear-to-r from-transparent via-accent to-transparent
            [filter:drop-shadow(0_0_14px_var(--color-accent-glow))]
          "
        />

        <h2
          data-cta-heading
          className="opacity-0 text-[clamp(2.2rem,4.5vw,3.6rem)] font-extralight leading-[1.05] tracking-[-0.025em]"
        >
          {CTA_BAND.title}
        </h2>
        <p
          data-cta-body
          className="opacity-0 mx-auto mt-7 max-w-[58ch] text-[1.1rem] leading-relaxed text-text-muted"
        >
          {CTA_BAND.body}
        </p>

        <div
          data-cta-buttons
          className="opacity-0 mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={CTA_BAND.primary.href}
            className={buttonClasses({ variant: "primary", className: "group" })}
          >
            {CTA_BAND.primary.label}
            <span
              aria-hidden="true"
              className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href={CTA_BAND.secondary.href}
            className={buttonClasses({ variant: "ghost" })}
          >
            {CTA_BAND.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

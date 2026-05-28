"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ITIL_SPOTLIGHT } from "@/itsm/lib/data";

export default function ItilSpotlight() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const ctx = gsap.context(() => {
        const badge = root.querySelector<HTMLElement>("[data-itil-badge]");
        const halo = root.querySelector<HTMLElement>("[data-itil-halo]");
        const copy = gsap.utils.toArray<HTMLElement>("[data-itil-copy]", root);
        const facts = gsap.utils.toArray<HTMLElement>("[data-itil-fact]", root);

        if (prefersReduced) {
          gsap.set([badge, ...copy, ...facts, halo], { opacity: 1 });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(halo, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0);
        tl.fromTo(badge, { opacity: 0, y: 24, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.1);
        tl.fromTo(copy, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 }, 0.35);
        tl.fromTo(facts, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 }, 0.85);
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Certificação ITIL Accredited Tool Vendor"
      className="
        relative isolate overflow-hidden px-6 py-28 md:py-40
        border-y border-border
      "
    >
      {/* Soft drenched background — the page's slowest, most reverent moment */}
      <div
        data-itil-halo
        aria-hidden="true"
        className="
          absolute left-1/2 top-1/2 -z-10 h-[720px] w-[720px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full opacity-0
          bg-[radial-gradient(circle,rgba(26,77,255,0.22),rgba(26,77,255,0.06)_45%,transparent_70%)]
          blur-2xl
        "
      />
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_50%_70%_at_50%_50%,rgba(26,77,255,0.08),transparent_70%)]
        "
      />

      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-16 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
        {/* Badge — mounted in a refined credential frame, with soft accent halo behind */}
        <div className="flex justify-center lg:justify-start">
          <div data-itil-badge className="relative opacity-0">
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute -inset-12 -z-10
                bg-[radial-gradient(circle,rgba(26,77,255,0.28),transparent_65%)]
                blur-xl
              "
            />
            <div
              className="
                relative rounded-2xl border border-accent-2/25
                bg-linear-to-b from-surface/95 to-surface/70
                p-5 lg:p-7
                shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]
              "
            >
              {/* Inner hairline ring — adds a quiet double-line, credential-frame feel */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-2 rounded-xl
                  ring-1 ring-inset ring-white/[0.04]
                "
              />
              <Image
                src="/itsm/itil-badge.png"
                alt="Selo ITIL® Accredited Tool Vendor pela PeopleCert"
                width={461}
                height={241}
                priority
                sizes="(min-width: 1024px) 380px, 260px"
                className="relative h-auto w-[260px] lg:w-[380px]"
              />
            </div>
          </div>
        </div>

        <div>
          <h2
            data-itil-copy
            className="opacity-0 text-[clamp(2rem,3.6vw,3rem)] font-extralight leading-[1.08] tracking-[-0.025em]"
          >
            {ITIL_SPOTLIGHT.title.split("ITIL®").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <em className="not-italic text-accent-2">ITIL®</em>
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h2>

          <p
            data-itil-copy
            className="opacity-0 mt-7 max-w-[58ch] text-[1.05rem] leading-relaxed text-text-muted"
          >
            {ITIL_SPOTLIGHT.body}
          </p>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {ITIL_SPOTLIGHT.facts.map((f) => (
              <div
                key={f.label}
                data-itil-fact
                className="opacity-0 flex flex-col"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 block h-px w-8 bg-accent"
                />
                <span className="text-[1.35rem] font-normal leading-[1.2] tracking-[-0.015em] text-text">
                  {f.value}
                </span>
                <span className="mt-1.5 text-[0.88rem] leading-snug text-text-muted">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

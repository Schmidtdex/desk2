"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CAPABILITIES, type CapabilityCard } from "@/itsm/lib/data";

export default function Capabilities() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const ctx = gsap.context(() => {
        const blocks = gsap.utils.toArray<HTMLElement>("[data-capability]", root);

        if (prefersReduced) {
          gsap.set(blocks, { opacity: 1, y: 0 });
          gsap.set("[data-cap-heading], [data-cap-body], [data-cap-badges], [data-cap-card]", {
            opacity: 1,
            y: 0,
          });
          return;
        }

        blocks.forEach((block) => {
          const heading = block.querySelector<HTMLElement>("[data-cap-heading]");
          const body = block.querySelector<HTMLElement>("[data-cap-body]");
          const badges = block.querySelector<HTMLElement>("[data-cap-badges]");
          const cards = gsap.utils.toArray<HTMLElement>("[data-cap-card]", block);

          const tl = gsap.timeline({
            scrollTrigger: { trigger: block, start: "top 80%", once: true },
            defaults: { ease: "power3.out" },
          });

          tl.set(block, { opacity: 1 });
          tl.fromTo(heading, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0);
          tl.fromTo(body, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.08);
          if (badges) {
            tl.fromTo(badges, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.18);
          }
          tl.fromTo(
            cards,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
            0.28,
          );
        });
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      aria-label="Dentro da plataforma"
      className="relative px-6 py-24 md:py-32"
    >
      <div ref={rootRef} className="mx-auto max-w-[1280px]">
        {CAPABILITIES.map((cap, capIdx) => {
          const isLast = capIdx === CAPABILITIES.length - 1;
          const cardCount = cap.cards.length;
          return (
            <div
              key={cap.id}
              id={cap.id}
              data-capability
              className={[
                "scroll-mt-32 opacity-0 md:scroll-mt-40",
                isLast ? "" : "mb-24 md:mb-28",
              ].join(" ")}
            >
              <header className="mx-auto max-w-[760px] text-center">
                <h2
                  data-cap-heading
                  className="text-[clamp(2rem,3.8vw,3rem)] font-extralight leading-[1.05] tracking-tight opacity-0"
                >
                  {cap.title}
                </h2>
                <p
                  data-cap-body
                  className="mx-auto mt-5 max-w-[62ch] text-[1.05rem] leading-relaxed text-text-muted opacity-0"
                >
                  {cap.body}
                </p>

                {cap.badges?.length ? (
                  <div
                    data-cap-badges
                    className="mt-7 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-2 text-text-muted opacity-0"
                  >
                    {cap.badges.map((b, i) => (
                      <span key={b.label} className="flex items-baseline gap-2">
                        {i > 0 ? (
                          <span aria-hidden="true" className="mr-6 inline-block h-3 w-px bg-border align-middle" />
                        ) : null}
                        <span className="text-[1.05rem] text-text">{b.value}</span>
                        <span className="text-[0.9rem]">{b.label}</span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </header>

              {cardCount === 1 ? (
                <ShowcaseSingle card={cap.cards[0]} />
              ) : (
                <div className="mt-14 grid gap-5 md:mt-16 md:gap-6 grid-cols-1 lg:grid-cols-2">
                  {cap.cards.map((card) => (
                    <article
                      key={card.title}
                      data-cap-card
                      className="
                        group relative flex flex-col overflow-hidden rounded-3xl
                        border border-border bg-surface opacity-0
                        transition-[border-color,box-shadow] duration-300 ease-out
                        hover:border-accent-2/40
                        hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_30px_60px_rgba(0,0,0,0.35)]
                      "
                    >
                      {card.image ? (
                        <div className="relative aspect-16/10 overflow-hidden bg-bg">
                          <Image
                            src={card.image.src}
                            alt={card.image.alt}
                            fill
                            sizes="(min-width: 1024px) 640px, 100vw"
                            className="
                              object-cover object-top
                              transition-transform duration-700 ease-out
                              group-hover:scale-[1.025]
                            "
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-surface to-transparent pointer-events-none"
                          />
                        </div>
                      ) : null}

                      <div className="flex flex-1 flex-col p-8 md:p-10">
                        <h3 className="text-[1.5rem] font-normal leading-snug tracking-[-0.015em] text-text">
                          {card.title}
                        </h3>
                        <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-text-muted">
                          {card.body}
                        </p>
                        <ul className="mt-6 flex flex-col gap-2.5 text-[0.96rem] leading-relaxed text-text">
                          {card.features.map((f) => (
                            <li key={f} className="flex gap-3">
                              <span aria-hidden="true" className="mt-2.5 block h-px w-3.5 shrink-0 bg-accent" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Single-card "cinematic overlay" — image is the canvas, features float inside it
 * over a dark fade at the bottom. One unified composed frame, not two elements.
 */
function ShowcaseSingle({ card }: { card: CapabilityCard }) {
  if (!card.image) {
    return (
      <article data-cap-card className="mt-14 opacity-0 md:mt-16">
        <ul className="mx-auto grid max-w-[760px] grid-cols-1 gap-5 sm:grid-cols-2">
          {card.features.map((f) => (
            <li key={f} className="flex items-start gap-4">
              <span aria-hidden="true" className="mt-2.5 block h-px w-6 shrink-0 bg-accent" />
              <span className="text-[1.02rem] leading-relaxed text-text">{f}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article
      data-cap-card
      className="relative mx-auto mt-14 max-w-[1024px] opacity-0 md:mt-16"
    >
      {/* Soft accent halo behind the composition — documented callout pattern */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-20 -top-8 -z-10 h-[60%]
          bg-[radial-gradient(ellipse_55%_70%_at_50%_50%,rgba(26,77,255,0.28),transparent_75%)]
          blur-2xl
        "
      />

      {/* Image — clean float, no overlay, no fade */}
      <div
        className="
          relative isolate overflow-hidden rounded-3xl
          ring-1 ring-inset ring-border
          shadow-[0_50px_120px_-20px_rgba(5,6,15,0.7),0_0_0_1px_var(--color-accent-glow)]
        "
      >
        <Image
          src={card.image.src}
          alt={card.image.alt}
          width={card.image.w}
          height={card.image.h}
          sizes="(min-width: 1280px) 1024px, 100vw"
          priority={false}
          className="block h-auto w-full"
        />
      </div>

      {/* Feature spec-cards below — Apple/invgate-style grid of intentional cards,
          not floating bullets. Each card has structure: hairline accent + bold title. */}
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 md:grid-cols-4 md:gap-4">
        {card.features.map((f, i) => (
          <li
            key={f}
            className="
              group relative isolate overflow-hidden rounded-2xl
              border border-border bg-surface
              p-6 md:p-7
              transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out
              hover:border-accent-2/40 hover:bg-surface-2
              hover:-translate-y-0.5
              hover:shadow-[0_0_0_1px_var(--color-accent-glow),0_18px_40px_-16px_rgba(5,6,15,0.7)]
            "
          >
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="font-mono text-[0.72rem] tracking-[0.18em] text-text-muted"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="block h-px w-6 bg-accent transition-[width] duration-300 ease-out group-hover:w-9"
              />
            </div>
            <h3 className="mt-4 text-[1.1rem] font-medium leading-snug tracking-[-0.01em] text-text">
              {f}
            </h3>
          </li>
        ))}
      </ul>
    </article>
  );
}

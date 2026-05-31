"use client";

import { InfiniteSlider } from "@/components/fx/InfiniteSlider";
import Image from "next/image";

// Static fallback logos
const FALLBACK_LOGOS = [
  { src: "/logo_petz_cobasi.png",               alt: "Petz Cobasi", h: 48 },
  { src: "/havan-logo.webp",                    alt: "Havan",       h: 80 },
  { src: "/porsche.png",                        alt: "Porsche",     h: 56 },
  { src: "/desk-manager-logo-da-Eurofarma.png", alt: "Eurofarma",   h: 48 },
  { src: "/osklen-logo.webp",                   alt: "Osklen",      h: 80 },
  { src: "/byd-logo.webp",                      alt: "BYD",         h: 80 },
  { src: "/clube-de-regatas-flamengo-logo.webp", alt: "Flamengo",   h: 64 },
  { src: "/koerich-advocacia-logo.webp",        alt: "Koerich",     h: 80 },
];

interface CmsLogo {
  _key?: string;
  alt?: string | null;
  height?: number | null;
  imageUrl?: string | null;
}

interface PartnersMarqueeData {
  label?: string | null;
  logos?: CmsLogo[] | null;
}

interface PartnersMarqueeProps {
  data?: PartnersMarqueeData | null;
}

export function PartnersMarquee({ data }: PartnersMarqueeProps) {
  const label = data?.label ?? "Impulsionando as melhores equipes";

  // Use CMS logos if uploaded, otherwise fall back to the static list
  const logos =
    data?.logos && data.logos.length > 0
      ? data.logos
          .filter((l) => l.imageUrl)
          .map((l) => ({ src: l.imageUrl!, alt: l.alt ?? "", h: l.height ?? 48, key: l._key }))
      : FALLBACK_LOGOS.map((l, i) => ({ ...l, key: String(i) }));

  return (
    <section
      id="scene-partners"
      aria-label="Empresas parceiras"
      className="bg-bg overflow-hidden"
      style={{ paddingTop: "96px", paddingBottom: "56px" }}
    >
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">

          {/* Left label */}
          <div className="md:max-w-44 md:border-r md:pr-6 md:border-white/10">
            <p className="text-center text-sm md:text-end" style={{ color: "rgba(255,255,255,0.4)" }}>
              {label}
            </p>
          </div>

          {/* Slider */}
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider durationOnHover={20} duration={40} gap={80}>
              {logos.map((logo) => (
                <div key={logo.key} className="flex items-center">
                  <img
                    className="mx-auto w-fit object-contain"
                    src={logo.src}
                    alt={logo.alt}
                    height={logo.h}
                    width="auto"
                    style={{ height: logo.h, opacity: 0.8 }}
                  />
                </div>
              ))}
            </InfiniteSlider>

            {/* Fade edges */}
            <div
              className="absolute inset-y-0 left-0 w-20 pointer-events-none"
              style={{ background: "linear-gradient(to right, #05060F, transparent)" }}
            />
            <div
              className="absolute inset-y-0 right-0 w-20 pointer-events-none"
              style={{ background: "linear-gradient(to left, #05060F, transparent)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { COUNTRIES } from "@/lib/countries";

export function WorldGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let phi = 0;
    let rafId = 0;
    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.07, 0.08, 0.15],
      markerColor: [0.1, 0.3, 1],
      glowColor: [0.1, 0.3, 1],
      markers: COUNTRIES.map((c) => ({ location: [c.lat, c.lng], size: 0.06 })),
    });

    function loop() {
      phi += 0.003;
      globe.update({ phi });
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, []);

  return (
    <section
      id="scene-globe"
      aria-label="Presença global"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-32"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Do Brasil para o mundo</p>
          <h2 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[1.05] tracking-tight">
            <span className="text-accent">+40</span> países
          </h2>
          <p className="mt-6 max-w-md text-text-muted">
            Suporte multilíngue e governança adaptada a padrões internacionais.
          </p>
          <ul className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs text-text-muted">
            {COUNTRIES.slice(0, 18).map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-150">
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

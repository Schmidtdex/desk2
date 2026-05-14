"use client";

import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const COLORS = ["#05060F", "#080E22", "#0D1840", "#142060", "#1A4DFF", "#3B82F6"];

export function ShaderBackground({ className }: { className?: string }) {
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // Set initial dims and mount in one tick — no double render
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Cap at 1440p: shader doesn't need native 4K resolution
    setDimensions({ width: Math.min(w, 1440), height: Math.min(h, 900) });
    setMounted(true);

    const onResize = () => {
      // Debounce 150ms — avoids WebGL context churn during window drag
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setDimensions({
          width: Math.min(window.innerWidth, 1440),
          height: Math.min(window.innerHeight, 900),
        });
      }, 150);
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={{
        background: "#05060F",
        // Promote to its own GPU layer so the canvas compositor is isolated
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {mounted && (
        <>
          <MeshGradient
            className="absolute inset-0 h-full w-full"
            width={dimensions.width}
            height={dimensions.height}
            colors={COLORS}
            distortion={0.8}
            swirl={0.6}
            grainMixer={0}
            grainOverlay={0}
            speed={0.42}
            offsetX={0.08}
          />
          <div className="absolute inset-0 pointer-events-none bg-bg/35" />
        </>
      )}
    </div>
  );
}

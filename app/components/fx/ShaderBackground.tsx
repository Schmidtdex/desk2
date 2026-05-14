"use client";

import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const COLORS = ["#05060F", "#080E22", "#0D1840", "#142060", "#1A4DFF", "#3B82F6"];

export function ShaderBackground({ className }: { className?: string }) {
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setDimensions({
      width: Math.min(window.innerWidth, 1440),
      height: Math.min(window.innerHeight, 900),
    });
    setMounted(true);

    const onResize = () => {
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
      className={`absolute inset-0 -z-10${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={{ background: "#05060F" }}
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

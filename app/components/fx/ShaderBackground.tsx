"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

// Desk Manager palette — deep space flowing into electric blue
const COLORS = ["#05060F", "#080E22", "#0D1840", "#142060", "#1A4DFF", "#3B82F6"];

export function ShaderBackground({ className }: { className?: string }) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={{ background: "#05060F" }}
    >
      {mounted && (
        <>
          <MeshGradient
            className="absolute inset-0 w-full h-full"
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

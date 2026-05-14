"use client";

import { MeshGradient, DotOrbit } from "@paper-design/shaders-react";

// Desk Manager color palette for shader composition
// MeshGradient: flowing deep space → electric blue nebula
// DotOrbit: electric blue dots orbiting on dark field, overlaid at 50% opacity

export default function ShaderCanvas() {
  return (
    <div className="absolute inset-0" style={{ background: "#05060F" }}>
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#05060F", "#060A1A", "#0B1238", "#142268", "#1A4DFF"]}
        speed={0.7}
        distortion={0.35}
        swirl={0.18}
        grainMixer={0}
        grainOverlay={0}
      />
      <div className="absolute inset-0 opacity-[0.48]">
        <DotOrbit
          className="w-full h-full"
          colorBack="#05060F"
          colors={["#0D1540", "#1A4DFF", "#3B82F6", "#0A1E80"]}
          size={0.28}
          sizeRange={0.3}
          spreading={0.45}
          speed={0.4}
        />
      </div>
    </div>
  );
}

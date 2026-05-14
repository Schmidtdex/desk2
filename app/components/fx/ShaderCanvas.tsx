"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.05 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.025 * intensity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;

    float t = noise * 0.22 + 0.22;
    vec3 color = mix(color1, color2, clamp(t, 0.0, 1.0));
    color += color2 * pow(max(noise, 0.0), 4.0) * intensity * 0.4;

    float dist = length(uv - vec2(0.5));
    float vignette = 1.0 - smoothstep(0.25, 0.85, dist);
    color = mix(color1 * 0.85, color, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 0.5 },
      color1: { value: new THREE.Color("#05060F") },
      color2: { value: new THREE.Color("#1A4DFF") },
    }),
    []
  );

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime * 0.6;
    uniforms.intensity.value = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function EnergyRing({
  radius = 4,
  speed = 0.04,
  opacity = 0.06,
}: {
  radius?: number;
  speed?: number;
  opacity?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = state.clock.elapsedTime * speed;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = opacity + Math.sin(state.clock.elapsedTime * 0.7) * 0.02;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -0.5]}>
      <ringGeometry args={[radius * 0.88, radius, 64]} />
      <meshBasicMaterial color="#1A4DFF" transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function ShaderCanvas() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, background: "#05060F" }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: false, antialias: false }}
      dpr={[1, 1.5]}
    >
      <ShaderPlane />
      <EnergyRing radius={4.5} speed={0.04} opacity={0.07} />
      <EnergyRing radius={6.5} speed={-0.025} opacity={0.04} />
    </Canvas>
  );
}

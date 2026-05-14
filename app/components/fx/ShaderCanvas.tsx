"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Exact shader from design spec — only colors adapted to Desk Manager palette
const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 uv = vUv;

    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;

    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity);

    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = pow(glow, 2.0);

    gl_FragColor = vec4(color * glow, glow * 0.8);
  }
`;

function ShaderPlane({
  position,
  color1 = "#05060F",
  color2 = "#1A4DFF",
  size = 2,
}: {
  position: [number, number, number];
  color1?: string;
  color2?: string;
  size?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2]
  );

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime;
    uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[size, size, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function EnergyRing({
  radius = 1,
  position = [0, 0, 0] as [number, number, number],
}: {
  radius?: number;
  position?: [number, number, number];
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = state.clock.elapsedTime;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
  });

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.8, radius, 32]} />
      <meshBasicMaterial color="#1A4DFF" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function ShaderCanvas() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
    >
      <ShaderPlane position={[0, 0, 0]} size={3} />
      <ShaderPlane position={[-2.8, 1, -0.6]} size={2} />
      <ShaderPlane position={[2.8, -0.8, -0.5]} size={2} />
      <EnergyRing radius={1.5} position={[0, 0, 0]} />
      <EnergyRing radius={2.8} position={[0, 0, -0.2]} />
    </Canvas>
  );
}

"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const ShaderCanvas = dynamic(() => import("./ShaderCanvas"), { ssr: false });

export function ShaderBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 -z-10", className)}
      aria-hidden="true"
      style={{ background: "#05060F" }}
    >
      <ShaderCanvas />
    </div>
  );
}

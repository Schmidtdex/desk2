"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: {
  children: ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}) {
  return (
    <div className={cn("relative flex w-full flex-col overflow-hidden", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          aria-hidden="true"
          className={cn(
            `pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform
             [--aurora:repeating-linear-gradient(100deg,#1A4DFF_10%,#3B82F6_15%,#60A5FA_20%,#A78BFA_25%,#1A4DFF_30%)]
             [--dark-gradient:repeating-linear-gradient(100deg,#05060F_0%,#05060F_7%,transparent_10%,transparent_12%,#05060F_16%)]
             [background-image:var(--dark-gradient),var(--aurora)]
             [background-size:300%,200%]
             [background-position:50%_50%,50%_50%]
             blur-[10px]
             after:absolute after:inset-0 after:content-[""]
             after:[background-image:var(--dark-gradient),var(--aurora)]
             after:[background-size:200%,100%]
             after:mix-blend-difference after:[background-attachment:fixed]
             after:animate-[aurora_20s_linear_infinite]`,
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_50%_30%,black_10%,transparent_70%)]"
          )}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

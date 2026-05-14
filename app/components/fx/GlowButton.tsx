"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface GlowButtonProps {
  href: string;
  children: ReactNode;
}

export function GlowButton({ href, children }: GlowButtonProps) {
  return (
    <Link href={href} className="gb-root">
      <span className="gb-glow" aria-hidden="true" />
      <span className="gb-inner">{children}</span>
    </Link>
  );
}

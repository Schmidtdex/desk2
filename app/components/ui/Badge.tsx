import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1 text-xs font-medium tracking-wide text-text-muted backdrop-blur-md",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
      {children}
    </span>
  );
}

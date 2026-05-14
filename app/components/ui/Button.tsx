import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50";
  const variants: Record<Variant, string> = {
    primary:
      "bg-accent text-white shadow-[0_0_40px_var(--color-accent-glow)] hover:shadow-[0_0_60px_var(--color-accent-glow)] hover:brightness-110",
    ghost: "border border-border text-text hover:bg-surface",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

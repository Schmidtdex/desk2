import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

const BUTTON_BASE =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50";

const BUTTON_SIZES: Record<Size, string> = {
  md: "px-7 py-3 text-base",
  sm: "px-5 py-2 text-sm",
};

const PRIMARY_SHADOW: Record<Size, string> = {
  md: "shadow-[0_0_40px_var(--color-accent-glow)] hover:shadow-[0_0_60px_var(--color-accent-glow)]",
  sm: "shadow-[0_0_24px_var(--color-accent-glow)] hover:shadow-[0_0_36px_var(--color-accent-glow)]",
};

/**
 * Centralized button class composer. Use directly when you need an <a>/<Link>
 * that looks like a Button (NavBar CTA, etc.). For real <button> elements, use <Button>.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const variants: Record<Variant, string> = {
    primary: `bg-accent text-white ${PRIMARY_SHADOW[size]} hover:brightness-110`,
    ghost:
      "border border-border text-text bg-transparent hover:bg-surface-2 hover:border-accent-2/40",
  };
  return cn(BUTTON_BASE, BUTTON_SIZES[size], variants[variant], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

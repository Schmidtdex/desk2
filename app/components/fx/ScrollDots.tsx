"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = { ids: string[] };

export function ScrollDots({ ids }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(idx);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return (
    <nav
      aria-label="Navegação de seção"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
    >
      {ids.map((id, idx) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Seção ${idx + 1}`}
          className={cn(
            "block size-2 rounded-full transition-all",
            active === idx ? "h-6 bg-accent" : "bg-text-muted/30 hover:bg-text-muted/60"
          )}
        />
      ))}
    </nav>
  );
}

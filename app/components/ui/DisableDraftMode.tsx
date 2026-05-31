"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";

/**
 * Shown when the editor is browsing the site directly in Draft Mode
 * (outside of the Studio Presentation iframe).
 * Hidden when inside the Presentation Tool — the Studio has its own exit button.
 */
export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show when NOT inside the Presentation Tool iframe
  if (environment !== "live" && environment !== "unknown") return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-xs font-mono text-white backdrop-blur-sm transition hover:bg-white/10"
    >
      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
      Sair do Preview
    </a>
  );
}

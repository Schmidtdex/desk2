# Desk Manager — Design System

## Color Tokens

Defined in `app/globals.css` via `@theme`:

| Token | Value | Role |
|-------|-------|------|
| `--color-bg` | `#05060F` | Page background (deep space, blue-tinted) |
| `--color-surface` | `#0B0D1C` | Cards, elevated blocks |
| `--color-surface-2` | `#131732` | Hover states, deeper elevation |
| `--color-border` | `#1E2240` | Subtle 1px borders |
| `--color-accent` | `#1A4DFF` | Primary action, emphasis, glow source |
| `--color-accent-2` | `#3B82F6` | Secondary accent, lighter blue |
| `--color-accent-glow` | `#1A4DFF40` | Glow shadows (`box-shadow`, `text-shadow`) |
| `--color-text` | `#F5F6FF` | Primary text (white, slight blue tint) |
| `--color-text-muted` | `#8B8FA8` | Secondary text, captions |
| `--color-danger` | `#F43F5E` | Errors, warnings (Harvard hook only) |

**Color strategy**: Drenched on hero (shader IS the surface), Committed on section backgrounds (30–60% dark blue), Restrained on content sections (tinted neutrals + accent ≤10%).

Never use `#000000` or `#ffffff`. Every neutral carries the `#05060F` blue tint.

---

## Typography

**Fonts**: Geist Sans (display + body) + Geist Mono (data, KPIs, captions). Loaded via `next/font/google` in `app/layout.tsx`.

| Role | Size | Weight | Tracking |
|------|------|--------|----------|
| Display hero | `clamp(2.75rem, 8vw, 7.5rem)` | 200 (extralight) | `-0.03em` |
| Section title | `clamp(2rem, 4.5vw, 3.75rem)` | 200 | tight |
| Body | `text-base` / `text-lg` | 400 | normal |
| Mono caption | `text-xs` | 300 | `0.3em` uppercase |
| KPI display | `clamp(2.5rem, 6vw, 5rem)` | 200 | tight |

Body line length capped at `max-w-xl` (~65ch) for readability.

---

## Spacing & Layout

- Each section: `min-h-screen`, generous `py-32` internal padding
- No global container — each section manages its own `max-w-*`
- Rhythm through varied padding; same padding everywhere is monotony
- No nested cards (cards inside cards are always wrong)

---

## Motion

Registered animations in `app/globals.css`:
- `orbit` — circular orbit for decorative client logos
- `marquee` — infinite horizontal scroll for TrustMarquee
- `blink` — cursor blink in FinalCta typewriter
- `pulse-dot` — subtle particle pulse
- `aurora` — background gradient animation (AuroraBackground)

All motion respects `prefers-reduced-motion: reduce` (0.01ms duration override in globals.css).

Motion library: Framer Motion (`motion/react`). Ease curves: `[0.2, 0, 0, 1]` for enter, `ease-out-expo` equivalent for exits. No bounce, no elastic.

GSAP ScrollTrigger used for: horizontal timeline pin (scene 4), per-card sticky cases (scene 8).

---

## FX Component Library (`app/components/fx/`)

### ShaderBackground + ShaderCanvas
**The hero shader.** GLSL WebGL animation via React Three Fiber. Full-screen canvas with:
- Custom vertex shader: subtle wave displacement on a 10×10 plane
- Fragment shader: dark base (`#05060F`) + electric blue flows (`#1A4DFF`) via animated noise
- Center vignette: bright at center (text focus), dark at edges
- Two energy rings: slow-rotating semi-transparent blue circles at z=-0.5

**Usage** (brand hero sections, cinematic section openers):
```tsx
import { ShaderBackground } from "@/components/fx/ShaderBackground";

<section className="relative min-h-screen overflow-hidden">
  <ShaderBackground />
  {/* content */}
</section>
```

**Customization** — edit color uniforms in `ShaderCanvas.tsx`:
```ts
color1: { value: new THREE.Color("#05060F") },  // base dark
color2: { value: new THREE.Color("#1A4DFF") },  // accent blue
```

**Performance**: loaded with `next/dynamic` + `ssr: false`, `dpr={[1, 1.5]}` to cap pixel density. Do not use on more than 2 sections simultaneously.

---

### AuroraBackground
CSS-only gradient animation. Lighter alternative to ShaderBackground when WebGL is overkill. Adapts to dark mode via Tailwind CSS classes.

---

### NumberTicker
Counts from 0 to target value on IntersectionObserver trigger. Respects `prefers-reduced-motion`. Used in Harvard stats (scene 2) and case KPIs (scene 8).

```tsx
<NumberTicker value={95} suffix="%" durationMs={1800} />
```

---

### TextReveal
Letter-by-letter fade-in + upward translation using Framer Motion `staggerChildren`. `whileInView` with `once: true`.

```tsx
<TextReveal as="h1" text="Your headline." delay={0.3} stagger={0.04} className="..." />
```

**Absolute ban**: never combine with `bg-clip-text text-transparent` gradient. Use solid OKLCH color only.

---

### MagneticButton
Spring-physics button that follows cursor within its bounds. Blue glow `box-shadow` as signature effect.

```tsx
<MagneticButton>Label text</MagneticButton>
```

---

### AnimatedBeam
SVG `path` with `stroke-dashoffset` animation. Use for connecting diagram nodes (scene 7 retail flows).

---

### ScrollDots
12-point side indicator (desktop only, `lg:flex`). Uses IntersectionObserver to track active section.

---

## NavBar

Fixed positioning, transparent at top, glass on scroll (`bg-[#05060F]/75 backdrop-blur-xl border border-white/[0.06] rounded-2xl`). Mobile: hamburger with Framer Motion `AnimatePresence` dropdown.

Logo: `public/desk-manager-icon-white.svg` (4 ascending bars icon) + "Desk Manager" text in Geist Light.

---

## Absolute Bans

From impeccable design laws — match-and-refuse:

1. **Side-stripe borders** — no colored `border-left/right > 1px` on cards
2. **Gradient text** — no `bg-clip-text text-transparent`. Use solid OKLCH
3. **Glassmorphism as decoration** — only in NavBar scroll state (purposeful)
4. **Hero-metric template** — no big-number + small-label grids
5. **Identical card grids** — Bento grid uses varied sizes
6. **Em dashes** — use commas, colons, semicolons, or parentheses

---

## Scene Inventory

| Scene | Component | Key FX | V2 |
|-------|-----------|--------|----|
| 1 Hero | `Hero.tsx` | ShaderBackground, TextReveal, MagneticButton | — |
| 2 Harvard | `HarvardStats.tsx` | NumberTicker, TextReveal | — |
| 3 Pilares | `ThreePillars.tsx` | Framer scroll-linked | R3F spheres |
| 4 Timeline | `Timeline.tsx` | GSAP horizontal pin | Product mockups |
| 5 Globo | `WorldGlobe.tsx` | cobe v2 | Hover tooltips |
| 6 Bento | `ProductsBento.tsx` | CSS micro-animations | Lottie |
| 7 Fluxos | `RetailFlows.tsx` | AnimatedBeam, SVG | AI videos |
| 8 Cases | `CasesSticky.tsx` | GSAP per-card pin | — |
| 9 Anatomia | `AiAnatomy.tsx` | Framer scroll-linked pyramid | R3F |
| 10 Maturidade | `MaturityJourney.tsx` | Range slider | — |
| 11 Selos | `TrustMarquee.tsx` | CSS marquee | — |
| 12 CTA | `FinalCta.tsx` | Typewriter, MagneticButton | — |

---
name: Desk Manager
description: Plataforma de IA para serviços e processos — landing manifesto
rings:
  immutable: [color-tokens, font-families, type-scale, button-primary, motion-curves, absolute-bans]
  template: [section-grammar, kicker-pattern, hero-anatomy, marquee-pattern, sticky-pattern]
  page: [content, accent-tint, illustration, section-order]
colors:
  bg: "#05060F"
  surface: "#0B0D1C"
  surface-2: "#131732"
  border: "#1E2240"
  accent: "#1A4DFF"
  accent-2: "#3B82F6"
  accent-glow: "#1A4DFF40"
  text: "#F5F6FF"
  text-muted: "#8B8FA8"
  danger: "#F43F5E"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontWeight: 200
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontWeight: 300
    letterSpacing: "0.3em"
rounded:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.75rem"
---

# Desk Manager — Design System

> Source of truth para todas as decisões visuais. Tudo aqui é normativo. Código que diverge é bug, não variação.

---

## A Regra dos 3 Anéis

Toda decisão de design pertence a um dos três anéis. **Saber em qual anel uma decisão vive determina se ela pode mudar ou não.**

### Ring 1 — Imutável

Nunca varia. Em página alguma. Em seção alguma. Em template algum. Se você está prestes a alterar um item do Ring 1 dentro de uma seção, **está fazendo a coisa errada** — mude o token no Ring 1 ou não mude.

São Ring 1: tokens de cor, escala tipográfica, fontes, botão primário, escala de espaçamento, curvas de motion, estilo de input, estilo de link, transição de página, ícones, badges.

### Ring 2 — Variável por template

Fixo dentro de cada template, mas pode mudar entre templates diferentes. Exemplos: anatomia de uma "seção de conteúdo padrão", ordem (kicker → headline → body → media), largura de coluna, posição de mockup, estilo das figuras decorativas, padding interno da seção.

São Ring 2: o **template "Hero"**, o **template "Standard Content Section"**, o **template "Marquee"**, o **template "Sticky Scroll Case"**, o **template "Carousel"**.

### Ring 3 — Customizável por página/seção

Conteúdo livre. Cada instância pode mudar texto, imagem, mockup, ordem opcional de elementos dentro do template, tonalidade do accent (mas só dentro da escala oficial).

São Ring 3: copy, imagens, ilustrações, ícones específicos da seção, mockups de produto, KPIs.

### A doutrina

> Se algo está no Ring 1, **nunca** muda entre páginas.
> Se está no Ring 2, muda **só** entre templates diferentes.
> Se está no Ring 3, muda livremente.

Sites ruins se confundem aqui — deixam coisas do Ring 1 (cor primária, fonte, estilo de botão) variar por seção, e a página parece feita por 5 designers diferentes. Os bons sites são obsessivos no Ring 1.

---

## Ring 1 — Immutable

### Cores

Definidas em [`app/globals.css`](app/globals.css) via `@theme`. Estas são as **únicas cores autorizadas** no produto. Toda neutra carrega o tint azul de `#05060F` — nunca usar preto puro nem branco puro.

| Token | Valor | Papel | Uso |
|-------|-------|-------|------|
| `--color-bg` | `#05060F` | Background da página | Toda seção (incluindo as que hoje usam `bg-black`) |
| `--color-surface` | `#0B0D1C` | Cards, blocos elevados | Bento, badges, contêineres |
| `--color-surface-2` | `#131732` | Hover, elevação mais profunda | `:hover` em cards |
| `--color-border` | `#1E2240` | Bordas sutis de 1px | Cards, separadores |
| `--color-accent` | `#1A4DFF` | **Único azul de marca** | Botão primário, emphasis, fonte de glow |
| `--color-accent-2` | `#3B82F6` | Accent secundário (lighter) | Tags, links secundários, gradientes radiais |
| `--color-accent-glow` | `#1A4DFF40` | `box-shadow` e `text-shadow` | Glow do CTA, glow do typewriter |
| `--color-text` | `#F5F6FF` | Texto primário | h1, h2, h3, p |
| `--color-text-muted` | `#8B8FA8` | Texto secundário/captions | Kicker mono, descrições |
| `--color-danger` | `#F43F5E` | Erros, warnings | Hook Harvard apenas |

**Regras de cor (imutáveis):**

- **A Regra do Tint Azul.** Toda neutra carrega o tint de `#05060F`. Nunca `#000`, nunca `#fff`, nunca `Tailwind bg-black`. Quando precisar de "fundo escuro", use `bg-bg` (token).
- **A Regra do Azul Único.** Existe exatamente um azul de marca: `#1A4DFF`. `#3B82F6` é apoio secundário. Qualquer outro hex azul no código (`#0237FF`, `#5b85ff`, `#7ba8ff`, `#1E5BD6`, `#0e27b3`, `#60A5FA`) é **drift** — deve usar gradiente derivado do par oficial, não um terceiro azul nomeado.
- **A Regra do 10% de Accent.** O accent primário (`#1A4DFF` sólido) ocupa no máximo ~10% da superfície de qualquer fold. Sua raridade é o que o torna potente. Excesso vira "AI SaaS landing".
- **A Regra do Estilo de Cor.** Hero usa estratégia **Drenched** (o shader é a superfície). Seções de conteúdo usam **Restrained** (tinted neutrals + accent ≤10%). Nunca o inverso.

### Tipografia

**Famílias (imutáveis):**

- **Display + Body:** `Plus Jakarta Sans` (variable `--font-display`), carregado via `next/font/google` em [`app/layout.tsx`](app/layout.tsx).
- **Mono (data, kickers, captions):** `JetBrains Mono` (variable `--font-code`).
- **Instrument Serif (`globals.css:1`) está importado mas não é uma fonte oficial do sistema.** Se permanecer em uso (Hero), deve ser explicitado como Ring 1 alternativo. Caso contrário, remover. Ver Drift Log.

**Escala (imutável):**

| Papel | Tamanho | Peso | Tracking | Onde |
|-------|---------|------|----------|------|
| Display hero | `clamp(2.75rem, 8vw, 7.5rem)` | **200** (extralight) | `-0.04em` | Hero apenas |
| Section title (h2) | `clamp(2rem, 4.5vw, 3.75rem)` | **200** | `tight` (`-0.025em`) | Toda seção |
| Sub-title (h3) | `text-2xl` a `text-4xl` | **200** | `tight` | Bento cards, callouts |
| Body | `text-base` / `text-lg` | 400 | normal | Parágrafos |
| Lead body | `text-lg` / `text-xl` | 400 | normal, line-height 1.55 | Intro de seção |
| KPI display | `clamp(2.5rem, 6vw, 5rem)` ou `clamp(3rem,10vw,8rem)` | **200** | tight | Stats numéricos |
| Mono kicker | `text-xs` | 300 | `0.3em` uppercase | Toda seção (acima do h2) |

**Regras de tipografia (imutáveis):**

- **A Regra do Peso 200.** Todo headline (h1, h2, h3, KPI) usa weight 200 (`font-extralight`). Nunca 300 (`font-light`), nunca 400. A leveza é a voz. Diverge → drift.
- **A Regra do Kicker.** Toda seção começa com um kicker mono: `font-mono text-xs uppercase tracking-[0.3em] text-text-muted`. Sem exceção (Hero é o único isento — usa pills).
- **A Regra do max-w-xl no body.** Corpo de texto nunca passa de ~65ch. `max-w-xl` ou `max-w-2xl`. Linhas mais longas viram parede.
- **Nunca gradient text.** `bg-clip-text text-transparent` é banido. Use cor sólida e contraste de peso/tamanho para hierarquia.

### Botão Primário (imutável)

**O componente é [`app/components/ui/Button.tsx`](app/components/ui/Button.tsx).** Há duas variantes: `primary` e `ghost`, e dois tamanhos: `md` (default) e `sm` (NavBar). **Toda outra implementação de CTA é drift.**

```tsx
<Button variant="primary">Falar com especialista</Button>
<Button variant="primary" size="sm">Falar com especialista</Button>
<Button variant="ghost">Ver demo</Button>
```

**Especificação (imutável):**

- Shape: `rounded-full` (pill)
- `md`: `px-7 py-3 text-base font-medium`
- `sm`: `px-5 py-2 text-sm font-medium`
- Primary background: `bg-accent`
- Primary shadow: `shadow-[0_0_40px_var(--color-accent-glow)]` (md), `shadow-[0_0_24px_var(--color-accent-glow)]` (sm)
- Hover: aumenta o glow em ~50% + `brightness-110`
- Ghost: `border border-border` + `hover:bg-surface`
- Focus ring: `focus-visible:ring-2 ring-accent ring-offset-2 ring-offset-bg`

**Exceções autorizadas (Ring 2, não Ring 3):**

- `MagneticButton` (FX, [`fx/MagneticButton.tsx`](app/components/fx/MagneticButton.tsx)) — variante especial para Hero e CTA final. Mesmas dimensões `md`, comportamento spring extra. **Usar apenas em momentos cinematográficos**, nunca como CTA inline.
- O botão glow em `globals.css` (`.gb -*`) é uma terceira variante experimental — se não estiver em uso na página, manter quieto; se entrar em produção, codificar como variante do `<Button>`.

**Glow override autorizado (Ring 3, um único caso):**

- **NavBar CTA desktop** ([`app/components/layout/NavBar.tsx`](app/components/layout/NavBar.tsx)) usa um glow mais forte que o `sm` padrão — `rgba(26,77,255,0.4)` em rest, `0.55` em hover. Justificativa: é o único CTA visível durante todo o scroll da página, exige ênfase acima do `sm` genérico. Override aplicado via `className` do `buttonClasses()`, com comentário inline explicando. **Não replicar em outros lugares** — se aparecer um segundo `sm` que pede esse glow, codificar uma variante (`size="sm"` + `prominence="hero"`) em vez de propagar overrides.

### Motion

**Bibliotecas:** `motion/react` (ex-Framer Motion) + GSAP ScrollTrigger para sticky/scroll-driven.

**Curvas imutáveis:**

- **Enter:** `[0.2, 0, 0, 1]` — ease-out duro, para revelação de conteúdo (TextEffect, fade-up, opacity in).
- **Smooth long:** `[0.16, 1, 0.3, 1]` — ease-out exponencial, para transições longas (NavBar shrink, scroll-linked).
- **Imperativo (scroll handlers):** `easeInOutCubic` apenas em snap/lerp manual (EcosystemHub roda, CasesSticky lerp).

**Banidos:**

- `ease: "easeOut"` (string) — é o default genérico do Framer e usa uma curva mais suave que o nosso enter. Sempre use o array.
- Bounce, elastic, overshoot. A marca é precisa, não brincalhona.
- Animar `width`/`height`/`top`/`left`. Sempre `transform`.
- Combinar `bg-clip-text` + gradient + motion. Banido três vezes seguidas.

**Reduce motion:** [`globals.css`](app/globals.css) já tem `@media (prefers-reduced-motion: reduce)` global. Toda animação custom deve respeitar.

### Iconografia

- **Biblioteca única:** `lucide-react`. Stroke width default `2`, exceto onde explicitamente declarado `strokeWidth={1.5}` (DeskExperience features).
- **Tamanhos:** `size-4` (12-16px) para inline, `size-5` para botões, `size={20}-{24}` para feature cards.
- Logo: SVGs em `public/` — `Logotipo principal - branco.png` e variantes. Nunca recriar inline.
- Banido: ícones decorativos coloridos grandes acima de cada heading (template SaaS).

### Bans Absolutos (Ring 1)

| # | Ban | Localização atual |
|---|-----|--------------------|
| 1 | `bg-black` / `#000` / `#fff` | Ver Drift Log |
| 2 | `bg-clip-text text-transparent` (gradient text) | OK — `gradient-text.tsx` existe mas não está usado em páginas |
| 3 | Glassmorphism como decoração | OK — só no NavBar scroll (intencional) |
| 4 | Side-stripe borders (`border-left > 1px` colorida) | Não detectado |
| 5 | Hero-metric template (big number + small label grid) | Limítrofe — HarvardStats usa, mas com narrativa, não como template |
| 6 | Grids de cards idênticos | OK — Bento é varied-size |
| 7 | Em dashes (`—` literal em UI copy) | Apenas em DESIGN.md/PRODUCT.md (não em produto) |
| 8 | Curva `"easeOut"` (string) | **Ver Drift Log — 8 ocorrências** |
| 9 | Hex/rgba inline em vez de tokens | **Ver Drift Log — muitas ocorrências** |
| 10 | Múltiplos azuis nomeados na palette | **Ver Drift Log — `#0237FF`, `#5b85ff`, etc.** |

---

## Ring 2 — Per-template

### Template "Hero"

Único em todo o site. Anatomia fixa:

- `min-h-screen`, `isolate`, `overflow-hidden`
- FX background ocupando toda a área (shader DottedSurface)
- Container central `max-w-4xl`, `text-center`
- Ordem: **Headline grande** → **Pills mono de social proof** → **CTA principal** → **Gradient fade no fundo** (`linear-gradient(to bottom, transparent, var(--color-bg))`)
- O Hero é o único lugar onde headline pode usar Instrument Serif (se essa decisão for ratificada — ver Drift Log).

### Template "Standard Content Section"

A maioria das seções. Anatomia fixa:

```
<section id="scene-{name}" className="relative min-h-screen px-6 py-16 md:py-32">
  <div className="mx-auto max-w-7xl">       ← container Ring 2
    <div className="mb-8 max-w-3xl md:mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
        {KICKER}                              ← Ring 3 conteúdo
      </p>
      <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.75rem)] font-extralight leading-tight tracking-tight">
        {HEADLINE}                            ← Ring 3 conteúdo
      </h2>
      <p className="mt-6 max-w-xl text-lg text-text-muted">
        {LEAD_BODY}                           ← Ring 3 conteúdo opcional
      </p>
    </div>
    {CONTENT_BLOCK}                          ← Ring 3 livre (bento, grid, sticky, etc)
  </div>
</section>
```

**Variáveis dentro do template (Ring 2, fixas):**

- Padding lateral: `px-6` mobile, container interno controla o resto.
- Padding vertical: `py-16 md:py-32` (mobile fica mais compacto).
- Container: `max-w-7xl mx-auto`. **Não é `max-w-5xl` nem `max-w-6xl`** — escolher um e travar.
- Mono kicker: sempre `text-xs tracking-[0.3em] text-text-muted`.
- Headline: sempre `clamp(2rem, 4.5vw, 3.75rem)` + `font-extralight` + `tracking-tight`.
- Espaçamento headline→content: `mb-8 md:mb-16`.

### Template "Sticky Scroll Stage"

Usado em CasesSticky e DeskExperience. Anatomia:

- Wrapper externo com `height` em `vh` × N (define quanto rola).
- Inner sticky com `position: sticky; top: 0; height: 100dvh; overflow: hidden`.
- Scroll handler imperativo (sem `setState` no frame).
- Always `requestAnimationFrame` + `passive: true` no listener.

### Template "Marquee/Slider"

PartnersMarquee, TrustMarquee, SegmentsCarousel. Anatomia:

- Faixa horizontal com `overflow-hidden`.
- Marquee CSS: `animation: marquee Xs linear infinite` (definido em globals.css).
- Slider: scroll-snap horizontal com indicador de progresso opcional.
- Sempre duplicar conteúdo para loop seamless.

### Template "Section Background Tone"

Cada seção escolhe **uma** de três tonalidades — não mistura:

1. **Drenched** — Hero apenas. FX shader cobre tudo.
2. **Tinted dark** — `bg-bg` padrão. Maioria das seções.
3. **Tinted dark com glow radial** — para callouts. `bg-[radial-gradient(...,rgba(26,77,255,X),transparent)]` em cima de `bg-bg`. Ver ProductsBento, FinalCta, Timeline.

Banido: `bg-black` ou `bg-white` como alternativa "para destacar". Sempre `bg-bg`.

---

## Ring 3 — Per-section / Per-page

O que cada seção pode livremente mudar:

- **Conteúdo** (copy, números, citações).
- **Imagem/mockup/ilustração** (incluindo posição dentro do template — esquerda/direita).
- **Ícone do kicker / ícones de feature** (dentro da biblioteca lucide).
- **Decoração intra-template** (linhas SVG, partículas, beams) desde que use só tokens de cor.
- **Tonalidade do accent** dentro da escala oficial (`accent`, `accent-2`, `accent-glow`).
- **Ordem opcional** de blocos dentro do template (mockup esquerda vs direita, KPI antes vs depois do body).

O que **não** pode mudar mesmo no Ring 3:

- Cor fora dos tokens.
- Fonte fora das declaradas no Ring 1.
- Estilo de botão (sempre `<Button>` ou `MagneticButton`).
- Easing curve (sempre as 3 oficiais).
- Tamanho/tracking do kicker.

---

## Drift Log — violações detectadas em 2026-05-18

Cada item abaixo é Ring 1 ou Ring 2 sendo violado em código. Priorizar correção mecânica antes de qualquer redesign visual.

> **Resolvidos em 2026-05-18:** #1, #2, #3, #4, #12, #13, #14, #15, #16, #17, #18, e a derivada `rgba(2,55,255,…)` no Footer (5 ocorrências) + `bg-[#05060F]/95` no NavBar mobile. Ver "Histórico de correções" no fim desta seção.

### P0 — Ring 1: Cor (pendentes)

| # | Arquivo | Linha | Problema | Correção |
|---|---------|-------|----------|----------|
| 5 | `app/components/layout/FooterFull.tsx` | 87, 102, 117–172 | `#A9DBFF`, `rgba(169,219,255,...)` (palette paralela não autorizada) | **Decisão de design**: ou ratificar como `--color-text-ice` no Ring 1, ou consolidar em `text-muted`/`text` |
| 6 | `app/components/sections/SegmentsCarousel.tsx` | 24–27 | Constantes locais `DESK_BLUE`, `DESK_BLUE_GLOW`, `DESK_ICON_BG`, `DESK_ICON_BDR` redefinem tokens | Substituir por `var(--color-accent-2)`, `var(--color-accent-glow)`, etc. |
| 7 | `app/components/sections/ThreePillars.tsx` | 106–108, 128–130, 144–146 | Gradientes radiais com hex literais (`#5b85ff`, `#0e27b3`, `#7ba8ff`, `#1E5BD6`, `#2a3260`) | Derivar via `color-mix()` ou registrar como tokens auxiliares |
| 8 | `app/components/sections/DeskExperience.tsx` | múltiplas | Inline `style={{}}` com hex/rgba (`#3B82F6`, várias `rgba(26,77,255,...)`) | Migrar para classes Tailwind com tokens |

### P0 — Ring 1: Tipografia (pendentes)

| # | Arquivo | Linha | Problema | Correção |
|---|---------|-------|----------|----------|
| 9 | `app/components/sections/Hero.tsx` | 31, 40 | `font-serif font-light` — fonte serif fora do sistema declarado | **Decisão de design pendente**: ratificar Instrument Serif como Ring 1 (atualizar este doc) ou substituir por Plus Jakarta extralight |
| 10 | `app/components/sections/ThreePillars.tsx` | 33 | `font-light` (300) em h1 | `font-extralight` (200) |
| 11 | `app/components/sections/Hero.tsx` | 56 | Pills com `tracking-[0.2em]` em vez de `0.3em` | Decidir: ou pills são Ring 2 com tracking próprio, ou unificar com kicker `0.3em` |

### Histórico de correções (2026-05-18)

| # | Arquivo | Mudança aplicada |
|---|---------|-------------------|
| 1 | `app/components/sections/HarvardStats.tsx:40` | `bg-black` → `bg-bg` |
| 2 | `app/components/sections/FinalCta.tsx:40` | `bg-black` → `bg-bg` |
| 3 | `app/components/layout/FooterFull.tsx:69` | `backgroundColor: "#000000"` → `var(--color-bg)` |
| 4 | `app/components/layout/FooterFull.tsx:74` | `backgroundColor: "#0237FF"` → `var(--color-accent)` |
| 4b | `app/components/layout/FooterFull.tsx` (5 lugares) | `rgba(2,55,255,X)` → `rgba(26,77,255,X)` (alinhado ao accent oficial) |
| 12 | `app/components/layout/NavBar.tsx:107` | CTA inline → `<Link className={buttonClasses({ variant: "primary", size: "sm" })}>` |
| 13 | `app/components/layout/NavBar.tsx:178` | CTA mobile inline → `<Link className={buttonClasses(...)}>` |
| 14 | `app/components/ui/Button.tsx` | Adicionado `size: "md" \| "sm"` + helper `buttonClasses()` reutilizável |
| 14b | `app/components/layout/NavBar.tsx:154` | `bg-[#05060F]/95` → `bg-bg/95` |
| 15 | `app/components/sections/SegmentsCarousel.tsx:103` | `ease: "easeOut"` → `ease: [0.2, 0, 0, 1]` |
| 16 | `app/components/sections/EcosystemHub.tsx` (4 ocorrências) | `ease: "easeOut" as const` → `ease: [0.2, 0, 0, 1] as const` |
| 17 | `app/components/sections/ThreePillars.tsx:12` | `ease: "easeOut" as const` → `ease: [0.2, 0, 0, 1] as const` |
| 18 | `app/components/fx/AnimatedBeam.tsx:32` | `ease: "easeOut"` → `ease: [0.2, 0, 0, 1]` |

### P1 — Ring 1: Tokens não-marca em `:root`

| # | Arquivo | Linha | Problema | Correção |
|---|---------|-------|----------|----------|
| 19 | `app/globals.css` | 320–324 | Vars `--color-1..5` e `--brand` em HSL (pink, green, blue, yellow, magenta) — palette estrangeira | Remover se `GradientText` não for usado; senão, mover para escopo do componente |
| 20 | `app/components/ui/gradient-text.tsx` | — | Componente importa palette banida | Decisão: deletar o arquivo ou documentar como exceção experimental |

### P1 — Ring 1: Outras

| # | Arquivo | Linha | Problema | Correção |
|---|---------|-------|----------|----------|
| 21 | `app/components/sections/DeskExperience.tsx` | 107, 135 | `bg-black/20`, `bg-black/50` como overlay de imagem | Usar `bg-bg/40` (mesma intenção, token correto) |
| 22 | `app/components/ui/gradient-text.tsx` | 25 | `bg-white dark:bg-black` (literal preto/branco) | Tokens |
| 23 | `app/components/ui/Badge.tsx` | — | Badge define shape próprio (`border-border bg-surface/60`). Conferir se outras seções inventam badges paralelos | Auditar uso ou consolidar via componente único |

---

## Implementation Reference

### FX Component Library (`app/components/fx/`)

| Componente | Função | Notas |
|------------|--------|-------|
| `DottedSurface` | Shader Three.js do Hero (40×60 dots animados) | Único; nunca usar duas vezes na mesma página |
| `AuroraBackground` | Alternativa CSS-only ao ShaderBackground | Mais leve, pode usar livremente |
| `NumberTicker` | Contador 0→N on `IntersectionObserver` | Respeita reduced-motion |
| `TextReveal` | Letter-by-letter fade-in + translate Y | **Banido combinar com gradient text** |
| `TextEffect` | Word-by-word blur reveal | Usado em Hero e SegmentsCarousel |
| `MagneticButton` | Botão spring que segue cursor com glow azul | Hero e CTA final apenas |
| `AnimatedBeam` | SVG path com stroke-dashoffset animado | Diagramas em RetailFlows |
| `ScrollDots` | Indicador lateral de 12 pontos (desktop) | `lg:flex` apenas |
| `SparklesText` | Sparkles em torno de palavra-chave | Usado em ThreePillars |
| `Spotlight` | Highlight radial seguindo cursor | Auxiliar |
| `InfiniteSlider` | Slider horizontal infinito | Base do Marquee |
| `ShaderBackground` | Mais variante de shader | Alternativa ao DottedSurface |
| `GlowButton` | Variante experimental com glow rotativo | Ver `.gb-*` em globals.css |

### Scene Inventory

| # | Scene | Componente | FX principal |
|---|-------|------------|---------------|
| 1 | Hero | `Hero.tsx` | DottedSurface, TextEffect |
| 2 | Harvard | `HarvardStats.tsx` | StatCounter custom |
| 3 | Três Pilares | `ThreePillars.tsx` | SparklesText, gradientes radiais |
| 4 | Ecosystem | `EcosystemHub.tsx` | Roda rotativa de 5 pilares |
| 5 | Globo | `WorldGlobe.tsx` | cobe v2 |
| 6 | Bento | `ProductsBento.tsx` | CSS micro-animações |
| 7 | Carrossel Segmentos | `SegmentsCarousel.tsx` | Slider horizontal |
| 8 | Cases Sticky | `CasesSticky.tsx` | Sticky scroll imperativo |
| 9 | Desk Experience | `DeskExperience.tsx` | Sticky image expansion |
| 10 | Partners | `PartnersMarquee.tsx` | CSS marquee |
| — | Anatomia AI | `AiAnatomy.tsx` | Não montado em page.tsx |
| — | Maturidade | `MaturityJourney.tsx` | Não montado em page.tsx |
| — | Fluxos Retail | `RetailFlows.tsx` | Não montado em page.tsx |
| — | Trust | `TrustMarquee.tsx` | Não montado em page.tsx |
| — | Timeline | `Timeline.tsx` | Não montado em page.tsx |
| — | FinalCta | `FinalCta.tsx` | Typewriter + MagneticButton |

### NavBar

Fixed, `top-0`, `z-50`. Transparente no topo, com glass quando rolada (`bg-[#05060F]/55 backdrop-blur-xl` + `inset shadow` 1px). Mobile: hamburger Menu/X com `AnimatePresence`.

Logo: `public/Logotipo principal - branco.png`, 150×40, `priority`.

### Footer

`FooterFull.tsx`. **Atualmente diverge em ~5 pontos do Ring 1** — ver Drift Log #3, #4, #5. Após correção, deve usar `bg-bg`, `border-border`, `text-text-muted` e `text-accent` em vez dos hex inline atuais.

---

## Como usar este documento

1. **Antes de escrever um novo componente:** identifique em qual anel sua decisão vive. Se for Ring 1, **use os tokens existentes** — não invente novos.
2. **Antes de copiar uma seção como referência:** confira se ela não está no Drift Log. Copiar uma seção drifted propaga o bug.
3. **Antes de adicionar uma cor/fonte/animação nova:** primeiro pergunte se ela é Ring 1 (atualiza este doc + token) ou Ring 3 (cabe no escopo daquela seção, sem virar pattern).
4. **Drift Log é fonte autoritativa.** Resolvido um item → remover da lista (não comentar como "fixed"). Adicionado um drift novo → entrar aqui.

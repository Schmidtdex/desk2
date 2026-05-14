# Desk Manager — Home Manifesto v1

**Date:** 2026-05-14
**Project:** `desk2/` (Next.js 16 App Router)
**Scope:** Esqueleto completo das 12 cenas da Home como manifesto interativo de scroll.

---

## 1. Objetivo

Criar uma página única `/` (Home) que funciona como manifesto interativo da marca Desk Manager — uma experiência de scroll cinemático no estilo "Apple Event meets Linear meets Stripe". Não é uma landing institucional; é a primeira execução pública do que a marca está se tornando ("orquestramos serviços, inteligência em movimento").

A v1 entrega o **esqueleto completo das 12 cenas** funcionando: layout, tipografia, animações 2D (Framer Motion + GSAP ScrollTrigger), scroll suave (Lenis), Bento Grid, NumberTickers, sticky cases, marquee de selos e CTA final. 3D real (R3F) e vídeos IA ficam para V2 com placeholders intencionais marcados no código.

---

## 2. Stack

Todas as dependências já estão instaladas no `package.json`:

| Dependência | Uso |
|-------------|-----|
| `next@16.2.6` + `react@19` | Framework, App Router, RSC + ilhas client |
| `tailwindcss@4` | Estilos (config CSS-first via `@theme`) |
| `motion@12` (Framer Motion) | Animações principais, scroll-linked |
| `gsap@3` | ScrollTrigger para timeline horizontal (cena 4) e cases sticky (cena 8) |
| `lenis@1.3` | Smooth scroll global, integrado com GSAP |
| `cobe@2` | Globo dotted canvas (cena 5) |
| `@react-three/fiber` + `drei` + `three` | Reservados para V2 (esferas, pirâmide, cubos 3D reais) |
| `lucide-react` | Ícones |

**Não usar** shadcn/ui — não está instalado. Componentes primitivos (Button, Badge) serão criados do zero em `app/components/ui/`. Os snippets em `21st.dev/*.txt` (Spotlight, Aurora) são **referência estilística**, não código a importar — vou adaptá-los manualmente.

---

## 3. Arquitetura de arquivos

```
desk2/
  app/
    page.tsx                    # orquestra as 12 seções (RSC)
    layout.tsx                  # fontes (Geist), metadata, LenisProvider
    globals.css                 # tokens CSS (@theme), animações Tailwind v4
    opengraph-image.tsx         # OG dinâmico (opcional v1)
    components/
      sections/
        Hero.tsx                # Cena 1
        HarvardStats.tsx        # Cena 2
        ThreePillars.tsx        # Cena 3
        Timeline.tsx            # Cena 4
        WorldGlobe.tsx          # Cena 5
        ProductsBento.tsx       # Cena 6
        RetailFlows.tsx         # Cena 7
        CasesSticky.tsx         # Cena 8
        AiAnatomy.tsx           # Cena 9
        MaturityJourney.tsx     # Cena 10
        TrustMarquee.tsx        # Cena 11
        FinalCta.tsx            # Cena 12
      fx/
        Spotlight.tsx           # SVG blur ellipse adaptado de 21st.dev/1.txt
        AuroraBackground.tsx    # bg gradiente animado adaptado de 21st.dev/2.txt
        NumberTicker.tsx        # contador IntersectionObserver
        TextReveal.tsx          # tipografia letra-por-letra com Framer
        AnimatedBeam.tsx        # SVG path stroke-dashoffset entre nós
        MagneticButton.tsx      # botão que segue cursor + glow
        ScrollDots.tsx          # indicador lateral de scroll (12 pontos)
      ui/
        Button.tsx
        Badge.tsx
      layout/
        LenisProvider.tsx       # client; setup Lenis + GSAP ScrollTrigger sync
    lib/
      cases.ts                  # dados: Eurofarma, Convergint, BYD, Petz Cobasi
      timeline.ts               # marcos 2009→2025
      pillars.ts                # 3 pilares (Serviços/Processos/IA)
      products.ts               # 5 produtos (ESM/ITSM/BPM/Maestro/AI Agent)
      clients.ts                # logos órbita do hero
      countries.ts              # +40 países com coords lat/lng
      maturity.ts               # 6 estágios da jornada IA
      utils.ts                  # cn(), classnames helper
  public/
    logos/                      # SVGs dos clientes (texto branco como no PDF)
    flows/retail.svg            # ilustração isométrica do varejo (cena 7)
    seals/                      # ITIL, ISO, SOC, PCI, AWS, Endeavor, ScaleUp
```

---

## 4. Identidade visual

### Tokens (em `globals.css`)

```css
@theme {
  --color-bg: #05060F;
  --color-surface: #0B0D1C;
  --color-surface-2: #131732;
  --color-border: #1E2240;
  --color-accent: #1A4DFF;
  --color-accent-2: #3B82F6;
  --color-accent-glow: #1A4DFF40;
  --color-text: #F5F6FF;
  --color-text-muted: #8B8FA8;
  --color-danger: #F43F5E;
}
```

### Tipografia

- **Display** (hero, provocações): Geist Sans 100/200, tracking `-0.03em`, `clamp(3rem, 12vw, 11rem)`
- **Body:** Geist Sans 400, `text-base` a `text-xl`, leading-relaxed
- **Mono** (KPIs, timeline, captions): Geist Mono 300

### Padrões visuais

- Cada seção: `min-h-screen` com `py-24` interno
- Bordas: 1px `border-border`, nunca pesadas
- Glow azul `box-shadow: 0 0 80px var(--color-accent-glow)` como assinatura
- Glass morphism: `bg-surface/60 backdrop-blur-xl`
- Radius: 16-24px cards, full pills
- Cursor blinker em provocações (cena 2 e 12)

### Acessibilidade

- Contraste AA mínimo em todos os textos
- `prefers-reduced-motion` desliga GSAP/Framer (mantém fades curtos)
- `focus-visible:ring-2 ring-accent` em todos CTAs
- Cada seção tem `<section aria-label="...">` semântico

---

## 5. As 12 cenas — especificação

### Cena 1 — Hero cognitivo
**Mensagem:** "Não somos um software. Somos a sinfonia da sua operação."
**Layout:** centro absoluto, tipografia gigante, badge "Plataforma" no topo.
**Animações:**
- TextReveal letra por letra com Framer (`staggerChildren: 0.04`, opacity + y)
- AuroraBackground (gradiente azul/violeta blur 100px adaptado de `21st.dev/2.txt`)
- Spotlight SVG no fundo (adaptado de `21st.dev/1.txt`)
- 6-8 logos de clientes orbitando em círculo CSS keyframe (rotation 60s lento)
**Dados:** `lib/clients.ts` — Porsche, BYD, Eurofarma, Flamengo, Petz, Cobasi, Convergint, Acer (logos em texto branco, sem assets de marca, igual o slide 12 do pitch)

### Cena 2 — Provocação Harvard
**Mensagem:** 3 estatísticas (90% das empresas falham, 95% dos funcionários não entendem, 85% dos executivos < 1h/mês discutindo estratégia)
**Layout:** fundo `#000`, 3 colunas em desktop, stack mobile.
**Animações:**
- NumberTicker (0 → valor) disparado por IntersectionObserver, duração 1.8s
- TextReveal nas frases secundárias
- Glitch sutil no número final: text-shadow split RGB por 200ms

### Cena 3 — 3 Pilares
**Mensagem:** Serviços + Processos + Plataforma de IA
**Layout:** 3 círculos com glow (Serviços azul-claro, Processos preto, IA azul-Desk no centro maior)
**Animações:**
- Círculos entram com scale 0 → 1 e fade-in (Framer stagger)
- Scroll-linked: posições convergem até fusão em 1 círculo central
- No fim, o círculo central transforma-se no logo Desk Manager (cross-fade)
- CSS `transform-style: preserve-3d` para profundidade sutil

### Cena 4 — Timeline 2009 → 2025
**Layout:** scroll horizontal sticky (GSAP ScrollTrigger pin) com 6 marcos: 2009 (Desk Manager nasce), 2011 (AWS parceiro), 2018 (ITSM + WhatsApp), 2019 (Scale-Up Endeavor + Eurofarma), 2023 (ESM), 2024 (Maestro & Tables), 2025 (AI Platform / AI Agents)
**Animações:**
- Container pinado, tradução X = -(pageWidth) conforme scroll
- Cada marco entra à direita com fade-in
- Conectores horizontais animam stroke-dashoffset
- Mobile: degrada para timeline vertical normal (sem pin)
**Placeholder v1:** cada marco mostra um card 320×200 com gradient azul/violeta + nome do produto da época (ex: "Service Desk", "ITSM + WhatsApp") + ano em mono grande. Sem screenshots reais — fica óbvio que é v1.

### Cena 5 — Globo +40 países
**Layout:** Globo dotted canvas centralizado, lista de países à esquerda em mono.
**Animações:**
- cobe (canvas WebGL leve) com auto-rotation
- Pontos pulsantes nas coords dos países do PDF (lat/lng em `lib/countries.ts`)
- Cores: dots `#1A4DFF`, halo `#1A4DFF40`
**Mobile:** fallback mapa SVG flat com dots animados (pulse CSS)

### Cena 6 — Bento Grid de produtos
**Layout:** Grid 3 colunas × 2 linhas; AI Agent ocupa 2×2 central, outros 4 (ESM/ITSM/BPM/Maestro) nos cantos
**Animações por card** (Framer + CSS keyframes):
- AI Agent: chat typing animation (3 linhas digitando em loop)
- ESM: 5 ícones (RH/TI/Jurídico/Financeiro/Marketing) orbitando o centro
- ITSM: kanban com 3 cards transitando entre colunas
- BPM: SVG workflow se desenhando (stroke-dashoffset)
- Maestro: 6 linhas de integração conectando logos satélite (ERP/CRM/API/etc) ao centro
**Hover:** scale 1.02 + border glow

### Cena 7 — Fluxos varejo reimaginados
**Layout:** Ilustração isométrica SVG no centro, 4 cards laterais (Agente Estoque / Agente Recomendação / Humano Gerente / Robô Humanoide)
**Animações:**
- SVG isométrico estático em `/public/flows/retail.svg`
- Cards "acendem" sequencialmente no scroll (Framer IntersectionObserver, stagger 0.2s)
- AnimatedBeam: linhas SVG path animadas conectando cards à cena central
- Tooltips com role de cada agente
**Placeholder v1:** ilustração SVG simplificada criada manualmente (não vídeos IA)

### Cena 8 — Cases em sticky scroll
**Layout:** GSAP ScrollTrigger pin no container, 4 telas full-screen empilhadas verticalmente:
1. **Eurofarma:** +90 departamentos, +24 países, +13K colaboradores
2. **Convergint:** +150 países, gestão em real time, +13K colaboradores
3. **BYD:** primeira resposta 2-4h (era 15 dias), análise técnica 24-48h (era 30 dias), ciclo completo 48-72h (era 2 meses)
4. **Petz Cobasi:** 99% mais rápido, 94% mais ágil, 100% eliminação fluxos informais
**Animações:**
- Cada case ocupa 100vh durante scroll pinado
- NumberTickers gigantes contando os KPIs
- Background sutil shift de hue por case (azul → ciano → verde → roxo)
- Quote + KPI killer + 1 frase de contexto

### Cena 9 — Anatomia da IA
**Mensagem:** "IA não é mágica. É estatística e infraestrutura."
**Layout:** Pirâmide 4 camadas (de baixo para cima: Dados → Departamentos → Processos → AI Agent)
**Animações:**
- Cada camada entra bottom-up scroll-linked (Framer useScroll)
- Camadas têm `transform: rotateX(15deg) translateZ(N)` (CSS 3D)
- Brilho da camada ativa pulsa quando aparece
- Texto descritivo à direita destacando camada ativa

### Cena 10 — Jornada de maturidade
**Layout:** 6 cubos lado a lado (Digitalização Básica → Governança → Automação Assistida → Automação Autônoma → Operações Autônomas → AI-Native)
**Interação:**
- `<input type="range">` com track e thumb totalmente reestilizados via CSS (sem libs externas). Valor 0-5 mapeia para os 6 estágios.
- Altura dos cubos aumenta progressivamente conforme arrasta (CSS `transform: scaleY` ligado ao state React)
- Cubo do estágio atual destacado com glow azul `--color-accent-glow`
- CTA contextual abaixo muda conforme posição: "Está em Governança? Veja como pulamos para Autônoma em 90 dias."
- Mobile: o range vira touch-friendly (44px de thumb mínimo) e os cubos podem virar lista vertical

### Cena 11 — Selos de confiança
**Layout:** Marquee infinito horizontal (CSS scroll animation, 2 cópias do conteúdo para loop seamless)
**Selos:** ITIL® Accredited, ISO 27001, SOC 1/2/3, PCI DSS, AWS, Scale-Up Endeavor, Amazon Bedrock
**Animações:**
- Marquee 60s linear infinite
- Hover em cada selo: pausa marquee + tilt 3D suave (Framer `whileHover`)

### Cena 12 — Provocação final + CTA
**Mensagem:** "Quantas tarefas poderiam ser operadas por agentes de IA hoje? Qual o custo de oportunidade de cada mês sem agentes em produção?"
**Layout:** Volta ao fundo `#000`. Texto centrado com typewriter effect. CTA grande embaixo.
**Animações:**
- Typewriter: caracteres aparecem sequencialmente (60ms cada)
- Cursor `|` piscando no fim
- MagneticButton: segue cursor com lerp suave, glow azul radial atrás
- Particle field CSS muito sutil (10-15 partículas brancas opacidade 0.1)
**CTA copy:** "Vamos colocar sua operação em movimento."

---

## 6. Navegação & layout global

- **Sem header fixo** (manifesto, não site institucional)
- **ScrollDots lateral:** 12 pontos verticais à direita (mid-screen) indicando posição atual e permitindo jump-to-section. Visível apenas em desktop ≥ 1024px.
- **Footer:** apenas o logo + URL `deskmanager.com` (igual slide 25 do pitch). Discreto.
- **Lenis** envolve toda a página, integrado com GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` no `LenisProvider`.

---

## 7. Performance

| Item | Estratégia |
|------|------------|
| Server Components | `page.tsx` é RSC; seções viram client apenas quando precisam (animação) |
| Lazy load | Cenas 9 e 10 (CSS 3D pesado) com `next/dynamic` `ssr: false` |
| cobe | Carrega só quando cena 5 entra no viewport (IntersectionObserver) |
| GSAP plugins | `import('gsap/ScrollTrigger')` dinâmico dentro do LenisProvider |
| Images | `next/image` para logos clientes (SVGs em `/public/logos/`) |
| Smooth scroll | Lenis desabilitado em `prefers-reduced-motion` |

**Critério de "pronto" v1:**
- As 12 seções renderizam sem layout shift
- Scroll fluido em desktop e mobile
- Animações principais funcionando (text reveals, number tickers, timeline horizontal, sticky cases, marquee)
- Lighthouse Performance ≥ 80 desktop, ≥ 60 mobile
- Zero erros no console
- `npm run build` passa

---

## 8. Responsividade

| Cena | Mobile |
|------|--------|
| 1 Hero | Tipografia escala, logos órbita oculta (vira chip de logos) |
| 2 Harvard | 3 stats empilham verticalmente |
| 3 Pilares | 3 círculos empilham |
| 4 Timeline | Horizontal pin → vertical normal sem pin |
| 5 Globo | cobe → mapa SVG flat com dots |
| 6 Bento | Grid 3×2 → stack vertical, AI Agent ainda destaque |
| 7 Fluxos | Cards abaixo da ilustração, sem beams |
| 8 Cases | Sticky funciona, ajusta tamanho dos números |
| 9 Anatomia | Pirâmide reduz; texto vai abaixo |
| 10 Maturidade | 6 cubos viram lista vertical com progress bar |
| 11 Selos | Marquee continua, selos menores |
| 12 CTA | Tipografia menor, botão full-width |

Breakpoints: padrão Tailwind (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).

---

## 9. SEO & metadata

No `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: "Desk Manager — Orquestramos serviços. Inteligência em movimento.",
  description: "Plataforma de IA para serviços e processos. ESM + ITSM + BPM + Maestro + AI Agents. +600 grandes clientes em +40 países.",
  openGraph: {
    title: "Desk Manager",
    description: "Plataforma de IA para serviços e processos.",
    url: "https://deskmanager.com",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image" },
};
```

OG dinâmica via `app/opengraph-image.tsx` é opcional para v1 (estático em `/public/og.png` aceitável).

---

## 10. Explicitamente fora desta v1 (V2)

1. **Vídeos IA gerados** (Runway/Veo/Pika) nas cenas 4 e 7 — v1 usa placeholders SVG estáticos
2. **R3F real** com esferas físicas, lighting Three.js — v1 usa CSS 3D + Framer
3. **Tooltips interativos detalhados** no globo (hover revela clientes locais)
4. **Mockups reais de produto** na timeline (v1 usa gradients)
5. **i18n** (página em PT-BR único)
6. **Animações Lottie** para micro-interações nos cards (v1 usa CSS keyframes / Framer)

---

## 11. Riscos & decisões

- **GSAP ScrollTrigger × Lenis:** integração conhecida, pattern documentado. Risco baixo se seguir o setup canônico.
- **Next 16 breaking changes:** `AGENTS.md` avisa para consultar docs locais (`node_modules/next/dist/docs/`). Vou consultar antes de tocar em `layout.tsx`, `metadata`, fontes e route handlers.
- **cobe no mobile:** já tem fallback SVG planejado.
- **Bundle size:** R3F/three estão instalados mas não importados na v1 — não impactam bundle (tree-shake). Confirmar no build final.
- **Tailwind v4:** usa `@theme` em CSS, não `tailwind.config.js`. Já é o padrão do projeto.

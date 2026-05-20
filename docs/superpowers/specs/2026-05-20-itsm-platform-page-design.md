# ITSM Platform Page — Design Spec

**Data:** 2026-05-20
**Produto:** Desk Manager — página de produto ITSM
**Rota:** `/itsm` → `app/itsm/page.tsx`
**Status:** Aprovado — pronto para implementação

---

## Objetivo

Portar o template de página de produto ITSM (código de referência em `Downloads/desk (1)/nextjs`) para o projeto desk2, com 100% de fidelidade visual e estrutural ao código de referência, organizando os arquivos de forma separada da landing page e escalável para futuros produtos (ESM, BPM, AI Agent, iPaaS, Embeds).

---

## Decisões de design

| Decisão | Escolha | Razão |
|---------|---------|-------|
| URL | `/itsm` | Curta, direta |
| Organização dos componentes | Co-locados em `app/itsm/components/` | Tudo do ITSM junto, fácil de isolar/copiar para próximo produto |
| Dados | `app/itsm/lib/data.ts` | Co-locado, tipado, isolado do landing |
| CSS do template | Adicionado ao `app/globals.css` | `.kicker` e `.reveal` são Ring 1 — normativos do sistema, não de um produto |
| `Reveal.tsx` | `app/components/fx/Reveal.tsx` | Utilitário geral, segue padrão existente da pasta `fx/` |
| NavBar | Herdado do root layout | Já presente em `app/layout.tsx` |
| FooterFull | Importado explicitamente em `page.tsx` | Padrão já estabelecido na landing |

---

## Estrutura de arquivos

### Novos arquivos

```
app/itsm/
  page.tsx                    ← orquestra todas as seções + metadata SEO
  components/
    Hero.tsx                  ← hero split: copy + Mockup (drenched bg)
    Metrics.tsx               ← faixa 4 KPIs com dividers
    Personas.tsx              ← 4 cards de perfil (usa Section wrapper)
    About.tsx                 ← cadeia de valor ITIL 5 (grid 2 colunas)
    AnchorSection.tsx         ← "use client" — accordion 4 grupos × 12 práticas
    Implementation.tsx        ← 4 etapas de maturidade (usa Section wrapper)
    WhyDesk.tsx               ← razões "Por que Desk Manager" (lista com divisores)
    Faq.tsx                   ← "use client" — accordion FAQ + slim CTA integrado
    Section.tsx               ← Ring 2 wrapper: kicker → h2 → lead → content
    Mockup.tsx                ← dashboard decorativo (server component)
  lib/
    data.ts                   ← todos os dados tipados + PAGE_CONFIG

app/components/fx/
  Reveal.tsx                  ← NOVO: client component IntersectionObserver
```

### Arquivos modificados

```
app/globals.css               ← adicionar blocos CSS do template (ver seção CSS abaixo)
```

### Arquivos não tocados

```
app/layout.tsx                ← NavBar já herdada
app/page.tsx                  ← landing page intocada
app/components/layout/        ← NavBar, FooterFull, MegaMenu — reutilizados sem cópia
app/components/ui/Button.tsx  ← buttonClasses() reutilizado
app/globals.css (Ring 1)      ← tokens de cor, fonte, radius — imutáveis
```

---

## Sequência de seções (`page.tsx`)

```
<Reveal />          ← client, IntersectionObserver para .reveal → .in
<NavBar />          ← via root layout (automático)
<main>
  <Hero />          ← 1. hero drenched + mockup
  <Metrics />       ← 2. faixa 4 KPIs
  <Personas />      ← 3. 4 cards de perfil
  <About />         ← 4. cadeia de valor ITIL 5
  <AnchorSection /> ← 5. ⚡ swap slot — 12 práticas accordion
  <Implementation /> ← 6. 4 etapas de maturidade
  {showWhy && <WhyDesk />} ← 7. opcional via PAGE_CONFIG
  <Faq />           ← 8. FAQ + slim CTA
</main>
<FooterFull />      ← explícito (não está no root layout)
```

---

## CSS a adicionar em `globals.css`

Adicionar após os estilos existentes, com comentário separador:

```css
/* ============================================================
   Platform template — Ring 1/2 classes
   Shared by all product pages (/itsm, /esm, /bpm, ...)
   ============================================================ */
```

| Seletor(es) | Descrição | Ring |
|-------------|-----------|------|
| `.kicker`, `.kicker::before` | Linha de acento + mono uppercase, acima de todo h2 de seção | 1 |
| `.reveal`, `.reveal.in` | Fade-up opacity+translateY via IntersectionObserver | 1 (motion) |
| `.hero-grid-bg`, `.final-grid-bg` | Grid decorativo com mask radial | 3 (decoração) |
| `.anchor-groups` e filhos | Accordion categorizado das práticas ITSM | 2 (template) |
| `[data-anchor-slot]::before` | Badge dev marker "Anchor slot · ITSM" | 3 (dev) |
| `.mockup-border::before` | Border gradient do mockup hero | 3 (decoração) |
| `@media (max-width: 700px)` anchor | Mobile: pill na primeira linha, count oculto | 2 |

Nenhum seletor conflita com estilos existentes (`.gb-*` é o único namespace em uso).

---

## Fluxo de dados

```
app/itsm/lib/data.ts
  ├─ HERO_METRICS     → Metrics.tsx
  ├─ PERSONAS         → Personas.tsx
  ├─ VALUE_CHAIN      → About.tsx
  ├─ PAGE_CONFIG      → About.tsx, page.tsx (showWhy)
  ├─ ANCHOR_ITSM      → AnchorSection.tsx
  ├─ STEPS            → Implementation.tsx
  ├─ WHY              → WhyDesk.tsx
  └─ FAQS             → Faq.tsx
```

Tipos exportados para reuso futuro: `Persona`, `ValueChainItem`, `Step`, `WhyItem`, `Faq`, `AnchorPractice`, `AnchorGroup`.

---

## Ring compliance

- **Ring 1 (imutável):** tokens de cor e fonte já em `globals.css` — não duplicados. `.kicker` e `.reveal` adicionados como extensão normativa do Ring 1.
- **Ring 2 (template):** `Section.tsx` codifica a anatomia "Standard Content Section". `.anchor-groups` codifica o template accordion.
- **Ring 3 (conteúdo):** todo o conteúdo em `lib/data.ts` — copy, números, práticas, FAQs.
- **Não replicados:** NavBar, FooterFull, `Button.tsx`, tokens de cor, curvas de motion.

---

## Scalabilidade para próximos produtos

Quando ESM (ou outro produto) for construído:
1. Criar `app/esm/` com a mesma estrutura
2. `app/esm/lib/data.ts` com os mesmos tipos, conteúdo diferente
3. `app/esm/components/AnchorSection.tsx` terá anatomia diferente (diagrama radial, conforme comentário no template de referência)
4. `Section.tsx` pode ser movido para `app/components/platform/Section.tsx` quando houver 2+ produtos usando — sem urgência agora (YAGNI)

---

## Verificação de conformidade

- [ ] Nenhum `bg-black` / `#000` / `#fff` nos novos arquivos
- [ ] Nenhum gradient text (`bg-clip-text text-transparent`)
- [ ] Todas as cores via tokens (`var(--color-*)` ou classes Tailwind com tokens)
- [ ] Todos os headings com `font-extralight` (weight 200)
- [ ] Kicker mono em toda seção com `Section.tsx`
- [ ] Easing curves: apenas `[0.2, 0, 0, 1]` ou `[0.16, 1, 0.3, 1]` (nunca string `"easeOut"`)
- [ ] Botões sempre via `<Button>` ou `buttonClasses()` de `app/components/ui/Button.tsx`

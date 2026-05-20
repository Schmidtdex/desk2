# ITSM Platform Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a página de produto ITSM em `/itsm` dentro do projeto desk2, portando o template de referência com 100% de fidelidade visual e separando os arquivos da landing page.

**Architecture:** Rota `/itsm` → `app/itsm/page.tsx` com componentes co-locados em `app/itsm/components/` e dados em `app/itsm/lib/data.ts`. CSS de sistema (`.kicker`, `.reveal`, `.anchor-groups`) adicionado ao `app/globals.css`. `Reveal.tsx` vai para `app/components/fx/` (utilitário shared).

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, TypeScript. `@/*` alias aponta para `./app/*`. `ButtonClasses()` já existe em `@/components/ui/Button`. `FooterFull` é named export em `@/components/layout/FooterFull`.

---

## Mapa de arquivos

| Arquivo | Ação |
|---------|------|
| `app/globals.css` | **Modificar** — adicionar blocos CSS do template ao final |
| `app/components/fx/Reveal.tsx` | **Criar** — IntersectionObserver `.reveal → .in` |
| `app/itsm/lib/data.ts` | **Criar** — todos os tipos e dados do produto ITSM |
| `app/itsm/components/Section.tsx` | **Criar** — Ring 2 wrapper: kicker → h2 → lead → content |
| `app/itsm/components/Mockup.tsx` | **Criar** — dashboard decorativo ITSM |
| `app/itsm/components/Hero.tsx` | **Criar** — hero split com mockup, drenched bg |
| `app/itsm/components/Metrics.tsx` | **Criar** — faixa de 4 KPIs com dividers |
| `app/itsm/components/Personas.tsx` | **Criar** — 4 cards de perfil de usuário |
| `app/itsm/components/About.tsx` | **Criar** — cadeia de valor ITIL 5 (2 colunas) |
| `app/itsm/components/AnchorSection.tsx` | **Criar** — "use client", accordion 4 grupos × 12 práticas |
| `app/itsm/components/Implementation.tsx` | **Criar** — 4 etapas de maturidade (grid) |
| `app/itsm/components/WhyDesk.tsx` | **Criar** — por que Desk Manager (lista com divisores) |
| `app/itsm/components/Faq.tsx` | **Criar** — "use client", accordion FAQ + slim CTA |
| `app/itsm/page.tsx` | **Criar** — orquestra seções, metadata SEO |

---

## Task 1: Adicionar CSS do template a `globals.css`

**Files:**
- Modify: `app/globals.css` (adicionar ao final do arquivo)

- [ ] **Step 1: Adicionar os blocos CSS no final de `app/globals.css`**

Abrir `app/globals.css` e anexar ao final:

```css
/* ============================================================
   Platform template — Ring 1/2 classes
   Shared by all product pages (/itsm, /esm, /bpm, ...)
   ============================================================ */

/* Kicker (Ring 1) */
.kicker {
  font-family: var(--font-mono);
  font-weight: 300;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
.kicker::before {
  content: "";
  width: 18px;
  height: 1px;
  background: var(--color-accent);
}

/* Reveal animation (Ring 1 motion) */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity .8s cubic-bezier(0.2, 0, 0, 1),
    transform .8s cubic-bezier(0.2, 0, 0, 1);
  transition-delay: var(--delay, 0ms);
}
.reveal.in { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
}

/* Hero grid background (Ring 3 decorative) */
.hero-grid-bg {
  background-image:
    linear-gradient(rgba(30, 34, 64, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30, 34, 64, 0.4) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%);
}
.final-grid-bg {
  background-image:
    linear-gradient(rgba(30, 34, 64, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30, 34, 64, 0.4) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%);
}

/* Mockup border gradient (Ring 3 decorative) */
.mockup-border::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(26, 77, 255, 0.6), transparent 40%, rgba(59, 130, 246, 0.3));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}

/* Anchor accordion (Ring 2 template) */
.anchor-groups {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
}
.anchor-group { border-bottom: 1px solid var(--color-border); }

.anchor-group .group-head {
  width: 100%;
  background: transparent;
  border: 0;
  text-align: left;
  cursor: pointer;
  padding: 1.5rem 0.5rem 1.5rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 0.65rem;
  column-gap: 1.25rem;
  font-family: inherit;
  color: var(--color-text);
  transition: background .25s;
}
.anchor-group .group-head:hover {
  background: linear-gradient(90deg, rgba(26, 77, 255, 0.04), transparent 60%);
}

.anchor-group .cat-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: 99px;
  white-space: nowrap;
  text-align: center;
  min-width: 150px;
  transition: color .25s, border-color .25s, background .25s;
}
.anchor-group .group-title {
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  font-weight: 200;
  letter-spacing: -0.015em;
  line-height: 1.2;
  margin-right: auto;
}
.anchor-group .group-count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.anchor-group .group-chevron {
  width: 32px; height: 32px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  transition:
    background .3s, border-color .3s, color .3s,
    transform .35s cubic-bezier(0.2, 0, 0, 1);
}
.anchor-group .group-chevron svg {
  transition: transform .35s cubic-bezier(0.2, 0, 0, 1);
}
.anchor-group.open .group-chevron {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-text);
  box-shadow: 0 0 16px var(--color-accent-glow);
}
.anchor-group.open .group-chevron svg { transform: rotate(180deg); }
.anchor-group.open .cat-label {
  color: var(--color-accent-2);
  border-color: rgba(26, 77, 255, 0.4);
  background: rgba(26, 77, 255, 0.08);
}

.anchor-group .group-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .45s cubic-bezier(0.2, 0, 0, 1);
}
.anchor-group.open .group-body { grid-template-rows: 1fr; }
.anchor-group .group-body > div { overflow: hidden; }

.anchor-group .practices {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;
  column-gap: 3rem;
  padding: 0.25rem 0 1.75rem;
}
@media (min-width: 768px) {
  .anchor-group .practices { grid-template-columns: repeat(2, 1fr); }
}
.anchor-group .practice {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 0.85rem;
  align-items: start;
}
.anchor-group .practice .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-glow);
  margin-top: 0.55rem;
}
.anchor-group .practice h4 {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0;
  line-height: 1.3;
}
.anchor-group .practice p {
  margin-top: 0.5rem;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Mobile — pill quebra pra primeira linha, count sumem */
@media (max-width: 700px) {
  .anchor-group .group-head { row-gap: 0.5rem; }
  .anchor-group .cat-label {
    flex-basis: 100%;
    min-width: 0;
    text-align: left;
    padding: 0.3rem 0.75rem;
    align-self: flex-start;
    max-width: max-content;
  }
  .anchor-group .group-count { display: none; }
}

/* Anchor slot dev marker */
[data-anchor-slot] { position: relative; }
[data-anchor-slot]::before {
  content: attr(data-anchor-label);
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent-2);
  opacity: 0.5;
  padding: 0.25rem 0.6rem;
  border: 1px dashed rgba(59, 130, 246, 0.3);
  border-radius: 99px;
  pointer-events: none;
  z-index: 1;
}
```

- [ ] **Step 2: Verificar que não há conflito de seletores**

Rodar no terminal e confirmar zero erros de CSS:
```bash
cd desk2 && npm run build 2>&1 | head -40
```
Esperado: sem erros relacionados a CSS.

- [ ] **Step 3: Commit**

```bash
cd desk2
git add app/globals.css
git commit -m "feat(platform): add Ring 1/2 CSS for platform page template"
```

---

## Task 2: Criar `app/components/fx/Reveal.tsx`

**Files:**
- Create: `app/components/fx/Reveal.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
"use client";

import { useEffect } from "react";

/**
 * Adds the `in` class to all `.reveal` elements when they enter the viewport.
 * Respects prefers-reduced-motion via the CSS rule in globals.css.
 * Render once near the top of any page that uses .reveal animations.
 */
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/components/fx/Reveal.tsx
git commit -m "feat(fx): add Reveal IntersectionObserver component"
```

---

## Task 3: Criar `app/itsm/lib/data.ts`

**Files:**
- Create: `app/itsm/lib/data.ts`

- [ ] **Step 1: Criar o arquivo com todos os tipos e dados**

```ts
/* ============================================================
   Desk Manager — ITSM Product Page Data
   Types exported for reuse in future product pages (esm, bpm, etc.)
   ============================================================ */

export type Persona = {
  roleLabel: string;
  role: string;
  body: string;
};

export type ValueChainItem = {
  letter: string;
  i: string;
  desc: string;
};

export type Step = { num: string; phase: string; title: string; body: string };

export type WhyItem = { title: string; body: string };
export type Faq = { q: string; a: string };

export type AnchorPractice = { title: string; body: string };
export type AnchorGroup = {
  cat: string;
  title: string;
  practices: AnchorPractice[];
};

export const HERO_METRICS = [
  { value: "12", label: "Práticas ITIL 5 certificadas" },
  { value: "100%", label: "Rastreabilidade ponta a ponta" },
  { value: "60+", label: "Países em operação" },
  { value: "ITIL 5", label: "Primeira plataforma BR aderente" },
] as const;

export const PERSONAS: Persona[] = [
  {
    roleLabel: "Tecnologia",
    role: "CIO / Head de TI",
    body: "Padronizar atendimento, reduzir tempo de resolução e ganhar visibilidade executiva da operação.",
  },
  {
    roleLabel: "Operações",
    role: "Gerente de service desk",
    body: "Governança de SLA, base de conhecimento ativa e fluxos auditáveis pra escalar o time sem perder controle.",
  },
  {
    roleLabel: "Transformação",
    role: "Líder de transformação digital",
    body: "Evoluir a TI de centro de custo pra função estratégica, orientada por dados e processos maduros.",
  },
  {
    roleLabel: "Compliance",
    role: "Compliance e auditoria",
    body: "Rastreabilidade completa, evidência documental e aderência a normas internacionais sem retrabalho.",
  },
];

export const VALUE_CHAIN: ValueChainItem[] = [
  { letter: "ES", i: "Estratégia", desc: "definir, planejar, governar" },
  { letter: "DS", i: "Desenho", desc: "modelar serviços e fluxos" },
  { letter: "TR", i: "Transição", desc: "implantar mudanças com risco controlado" },
  { letter: "OP", i: "Operação", desc: "executar com SLA e qualidade" },
  { letter: "MC", i: "Melhoria", desc: "evoluir em ciclos contínuos" },
];

export const STEPS: Step[] = [
  {
    num: "01",
    phase: "Etapa 01",
    title: "Estratégia",
    body: "Avaliação da situação atual, definição de metas (reduzir tempo de inatividade, melhorar experiência do usuário, aprimorar governança) e seleção de framework. Stakeholders e plano em fases.",
  },
  {
    num: "02",
    phase: "Etapa 02",
    title: "Implementação",
    body: "Estabelecimento das práticas core — Incidente, Mudança, Requisição. Fluxos padronizados, treinamento das equipes, central de serviços como ponto único de contato.",
  },
  {
    num: "03",
    phase: "Etapa 03",
    title: "Maturidade",
    body: "Avaliação contínua com CMMI ou Maturidade ITIL. Evolução do suporte reativo pra proativo, identificação de gaps, refinamento dos processos.",
  },
  {
    num: "04",
    phase: "Etapa 04",
    title: "Automação",
    body: "Fluxos automatizados, portal de autoatendimento, IA aplicada a previsão de incidentes e resolução rápida. Automação como arquitetura nativa, não módulo extra.",
  },
];

export const ANCHOR_ITSM = {
  kicker: "Práticas certificadas",
  asideTitle: "12 práticas ITIL 5 com IA nativa aplicada na execução.",
  asideBody:
    "Cada prática vem com fluxos prontos, configuração no-code e IA aplicada no dia a dia operacional. Não é teoria de framework — é execução automatizada e rastreável.",
  bigNumber: "12",
  bigSubLine1: "de 12",
  bigSubLine2: "certificadas",
  groups: [
    {
      cat: "Operação",
      title: "Execução do dia a dia",
      practices: [
        { title: "Incidentes", body: "Identificar, registrar, categorizar, priorizar, investigar e resolver incidentes sem interromper o serviço." },
        { title: "Requisições de serviço", body: "Acesso, redefinição de senha, provisionamento. Fluxos predefinidos e autoatendimento estruturado." },
        { title: "Problemas", body: "Identifica e gerencia causas raiz pra evitar recorrência. Resolução reativa e prevenção proativa." },
        { title: "Eventos & monitoramento", body: "Acompanha eventos da infraestrutura e dispara fluxos automatizados. Da detecção à resolução sem intervenção humana." },
      ],
    },
    {
      cat: "Mudança & ativos",
      title: "Controle sobre o que muda",
      practices: [
        { title: "Habilitação de mudança", body: "Planejar, avaliar e implementar mudanças com risco mínimo. Categorização por risco e conformidade." },
        { title: "Ativos de TI (ITAM)", body: "Rastreia hardware, software, recursos de nuvem ao longo do ciclo de vida. Visibilidade de status e dependências." },
        { title: "Configuração (CMDB)", body: "Base de itens de configuração e relações. Contexto pra cada incidente, requisição ou mudança." },
      ],
    },
    {
      cat: "Experiência",
      title: "Relação com o usuário",
      practices: [
        { title: "Conhecimento", body: "Captura, organiza e compartilha conhecimento técnico. Reduz tempo de resolução, libera especialista." },
        { title: "Catálogo de serviço", body: "Catálogo com serviços disponíveis, SLAs e formulários inteligentes. Demanda categorizada na origem." },
        { title: "Engajamento", body: "Mede e aprimora a relação entre TI e usuários — satisfação, NPS, feedback estruturado." },
      ],
    },
    {
      cat: "Governança",
      title: "Visão executiva e maturidade",
      practices: [
        { title: "Nível de serviço (SLA)", body: "Define, monitora e revisa SLAs entre TI e áreas de negócio. Metas, responsabilidades e qualidade esperada." },
        { title: "Melhoria contínua", body: "Trilhas de auditoria, indicadores e modelo de maturidade pra evoluir a operação em ciclos sustentáveis." },
      ],
    },
  ] satisfies AnchorGroup[],
};

export const WHY: WhyItem[] = [
  { title: "DNA brasileiro", body: "Compliance e cultura local, suporte em português, sem fuso e sem ruído de tradução. Operação enterprise sem terceirização de relacionamento." },
  { title: "AI nativa, não plugada", body: "Agentes operam dentro da arquitetura, com dados estruturados da própria plataforma. Inteligência não é módulo de terceiro." },
  { title: "ITIL 5 certificado pela PeopleCert", body: "Aderência reconhecida globalmente. As práticas vêm certificadas, não inferidas." },
  { title: "Hospedado em AWS", body: "ISO 27001, SOC 1/2/3, PCI DSS Nível 1, criptografia AES-256. LGPD-by-default na hospedagem brasileira." },
  { title: "600+ grandes clientes", body: "Milhares de usuários ativos em operações enterprise, multilíngues e multinacionais. Maturidade comprovada em escala." },
];

export const FAQS: Faq[] = [
  { q: "Em quanto tempo a Desk Manager fica em produção?", a: "Implantações típicas vão de 4 a 12 semanas, dependendo do escopo. Operações enterprise com múltiplos departamentos costumam fazer rollout faseado em 3 a 6 meses." },
  { q: "Funciona com nosso help desk atual durante a transição?", a: "Sim. O iPaaS Maestro permite operação híbrida — você migra fluxos por área enquanto mantém integração com sistemas legados, sem ruptura no atendimento." },
  { q: "Preciso de equipe técnica dedicada pra configurar?", a: "Não. A plataforma é no-code pra configuração de fluxos, telas e regras. O time de operações configura sem depender de TI." },
  { q: "A IA nativa exige treinamento dos modelos?", a: "A IA já vem pré-treinada pra serviços e operações. Você refina com base de conhecimento e dados da sua operação ao longo do uso, sem projeto de ML." },
  { q: "A plataforma é aderente a LGPD?", a: "Sim. Hospedagem AWS no Brasil, criptografia AES-256 em repouso e TLS 1.3 em trânsito, trilha de auditoria completa, controle granular de acesso e relatórios pra conformidade." },
  { q: "Posso testar antes de contratar?", a: "Trabalhamos com modelo de venda consultiva e PoC estruturada. Agende uma conversa com nosso time pra definir o escopo do piloto." },
];

export const PAGE_CONFIG = {
  productLabel: "ITSM",
  eyebrow: "Produto · ITSM",
  showWhy: true,
};
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/lib/data.ts
git commit -m "feat(itsm): add typed data — personas, practices, steps, FAQ"
```

---

## Task 4: Criar `app/itsm/components/Section.tsx`

**Files:**
- Create: `app/itsm/components/Section.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
import { ReactNode } from "react";

/**
 * Ring 2 — "Standard Content Section" anatomy.
 * Kicker → headline → optional lead body → content block.
 */
export default function Section({
  id,
  kicker,
  title,
  lead,
  className = "",
  headerClassName = "",
  children,
}: {
  id?: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  headerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-20 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className={`reveal mb-12 max-w-[720px] md:mb-[4.5rem] ${headerClassName}`}>
          <span className="kicker">{kicker}</span>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-extralight tracking-tight leading-[1.05]">
            {title}
          </h2>
          {lead ? (
            <p className="mt-6 max-w-[580px] text-[1.05rem] leading-relaxed text-text-muted">
              {lead}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/Section.tsx
git commit -m "feat(itsm): add Section Ring 2 wrapper component"
```

---

## Task 5: Criar `app/itsm/components/Mockup.tsx`

**Files:**
- Create: `app/itsm/components/Mockup.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
/**
 * Mockup do dashboard ITSM (server component decorativo).
 * Apenas tokens de cor e estrutura — sem dependências externas.
 */
export default function Mockup() {
  return (
    <div
      aria-hidden="true"
      className="
        mockup-border relative overflow-hidden rounded-3xl border border-border
        bg-[linear-gradient(180deg,rgba(19,23,50,0.7),rgba(11,13,28,0.95))]
        p-5
        shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_100px_rgba(26,77,255,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]
      "
    >
      {/* Chrome */}
      <div className="mb-4 flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[#3a3f5a]" />
        <span className="size-2.5 rounded-full bg-[#2a2f48]" />
        <span className="size-2.5 rounded-full bg-[#1f243d]" />
        <div className="
          ml-2 flex h-[22px] flex-1 items-center rounded-md border border-border
          bg-bg px-2.5 font-mono text-[0.65rem] tracking-[0.1em] text-text-muted
        ">
          desk.manager / service-desk / overview
        </div>
      </div>

      <div className="grid grid-cols-[130px_1fr] gap-3">
        {/* Sidebar */}
        <div className="flex flex-col gap-2 rounded-2xl border border-border bg-bg/50 px-2.5 py-3.5">
          {[
            { label: "Overview", active: true },
            { label: "Incidentes" },
            { label: "Requisições" },
            { label: "Mudanças" },
            { label: "Ativos" },
            { label: "SLAs" },
            { label: "Catálogo" },
            { label: "Agentes IA" },
          ].map((n) => (
            <div
              key={n.label}
              className={[
                "flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em]",
                n.active
                  ? "bg-[rgba(26,77,255,0.12)] text-text"
                  : "text-text-muted",
              ].join(" ")}
            >
              <span className="size-3 rounded-sm border border-current opacity-70" />
              {n.label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-bg/50 p-4">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-2.5">
            <Kpi label="SLA Cumprido" value="98.7%" accent />
            <Kpi label="Tickets abertos" value="1,284" />
            <Kpi label="MTTR" value="3h 12" />
          </div>

          {/* Chart */}
          <div className="
            relative h-[120px] overflow-hidden rounded-lg border border-border
            bg-[linear-gradient(180deg,rgba(26,77,255,0.18),transparent_75%),repeating-linear-gradient(90deg,transparent_0_24px,rgba(30,34,64,0.5)_24px_25px)]
          ">
            <svg className="absolute inset-0 size-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dm-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1A4DFF" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#1A4DFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,90 C40,70 60,40 100,55 C140,70 160,30 200,40 C240,50 260,80 300,60 C340,40 360,55 400,30 L400,120 L0,120 Z"
                fill="url(#dm-area)"
              />
              <path
                d="M0,90 C40,70 60,40 100,55 C140,70 160,30 200,40 C240,50 260,80 300,60 C340,40 360,55 400,30"
                stroke="#3B82F6"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          {/* Tickets */}
          <div className="flex flex-col gap-1.5">
            <Ticket id="INC-4821" title="VPN intermitente · DC-SP" sla="SLA 02:14" status="Em andamento" pri="hi" />
            <Ticket id="REQ-9133" title="Acesso a CRM · Onboarding" sla="SLA 06:00" status="Aguardando" pri="warn" />
            <Ticket id="CHG-2207" title="Patch crítico · Cluster prod" sla="SLA 24:00" status="Aprovado" pri="ok" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={[
        "flex flex-col gap-1 rounded-lg border border-border bg-bg px-2.5 py-2.5",
        accent
          ? "shadow-[inset_0_0_0_1px_rgba(26,77,255,0.4),0_0_24px_rgba(26,77,255,0.15)]"
          : "",
      ].join(" ")}
    >
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-text-muted">
        {label}
      </span>
      <span className={["text-[1.15rem] font-extralight tracking-[-0.03em]", accent ? "text-[#d7e0ff]" : ""].join(" ")}>
        {value}
      </span>
    </div>
  );
}

function Ticket({
  id,
  title,
  sla,
  status,
  pri,
}: {
  id: string;
  title: string;
  sla: string;
  status: string;
  pri: "hi" | "warn" | "ok";
}) {
  const dotCls =
    pri === "hi"
      ? "bg-accent shadow-[0_0_8px_var(--color-accent-glow)]"
      : pri === "warn"
        ? "bg-[#f0a142] shadow-[0_0_8px_rgba(240,161,66,0.4)]"
        : "bg-[#34c77c] shadow-[0_0_8px_rgba(52,199,124,0.3)]";

  return (
    <div className="
      grid grid-cols-[16px_1fr_auto_auto] items-center gap-2.5
      rounded-md border border-border bg-bg px-2.5 py-2 text-[0.7rem]
    ">
      <span className={`size-2.5 rounded-full ${dotCls}`} />
      <span>
        <span className="font-mono text-[0.6rem] tracking-[0.1em] text-text-muted">
          {id} ·{" "}
        </span>
        {title}
      </span>
      <span className="font-mono text-[0.6rem] tracking-[0.1em] text-text-muted">
        {sla}
      </span>
      <span className="
        rounded-full border border-border px-2 py-[2px]
        font-mono text-[0.55rem] uppercase tracking-[0.18em] text-text-muted
      ">
        {status}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/Mockup.tsx
git commit -m "feat(itsm): add ITSM dashboard Mockup decorative component"
```

---

## Task 6: Criar `app/itsm/components/Hero.tsx`

**Files:**
- Create: `app/itsm/components/Hero.tsx`

> Nota de adaptação: o template de referência usa `<Button href="...">` mas o `Button.tsx` do desk2 não tem suporte a `href`. Aqui usamos `<Link>` com `buttonClasses()` — mesma aparência, correto para o projeto.

- [ ] **Step 1: Criar o arquivo**

```tsx
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import Mockup from "./Mockup";

export default function Hero() {
  return (
    <section
      id="top"
      className="
        relative isolate flex min-h-screen items-center overflow-hidden
        px-6 pt-32 pb-20
      "
    >
      {/* Drenched background */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(26,77,255,0.25),transparent_60%),radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(26,77,255,0.08),transparent_70%)]
        "
      />
      <div aria-hidden="true" className="hero-grid-bg absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="
          absolute bottom-0 inset-x-0 -z-10 h-[200px]
          bg-[linear-gradient(to_bottom,transparent,var(--color-bg))]
        "
      />

      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <span className="
              reveal in
              inline-flex items-center gap-2 rounded-full border border-border
              bg-surface/60 px-3.5 py-1.5 font-mono text-[0.7rem] uppercase
              tracking-[0.25em] text-text-muted backdrop-blur-md
            ">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
              Produto · ITSM
            </span>

            <h1
              className="reveal mt-6 text-[clamp(2.5rem,6vw,5rem)]"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              ITSM estratégico,<br />
              certificado pela{" "}
              <em className="not-italic text-accent-2">ITIL 5</em><br />
              com IA nativa.
            </h1>

            <p
              className="reveal mt-7 max-w-[560px] text-lg leading-relaxed text-text-muted"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              A operação de TI deixa de ser reativa e passa a ser orientada
              por dados, governança estruturada e inteligência contínua.
            </p>

            <div
              className="reveal mt-10 flex flex-wrap gap-3"
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <Link href="#faq-cta" className={buttonClasses({ variant: "primary" })}>
                Fale com um especialista
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="#demo" className={buttonClasses({ variant: "ghost" })}>
                Ver demo
              </Link>
            </div>

            <ul
              className="
                reveal mt-10 flex flex-wrap gap-x-8 gap-y-5
                font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-muted
              "
              style={{ "--delay": "320ms" } as React.CSSProperties}
            >
              {["12 práticas ITIL 5", "IA nativa", "60+ países", "LGPD · ISO 27001"].map((b) => (
                <li key={b} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            <Mockup />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/Hero.tsx
git commit -m "feat(itsm): add Hero section with mockup and drenched background"
```

---

## Task 7: Criar `app/itsm/components/Metrics.tsx`

**Files:**
- Create: `app/itsm/components/Metrics.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
import { HERO_METRICS } from "@/itsm/lib/data";

export default function Metrics() {
  return (
    <section
      aria-label="Resultados"
      className="
        border-y border-border px-6 py-14
        bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(26,77,255,0.08),transparent_70%)]
      "
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {HERO_METRICS.map((m, i) => (
            <div
              key={i}
              className={[
                "reveal px-6 py-6",
                "border-border",
                i !== HERO_METRICS.length - 1 ? "md:border-r" : "",
                i % 2 === 0 ? "border-r" : "",
                i < 2 ? "border-b md:border-b-0" : "",
              ].join(" ")}
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="text-[clamp(2.5rem,5vw,3.75rem)] font-extralight leading-none tracking-[-0.04em]">
                {m.value}
              </div>
              <div className="
                mt-3 max-w-[220px] font-mono text-[0.7rem]
                uppercase leading-relaxed tracking-[0.18em] text-text-muted
              ">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/Metrics.tsx
git commit -m "feat(itsm): add Metrics strip with 4 KPIs"
```

---

## Task 8: Criar `app/itsm/components/Personas.tsx`

**Files:**
- Create: `app/itsm/components/Personas.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
import Section from "./Section";
import { PERSONAS } from "@/itsm/lib/data";

export default function Personas() {
  return (
    <Section
      id="personas"
      kicker="Para quem é"
      title={
        <>
          A operação moderna de TI<br />
          não cabe mais em planilha.
        </>
      }
      lead="ITSM estruturado é o que separa quem responde a incidente de quem opera serviço com governança. Conheça os perfis que tiram o máximo da plataforma."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PERSONAS.map((p, i) => (
          <article
            key={p.role}
            className="
              reveal relative overflow-hidden rounded-2xl border border-border
              bg-surface p-7
              transition-[background,transform,border-color] duration-300
              hover:-translate-y-0.5 hover:border-[#2a3060] hover:bg-surface-2
            "
            style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
          >
            <div aria-hidden="true" className="mb-6 h-px w-6 bg-accent" />
            <span className="
              mb-2.5 block font-mono text-[0.65rem] uppercase
              tracking-[0.25em] text-text-muted
            ">
              {p.roleLabel}
            </span>
            <h3 className="text-[1.35rem] leading-tight tracking-[-0.02em]">
              {p.role}
            </h3>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-text-muted">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/Personas.tsx
git commit -m "feat(itsm): add Personas section with 4 role cards"
```

---

## Task 9: Criar `app/itsm/components/About.tsx`

**Files:**
- Create: `app/itsm/components/About.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
import { VALUE_CHAIN, PAGE_CONFIG } from "@/itsm/lib/data";

export default function About() {
  return (
    <section id="produto" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="reveal">
            <span className="kicker">O que é {PAGE_CONFIG.productLabel}, na prática</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.05] tracking-tight">
              TI deixa de ser função<br />
              e vira <em className="not-italic text-accent-2">serviço estruturado</em>.
            </h2>

            <p className="mt-5 text-[1.05rem] leading-relaxed text-text-muted">
              IT Service Management é como a área de TI projeta, entrega, opera
              e melhora os serviços que sustentam o negócio. Mais do que abrir
              e fechar chamado, ITSM é a disciplina que transforma TI em{" "}
              <strong className="font-medium text-text">serviço estruturado</strong>,
              com fluxos definidos, papéis claros, indicadores monitorados e
              melhoria contínua.
            </p>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-text-muted">
              A ITIL 5, mantida pela AXELOS e atualizada para 2026 com
              inteligência artificial aplicada, organiza essa disciplina em
              práticas. A Desk Manager é a{" "}
              <strong className="font-medium text-text">primeira plataforma brasileira</strong>{" "}
              a operar 12 dessas práticas de forma certificada e nativa em IA.
            </p>
          </div>

          <div
            className="reveal flex min-h-[380px] flex-col gap-3 rounded-3xl border border-border bg-surface p-8"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            <span className="kicker">Cadeia de valor do serviço</span>
            {VALUE_CHAIN.map((it) => (
              <div
                key={it.i}
                className="
                  flex items-center gap-3 rounded-2xl border border-border
                  bg-bg/60 px-4 py-3.5
                "
              >
                <div className="
                  flex size-8 items-center justify-center rounded-lg
                  border border-[rgba(26,77,255,0.25)] bg-[rgba(26,77,255,0.08)]
                  font-mono text-[0.7rem] font-medium tracking-wide text-accent-2
                ">
                  {it.letter}
                </div>
                <div>
                  <div className="text-[0.95rem] font-medium">{it.i}</div>
                  <div className="mt-[2px] font-mono text-[0.75rem] tracking-wider text-text-muted">
                    {it.desc}
                  </div>
                </div>
                <div className="
                  ml-auto font-mono text-[0.7rem] uppercase
                  tracking-[0.18em] text-text-muted
                ">
                  {PAGE_CONFIG.productLabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/About.tsx
git commit -m "feat(itsm): add About section with ITIL 5 value chain"
```

---

## Task 10: Criar `app/itsm/components/AnchorSection.tsx`

**Files:**
- Create: `app/itsm/components/AnchorSection.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
"use client";

import { useState } from "react";
import { ANCHOR_ITSM } from "@/itsm/lib/data";

const A = ANCHOR_ITSM;

export default function AnchorSection() {
  const [openGroup, setOpenGroup] = useState<number>(0);

  return (
    <section
      id="anchor"
      data-anchor-slot
      data-anchor-label="Anchor slot · ITSM"
      className="relative px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
          {/* Aside sticky */}
          <aside className="reveal relative lg:sticky lg:top-[100px]">
            <span className="
              inline-flex rounded-full border border-[rgba(26,77,255,0.4)]
              bg-[rgba(26,77,255,0.1)] px-4 py-2
              font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#d4dcff]
            ">
              {A.kicker}
            </span>
            <h2 className="mt-6 text-[clamp(2rem,3.5vw,2.75rem)] font-extralight leading-[1.05] tracking-tight">
              {A.asideTitle}
            </h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-text-muted">
              {A.asideBody}
            </p>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-[5rem] font-extralight leading-[0.95] tracking-[-0.05em]">
                {A.bigNumber}
              </span>
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-text-muted">
                {A.bigSubLine1}<br />{A.bigSubLine2}
              </span>
            </div>
          </aside>

          {/* Accordion de grupos */}
          <div
            className="anchor-groups reveal"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {A.groups.map((g, i) => {
              const isOpen = openGroup === i;
              return (
                <div
                  key={g.cat}
                  className={`anchor-group ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenGroup(isOpen ? -1 : i)}
                    className="group-head"
                  >
                    <span className="cat-label">{g.cat}</span>
                    <span className="group-title">{g.title}</span>
                    <span className="group-count">
                      {String(g.practices.length).padStart(2, "0")} práticas
                    </span>
                    <span className="group-chevron" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div className="group-body">
                    <div>
                      <div className="practices">
                        {g.practices.map((p) => (
                          <div className="practice" key={p.title}>
                            <span className="dot" aria-hidden="true" />
                            <div>
                              <h4>{p.title}</h4>
                              <p>{p.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/AnchorSection.tsx
git commit -m "feat(itsm): add AnchorSection accordion with 12 ITIL 5 practices"
```

---

## Task 11: Criar `app/itsm/components/Implementation.tsx`

**Files:**
- Create: `app/itsm/components/Implementation.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
import Section from "./Section";
import { STEPS } from "@/itsm/lib/data";

export default function Implementation() {
  return (
    <Section
      id="implementacao"
      kicker="Como implementar"
      title={
        <>
          Quatro etapas pra estruturar<br />
          a maturidade de ITSM.
        </>
      }
      lead="A implementação não é projeto de TI, é jornada de maturidade. A Desk Manager acompanha sua operação em cada fase, do diagnóstico ao ITSM totalmente automatizado."
    >
      <div className="
        reveal grid grid-cols-1 gap-px overflow-hidden rounded-3xl
        border border-border bg-border md:grid-cols-2 xl:grid-cols-4
      ">
        {STEPS.map((s) => (
          <article
            key={s.num}
            className="
              relative flex min-h-[320px] flex-col bg-bg
              px-7 pt-8 pb-10 transition-colors duration-300 hover:bg-surface
            "
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-muted">
              {s.phase}
            </span>
            <div className="relative mt-4 text-[3.5rem] font-extralight leading-none tracking-[-0.05em]">
              {s.num}
              <span
                aria-hidden="true"
                className="mt-3.5 block h-[2px] w-6 bg-accent shadow-[0_0_8px_var(--color-accent)]"
              />
            </div>
            <h3 className="mt-5 text-[1.35rem] tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-text-muted">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/Implementation.tsx
git commit -m "feat(itsm): add Implementation section with 4 maturity stages"
```

---

## Task 12: Criar `app/itsm/components/WhyDesk.tsx`

**Files:**
- Create: `app/itsm/components/WhyDesk.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
import { WHY } from "@/itsm/lib/data";

export default function WhyDesk() {
  return (
    <section id="por-que" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="reveal">
            <span className="kicker">Por que Desk Manager</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.05] tracking-tight">
              ITSM como{" "}
              <em className="not-italic text-accent-2">camada</em>,<br />
              não como módulo.
            </h2>
            <p className="mt-7 max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted">
              Plataformas tradicionais oferecem ITSM como módulo. A Desk
              Manager entrega ITSM como{" "}
              <strong className="font-medium text-text">camada</strong> de uma
              plataforma de orquestração mais ampla — onde o mesmo motor que
              cuida do chamado de TI cuida do onboarding do RH, da gestão
              contratual do jurídico e da manutenção do facilities.
            </p>
            <p className="mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted">
              Você não compra uma ferramenta de service desk e amarra
              integrações por fora.{" "}
              <strong className="font-medium text-text">
                Compra a operação inteira já conectada.
              </strong>
            </p>
          </div>

          <ul
            className="reveal flex flex-col"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {WHY.map((it, i) => (
              <li
                key={it.title}
                className={[
                  "border-t border-border py-7",
                  i === WHY.length - 1 ? "border-b" : "",
                ].join(" ")}
              >
                <h4 className="flex items-center gap-3 text-[1.15rem] font-normal tracking-[-0.015em] text-text">
                  <span aria-hidden="true" className="block h-px w-[18px] shrink-0 bg-accent" />
                  {it.title}
                </h4>
                <p className="mt-2 pl-[calc(18px+0.75rem)] text-[0.92rem] leading-relaxed text-text-muted">
                  {it.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/WhyDesk.tsx
git commit -m "feat(itsm): add WhyDesk section with 5 differentiators"
```

---

## Task 13: Criar `app/itsm/components/Faq.tsx`

**Files:**
- Create: `app/itsm/components/Faq.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS } from "@/itsm/lib/data";
import { buttonClasses } from "@/components/ui/Button";

export default function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <aside className="reveal">
            <span className="kicker">FAQ</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-extralight leading-[1.05] tracking-tight">
              Perguntas frequentes.
            </h2>
            <p className="mt-6 max-w-[380px] text-[1rem] leading-relaxed text-text-muted">
              O que ouvimos das equipes de TI e operações nas primeiras
              conversas. Se a sua não está aqui, fale com nosso time.
            </p>
          </aside>

          <div
            className="reveal flex flex-col"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            <div className="flex flex-col">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={[
                      "border-t border-border py-6",
                      i === FAQS.length - 1 ? "border-b" : "",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="
                        flex w-full items-center justify-between gap-6 py-1
                        text-left text-[1.1rem] font-normal tracking-[-0.01em] text-text
                      "
                    >
                      <span>{f.q}</span>
                      <PlusMinus open={isOpen} />
                    </button>
                    <div
                      className="
                        max-w-[620px] overflow-hidden
                        text-[0.95rem] leading-[1.7] text-text-muted
                        transition-[max-height,margin] duration-[350ms] ease-[cubic-bezier(0.2,0,0,1)]
                      "
                      style={{
                        maxHeight: isOpen ? "400px" : "0px",
                        marginTop: isOpen ? "1rem" : "0",
                      }}
                    >
                      {f.a}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slim closing CTA */}
            <div
              id="faq-cta"
              className="
                mt-10 flex flex-wrap items-center justify-between gap-5
                rounded-2xl border border-border bg-surface px-7 py-6
                bg-[linear-gradient(135deg,rgba(26,77,255,0.06),transparent_60%),var(--color-surface)]
              "
            >
              <div className="text-[0.98rem] text-text">
                Sua dúvida não está aqui?
                <small className="
                  mt-1 block font-mono text-[0.65rem] font-normal uppercase
                  tracking-[0.2em] text-text-muted
                ">
                  Diagnóstico em 30 minutos · proposta em fases
                </small>
              </div>
              <Link href="/contato" className={buttonClasses({ variant: "primary", size: "sm" })}>
                Falar com especialista
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative size-6 shrink-0 rounded-full border border-border",
        "transition-[background,border-color,box-shadow] duration-200",
        open ? "border-accent bg-accent shadow-[0_0_16px_var(--color-accent-glow)]" : "",
      ].join(" ")}
    >
      <span className="absolute left-1/2 top-1/2 h-px w-2.5 -translate-x-1/2 -translate-y-1/2 bg-text" />
      <span
        className={[
          "absolute left-1/2 top-1/2 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-text",
          "transition-opacity duration-200",
          open ? "opacity-0" : "",
        ].join(" ")}
      />
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/components/Faq.tsx
git commit -m "feat(itsm): add FAQ accordion with slim CTA"
```

---

## Task 14: Criar `app/itsm/page.tsx`

**Files:**
- Create: `app/itsm/page.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
import type { Metadata } from "next";
import Reveal from "@/components/fx/Reveal";
import { FooterFull } from "@/components/layout/FooterFull";

import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Personas from "./components/Personas";
import About from "./components/About";
import AnchorSection from "./components/AnchorSection";
import Implementation from "./components/Implementation";
import WhyDesk from "./components/WhyDesk";
import Faq from "./components/Faq";

import { PAGE_CONFIG } from "./lib/data";

export const metadata: Metadata = {
  title: "ITSM — Desk Manager",
  description:
    "ITSM estratégico, certificado pela ITIL 5 com IA nativa. A operação de TI deixa de ser reativa e passa a ser orientada por dados, governança estruturada e inteligência contínua.",
};

export default function ITSMPage() {
  return (
    <>
      <Reveal />
      <main>
        <Hero />
        <Metrics />
        <Personas />
        <About />
        <AnchorSection />
        <Implementation />
        {PAGE_CONFIG.showWhy && <WhyDesk />}
        <Faq />
      </main>
      <FooterFull />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd desk2
git add app/itsm/page.tsx
git commit -m "feat(itsm): add /itsm product page — ITSM platform template"
```

---

## Task 15: Verificação visual no browser

**Files:** nenhum arquivo novo — verificação apenas.

- [ ] **Step 1: Iniciar o dev server**

```bash
cd desk2 && npm run dev
```

Aguardar mensagem `Ready in Xms` e confirmar que não há erros de TypeScript ou CSS no terminal.

- [ ] **Step 2: Navegar para `/itsm` e verificar cada seção**

Abrir `http://localhost:3000/itsm` e confirmar visualmente:

| Seção | O que verificar |
|-------|----------------|
| NavBar | Herdada do layout, aparece normalmente |
| Hero | Grid decorativo visível, h1 em font-extralight, mockup à direita no desktop |
| Metrics | 4 KPIs com dividers corretos (grid 2×2 mobile, 4 col desktop) |
| Personas | 4 cards com linha de acento azul, hover funciona |
| About | 2 colunas no desktop, value chain com badges ES/DS/TR/OP/MC |
| AnchorSection | Accordion abre/fecha, primeiro grupo aberto por padrão, badge dev marker visível |
| Implementation | 4 cards com hover, número grande e linha de acento |
| WhyDesk | Lista com divisores, 5 itens |
| FAQ | Accordion com +/- animado, slim CTA ao final |
| FooterFull | Aparece normalmente |

- [ ] **Step 3: Verificar animações `.reveal`**

Fazer scroll da página do topo até o footer. Confirmar que os elementos fazem fade-up conforme entram na viewport.

- [ ] **Step 4: Verificar landing page não foi afetada**

Navegar para `http://localhost:3000`. Confirmar que a landing page continua idêntica ao estado anterior.

- [ ] **Step 5: Verificar build de produção**

```bash
cd desk2 && npm run build
```

Esperado: zero erros de TypeScript, zero erros de build.

- [ ] **Step 6: Commit final se necessário**

Se houver qualquer fix de build:

```bash
cd desk2
git add -A
git commit -m "fix(itsm): resolve build errors found during verification"
```

---

## Checklist de conformidade Ring 1

Antes de considerar pronto, confirmar no código dos novos arquivos:

- [ ] Nenhum `bg-black` / `#000` / `#fff` (exceto decorativo no Mockup chrome — `#3a3f5a`, `#2a2f48`, `#1f243d` são neutros com tint azul, dentro da paleta Ring 3)
- [ ] Nenhum `bg-clip-text text-transparent` (gradient text banido)
- [ ] Todos os headings com `font-extralight` (weight 200)
- [ ] Easing strings `"easeOut"` não aparecem — apenas arrays `[0.2, 0, 0, 1]`
- [ ] Botões via `buttonClasses()` ou `<Button>` — sem implementação manual de CTA

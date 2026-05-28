# Cases — Páginas de detalhe com transição shared-element

**Date:** 2026-05-27
**Project:** `desk2/` (Next.js 16 App Router)
**Scope:** Páginas `/case-[slug]` para Eurofarma, Convergint, Petz Cobasi e BYD, com transição cinematográfica do card da Home (`CasesSticky`) para o hero da página de detalhe, usando View Transitions API + GSAP para coreografia, sem regressão de performance da Home.

---

## 1. Objetivo

A Home tem hoje uma seção `CasesSticky` com 4 cases em scroll narrativo. O botão "Leia o case →" não navega. Este spec define:

1. As 4 páginas `/case-[slug]` (rota igual ao site legado da Desk: `case-convergint`, `case-eurofarma`, `case-petz`, `case-byd`).
2. A transição shared-element em que o card da Home "vira" o hero da página de detalhe — usuário não percebe a navegação.
3. As regras de performance que impedem regressão (especialmente: o embed do YouTube não pode ser iframe direto, e a transição precisa rodar 60fps no notebook do cliente).

O resultado: clicar no botão "Leia o case" inicia uma animação imediata (capture + morph), a rota muda durante o morph, e a página de detalhe pousa com a foto + headline + KPIs já na posição final. O resto do conteúdo (Desafio, vídeo, Solução, Resultados, Depoimentos, CTA, próximo case) aparece com fade-in stagger por baixo.

---

## 2. Stack

Nada novo no `package.json`. Tudo já está instalado:

| Dependência | Uso |
|---|---|
| `next@16.2.6` | App Router + View Transitions API (suporte experimental) |
| `react@19.2.4` | Server Components para os dados estáticos |
| `gsap@3.15` | Coreografia do fade-in stagger abaixo do morph |
| `motion@12.38` | NÃO usado aqui — GSAP é mais previsível pra timeline encadeada |
| `lenis@1.3.23` | Smooth scroll — precisa ser pausado durante a transição |

**Embed do YouTube:** padrão "thumbnail-first" — renderiza um `<img>` com o thumbnail do YouTube + botão play sobreposto. Apenas após o clique no thumbnail, injeta-se o `<iframe>` real. Implementação: componente `LiteYouTubeEmbed` próprio (~30 linhas) em `app/components/fx/LiteYouTubeEmbed.tsx`. Evita 600KB+ de JS do YouTube na carga inicial.

**Não usar:**
- `iframe` direto do YouTube em qualquer lugar fora de interação explícita.
- `motion`/Framer Motion `layoutId` — perdemos controle de timing fino e mistura mal com View Transitions.
- Qualquer biblioteca de transição de página adicional (`next-view-transitions`, `next-transition-router`, etc.). View Transitions nativas do browser são suficientes.

---

## 3. Arquitetura de arquivos

```
desk2/
  app/
    case-[slug]/
      page.tsx                  # Server Component, generateStaticParams + metadata
      not-found.tsx             # 404 para slug inválido
      components/
        CaseHero.tsx            # Hero com view-transition-name nos elementos morfados
        CaseChallenge.tsx       # Bloco "O Desafio"
        CaseSolution.tsx        # Bloco "A Solução" — 3 cards
        CaseResults.tsx         # Bloco "Resultados" — 3 itens
        CaseTestimonials.tsx    # Carrossel de depoimentos
        CaseCTA.tsx             # CTA final + próximo case (com view-transition-name)
    components/
      fx/
        LiteYouTubeEmbed.tsx    # Thumbnail-first YouTube player
      sections/
        CaseCard.tsx            # MODIFICADO: adicionar view-transition-name dinâmico + Link
        CasesSticky.tsx         # MODIFICADO: handler no clique pausa Lenis + dispara navegação
    lib/
      cases-sticky.ts           # MODIFICADO: tipo expandido com challenge/solution/results/youtubeId/testimonials
      case-transition.ts        # NOVO: helpers de view-transition-name + reduced-motion guard
    layout.tsx                  # MODIFICADO: registrar `view-transition-name` no <html> via CSS global
    globals.css                 # MODIFICADO: regras `::view-transition-*` + fallback
```

**Rota:** `app/case-[slug]/page.tsx` — App Router aceita o hífen literal `case-` como prefixo do segmento dinâmico. Resultado: `/case-convergint`, `/case-eurofarma`, etc., compatível com URLs do site legado.

**SSG:** `generateStaticParams` retorna os 4 slugs em build time. Páginas são pré-renderizadas (HTML estático servido instantaneamente).

---

## 4. Modelo de dados

`lib/cases-sticky.ts` recebe campos adicionais por case. Tudo opcional para evitar quebra durante a expansão:

```ts
export interface CaseData {
  // existentes
  id: string;
  index: string;
  company: string;
  sector: string;
  region: string;
  headingParts: HeadingPart[];
  lead: string;
  metrics: [Metric, Metric, Metric];  // permanece 3 — uniformizado nos dois lados
  tags: [Tag, Tag, Tag];
  photo: string;

  // novos (para /case-[slug])
  slug: string;                       // "convergint" — também é o segmento URL após "case-"
  challenge: string;                  // Bloco "O Desafio" — 100-200 palavras
  solution: [SolutionCard, SolutionCard, SolutionCard];  // 3 cards "A Solução"
  results: [string, string, string];  // 3 itens da lista "Resultados"
  testimonials: Testimonial[];        // 1-4 depoimentos
  youtubeId?: string;                 // ex.: "dQw4w9WgXcQ" — opcional
  ctaQuestion: string;                // ex.: "Vamos orquestrar sua operação juntos?"
  nextSlug: string;                   // próximo case no loop — derivado do array, mas explicitar é mais robusto
}

export interface SolutionCard {
  icon: "data" | "visibility" | "platform" | "automation" | "governance";  // mapeia para SVG do lucide-react
  title: string;
  body: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}
```

**Conteúdo inicial:** o `cases-sticky.ts` já tem o esqueleto dos 4 cases. Vou preencher `challenge`/`solution`/`results`/`testimonials` com texto real (não Lorem ipsum). Para o site da Desk, esse conteúdo existe no Wordpress original — quando não tivermos acesso, escrevo a partir das KPIs + tags + lead que já estão estruturados, e marco com `// TODO: validar com cliente` no código.

**KPIs uniformizados em 3** dos dois lados (Home + detalhe), conforme decidido.

---

## 5. Mapeamento do morph (shared elements)

Quatro elementos recebem `view-transition-name` único por case. O browser captura o estado inicial (na Home) e final (na página de detalhe) e morfa automaticamente.

| Elemento na Home (`CaseCard`) | Elemento na página `/case-[slug]` (`CaseHero`) | `view-transition-name` |
|---|---|---|
| Foto direita | Hero image (escala maior) | `case-photo-{slug}` |
| Headline com italic accent | H1 do hero | `case-headline-{slug}` |
| 3 stat rows | Bloco de KPIs do hero | `case-metrics-{slug}` |
| Tags rodapé do card | Tags abaixo do H1 (ou somem com fade) | `case-tags-{slug}` |

**Nomenclatura dinâmica é crítica:** se os 4 cards usarem `case-photo` (sem slug), o browser não sabe qual card morfa para qual destino. O slug no nome resolve isso.

**Elementos que NÃO morfam:**
- Botão "Leia o case →" — fade-out durante o morph (`view-transition-name: none`).
- "Inner rounded card" decorativo dentro do `CaseCard` — fade-out, o hero da página não tem esse chrome.
- Tudo abaixo do hero na página de detalhe — entra com fade-in stagger via GSAP após o `pageshow` da nova rota.

---

## 6. Fluxo da transição (passo a passo)

Quando o usuário clica em "Leia o case":

```
1. Click handler dispara
   ├─ Verifica `prefers-reduced-motion: reduce` → se sim, navega normal e retorna
   ├─ Verifica suporte a `document.startViewTransition` → se não, navega normal
   ├─ lenis.stop()   // congela o smooth scroll para a rect ficar estável
   └─ chama `document.startViewTransition(() => router.push('/case-[slug]'))`

2. Browser captura snapshot dos elementos com view-transition-name
   (foto, headline, métricas, tags do CaseCard atual)

3. router.push navega
   ├─ Next.js renderiza /case-[slug] (já prefetchado no hover/mount)
   ├─ CaseHero monta com os mesmos view-transition-name nos elementos correspondentes
   └─ Browser captura snapshot do estado final

4. Browser executa o morph CSS automaticamente
   ├─ Duração: 600ms (definido no CSS global via ::view-transition-group)
   ├─ Easing: cubic-bezier(.65,0,.35,1) (expo.out style)
   └─ Elementos sem `view-transition-name` fazem crossfade root

5. onfinish da ViewTransition:
   ├─ lenis.scrollTo(0, { immediate: true })  // página de detalhe começa do topo
   ├─ lenis.start()
   └─ Dispara GSAP timeline do fade-in stagger:
       ├─ CaseChallenge fade-up (delay 0ms, 400ms)
       ├─ Vídeo YouTube placeholder fade-up (delay 80ms)
       ├─ CaseSolution 3 cards fade-up stagger (delay 160ms, 60ms entre cards)
       ├─ CaseResults fade-up (delay 320ms)
       ├─ CaseTestimonials fade-up (delay 400ms)
       ├─ CaseCTA fade-up (delay 480ms)
       └─ Próximo case fade-up (delay 560ms)
```

**Prefetch:** o `<Link>` do Next.js faz prefetch automático no viewport. Para o card específico do `CasesSticky`, garantir prefetch também no `pointerenter` do botão para cobrir o caso de cliques imediatos.

**Próximo case (loop):** o link "Próximo: BYD" no rodapé da página de detalhe usa o mesmo padrão — `view-transition-name="case-photo-byd"` no seu thumbnail, e mesma navegação interceptada. Fechamos o loop cinematográfico.

---

## 7. Regras de performance (não negociáveis)

Estas regras existem porque a Home já é pesada (DottedSurface, WorldGlobe, SegmentsCarousel, CasesSticky com 4 cases pré-decodificados). Qualquer transição que regrida o FPS é inaceitável.

| Regra | Por quê |
|---|---|
| **YouTube via `LiteYouTubeEmbed` (thumbnail-first)**, nunca iframe direto na renderização inicial | Iframe do YouTube carrega ~600KB de JS por instância. Quatro páginas com 4 vídeos = 2.4MB de JS bloqueante. Thumbnail estático = ~30KB |
| **Animar SÓ `transform` e `opacity` no fade-in stagger** | GPU compositing. `width/height/box-shadow/filter` causam layout/paint e derrubam FPS |
| **GSAP imperativo, sem React state durante a animação** | Padrão já usado em `CasesSticky` — `requestAnimationFrame` + style.transform direto. Replicar |
| **`lenis.stop()` antes da transição, `lenis.start()` depois** | Lenis acumula inércia. Sem pausar, o destino "pula" porque o scroll old continua computando |
| **Image preload da foto do destino antes do click** | `CasesSticky` já faz preload + `.decode()` das 4 fotos. Como o hero da página de detalhe reusa o mesmo arquivo (`data.photo`), o asset já está em cache no momento do click — sem trabalho adicional. Se um dia uma variante de resolução maior for usada no hero, preload dessa variante deve ser feito no mesmo `useEffect` do `CasesSticky` |
| **`prefers-reduced-motion: reduce` → navegação instantânea, zero morph** | Acessibilidade. Browsers honram automaticamente quando regras CSS estão certas, mas o JS handler também precisa checar |
| **No mobile (`max-width: 768px`) o morph degrada para slide-up simples** | A rect do card no mobile já é ~viewport. Morph completo perde sentido e consome mais que entrega |
| **Componentes da página de detalhe abaixo do hero usam `loading="lazy"` nas imagens e `content-visibility: auto` no CSS** | Páginas longas hidratam mais rápido se o browser puder pular paint do que está fora do viewport |
| **NUNCA pré-renderizar as 4 páginas de detalhe na Home** | App Router já faz prefetch sob demanda. Pré-bundle aumentaria o JS inicial sem ganho real |

**Budget de performance pós-transição:**
- LCP da Home: sem regressão vs baseline atual
- LCP da página de detalhe: < 2.5s no 4G simulado (foto hero é o LCP)
- INP do botão "Leia o case": < 200ms (View Transitions é praticamente instantâneo)
- TBT: nenhum aumento perceptível vs baseline

---

## 8. Acessibilidade

- **`prefers-reduced-motion: reduce`** desabilita a transição. Implementação dupla: CSS (`@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none; } }`) e JS (handler checa antes de chamar `startViewTransition`).
- **Foco:** após a navegação, foco move para o H1 do hero (`tabindex="-1"` + `.focus()` no `onfinish` da transition). Screen readers anunciam o título novo.
- **Botão "Leia o case →"** é um `<Link>` real (`<a>` semântico), não `<button>` ou `<span>`. Funciona com teclado, abre nova aba com Ctrl+Click, indexável.
- **Skip link** ("Pular para o conteúdo") no topo da página de detalhe, focável com Tab, escondido até receber foco. Pula para o `<h1>` do hero.
- **Contraste:** todos os elementos seguem o sistema de tokens já no projeto (`BLUE`, `INK`, `HAIR`). Sem cores novas.

---

## 9. Responsividade

**Desktop (> 768px):** transição completa shared-element conforme descrito.

**Mobile (≤ 768px):**
- O `CaseCard` no mobile já está em layout stack (foto em cima, conteúdo embaixo) e ocupa ~85% da viewport.
- A transição degrada para: fade-out do conteúdo abaixo + slide-up + fade-in da página de detalhe. Não é shared-element nesse breakpoint.
- Implementação: o JS handler verifica `window.matchMedia('(max-width: 768px)').matches` e pula `startViewTransition`, indo direto para `router.push` + animação CSS de slide.
- Justificativa: shared-element em mobile com cards quase-viewport é overhead sem entrega visual.

**Página de detalhe no mobile:**
- Hero: foto em cima, headline + lead + KPIs (vertical), tags abaixo.
- KPIs viram lista vertical (não grid).
- "A Solução" 3 cards viram stack vertical.
- "Próximo case" no rodapé é card único largo.

---

## 10. SEO + metadata

Cada `/case-[slug]/page.tsx` exporta:

```ts
export async function generateStaticParams() {
  return CASES.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  return {
    title: `Case ${c.company} — Desk Manager`,
    description: c.lead,
    openGraph: {
      title: `Case ${c.company}`,
      description: c.lead,
      images: [{ url: c.photo, width: 1200, height: 630 }],
    },
  };
}
```

- Páginas são **pré-renderizadas** em build time (`generateStaticParams`).
- Cada rota tem `<h1>` único, meta description única, OG image única.
- Sitemap precisa incluir as 4 rotas. Se `app/sitemap.ts` ainda não existe, criar com as rotas principais + cases.

---

## 11. Out of scope (V1)

Coisas que **não** estão nesta v1, marcadas explicitamente para evitar scope creep:

- **Filtro/busca de cases** — só os 4 cases atuais, listagem `/cases` não é criada.
- **CMS/Markdown para conteúdo dos cases** — o `cases-sticky.ts` continua sendo a fonte. Migração para MDX/CMS é V2.
- **Vídeos diferentes por case sem `youtubeId`** — se um case não tiver `youtubeId`, a seção de vídeo é omitida (não há fallback de imagem).
- **Animação cross-page para o rodapé/footer** — só os 4 elementos do hero morfam. Hoje `FooterFull` é renderizado dentro de cada página (`app/page.tsx`), não no `layout.tsx`. Mover para o layout pai para virar persistente é uma melhoria possível mas fora do escopo desta v1; em v1, o footer simplesmente re-renderiza na navegação (crossfade automático do root da view transition).
- **Internacionalização** — só pt-BR.
- **Comparação A/B com fallback de página antiga** — esta página é nova, não há antiga em produção.
- **Animação na ida pra `/contato` ou `/fale-com-vendas`** — fora do escopo desta seção.

---

## 12. Critérios de aceite

A V1 está pronta quando:

1. As 4 rotas `/case-convergint`, `/case-eurofarma`, `/case-petz`, `/case-byd` existem e renderizam o template editorial completo.
2. Clicar no botão "Leia o case →" em qualquer card da Home dispara morph fluido (60fps) que pousa no hero da página correspondente.
3. O vídeo YouTube aparece como thumbnail. Click no thumbnail injeta iframe e toca.
4. Em mobile, navegação acontece com fade/slide (sem shared-element complexo) e a página de detalhe é totalmente legível no formato vertical.
5. `prefers-reduced-motion: reduce` faz navegação instantânea sem animação.
6. Cada página tem `<title>`, meta description e OG image próprios.
7. Lighthouse Performance score da Home não regride mais que 2 pontos vs baseline atual.
8. Lighthouse Performance score das páginas `/case-[slug]` ≥ 90 no desktop, ≥ 75 no mobile.
9. O botão "Próximo: [próximo case]" no rodapé da página de detalhe usa o mesmo padrão de morph, fechando o loop.

---

## 13. Riscos conhecidos

- **View Transitions API em Safari iOS 17 e anterior** não é suportada — degrada para navegação normal automaticamente (graceful, sem código extra).
- **Next.js 16 + View Transitions** ainda é experimental. Se o `router.push` dentro de `startViewTransition` não capturar o snapshot final corretamente em alguma versão, fallback é remover o wrapper de transição e voltar a navegação normal — degrada sem quebrar.
- **WebGL contexts ativos** durante a navegação (DottedSurface, WorldGlobe) já têm cleanup correto, mas vale rodar o app + DevTools Memory tab antes de fechar a V1 para confirmar que não vaza canvas entre navegações.
- **Conteúdo "Lorem ipsum" no site da Desk legado** indica que parte do material editorial dos cases não está pronto. Para V1 vou escrever texto sintético baseado em KPIs/lead/tags já estruturados e marcar `// TODO: validar com cliente` no código.

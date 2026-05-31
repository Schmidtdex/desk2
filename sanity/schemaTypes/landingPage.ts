import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

const linkFields = [
  defineField({ name: "title", title: "Label", type: "string", validation: r => r.required() }),
  defineField({ name: "href",  title: "URL / Âncora", type: "string" }),
];

/**
 * Landing Page document — one document controls the entire `/` page.
 * Marketing can edit texts, stats, logos, and cases without touching code.
 */
export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    // ─── HERO ──────────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "headlineLine1",
          title: "Linha 1 do Título",
          type: "string",
          description: "Ex: Não somos um software",
          validation: (rule) => rule.required().max(80),
        }),
        defineField({
          name: "headlineLine2",
          title: "Linha 2 do Título (destaque)",
          type: "string",
          description: "Ex: Somos a sinfonia da sua operação",
          validation: (rule) => rule.required().max(80),
        }),
        defineField({
          name: "pills",
          title: "Pílulas de Prova Social",
          type: "array",
          of: [{ type: "string" }],
          description: "Ex: #1 EM ITSM, +600 CLIENTES",
          validation: (rule) => rule.max(5),
        }),
      ],
    }),

    // ─── HARVARD STATS ─────────────────────────────────────────────────────
    defineField({
      name: "harvardStats",
      title: "Seção Harvard Business Review",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow (texto acima do título)",
          type: "string",
          initialValue: "Harvard Business Review",
        }),
        defineField({
          name: "headline",
          title: "Título principal",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "stats",
          title: "Estatísticas",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "Número (%)", type: "number" }),
                defineField({ name: "suffix", title: "Sufixo", type: "string", initialValue: "%" }),
                defineField({ name: "label", title: "Descrição", type: "text" }),
              ],
              preview: {
                select: { title: "value", subtitle: "label" },
                prepare({ title, subtitle }) {
                  return { title: `${title}%`, subtitle };
                },
              },
            },
          ],
          validation: (rule) => rule.max(6),
        }),
      ],
    }),

    // ─── THREE PILLARS ─────────────────────────────────────────────────────
    defineField({
      name: "threePillars",
      title: "Seção Três Pilares",
      type: "object",
      fields: [
        defineField({
          name: "headlineLines",
          title: "Linhas do Título",
          type: "array",
          of: [{ type: "string" }],
          description: "Cada item = uma linha do título",
          validation: (rule) => rule.max(6),
        }),
        defineField({
          name: "description",
          title: "Parágrafo de Descrição",
          type: "text",
          validation: (rule) => rule.max(400),
        }),
        defineField({
          name: "hubLabel",
          title: "Texto do Hub Central",
          type: "string",
          description: "Ex: Plataforma de IA para serviços e processos",
        }),
        defineField({
          name: "pillars",
          title: "Pilares (bolhas laterais)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Nome", type: "string" }),
                defineField({ name: "description", title: "Descrição curta", type: "string" }),
              ],
              preview: { select: { title: "name", subtitle: "description" } },
            },
          ],
          validation: (rule) => rule.max(2),
        }),
      ],
    }),

    // ─── WORLD GLOBE ───────────────────────────────────────────────────────
    defineField({
      name: "worldGlobe",
      title: "Seção Presença Global",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "countriesCount", title: "Número de países", type: "string", description: "Ex: +40" }),
        defineField({ name: "description", title: "Descrição", type: "text" }),
      ],
    }),


    // ─── PARTNERS MARQUEE ──────────────────────────────────────────────────
    defineField({
      name: "partnersMarquee",
      title: "Seção Parceiros (Marquee)",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Texto lateral", type: "string" }),
        defineField({
          name: "logos",
          title: "Logotipos",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "alt",    title: "Nome da empresa", type: "string", validation: r => r.required() }),
              defineField({ name: "image",  title: "Logo",            type: "image",  options: { hotspot: false } }),
              defineField({ name: "height", title: "Altura em px",    type: "number", initialValue: 48 }),
            ],
            preview: { select: { title: "alt", media: "image" } },
          }],
        }),
      ],
    }),

    // ─── NAVBAR ────────────────────────────────────────────────────────────
    defineField({
      name: "navbar",
      title: "Navbar",
      type: "object",
      fields: [
        defineField({ name: "loginLabel", title: "Botão Entrar (label)", type: "string", initialValue: "Entrar" }),
        defineField({ name: "ctaLabel",   title: "Botão CTA (label)",    type: "string", initialValue: "Falar com especialista" }),
        defineField({ name: "ctaHref",    title: "Botão CTA (link)",     type: "string", initialValue: "#scene-cta" }),
        defineField({
          name: "links",
          title: "Links de navegação",
          type: "array",
          of: [{ type: "object", fields: linkFields, preview: { select: { title: "title", subtitle: "href" } } }],
          validation: r => r.max(8),
        }),
      ],
    }),

    // ─── AI ANATOMY ────────────────────────────────────────────────────────
    defineField({
      name: "aiAnatomy",
      title: "Seção Anatomia da IA",
      type: "object",
      fields: [
        defineField({ name: "eyebrow",     title: "Eyebrow",    type: "string", initialValue: "Anatomia" }),
        defineField({ name: "headline",    title: "Título",     type: "string" }),
        defineField({ name: "description", title: "Parágrafo", type: "text"   }),
        defineField({
          name: "layers",
          title: "Camadas da pirâmide (de baixo para cima)",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", title: "Título",   type: "string" }),
              defineField({ name: "sub",   title: "Subtítulo", type: "string" }),
              defineField({ name: "width", title: "Largura CSS (ex: w-[90%])", type: "string" }),
            ],
            preview: { select: { title: "title", subtitle: "sub" } },
          }],
          validation: r => r.max(6),
        }),
      ],
    }),

    // ─── ECOSYSTEM HUB ─────────────────────────────────────────────────────
    defineField({
      name: "ecosystemHub",
      title: "Seção Ecossistema",
      type: "object",
      fields: [
        defineField({ name: "eyebrow",       title: "Eyebrow",         type: "string", initialValue: "O Ecossistema" }),
        defineField({ name: "headlineLine1", title: "Título — linha 1", type: "string", initialValue: "Uma plataforma." }),
        defineField({ name: "headlineLine2", title: "Título — linha 2", type: "string", initialValue: "Cinco pilares." }),
        defineField({
          name: "pillars",
          title: "Pilares",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "id",          title: "ID (único, sem espaços)", type: "string", validation: r => r.required() }),
              defineField({ name: "label",       title: "Label curto (ex: ESM)",   type: "string" }),
              defineField({ name: "name",        title: "Nome completo",           type: "string" }),
              defineField({ name: "description", title: "Descrição",               type: "text"   }),
            ],
            preview: { select: { title: "label", subtitle: "name" } },
          }],
          validation: r => r.max(8),
        }),
      ],
    }),

    // ─── SEGMENTS CAROUSEL (expanded) ──────────────────────────────────────
    defineField({
      name: "segmentsCarousel",
      title: "Seção Segmentos",
      type: "object",
      fields: [
        defineField({ name: "eyebrow",     title: "Eyebrow",   type: "string" }),
        defineField({ name: "headline",    title: "Título",    type: "string" }),
        defineField({ name: "description", title: "Parágrafo", type: "text"   }),
        defineField({
          name: "segments",
          title: "Segmentos",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "id",          title: "ID (único)",    type: "string", validation: r => r.required() }),
              defineField({ name: "title",       title: "Título",        type: "string" }),
              defineField({ name: "description", title: "Descrição",     type: "text"   }),
              defineField({ name: "image",       title: "Imagem",        type: "image",  options: { hotspot: true } }),
              defineField({ name: "ctaLabel",    title: "Botão CTA",     type: "string", initialValue: "Saiba mais" }),
              defineField({ name: "ctaHref",     title: "Link do botão", type: "string" }),
            ],
            preview: { select: { title: "title", media: "image" } },
          }],
          validation: r => r.max(12),
        }),
      ],
    }),

    // ─── CASES SECTION (expanded) ──────────────────────────────────────────
    defineField({
      name: "casesSection",
      title: "Seção Cases",
      type: "object",
      fields: [
        defineField({ name: "eyebrow",  title: "Eyebrow",  type: "string", initialValue: "Cases de sucesso" }),
        defineField({ name: "headline", title: "Título",   type: "string", initialValue: "Resultados que falam por si." }),
      ],
    }),

    // ─── FINAL CTA ─────────────────────────────────────────────────────────
    defineField({
      name: "finalCta",
      title: "Seção CTA Final",
      type: "object",
      fields: [
        defineField({ name: "eyebrow",   title: "Eyebrow",     type: "string", initialValue: "Provocação final" }),
        defineField({ name: "question1", title: "Pergunta 1",  type: "text" }),
        defineField({ name: "question2", title: "Pergunta 2",  type: "text" }),
        defineField({ name: "ctaLabel",  title: "Texto botão", type: "string", initialValue: "Vamos colocar sua operação em movimento." }),
        defineField({ name: "ctaHref",   title: "Link botão",  type: "string" }),
      ],
    }),

    // ─── DESK EXPERIENCE ───────────────────────────────────────────────────
    defineField({
      name: "deskExperience",
      title: "Seção Desk Experience",
      type: "object",
      fields: [
        defineField({ name: "heroLine1",      title: "Linha hero 1",          type: "string", initialValue: "Mais que um escritório" }),
        defineField({ name: "heroLine2",      title: "Linha hero 2",          type: "string", initialValue: "Desk experience" }),
        defineField({ name: "eyebrow",        title: "Eyebrow editorial",     type: "string", initialValue: "Desk Manager Experience" }),
        defineField({ name: "headline",       title: "Título editorial",      type: "string", initialValue: "Hub estratégico de inovação e cocriação." }),
        defineField({ name: "body1",          title: "Parágrafo 1",           type: "text"   }),
        defineField({ name: "body2",          title: "Parágrafo 2",           type: "text"   }),
        defineField({ name: "locationBadge",  title: "Badge de localização",  type: "string", initialValue: "Vila Olímpia · São Paulo" }),
        defineField({
          name: "features",
          title: "Feature cards",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", title: "Título",    type: "string" }),
              defineField({ name: "desc",  title: "Descrição", type: "text"   }),
            ],
            preview: { select: { title: "title", subtitle: "desc" } },
          }],
          validation: r => r.max(6),
        }),
      ],
    }),

    // ─── FOOTER ────────────────────────────────────────────────────────────
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "tagline",    title: "Tagline",              type: "string" }),
        defineField({ name: "phone",      title: "Telefone",             type: "string" }),
        defineField({ name: "email",      title: "E-mail",               type: "string" }),
        defineField({ name: "addressHQ",  title: "Endereço Sede",        type: "text"   }),
        defineField({ name: "addressExp", title: "Endereço Experience",  type: "text"   }),
        defineField({ name: "cnpj",       title: "CNPJ",                 type: "string" }),
        defineField({ name: "copyright",  title: "Texto copyright",      type: "string" }),
        defineField({ name: "madeWith",   title: "Texto rodapé",         type: "string" }),
        defineField({
          name: "linkGroups",
          title: "Grupos de links",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "heading", title: "Título do grupo", type: "string" }),
              defineField({
                name: "links",
                title: "Links",
                type: "array",
                of: [{ type: "object", fields: linkFields, preview: { select: { title: "title" } } }],
              }),
            ],
            preview: { select: { title: "heading" } },
          }],
        }),
        defineField({
          name: "socials",
          title: "Redes Sociais",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "platform", title: "Plataforma (facebook/instagram/linkedin)", type: "string", validation: r => r.required() }),
              defineField({ name: "href",     title: "URL",             type: "string" }),
              defineField({ name: "label",    title: "Label acessível", type: "string" }),
            ],
            preview: { select: { title: "platform", subtitle: "href" } },
          }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Landing Page Principal" };
    },
  },
});

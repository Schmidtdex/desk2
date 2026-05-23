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

export type Step = { num: string; title: string; body: string };

export type WhyItem = { title: string; body: string; featured?: boolean };
export type Faq = { q: string; a: string };

export type AnchorPractice = { title: string; body: string };
export type AnchorGroup = {
  cat: string;
  title: string;
  practices: AnchorPractice[];
};

export type HeroMetric = {
  value: string;
  label: string;
  count?: number;
  suffix?: string;
};

export const HERO_METRICS: HeroMetric[] = [
  { value: "12",      label: "Práticas ITIL certificadas",       count: 12,  suffix: ""  },
  { value: "100%",    label: "Rastreabilidade ponta a ponta",      count: 100, suffix: "%" },
  { value: "40+",     label: "Países em operação",                  count: 60,  suffix: "+" },
  { value: "ITIL®",  label: "Primeira plataforma BR aderente" },
];

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
    title: "Estratégia",
    body: "Avaliação da situação atual, definição de metas (reduzir tempo de inatividade, melhorar experiência do usuário, aprimorar governança) e seleção de framework. Stakeholders e plano em fases.",
  },
  {
    num: "02",
    title: "Implementação",
    body: "Estabelecimento das práticas core — Incidente, Mudança, Requisição. Fluxos padronizados, treinamento das equipes, central de serviços como ponto único de contato.",
  },
  {
    num: "03",
    title: "Maturidade",
    body: "Avaliação contínua com CMMI ou Maturidade ITIL. Evolução do suporte reativo pra proativo, identificação de gaps, refinamento dos processos.",
  },
  {
    num: "04",
    title: "Automação",
    body: "Fluxos automatizados, portal de autoatendimento, IA aplicada a previsão de incidentes e resolução rápida. Automação como arquitetura nativa, não módulo extra.",
  },
];

export const ANCHOR_ITSM = {
  asideTitle: "12 práticas ITIL® com IA nativa aplicada na execução.",
  asideBody:
    "Cada prática vem com fluxos prontos, configuração no-code e IA aplicada no dia a dia operacional. Não é teoria de framework — é execução automatizada e rastreável.",
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
  { title: "ITIL® certificado pela PeopleCert", body: "Aderência reconhecida globalmente. As práticas vêm certificadas, não inferidas." },
  { title: "Certificação ISO 27001", body: "Infraestrutura auditada globalmente, com relatórios SOC 1, SOC 2, SOC 3 e conformidade PCI DSS Nível 1. Padrão internacional de gestão de segurança da informação.", featured: true },
  { title: "Hospedado em AWS", body: "Redundância em múltiplas zonas, criptografia AES-256 em repouso e TLS 1.3 em trânsito. LGPD por padrão na operação." },
  { title: "600+ grandes clientes", body: "Milhares de usuários ativos em operações enterprise, em mais de 40 países e múltiplos idiomas. Maturidade comprovada em escala." },
];

export const FAQS: Faq[] = [
  { q: "Em quanto tempo a Desk Manager fica em produção?", a: "Depende do escopo da operação e da quantidade de departamentos envolvidos. Operações enterprise com múltiplas áreas costumam fazer rollout faseado. Fale com nosso time para um diagnóstico do seu cenário." },
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

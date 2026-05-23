/* ============================================================
   Desk Manager — ESM Product Page Data
   Concept shift vs ITSM:
   ITSM organizes IT. ESM orchestrates the whole company.
   Target persona is C-suite (CEO, COO, CFO, CHRO) — the problem
   stops being a department and becomes the company operating
   disconnected. Eurofarma + Petz Cobasi are the proof points.
   ============================================================ */

export type Stakeholder = {
  role: string;
  pain: string;
  body: string;
};

export type DepartmentArea = {
  letter: string;
  name: string;
  desc: string;
};

export type Phase = { num: string; title: string; body: string };

export type Differentiator = { title: string; body: string; featured?: boolean };
export type Faq = { q: string; a: string };

export type DomainPractice = { title: string; body: string };
export type DomainGroup = {
  domain: string;
  lead: string;
  practices: DomainPractice[];
};

export type HeroMetric = {
  value: string;
  label: string;
  count?: number;
  suffix?: string;
};

/* ---------- Hero metrics — ESM scale, not ITIL counts ---------- */
export const HERO_METRICS: HeroMetric[] = [
  { value: "+90",  label: "Departamentos numa só operação",   count: 90, suffix: "+" },
  { value: "+30",  label: "Áreas distintas num único motor",   count: 30, suffix: "+" },
  { value: "+24",  label: "Países em operação multi-idioma",   count: 24, suffix: "+" },
  { value: "24/7", label: "Portal único do colaborador" },
];

/* ---------- C-suite stakeholders, not IT roles ---------- */
export const STAKEHOLDERS: Stakeholder[] = [
  {
    role: "CEO",
    pain: "Empresa desconectada",
    body: "A operação não fala uma língua só. Cada área comprou um SaaS, cada decisão mora num lugar diferente. ESM devolve o desenho de empresa única.",
  },
  {
    role: "COO",
    pain: "Fluxos cross-área sem dono",
    body: "Onboarding atravessa RH, TI, Facilities e Financeiro, e morre no caminho. ESM dá responsável, prazo e rastro a cada handoff entre áreas.",
  },
  {
    role: "CFO",
    pain: "Custo de TI multiplicado por área",
    body: "Oito ferramentas diferentes resolvendo a mesma coisa em departamentos distintos. ESM consolida em uma plataforma, com licença e governança unificadas.",
  },
  {
    role: "CHRO",
    pain: "Experiência do colaborador fragmentada",
    body: "Cada pedido em um canal, cada resposta num tom. ESM entrega portal único 24/7, com SLA e catálogo cross-área pro time inteiro.",
  },
];

/* ---------- Areas under ESM (replaces ITIL value chain) ---------- */
export const DEPARTMENT_AREAS: DepartmentArea[] = [
  { letter: "RH", name: "Recursos humanos",  desc: "onboarding, dúvidas, requisições, treinamento" },
  { letter: "JU", name: "Jurídico",          desc: "contratos, pareceres, controle de vencimentos" },
  { letter: "FI", name: "Financeiro",        desc: "reembolsos, aprovações, ciclo de fornecedor" },
  { letter: "FC", name: "Facilities",        desc: "manutenção, patrimônio, ocupação de espaço" },
  { letter: "MK", name: "Marketing",         desc: "brand requests, agentes de IA, asset library" },
  { letter: "TI", name: "Tecnologia",        desc: "service desk, ativos, mudanças, ITIL nativo" },
];

/* ---------- ESM rollout — corporate, not departmental ---------- */
export const PHASES: Phase[] = [
  {
    num: "01",
    title: "Mapeamento corporativo",
    body: "Diagnóstico das áreas, sistemas legados e fluxos cross-departamentais. Quem entrega o quê, com que SLA, pra quem. Mapa antes de migração.",
  },
  {
    num: "02",
    title: "Catálogo único",
    body: "Um catálogo corporativo de serviços, com formulários, donos e SLA por item. Portal único do colaborador: RH, TI, Jurídico e Facilities, mesma porta.",
  },
  {
    num: "03",
    title: "Orquestração cross-área",
    body: "Workflows que atravessam áreas com handoff automatizado. Aprovações, integrações com ERP/CRM via Maestro iPaaS, dashboard executivo cross-departamental.",
  },
  {
    num: "04",
    title: "Hiper-automação",
    body: "Agentes de IA decidindo e executando dentro dos fluxos. Recomendação, classificação e resolução autônoma. O time foca em exceção, não em rotina.",
  },
];

/* ---------- Department bento — 4 domínios da empresa ---------- */
export const ESM_DOMAINS = {
  asideTitle: "Uma plataforma, todas as áreas. Mesmo motor.",
  asideBody:
    "Em vez de oito SaaS desconectados, um único catálogo, um único portal, um único audit trail. Cada área herda o framework. Só configura o que é particular dela.",
  groups: [
    {
      domain: "Gente & cultura",
      lead: "RH como serviço, não como caixa de e-mail",
      practices: [
        { title: "Onboarding orquestrado",        body: "Admissão atravessa RH, TI, Facilities e Financeiro em fluxo único, com SLA por etapa e provisionamento automático." },
        { title: "Portal do colaborador 24/7",    body: "Uma porta para férias, holerite, benefícios, requisições e dúvidas, com IA respondendo o repetitivo." },
        { title: "Treinamento e desenvolvimento", body: "Trilhas, certificações e avaliações em fluxo, com indicadores de adesão e maturidade por área." },
        { title: "Comunicação interna",            body: "Anúncios, pesquisas de clima e ações de engajamento em um canal. Com métrica, não com WhatsApp." },
      ],
    },
    {
      domain: "Operação física",
      lead: "Tudo que precisa estar de pé no mundo real",
      practices: [
        { title: "Manutenção preventiva e corretiva", body: "Ordens de serviço, plano de manutenção, parada de máquina e custo por ativo, com mobile para o técnico em campo." },
        { title: "Patrimônio e ativos",                body: "Ciclo de vida do ativo físico, do recebimento ao descarte. Termo de responsabilidade, depreciação, inventário." },
        { title: "Ocupação de espaço",                 body: "Reserva de sala, gestão de prédios, controle de acesso e ocupação. Facilities deixa de ser planilha." },
        { title: "Saúde e segurança",                  body: "EPI, treinamentos obrigatórios, registros de incidente e auditoria de NR. Compliance ocupacional sem retrabalho." },
      ],
    },
    {
      domain: "Risco & contrato",
      lead: "O jurídico que vê a empresa inteira",
      practices: [
        { title: "Ciclo contratual",          body: "Pedido, redação, revisão, assinatura e vigência em fluxo único, com SLA e alçada por valor." },
        { title: "Controle de vencimentos",   body: "Mapa de contratos vencendo, renovação automática e alerta proativo. Nenhum compliance perdido por esquecimento." },
        { title: "Pareceres e demandas",      body: "Demandas jurídicas com triagem, prazo e responsável. Histórico cross-área e audit trail completo." },
        { title: "Compliance e auditoria",    body: "Trilha de evidências por norma, política e responsável. LGPD, SOX e ISO em um único repositório auditável." },
      ],
    },
    {
      domain: "Negócio & receita",
      lead: "Marketing, financeiro e comercial no mesmo desenho",
      practices: [
        { title: "Brand & creative requests", body: "Briefings, aprovações e entregas de marketing em fluxo. Asset library central, agentes de IA fazendo o repetitivo." },
        { title: "Aprovações financeiras",    body: "Reembolso, adiantamento, ordem de compra e nota fiscal em fluxo único, com alçada e integração ERP via Maestro." },
        { title: "Ciclo do fornecedor",       body: "Cadastro, homologação, contrato, pedido e medição, com SLA por etapa. Operação de compras orquestrada." },
        { title: "Suporte ao cliente (SAC)",  body: "Atendimento omnichannel pra redes de varejo e operações enterprise. Mesma plataforma que opera o time interno." },
      ],
    },
  ] satisfies DomainGroup[],
};

/* ---------- Why Desk Manager — ESM angle ---------- */
export const DIFFERENTIATORS: Differentiator[] = [
  { title: "Uma plataforma, não oito SaaS",          body: "RH, TI, Jurídico, Facilities e Financeiro no mesmo motor. Uma licença, um time de implantação, uma curva de aprendizado." },
  { title: "Mesmo desenho, áreas diferentes",         body: "Cada área herda o framework de catálogo, SLA e workflow. Só configura o que é particular dela. Não reinventa." },
  { title: "Maestro iPaaS conecta o legado",          body: "ERP, CRM, banco de comunicação, sistemas autorais. A plataforma se pluga no que você já tem, sem rip-and-replace.", featured: true },
  { title: "Catálogo único do colaborador",           body: "Uma porta de entrada para a empresa toda. O usuário não precisa saber qual time resolve: o catálogo encaminha." },
  { title: "Audit trail unificado",                   body: "Toda decisão, toda aprovação, todo handoff registrado. LGPD, SOX e ISO num único repositório auditável." },
  { title: "Dashboard executivo cross-área",          body: "Indicador de operação que atravessa RH, Facilities, Jurídico e TI no mesmo painel. Visão de empresa, não de departamento." },
];

/* ---------- ESM-specific FAQ ---------- */
export const FAQS: Faq[] = [
  { q: "Qual a diferença entre ITSM e ESM na prática?",                       a: "ITSM organiza a entrega de serviço da TI. ESM aplica o mesmo desenho a qualquer área: RH, Jurídico, Financeiro, Facilities, Marketing. Mesmo motor, mesmo catálogo, mesma plataforma. A diferença é de escopo, não de tecnologia." },
  { q: "Conseguimos plugar nos sistemas que já temos (ERP, RH, jurídico)?",   a: "Sim. O iPaaS Maestro é a camada de integração nativa. Ele se conecta a ERP, CRM, sistemas legados e ferramentas departamentais por API ou conector pré-construído. Você não precisa trocar o que já funciona." },
  { q: "Cada área precisa de um especialista em Desk Manager?",                a: "Não. A plataforma é no-code para configuração de catálogo, fluxos e formulários. Cada área configura o que é particular dela. A TI mantém a governança da plataforma, mas não opera por dentro de cada departamento." },
  { q: "Vale a pena pra empresas que ainda têm ITSM imaturo?",                 a: "Sim. A operação de TI entra como o primeiro domínio, com ITIL nativo, e o restante das áreas se beneficia do mesmo desenho à medida que entra na plataforma. Não precisa esperar maturidade plena de TI pra começar." },
  { q: "Quanto tempo até a primeira área não-TI entrar em produção?",          a: "Depende do escopo, mas o catálogo de uma área secundária (ex: Facilities ou Jurídico) costuma entrar em produção em semanas, não meses. O segredo é não tratar como projeto de implantação. É jornada de adoção." },
  { q: "Como o portal único do colaborador funciona?",                          a: "Uma porta de entrada para a empresa inteira. O usuário descreve o que precisa, o catálogo encaminha para a área certa com SLA, formulário e fluxo. Ele não precisa decidir entre RH, TI, Jurídico ou Facilities." },
];

export const PAGE_CONFIG = {
  productLabel: "ESM",
  eyebrow: "Produto · ESM",
  showWhy: true,
};

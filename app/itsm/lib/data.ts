/* ============================================================
   Desk Manager — ITSM Product Page Data
   ============================================================ */

export type PersonaLevel = {
  level: string;
  roles: string;
  summary: string;
  image?: { src: string; alt: string; w: number; h: number };
};

export type Step = { num: string; title: string; body: string };

export type Faq = { q: string; a: string };

export type AnchorPractice = {
  title: string;
  body: string;
  bullets: string[];
};
export type AnchorGroup = {
  cat: string;
  title: string;
  practices: AnchorPractice[];
};

export type CapabilityCard = {
  title: string;
  body: string;
  features: string[];
  image?: { src: string; alt: string; w: number; h: number };
};

export type Capability = {
  id: string;
  title: string;
  body: string;
  cards: CapabilityCard[];
  badges?: { value: string; label: string }[];
};

export type CtaBand = {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export type ItilFact = { value: string; label: string };

export const ITIL_SPOTLIGHT = {
  title: "Certificada pela PeopleCert como ITIL® Accredited Tool Vendor.",
  body:
    "A Desk Manager é a primeira plataforma brasileira a ter seus processos auditados e certificados pela PeopleCert, mantenedora oficial do framework ITIL®. Não é aderência declarada — é conformidade verificada por terceiros, com auditoria recorrente.",
  facts: [
    { value: "12", label: "práticas certificadas" },
    { value: "PeopleCert · AXELOS", label: "autoridade do framework" },
    { value: "Auditoria recorrente", label: "conformidade verificada" },
  ] satisfies ItilFact[],
};

export const PERSONAS: PersonaLevel[] = [
  {
    level: "Estratégico",
    roles: "CIO, CTO, CISO, Diretores de TI",
    summary:
      "Dashboards executivos em tempo real, indicadores de maturidade ITIL® e relatórios de TCO/ROI — para alinhar TI ao negócio sem precisar abrir planilha.",
    image: { src: "/itsm/estrategico.png", alt: "Painel executivo da Desk Manager com indicadores de TI", w: 1802, h: 976 },
  },
  {
    level: "Tático",
    roles: "Gerentes, coordenadores, líderes e supervisores",
    summary:
      "Filas inteligentes, automação de escalações e relatórios de produtividade para manter o SLA de pé sem queimar o time.",
    image: { src: "/itsm/incidentes-dashboard.png", alt: "Dashboard de chamados com fila e SLAs", w: 1920, h: 1046 },
  },
  {
    level: "Operacional",
    roles: "Analistas, técnicos, agentes e atendentes",
    summary:
      "Interface enxuta, sugestões de resolução por IA, templates de resposta e ações em lote — pra resolver mais com menos clique.",
    image: { src: "/itsm/incidentes-fluxos.png", alt: "Fluxo de atendimento de chamados", w: 1920, h: 1042 },
  },
];

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Estratégia",
    body: "Avaliação da situação atual, metas de redução de inatividade e governança, seleção de framework. Stakeholders mapeados e plano em fases.",
  },
  {
    num: "02",
    title: "Implementação",
    body: "Práticas core em pé — Incidente, Mudança, Requisição. Fluxos padronizados, treinamento das equipes, central de serviços como ponto único.",
  },
  {
    num: "03",
    title: "Maturidade",
    body: "Avaliação contínua via CMMI ou Maturidade ITIL. Evolução do suporte reativo para proativo, refinamento de processos.",
  },
  {
    num: "04",
    title: "Automação",
    body: "Fluxos automatizados, portal de autoatendimento, IA aplicada a previsão e resolução. Automação como arquitetura nativa, não módulo extra.",
  },
];

export const ANCHOR_ITSM = {
  asideBody:
    "Cada prática vem com fluxos prontos, configuração no-code e IA aplicada no dia a dia operacional. Não é teoria de framework — é execução automatizada e rastreável.",
  groups: [
    {
      cat: "Operação",
      title: "Execução do dia a dia",
      practices: [
        {
          title: "Gestão de Incidentes",
          body: "Restaure a operação normal o mais rápido possível, minimizando impacto no negócio.",
          bullets: [
            "Categorização automática por IA",
            "Escalonamento inteligente",
            "Base de conhecimento integrada",
          ],
        },
        {
          title: "Requisições de Serviço",
          body: "Catálogo, aprovações automatizadas e portal de autoatendimento estruturado.",
          bullets: [
            "Catálogo de serviços",
            "Fluxos de aprovação",
            "SLAs por serviço",
          ],
        },
        {
          title: "Gestão de Problemas",
          body: "Identifique causa raiz dos incidentes recorrentes e implemente soluções definitivas.",
          bullets: [
            "Análise de causa raiz",
            "Erros conhecidos",
            "Workarounds documentados",
          ],
        },
      ],
    },
    {
      cat: "Mudança & ativos",
      title: "Controle sobre o que muda",
      practices: [
        {
          title: "Habilitação de Mudanças",
          body: "Avalie riscos e autorize alterações de forma controlada para maximizar mudanças bem-sucedidas.",
          bullets: [
            "GMUDs automatizadas",
            "Análise de impacto",
            "Calendário de mudanças",
          ],
        },
        {
          title: "Ativos de TI",
          body: "Gerencie o ciclo de vida completo de todos os ativos da organização.",
          bullets: [
            "Inventário automático",
            "Ciclo de vida",
            "Contratos vinculados",
          ],
        },
        {
          title: "Configuração (CMDB)",
          body: "Base de itens de configuração e relações que dá contexto a cada incidente, requisição ou mudança.",
          bullets: [
            "Descoberta automática",
            "Relacionamentos mapeados",
            "Impacto visual",
          ],
        },
      ],
    },
    {
      cat: "Experiência",
      title: "A camada que toca o usuário",
      practices: [
        {
          title: "Conhecimento",
          body: "Capture, organize e compartilhe conhecimento para resolver mais rápido.",
          bullets: [
            "Base ativa",
            "Artigos sugeridos por contexto",
            "IA aplicada à busca",
          ],
        },
        {
          title: "Catálogo de Serviços",
          body: "Portal unificado com todos os serviços de TI visíveis e categorizados.",
          bullets: [
            "Portal do usuário",
            "Níveis de serviço visíveis",
            "Disponibilidade 24/7",
          ],
        },
        {
          title: "Segurança da Informação",
          body: "Proteja a confidencialidade, integridade e disponibilidade dos serviços.",
          bullets: [
            "Controles de acesso",
            "Trilhas de auditoria",
            "Conformidade LGPD",
          ],
        },
      ],
    },
    {
      cat: "Governança",
      title: "Visão executiva e maturidade",
      practices: [
        {
          title: "Níveis de Serviço (SLA)",
          body: "Defina, monitore e reporte os níveis acordados com precisão.",
          bullets: [
            "SLAs dinâmicos",
            "Alertas proativos",
            "Relatórios de aderência",
          ],
        },
        {
          title: "Fornecedores",
          body: "Garanta que terceiros e seu desempenho sustentem a entrega de serviços.",
          bullets: [
            "Cadastro centralizado",
            "SLAs de terceiros",
            "Avaliação de desempenho",
          ],
        },
        {
          title: "Melhoria Contínua",
          body: "Identifique oportunidades e implemente mudanças incrementais.",
          bullets: [
            "Indicadores de maturidade",
            "Benchmarks de mercado",
            "Roadmap de evolução",
          ],
        },
      ],
    },
  ] satisfies AnchorGroup[],
};

export const CAPABILITIES: Capability[] = [
  {
    id: "incidentes",
    title: "Resolva incidentes mais rápido",
    body: "Reduza o tempo de resolução em até 45% com priorização por IA, escalonamento automático e processos ITIL® certificados.",
    cards: [
      {
        title: "Dashboard de incidentes",
        body: "Tudo o que acontece visível em tempo real. Priorização automática, alertas de SLA e categorização inteligente.",
        features: [
          "Priorização automática por impacto e urgência",
          "Alertas proativos de violação de SLA",
          "Categorização inteligente por IA",
          "Histórico completo do incidente",
        ],
        image: { src: "/itsm/incidentes-dashboard.png", alt: "Dashboard de incidentes com priorização automática", w: 1920, h: 1046 },
      },
      {
        title: "Fluxos de resolução",
        body: "Automatize o processo com workflows configuráveis e escalonamento inteligente — do registro à entrega.",
        features: [
          "Escalonamento automático por regras",
          "Templates por categoria",
          "Integração com base de conhecimento",
          "Aprovações e notificações automáticas",
        ],
        image: { src: "/fluxo-itsm.png", alt: "Fluxo de resolução de incidentes ponta a ponta", w: 1704, h: 923 },
      },
    ],
  },
  {
    id: "cmdb",
    title: "Controle total da infraestrutura",
    body: "Inventário preciso de todos os ativos e itens de configuração, com relacionamentos mapeados para análise de impacto.",
    cards: [
      {
        title: "Inventário de ativos",
        body: "Descubra e gerencie automaticamente todos os ativos de TI da organização.",
        features: [
          "Mais de 50 tipos de ativos",
          "Descoberta automática",
          "Ciclo de vida completo",
          "Vínculo com contratos e fornecedores",
        ],
        image: { src: "/itsm/cmdb-inventario.png", alt: "Inventário de ativos com tipos e ciclo de vida", w: 668, h: 620 },
      },
      {
        title: "Relacionamentos",
        body: "Visualize dependências entre ICs para entender o impacto antes de mudar.",
        features: [
          "25+ tipos de relação",
          "Visualização gráfica",
          "Análise de impacto",
          "Histórico de mudanças por IC",
        ],
        image: { src: "/itsm/cmdb-relacionamentos.png", alt: "Visualização de relacionamentos entre ICs", w: 736, h: 760 },
      },
    ],
    badges: [
      { value: "50+", label: "tipos de ativos" },
      { value: "25+", label: "tipos de relação" },
      { value: "Auto", label: "descoberta" },
    ],
  },
  {
    id: "automacao",
    title: "Automatize tudo que puder",
    body: "Construtor visual low-code: o motor da automação é o mesmo do ITSM, não um módulo plugado.",
    cards: [
      {
        title: "Construtor de fluxos",
        body: "Crie automações complexas sem código com drag-and-drop, 200+ conectores e condicionais avançados.",
        features: [
          "Interface drag-and-drop",
          "200+ conectores nativos",
          "Condicionais e loops",
          "Testes antes de publicar",
        ],
        image: { src: "/fluxo-itsm.png", alt: "Construtor visual de fluxos do Maestro", w: 1704, h: 923 },
      },
    ],
  },
];

export const CTA_BAND: CtaBand = {
  title: "Pronto pra transformar sua operação de TI?",
  body: "Centenas de empresas usam a Desk Manager pra entregar serviços de TI de classe mundial. Comece pelo diagnóstico ou fale direto com um especialista.",
  primary: { label: "Falar com um especialista", href: "/contato" },
  secondary: { label: "Agendar demonstração", href: "/demo" },
};

export const FAQS: Faq[] = [
  { q: "Em quanto tempo a Desk Manager fica em produção?", a: "Depende do escopo e da quantidade de departamentos envolvidos. Operações enterprise costumam fazer rollout faseado. Em média, plataforma sustenta 2M+ chamados por mês com 99,9% de disponibilidade contratual — escala não é restrição." },
  { q: "Funciona com nosso help desk atual durante a transição?", a: "Sim. O iPaaS Maestro permite operação híbrida — você migra fluxos por área enquanto mantém integração com sistemas legados, sem ruptura no atendimento." },
  { q: "Preciso de equipe técnica dedicada pra configurar?", a: "Não. A plataforma é no-code pra fluxos, telas e regras. O time de operações configura sem depender de TI." },
  { q: "A IA nativa exige treinamento dos modelos?", a: "Não. A IA já vem pré-treinada pra serviços e operações. Você refina com base de conhecimento e dados da sua operação ao longo do uso, sem projeto de ML." },
  { q: "A plataforma é aderente a LGPD?", a: "Sim. Hospedagem AWS no Brasil, criptografia AES-256 em repouso e TLS 1.3 em trânsito, trilha de auditoria completa e controle granular de acesso. Também temos ISO 27001, SOC 1/2/3 e PCI DSS Nível 1." },
];

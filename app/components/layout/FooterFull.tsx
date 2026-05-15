"use client";

import type { ComponentProps, ReactNode } from "react";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const empresa = [
  { title: "Nossa Cultura", href: "#" },
  { title: "Na Mídia",      href: "#" },
  { title: "Nossa Marca",   href: "#" },
  { title: "Store",         href: "#" },
  { title: "Aprenda",       href: "#" },
  { title: "Eventos",       href: "#" },
  { title: "Trabalhe Conosco", href: "#" },
];

const legal = [
  { title: "Código de Ética",       href: "#" },
  { title: "Canal de Denúncias",    href: "#" },
  { title: "Política de Privacidade", href: "#" },
  { title: "Termos de Uso",         href: "#" },
  { title: "Perguntas Frequentes",  href: "#" },
  { title: "Segurança",             href: "#" },
  { title: "Trust Center",          href: "#" },
];

const segmentos = [
  "Agro e Alimentos",
  "Educação",
  "Indústria",
  "Logística",
  "Saúde e Diagnóstico",
  "Serviços e Outsourcing",
  "Varejo",
];

const conteudo = ["Blog", "Recursos", "AI Agent", "BPM", "ESM", "MAESTRO", "ITSM"];

const socials = [
  { icon: FacebookIcon,  href: "#", label: "Facebook"  },
  { icon: InstagramIcon, href: "#", label: "Instagram"  },
  { icon: LinkedinIcon,  href: "#", label: "LinkedIn"   },
];

export function FooterFull() {
  return (
    <footer
      className="relative w-full border-t overflow-hidden"
      style={{ backgroundColor: "#000000", borderColor: "rgba(2,55,255,0.2)" }}
    >
      {/* Glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 blur-sm"
        style={{ backgroundColor: "#0237FF", opacity: 0.4 }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-10">

        {/* Logo + socials */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-14">
          <AnimatedContainer delay={0}>
            <img
              src="/Logotipo principal - branco.png"
              alt="Desk Manager"
              className="h-20 w-auto mb-4"
            />
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(169,219,255,0.6)" }}>
              Orquestramos negócios para grandes resultados.
            </p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.1} className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "rgba(2,55,255,0.15)",
                  border: "1px solid rgba(2,55,255,0.3)",
                  color: "#A9DBFF",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(2,55,255,0.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(2,55,255,0.15)"; }}
              >
                <Icon />
              </a>
            ))}
          </AnimatedContainer>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">

          <AnimatedContainer delay={0.1} className="col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#A9DBFF" }}>Sobre</h3>
            <ul className="space-y-2.5">
              {empresa.map(l => (
                <li key={l.title}>
                  <a href={l.href} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>{l.title}</a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15} className="col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#A9DBFF" }}>Legal</h3>
            <ul className="space-y-2.5">
              {legal.map(l => (
                <li key={l.title}>
                  <a href={l.href} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>{l.title}</a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2} className="col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#A9DBFF" }}>Segmentos</h3>
            <ul className="space-y-2.5">
              {segmentos.map(s => (
                <li key={s}>
                  <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>{s}</a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          <AnimatedContainer delay={0.25} className="col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#A9DBFF" }}>Conteúdo</h3>
            <ul className="space-y-2.5">
              {conteudo.map(c => (
                <li key={c}>
                  <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>{c}</a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          <AnimatedContainer delay={0.3} className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#A9DBFF" }}>Contato</h3>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li><a href="tel:+551121460000" className="hover:text-white transition-colors">(11) 2146-0000</a></li>
              <li><a href="mailto:support@deskmanager.com" className="hover:text-white transition-colors break-all">support@deskmanager.com</a></li>
              <li className="pt-1">
                <span className="block text-xs font-medium mb-1" style={{ color: "rgba(169,219,255,0.5)" }}>Sede</span>
                R. João Cardoso de Siqueira Primo, 65 — Conj 51-61<br />
                Vila Helio, Mogi das Cruzes — SP<br />
                08710-530
              </li>
              <li className="pt-1">
                <span className="block text-xs font-medium mb-1" style={{ color: "rgba(169,219,255,0.5)" }}>Experience</span>
                R. Fidêncio Ramos, 302 — Torre B — 8° Andar<br />
                Vila Olímpia, São Paulo — SP<br />
                04551-010
              </li>
              <li className="pt-1 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                CNPJ: 14.700.096/0001-05
              </li>
            </ul>
          </AnimatedContainer>

        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(2,55,255,0.15)", color: "rgba(255,255,255,0.25)" }}
        >
          <span>© {new Date().getFullYear()} Desk Manager. Todos os direitos reservados.</span>
          <span>Feito com dedicação em São Paulo, Brasil.</span>
        </div>

      </div>
    </footer>
  );
}

// -- AnimatedContainer (identical to desk1, framer-motion → motion/react) ---
type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0, children }: AnimatedContainerProps) {
  const reduce   = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

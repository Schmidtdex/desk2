"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// -- Defaults ----------------------------------------------------------------
const DEFAULT_LOGIN_LABEL = "Entrar";
const DEFAULT_CTA_LABEL   = "Falar com especialista";
const DEFAULT_CTA_HREF    = "#scene-cta";

const DEFAULT_NAV_LINKS: NavLink[] = [
  { title: "Home",          href: "#" },
  { title: "Clientes",      href: "#scene-cases" },
  { title: "Plataforma",    href: "#scene-anatomy" },
  { title: "Departamentos", href: "#scene-products" },
];

// -- Types -------------------------------------------------------------------
interface NavLink { _key?: string; title?: string | null; href?: string | null; }

interface NavBarData {
  loginLabel?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  links?: NavLink[] | null;
}

interface NavBarProps {
  data?: NavBarData | null;
}

// -- Component ---------------------------------------------------------------
export function NavBar({ data }: NavBarProps) {
  const loginLabel = data?.loginLabel ?? DEFAULT_LOGIN_LABEL;
  const ctaLabel   = data?.ctaLabel   ?? DEFAULT_CTA_LABEL;
  const ctaHref    = data?.ctaHref    ?? DEFAULT_CTA_HREF;
  const navLinks   = data?.links && data.links.length > 0 ? data.links : DEFAULT_NAV_LINKS;

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafRef      = useRef(0);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let scheduled = false;

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      rafRef.current = requestAnimationFrame(() => {
        scheduled = false;
        const next = window.scrollY > 48;
        if (next !== scrolledRef.current) {
          scrolledRef.current = next;
          setIsScrolled(next);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3">
      <motion.nav
        animate={{
          width: isScrolled ? "min(896px, 100%)" : "min(1280px, 100%)",
          backgroundColor: isScrolled ? "rgba(5, 6, 15, 0.55)" : "rgba(0, 0, 0, 0)",
          boxShadow: isScrolled
            ? "inset 0 0 0 1px rgba(255, 255, 255, 0.06)"
            : "inset 0 0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{
          width: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          backgroundColor: { duration: 0.45, ease: [0.2, 0, 0, 1] },
          boxShadow: { duration: 0.45, ease: [0.2, 0, 0, 1] },
        }}
        className="relative rounded-2xl"
        style={{ willChange: "width, background-color" }}
      >
        <motion.div
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="pointer-events-none absolute inset-0 rounded-2xl backdrop-blur-xl"
        />

        <div className="relative flex items-center justify-between gap-6 px-5 py-3">
          <Link href="/" aria-label="Desk Manager" className="flex shrink-0 items-center">
            <Image
              src="/Logotipo principal - branco.png"
              alt="Desk Manager"
              width={150}
              height={40}
              priority
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {navLinks.map((link, i) => (
              <li key={link._key ?? i}>
                <Link
                  href={link.href ?? "#"}
                  className="font-sans text-sm text-white/50 transition-colors duration-150 hover:text-white"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="#"
              className="px-4 py-2 font-sans text-sm text-white/50 transition-colors duration-150 hover:text-white"
            >
              {loginLabel}
            </Link>
            <Link
              href={ctaHref}
              className="rounded-full bg-accent px-5 py-2 font-sans text-sm font-medium text-white shadow-[0_0_24px_rgba(26,77,255,0.3)] transition-shadow duration-200 hover:shadow-[0_0_36px_rgba(26,77,255,0.5)]"
            >
              {ctaLabel}
            </Link>
          </div>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            className="relative z-50 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-white lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.14 }}
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.14 }}
                >
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="absolute inset-x-4 top-full mt-2 rounded-2xl border border-white/[0.06] bg-[#05060F]/95 p-6 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <li key={link._key ?? i}>
                  <Link
                    href={link.href ?? "#"}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-4 py-3 font-sans text-base text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
              <Link
                href="#"
                className="block rounded-xl px-4 py-3 text-center font-sans text-sm text-white/60 hover:text-white"
              >
                {loginLabel}
              </Link>
              <Link
                href={ctaHref}
                onClick={() => setIsOpen(false)}
                className="block rounded-full bg-accent px-5 py-3 text-center font-sans text-sm font-medium text-white"
              >
                {ctaLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

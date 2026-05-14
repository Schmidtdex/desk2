"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "Clientes", href: "#scene-cases" },
  { name: "Plataforma", href: "#scene-anatomy" },
  { name: "Departamentos", href: "#scene-products" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    // rAF throttle — scroll listener runs at display framerate, not every pixel
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 48);
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
    <header className="fixed inset-x-0 top-0 z-50">
      {/*
        Layout: max-w-7xl container never changes size → zero layout reflow.
        Only the absolutely-positioned glass pill fades in/out via opacity.
        opacity animation = compositor thread = no jank.
      */}
      <nav className="mx-auto max-w-7xl px-4 pt-3">
        <div className="relative flex items-center justify-between gap-6 px-5 py-3">

          {/* Glass pill — opacity only, GPU composited */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              backgroundColor: "rgba(5, 6, 15, 0.84)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
              willChange: "opacity",
            }}
          />

          <Link href="/" aria-label="Desk Manager" className="relative flex shrink-0 items-center">
            <Image
              src="/Logotipo principal - branco.png"
              alt="Desk Manager"
              width={120}
              height={40}
              priority
            />
          </Link>

          <ul className="relative hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-white/50 transition-colors duration-150 hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative hidden items-center gap-3 lg:flex">
            <Link
              href="#"
              className="px-4 py-2 font-sans text-sm text-white/50 transition-colors duration-150 hover:text-white"
            >
              Entrar
            </Link>
            <Link
              href="#scene-cta"
              className="rounded-full bg-accent px-5 py-2 font-sans text-sm font-medium text-white shadow-[0_0_24px_rgba(26,77,255,0.3)] transition-shadow duration-200 hover:shadow-[0_0_36px_rgba(26,77,255,0.5)]"
            >
              Falar com especialista
            </Link>
          </div>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            className="relative z-50 p-2 text-white lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span key="close"
                  initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.14 }}>
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.14 }}>
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

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
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-4 py-3 font-sans text-base text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
              <Link href="#"
                className="block rounded-xl px-4 py-3 text-center font-sans text-sm text-white/60 hover:text-white">
                Entrar
              </Link>
              <Link href="#scene-cta" onClick={() => setIsOpen(false)}
                className="block rounded-full bg-accent px-5 py-3 text-center font-sans text-sm font-medium text-white">
                Falar com especialista
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

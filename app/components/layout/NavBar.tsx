"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Produto", href: "#scene-products" },
  { name: "Clientes", href: "#scene-cases" },
  { name: "Plataforma", href: "#scene-anatomy" },
  { name: "Segurança", href: "#scene-trust" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto px-4 pt-3">
        <div
          className={cn(
            "mx-auto flex items-center justify-between px-5 py-3 transition-all duration-500",
            isScrolled
              ? "max-w-4xl rounded-2xl border border-white/[0.06] bg-[#05060F]/75 backdrop-blur-xl"
              : "max-w-7xl"
          )}
        >
          <Link href="/" aria-label="Desk Manager" className="flex items-center gap-3 shrink-0">
            <Image
              src="/desk-manager-icon-white.svg"
              alt=""
              width={28}
              height={22}
              priority
              aria-hidden="true"
            />
            <span className="font-sans text-[15px] font-light tracking-wide text-white">
              Desk Manager
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
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

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="#"
              className="px-4 py-2 font-sans text-sm text-white/60 transition-colors duration-150 hover:text-white"
            >
              Entrar
            </Link>
            <Link
              href="#scene-cta"
              className="rounded-full bg-accent px-5 py-2 font-sans text-sm font-medium text-white shadow-[0_0_24px_rgba(26,77,255,0.35)] transition-all duration-200 hover:shadow-[0_0_36px_rgba(26,77,255,0.5)] hover:brightness-110"
            >
              Falar com especialista
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            className="relative z-50 p-2 text-white lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.18 }}
                >
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            className="mx-4 mt-2 rounded-2xl border border-white/[0.06] bg-[#05060F]/95 p-6 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-4 py-3 font-sans text-base text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
              <Link
                href="#"
                className="block rounded-xl px-4 py-3 text-center font-sans text-sm text-white/60 hover:text-white"
              >
                Entrar
              </Link>
              <Link
                href="#scene-cta"
                onClick={() => setIsOpen(false)}
                className="block rounded-full bg-accent px-5 py-3 text-center font-sans text-sm font-medium text-white"
              >
                Falar com especialista
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

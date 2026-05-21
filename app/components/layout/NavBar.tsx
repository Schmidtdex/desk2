"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { buttonClasses } from "@/components/ui/Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PlatformPanel, DepartmentsPanel, ClientsPanel } from "./MegaMenu";

// Mobile-only flat list (mega menus collapse to simple links on small screens)
const MOBILE_NAV_LINKS = [
  { name: "Home",          href: "#" },
  { name: "Clientes",      href: "#scene-cases" },
  { name: "Plataforma",    href: "#scene-anatomy" },
  { name: "Departamentos", href: "#scene-products" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("");
  const pinnedMenuRef = useRef<string>(""); // sticky-open state set by trigger click
  const rafRef = useRef(0);
  const scrolledRef = useRef(false); // shadow value — avoids setState when unchanged

  // Block hover-driven open/close attempts when a menu is pinned via click
  const handleValueChange = useCallback((next: string) => {
    if (pinnedMenuRef.current && next !== pinnedMenuRef.current) return;
    setActiveMenu(next);
  }, []);

  // Click on a trigger toggles pin: pin it if not pinned, unpin if same trigger
  const handleTriggerClick = useCallback(
    (key: string) => () => {
      if (pinnedMenuRef.current === key) {
        pinnedMenuRef.current = "";
        setActiveMenu("");
      } else {
        pinnedMenuRef.current = key;
        setActiveMenu(key);
      }
    },
    []
  );

  // Click anywhere outside triggers (including in-page links, viewport items, body) unpins and closes
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!pinnedMenuRef.current) return;
      const target = e.target as HTMLElement | null;
      // Triggers handle their own toggle — don't double-handle them here
      if (target?.closest('[data-slot="navigation-menu-trigger"]')) return;
      pinnedMenuRef.current = "";
      setActiveMenu("");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Escape closes a pinned menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && pinnedMenuRef.current) {
        pinnedMenuRef.current = "";
        setActiveMenu("");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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
          // Close any open mega-menu when the nav crosses the shrink/expand threshold,
          // so the user never sees the submenu mid-transition.
          pinnedMenuRef.current = "";
          setActiveMenu("");
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
          width: isScrolled ? "min(960px, 100%)" : "min(1280px, 100%)",
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

          {/* Desktop nav: Radix NavigationMenu with viewport. Controlled so we can force-close
              when the nav crosses the scroll threshold (avoids the menu morphing alongside the
              nav's width animation). */}
          <NavigationMenu
            value={activeMenu}
            onValueChange={handleValueChange}
            className="hidden lg:flex"
          >
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="inline-flex shrink-0 items-center font-sans text-sm text-white/50 transition-colors duration-150 hover:text-white"
                >
                  <Link href="#">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem value="clientes">
                <NavigationMenuTrigger onClick={handleTriggerClick("clientes")}>
                  Clientes
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ClientsPanel />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem value="plataforma">
                <NavigationMenuTrigger onClick={handleTriggerClick("plataforma")}>
                  Plataforma
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <PlatformPanel />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem value="departamentos">
                <NavigationMenuTrigger onClick={handleTriggerClick("departamentos")}>
                  Departamentos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <DepartmentsPanel />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="#"
              className="px-4 py-2 font-sans text-sm text-white/50 transition-colors duration-150 hover:text-white"
            >
              Entrar
            </Link>
            <Link
              href="#scene-cta"
              className={buttonClasses({
                variant: "primary",
                size: "sm",
                // Hero glow override: este é o único CTA visível em todo scroll da página,
                // merece destaque acima do sm padrão. Ver DESIGN.md Ring 3 → overrides.
                className:
                  "shadow-[0_0_24px_rgba(26,77,255,0.4)] transition-shadow duration-200 hover:shadow-[0_0_36px_rgba(26,77,255,0.55)]",
              })}
            >
              Falar com especialista
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
            className="absolute inset-x-4 top-full mt-2 rounded-2xl border border-white/[0.06] bg-bg/95 p-6 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1">
              {MOBILE_NAV_LINKS.map((link) => (
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
                className={buttonClasses({ variant: "primary", size: "sm", className: "w-full" })}
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

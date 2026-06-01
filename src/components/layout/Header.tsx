"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const nav = [
  { label: "Services",  href: "/services" },
  { label: "Secteurs",  href: "/secteurs" },
  { label: "Méthode",   href: "/methode" },
  { label: "À propos",  href: "/a-propos" },
  { label: "Ressources",href: "/ressources" },
  { label: "Contact",   href: "/contact" },
];

export default function Header() {
  const pathname   = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-standard ease-brand",
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-1"
          : "bg-cream/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto max-w-[1200px] px-24 md:px-40 h-[112px] flex items-center gap-32">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-12 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm"
          aria-label="ESEIS Pest Control — Accueil"
        >
          <img
            src="/logo.svg"
            alt="ESEIS Pest Control"
            width={104}
            height={104}
            className="shrink-0"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 flex-1" aria-label="Navigation principale">
          {nav.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-12 py-8 text-body font-medium transition-colors duration-micro ease-brand rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55",
                  active
                    ? "text-navy-900"
                    : "text-navy-600 hover:text-navy-900"
                )}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-12 right-12 h-[2px] rounded-full bg-signal-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-16 ml-auto">
          <Link
            href="/espace-client"
            className="text-body text-navy-600 hover:text-navy-900 transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm px-4"
          >
            Espace client
          </Link>
          <Link href="/diagnostic">
            <Button size="sm">Diagnostic</Button>
          </Link>
        </div>

        {/* Burger */}
        <button
          className="ml-auto md:hidden flex items-center justify-center w-10 h-10 rounded-md text-navy-900 hover:bg-navy-900/6 transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden bg-cream/95 backdrop-blur-md border-t border-navy-900/8 px-24 py-24 flex flex-col gap-4"
        >
          {nav.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-12 py-12 rounded-md text-body font-medium transition-colors duration-micro",
                  active
                    ? "text-navy-900 bg-navy-900/6"
                    : "text-navy-600 hover:text-navy-900 hover:bg-navy-900/4"
                )}
              >
                {label}
              </Link>
            );
          })}
          <div className="pt-16 flex flex-col gap-12 border-t border-navy-900/8">
            <Link href="/espace-client" className="text-body text-navy-600 px-12 py-8">
              Espace client
            </Link>
            <Link href="/diagnostic" className="px-12">
              <Button size="sm" className="w-full">Diagnostic</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

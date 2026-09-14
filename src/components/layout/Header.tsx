"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { contact } from "@/lib/content";

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

  // Empêche le scroll de la page derrière le menu mobile ouvert.
  // `overflow: hidden` seul ne bloque pas le scroll sur iOS Safari — il faut
  // figer le body en position fixed et restaurer la position au relâchement.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

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
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 flex-1" aria-label="Navigation principale">
          {nav.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-8 lg:px-12 py-8 text-body font-medium whitespace-nowrap transition-colors duration-micro ease-brand rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55",
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
        <div className="hidden md:flex items-center gap-12 lg:gap-20 ml-auto">
          <a
            href={`tel:${contact.emergencyPhoneHref}`}
            className="hidden xl:flex items-center gap-8 font-mono font-medium text-navy-900 hover:text-terra-600 transition-colors duration-micro whitespace-nowrap"
          >
            <Phone size={16} strokeWidth={1.5} className="text-terra-500 shrink-0" />
            {contact.emergencyPhone}
          </a>
          <Link href="/diagnostic">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <span className="lg:hidden">Diagnostic</span>
              <span className="hidden lg:inline">Demander un diagnostic</span>
            </Button>
          </Link>
          <a href={`tel:${contact.emergencyPhoneHref}`}>
            <Button size="sm">
              <Phone size={14} strokeWidth={1.5} />
              Urgence
            </Button>
          </a>
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

      {/* Mobile nav — couvre tout l'écran restant, scrolle en interne si besoin */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden fixed inset-x-0 top-[112px] h-[calc(100dvh-112px)] overflow-y-auto bg-cream border-t border-navy-900/8 px-24 py-24 flex flex-col gap-4"
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
              <Button variant="outline" size="sm" className="w-full">
                Demander un diagnostic
              </Button>
            </Link>
            <a href={`tel:${contact.emergencyPhoneHref}`} className="px-12">
              <Button size="sm" className="w-full">
                <Phone size={14} strokeWidth={1.5} />
                Urgence · {contact.emergencyPhone}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

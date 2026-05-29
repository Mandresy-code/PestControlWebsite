import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Arc from "@/components/ui/Arc";
import { contact, services, certifications } from "@/lib/content";

const serviceLinks = [
  { label: "Dératisation",    href: "/services/deratisation" },
  { label: "Désinsectisation",href: "/services/desinsectisation" },
  { label: "Punaises de lit", href: "/services/punaises" },
  { label: "Désinfection",    href: "/services/desinfection" },
  { label: "Nuisibles volants",href: "/services/volants" },
  { label: "Prévention",      href: "/services/prevention" },
];

const companyLinks = [
  { label: "Méthode IPM",   href: "/methode" },
  { label: "À propos",      href: "/a-propos" },
  { label: "Ressources",    href: "/ressources" },
  { label: "Contact",       href: "/contact" },
  { label: "Espace client", href: "/espace-client" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-950 text-navy-200 overflow-hidden">
      {/* Arc ornament */}
      <Arc
        size={480}
        className="absolute -right-40 -top-40 text-white"
        opacity={0.04}
        strokeWidth={1}
      />

      <div className="relative mx-auto max-w-[1200px] px-24 md:px-40 pt-72 pb-40">
        {/* Brand + devise */}
        <div className="mb-56">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white font-medium leading-none mb-16">
            ESEIS<br />
            <span className="text-signal-500">Pest Control</span>
          </div>
          <p className="text-body-lg text-navy-300 italic max-w-[28ch] leading-relaxed">
            «&nbsp;L&apos;hygiène, sans bruit.&nbsp;»
          </p>
          <p className="mt-8 text-body text-navy-500 max-w-[40ch]">
            Groupe BCR-i — «&nbsp;Faire grandir les hommes, faire grandir les entreprises.&nbsp;»
          </p>
        </div>

        {/* 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-40 mb-56">
          {/* Services */}
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-widest text-navy-400 mb-20">
              Services
            </p>
            <ul className="flex flex-col gap-12">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-body text-navy-300 hover:text-white transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal-500/55 rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Société */}
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-widest text-navy-400 mb-20">
              Société
            </p>
            <ul className="flex flex-col gap-12">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-body text-navy-300 hover:text-white transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal-500/55 rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-widest text-navy-400 mb-20">
              Contact
            </p>
            <ul className="flex flex-col gap-16">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-10 text-body text-navy-300 hover:text-white transition-colors duration-micro"
                >
                  <Phone size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-signal-500" />
                  <span className="font-mono">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-10 text-body text-navy-300 hover:text-white transition-colors duration-micro"
                >
                  <Mail size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-signal-500" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-10 text-body text-navy-400">
                <MapPin size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-signal-500" />
                <span>{contact.zones.join(" · ")}</span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-widest text-navy-400 mb-20">
              Certifications
            </p>
            <ul className="flex flex-col gap-12">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-8 text-body text-navy-300">
                  <span className="w-[5px] h-[5px] rounded-full bg-signal-500 shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
            <div className="mt-24">
              <p className="text-sm text-navy-500">{contact.hours}</p>
              <p className="text-sm text-navy-500 mt-4">Astreinte&nbsp;: {contact.emergencyPhone}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 pt-32 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-16 text-sm text-navy-500">
          <p>© {year} ESEIS Pest Control — Groupe BCR-i. Tous droits réservés.</p>
          <div className="flex gap-24">
            <Link href="/mentions-legales" className="hover:text-navy-300 transition-colors duration-micro">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-navy-300 transition-colors duration-micro">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

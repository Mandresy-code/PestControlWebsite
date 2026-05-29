import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Arc from "@/components/ui/Arc";
import { contact } from "@/lib/content";

export default function FinalCTA() {
  return (
    <section className="relative bg-navy-900 text-white overflow-hidden section-padding" aria-label="Prise de contact">
      <Arc
        size={400}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-white"
        opacity={0.06}
        strokeWidth={1}
      />
      <div className="relative container-site text-center max-w-[760px] mx-auto">
        <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-20">
          Prochaine étape
        </p>
        <h2 className="text-h1 font-medium text-white tracking-tight mb-24">
          Un diagnostic,<br />pas un devis au téléphone.
        </h2>
        <p className="text-body-lg text-navy-200 leading-relaxed mb-40 max-w-[52ch] mx-auto">
          Chaque situation est différente. Nos techniciens se déplacent pour évaluer
          avant de proposer — sans engagement, sous 48 h ouvrées.
        </p>
        <div className="flex flex-wrap gap-16 justify-center mb-40">
          <Link href="/diagnostic">
            <Button variant="primary" size="lg" onDark>
              Demander un diagnostic
              <ArrowRight size={18} strokeWidth={1.5} />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" onDark>
              Être rappelé
            </Button>
          </Link>
        </div>
        <a
          href={`tel:${contact.emergencyPhone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-10 font-mono text-mono text-navy-300 hover:text-white transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm"
        >
          <Phone size={16} strokeWidth={1.5} />
          Urgence : {contact.emergencyPhone} — 24h/24
        </a>
      </div>
    </section>
  );
}

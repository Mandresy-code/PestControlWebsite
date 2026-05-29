"use client";
import Link from "next/link";
import { ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Arc from "@/components/ui/Arc";
import Eyebrow from "@/components/ui/Eyebrow";

const pillars = ["Lutte raisonnée", "IPM", "Certibiocide"];

const meta = [
  { icon: Shield, label: "Certibiocide" },
  { icon: Clock,  label: "Astreinte 24/7" },
  { icon: MapPin, label: "Zones couvertes" },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end bg-navy-950 overflow-hidden"
      aria-label="Hero — L'hygiène, sans bruit."
    >
      {/* Video / placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder jusqu'à la livraison de la vidéo */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        {/* Overlay note — vidéo forêt à fournir */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 z-10">
          <span className="font-mono text-eyebrow text-white/20 uppercase tracking-widest">
            Vidéo forêt — à fournir par le client
          </span>
        </div>
      </div>

      {/* Gradient overlay → lisibilité */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />

      {/* Arc ornement */}
      <Arc
        size={560}
        className="absolute right-[-80px] top-[-80px] z-10 text-white"
        opacity={0.06}
        strokeWidth={1}
      />

      {/* Content */}
      <div className="relative z-20 container-site pb-72 md:pb-96 pt-[152px]">
        {/* Eyebrow piliers */}
        <div className="flex flex-wrap gap-16 mb-32">
          {pillars.map((p) => (
            <Eyebrow key={p} className="text-signal-300">{p}</Eyebrow>
          ))}
        </div>

        {/* H1 */}
        <h1 className="text-display font-medium text-white tracking-tight max-w-[18ch] mb-24">
          L&apos;hygiène,<br />sans bruit.
        </h1>

        {/* Lede */}
        <p className="text-body-lg text-navy-200 max-w-[52ch] leading-relaxed mb-40">
          ESEIS Pest Control intervient là où l&apos;infestation n&apos;a pas sa place —
          restaurants, hôtels, sites industriels, domiciles — avec la précision
          de la lutte raisonnée et la discrétion que votre activité exige.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-16 mb-56">
          <Link href="/diagnostic">
            <Button variant="primary" size="lg" onDark>
              Demander un diagnostic
              <ArrowRight size={18} strokeWidth={1.5} />
            </Button>
          </Link>
          <Link href="/methode">
            <Button variant="outline" size="lg" onDark>
              Notre méthode
            </Button>
          </Link>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-32 border-t border-white/10 pt-32">
          {meta.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-10 text-navy-300">
              <Icon size={16} strokeWidth={1.5} className="text-signal-400 shrink-0" />
              <span className="font-mono text-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

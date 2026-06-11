import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import Arc from "@/components/ui/Arc";
import FinalCTA from "@/components/sections/FinalCTA";
import { certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos — ESEIS × BCR-i",
  description:
    "ESEIS Pest Control est une société du groupe BCR-i. Nos valeurs : rigueur, discrétion, lutte raisonnée. Techniciens Certibiocide.",
};

const values = [
  { title: "Rigueur sans excès",      description: "Nous n'appliquons que ce qui est nécessaire. L'excès de traitement est une faute professionnelle." },
  { title: "Discrétion absolue",      description: "Nos véhicules sont banalisés. Nos interventions sont documentées, pas annoncées." },
  { title: "Transparence documentée", description: "Chaque intervention génère un rapport. Nos clients savent exactement ce qui a été fait, pourquoi, et quand." },
  { title: "Engagement long terme",   description: "Nous préférons un client prévenu à un client récurrent. Notre objectif : vous débarrasser d'un problème, pas en créer un autre." },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-navy-900 pt-[112px] pb-72 relative overflow-hidden">
        <Arc size={480} className="absolute -right-40 -top-40 text-white" opacity={0.05} />
        <div className="relative container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">À propos</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20 max-w-[20ch]">
            ESEIS Pest Control,<br />groupe BCR-i.
          </h1>
          <p className="text-body-lg text-navy-200 max-w-[56ch] leading-relaxed">
            «&nbsp;Faire grandir les hommes, faire grandir les entreprises.&nbsp;» Cette devise du
            groupe BCR-i guide notre façon d&apos;intervenir autant que notre façon de recruter.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="bg-cream section-padding">
        <div className="container-site grid md:grid-cols-2 gap-72 items-start">
          <div>
            <SectionHead eyebrow="Mission" title="L'excellence en matière de nuisibles." className="mb-32" />
            <div className="prose-eseis space-y-20">
              <p>
                ESEIS Pest Control est né d&apos;un constat simple : le marché de la lutte antiparasitaire
                est dominé par la peur. Visuels alarmistes, jargon technique intimidant, devis opaques.
                Nous avons choisi l&apos;inverse.
              </p>
              <p>
                Notre ligne de marque — «&nbsp;L&apos;hygiène, sans bruit.&nbsp;» — n&apos;est pas un slogan.
                C&apos;est une promesse opérationnelle : intervenir efficacement, sans perturber votre
                activité, sans alerter votre clientèle, sans laisser de trace visible de notre passage.
              </p>
              <p>
                Nous nous adressons aux professionnels qui ont des contraintes réelles — inspections
                sanitaires, certifications IFS/BRC, réputation à protéger — et aux particuliers qui
                méritent une réponse claire et sans condescendance.
              </p>
            </div>
          </div>

          {/* BCR-i */}
          <div className="bg-navy-900 rounded-lg p-32 text-white">
            <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-20">Groupe BCR-i</p>
            <h2 className="text-h3 font-medium text-white mb-16">
              Faire grandir les hommes, faire grandir les entreprises.
            </h2>
            <p className="text-body text-navy-200 leading-relaxed mb-24">
              BCR-i est un groupe multi-activités orienté vers la performance durable des organisations.
              ESEIS Pest Control est sa filiale spécialisée en lutte antiparasitaire, formée d&apos;experts
              terrain certifiés et d&apos;auditeurs qualité.
            </p>
            <div className="flex flex-col gap-12">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-10 text-navy-300">
                  <span className="w-[5px] h-[5px] rounded-full bg-signal-500 shrink-0" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-2 section-padding">
        <div className="container-site">
          <SectionHead eyebrow="Valeurs" title="Ce qui guide nos interventions." className="mb-56" />
          <div className="grid sm:grid-cols-2 gap-32">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-12 p-32 bg-paper rounded-lg border border-navy-900/8 shadow-1">
                <span className="w-[6px] h-[6px] rounded-full bg-signal-500" />
                <h3 className="text-h3 font-medium text-navy-900">{v.title}</h3>
                <p className="text-body text-navy-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

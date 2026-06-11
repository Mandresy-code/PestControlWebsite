import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";
import { getSectors } from "@/lib/db";

export const metadata: Metadata = {
  title: "Secteurs d'activité",
  description: "Restauration, hôtellerie, industrie, santé, logistique et particuliers. Protocoles de lutte antiparasitaire adaptés à chaque secteur.",
};

export default async function SecteursPage() {
  const sectors = await getSectors();

  return (
    <>
      <div className="bg-navy-900 pt-[112px] pb-72">
        <div className="container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Secteurs</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20 max-w-[20ch]">
            Votre activité a ses contraintes. Nos protocoles aussi.
          </h1>
          <p className="text-body-lg text-navy-200 max-w-[58ch] leading-relaxed">
            Un protocole en restauration n&apos;est pas celui d&apos;un hôtel, ni celui d&apos;un
            entrepôt. Nous construisons chaque plan d&apos;intervention depuis le contexte réel.
          </p>
        </div>
      </div>

      <section className="bg-cream section-padding">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24">
            {sectors.map((sector) => (
              <Link
                key={sector.slug}
                href={`/secteurs/${sector.slug}`}
                className="group flex flex-col gap-20 p-32 bg-paper rounded-lg border border-navy-900/8 shadow-1 hover:shadow-2 transition-shadow duration-standard ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-md bg-navy-900/6 flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-signal-500/50" />
                  </div>
                  <span className={`font-mono text-eyebrow uppercase tracking-widest px-10 py-4 rounded-pill ${sector.badge === "Particuliers" ? "bg-signal-500/15 text-navy-700" : "bg-navy-900/8 text-navy-500"}`}>
                    {sector.badge}
                  </span>
                </div>
                <h2 className="text-h3 font-medium text-navy-900">{sector.title}</h2>
                <p className="text-body text-navy-600 leading-relaxed flex-1">{sector.description}</p>
                <span className="inline-flex items-center gap-8 text-body font-medium text-navy-700 group-hover:text-navy-900 transition-colors duration-micro">
                  Voir le secteur <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-micro group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

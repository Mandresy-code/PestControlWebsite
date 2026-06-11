import type { Metadata } from "next";
import { Search, ClipboardList, Wrench, BarChart3 } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import FinalCTA from "@/components/sections/FinalCTA";
import ProofsStats from "@/components/sections/ProofsStats";
import { getMethodSteps, getStats, getProofs } from "@/lib/db";
import { certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notre méthode — IPM & lutte raisonnée",
  description: "IPM, lutte raisonnée, Certibiocide : notre philosophie d'intervention.",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Search, ClipboardList, Wrench, BarChart3,
};

export default async function MethodePage() {
  const [methodSteps, stats, proofs] = await Promise.all([
    getMethodSteps(), getStats(), getProofs(),
  ]);

  return (
    <>
      <div className="bg-navy-900 pt-[112px] pb-72">
        <div className="container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Méthode</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20 max-w-[20ch]">
            IPM — la lutte qui comprend avant d&apos;agir.
          </h1>
          <p className="text-body-lg text-navy-200 max-w-[58ch] leading-relaxed">
            Integrated Pest Management : l&apos;unique approche qui réconcilie efficacité, sécurité et durabilité.
          </p>
        </div>
      </div>

      <section className="bg-cream section-padding">
        <div className="container-site max-w-[800px]">
          <p className="text-body-lg text-navy-700 leading-[1.7] mb-32">
            La lutte antiparasitaire traditionnelle traite les symptômes. L&apos;IPM traite les causes.
            Avant toute intervention, nos techniciens identifient l&apos;espèce, comprennent le comportement,
            localisent les voies d&apos;entrée et évaluent l&apos;environnement.
          </p>
          <p className="text-body-lg text-navy-700 leading-[1.7]">
            Le biocide n&apos;est jamais la première réponse. Quand il est nécessaire, il est choisi pour sa
            précision — jamais pour sa facilité.
          </p>
        </div>
      </section>

      <section className="bg-cream-2 section-padding">
        <div className="container-site">
          <SectionHead eyebrow="Protocole" title="Les 4 étapes de notre intervention." className="mb-72" />
          <div className="grid md:grid-cols-2 gap-40">
            {methodSteps.map((step) => {
              const Icon = iconMap[step.icon] ?? Search;
              return (
                <div key={step.index} className="flex gap-24 p-32 bg-paper rounded-lg shadow-1">
                  <div className="flex flex-col items-center gap-12 shrink-0">
                    <span className="font-mono text-h3 font-medium text-navy-300 tabular-nums">{step.index}</span>
                    <div className="w-12 h-12 rounded-md bg-navy-900/6 flex items-center justify-center">
                      <Icon size={24} strokeWidth={1.5} className="text-navy-600" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-h3 font-medium text-navy-900 mb-12">{step.title}</h2>
                    <p className="text-body text-navy-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProofsStats proofs={proofs} stats={stats} />

      <section className="bg-cream section-padding">
        <div className="container-site">
          <SectionHead eyebrow="Certifications" title="Les preuves de notre rigueur." className="mb-56" />
          <div className="flex flex-wrap gap-16">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-12 px-24 py-16 bg-paper rounded-md border border-navy-900/8 shadow-1">
                <span className="w-[6px] h-[6px] rounded-full bg-signal-500" />
                <span className="font-medium text-body text-navy-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

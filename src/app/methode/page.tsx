import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, ClipboardList, Wrench, BarChart3 } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import Stat from "@/components/ui/Stat";
import Arc from "@/components/ui/Arc";
import FinalCTA from "@/components/sections/FinalCTA";
import { methodSteps, stats, certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notre méthode — IPM & lutte raisonnée",
  description:
    "IPM, lutte raisonnée, Certibiocide : notre philosophie d'intervention. Comprendre avant d'agir, prévenir avant de traiter.",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Search, ClipboardList, Wrench, BarChart3,
};

export default function MethodePage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-navy-900 pt-[112px] pb-72">
        <div className="container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Méthode</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20 max-w-[20ch]">
            IPM — la lutte qui comprend avant d&apos;agir.
          </h1>
          <p className="text-body-lg text-navy-200 max-w-[58ch] leading-relaxed">
            Integrated Pest Management : l&apos;unique approche qui réconcilie
            efficacité, sécurité et durabilité. Pas une mode — une discipline.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="bg-cream section-padding">
        <div className="container-site max-w-[800px]">
          <p className="text-body-lg text-navy-700 leading-[1.7] mb-32">
            La lutte antiparasitaire traditionnelle traite les symptômes. L&apos;IPM traite les causes.
            Avant toute intervention, nos techniciens identifient l&apos;espèce, comprennent le
            comportement, localisent les voies d&apos;entrée et évaluent l&apos;environnement.
          </p>
          <p className="text-body-lg text-navy-700 leading-[1.7]">
            Le biocide n&apos;est jamais la première réponse. Quand il est nécessaire, il est choisi
            pour sa précision — jamais pour sa facilité. Cette rigueur protège vos espaces, vos
            clients, vos collaborateurs, et respecte les référentiels IFS, BRC et HACCP.
          </p>
        </div>
      </section>

      {/* Steps */}
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

      {/* Stats */}
      <section className="relative bg-navy-900 text-white section-padding overflow-hidden">
        <Arc size={480} className="absolute -right-40 -top-40 text-white" opacity={0.05} />
        <div className="relative container-site">
          <SectionHead eyebrow="Résultats" title="Des engagements mesurables." onDark className="mb-72" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-40">
            {stats.map((stat) => <Stat key={stat.label} {...stat} onDark />)}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-cream section-padding">
        <div className="container-site">
          <SectionHead
            eyebrow="Certifications"
            title="Les preuves de notre rigueur."
            description="Nos certifications ne sont pas des badges marketing. Elles conditionnent notre capacité légale à intervenir — et votre conformité réglementaire."
            className="mb-56"
          />
          <div className="flex flex-wrap gap-16">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-12 px-24 py-16 bg-paper rounded-md border border-navy-900/8 shadow-1"
              >
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

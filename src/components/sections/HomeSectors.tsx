"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import LucideIcon from "@/components/ui/LucideIcon";
import { cn } from "@/lib/utils";
import type { Sector } from "@/lib/content";

type Filter = "all" | "Particuliers" | "Professionnels";

const filters: { id: Filter; label: string }[] = [
  { id: "all",            label: "Tous" },
  { id: "Particuliers",   label: "Particuliers" },
  { id: "Professionnels", label: "Entreprises" },
];

interface HomeSectorsProps {
  sectors: Sector[];
}

export default function HomeSectors({ sectors }: HomeSectorsProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? sectors : sectors.filter((s) => s.badge === filter);

  return (
    <section className="bg-cream section-padding" aria-labelledby="secteurs-title">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-24 mb-40">
          <SectionHead
            eyebrow="Secteurs"
            title="Le bon protocole, pour le bon secteur."
            id="secteurs-title"
          />
          <Link href="/secteurs" className="inline-flex items-center gap-8 text-body font-medium text-navy-700 hover:text-navy-900 transition-colors duration-micro ease-brand shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm">
            Tous les secteurs <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Toggle Particuliers / Entreprises */}
        <div role="tablist" aria-label="Filtrer les secteurs" className="inline-flex items-center gap-4 p-4 mb-32 rounded-pill bg-navy-900/6">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={filter === id}
              onClick={() => setFilter(id)}
              className={cn(
                "px-20 py-8 rounded-pill text-body font-medium transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55",
                filter === id ? "bg-navy-900 text-white" : "text-navy-600 hover:text-navy-900"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24">
          {visible.map((sector) => (
            <Link
              key={sector.slug}
              href={`/secteurs/${sector.slug}`}
              className="group flex flex-col gap-16 p-32 rounded-lg bg-paper border border-navy-900/8 shadow-1 hover:shadow-2 transition-shadow duration-standard ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-md bg-navy-900/6 flex items-center justify-center">
                  <LucideIcon name={sector.icon} size={20} strokeWidth={1.5} className="text-navy-600" />
                </div>
                <span className={`font-mono text-eyebrow uppercase tracking-widest px-10 py-4 rounded-pill ${sector.badge === "Particuliers" ? "bg-signal-500/15 text-navy-700" : "bg-navy-900/8 text-navy-500"}`}>
                  {sector.badge}
                </span>
              </div>
              <h3 className="text-h3 font-medium text-navy-900">{sector.title}</h3>
              <p className="text-body text-navy-600 leading-relaxed flex-1">{sector.description}</p>
              <span className="inline-flex items-center gap-8 self-start px-16 py-10 rounded-pill bg-navy-900/6 text-body font-medium text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-colors duration-micro">
                En savoir plus <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-micro group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

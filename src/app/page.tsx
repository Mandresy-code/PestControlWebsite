import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import UrgencyBanner from "@/components/sections/UrgencyBanner";
import PestSelector from "@/components/sections/PestSelector";
import MethodSection from "@/components/sections/MethodSection";
import ProofsStats from "@/components/sections/ProofsStats";
import ArticlesGrid from "@/components/sections/ArticlesGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHead from "@/components/ui/SectionHead";
import ServiceCard from "@/components/ui/ServiceCard";
import {
  getServices, getSectors, getArticles, getProofs, getStats,
  getHeroVideoUrls, getAgentPhotoUrl,
} from "@/lib/db";
import LucideIcon from "@/components/ui/LucideIcon";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ESEIS Pest Control",
  description: "Société de lutte antiparasitaire professionnelle — groupe BCR-i.",
  url: "https://eseis-pestcontrol.fr",
  email: "contact@eseis-pestcontrol.fr",
  areaServed: ["Île-de-France", "Grand Est", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine"],
};

export const metadata: Metadata = {
  title: "ESEIS Pest Control — L'excellence en matière de nuisibles.",
  description:
    "Lutte antiparasitaire professionnelle pour entreprises et particuliers. Dératisation, désinsectisation, punaises de lit, désinfection. Certibiocide. Astreinte 24/7.",
};

export default async function HomePage() {
  const [services, sectors, articles, proofs, stats] = await Promise.all([
    getServices(), getSectors(), getArticles(), getProofs(), getStats(),
  ]);
  const videoUrls     = getHeroVideoUrls();
  const agentPhotoUrl = await getAgentPhotoUrl();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero videoMp4={videoUrls.mp4} videoWebm={videoUrls.webm} />
      <UrgencyBanner />

      {/* Services */}
      <section className="bg-cream section-padding" aria-labelledby="services-title">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-24 mb-56">
            <SectionHead
              eyebrow="Services"
              title="Six interventions, une seule exigence."
              description="Du rongeur au nuisible volant, du site industriel à la résidence : nos protocoles s'adaptent à votre contexte, pas l'inverse."
              id="services-title"
            />
            <Link href="/services" className="inline-flex items-center gap-8 text-body font-medium text-navy-700 hover:text-navy-900 transition-colors duration-micro ease-brand shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm">
              Tous les services <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <PestSelector />

      {/* Secteurs */}
      <section className="bg-cream section-padding" aria-labelledby="secteurs-title">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-24 mb-56">
            <SectionHead
              eyebrow="Secteurs"
              title="Votre activité a ses contraintes. Nos protocoles aussi."
              id="secteurs-title"
            />
            <Link href="/secteurs" className="inline-flex items-center gap-8 text-body font-medium text-navy-700 hover:text-navy-900 transition-colors duration-micro ease-brand shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm">
              Tous les secteurs <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24">
            {sectors.map((sector) => (
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
                <span className="inline-flex items-center gap-8 text-body font-medium text-navy-700 group-hover:text-navy-900 transition-colors duration-micro">
                  En savoir plus <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-micro group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MethodSection photoUrl={agentPhotoUrl} />
      <ProofsStats proofs={proofs} stats={stats} />
      <ArticlesGrid articles={articles.slice(0, 4)} />
      <FinalCTA />
    </>
  );
}

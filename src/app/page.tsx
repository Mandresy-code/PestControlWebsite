import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import UrgencyBanner from "@/components/sections/UrgencyBanner";
import PestSelector from "@/components/sections/PestSelector";
import HomeSectors from "@/components/sections/HomeSectors";
import MethodSection from "@/components/sections/MethodSection";
import ProofsStats from "@/components/sections/ProofsStats";
import Testimonials from "@/components/sections/Testimonials";
import ArticlesGrid from "@/components/sections/ArticlesGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHead from "@/components/ui/SectionHead";
import ServiceCard from "@/components/ui/ServiceCard";
import {
  getServices, getSectors, getArticles, getProofs, getStats,
  getHeroVideoUrls, getAgentPhotoUrl,
} from "@/lib/db";
import { contact, testimonials } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ESEIS Pest Control",
  description: "Société de lutte antiparasitaire professionnelle — groupe BCR-i.",
  url: "https://eseis-pestcontrol.fr",
  email: contact.email,
  telephone: contact.emergencyPhoneHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: "29 Bd du Général Delambre",
    postalCode: "95870",
    addressLocality: "Bezons",
    addressCountry: "FR",
  },
  areaServed: contact.zones,
};

export const metadata: Metadata = {
  title: "ESEIS Pest Control — L'excellence en matière de nuisibles.",
  description:
    "Lutte antiparasitaire professionnelle pour entreprises et particuliers. Dératisation, désinsectisation, punaises de lit, désinfection. Certibiocide. Urgences 24h/24.",
};

export default async function HomePage() {
  const [services, sectors, articles, proofs, stats] = await Promise.all([
    getServices(), getSectors(), getArticles(), getProofs(), getStats(),
  ]);
  const videoUrls     = getHeroVideoUrls();
  const agentPhotoUrl = getAgentPhotoUrl();

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
              title="Une réponse ciblée pour chaque nuisible."
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

      <HomeSectors sectors={sectors} />

      <MethodSection photoUrl={agentPhotoUrl} />
      <ProofsStats proofs={proofs} stats={stats} />
      <Testimonials testimonials={testimonials} />
      <ArticlesGrid articles={articles.slice(0, 4)} />
      <FinalCTA />
    </>
  );
}

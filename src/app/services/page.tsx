import type { Metadata } from "next";
import ServiceCard from "@/components/ui/ServiceCard";
import FinalCTA from "@/components/sections/FinalCTA";
import { getServices } from "@/lib/db";

export const metadata: Metadata = {
  title: "Services",
  description: "Dératisation, désinsectisation, punaises de lit, désinfection, nuisibles volants, prévention & audit. Protocoles IPM adaptés à chaque contexte.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <div className="bg-navy-900 pt-[152px] pb-72">
        <div className="container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Services</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20 max-w-[18ch]">
            Six interventions, une seule exigence.
          </h1>
          <p className="text-body-lg text-navy-200 max-w-[60ch] leading-relaxed">
            Chaque nuisible, chaque secteur, chaque bâtiment a ses spécificités.
            Nos protocoles IPM s&apos;adaptent. Jamais l&apos;inverse.
          </p>
        </div>
      </div>

      <section className="bg-cream section-padding">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

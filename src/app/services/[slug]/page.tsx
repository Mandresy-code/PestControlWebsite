import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getServices, getService, getServiceSlugs } from "@/lib/db";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();

  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="bg-navy-900 pt-[112px] pb-72">
        <div className="container-site">
          <Link href="/services" className="inline-flex items-center gap-8 text-navy-300 hover:text-white text-sm font-medium mb-32 transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm">
            <ArrowLeft size={14} strokeWidth={1.5} /> Tous les services
          </Link>
          <div className="flex items-start justify-between gap-24 flex-wrap">
            <div>
              <p className="font-mono text-mono text-navy-400 mb-12">{service.index} / 06</p>
              <h1 className="text-h1 font-medium text-white mb-20">{service.title}</h1>
              <div className="flex flex-wrap gap-8 mb-24">
                {service.chips.map((chip) => <Chip key={chip} onDark>{chip}</Chip>)}
              </div>
            </div>
            <Link href={`/diagnostic?pest=${service.slug}`}>
              <Button variant="primary" onDark>
                Demander une intervention <ArrowRight size={16} strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-cream section-padding">
        <div className="container-site">
          <div className="grid md:grid-cols-[1fr_320px] gap-72">
            <div>
              <p className="text-body-lg text-navy-700 leading-relaxed mb-40 max-w-[60ch]">
                {service.longDescription}
              </p>
              <h2 className="text-h3 font-medium text-navy-900 mb-24">Notre protocole</h2>
              <ol className="flex flex-col gap-20 mb-56">
                {service.methods.map((method, i) => (
                  <li key={i} className="flex items-start gap-16">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-navy-900/8 shrink-0 mt-0.5">
                      <span className="font-mono text-[10px] text-navy-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="text-body text-navy-700">{method}</p>
                  </li>
                ))}
              </ol>
              <div className="rounded-lg bg-navy-900 p-32 text-white">
                <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-12">Approche IPM</p>
                <p className="text-body text-navy-200 leading-relaxed">
                  Tous nos traitements suivent les principes de l&apos;Integrated Pest Management :
                  diagnostic d&apos;abord, méthode mécanique ou physique si possible, biocide en
                  dernier recours — toujours avec un technicien Certibiocide.
                </p>
              </div>
            </div>

            <aside className="flex flex-col gap-24">
              <div className="bg-paper rounded-lg border border-navy-900/8 p-24 shadow-1">
                <h3 className="text-body font-medium text-navy-900 mb-16">Ce service inclut</h3>
                <ul className="flex flex-col gap-12">
                  {["Diagnostic terrain avant intervention","Technicien Certibiocide","Rapport d'intervention écrit","Visite de contrôle incluse","Conseils de prévention"].map((item) => (
                    <li key={item} className="flex items-start gap-12">
                      <Check size={16} strokeWidth={1.5} className="text-signal-500 shrink-0 mt-0.5" />
                      <span className="text-body text-navy-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/diagnostic?pest=${service.slug}`} className="mt-24 block">
                  <Button className="w-full">Demander un diagnostic</Button>
                </Link>
              </div>
              {service.urgent && (
                <div className="bg-danger/8 border border-danger/20 rounded-lg p-20">
                  <p className="text-sm font-medium text-danger mb-8">Intervention urgente</p>
                  <p className="text-sm text-navy-600">Ce nuisible nécessite une prise en charge rapide. Nous traitons votre demande en priorité.</p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      <section className="bg-cream-2 section-padding-sm">
        <div className="container-site">
          <h2 className="text-h3 font-medium text-navy-900 mb-32">Autres services</h2>
          <div className="grid sm:grid-cols-3 gap-20">
            {related.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group flex flex-col gap-12 p-24 bg-paper rounded-lg border border-navy-900/8 hover:shadow-2 transition-shadow duration-standard ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55">
                <p className="font-mono text-mono text-navy-400">{s.index}</p>
                <h3 className="text-body font-medium text-navy-900 group-hover:text-navy-700 transition-colors duration-micro">{s.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

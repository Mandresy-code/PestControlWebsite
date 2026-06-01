import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getSector, getSectorSlugs, getServices } from "@/lib/db";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";

export async function generateStaticParams() {
  const slugs = await getSectorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const sector = await getSector(slug);
  if (!sector) return {};
  return { title: sector.title, description: sector.description };
}

export default async function SecteurDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [sector, allServices] = await Promise.all([getSector(slug), getServices()]);
  if (!sector) notFound();

  const relatedServices = allServices.filter((s) => sector.services.includes(s.slug));

  return (
    <>
      <div className="bg-navy-900 pt-[128px] pb-72">
        <div className="container-site">
          <Link href="/secteurs" className="inline-flex items-center gap-8 text-navy-300 hover:text-white text-sm font-medium mb-32 transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm">
            <ArrowLeft size={14} strokeWidth={1.5} /> Tous les secteurs
          </Link>
          <span className={`inline-block font-mono text-eyebrow uppercase tracking-widest px-10 py-4 rounded-pill mb-20 ${sector.badge === "Particuliers" ? "bg-signal-500/20 text-signal-300" : "bg-white/10 text-navy-300"}`}>
            {sector.badge}
          </span>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20">{sector.title}</h1>
          <p className="text-body-lg text-navy-200 max-w-[58ch] leading-relaxed">{sector.description}</p>
        </div>
      </div>

      <div className="bg-cream section-padding">
        <div className="container-site grid md:grid-cols-[1fr_320px] gap-72">
          <div>
            <h2 className="text-h3 font-medium text-navy-900 mb-24">Vos enjeux spécifiques</h2>
            <ul className="flex flex-col gap-16 mb-56">
              {sector.challenges.map((ch) => (
                <li key={ch} className="flex items-start gap-16">
                  <Check size={16} strokeWidth={1.5} className="text-signal-500 shrink-0 mt-1" />
                  <span className="text-body text-navy-700">{ch}</span>
                </li>
              ))}
            </ul>
            <h2 className="text-h3 font-medium text-navy-900 mb-24">Interventions recommandées</h2>
            <div className="flex flex-col gap-16">
              {relatedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center justify-between gap-16 p-24 bg-paper rounded-lg border border-navy-900/8 hover:shadow-2 transition-shadow duration-standard ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55">
                  <div>
                    <p className="font-mono text-mono text-navy-400 mb-4">{s.index}</p>
                    <h3 className="text-body font-medium text-navy-900">{s.title}</h3>
                    <p className="text-sm text-navy-500 mt-4 leading-snug">{s.description}</p>
                  </div>
                  <ArrowRight size={18} strokeWidth={1.5} className="text-navy-400 group-hover:text-navy-700 transition-colors duration-micro shrink-0" />
                </Link>
              ))}
            </div>
          </div>
          <aside className="flex flex-col gap-24">
            <div className="bg-paper rounded-lg border border-navy-900/8 p-24 shadow-1">
              <h3 className="text-body font-medium text-navy-900 mb-12">Besoin d&apos;un devis ?</h3>
              <p className="text-sm text-navy-600 mb-20">Décrivez votre situation en 2 minutes. Nous revenons vers vous sous 48 h.</p>
              <Link href="/diagnostic" className="block">
                <Button className="w-full">Diagnostic en ligne <ArrowRight size={16} strokeWidth={1.5} /></Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <FinalCTA />
    </>
  );
}

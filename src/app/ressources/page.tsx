import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Chip from "@/components/ui/Chip";
import { getArticles } from "@/lib/db";

export const metadata: Metadata = {
  title: "Ressources",
  description: "Encyclopédie des nuisibles, guides pratiques IPM, conseils pour audits IFS/BRC.",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function RessourcesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-cream pt-[88px]">
      <div className="bg-navy-900 pt-40 pb-72">
        <div className="container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Ressources</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20">
            Mieux comprendre pour mieux agir.
          </h1>
          <p className="text-body-lg text-navy-200 max-w-[52ch] leading-relaxed">
            Encyclopédie des nuisibles, protocoles, conseils d&apos;audit — des contenus
            écrits par nos techniciens, pas par une IA en roue libre.
          </p>
        </div>
      </div>

      <section className="container-site section-padding">
        <div className="grid sm:grid-cols-2 gap-32">
          {articles.map((article) => (
            <article key={article.slug} className="group flex flex-col gap-20 bg-paper rounded-lg p-32 shadow-1 hover:shadow-2 transition-shadow duration-standard ease-brand">
              <div className="flex items-center justify-between">
                <Chip>{article.category}</Chip>
                <span className="font-mono text-mono text-navy-400">{article.readTime}</span>
              </div>
              <h2 className="text-h3 font-medium text-navy-900 leading-snug flex-1">{article.title}</h2>
              <p className="text-body text-navy-600 leading-relaxed">{article.excerpt}</p>
              <div className="flex items-center justify-between pt-16 border-t border-navy-900/8">
                <span className="text-sm text-navy-400">{formatDate(article.date)}</span>
                <Link
                  href={`/ressources/${article.slug}`}
                  className="inline-flex items-center gap-8 text-body font-medium text-navy-700 group-hover:text-navy-900 transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm"
                >
                  Lire l&apos;article <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-micro group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

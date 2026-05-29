import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import Chip from "@/components/ui/Chip";
import type { Article } from "@/lib/content";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

interface ArticlesGridProps {
  articles: Article[];
}

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
  return (
    <section className="bg-cream section-padding" aria-labelledby="articles-title">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-24 mb-56">
          <SectionHead
            eyebrow="Ressources"
            title="Mieux comprendre pour mieux agir."
            id="articles-title"
          />
          <Link
            href="/ressources"
            className="inline-flex items-center gap-8 text-body font-medium text-navy-700 hover:text-navy-900 transition-colors duration-micro ease-brand shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm"
          >
            Toutes les ressources
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-24">
          {articles.map((article) => (
            <article key={article.slug} className="group flex flex-col gap-16 bg-paper rounded-lg p-24 shadow-1 hover:shadow-2 transition-shadow duration-standard ease-brand">
              <div className="flex items-center justify-between">
                <Chip>{article.category}</Chip>
                <span className="font-mono text-mono text-navy-400">{article.readTime}</span>
              </div>
              <h3 className="text-body font-medium text-navy-900 leading-snug flex-1">
                {article.title}
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between pt-8 border-t border-navy-900/8">
                <span className="text-sm text-navy-400">{formatDate(article.date)}</span>
                <Link
                  href={`/ressources/${article.slug}`}
                  className="inline-flex items-center gap-6 text-sm font-medium text-navy-700 group-hover:text-navy-900 transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm"
                >
                  Lire
                  <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-micro group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

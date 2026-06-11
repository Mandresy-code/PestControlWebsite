import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticle, getArticleSlugs } from "@/lib/db";
import Chip from "@/components/ui/Chip";
import FinalCTA from "@/components/sections/FinalCTA";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <div className="bg-cream pt-[72px]">
        <div className="container-site pt-40 pb-56">
          <Link
            href="/ressources"
            className="inline-flex items-center gap-8 text-navy-500 hover:text-navy-900 text-sm font-medium mb-32 transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm"
          >
            <ArrowLeft size={14} strokeWidth={1.5} /> Toutes les ressources
          </Link>
          <div className="max-w-[680px]">
            <div className="flex items-center gap-16 mb-24">
              <Chip>{article.category}</Chip>
              <span className="font-mono text-mono text-navy-400">{article.readTime}</span>
              <span className="text-sm text-navy-400">{formatDate(article.date)}</span>
            </div>
            <h1 className="text-h1 font-medium text-navy-900 mb-24">{article.title}</h1>
            <p className="text-body-lg text-navy-600 leading-relaxed">{article.excerpt}</p>
          </div>
        </div>
      </div>

      <div className="bg-paper py-72">
        <div className="container-site">
          <div className="prose-eseis mx-auto">
            {article.body ? (
              <div dangerouslySetInnerHTML={{ __html: article.body }} />
            ) : (
              <>
                <p>
                  Cet article est en cours de rédaction par nos techniciens. Le contenu final sera
                  livré avec les photos et données terrain issues des interventions ESEIS.
                </p>
                <h2>Pourquoi ce sujet nous tient à cœur</h2>
                <p>
                  {article.excerpt} C&apos;est pourquoi nous avons souhaité dédier un guide
                  complet à ce sujet — pour que chaque professionnel ou particulier dispose des
                  informations nécessaires avant même de nous appeler.
                </p>
                <h2>Ce que vous devez retenir</h2>
                <ul>
                  <li>Identifier le problème avant d&apos;agir est toujours la bonne première étape.</li>
                  <li>Le traitement doit être proportionné au niveau d&apos;infestation réel.</li>
                  <li>La documentation et la traçabilité protègent votre établissement.</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <FinalCTA />
    </>
  );
}

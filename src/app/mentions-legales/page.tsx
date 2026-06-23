import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — ESEIS Pest Control",
  description: "Mentions légales d'ESEIS Pest Control, société du groupe BCR-i.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-cream pt-[112px]">
      <div className="bg-navy-900 pt-40 pb-72">
        <div className="container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Légal</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20">
            Mentions légales
          </h1>
        </div>
      </div>

      <div className="container-site section-padding max-w-[760px]">
        <div className="prose-eseis space-y-40">
          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Éditeur du site</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              ESEIS Pest Control est une société du groupe BCR-i.<br />
              Siège social : à compléter.<br />
              Forme juridique : à compléter.<br />
              SIRET : à compléter.<br />
              Directeur de la publication : à compléter.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Hébergement</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              Ce site est hébergé par Netlify, Inc.<br />
              44 Montgomery Street, Suite 300, San Francisco, CA 94104, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Propriété intellectuelle</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              L&apos;ensemble des contenus présents sur ce site (textes, images, logotypes, structure) est
              la propriété exclusive d&apos;ESEIS Pest Control et du groupe BCR-i. Toute reproduction,
              même partielle, est interdite sans autorisation préalable écrite.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Contact</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              Pour toute question relative à ces mentions légales :{" "}
              <a
                href="mailto:contact@eseis-pestcontrol.fr"
                className="text-navy-900 underline underline-offset-2 hover:text-navy-700 transition-colors duration-micro"
              >
                contact@eseis-pestcontrol.fr
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — ESEIS Pest Control",
  description: "Politique de confidentialité et traitement des données personnelles d'ESEIS Pest Control.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-cream pt-[112px]">
      <div className="bg-navy-900 pt-40 pb-72">
        <div className="container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Légal</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20">
            Politique de confidentialité
          </h1>
        </div>
      </div>

      <div className="container-site section-padding max-w-[760px]">
        <div className="prose-eseis space-y-40">
          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Données collectées</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              Lors de l&apos;utilisation de ce site, nous pouvons être amenés à collecter les informations
              suivantes : nom, adresse e-mail, numéro de téléphone, et description de votre situation
              transmis via le formulaire de contact ou le diagnostic en ligne.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Finalités du traitement</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              Les données collectées sont utilisées exclusivement pour répondre à vos demandes, établir
              des devis et assurer le suivi de nos interventions. Elles ne sont jamais revendues à des
              tiers ni utilisées à des fins publicitaires.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Durée de conservation</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              Vos données sont conservées pendant la durée strictement nécessaire à la relation
              commerciale, et au maximum 3 ans après le dernier contact, conformément à la
              réglementation française en vigueur.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Vos droits (RGPD)</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
              d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité de vos données.
              Pour exercer ces droits, contactez-nous à{" "}
              <a
                href="mailto:contact@eseis-pestcontrol.fr"
                className="text-navy-900 underline underline-offset-2 hover:text-navy-700 transition-colors duration-micro"
              >
                contact@eseis-pestcontrol.fr
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-navy-900 mb-16">Cookies</h2>
            <p className="text-body text-navy-600 leading-relaxed">
              Ce site n&apos;utilise pas de cookies à des fins publicitaires ou de tracking. Des cookies
              techniques strictement nécessaires au fonctionnement du site peuvent être déposés.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

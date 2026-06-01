import type { Metadata } from "next";
import { getPests } from "@/lib/db";
import DiagnosticWizard from "./DiagnosticWizard";
import type { Pest } from "@/lib/content";

export const metadata: Metadata = {
  title: "Diagnostic en ligne",
  description:
    "Décrivez votre situation en 2 minutes. Nos techniciens vous rappellent sous 48 h ouvrées pour organiser une intervention adaptée.",
};

export default async function DiagnosticPage() {
  const pests: Pest[] = await getPests();

  return (
    <div className="min-h-screen bg-cream pt-[88px]">
      <div className="container-site py-56 md:py-72">
        <div className="max-w-[680px] mx-auto">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-500 mb-12">
            Diagnostic en ligne
          </p>
          <h1 className="text-h1 font-medium text-navy-900 mb-16">Décrivez votre situation.</h1>
          <p className="text-body-lg text-navy-600 mb-40">
            Cinq questions. Nos techniciens analysent votre réponse et vous rappellent sous 48 h
            ouvrées. Pas de devis standard, pas de copier-coller.
          </p>
          <DiagnosticWizard pests={pests} />
        </div>
      </div>
    </div>
  );
}

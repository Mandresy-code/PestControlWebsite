"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Home, UtensilsCrossed, Hotel, Factory, HeartPulse, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import { wizardSigns } from "@/lib/content";

type Step = "place" | "sign" | "result";

const placeOptions = [
  { id: "interieur", label: "À l'intérieur", sub: "Maison, bureau, restaurant…", icon: Home },
  { id: "exterieur", label: "À l'extérieur", sub: "Jardin, cour, abords…",     icon: Building2 },
];

const pestLabels: Record<string, string> = {
  rats: "Rats & souris",
  blattes: "Blattes",
  punaises: "Punaises de lit",
  fourmis: "Fourmis",
  guepes: "Guêpes & frelons",
  mouches: "Mouches",
  moustiques: "Moustiques",
  "nuisibles-volants": "Autres volants",
};

const pestUrge: Record<string, boolean> = {
  rats: true,
  punaises: true,
  guepes: true,
};

export default function PestSelector() {
  const router = useRouter();
  const [step, setStep]       = useState<Step>("place");
  const [place, setPlace]     = useState<string>("");
  const [sign, setSign]       = useState<string>("");
  const [pestId, setPestId]   = useState<string>("");

  const signs = place ? wizardSigns[place] ?? [] : [];

  function handlePlace(id: string) {
    setPlace(id);
    setStep("sign");
  }

  function handleSign(pestIdResult: string) {
    setPestId(pestIdResult);
    setStep("result");
  }

  function reset() {
    setStep("place");
    setPlace("");
    setSign("");
    setPestId("");
  }

  return (
    <section className="bg-cream-2 section-padding">
      <div className="container-site">
        <div className="grid md:grid-cols-2 gap-56 items-start">
          <SectionHead
            eyebrow="Identifier"
            title="Pas sûr de ce que vous avez ?"
            description="Répondez à deux questions. Nous identifions le nuisible et vous orientons vers la bonne solution."
          />

          {/* Wizard card */}
          <div className="bg-paper rounded-lg shadow-2 p-32 md:p-40">
            {step === "place" && (
              <div>
                <p className="text-body-lg font-medium text-navy-900 mb-24">
                  Où observez-vous le problème ?
                </p>
                <div className="flex flex-col gap-12">
                  {placeOptions.map(({ id, label, sub, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => handlePlace(id)}
                      className="flex items-center gap-20 p-20 rounded-md border border-navy-900/10 hover:border-signal-500 hover:bg-signal-500/5 text-left transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55"
                    >
                      <div className="w-10 h-10 rounded-md bg-navy-900/6 flex items-center justify-center shrink-0">
                        <Icon size={20} strokeWidth={1.5} className="text-navy-600" />
                      </div>
                      <div>
                        <p className="text-body font-medium text-navy-900">{label}</p>
                        <p className="text-sm text-navy-500 mt-2">{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "sign" && (
              <div>
                <button onClick={reset} className="text-sm text-navy-400 hover:text-navy-700 mb-20 transition-colors duration-micro">
                  ← Recommencer
                </button>
                <p className="text-body-lg font-medium text-navy-900 mb-24">
                  Quel signe avez-vous observé ?
                </p>
                <div className="flex flex-col gap-10">
                  {signs.map(({ id, label, pestId: pid }) => (
                    <button
                      key={id}
                      onClick={() => handleSign(pid)}
                      className="flex items-center gap-16 p-16 rounded-md border border-navy-900/10 hover:border-signal-500 hover:bg-signal-500/5 text-left transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55"
                    >
                      <span className="w-[6px] h-[6px] rounded-full bg-signal-500 shrink-0 mt-1" />
                      <span className="text-body text-navy-800">{label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => router.push("/diagnostic")}
                  className="mt-20 text-sm text-navy-400 hover:text-navy-700 transition-colors duration-micro underline underline-offset-2"
                >
                  Pas sûr ? Lancer le diagnostic complet →
                </button>
              </div>
            )}

            {step === "result" && pestId && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-signal-500/15 mb-24">
                  <span className="w-8 h-8 rounded-full bg-signal-500" />
                </div>
                <p className="text-eyebrow uppercase tracking-widest font-mono text-signal-500 mb-12">
                  Nuisible identifié
                </p>
                <h3 className="text-h3 font-medium text-navy-900 mb-8">
                  {pestLabels[pestId] ?? "Nuisible"}
                </h3>
                {pestUrge[pestId] && (
                  <p className="inline-flex items-center gap-6 text-sm text-danger mb-16">
                    <span className="w-[5px] h-[5px] rounded-full bg-danger" />
                    Intervention urgente recommandée
                  </p>
                )}
                <p className="text-body text-navy-600 mb-32">
                  Nos techniciens interviennent dans les 48 h ouvrées pour ce type de nuisible.
                </p>
                <div className="flex flex-col gap-12">
                  <Button
                    onClick={() => router.push(`/diagnostic?pest=${pestId}`)}
                    className="w-full"
                  >
                    Demander une intervention
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </Button>
                  <button
                    onClick={reset}
                    className="text-sm text-navy-400 hover:text-navy-700 transition-colors duration-micro"
                  >
                    Recommencer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

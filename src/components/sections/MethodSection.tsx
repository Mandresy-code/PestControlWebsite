import Image from "next/image";
import { Search, ClipboardList, Wrench, BarChart3 } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import Eyebrow from "@/components/ui/Eyebrow";
import { methodSteps } from "@/lib/content";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Search, ClipboardList, Wrench, BarChart3,
};

export default function MethodSection() {
  return (
    <section className="bg-paper section-padding" aria-labelledby="method-title">
      <div className="container-site">
        <div className="grid md:grid-cols-2 gap-72 items-center mb-96">
          {/* Steps */}
          <div>
            <SectionHead
              eyebrow="Notre méthode"
              title="IPM — la lutte qui comprend avant d'agir."
              description="Integrated Pest Management : une philosophie qui place le diagnostic avant le traitement, et la prévention avant l'urgence."
              className="mb-56"
              id="method-title"
            />
            <ol className="flex flex-col gap-32">
              {methodSteps.map((step) => {
                const Icon = iconMap[step.icon] ?? Search;
                return (
                  <li key={step.index} className="flex gap-24">
                    <div className="flex flex-col items-center gap-8 shrink-0">
                      <span className="font-mono text-mono text-navy-300 tabular-nums">{step.index}</span>
                      <div className="w-[1px] flex-1 bg-navy-900/8" />
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-12 mb-8">
                        <div className="w-10 h-10 rounded-md bg-navy-900/6 flex items-center justify-center shrink-0">
                          <Icon size={20} strokeWidth={1.5} className="text-navy-600" />
                        </div>
                        <h3 className="text-h3 font-medium text-navy-900">{step.title}</h3>
                      </div>
                      <p className="text-body text-navy-600 leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Photo agent au travail */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-navy-100">
              {/* Placeholder — le client fournira la photo d'un agent ESEIS */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-200 to-navy-300 flex flex-col items-center justify-center gap-12 text-center p-32">
                <div className="w-16 h-16 rounded-full bg-navy-400/30 flex items-center justify-center">
                  <Wrench size={32} strokeWidth={1} className="text-navy-500" />
                </div>
                <p className="font-mono text-mono text-navy-400 uppercase tracking-widest">
                  Photo agent — à fournir
                </p>
                <p className="text-sm text-navy-400 max-w-[24ch]">
                  Le client fournira une photo d&apos;un technicien ESEIS en intervention.
                </p>
              </div>
            </div>
            {/* Caption */}
            <div className="mt-20 pl-4 border-l-2 border-signal-500">
              <p className="text-sm text-navy-400 mb-4">Sur le terrain</p>
              <p className="text-body font-medium text-navy-800">
                Un geste maîtrisé, pas un coup de pulvérisateur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

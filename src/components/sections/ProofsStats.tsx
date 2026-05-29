import { Award, FileCheck, Leaf, Clock } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import Stat from "@/components/ui/Stat";
import Arc from "@/components/ui/Arc";
import type { Proof, Stat as StatType } from "@/lib/content";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Award, FileCheck, Leaf, Clock,
};

interface ProofsStatsProps {
  proofs: Proof[];
  stats:  StatType[];
}

export default function ProofsStats({ proofs, stats }: ProofsStatsProps) {
  return (
    <section className="relative bg-navy-900 text-white section-padding overflow-hidden" aria-labelledby="proofs-title">
      <Arc size={480} className="absolute -left-40 -bottom-40 text-white" opacity={0.05} strokeWidth={1} />

      <div className="relative container-site">
        <SectionHead
          eyebrow="Preuves & engagements"
          title="Des garanties concrètes, pas des promesses."
          onDark
          className="mb-72"
          id="proofs-title"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-32 mb-72">
          {proofs.map((proof) => {
            const Icon = iconMap[proof.icon] ?? Award;
            return (
              <div key={proof.title} className="flex flex-col gap-16">
                <div className="w-12 h-12 rounded-md bg-white/8 flex items-center justify-center">
                  <Icon size={24} strokeWidth={1.5} className="text-signal-400" />
                </div>
                <h3 className="text-h3 font-medium text-white">{proof.title}</h3>
                <p className="text-body text-navy-200 leading-relaxed">{proof.description}</p>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 mb-72" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-40">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} onDark />
          ))}
        </div>
      </div>
    </section>
  );
}

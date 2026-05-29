import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content";
import Chip from "./Chip";
import LucideIcon from "./LucideIcon";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export default function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-20 p-32 rounded-lg bg-paper border border-navy-900/8 shadow-1 hover:shadow-2 transition-shadow duration-standard ease-brand",
        className
      )}
    >
      {/* Index */}
      <span className="font-mono text-mono text-navy-300 tabular-nums">{service.index}</span>

      {/* Icon */}
      <div className="w-10 h-10 rounded-md bg-navy-900/6 flex items-center justify-center shrink-0">
        <LucideIcon name={service.icon} size={20} strokeWidth={1.5} className="text-navy-600" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-12 flex-1">
        <h3 className="text-h3 font-medium text-navy-900">{service.title}</h3>
        <p className="text-body text-navy-600 leading-relaxed">{service.description}</p>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-8">
        {service.chips.slice(0, 3).map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </div>

      {/* Link */}
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-8 text-body font-medium text-navy-900 group-hover:text-navy-700 transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm"
        aria-label={`En savoir plus sur ${service.title}`}
      >
        En savoir plus
        <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-micro ease-brand group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

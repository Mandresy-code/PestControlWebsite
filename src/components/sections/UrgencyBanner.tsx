import { Phone } from "lucide-react";
import { contact } from "@/lib/content";

export default function UrgencyBanner() {
  return (
    <div className="bg-navy-900 text-white">
      <div className="container-site py-16 flex flex-col sm:flex-row items-center justify-between gap-12">
        <p className="text-body text-navy-200 text-center sm:text-left">
          Urgence nuisibles&nbsp;? Notre astreinte répond 7j/7, jours fériés inclus.
        </p>
        <a
          href={`tel:${contact.emergencyPhone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-10 font-mono text-body font-medium text-white hover:text-signal-300 transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm shrink-0"
        >
          <Phone size={16} strokeWidth={1.5} />
          {contact.emergencyPhone}
          <span className="font-sans font-normal text-sm text-navy-300">— 24h/24</span>
        </a>
      </div>
    </div>
  );
}

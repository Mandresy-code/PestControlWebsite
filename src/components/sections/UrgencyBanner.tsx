import { Phone } from "lucide-react";
import { contact } from "@/lib/content";

export default function UrgencyBanner() {
  return (
    <div className="bg-navy-900 text-white">
      <div className="container-site py-16 flex flex-col sm:flex-row items-center justify-between gap-12">
        <p className="text-body text-navy-200 text-center sm:text-left">
          Urgence nuisibles&nbsp;? Notre service d&apos;urgence répond 7j/7, jours fériés inclus.
        </p>
        <a
          href={`tel:${contact.emergencyPhoneHref}`}
          className="inline-flex items-center gap-10 font-mono text-body font-medium text-white hover:text-signal-300 transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm shrink-0"
        >
          <Phone size={16} strokeWidth={1.5} className="shrink-0" />
          {contact.emergencyPhone} · 24h/24
        </a>
      </div>
    </div>
  );
}

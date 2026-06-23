import Link from "next/link";

export default function UrgencyBanner() {
  return (
    <div className="bg-navy-900 text-white">
      <div className="container-site py-16 flex flex-col sm:flex-row items-center justify-between gap-12">
        <p className="text-body text-navy-200 text-center sm:text-left">
          Urgence nuisibles&nbsp;? Notre service d&apos;urgence répond 7j/7, jours fériés inclus.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-10 font-mono text-body font-medium text-white hover:text-signal-300 transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55 rounded-sm shrink-0"
        >
          Nous contacter — 24h/24
        </Link>
      </div>
    </div>
  );
}

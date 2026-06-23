"use client";
import { useState } from "react";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { Field, TextareaField } from "@/components/ui/Field";
import { contact } from "@/lib/content";

export default function ContactPage() {
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]     = useState({ nom: "", email: "", tel: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-cream pt-[112px]">
      {/* Hero */}
      <div className="bg-navy-900 pt-40 pb-72">
        <div className="container-site">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Contact</p>
          <h1 className="text-h1 font-medium text-white tracking-tight mb-20">
            Parlons de votre situation.
          </h1>
          <p className="text-body-lg text-navy-200 max-w-[52ch] leading-relaxed">
            Pas de formulaire générique. Décrivez votre contexte : nous revenons avec
            une réponse adaptée.
          </p>
        </div>
      </div>

      <div className="container-site section-padding">
        <div className="grid md:grid-cols-[1fr_380px] gap-72">
          {/* Form */}
          <div>
            <h2 className="text-h3 font-medium text-navy-900 mb-32">Être rappelé</h2>
            {sent ? (
              <div className="p-32 rounded-lg bg-signal-500/10 border border-signal-500/20">
                <p className="text-body font-medium text-navy-900 mb-8">Message reçu.</p>
                <p className="text-body text-navy-600">
                  Nous vous rappelons sous 48 h ouvrées. Pour une urgence, utilisez le formulaire ci-dessous.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-20" noValidate>
                <div className="grid sm:grid-cols-2 gap-20">
                  <Field
                    label="Nom"
                    required
                    value={form.nom}
                    onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                    placeholder="Dupont"
                  />
                  <Field
                    label="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="contact@exemple.fr"
                  />
                </div>
                <Field
                  label="Téléphone"
                  type="tel"
                  value={form.tel}
                  onChange={(e) => setForm((f) => ({ ...f, tel: e.target.value }))}
                  placeholder="+33 6 00 00 00 00"
                />
                <TextareaField
                  label="Votre message"
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Décrivez votre situation, votre type d'établissement, le nuisible observé…"
                />
                <Button
                  type="submit"
                  disabled={loading || !form.nom || !form.email || !form.message}
                  className="self-start"
                >
                  {loading ? "Envoi…" : "Envoyer"}
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar infos */}
          <aside className="flex flex-col gap-32">
            {/* Urgence */}
            <div className="bg-navy-900 text-white rounded-lg p-32">
              <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-16">Urgence</p>
              <p className="text-body text-navy-200 mb-20">
                Nid de frelons, infestation soudaine avant inspection : notre service d&apos;urgence répond 7j/7.
              </p>
              <p className="text-body font-medium text-white">
                Contactez-nous via le formulaire ou par email.
              </p>
              <p className="text-sm text-navy-400 mt-8">{contact.hours}</p>
            </div>

            {/* Coordonnées */}
            <div className="flex flex-col gap-20">
              <div className="flex items-start gap-16">
                <Mail size={18} strokeWidth={1.5} className="text-signal-500 shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-navy-400 mb-4">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-body font-medium text-navy-900 hover:text-navy-700 transition-colors duration-micro">
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-16">
                <MapPin size={18} strokeWidth={1.5} className="text-signal-500 shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-navy-400 mb-4">Zones couvertes</p>
                  <p className="text-body text-navy-700">{contact.zones.join(" · ")}</p>
                </div>
              </div>
              <div className="flex items-start gap-16">
                <Clock size={18} strokeWidth={1.5} className="text-signal-500 shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-navy-400 mb-4">Horaires</p>
                  <p className="text-body text-navy-700">{contact.hours}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

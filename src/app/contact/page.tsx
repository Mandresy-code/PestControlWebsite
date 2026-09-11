"use client";
import { useState } from "react";
import { Mail, MapPin, Clock, Phone, Paperclip, X, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { Field, TextareaField } from "@/components/ui/Field";
import { contact } from "@/lib/content";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 Mo

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ContactPage() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({ nom: "", email: "", tel: "", message: "" });
  const [photo, setPhoto]     = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhotoError("");
    if (file && file.size > MAX_PHOTO_BYTES) {
      setPhotoError("La photo dépasse 5 Mo. Choisissez un fichier plus léger.");
      setPhoto(null);
      e.target.value = "";
      return;
    }
    setPhoto(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const photoPayload = photo
        ? { filename: photo.name, content: await fileToBase64(photo) }
        : null;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photo: photoPayload }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Erreur lors de l'envoi.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
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

                <div className="flex flex-col gap-8">
                  <label className="text-body font-medium text-navy-800">
                    Photo <span className="text-navy-400 font-normal">(optionnel)</span>
                  </label>
                  {photo ? (
                    <div className="flex items-center gap-12 p-12 rounded-md border border-navy-900/15 bg-paper">
                      <Paperclip size={16} strokeWidth={1.5} className="text-navy-500 shrink-0" />
                      <span className="text-sm text-navy-700 truncate flex-1">{photo.name}</span>
                      <button
                        type="button"
                        onClick={() => setPhoto(null)}
                        aria-label="Retirer la photo"
                        className="text-navy-400 hover:text-danger transition-colors duration-micro shrink-0"
                      >
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-10 p-12 rounded-md border border-dashed border-navy-900/20 hover:border-signal-500 text-sm text-navy-500 cursor-pointer transition-colors duration-micro">
                      <Paperclip size={16} strokeWidth={1.5} className="shrink-0" />
                      Joindre une photo (max 5 Mo)
                      <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                    </label>
                  )}
                  {photoError && <p className="text-sm text-danger" role="alert">{photoError}</p>}
                </div>

                {error && <p className="text-sm text-danger" role="alert">{error}</p>}

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
              <a
                href={`tel:${contact.emergencyPhoneHref}`}
                className="inline-flex items-center gap-10 text-h3 font-medium text-white hover:text-signal-300 transition-colors duration-micro"
              >
                <Phone size={20} strokeWidth={1.5} className="text-signal-400 shrink-0" />
                {contact.emergencyPhone}
              </a>
              <p className="text-sm text-navy-400 mt-16">{contact.hours}</p>
              <p className="text-sm text-terra-400 mt-4">{contact.emergencyHours}</p>
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
                  <p className="text-sm text-navy-400 mb-4">Siège</p>
                  <p className="text-body text-navy-700">{contact.address}</p>
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

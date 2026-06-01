"use client";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Field } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import Arc from "@/components/ui/Arc";

export default function EspaceClientPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col justify-center px-32 md:px-56 py-56 bg-cream pt-[88px] md:pt-56">
        <div className="max-w-[400px] w-full mx-auto">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-500 mb-20">
            Espace client
          </p>
          <h1 className="text-h2 font-medium text-navy-900 mb-8">Connexion</h1>
          <p className="text-body text-navy-500 mb-40">
            Accédez à vos rapports d&apos;intervention, contrats et plannings.
          </p>

          <form className="flex flex-col gap-20" onSubmit={(e) => e.preventDefault()}>
            <Field
              label="Email"
              type="email"
              required
              placeholder="votre@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Field
                label="Mot de passe"
                type={showPwd ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-16 bottom-11 text-navy-400 hover:text-navy-700 transition-colors duration-micro focus-visible:outline-none"
                aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPwd ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
              </button>
            </div>

            <Button type="submit" disabled={!email || !password}>
              Se connecter
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>

            <a
              href="mailto:contact@eseis-pestcontrol.fr?subject=Accès espace client"
              className="text-sm text-navy-400 hover:text-navy-700 text-center transition-colors duration-micro"
            >
              Problème de connexion ? Contactez-nous
            </a>
          </form>
        </div>
      </div>

      {/* Right — navy panel */}
      <div className="hidden md:flex relative bg-navy-900 flex-col justify-center px-56 overflow-hidden">
        <Arc size={480} className="absolute right-[-80px] top-[-80px] text-white" opacity={0.06} strokeWidth={1} />
        <div className="relative z-10 max-w-[420px]">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-signal-400 mb-20">
            Groupe BCR-i
          </p>
          <h2 className="text-h2 font-medium text-white mb-24">
            Vos interventions,<br />en temps réel.
          </h2>
          <p className="text-body-lg text-navy-200 leading-relaxed mb-40">
            Rapports d&apos;intervention détaillés, plannings de passage, traçabilité
            complète pour vos audits IFS / BRC — tout dans votre espace dédié.
          </p>
          <div className="flex flex-col gap-16">
            {[
              "Rapports d'intervention téléchargeables",
              "Suivi des passages planifiés",
              "Historique complet et traçabilité",
              "Documents pour audits qualité",
            ].map((item) => (
              <div key={item} className="flex items-center gap-12 text-navy-300">
                <span className="w-[5px] h-[5px] rounded-full bg-signal-500 shrink-0" />
                <span className="text-body">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

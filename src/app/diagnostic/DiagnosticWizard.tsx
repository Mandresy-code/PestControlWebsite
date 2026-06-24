"use client";
import { useReducer, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Field, TextareaField } from "@/components/ui/Field";
import { wizardPlaces } from "@/lib/content";
import type { Pest } from "@/lib/content";

// ─── Types ──────────────────────────────────────────────────────────────────────

type Place     = string;
type PestId    = string;
type Situation = "premiere" | "recurrent" | "audit" | "preventif" | "";
type Step      = 1 | 2 | 3 | 4 | 5;

interface FormState {
  step:          Step;
  place:         Place;
  pest:          PestId;
  situation:     Situation;
  nom:           string;
  etablissement: string;
  email:         string;
  tel:           string;
  cp:            string;
  dispo:         string;
  precisions:    string;
  submitted:     boolean;
  submitting:    boolean;
  errors:        Partial<Record<string, string>>;
}

type Action =
  | { type: "SET_PLACE";     payload: Place }
  | { type: "SET_PEST";      payload: PestId }
  | { type: "SET_SITUATION"; payload: Situation }
  | { type: "SET_FIELD";     field: keyof FormState; value: string }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SUBMITTING" }
  | { type: "SUBMITTED" }
  | { type: "SET_ERRORS";    errors: Record<string, string> }
  | { type: "PREFILL_PEST";  pest: PestId };

const initial: FormState = {
  step: 1, place: "", pest: "", situation: "",
  nom: "", etablissement: "", email: "", tel: "", cp: "", dispo: "", precisions: "",
  submitted: false, submitting: false, errors: {},
};

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_PLACE":     return { ...state, place: action.payload };
    case "SET_PEST":      return { ...state, pest: action.payload };
    case "SET_SITUATION": return { ...state, situation: action.payload };
    case "SET_FIELD":     return { ...state, [action.field]: action.value };
    case "NEXT":          return { ...state, step: Math.min(state.step + 1, 5) as Step, errors: {} };
    case "PREV":          return { ...state, step: Math.max(state.step - 1, 1) as Step, errors: {} };
    case "SUBMITTING":    return { ...state, submitting: true };
    case "SUBMITTED":     return { ...state, submitting: false, submitted: true };
    case "SET_ERRORS":    return { ...state, errors: action.errors, submitting: false };
    case "PREFILL_PEST":  return { ...state, pest: action.pest };
    default:              return state;
  }
}

const stepLabels: Record<Step, string> = {
  1: "Lieu", 2: "Nuisible", 3: "Situation", 4: "Coordonnées", 5: "Confirmation",
};

const situations: { id: Situation; label: string; sub: string }[] = [
  { id: "premiere",  label: "Première apparition",  sub: "Je constate le problème pour la première fois." },
  { id: "recurrent", label: "Problème récurrent",   sub: "Le nuisible revient régulièrement." },
  { id: "audit",     label: "Audit imminent",        sub: "J'ai un contrôle IFS, BRC ou sanitaire à venir." },
  { id: "preventif", label: "Démarche préventive",   sub: "Pas d'infestation active : je veux prévenir." },
];

// ─── Inner wizard ────────────────────────────────────────────────────────────────

function WizardInner({ pests }: { pests: Pest[] }) {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const pestParam = searchParams.get("pest");
    if (pestParam) dispatch({ type: "PREFILL_PEST", pest: pestParam });
  }, [searchParams]);

  const isUrgent = (pestId: string) =>
    pests.find((p) => p.id === pestId)?.urgent ?? false;

  async function handleSubmit() {
    const errs: Record<string, string> = {};
    if (!state.nom.trim())  errs.nom   = "Le nom est requis.";
    if (!state.email.trim()) errs.email = "L'email est requis.";
    if (!state.email.includes("@")) errs.email = "Email invalide.";
    if (Object.keys(errs).length) {
      dispatch({ type: "SET_ERRORS", errors: errs });
      return;
    }
    dispatch({ type: "SUBMITTING" });
    try {
      await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state }),
      });
      dispatch({ type: "SUBMITTED" });
    } catch {
      dispatch({ type: "SET_ERRORS", errors: { submit: "Erreur réseau. Veuillez réessayer." } });
    }
  }

  if (state.submitted) return <Confirmation state={state} pests={pests} />;

  const urgent = isUrgent(state.pest);

  return (
    <div>
      {/* Barre de progression */}
      <div className="flex gap-8 mb-40" role="list" aria-label="Étapes du diagnostic">
        {([1, 2, 3, 4, 5] as Step[]).map((s) => (
          <div key={s} role="listitem" aria-current={state.step === s ? "step" : undefined} className="flex-1 flex flex-col gap-6">
            <div className={cn(
              "h-[3px] rounded-full transition-colors duration-standard ease-brand",
              s < state.step ? "bg-navy-900" : s === state.step ? "bg-signal-500" : "bg-navy-900/15"
            )} />
            <span className={cn("font-mono text-[10px] uppercase tracking-widest", s === state.step ? "text-navy-900" : "text-navy-400")}>
              {stepLabels[s]}
            </span>
          </div>
        ))}
      </div>

      {/* Étape 1 — Lieu */}
      {state.step === 1 && (
        <StepCard title="Quel type de lieu ?">
          <div className="grid sm:grid-cols-2 gap-12">
            {wizardPlaces.map(({ id, label }) => (
              <ChoiceButton key={id} label={label} selected={state.place === id}
                onClick={() => dispatch({ type: "SET_PLACE", payload: id })} />
            ))}
          </div>
          <NavRow onNext={() => dispatch({ type: "NEXT" })} nextDisabled={!state.place} />
        </StepCard>
      )}

      {/* Étape 2 — Nuisible */}
      {state.step === 2 && (
        <StepCard title="Quel nuisible pensez-vous avoir ?">
          <div className="grid sm:grid-cols-2 gap-12">
            {pests.map((pest) => (
              <ChoiceButton key={pest.id} label={pest.name}
                selected={state.pest === pest.id}
                onClick={() => dispatch({ type: "SET_PEST", payload: pest.id })}
                badge={pest.urgent ? "Urgent" : undefined} />
            ))}
          </div>
          <NavRow onPrev={() => dispatch({ type: "PREV" })}
            onNext={() => dispatch({ type: "NEXT" })} nextDisabled={!state.pest} />
        </StepCard>
      )}

      {/* Étape 3 — Situation */}
      {state.step === 3 && (
        <StepCard title="Comment décririez-vous la situation ?">
          <div className="flex flex-col gap-12">
            {situations.map(({ id, label, sub }) => (
              <ChoiceButton key={id} label={label} sub={sub}
                selected={state.situation === id}
                onClick={() => dispatch({ type: "SET_SITUATION", payload: id })} />
            ))}
          </div>
          <NavRow onPrev={() => dispatch({ type: "PREV" })}
            onNext={() => dispatch({ type: "NEXT" })} nextDisabled={!state.situation} />
        </StepCard>
      )}

      {/* Étape 4 — Coordonnées */}
      {state.step === 4 && (
        <StepCard title="Vos coordonnées">
          <div className="grid sm:grid-cols-2 gap-20">
            <Field label="Nom" required placeholder="Dupont" value={state.nom}
              error={state.errors.nom}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "nom", value: e.target.value })} />
            <Field label="Établissement" placeholder="Hôtel du Parc" value={state.etablissement}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "etablissement", value: e.target.value })} />
            <Field label="Email" type="email" required placeholder="contact@exemple.fr" value={state.email}
              error={state.errors.email}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })} />
            <Field label="Téléphone" type="tel" placeholder="+33 6 00 00 00 00" value={state.tel}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "tel", value: e.target.value })} />
            <Field label="Code postal" placeholder="75001" value={state.cp}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "cp", value: e.target.value })} />
            <Field label="Disponibilités" placeholder="Matins en semaine" value={state.dispo}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "dispo", value: e.target.value })} />
          </div>
          <div className="mt-20">
            <TextareaField label="Précisions"
              placeholder="Décrivez ce que vous observez, depuis quand, dans quelles zones…"
              value={state.precisions}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "precisions", value: e.target.value })} />
          </div>
          {state.errors.submit && <p className="text-sm text-danger mt-12" role="alert">{state.errors.submit}</p>}
          <NavRow onPrev={() => dispatch({ type: "PREV" })}
            onNext={() => dispatch({ type: "NEXT" })} nextDisabled={!state.nom || !state.email} />
        </StepCard>
      )}

      {/* Étape 5 — Récapitulatif */}
      {state.step === 5 && (
        <StepCard title="Récapitulatif">
          <div className="space-y-16 rounded-md bg-navy-50 p-24 mb-32">
            <RecapRow label="Lieu"       value={wizardPlaces.find((p) => p.id === state.place)?.label ?? state.place} />
            <RecapRow label="Nuisible"   value={pests.find((p) => p.id === state.pest)?.name ?? state.pest} />
            <RecapRow label="Situation"  value={situations.find((s) => s.id === state.situation)?.label ?? state.situation} />
            <RecapRow label="Nom"        value={state.nom} />
            <RecapRow label="Email"      value={state.email} />
            {state.tel   && <RecapRow label="Téléphone"    value={state.tel} />}
            {state.cp    && <RecapRow label="Code postal"  value={state.cp} />}
            {state.dispo && <RecapRow label="Disponibilités" value={state.dispo} />}
            {state.precisions && <RecapRow label="Précisions" value={state.precisions} />}
          </div>

          <div className={cn(
            "flex items-start gap-16 p-20 rounded-md mb-32",
            urgent ? "bg-danger/8 border border-danger/20" : "bg-signal-500/10 border border-signal-500/20"
          )}>
            {urgent
              ? <AlertTriangle size={20} strokeWidth={1.5} className="text-danger shrink-0 mt-0.5" />
              : <Check size={20} strokeWidth={1.5} className="text-signal-500 shrink-0 mt-0.5" />}
            <p className="text-body text-navy-800">
              {urgent
                ? "Nuisible urgent : nous privilégierons votre dossier. Délai cible : sous 24 h ouvrées."
                : "Nous reviendrons vers vous sous 48 h ouvrées pour organiser l'intervention."}
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            <Button onClick={handleSubmit} disabled={state.submitting} className="flex-1 sm:flex-none">
              {state.submitting ? "Envoi en cours…" : "Envoyer ma demande"}
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
            <Button variant="ghost" onClick={() => dispatch({ type: "PREV" })}>Modifier</Button>
          </div>
        </StepCard>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────────

function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-h3 font-medium text-navy-900 mb-24">{title}</h2>
      {children}
    </div>
  );
}

function ChoiceButton({ label, sub, selected, onClick, badge }: {
  label: string; sub?: string; selected: boolean; onClick: () => void; badge?: string;
}) {
  return (
    <button onClick={onClick} className={cn(
      "w-full flex items-center justify-between gap-16 p-20 rounded-md border text-left transition-colors duration-micro ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55",
      selected ? "border-navy-900 bg-navy-900/5" : "border-navy-900/12 hover:border-signal-500 hover:bg-signal-500/5"
    )}>
      <div>
        <p className={cn("text-body font-medium", selected ? "text-navy-900" : "text-navy-800")}>{label}</p>
        {sub && <p className="text-sm text-navy-500 mt-2">{sub}</p>}
      </div>
      <div className="flex items-center gap-10 shrink-0">
        {badge && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-danger bg-danger/10 px-8 py-3 rounded-pill">
            {badge}
          </span>
        )}
        <div className={cn("w-5 h-5 rounded-full border-2 transition-colors duration-micro",
          selected ? "border-navy-900 bg-navy-900" : "border-navy-900/20")} />
      </div>
    </button>
  );
}

function NavRow({ onPrev, onNext, nextDisabled }: {
  onPrev?: () => void; onNext?: () => void; nextDisabled?: boolean;
}) {
  return (
    <div className="flex justify-between mt-32">
      {onPrev
        ? <Button variant="ghost" onClick={onPrev}><ArrowLeft size={16} strokeWidth={1.5} /> Retour</Button>
        : <div />}
      {onNext && (
        <Button onClick={onNext} disabled={nextDisabled}>
          Continuer <ArrowRight size={16} strokeWidth={1.5} />
        </Button>
      )}
    </div>
  );
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-16 text-body">
      <span className="text-navy-500 w-32 shrink-0">{label}</span>
      <span className="text-navy-900 font-medium">{value}</span>
    </div>
  );
}

function Confirmation({ state, pests }: { state: FormState; pests: Pest[] }) {
  const urgent = pests.find((p) => p.id === state.pest)?.urgent ?? false;
  return (
    <div className="text-center py-40">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-signal-500/15 mb-24">
        <Check size={32} strokeWidth={1.5} className="text-signal-500" />
      </div>
      <h2 className="text-h2 font-medium text-navy-900 mb-16">Demande reçue.</h2>
      <p className="text-body-lg text-navy-600 max-w-[48ch] mx-auto leading-relaxed">
        {urgent
          ? `Votre dossier est marqué urgent. Nous vous rappelons sous 24 h ouvrées au ${state.tel || state.email}.`
          : `Nous vous répondrons sous 48 h ouvrées à l'adresse ${state.email}.`}
      </p>
    </div>
  );
}

// ─── Export public — Suspense pour useSearchParams ────────────────────────────────

export default function DiagnosticWizard({ pests }: { pests: Pest[] }) {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse bg-navy-100 rounded-md" />}>
      <WizardInner pests={pests} />
    </Suspense>
  );
}

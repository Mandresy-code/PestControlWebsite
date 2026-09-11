import { Resend } from "resend";

// ─── Config ─────────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const EMAIL_FROM      = process.env.EMAIL_FROM ?? "ESEIS Pest Control <onboarding@resend.dev>";

// Adresses qui reçoivent chaque demande (diagnostic + contact).
// Configurable via Netlify sans redéploiement de code : liste séparée par des virgules.
const DEFAULT_RECIPIENTS = ["cockpitgrdf@eseis.fr", "mandresy.rasolonjatovo@eseis.fr"];
const REQUEST_RECIPIENTS = (process.env.REQUEST_NOTIFICATION_EMAILS ?? DEFAULT_RECIPIENTS.join(","))
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

export const emailConfigured = !!RESEND_API_KEY;

const resend = emailConfigured ? new Resend(RESEND_API_KEY) : null;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface EmailAttachment {
  filename: string;
  /** Contenu encodé en base64 (sans le préfixe data:...;base64,) */
  content: string;
}

interface SendRequestEmailArgs {
  subject: string;
  replyTo?: string;
  html: string;
  attachments?: EmailAttachment[];
}

// ─── Envoi ──────────────────────────────────────────────────────────────────

/**
 * Envoie un email de notification de demande (diagnostic ou contact) à l'équipe.
 * Si Resend n'est pas configuré (pas de clé API), on journalise localement au lieu
 * d'échouer — même logique de dégradation que le client Supabase (voir supabase/client.ts).
 */
export async function sendRequestEmail({ subject, replyTo, html, attachments }: SendRequestEmailArgs) {
  if (!resend || REQUEST_RECIPIENTS.length === 0) {
    console.log("[email] Resend non configuré — email non envoyé:", { subject, replyTo });
    return { success: false, skipped: true as const };
  }

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: REQUEST_RECIPIENTS,
    replyTo,
    subject,
    html,
    attachments,
  });

  if (error) {
    console.error("[email] Resend error:", error);
    return { success: false, skipped: false as const, error };
  }

  return { success: true, skipped: false as const };
}

// ─── Gabarits ───────────────────────────────────────────────────────────────

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:4px 16px 4px 0;color:#47597F;white-space:nowrap;vertical-align:top;"><b>${label}</b></td><td style="padding:4px 0;color:#0E1F3D;">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function wrapEmail(title: string, urgent: boolean, bodyRows: string) {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:#0E1F3D;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0;">
        ${urgent ? `<p style="margin:0 0 6px;font-size:12px;letter-spacing:0.08em;color:#CC7550;text-transform:uppercase;font-weight:600;">Demande urgente</p>` : ""}
        <h1 style="margin:0;font-size:18px;font-weight:600;">${title}</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e6eaf2;border-top:none;border-radius:0 0 8px 8px;padding:8px 24px;font-size:14px;">
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
  `;
}

export function diagnosticEmailHtml(data: {
  urgent: boolean; place: string; pest: string; situation: string;
  nom: string; etablissement?: string | null; email: string; tel?: string | null;
  cp?: string | null; dispo?: string | null; precisions?: string | null;
}) {
  const type = data.etablissement ? "B2B — établissement" : "B2C — particulier";
  const bodyRows = [
    row("Type de demande", type),
    row("Lieu", data.place),
    row("Nuisible", data.pest),
    row("Situation", data.situation),
    row("Nom", data.nom),
    row("Établissement", data.etablissement),
    row("Email", data.email),
    row("Téléphone", data.tel),
    row("Code postal", data.cp),
    row("Disponibilités", data.dispo),
    row("Précisions", data.precisions),
  ].join("");
  return wrapEmail("Nouvelle demande de diagnostic", data.urgent, bodyRows);
}

export function contactEmailHtml(data: {
  nom: string; email: string; tel?: string | null; message: string;
}) {
  const bodyRows = [
    row("Nom", data.nom),
    row("Email", data.email),
    row("Téléphone", data.tel),
    row("Message", data.message),
  ].join("");
  return wrapEmail("Nouveau message de contact", false, bodyRows);
}

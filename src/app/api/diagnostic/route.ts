import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/client";
import { sendRequestEmail, diagnosticEmailHtml } from "@/lib/email";
import { wizardPlaces, wizardSituations, pests as pestList } from "@/lib/content";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const urgent = ["rats", "punaises", "guepes"].includes(body.pest ?? "");

    const supabase = createServiceClient();

    if (supabase) {
      const { error } = await supabase.from("diagnostic_requests").insert({
        place:         body.place        ?? null,
        pest:          body.pest         ?? null,
        situation:     body.situation    ?? null,
        nom:           body.nom          ?? null,
        etablissement: body.etablissement ?? null,
        email:         body.email        ?? null,
        tel:           body.tel          ?? null,
        cp:            body.cp           ?? null,
        dispo:         body.dispo        ?? null,
        precisions:    body.precisions   ?? null,
        urgent,
      });

      if (error) {
        console.error("[diagnostic] Supabase insert error:", error.message);
      }
    } else {
      // Supabase non configuré — log local uniquement
      console.log("[diagnostic] Mock — demande reçue:", {
        lieu: body.place, nuisible: body.pest, nom: body.nom, email: body.email,
      });
    }

    const placeLabel     = wizardPlaces.find((p) => p.id === body.place)?.label ?? body.place ?? "";
    const pestLabel       = pestList.find((p) => p.id === body.pest)?.name ?? body.pest ?? "";
    const situationLabel = wizardSituations.find((s) => s.id === body.situation)?.label ?? body.situation ?? "";

    const emailResult = await sendRequestEmail({
      subject: `${urgent ? "🔴 URGENT — " : ""}Demande de diagnostic — ${body.nom ?? "Sans nom"}`,
      replyTo: body.email,
      html: diagnosticEmailHtml({
        urgent,
        place: placeLabel,
        pest: pestLabel,
        situation: situationLabel,
        nom: body.nom ?? "",
        etablissement: body.etablissement,
        email: body.email ?? "",
        tel: body.tel,
        cp: body.cp,
        dispo: body.dispo,
        precisions: body.precisions,
      }),
    });

    if (!emailResult.success && !emailResult.skipped) {
      console.error("[diagnostic] Email non envoyé — la demande est tout de même enregistrée.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[diagnostic] Error:", err);
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}

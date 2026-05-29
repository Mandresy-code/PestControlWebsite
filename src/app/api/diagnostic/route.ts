import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
        urgent: ["rats", "punaises", "guepes"].includes(body.pest ?? ""),
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[diagnostic] Error:", err);
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}

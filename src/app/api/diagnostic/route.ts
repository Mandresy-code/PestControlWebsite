import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Mock — à brancher sur email/CRM lors de la mise en production
    // Exemple de payload attendu : { place, pest, situation, nom, email, tel, cp, dispo, precisions }
    console.log("[diagnostic] Nouvelle demande reçue:", {
      lieu:      body.place,
      nuisible:  body.pest,
      situation: body.situation,
      contact:   { nom: body.nom, email: body.email, tel: body.tel },
    });
    return NextResponse.json({ success: true, message: "Demande enregistrée." }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}

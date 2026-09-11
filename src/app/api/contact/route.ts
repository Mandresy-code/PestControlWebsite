import { NextRequest, NextResponse } from "next/server";
import { sendRequestEmail, contactEmailHtml } from "@/lib/email";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 Mo

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, email, tel, message, photo } = body as {
      nom?: string; email?: string; tel?: string; message?: string;
      photo?: { filename: string; content: string } | null;
    };

    if (!nom?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    const attachments = [];
    if (photo?.content) {
      const approxBytes = (photo.content.length * 3) / 4;
      if (approxBytes > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { success: false, message: "La photo dépasse la taille maximale autorisée (5 Mo)." },
          { status: 400 }
        );
      }
      attachments.push({ filename: photo.filename || "photo.jpg", content: photo.content });
    }

    const emailResult = await sendRequestEmail({
      subject: `Nouveau message de contact — ${nom}`,
      replyTo: email,
      html: contactEmailHtml({ nom, email, tel, message }),
      attachments,
    });

    if (!emailResult.success && !emailResult.skipped) {
      return NextResponse.json(
        { success: false, message: "Erreur lors de l'envoi. Veuillez réessayer." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}

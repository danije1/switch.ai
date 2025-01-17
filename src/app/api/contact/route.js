import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Funktion zum Senden der Bestätigungs-Mail
const sendConfirmationEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    host: "mail.gmx.net", // GMX SMTP-Server
    port: 587, // Port für TLS
    secure: false, // TLS sollte auf false stehen
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Dynamische Nachricht
  const emailBody = `
Hallo ${name || "Freund"}, 

vielen Dank für deine Nachricht und dein Interesse an switch.ai!
Wir werden uns bald bei dir melden.

Deine Nachricht: 
"${message}"

Mit freundlichen Grüßen,  
Dein switch.ai-Team
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Willkommen bei switch.ai!",
    text: emailBody,
  });
};

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required." }, { status: 400 });
  }

  try {
    // Bestätigungs-Mail senden
    await sendConfirmationEmail(name, email, message);

    console.log("Message received:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}

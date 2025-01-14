import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Funktion zum Senden der Bestätigungs-Mail
const sendConfirmationEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "mail.gmx.net", // GMX SMTP-Server
    port: 587, // Port für TLS
    secure: false, // TLS sollte auf false stehen
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to switch.ai!",
    text: "Thank you for your message! We will get back to you shortly.",
  });
};

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required." }, { status: 400 });
  }

  try {
    // Bestätigungs-Mail senden
    await sendConfirmationEmail(email);

    // Optional: Datenbank-Eintrag (hier auskommentiert, falls nicht benötigt)
    // const dbResult = await prisma.contact.create({
    //   data: { name, email, message },
    // });

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

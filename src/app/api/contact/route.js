import { sql } from "@vercel/postgres";
import nodemailer from "nodemailer";

// Sicherstellen, dass die DATABASE_URL gesetzt ist
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Datenbank-URL fehlt.");
  throw new Error("Datenbank-URL fehlt.");
}

// Basis-URL für das Logo (dynamisch oder festgelegt, z. B. für localhost oder Produktion)
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-domain.com"
    : "http://localhost:3000"; // Passe den Port an, falls nötig

// Funktion zum Senden der Bestätigungs-Mail
const sendConfirmationEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    host: "mail.gmx.net", // GMX SMTP-Server (oder eigener SMTP-Server)
    port: 587, // Port für TLS
    secure: false, // TLS sollte auf false stehen
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // HTML-E-Mail-Nachricht mit lokalem Logo und Design
  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${BASE_URL}/images/Logo/switch.ai.gif" alt="switch.ai Logo" style="max-width: 150px;" />
      </div>
      <h2 style="color: #4CAF50;">Willkommen bei switch.ai!</h2>
      <p>Hallo ${name || "Freund"},</p>
      <p>
        Vielen Dank für deine Nachricht und dein Interesse an <strong>switch.ai</strong>!
        Wir werden uns bald bei dir melden.
      </p>
      <p><strong>Deine Nachricht:</strong></p>
      <blockquote style="border-left: 4px solid #4CAF50; margin: 10px 0; padding: 10px 15px; background: #f9f9f9;">
        ${message}
      </blockquote>
      <p>Mit freundlichen Grüßen,<br>Dein <strong>switch.ai</strong>-Team</p>
      <hr />
      <footer style="text-align: center; font-size: 0.8em; color: #999;">
        <p>© ${new Date().getFullYear()} switch.ai. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Willkommen bei switch.ai!",
    html: emailBody,
  });
};

export async function POST(req) {
  const { name, email, message } = await req.json();

  // E-Mail ist erforderlich
  if (!email) {
    return new Response(JSON.stringify({ error: "Email ist erforderlich." }), {
      status: 400,
    });
  }

  try {
    // Eintrag in die Datenbank erstellen
    const result = await sql`
      INSERT INTO kontakte (email, name, nachricht)
      VALUES (${email}, ${name}, ${message})
      RETURNING *;
    `;

    // Bestätigungs-E-Mail senden
    await sendConfirmationEmail(name, email, message);

    // Antwort mit dem erstellten Datensatz zurückgeben
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Fehler in der API:", error);
    return new Response(JSON.stringify({ error: "Interner Serverfehler." }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const result = await sql`
      SELECT * FROM kontakte;
    `;
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    return new Response(
      JSON.stringify({ error: "Fehler beim Abrufen der Daten." }),
      { status: 500 }
    );
  }
}

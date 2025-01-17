import { sql } from "@vercel/postgres";
import nodemailer from "nodemailer";

// Sicherstellen, dass die DATABASE_URL gesetzt ist
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Datenbank-URL fehlt.");
  throw new Error("Datenbank-URL fehlt.");
}

// Funktion zum Senden der Bestätigungs-Mail
const sendConfirmationEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    host: "mail.gmx.net", // GMX SMTP-Server (hier kann dein eigener SMTP-Server sein)
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

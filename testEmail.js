const nodemailer = require("nodemailer");

const sendTestEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.gmx.net",
      port: 587,
      secure: false,
      auth: {
        user: "switch.ai@gmx.de",
        pass: "DMWTgruppe04",
      },
    });

    await transporter.sendMail({
      from: "switch.ai@gmx.de",
      to: "danijel.mojsilovic@gmx.de", // Empfänger-Adresse hier eintragen
      subject: "Test Email",
      text: "Hello, this is a test email from GMX!",
    });

    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Error sending test email:", error.message);
  }
};

sendTestEmail();

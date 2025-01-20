"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setStatus("Error sending message.");
    }
  };

  return (
    <div className={styles.contactContainer}>
      <nav
        className={styles.navbar}
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        <div
          className={styles.logoContainer}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src="/images/Logo switch_AI.gif"
            alt="switch.ai Logo"
            width={180}
            height={60}
            quality={100}
          />
          <Link href="/">
            <span className={styles.logo}>switch.ai</span>
          </Link>
        </div>
      </nav>
      <h1 className={styles.contactTitle}>Kontakt</h1>
      <p className={styles.contactSubtitle}>
        Hast du Fragen oder Anregungen? Schreibe uns eine Nachricht!
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Dein Name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Deine Email (Pflichtfeld)"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Nachricht</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Was möchtest du uns sagen?"
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>
          Nachricht senden
        </button>
      </form>

      {status && <p className={styles.statusMessage}>{status}</p>}

      <div className={styles.backToHome}>
        <Link href="/">Zurück zur Startseite</Link>
      </div>
    </div>
  );
};

export default ContactPage;

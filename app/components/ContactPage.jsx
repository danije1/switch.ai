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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Danke für deine Nachricht! Wir melden uns bald.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className={styles.contactContainer}>
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
            required
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
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>
          Nachricht senden
        </button>
      </form>

      <div className={styles.backToHome}>
        <Link href="/page.js">Zurück zur Startseite</Link>
      </div>
    </div>
  );
};

export default ContactPage;

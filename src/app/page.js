"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Homepage.module.css";
import RobotWithEyes from "./robot/robot"; // Pfad zur RobotWithEyes-Komponente
import ImageSelector from "./components/ImageSelector";

const HomePage = () => {
  const [isRobotMoving, setIsRobotMoving] = useState(false); // Zustand für Roboterbewegung
  const [isRobotHovered, setIsRobotHovered] = useState(false); // Zustand für Hover-Ereignis

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Startet die Bewegung des Roboters, wenn man den Hero-Bereich verlässt
      setIsRobotMoving(scrollPosition > window.innerHeight * 1.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav
        className={styles.navbar}
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        <div
          className={styles.logoContainer}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src="/images/Logo switch_ai.gif"
            alt="switch.ai Logo"
            width={180}
            height={60}
            quality={100}
          />
          <span className={styles.logo}>switch.ai</span>
        </div>

        {/* Navigation Links mit statischen Linien */}
        <div className={styles.linksContainer}>
          <Link href="#infos">
            <span className={styles.navLink}>Infos</span>
          </Link>
          <div className={styles.linkSeparator}></div>
          <Link href="#benefits">
            <span className={styles.navLink}>Vorteile</span>
          </Link>
          <div className={styles.linkSeparator}></div>
          <Link href="#solutions">
            <span className={styles.navLink}>Lösungen</span>
          </Link>
          <div className={styles.linkSeparator}></div>
          <Link href="#requirements">
            <span className={styles.navLink}>Voraussetzungen</span>
          </Link>
          <div className={styles.linkSeparator}></div>
          <Link href="/contact">
            <span className={styles.navLink}>Kontakt</span>
          </Link>
        </div>

        {/*<div className={styles.authButtons}>
          <button className={styles.login}>Login</button>
          <button className={styles.register}>Register</button>
        </div>*/}
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <img src="/images/smart_home.png" alt="Smart Home Hero" />
        <div className={styles.heroText}>
          <h1>Grün beginnt zu Hause.</h1>
          <p>
            Entdecken Sie intelligente Lösungen für ein nachhaltiges Zuhause.
          </p>
          <button className={styles.ctaButton}>Jetzt anfragen!</button>
        </div>
      </section>

      {/* Information Section */}
      <section id="infos" className={styles.infoSection}>
        <h2>Was ist Smarte Energy und wie hilft KI dabei?</h2>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem.
        </p>
        <button className={styles.learnMore}>
          Erfahre mehr über unsere KI-Lösungen
        </button>
      </section>

      {/* Roboter Section mit Bewegung */}
      <section className={styles.robotSection}>
        <div className={styles.circleLeft}></div>
        <div className={styles.circleRight}></div>
        <div className={styles.lineTop}></div>
        <div className={styles.lineMiddle}></div>
        <div className={styles.lineBottom}></div>
        {/* Ladestation */}
        <Image
          src="/images/Charger.svg"
          alt="Ladestation"
          className={styles.chargingStation}
          width={200}
          height={400}
        />
        {/* Roboter */}
        <RobotWithEyes />{" "}
        {/* SVG-Roboter, der jetzt rechts bleibt und mit der Seite mitfährt */}
        {isRobotHovered && (
          <div className={styles.robotTooltip}>
            <p>Hallo! Ich bin hier, um dir zu helfen. 🤖</p>
          </div>
        )}
      </section>

      {/* Infografik Section */}
      <section className={styles.infographicSection}>
        <h1>Auf einen Blick: Wie du mit smarter Energie bares Geld sparst!</h1>

        <div style={{ width: "75%", margin: "0 auto" }}>
          <ImageSelector />
        </div>
      </section>

      {/* Video Section */}
      <section className={styles.videoSection}>
        <h1 className={styles.videoTitle}>
          Wie KI-gesteuerte Systeme den Energieverbrauch überwachen und
          optimieren
        </h1>
        <video
          className={styles.videoElement}
          src="/videos/ki-energie.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
        />
      </section>

      {/* Karten Section */}
      <section id="benefits" className={styles.cardsSection}>
        <h1 className={styles.sectionCardTitle}>
          Vorteile einer KI-Smart Energy Lösung
        </h1>
        <p className={styles.sectionDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>

        <div className={styles.cardsContainer}>
          {/* Karte 1 */}
          <div className={styles.card}>
            <Image
              src="/images/AI hand mit glühbirne.png"
              alt="Energie Management"
              width={326}
              height={200}
            />
            <div className={styles.cardContent}>
              <h3>Vorteile der Nutzung von KI im Energiemanagement</h3>
              <button className={styles.learnMoreButton}>Mehr erfahren</button>
            </div>
          </div>

          {/* Karte 2 */}
          <div className={styles.card}>
            <Image
              src="/images/weltkugel natur.png"
              alt="Nachhaltigkeit"
              width={326}
              height={200}
            />
            <div className={styles.cardContent}>
              <h3>Umweltvorteile und Beitrag zur Nachhaltigkeit</h3>
              <button className={styles.learnMoreButton}>Mehr erfahren</button>
            </div>
          </div>

          {/* Karte 3 */}
          <div className={styles.card}>
            <Image
              src="/images/Oink.png"
              alt="Fördermöglichkeiten"
              width={326}
              height={200}
            />
            <div className={styles.cardContent}>
              <h3>Fördermöglichkeiten und steuerliche Vorteile</h3>
              <button className={styles.learnMoreButton}>Mehr erfahren</button>
            </div>
          </div>
        </div>
      </section>

      {/* KI-Lösungen Section */}
      <section id="solutions" className={styles.kiSolutionsSection}>
        <h1 className={styles.sectionTitle}>Unsere KI-Lösungen</h1>
        <p className={styles.sectionDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
        </p>

        <div className={styles.kiSolutionsGrid}>
          {/* Bild 1 */}
          <div className={styles.kiItem}>
            <Image
              src="/images/AI bild 1.png"
              alt="Heizungsteuerung"
              width={300}
              height={200}
            />
          </div>

          {/* Bild 2 */}
          <div className={styles.kiItem}>
            <Image
              src="/images/AI bild 2.png"
              alt="Smart Home Wohnzimmer"
              width={300}
              height={200}
            />
          </div>

          {/* Bild 3 */}
          <div className={styles.kiItem}>
            <Image
              src="/images/AI bild 3.png"
              alt="Mikrochip"
              width={300}
              height={200}
            />
          </div>

          {/* Bild 4 */}
          <div className={styles.kiItem}>
            <Image
              src="/images/AI bild 4.png"
              alt="Smart Garage"
              width={300}
              height={200}
            />
          </div>
        </div>
      </section>

      <section id="requirements" className={styles.requirementsSection}>
        <h1 className={styles.sectionTitle}>Technische Voraussetzungen</h1>
        <div className={styles.requirementsGrid}>
          {/* Erste Box */}
          <div className={styles.requirementItem}>
            <img src="/images/Blitz.svg" alt="Blitz Icon" />
            <p>Sed ut perspiciatis</p>
          </div>

          {/* Zweite Box */}
          <div className={styles.requirementItem}>
            <img src="/images/Wolke.svg" alt="Cloud Icon" />
            <p>Lorem ipsum dolor</p>
          </div>

          {/* Dritte Box */}
          <div className={styles.requirementItem}>
            <img src="/images/Code.svg" alt="Code Icon" />
            <p>Nemo enim ipsam</p>
          </div>

          {/* Vierte Box */}
          <div className={styles.requirementItem}>
            <img src="/images/Lock.svg" alt="Lock Icon" />
            <p>Tempor incididunt</p>
          </div>
        </div>
      </section>

      <section className={styles.smartControlSection}>
        <div className={styles.circleLeft}></div>
        <div className={styles.circleRight}></div>
        <div className={styles.lineTop}></div>
        <div className={styles.lineMiddle}></div>
        <div className={styles.lineBottom}></div>

        {/* Text und Button in der Mitte */}
        <div className={styles.smartControlText}>
          <h2>Hol dir die smarte Kontrolle!</h2>
          <button className={styles.smartButton}>Jetzt entdecken</button>
        </div>

        {/* Ladestation (statisch) */}
        <Image
          src="/images/Charger.svg"
          alt="Ladestation"
          className={styles.smartCharger}
          width={200}
          height={400}
        />
      </section>

      <section className={styles.compatibilitySection}>
        <h2>Kompatibilität mit anderen Smart-Home Systemen</h2>

        <div className={styles.compatibilityGrid}>
          {/* Samsung Smart Home */}
          <div className={styles.compatibilityItem}>
            <img
              src="/images/Samsung.svg"
              alt="Samsung Logo"
              className={styles.brandLogo}
            />
            <h3>Samsung Smart Home</h3>
            <p>
              Intelligente Geräte und Innovationen, die Ihr Zuhause vernetzen
              und Ihren Alltag erleichtern. Optimale Lösungen für Unterhaltung,
              Sicherheit und Energieeffizienz.
            </p>
          </div>

          {/* Philips Smart Home */}
          <div className={styles.compatibilityItem}>
            <img
              src="/images/Philips.svg"
              alt="Philips Logo"
              className={styles.brandLogo}
            />
            <h3>Philips Smart Home</h3>
            <p>
              Innovative Beleuchtungssysteme und smarte Gesundheitslösungen für
              ein komfortableres und gesünderes Leben. Technologie, die Ihr
              Zuhause aufwertet.
            </p>
          </div>

          {/* Bosch Smart Home */}
          <div className={styles.compatibilityItem}>
            <img
              src="/images/Bosch.svg"
              alt="Bosch Logo"
              className={styles.brandLogo}
            />
            <h3>Bosch Smart Home</h3>
            <p>
              Modernste Haushaltsgeräte mit smarter Technologie, um Ihren Alltag
              effizienter und nachhaltiger zu gestalten. Qualität und
              Zuverlässigkeit für Ihr Zuhause.
            </p>
          </div>
        </div>
      </section>

      <footer id="contact" className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <img src="/images/Logo switchAI.svg" alt="switch.ai Logo" />
            <span>switch.ai</span>
          </div>
          <div className={styles.footerLine}></div>
          <p className={styles.copyright}>© Gruppe04 DMWT 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

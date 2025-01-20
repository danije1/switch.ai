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
  const [scale, setScale] = useState(1);
  const [hoveredElement, setHoveredElement] = useState(null);

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
          <Link href="#page.js">
            <span className={styles.logo}>switch.ai</span>
          </Link>
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
          <Link href="/contact">
            <button className={styles.ctaButton}>Jetzt anfragen!</button>
          </Link>
        </div>
      </section>
      {/* Information Section */}
      <section id="infos" className={styles.infoSection}>
        <h1>Was ist Smarte Energy und wie hilft KI dabei?</h1>
        <p>
          Smarte Energy kombiniert moderne Technologien und künstliche
          Intelligenz, um Energie effizienter zu nutzen und nachhaltige
          Entscheidungen zu treffen.
        </p>
        <Link href="#solutions">
          <button className={styles.learnMore}>
            Erfahre mehr über unsere KI-Lösungen
          </button>
        </Link>
      </section>
      {/* Roboter Section mit Bewegung */}
      <section className={styles.robotSection}>
        <div className={styles.circleLeft}></div>
        <div className={styles.circleRight}></div>
        <div className={styles.lineTop}></div>
        <div className={styles.lineMiddle}></div>
        <div className={styles.lineBottom}></div>
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
        <div
          className={styles.videoWrapper}
          style={{
            transform: `scale(${scale})`, // Dynamische Skalierung
          }}
        ></div>
        <video
          className={styles.videoElement}
          src="/videos/SwitchAI.mp4"
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
          Entdecke, wie künstliche Intelligenz dein Zuhause effizienter,
          nachhaltiger und kostensparender machen kann – für eine bessere
          Zukunft.
        </p>
        <div className={styles.cardsContainer}>
          {/* Karte 1 */}
          <div className={`${styles.card} ${styles.flippable}`}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <Image
                  src="/images/AI hand mit glühbirne.png"
                  alt="Energie Management"
                  width={326}
                  height={200}
                />
                <div className={styles.cardContent}>
                  <h3>Vorteile der Nutzung von KI im Energiemanagement</h3>
                </div>
              </div>
              <div className={styles.cardBack}>
                <h3>Details</h3>
                <p>
                  KI-basierte Lösungen optimieren den Energieverbrauch, sparen
                  Kosten und schonen die Umwelt.
                </p>
              </div>
            </div>
          </div>

          {/* Karte 2 */}
          <div className={`${styles.card} ${styles.flippable}`}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <Image
                  src="/images/weltkugel natur.png"
                  alt="Nachhaltigkeit"
                  width={326}
                  height={200}
                />
                <div className={styles.cardContent}>
                  <h3>Umweltvorteile und Beitrag zur Nachhaltigkeit</h3>
                </div>
              </div>
              <div className={styles.cardBack}>
                <h3>Details</h3>
                <p>
                  Nachhaltige Energienutzung schützt die Umwelt und reduziert
                  den CO2-Ausstoß nachhaltig.
                </p>
              </div>
            </div>
          </div>

          {/* Karte 3 */}
          <div className={`${styles.card} ${styles.flippable}`}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <Image
                  src="/images/sparen.png"
                  alt="Fördermöglichkeiten"
                  width={326}
                  height={200}
                />
                <div className={styles.cardContent}>
                  <h3>Fördermöglichkeiten und steuerliche Vorteile</h3>
                </div>
              </div>
              <div className={styles.cardBack}>
                <h3>Details</h3>
                <p>
                  Nutzen Sie staatliche Förderprogramme, um Ihre Smart
                  Energy-Projekte zu finanzieren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* KI-Lösungen Section */}
      <section id="solutions" className={styles.kiSolutionsSection}>
        <h1 className={styles.sectionTitle}>Unsere KI-Lösungen</h1>
        <p className={styles.sectionDescription}>
          Wir stellen KI-gestütze Smart Home Lösungen für alle Bereiche Ihres
          Lebens zur Verfügung.
        </p>

        <div className={styles.kiSolutionsGrid}>
          {/* Bild 3 */}
          <div className={styles.kiItem}>
            <Image
              src="/images/AI bild 4.png"
              alt="Mikrochip"
              width={300}
              height={200}
            />
          </div>

          {/* Bild 4 */}
          <div className={styles.kiItem}>
            <Image
              src="/images/AI bild 3.png"
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
          <div
            className={styles.requirementItem}
            onMouseEnter={() => setHoveredElement("Blitz")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <img src="/images/Blitz.svg" alt="Blitz Icon" />
            <p>Stromversorgung</p>
          </div>

          {/* Zweite Box */}
          <div
            className={styles.requirementItem}
            onMouseEnter={() => setHoveredElement("Cloud")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <img src="/images/Wolke.svg" alt="Cloud Icon" />
            <p>Internetverbindung</p>
          </div>

          {/* Dritte Box */}
          <div
            className={styles.requirementItem}
            onMouseEnter={() => setHoveredElement("Code")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <img src="/images/Code.svg" alt="Code Icon" />
            <p>Software-Steuerung</p>
          </div>

          {/* Vierte Box */}
          <div
            className={styles.requirementItem}
            onMouseEnter={() => setHoveredElement("Lock")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <img src="/images/Lock.svg" alt="Lock Icon" />
            <p>Datensicherheit</p>
          </div>
        </div>

        {/* Zentrales Element für den Text */}
        {hoveredElement && (
          <div className={styles.centralElement}>
            {hoveredElement === "Blitz" && (
              <>
                <img src="/images/Blitz.svg" alt="Blitz Icon" />
                <p>
                  Um unsere Services zuverlässig nutzen zu können, ist eine
                  stabile Stromversorgung wichtig.
                </p>
              </>
            )}
            {hoveredElement === "Cloud" && (
              <>
                <img src="/images/Wolke.svg" alt="Cloud Icon" />
                <p>
                  Eine schnelle und stabile Internetverbindung ist für einige
                  Echtzeitfunktionen erforderlich.
                </p>
              </>
            )}
            {hoveredElement === "Code" && (
              <>
                <img src="/images/Code.svg" alt="Code Icon" />
                <p>
                  Kenntnisse im Umgang mit APIs sind hilfreich, um die Services
                  individuell anzupassen.
                </p>
              </>
            )}
            {hoveredElement === "Lock" && (
              <>
                <img src="/images/Lock.svg" alt="Lock Icon" />
                <p>
                  Die Datensicherheit wird gewährleistet, während Sie die
                  interne Sicherheit selbst anpassen können.
                </p>
              </>
            )}
          </div>
        )}
      </section>
      );
      <section className={styles.smartControlSection}>
        <div className={styles.circleLeft}></div>
        <div className={styles.circleRight}></div>
        <div className={styles.lineTop}></div>
        <div className={styles.lineMiddle}></div>
        <div className={styles.lineBottom}></div>

        {/* Text und Button in der Mitte */}
        <div className={styles.smartControlText}>
          <h2>Hol dir die smarte Kontrolle!</h2>
          <Link href="/contact">
            <button className={styles.smartButton}>Jetzt entdecken</button>
          </Link>
        </div>
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
          {/* Ladestation (statisch) */}
          <Image
            src="/images/Charger.svg"
            alt="Ladestation"
            className={styles.smartCharger}
            width={200}
            height={400}
          />
          <div className={styles.footerLogo}>
            <img src="/images/Logo switchAI.svg" alt="switch.ai Logo" />
            <Link href="#page.js">
              <span>switch.ai</span>
            </Link>
          </div>
          <div className={styles.footerLine}></div>
          <p className={styles.copyright}>© Gruppe04 DMWT 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

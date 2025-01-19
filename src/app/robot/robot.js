"use client";
import React, { useState, useEffect, useRef } from "react";

const RobotWithEyes = () => {
  const robotRef = useRef(null);
  const eyeRefs = useRef([useRef(null), useRef(null)]); // Für die Augen
  const pupilRefs = useRef([useRef(null), useRef(null)]); // Für die Pupillen
  const [isHovered, setIsHovered] = useState(false); // Hover-Zustand für den Roboter
  const [tooltipText, setTooltipText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false); // Zustand, ob der Benutzer am unteren Ende ist

  // Array mit den Texten für den Tooltip
  const tooltipTexts = [
    "Willkommen bei switch.ai!",
    "Wir freuen uns auf deine Anfrage!",
    "Gib bei der Infografik deine Verbraucher und qm ein und finde heraus, wie viel du sparen kannst.",
    "Suchst du etwas?",
    "Das kitzelt.",
    "Was kann ich für dich tun?",
    "Schön, dass du da bist.",
    "Wir haben bereits über 7000 Kunden.",
    "Hallo, wie geht's?",
    "Unter Kontakt kannst du uns anschreiben.",
  ];

  // Funktion, um einen zufälligen Text auszuwählen
  const getRandomTooltipText = () => {
    const randomIndex = Math.floor(Math.random() * tooltipTexts.length);
    return tooltipTexts[randomIndex];
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const randomText = getRandomTooltipText();
    console.log("Tooltip Text:", randomText); // Debugging: Zeigt den Text im Konsolen-Log an
    setTooltipText(randomText);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTooltipText(""); // Tooltip Text zurücksetzen, wenn der Hover endet
    console.log("Mouse Left"); // Debugging
  };

  const followMouse = (event) => {
    if (!robotRef.current) return;
    if (isHovered) return;

    const robotRect = robotRef.current.getBoundingClientRect();

    const eyes = [
      {
        centerX: robotRect.left + robotRect.width * 0.35,
        centerY: robotRect.top + robotRect.height * 0.4,
      },
      {
        centerX: robotRect.left + robotRect.width * 0.65,
        centerY: robotRect.top + robotRect.height * 0.4,
      },
    ];

    const eyeRadius = robotRect.width * 0.05; // Augapfelradius (Skalierung basierend auf Roboterbreite)
    const pupilRadius = eyeRadius * 0.4; // Pupillenradius relativ zum Augapfel
    const maxDistance = eyeRadius - pupilRadius; // Maximale Verschiebung der Pupille

    eyes.forEach((eye, index) => {
      const angle = Math.atan2(
        event.clientY - eye.centerY,
        event.clientX - eye.centerX
      );

      const distanceX = Math.cos(angle) * Math.min(maxDistance, eyeRadius);
      const distanceY = Math.sin(angle) * Math.min(maxDistance, eyeRadius);

      pupilRefs.current[
        index
      ].current.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Scroll-Position
      // Sichtbar, sobald von ganz oben weggescrollt wird
      if (scrollPosition > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false); // Wieder unsichtbar, wenn der Scroll-Position wieder auf 0 ist
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      document.addEventListener("mousemove", followMouse);
    } else {
      document.removeEventListener("mousemove", followMouse); // Event-Listener wird beim Hover entfernt
    }

    return () => {
      document.removeEventListener("mousemove", followMouse); // Sicherstellen, dass der Listener auch beim Verlassen entfernt wird
    };
  }, [isHovered]); // Der Effekt reagiert auf Änderungen von `isHovered`

  useEffect(() => {
    // Wenn über den Roboter gehovt wird, setze Pupillen in die Mitte
    if (isHovered) {
      pupilRefs.current.forEach((pupil) => {
        pupil.current.style.transform = "translate(0%, 0%)"; // Pupille zurück in die Mitte setzen
      });
    } else {
      document.addEventListener("mousemove", followMouse);
    }

    return () => {
      document.removeEventListener("mousemove", followMouse);
    };
  }, [isHovered]); // Reagiert auf `isHovered`

  const [yOffset, setYOffset] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const moveRobotUpDown = () => {
      setYOffset((prev) => {
        if (prev >= 10) {
          setDirection(-1);
        } else if (prev <= -10) {
          setDirection(1);
        }
        return prev + direction;
      });
    };

    const interval = setInterval(moveRobotUpDown, 50);
    return () => clearInterval(interval);
  }, [direction]);

  // Funktion, um die Sichtbarkeit der Augen und Münder basierend auf der Scrollposition zu steuern
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const bottomPosition =
        document.documentElement.scrollHeight - window.innerHeight;

      // Überprüfe, ob der Benutzer am unteren Ende der Seite ist
      if (scrollPosition === bottomPosition) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }

      const triggerHeight = window.innerHeight / 1; // Auslöser bei halber Fensterhöhe
      if (scrollPosition > 0) {
        setIsVisible(true); // Sichtbar, sobald von ganz oben weggescrollt wird
      } else {
        setIsVisible(false); // Wieder unsichtbar, wenn ganz oben
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        ref={robotRef}
        className={`robotContainer ${isVisible ? "visible" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "fixed",
          right: "20px",
          bottom: isVisible ? "20px" : "-200px", // Sichtbarkeit steuern
          transform: `translateX(-50%) translateY(${yOffset}px)`,
          zIndex: 9999,
          width: "200px",
          height: "200px",
          transition: "bottom 0.5s ease-in-out", // Hinzufügen für Ein-/Ausblenden
        }}
      >
        <img
          src="/robot.svg"
          alt="Roboter"
          style={{
            width: "100%",
            height: "100%",
          }}
        />

        {/* Tooltip Anzeige */}
        {isHovered && tooltipText && (
          <div
            style={{
              position: "absolute",
              bottom: "87%", // Position des Tooltips
              left: "52.5%",
              transform: "translateX(-50%)",
              backgroundColor: "rgb(255, 255, 255)",
              color: "black",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "16px",
              zIndex: 10000, // Tooltip über alles anzeigen
            }}
          >
            {tooltipText}
            {/* Dreieck für die Sprechblase */}
            <div
              style={{
                position: "absolute",
                bottom: "-8px", // Platzierung des Dreiecks
                left: "50%",
                transform: "translateX(-50%)", // Zentriert das Dreieck
                width: "0",
                height: "0",
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "10px solid rgb(255, 255, 255)", // Farbe des Dreiecks
              }}
            />
          </div>
        )}

        {/* Auge 1 */}
        <div
          ref={eyeRefs.current[0]}
          style={{
            position: "absolute",
            top: "30%",
            left: "42%",
            width: "8%",
            height: "8%",
            backgroundColor: "white",
            borderRadius: "50%",
            overflow: "hidden",
            display: !isAtBottom || isHovered ? "block" : "none",
          }}
        >
          {/* Schatten 1 Auge 1 (Bananenform) */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "80%",
              width: "30%",
              height: "100%",
              backgroundColor: "lightgray",
              borderRadius: "50% 50% 70% 70%",
              transform: "rotate(-20deg)",
            }}
          ></div>

          {/* Schatten 2 Auge 1 (Bananenform) */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "80%",
              width: "30%",
              height: "100%",
              backgroundColor: "lightgray",
              borderRadius: "50% 50% 70% 70%",
              transform: "rotate(20deg)",
            }}
          ></div>

          {/* Pupille 1 */}
          <div
            ref={pupilRefs.current[0]}
            style={{
              position: "absolute",
              top: "30%",
              left: "30%",
              width: "40%",
              height: "40%",
              backgroundColor: "black",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>

        {/* Auge 2 */}
        <div
          ref={eyeRefs.current[1]}
          style={{
            position: "absolute",
            top: "30%",
            left: "55%",
            width: "8%",
            height: "8%",
            backgroundColor: "white",
            borderRadius: "50%",
            overflow: "hidden",
            display: !isAtBottom || isHovered ? "block" : "none",
          }}
        >
          {/* Schatten 1 Auge 2 (Bananenform) */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "80%",
              width: "30%",
              height: "100%",
              backgroundColor: "lightgray",
              borderRadius: "50% 50% 70% 70%",
              transform: "rotate(-20deg)",
            }}
          ></div>

          {/* Schatten 2 Auge 2 (Bananenform) */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "80%",
              width: "30%",
              height: "100%",
              backgroundColor: "lightgray",
              borderRadius: "50% 50% 70% 70%",
              transform: "rotate(20deg)",
            }}
          ></div>

          {/* Pupille 2 */}
          <div
            ref={pupilRefs.current[1]}
            style={{
              position: "absolute",
              top: "30%",
              left: "30%",
              width: "40%",
              height: "40%",
              backgroundColor: "black",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>

        {/* GIF - Talking Mouth */}
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "52.5%",
            transform: "translate(-50%, -50%)",
            display: isHovered ? "block" : "none",
            width: "30px",
            height: "30px",
          }}
        >
          <img
            src="/images/talking_mouth.gif"
            alt="Talking Mouth"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* GIF - Mouth */}
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "52.5%",
            transform: "translate(-50%, -50%)",
            display: !isHovered && !isAtBottom ? "block" : "none", // Display only when not hovered
            width: "30px",
            height: "30px",
          }}
        >
          <img
            src="/images/mouth.gif" // Path to your GIF
            alt="Talking Mouth"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        {/* Weiße Rechtecke für Augen */}
        <div
          ref={eyeRefs.current[0]}
          style={{
            position: "absolute",
            top: "35%",
            left: "43%",
            width: "7%",
            height: "1%",
            backgroundColor: "gray",
            borderRadius: "50%",
            overflow: "hidden",
            display: isAtBottom && !isHovered ? "block" : "none", // Sichtbar, wenn das Ende der Seite erreicht ist
          }}
        ></div>
        <div
          ref={eyeRefs.current[1]}
          style={{
            position: "absolute",
            top: "35%",
            left: "55%",
            width: "7%",
            height: "1%",
            backgroundColor: "gray",
            borderRadius: "50%",
            overflow: "hidden",
            display: isAtBottom && !isHovered ? "block" : "none", // Sichtbar, wenn das Ende der Seite erreicht ist
          }}
        ></div>

        {/* Weiße Rechtecke für Mund */}
        <div
          style={{
            position: "absolute",
            top: "41%",
            left: "52.5%",
            width: "20px",
            height: "2px",
            backgroundColor: "gray",
            transform: "translateX(-50%)",
            display: isAtBottom && !isHovered ? "block" : "none", // Sichtbar, wenn das Ende der Seite erreicht ist
          }}
        ></div>
      </div>
    </div>
  );
};

export default RobotWithEyes;

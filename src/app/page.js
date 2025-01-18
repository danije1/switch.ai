"use client";
import React, { useState, useEffect, useRef } from "react";

const RobotWithEyes = () => {
  const robotRef = useRef(null);
  const eyeRefs = useRef([useRef(null), useRef(null)]); // Für die Augen
  const pupilRefs = useRef([useRef(null), useRef(null)]); // Für die Pupillen

  // Funktion, um die Pupillen zu bewegen
  const followMouse = (event) => {
    if (!robotRef.current) return;

    const robotRect = robotRef.current.getBoundingClientRect();

    // Augenzentren relativ zum Roboter
    const eyes = [
      {
        centerX: robotRect.left + robotRect.width * 0.35,
        centerY: robotRect.top + robotRect.height * 0.4,
      }, // Linkes Auge
      {
        centerX: robotRect.left + robotRect.width * 0.65,
        centerY: robotRect.top + robotRect.height * 0.4,
      }, // Rechtes Auge
    ];

    const eyeRadius = robotRect.width * 0.05; // Augapfelradius (Skalierung basierend auf Roboterbreite)
    const pupilRadius = eyeRadius * 0.4; // Pupillenradius relativ zum Augapfel
    const maxDistance = eyeRadius - pupilRadius; // Maximale Verschiebung der Pupille

    eyes.forEach((eye, index) => {
      const angle = Math.atan2(
        event.clientY - eye.centerY,
        event.clientX - eye.centerX
      );

      // Begrenze die Bewegung der Pupillen
      const distanceX = Math.cos(angle) * Math.min(maxDistance, eyeRadius);
      const distanceY = Math.sin(angle) * Math.min(maxDistance, eyeRadius);

      pupilRefs.current[
        index
      ].current.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    });
  };

  // Event listener für den Mauszeiger
  useEffect(() => {
    document.addEventListener("mousemove", followMouse);

    return () => {
      document.removeEventListener("mousemove", followMouse);
    };
  }, []);

  // Funktion für die Schwebebewegung
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

    const interval = setInterval(moveRobotUpDown, 50); // Alle 50ms up and down bewegen
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      ref={robotRef}
      style={{
        position: "absolute",
        left: "50%",
        bottom: "20px",
        transform: `translateX(-50%) translateY(${yOffset}px)`,
        width: "200px", // Robotergröße (anpassbar)
        height: "200px", // Robotergröße (anpassbar)
      }}
    >
      <img
        src="/robot.svg"
        alt="Robot"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      {/* Auge 1 */}
      <div
        ref={eyeRefs.current[0]}
        style={{
          position: "absolute",
          top: "30%", // Position relativ zum Roboter
          left: "35%",
          width: "10%", // Größe relativ zum Roboter
          height: "10%",
          backgroundColor: "white",
          borderRadius: "50%",
          overflow: "hidden", // Verhindert, dass die Pupille über den Augapfel hinausgeht
        }}
      >
        {/* Pupille 1 */}
        <div
          ref={pupilRefs.current[0]}
          style={{
            position: "absolute",
            top: "30%", // Start in der Mitte des Augapfels
            left: "30%",
            width: "40%", // Größe der Pupille relativ zum Augapfel
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
          top: "30%", // Position relativ zum Roboter
          left: "60%",
          width: "10%", // Größe relativ zum Roboter
          height: "10%",
          backgroundColor: "white",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        {/* Pupille 2 */}
        <div
          ref={pupilRefs.current[1]}
          style={{
            position: "absolute",
            top: "30%", // Start in der Mitte des Augapfels
            left: "30%",
            width: "40%", // Größe der Pupille relativ zum Augapfel
            height: "40%",
            backgroundColor: "black",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default RobotWithEyes;

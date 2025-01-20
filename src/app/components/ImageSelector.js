import React, { useState, useEffect } from "react";
import Image from "next/image";

const ImageSelector = () => {
  const [counts, setCounts] = useState(Array(10).fill(0)); // Zähler für jedes Gerät
  const [squareMeters, setSquareMeters] = useState(""); // Quadratmeter
  const [calculatedSavings, setCalculatedSavings] = useState({}); // Berechnete Einsparungen für jedes Gerät
  const [hoveredDevice, setHoveredDevice] = useState(null); // Für Hover-Interaktion

  const [devicePositions, setDevicePositions] = useState({
    1: { top: 34.8, left: 33.5 },
    2: { top: 42.5, left: 68.8 },
    3: { top: 37, left: 49 },
    4: { top: 57.8, left: 12.5 },
    5: { top: 46.75, left: 17.5 },
    6: { top: 23.5, left: 49.5 },
    7: { top: 50.85, left: 39.8 },
    8: { top: 52.5, left: 25.6 },
    9: { top: 70.3, left: 58.5 },
    10: { top: 79.27, left: 41 },
  });

  const devices = [
    {
      id: 1,
      name: "Bad",
      baseValue: 10,
      img: "/bad.png",
      savingsPercent: 5,
      size: { width: 70, height: 70 },
    },
    {
      id: 2,
      name: "Garage",
      baseValue: 15,
      img: "/garage.png",
      savingsPercent: 8,
      size: { width: 188, height: 175 },
    },
    {
      id: 3,
      name: "Heizung",
      baseValue: 5,
      img: "/heizung.png",
      savingsPercent: 3,
      size: { width: 45, height: 45 },
    },
    {
      id: 4,
      name: "Herd",
      baseValue: 7,
      img: "/herd1.png",
      savingsPercent: 4,
      size: { width: 60, height: 60 },
    },
    {
      id: 5,
      name: "Kühlschrank",
      baseValue: 2,
      img: "/kuhlschrank.png",
      savingsPercent: 2,
      size: { width: 125, height: 125 },
    },
    {
      id: 6,
      name: "Lampe",
      baseValue: 12,
      img: "/lampe1.png",
      savingsPercent: 6,
      size: { width: 40, height: 40 },
    },
    {
      id: 7,
      name: "PC",
      baseValue: 10,
      img: "/pc.png",
      savingsPercent: 5,
      size: { width: 65, height: 65 },
    },
    {
      id: 8,
      name: "TV",
      baseValue: 6,
      img: "/tv.png",
      savingsPercent: 4,
      size: { width: 60, height: 60 },
    },
    {
      id: 9,
      name: "Wärmepumpe",
      baseValue: 8,
      img: "/Wärmepumpe.png",
      savingsPercent: 3,
      size: { width: 97, height: 97 },
    },
    {
      id: 10,
      name: "Waschmaschine",
      baseValue: 10,
      img: "/ws.png",
      savingsPercent: 5,
      size: { width: 50, height: 50 },
    },
  ];

  useEffect(() => {
    if (squareMeters > 0) {
      const updatedSavings = devices.reduce((acc, device) => {
        const count = counts[device.id - 1];
        if (count > 0) {
          const adjustedSavings = calculateDeviceSavings(
            device.savingsPercent,
            count
          );
          acc[device.id] = (adjustedSavings * squareMeters) / 100;
        }
        return acc;
      }, {});
      setCalculatedSavings(updatedSavings);
    } else {
      setCalculatedSavings({});
    }
  }, [counts, squareMeters]);

  const calculateDeviceSavings = (savingsPercent, count) => {
    return savingsPercent + count * 0.5; // Leicht steigende Einsparung mit Geräteanzahl
  };

  const handleDeviceChange = (index, action) => {
    const newCounts = [...counts];
    if (action === "increment") {
      newCounts[index]++;
    } else if (action === "decrement" && newCounts[index] > 0) {
      newCounts[index]--;
    }
    setCounts(newCounts);
  };

  const handleSquareMetersChange = (value) => {
    const numericValue = Math.max(0, Number(value)); // Verhindert negative Werte
    setSquareMeters(numericValue);
  };

  const handleReset = () => {
    setCounts(Array(10).fill(0));
    setSquareMeters("");
    setCalculatedSavings({});
    setHoveredDevice(null);
  };

  const getHoverMessage = (device) => {
    if (!squareMeters) {
      return (
        <div
          style={{
            fontSize: "clamp(0.8rem, 1vw, 1.1rem)",
            color: "red",
            marginTop: "10px",
            position: "absolute",
            bottom: "-20px",
            width: "100%",
            textAlign: "center",
          }}
        >
          Wohnfläche eingeben
        </div>
      );
    }
    if (counts[device.id - 1] > 0 && calculatedSavings[device.id]) {
      return (
        <div
          style={{
            fontSize: "clamp(0.8rem, 1vw, 1.1rem)",
            color: "#28a745",
            marginTop: "10px",
            position: "absolute",
            bottom: "-20px",
            width: "150%",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "5px",
            padding: "2px 5px",
            zIndex: 9999, // Hält den Text in der obersten Ebene
          }}
        >
          {calculatedSavings[device.id].toFixed(2)}% Einsparung
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(35deg, #192350, #0A1232)",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {/* Der Container für das Hintergrundbild und Geräte */}
        <div
          style={{ flex: "1 1 80%", paddingRight: "20px", minWidth: "300px" }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "60vh",
              backgroundImage: "url(/bg.webp)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            {devices.map((device) => (
              <div
                key={device.id}
                style={{
                  position: "absolute",
                  top: `${devicePositions[device.id].top}%`,
                  left: `${devicePositions[device.id].left}%`,
                  border:
                    counts[device.id - 1] > 0 && calculatedSavings[device.id]
                      ? "4px solid #9DFF00"
                      : counts[device.id - 1] > 0
                      ? "4px solid gray"
                      : "",
                  padding: "5px",
                  color: "#9DFF00",
                  opacity: 1,
                  borderRadius: "8px",
                  textAlign: "center",
                }}
                onMouseEnter={() => setHoveredDevice(device.id)}
                onMouseLeave={() => setHoveredDevice(null)}
              >
                <Image
                  src={device.img}
                  alt={device.name}
                  width={device.size.width}
                  height={device.size.height}
                  style={{ objectFit: "contain" }}
                />
                {hoveredDevice === device.id && counts[device.id - 1] > 0 && (
                  <div
                    style={{
                      fontSize: "clamp(0.8rem, 1vw, 1rem)",
                      color: "#28a745",
                      marginTop: "10px",
                      position: "absolute",
                      bottom: "-20px",
                      width: "100%",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "5px",
                      padding: "2px 5px",
                      zIndex: 9999, // Hält den Text in der obersten Ebene
                    }}
                  >
                    {getHoverMessage(device)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Der Container für die Geräteliste */}
        <div
          style={{
            flex: "1 1 35%",
            padding: "20px",
            border: "2px solid #28a745",
            borderRadius: "8px",
            background: "linear-gradient(35deg, #192350, #0A1232)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "300px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            {devices.map((device, index) => (
              <div
                key={device.id}
                style={{
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {device.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => handleDeviceChange(index, "decrement")}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#0A6AC0",
                        border: "none",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <div>{counts[index]}</div>
                    <button
                      onClick={() => handleDeviceChange(index, "increment")}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#0A6AC0",
                        border: "none",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <label
              htmlFor="squareMeters"
              style={{ display: "block", fontSize: "clamp(0.9rem, 1vw, 1rem)" }}
            >
              Wohnfläche in qm :
            </label>
            <input
              type="number"
              id="squareMeters"
              name="squareMeters"
              value={squareMeters}
              onChange={(e) => setSquareMeters(e.target.value)}
              min="0"
              style={{
                padding: "10px",
                fontSize: "clamp(0.9rem, 1vw, 1rem)",

                width: "100%",
                borderRadius: "5px",
                border: "2px solid #28a745",
                color: "black",
                backgroundColor: "white",
              }}
            />
          </div>
          <button
            onClick={handleReset}
            style={{
              padding: "12px",
              backgroundColor: "#0A6AC0",
              color: "white",
              fontSize: "clamp(0.9rem, 1vw, 1rem)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;

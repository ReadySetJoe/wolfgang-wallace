import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { isHeistCompleted } from "../utils/heistStatus";
import { EyePlacements } from "../utils/eyePlacements";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiCode() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const [showKonamiEye, setShowKonamiEye] = useState(false);

  useEffect(() => {
    setIsUnlocked(isHeistCompleted());
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isUnlocked) return;

      const key = event.key.toLowerCase();
      const mappedKey = event.key.startsWith("Arrow") ? event.key : key;

      setInputSequence((prev) => {
        const newSequence = [...prev, mappedKey];

        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }

        if (newSequence.join(",") === KONAMI_CODE.join(",")) {
          setIsActivated(true);

          const style = document.createElement("style");
          style.id = "konami-style";
          style.innerHTML = `
          img, video, svg, picture {
            filter: invert(1) !important;
          }
          @keyframes pulse {
            0% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.5; transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        `;
          document.head.appendChild(style);
          document.body.classList.add("konami-active");

          // Show the Konami eye using React state
          setShowKonamiEye(true);

          return [];
        }

        return newSequence;
      });
    },
    [isUnlocked]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      const existingStyle = document.getElementById("konami-style");
      if (existingStyle) {
        existingStyle.remove();
      }
      document.body.classList.remove("konami-active");
      setShowKonamiEye(false);
    };
  }, [handleKeyPress]);

  return (
    <>
      {showKonamiEye && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            fontSize: '50px',
            animation: 'fadeIn 2s',
          }}
        >
          {EyePlacements.KonamiReward()}
        </div>,
        document.body
      )}
    </>
  );
}

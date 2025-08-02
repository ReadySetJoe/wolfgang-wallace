import { useState, useEffect } from "react";
import styles from "../../styles/mystery.module.css";
import { EyePlacements } from "../../utils/eyePlacements";
import Page from "../../components/Page";

const SECRET_KEYS = ["n", "o", "t", "h", "i", "n", "g"];

export default function Mystery() {
  const [secretKeyNdx, setSecretKeyNdx] = useState(0);
  const [phase, setPhase] = useState<"initial" | "void" | "revealed">(
    "initial"
  );
  const [voidClicks, setVoidClicks] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showEyes, setShowEyes] = useState(false);
  const [eyeOpacity, setEyeOpacity] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // After 15 seconds in the void, show a subtle hint
    if (phase === "void") {
      // After 15 seconds, start showing eyes
      const eyeTimer = setTimeout(() => setShowEyes(true), 15000);
      return () => {
        clearTimeout(eyeTimer);
      };
    }
  }, [phase]);

  // Calculate eye opacity based on cursor proximity
  useEffect(() => {
    if (phase === "void") {
      // Get viewport dimensions
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Eyes are positioned 50px from bottom-right
      const eyeX = vw - 50;
      const eyeY = vh - 50;

      const distance = Math.sqrt(
        Math.pow(mousePosition.x - eyeX, 2) +
          Math.pow(mousePosition.y - eyeY, 2)
      );

      // Opacity increases as cursor gets closer (max distance 150px)
      const proximity = Math.max(0, 1 - distance / 150);

      if (showEyes) {
        // After 30 seconds, eyes slowly fade in regardless of cursor
        setEyeOpacity(Math.max(proximity, 0.3));
      } else {
        setEyeOpacity(proximity);
      }
    }
  }, [mousePosition, phase, showEyes]);

  const handleKeyPress = (e: any) => {
    if (phase !== "initial") return;

    if (e.key === SECRET_KEYS[secretKeyNdx]) {
      setSecretKeyNdx(secretKeyNdx + 1);
    } else {
      setSecretKeyNdx(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (phase !== "initial") return;

    const value = e.target.value.toLowerCase();
    setInputValue(value);

    // Check if the current character matches the expected sequence
    if (value.length > 0) {
      const lastChar = value[value.length - 1];
      if (lastChar === SECRET_KEYS[secretKeyNdx]) {
        setSecretKeyNdx(secretKeyNdx + 1);
      } else {
        setSecretKeyNdx(0);
      }
    } else {
      setSecretKeyNdx(0);
    }

    // Also check if they've typed the complete word
    if (value.includes("nothing")) {
      setSecretKeyNdx(SECRET_KEYS.length);
    }
  };

  useEffect(() => {
    if (secretKeyNdx === SECRET_KEYS.length) {
      setTimeout(() => setPhase("void"), 5000);
    }
  }, [secretKeyNdx]);

  const handleVoidClick = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e && e.touches.length > 0) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Hidden clickable area in the bottom-right corner (The Dark Specter's eyes)
    // Make the clickable area smaller on mobile to prevent accidental clicks
    const clickAreaSize = window.innerWidth <= 768 ? 100 : 150;
    if (x > rect.width - clickAreaSize && y > rect.height - clickAreaSize) {
      setVoidClicks(voidClicks + 1);

      // Require 5 clicks to reveal instead of 3
      if (voidClicks >= 4) {
        setPhase("revealed");
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e && e.touches.length > 0) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    setMousePosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  if (phase === "void") {
    return (
      <div
        className={styles.voidContainer}
        onClick={handleVoidClick}
        onTouchEnd={handleVoidClick}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {/* Cursor bloom effect */}
        <div
          className={styles.cursorBloom}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />

        <div className={`${styles.voidText} ${styles.fadeInSlow}`}>
          bienvenue dans le vide
          <br />
          (welcome to the void)
        </div>
        <div className={`${styles.voidHint} ${styles.fadeInDelayed}`}>
          The Dark Specter watches from the shadows...
        </div>
        <div
          className={styles.eyes}
          style={{
            opacity: eyeOpacity,
            transform: `scale(${1 + voidClicks * 0.3})`,
          }}
        >
          <div className={styles.eye} />
          <div className={styles.eye} />
        </div>
        {voidClicks > 0 && (
          <div className={styles.clickFeedback}>
            {voidClicks === 1 && "The eyes stir..."}
            {voidClicks === 2 && "They grow more aware..."}
            {voidClicks === 3 && "The gaze intensifies..."}
            {voidClicks === 4 && "One more..."}
          </div>
        )}
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          {EyePlacements.MysteryClue()}
        </div>
      </div>
    );
  }

  if (phase === "revealed") {
    return (
      <Page>
        <div className={styles.revealedContainer}>
          <h1 className={styles.fadeIn}>
            Act I - The Long Con {EyePlacements.MysteryReveal()}
          </h1>
          <p className={`${styles.typewriter} ${styles.fadeInDelayed}`}>
            You've found The Dark Specter's eye. But this is just the beginning.
          </p>
          <div className={`${styles.riddleBox} ${styles.fadeInSlow}`}>
            <p>To proceed deeper into the void, solve this riddle:</p>
            <blockquote>
              "In our song of deception, two names dance as one.
              <br />
              ______ and ______, a tale of the undone.
              <br />
              For the path to a new page, take a quick slash,
              <br />
              Then add your two names, conjoined with a dash."
              <br />
              <span style={{ marginLeft: "10px" }}>
                {EyePlacements.MysteryPuzzle()}
              </span>
            </blockquote>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className={styles.initialContainer}>
        <p className={styles.fadeIn}>
          What is in the box below? {EyePlacements.MysteryIntro()}
        </p>
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className={styles.mysteryInput}
          placeholder=""
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          style={{
            color: "black",
            border: "1px solid white",
          }}
        />
        {secretKeyNdx === SECRET_KEYS.length && (
          <h1 className={styles.fadeIn}>Very good, let's continue...</h1>
        )}
      </div>
    </Page>
  );
}

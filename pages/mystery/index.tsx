import { useState, useEffect } from "react";
import Page from "../../components/page";
import styles from "../../styles/mystery.module.css";

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

  useEffect(() => {
    if (secretKeyNdx === SECRET_KEYS.length) {
      setTimeout(() => setPhase("void"), 5000);
    }
  }, [secretKeyNdx]);

  const handleVoidClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Hidden clickable area in the bottom-right corner (The Dark Specter's eyes)
    if (x > rect.width - 150 && y > rect.height - 150) {
      setVoidClicks(voidClicks + 1);

      if (voidClicks >= 2) {
        setPhase("revealed");
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (phase === "void") {
    return (
      <div
        className={styles.voidContainer}
        onClick={handleVoidClick}
        onMouseMove={handleMouseMove}
      >
        {/* Cursor bloom effect */}
        <div
          className={styles.cursorBloom}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />

        <div className={styles.voidText}>bienvenue dans le vide</div>
        <div className={styles.voidHint}>
          The Dark Specter watches from the shadows...
        </div>
        <div className={styles.eyes} style={{ opacity: eyeOpacity }}>
          <div className={styles.eye} />
          <div className={styles.eye} />
        </div>
        {voidClicks > 0 && (
          <div className={styles.clickFeedback}>
            {voidClicks === 1 ? "The eyes flicker..." : "Almost there..."}
          </div>
        )}
      </div>
    );
  }

  if (phase === "revealed") {
    return (
      <Page>
        <div className={styles.revealedContainer}>
          <h1>Act I - The Long Con</h1>
          <p className={styles.typewriter}>
            You've found The Dark Specter's eye. But this is just the beginning.
          </p>
          <div className={styles.riddleBox}>
            <p>To proceed deeper into the void, solve this riddle:</p>
            <blockquote>
              "In our song of deception, two names dance as one.
              <br />
              ______ and ______, a tale of the undone.
              <br />
              To find the path to a new page, add a dash in between,
              <br />
              To discover the truth that lies unseen."
            </blockquote>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className={styles.initialContainer}>
        <p>What is in the box below?</p>
        <input
          value={""}
          onKeyDown={handleKeyPress}
          className={styles.mysteryInput}
          placeholder="..."
        />
        {secretKeyNdx === SECRET_KEYS.length && (
          <h1 className={styles.fadeIn}>Very good, let's continue...</h1>
        )}
      </div>
    </Page>
  );
}

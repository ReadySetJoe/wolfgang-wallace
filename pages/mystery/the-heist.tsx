import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/heist.module.css";
import logoImg from "../../images/ww-logo.png";
import Link from "next/link";

type HeistPhase =
  | "arrival"
  | "security"
  | "vault"
  | "cracking"
  | "revealed"
  | "escape"
  | "complete";

export default function TheHeist() {
  const router = useRouter();
  const [phase, setPhase] = useState<HeistPhase>("arrival");
  const [securityCode, setSecurityCode] = useState("");
  const [vaultCombination, setVaultCombination] = useState([0, 0, 0, 0]);
  const [currentDialIndex, setCurrentDialIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [dramaticReveal, setDramaticReveal] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // The secret vault combination based on Wolfgang Wallace's Instagram debut
  // September 2nd - the day we introduced ourselves to the world: 0902
  const VAULT_CODE = [0, 9, 0, 2];

  // Security codes based on band member names
  const SECURITY_CODES = [
    "WA11Y",
    "W411Y",
    "J0E",
    "J03",
    "DARKSPECTER69",
    "AUST1N",
    "4UST1N",
    "DRUMM3R",
  ];

  useEffect(() => {
    // Start countdown timer when vault phase begins
    if (phase === "vault" || phase === "cracking") {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setAlarmTriggered(true);
            setPhase("escape");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [phase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (SECURITY_CODES.includes(securityCode.toUpperCase())) {
      setPhase("vault");
      setSecurityCode("");
    } else {
      setAttempts(attempts + 1);
      setSecurityCode("");

      if (attempts >= 2) {
        setTimeout(() => {
          setAlarmTriggered(true);
          setPhase("escape");
        }, 2000);
      }
    }
  };

  const rotateDial = (direction: "left" | "right") => {
    if (currentDialIndex >= 4) return;

    const newCombination = [...vaultCombination];
    if (direction === "right") {
      newCombination[currentDialIndex] =
        (newCombination[currentDialIndex] + 1) % 10;
    } else {
      newCombination[currentDialIndex] =
        (newCombination[currentDialIndex] - 1 + 10) % 10;
    }
    setVaultCombination(newCombination);
  };

  const submitCombination = () => {
    const userCode = vaultCombination.slice(0, 4);
    if (JSON.stringify(userCode) === JSON.stringify(VAULT_CODE)) {
      setPhase("cracking");
      setTimeout(() => {
        setDramaticReveal(true);
        setTimeout(() => {
          setPhase("revealed");
          // Set completion cookie with 1 year expiration
          const expirationDate = new Date();
          expirationDate.setFullYear(expirationDate.getFullYear() + 1);
          document.cookie = `heist_completed=true; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;

          // Also store completion timestamp
          const completionTime = new Date().toISOString();
          document.cookie = `heist_completion_time=${completionTime}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
        }, 3000);
      }, 2000);
    } else {
      setAttempts(attempts + 1);
      // Add dramatic shake animation on wrong code
      const vault = document.querySelector(`.${styles.vaultContainer}`);
      vault?.classList.add(styles.shake);
      setTimeout(() => vault?.classList.remove(styles.shake), 1000);

      if (attempts >= 4) {
        setAlarmTriggered(true);
        setPhase("escape");
      }
    }
  };

  const nextDial = () => {
    if (currentDialIndex < 3) {
      setCurrentDialIndex(currentDialIndex + 1);
    }
  };

  const prevDial = () => {
    if (currentDialIndex > 0) {
      setCurrentDialIndex(currentDialIndex - 1);
    }
  };

  // Phase-specific rendering
  if (phase === "arrival") {
    return (
      <div className={styles.heistContainer}>
        <div className={styles.arrivalScene}>
          <div className={styles.cityscape}>
            <div className={styles.building1}></div>
            <div className={styles.building2}></div>
            <div className={styles.building3}></div>
            <div className={styles.bankBuilding}>
              <div className={styles.bankSign}>FIRST NATIONAL</div>
              <div className={styles.bankDoors}></div>
            </div>
          </div>

          <div className={styles.narrative}>
            <h1 className={`${styles.heistTitle} ${styles.fadeIn}`}>
              THE HEIST
            </h1>
            <div className={`${styles.typewriter} ${styles.fadeInDelayed}`}>
              <p>The bank stands before you...</p>
              <p>The Dark Specter's final con begins now.</p>
              <p>You have one chance. Make it count.</p>
            </div>

            <button
              className={`${styles.enterButton} ${styles.fadeInSlow}`}
              onClick={() => setPhase("security")}
            >
              ENTER THE BANK
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "security") {
    return (
      <div className={styles.heistContainer}>
        <div className={styles.securityRoom}>
          <div className={`${styles.securityPanel} ${styles.fadeIn}`}>
            <div className={styles.screenGlow}>
              <div className={styles.securityScreen}>
                <div className={styles.scanLines}></div>
                <div className={styles.securityText}>
                  <p>SECURITY CHECKPOINT</p>
                  <p className={styles.securityText}>
                    ENTER PERSONALIZED AUTHORIZATION CODE
                  </p>
                  <p className={styles.securityText}>
                    (THIS IS UNIQUE TO YOU AS A MEMBER OF WOLFGANG WALLACE)
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSecuritySubmit} className={styles.codeForm}>
              <input
                type="password"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className={styles.securityInput}
                placeholder="ACCESS CODE"
                maxLength={10}
                autoFocus
              />
              <button type="submit" className={styles.authButton}>
                AUTHORIZE
              </button>
            </form>

            {attempts > 0 && (
              <div className={styles.securityWarning}>
                <p className={styles.redText}>
                  ⚠️ INVALID CODE - ATTEMPT {attempts}/3
                </p>
                {attempts >= 2 && (
                  <p className={styles.flashingRed}>
                    FINAL WARNING - LOCKDOWN IMMINENT
                  </p>
                )}
              </div>
            )}
          </div>

          <div className={styles.securityCameras}>
            <div className={styles.camera}></div>
            <div className={styles.camera}></div>
            <div className={styles.camera}></div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "vault" || phase === "cracking") {
    return (
      <div className={styles.heistContainer}>
        <div className={styles.vaultRoom}>
          <div className={styles.timerDisplay}>
            <span
              className={
                timeRemaining < 60 ? styles.criticalTime : styles.normalTime
              }
            >
              {formatTime(timeRemaining)}
            </span>
          </div>

          <div
            className={`${styles.vaultContainer} ${
              dramaticReveal ? styles.opening : ""
            }`}
          >
            <div className={styles.vaultDoor}>
              <div className={styles.vaultPlaque}>
                "When did we first reveal ourselves?"
              </div>

              <div className={styles.vaultWheel}>
                <div className={styles.dialContainer}>
                  {vaultCombination.map((num, index) => (
                    <div
                      key={index}
                      className={`${styles.dial} ${
                        currentDialIndex === index ? styles.activeDial : ""
                      }`}
                    >
                      <div className={styles.dialNumber}>{num}</div>
                      <div
                        className={styles.dialTicks}
                        style={{
                          transform: `rotate(${-num * 36}deg)`,
                          transition: "transform 0.3s ease-in-out",
                        }}
                      >
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={styles.tick}
                            style={{
                              transform: `rotate(${i * 36}deg)`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.vaultControls}>
                <button
                  className={styles.dialButton}
                  onClick={() => rotateDial("left")}
                  disabled={phase === "cracking"}
                >
                  ← LEFT
                </button>
                <button
                  className={styles.dialButton}
                  onClick={() => rotateDial("right")}
                  disabled={phase === "cracking"}
                >
                  RIGHT →
                </button>
              </div>

              <div className={styles.dialNavigation}>
                <button
                  className={styles.navButton}
                  onClick={prevDial}
                  disabled={currentDialIndex === 0 || phase === "cracking"}
                >
                  ← PREV
                </button>
                <span className={styles.dialIndicator}>
                  DIAL {currentDialIndex + 1}/4
                </span>
                <button
                  className={styles.navButton}
                  onClick={nextDial}
                  disabled={currentDialIndex === 3 || phase === "cracking"}
                >
                  NEXT →
                </button>
              </div>

              <button
                className={styles.submitButton}
                onClick={submitCombination}
                disabled={phase === "cracking"}
              >
                {phase === "cracking" ? "CRACKING..." : "SUBMIT CODE"}
              </button>
            </div>

            {phase === "cracking" && (
              <div className={styles.crackingAnimation}>
                <div className={styles.sparkles}>✨ ✨ ✨</div>
                <div className={styles.crackingText}>
                  VAULT MECHANISMS DISENGAGING...
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
              </div>
            )}
          </div>

          {attempts > 0 && phase === "vault" && (
            <div className={styles.vaultWarning}>
              <p>⚠️ INCORRECT COMBINATION - {attempts} FAILED ATTEMPTS</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === "revealed") {
    return (
      <div className={`${styles.heistContainer} ${styles.revealed}`}>
        <div className={styles.revealScene}>
          <div className={styles.completion}>
            <h1 className={`${styles.completionTitle} ${styles.fadeIn}`}>
              HEIST COMPLETE
            </h1>
            <p className={`${styles.completionText} ${styles.fadeInDelayed}`}>
              You've uncovered the truth. Well done.
              <br />
              The Dark Specter's identity is now revealed.
            </p>

            <div className={styles.openVault}>
              <div className={styles.vaultInterior}>
                <div className={styles.treasureGlow}>
                  <div className={styles.secretDocument}>
                    <h2>THE DARK SPECTER'S TRUE IDENTITY</h2>
                    <Image
                      src={logoImg}
                      alt="Wolfgang Wallace Logo"
                      width={300}
                      height={300}
                    />
                    <div className={styles.documentContent}>
                      <p>CLASSIFIED DOSSIER #001</p>
                      <p>
                        SUBJECT: <br />
                        "THE DARK SPECTER"
                      </p>
                      <hr />
                      <p>
                        REAL NAME:
                        <br /> [REDACTED]
                      </p>
                      <a
                        href="https://youtu.be/8omIMPDNc5o"
                        style={{ textDecoration: "underline" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        SUSPECTED ORIGIN VIDEO
                      </a>
                      <p>
                        STATUS: <br />
                        Still watching from the shadows...
                      </p>
                      <p className={styles.finalMessage}>
                        Thank you for playing our little game.
                        <br />
                        Welcome to Wolfgang Wallace.
                      </p>
                      <div className={styles.rewardSection}>
                        <h3>🏆 HEIST MASTER REWARDS UNLOCKED 🏆</h3>
                        <p className={styles.rewardNote}>
                          Your browser remembers your achievement.
                          <br />
                          Look for 👁️ symbols throughout the site.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/scavenger-hunt"
              className={`${styles.fadeInSlow}`}
              style={{ fontSize: "1.2em", marginTop: "20px" }}
            >
              CONTINUE THE SEARCH FOR TRUTH
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "escape" || alarmTriggered) {
    return (
      <div className={styles.heistContainer}>
        <div className={styles.alarmScene}>
          <div className={styles.alarmFlashing}>
            <div className={styles.alarmText}>
              <h1 className={styles.alarmTitle}>
                🚨 SECURITY BREACH DETECTED 🚨
              </h1>
              <div className={styles.lockdownMessage}>
                <p>INITIATING FULL LOCKDOWN</p>
                <p>AUTHORITIES HAVE BEEN NOTIFIED</p>
                <p>THE HEIST HAS FAILED</p>
              </div>

              <div className={styles.escapeOptions}>
                <button
                  className={styles.retryButton}
                  onClick={() => {
                    setPhase("arrival");
                    setAttempts(0);
                    setAlarmTriggered(false);
                    setTimeRemaining(300);
                    setCurrentDialIndex(0);
                    setVaultCombination([0, 0, 0, 0]);
                  }}
                >
                  TRY AGAIN
                </button>
                <button
                  className={styles.fleeButton}
                  onClick={() => router.push("/mystery")}
                >
                  FLEE TO THE VOID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

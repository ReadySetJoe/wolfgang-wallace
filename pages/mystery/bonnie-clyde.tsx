import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Page from "../../components/page";
import styles from "../../styles/mystery.module.css";

interface CipherMap {
  [key: string]: string;
}

export default function BonnieClyde() {
  const router = useRouter();
  const [incorrect, setIncorrect] = useState(false);
  const [solved, setSolved] = useState(false);

  // The phrase: "MY FINAL STATEMENT"
  const fullCipher: CipherMap = {
    "💀": "M",
    "🕯️": "Y",
    "🔮": "F",
    "🎵": "I",
    "🌙": "N",
    "🎭": "A",
    "🗡️": "L",
    "👁️": "S",
    "⭕": "T",
    "🦇": "E",
  };

  // Only reveal some letters initially
  const revealedLetters = ["M", "I", "N", "T"];

  const [userCipher, setUserCipher] = useState<CipherMap>(() => {
    const initial: CipherMap = {};
    Object.entries(fullCipher).forEach(([symbol, letter]) => {
      const shouldReveal = revealedLetters.includes(letter);
      initial[symbol] = shouldReveal ? letter : "";
    });
    return initial;
  });

  const cipherPhrase = "💀🕯️ 🔮🎵🌙🎭🗡️ 👁️⭕🎭⭕🦇💀🦇🌙⭕";

  // Helper function to properly segment Unicode graphemes (including emojis with variant selectors)
  const segmentGraphemes = (str: string) => {
    if (Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(str), (segment) => segment.segment);
    } else {
      // Fallback for browsers that don't support Intl.Segmenter
      return Array.from(str);
    }
  };

  // Calculate decoded phrase reactively when userCipher changes
  const decodedPhrase = React.useMemo(() => {
    const segments = segmentGraphemes(cipherPhrase);
    const result = segments
      .map((char) => {
        if (char === " ") {
          return " ";
        }
        const letter = userCipher[char];
        const decoded = letter && letter !== "" ? letter : "?";
        return decoded;
      })
      .join("");

    return result;
  }, [userCipher, cipherPhrase]);

  // Split into words for display
  const cipherWords = cipherPhrase.split(" ");
  const decodedWords = decodedPhrase.split(" ");

  const handleSymbolUpdate = (symbol: string, value: string) => {
    if (value.length > 1) return;

    setIncorrect(false);

    setUserCipher({
      ...userCipher,
      [symbol]: value.toUpperCase(),
    });
  };

  const checkSolution = () => {
    const solution = "MY FINAL STATEMENT";
    const userSolution = decodedPhrase; // Use the reactive decodedPhrase

    if (userSolution.toUpperCase() === solution.toUpperCase()) {
      setSolved(true);
      setTimeout(() => {
        router.push("/mystery/the-heist");
      }, 3000);
    } else {
      setIncorrect(true);
    }
  };

  return (
    <Page>
      <div className={styles.puzzleContainer}>
        <h1 className={styles.fadeIn}>Act II - Bankruptcy</h1>

        <div className={`${styles.storyText} ${styles.fadeInDelayed}`}>
          <p>A message from the void, written in symbols...</p>
          <p>
            To think, the <em>last words uttered</em> were equivalent to
            announcing you're a failure...
          </p>
        </div>

        <div className={`${styles.cipherBox} ${styles.fadeInSlow}`}>
          <div className={styles.cipherMessage}>
            {cipherWords.map((word, index) => (
              <div key={index} className={styles.cipherWord}>
                {word}
              </div>
            ))}
          </div>

          <div className={styles.decodedMessage}>
            {decodedWords.map((word, index) => (
              <div key={index} className={styles.decodedWord}>
                {word}
              </div>
            ))}
          </div>

          {!solved && (
            <>
              <div className={styles.cipherGrid}>
                {Object.entries(userCipher)
                  .filter(([_, letter]) => {
                    const isRevealed = revealedLetters.includes(letter);
                    return isRevealed;
                  })
                  .map(([symbol, letter]) => (
                    <div key={symbol} className={styles.knownCipher}>
                      {symbol} = {letter}
                    </div>
                  ))}
              </div>

              <div className={styles.cipherInputGrid}>
                {Object.entries(userCipher)
                  .filter(([_, letter]) => !revealedLetters.includes(letter))
                  .map(([symbol, _]) => (
                    <div key={symbol} className={styles.cipherInput}>
                      <span>{symbol}</span>
                      <input
                        type="text"
                        maxLength={1}
                        value={userCipher[symbol] || ""}
                        onChange={(e) =>
                          handleSymbolUpdate(symbol, e.target.value)
                        }
                        className={styles.letterInput}
                      />
                    </div>
                  ))}
              </div>

              <button
                onClick={checkSolution}
                className={styles.submitButton}
                disabled={Object.values(userCipher).some(
                  (val) => !val || val === ""
                )}
              >
                Check Solution
              </button>
            </>
          )}

          {solved && (
            <div className={styles.successMessage}>
              <h2>The bank awaits...</h2>
              <p>Redirecting to the heist...</p>
            </div>
          )}

          {incorrect && (
            <div className={styles.errorMessage}>
              <p>Incorrect solution. Try again</p>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Page from "../../components/page";
import styles from "../../styles/mystery.module.css";

interface CipherMap {
  [key: string]: string;
}

export default function BonnieClyde() {
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
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
      console.log(
        `Symbol ${symbol} -> Letter ${letter} -> Revealed: ${shouldReveal} -> Value: ${initial[symbol]}`
      );
    });
    console.log("Final initial userCipher:", initial);
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
      .map((char, index) => {
        if (char === " ") {
          console.log(`Char ${index}: 'SPACE' -> 'SPACE'`);
          return " ";
        }
        const letter = userCipher[char];
        const decoded = letter && letter !== "" ? letter : "?";
        console.log(
          `Char ${index}: '${char}' -> '${decoded}' (from userCipher: ${letter})`
        );
        return decoded;
      })
      .join("");

    return result;
  }, [userCipher, cipherPhrase]);

  // Split into words for display
  const cipherWords = cipherPhrase.split(" ");
  const decodedWords = decodedPhrase.split(" ");

  useEffect(() => {
    // Show hint after 3 wrong attempts
    if (attempts >= 3 && !solved) {
      setShowHint(true);
    }
  }, [attempts, solved]);

  const handleSymbolUpdate = (symbol: string, value: string) => {
    if (value.length > 1) return;

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
      setAttempts(attempts + 1);
    }
  };

  return (
    <Page>
      <div className={styles.puzzleContainer}>
        <h1>The Long Con - Act II</h1>

        <div className={styles.storyText}>
          <p>You've found us out... or have you?</p>
          <p>A message from the void, written in symbols...</p>
        </div>

        <div className={styles.cipherBox}>
          <h3>The Cipher:</h3>
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
              <h4>Known Translations:</h4>
              <div className={styles.cipherGrid}>
                {Object.entries(userCipher)
                  .filter(([_, letter]) => {
                    const isRevealed = revealedLetters.includes(letter);
                    console.log(
                      `Filtering: ${_} -> ${letter} -> Revealed: ${isRevealed}`
                    );
                    return isRevealed;
                  })
                  .map(([symbol, letter]) => (
                    <div key={symbol} className={styles.knownCipher}>
                      {symbol} = {letter}
                    </div>
                  ))}
              </div>

              <h4>Unknown Symbols:</h4>
              <div className={styles.cipherInputGrid}>
                {Object.entries(userCipher)
                  .filter(([_, letter]) => !revealedLetters.includes(letter))
                  .map(([symbol, _]) => (
                    <div key={symbol} className={styles.cipherInput}>
                      <span>{symbol} = </span>
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

          {attempts > 0 && !solved && (
            <p className={styles.attemptFeedback}>
              {attempts === 1 && "Not quite... try different letters."}
              {attempts === 2 &&
                "Think about common English words and patterns."}
              {attempts >= 3 &&
                "The second word ends with 'AL' - what could it be?"}
            </p>
          )}
        </div>
      </div>
    </Page>
  );
}

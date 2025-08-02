import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Page from "../../components/page";
import { isHeistCompleted } from "../../utils/heistStatus";
import {
  getCollectedEyes,
  getCollectionCount,
  resetCollection,
  hasCollectedEye,
} from "../../utils/eyeCollection";
import { EYE_DATA } from "../../utils/eyePlacements";
import styles from "../../styles/ScavengerHunt.module.css";

export default function ScavengerHunt() {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [collectedCount, setCollectedCount] = useState(0);
  const [collectedEyes, setCollectedEyes] = useState<any[]>([]);

  useEffect(() => {
    const unlocked = isHeistCompleted();
    setIsUnlocked(unlocked);

    if (!unlocked) {
      router.push("/");
      return;
    }

    const eyes = getCollectedEyes();
    setCollectedEyes(eyes);
    setCollectedCount(eyes.length);
  }, [router]);

  if (!isUnlocked) return null;

  // Find the next unfound eye
  const getNextHint = () => {
    for (const eye of EYE_DATA) {
      if (!hasCollectedEye(eye.id)) {
        return eye.hint;
      }
    }
    return null;
  };

  // Calculate eyes needed for next tier
  const getNextTierInfo = () => {
    if (collectedCount < 1) {
      return { tier: "First Sight", needed: 1 - collectedCount, total: 1 };
    } else if (collectedCount < 5) {
      return { tier: "Awakening Vision", needed: 5 - collectedCount, total: 5 };
    } else if (collectedCount < 10) {
      return { tier: "Third Eye Open", needed: 10 - collectedCount, total: 10 };
    } else if (collectedCount < 20) {
      return { tier: "All-Seeing", needed: 20 - collectedCount, total: 20 };
    }
    return null;
  };

  const renderTierContent = () => {
    if (collectedCount === 0) {
      return (
        <div className={styles.tier}>
          <h2>The Hunt Begins</h2>
          <p>
            The eyes are hidden throughout the site. Each one you find reveals
            more of the truth.
          </p>
          <p>Find your first eye to unlock the initial revelation...</p>
        </div>
      );
    }

    const tiers = [];

    if (collectedCount >= 1) {
      tiers.push(
        <div key="tier1" className={styles.tier}>
          <h3>First Sight (1 Eye Found)</h3>
          <p>
            You've taken your first step into the hidden world. The veil begins
            to lift.
          </p>
          <p className={styles.reward}>
            🎵 Reward: [Placeholder - Acoustic demo of unreleased track]
          </p>
        </div>
      );
    }

    if (collectedCount >= 5) {
      tiers.push(
        <div key="tier2" className={styles.tier}>
          <h3>Awakening Vision (5 Eyes Found)</h3>
          <p>Your perception sharpens. The patterns become clearer.</p>
          <p className={styles.reward}>
            📖 Reward: [Placeholder - Secret band member diary entries]
          </p>
        </div>
      );
    }

    if (collectedCount >= 10) {
      tiers.push(
        <div key="tier3" className={styles.tier}>
          <h3>Third Eye Open (10 Eyes Found)</h3>
          <p>Half the truth is revealed. The mysteries deepen.</p>
          <p className={styles.reward}>
            🎬 Reward: [Placeholder - Behind-the-scenes studio footage]
          </p>
        </div>
      );
    }

    if (collectedCount === 20) {
      tiers.push(
        <div key="tier4" className={styles.tier}>
          <h3>All-Seeing (20 Eyes Found - COMPLETE)</h3>
          <p>You have found them all. The full truth is yours.</p>
          <p className={styles.reward}>
            🏆 Ultimate Reward: [Placeholder - Exclusive album pre-release +
            Secret concert invitation]
          </p>
          <button
            className={styles.resetButton}
            onClick={() => {
              if (confirm("Reset your collection and start the hunt again?")) {
                resetCollection();
                window.location.reload();
              }
            }}
          >
            Reset Collection
          </button>
        </div>
      );
    }

    return tiers;
  };

  return (
    <Page>
      <div className={styles.container}>
        <h1 className={styles.title}>The Eye Hunt</h1>

        <div className={styles.progress}>
          <p className={styles.count}>Eyes Collected: {collectedCount} / 20</p>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(collectedCount / 20) * 100}%` }}
            />
          </div>
          {getNextTierInfo() && (
            <p className={styles.nextTierInfo}>
              Collect {getNextTierInfo()!.needed} more eye{getNextTierInfo()!.needed !== 1 ? 's' : ''} to unlock <strong>{getNextTierInfo()!.tier}</strong>
            </p>
          )}
        </div>

        <div className={styles.eyes}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className={`${styles.eye} ${
                i < collectedCount ? styles.collected : ""
              }`}
            >
              👁️
            </span>
          ))}
        </div>

        <div className={styles.content}>{renderTierContent()}</div>

        {collectedCount < 20 && (
          <div className={styles.nextHint}>
            <h3>Next Eye Hint:</h3>
            <p className={styles.hintText}>
              <span className={styles.hintIcon}>🔍</span>
              {getNextHint()}
            </p>
          </div>
        )}
      </div>
    </Page>
  );
}

import React, { useState, useEffect } from "react";
import { isHeistCompleted } from "../utils/heistStatus";
import { collectEye, hasCollectedEye } from "../utils/eyeCollection";
import styles from "../styles/CollectibleEye.module.css";

interface CollectibleEyeProps {
  eyeId: string;
  hint?: string;
  hidden?: boolean;
}

export default function CollectibleEye({
  eyeId,
  hint = "A secret awaits...",
  hidden = false,
}: CollectibleEyeProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setIsUnlocked(isHeistCompleted());
    setIsCollected(hasCollectedEye(eyeId));
  }, [eyeId]);

  if (!isUnlocked || isCollected) return null;

  const handleClick = () => {
    const success = collectEye(eyeId);
    if (success) {
      setShowAnimation(true);
      setTimeout(() => {
        setIsCollected(true);
      }, 1000);
    }
  };

  return (
    <span
      className={`${styles.collectibleEye} ${hidden ? styles.hidden : ""} ${
        showAnimation ? styles.collecting : ""
      }`}
      onClick={handleClick}
      title={hint}
    >
      👁️
    </span>
  );
}

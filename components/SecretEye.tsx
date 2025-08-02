import React, { useState, useEffect } from 'react';
import { isHeistCompleted } from '../utils/heistStatus';
import styles from '../styles/SecretEye.module.css';

interface SecretEyeProps {
  message?: string;
  link?: string;
}

export default function SecretEye({ message = "Secret content unlocked", link }: SecretEyeProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setIsUnlocked(isHeistCompleted());
  }, []);

  if (!isUnlocked) return null;

  const content = (
    <span 
      className={styles.secretEye}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      👁️
      {showTooltip && (
        <span className={styles.tooltip}>{message}</span>
      )}
    </span>
  );

  if (link) {
    return (
      <a href={link} className={styles.secretLink}>
        {content}
      </a>
    );
  }

  return content;
}
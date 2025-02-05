import React from "react";
import Page from "../../components/page";
import content from "../../components/lore.md";
import ReactMarkdown from "react-markdown";
import styles from "../../styles/lore.module.css";

const VintagePaper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Add some random rotation to enhance the jagged effect
  const randomRotation = React.useMemo(() => {
    return Math.random() * 0.4 - 0.2; // Random value between -0.2 and 0.2 degrees
  }, []);

  return (
    <div className={styles.vintagePaperContainer}>
      <div
        className={styles.vintagePaper}
        style={{
          transform: `rotate(${randomRotation}deg)`,
        }}
      >
        {/* Paper texture with noise */}
        <div className={styles.paperTexture} />

        {/* Aging gradient effect */}
        <div className={styles.paperGradient} />

        {/* Random tears/imperfections */}
        <div className={styles.paperTears} />

        {/* Content container */}
        <div className={styles.paperContent}>{children}</div>
      </div>
    </div>
  );
};

export default function Lore() {
  return (
    <Page>
      <div className={styles.loreContainer}>
        <h3 className={styles.loreIntro}>
          Welcome to our weird little corner of the internet. This is where we
          share the story of our songs, and invite you to share in the
          narrative.
        </h3>

        <h1 className={styles.loreTitle}>The Lore.</h1>

        <VintagePaper>
          <ReactMarkdown className={styles.markdownContent}>
            {content}
          </ReactMarkdown>
        </VintagePaper>
      </div>
    </Page>
  );
}

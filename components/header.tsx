import Link from "next/link";
import { useState, useEffect } from "react";
import { isHeistCompleted } from "../utils/heistStatus";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [showScavengerHunt, setShowScavengerHunt] = useState(false);

  useEffect(() => {
    setShowScavengerHunt(isHeistCompleted());
  }, []);

  return (
    <div className={styles.header}>
      <Link href="/">
        <h2>wolfgang wallace</h2>
      </Link>
      <div className={styles.navigationLinks}>
        <Link href="/band">
          <p>ABOUT</p>
        </Link>
        <Link href="/lore">
          <p>LORE</p>
        </Link>
        <Link href="/mystery">
          <p>MYSTERY</p>
        </Link>
        {showScavengerHunt && (
          <Link href="/rpg">
            <p>RPG</p>
          </Link>
        )}
        {showScavengerHunt && (
          <Link href="/scavenger-hunt">
            <p>👁️</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

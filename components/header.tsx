import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
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
      </div>
      <Link href="/admin">admin</Link>
    </div>
  );
};

export default Header;

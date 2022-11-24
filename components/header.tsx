import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <a href="/">
        <h2>wolfgang wallace</h2>
      </a>
      <div className={styles.navigationLinks}>
        <Link href="/band">
          <p>ABOUT</p>
        </Link>
        <Link href="/lord">
          <p>LORE</p>
        </Link>
        <Link href="/mystery">
          <p>MYSTERY</p>
        </Link>
      </div>
      <a href="/admin">admin</a>
    </div>
  );
};

export default Header;

import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function Landing() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>We're wolfgang wallace</h1>
      <h2 style={{ marginTop: "50px", marginBottom: "0px" }}>
        bienvenue dans le vide
      </h2>
      <p style={{ marginTop: "0px" }}>(welcome to the void)</p>

      <h1>Choose your path:</h1>

      <section style={{ textAlign: "center" }}>
        <Link href="/band" style={{ margin: "auto" }}>
          <h3 className={styles.grow}>
            Narcissism
            <br />
            (about us)
          </h3>
        </Link>
        <svg
          viewBox="0 0 350 350"
          style={{
            width: "min(350px, 80vw)",
            height: "auto",
            margin: "-40px auto -15px auto",
            display: "block",
          }}
        >
          <polygon
            points="175 80, 310 310, 40 310"
            style={{
              stroke: "white",
              strokeWidth: "20px",
            }}
          />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Link href="/lore">
              <h3 className={styles.grow}>
                Machiavellianism
                <br />
                (the lore)
              </h3>
            </Link>
          </div>
          <div>
            <Link href="/mystery">
              <h3 className={styles.grow}>
                Psychopathy
                <br />
                (a mystery)
              </h3>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

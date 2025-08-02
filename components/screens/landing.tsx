import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { EyePlacements } from "../../utils/eyePlacements";

export default function Landing() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        We're wolfgang wallace {EyePlacements.HomeTitle()}
      </h1>
      <h2 style={{ marginTop: "50px", marginBottom: "0px" }}>
        bienvenue dans le vide
      </h2>
      <p style={{ marginTop: "0px" }}>(welcome to the void)</p>

      <h1>Choose your path:</h1>
      <Link href="/band" style={{ margin: "auto", zIndex: 1 }}>
        <h3 className={styles.grow}>
          Narcissism
          <br />
          (about us)
        </h3>
      </Link>

      <section style={{ textAlign: "center" }}>
        <div style={{ position: "relative", margin: "-40px auto -15px auto" }}>
          <svg
            viewBox="0 0 350 350"
            style={{
              width: "min(350px, 80vw)",
              height: "auto",
              display: "block",
            }}
          >
            <polygon
              points="175 80, 310 310, 40 310"
              style={{
                stroke: "white",
                strokeWidth: "20px",
                fill: "transparent",
              }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            {EyePlacements.HomeAlbumCorner()}
          </div>
        </div>
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
      <div style={{ marginTop: "100px", textAlign: "center", opacity: 0.5 }}>
        {EyePlacements.HomeFooter()}
      </div>
    </main>
  );
}

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
        <a href="/band">
          <h3>Narcissism</h3>
          <h3 style={{ margin: 0 }}>(about us)</h3>
        </a>
        <svg height={350} width={350}>
          <polygon
            points="175 80, 310 310, 40 310"
            style={{ stroke: "white", strokeWidth: "40px" }}
          />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <a href="/lore">
              <h3>Machiavellianism</h3>
              <h3>(the lore)</h3>
            </a>
          </div>
          <div>
            <a href="/mystery">
              <h3>Psychopathy</h3>
              <h3>(a mystery)</h3>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

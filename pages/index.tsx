import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>wolfgang wallace.</title>
        <meta
          name="description"
          content="A site for a band called wolfgang wallace."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family='EB Garamond'"
        />
      </Head>
    </div>
  );
}

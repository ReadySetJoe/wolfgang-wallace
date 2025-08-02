import Page from "../components/Page";
import { EyePlacements } from "../utils/eyePlacements";
import styles from "../styles/404.module.css";

export default function Custom404() {
  return (
    <Page>
      <div className={styles.container}>
        <h1 className={styles.title}>404 - Lost in the Void</h1>
        <p className={styles.message}>
          The page you seek has vanished into the darkness...
        </p>
        <p className={styles.hint}>
          But those who see beyond the veil might find something here{" "}
          {EyePlacements.Error404()}
        </p>
      </div>
    </Page>
  );
}

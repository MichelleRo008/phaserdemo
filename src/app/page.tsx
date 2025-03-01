import PhaserGame from './PhaserGame';
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Phaser Game Demo</h1>
        <PhaserGame />
      </main>
    </div>
  );
}

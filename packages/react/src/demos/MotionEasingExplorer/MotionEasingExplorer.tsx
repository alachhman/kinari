import { useState } from "react";
import { usePrefersReducedMotion } from "../../utils";
import styles from "./MotionEasingExplorer.module.css";

export interface MotionEasingExplorerProps {
  mode?: "comparison" | "explore";
}

export function MotionEasingExplorer({ mode: _mode = "comparison" }: MotionEasingExplorerProps) {
  const [runId, setRunId] = useState(0);
  const reduced = usePrefersReducedMotion();

  return (
    <div className={styles.explorer}>
      <div className={styles.row}>
        <div className={styles.col}>
          <span className={styles.label}>soft-out · ease-tawami (correct)</span>
          <div className={styles.track}>
            <div
              key={`c-${runId}`}
              data-kinari-component="motion-box"
              data-variant="correct"
              data-running={!reduced}
              className={`${styles.box} ${styles.boxCorrect}`}
            />
          </div>
        </div>
        <div className={styles.col}>
          <span className={styles.label}>spring overshoot (wrong)</span>
          <div className={styles.track}>
            <div
              key={`w-${runId}`}
              data-kinari-component="motion-box"
              data-variant="wrong"
              data-running={!reduced}
              className={`${styles.box} ${styles.boxWrong}`}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className={styles.replay}
        onClick={() => setRunId((n) => n + 1)}
        aria-label="Replay animation"
      >
        ↻ replay
      </button>
    </div>
  );
}

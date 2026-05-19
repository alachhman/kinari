import { useState, useEffect } from "react";
import styles from "./SoftSpringDemo.module.css";

export interface SoftSpringDemoProps {
  scenario?: "sticker-settle" | "cascade-order" | "drill-in" | "all";
  showEasingComparison?: boolean;
}

export function SoftSpringDemo({ scenario = "sticker-settle" }: SoftSpringDemoProps) {
  const [state, setState] = useState<"initial" | "settled">("initial");

  useEffect(() => {
    const t = setTimeout(() => setState("settled"), 60);
    return () => clearTimeout(t);
  }, []);

  const replay = () => {
    setState("initial");
    setTimeout(() => setState("settled"), 60);
  };

  if (scenario === "cascade-order") {
    return (
      <div className={styles.demo} data-kinari-scenario="cascade-order">
        <div className={styles.stage}>
          <div
            className={`${styles.tile} ${styles.subject}`}
            data-cascade="subject"
            data-state={state}
          >
            subject
          </div>
          <div
            className={`${styles.tile} ${styles.chrome}`}
            data-cascade="chrome"
            data-state={state}
          >
            chrome
          </div>
          <div className={`${styles.tile} ${styles.text}`} data-cascade="text" data-state={state}>
            text lands last
          </div>
        </div>
        <button
          type="button"
          className={styles.replay}
          onClick={replay}
          aria-label="Replay animation"
        >
          ↻ replay
        </button>
      </div>
    );
  }

  if (scenario === "drill-in") {
    return (
      <div className={styles.demo} data-kinari-scenario="drill-in">
        <div className={styles.stage}>
          <div className={`${styles.tile} ${styles.subject}`} data-state={state}>
            (scale + blur drill-in)
          </div>
        </div>
        <button
          type="button"
          className={styles.replay}
          onClick={replay}
          aria-label="Replay animation"
        >
          ↻ replay
        </button>
      </div>
    );
  }

  // default — sticker-settle
  return (
    <div className={styles.demo} data-kinari-scenario="sticker-settle">
      <div className={styles.stage}>
        <div className={`${styles.tile} ${styles.subject}`} data-state={state}>
          sticker settles
        </div>
      </div>
      <button
        type="button"
        className={styles.replay}
        onClick={replay}
        aria-label="Replay animation"
      >
        ↻ replay
      </button>
    </div>
  );
}

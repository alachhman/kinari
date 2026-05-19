import { useState } from "react";
import styles from "./SubjectLiftDemo.module.css";

export interface SubjectLiftDemoProps {
  src: string;
  context: string;
}

export function SubjectLiftDemo({ src, context }: SubjectLiftDemoProps) {
  const [state, setState] = useState<"idle" | "shimmering" | "lifted">("idle");

  const lift = () => {
    setState("shimmering");
    setTimeout(() => setState("lifted"), 700);
  };

  return (
    <div className={styles.demo}>
      <div className={styles.stage} data-state={state}>
        <img src={context} alt="" className={styles.context} aria-hidden="true" />
        <img src={src} alt="" className={styles.subject} aria-hidden="true" />
        <div className={styles.shimmer} aria-hidden="true" />
      </div>
      <button type="button" className={styles.cta} onClick={lift} aria-label="Lift subject">
        Lift subject ↑
      </button>
    </div>
  );
}

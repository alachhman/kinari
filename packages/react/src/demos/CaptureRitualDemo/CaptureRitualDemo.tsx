import { useRef, useState, type ReactNode } from "react";
import { useConfirmGlow } from "../../utils/useConfirmGlow";
import { type AccentName } from "@kinari/tokens";
import styles from "./CaptureRitualDemo.module.css";

export interface CaptureRitualDemoProps {
  subject?: ReactNode;
  accent?: AccentName | string;
}

export function CaptureRitualDemo({ subject = "🍎", accent }: CaptureRitualDemoProps) {
  const [state, setState] = useState<"idle" | "settled">("idle");
  const shutterRef = useRef<HTMLButtonElement | null>(null);
  const { glow } = useConfirmGlow(accent ? { color: accent } : {});

  const fire = () => {
    if (shutterRef.current) {
      glow(shutterRef.current.getBoundingClientRect());
    }
    // Subject lands after the glow peak
    setTimeout(() => setState("settled"), 200);
  };

  const reset = () => setState("idle");

  return (
    <div className={styles.demo}>
      <div className={styles.stage} data-state={state}>
        <div className={styles.frame}>
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketTL}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketTR}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketBL}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketBR}`} />
        </div>
        <div className={styles.subject}>{subject}</div>
        <button
          ref={shutterRef}
          data-kinari-element="shutter"
          type="button"
          className={styles.shutter}
          onClick={fire}
          aria-label="Capture"
        />
        <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
          {state === "settled" ? "Capture complete" : ""}
        </div>
      </div>
      <button type="button" className={styles.replay} onClick={reset} aria-label="Replay">
        ↻ replay
      </button>
    </div>
  );
}

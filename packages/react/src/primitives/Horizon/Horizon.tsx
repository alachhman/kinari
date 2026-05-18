import { type ReactNode } from "react";
import clsx from "clsx";
import styles from "./Horizon.module.css";

export interface HorizonProps {
  mark?: ReactNode;
  spacing?: "tight" | "normal" | "loose";
}

/** Hairline gradient + center mark — Visual Language §07 divider. */
export function Horizon({ mark = "·", spacing = "normal" }: HorizonProps) {
  return (
    <div
      data-kinari-component="horizon"
      className={clsx(styles.horizon, styles[spacing])}
      role="separator"
    >
      <div className={styles.line} aria-hidden="true" />
      <div className={styles.mark}>{mark}</div>
      <div className={styles.line} aria-hidden="true" />
    </div>
  );
}

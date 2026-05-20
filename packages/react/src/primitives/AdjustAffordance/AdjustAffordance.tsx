import { type ReactNode } from "react";
import clsx from "clsx";
import styles from "./AdjustAffordance.module.css";

export interface AdjustAffordanceProps {
  /** Fired when tapped. */
  onAdjust: () => void;
  /** Label text. Default: "Adjust". */
  label?: string;
  /** Glyph rendered to the left of the label. Default: "↻". */
  glyph?: ReactNode;
  /** Size. Default: "medium". */
  size?: "small" | "medium";
  className?: string;
}

/** AI-result recovery affordance. The kaki-iro retry glyph is intentional —
 *  it's the framework-reserved color for celebratory numerals AND this
 *  recovery moment (an exception documented in the spec). */
export function AdjustAffordance({
  onAdjust,
  label = "Adjust",
  glyph = "↻",
  size = "medium",
  className,
}: AdjustAffordanceProps) {
  return (
    <button
      type="button"
      data-kinari-component="adjust-affordance"
      data-size={size}
      className={clsx(styles.pill, className)}
      onClick={onAdjust}
      aria-label={label}
    >
      <span className={styles.glyph} aria-hidden="true">
        {glyph}
      </span>
      <span>{label}</span>
    </button>
  );
}

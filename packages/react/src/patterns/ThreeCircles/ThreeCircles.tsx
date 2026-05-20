import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { colors, type AccentName, shadowFromAccent } from "@kinari/tokens";
import styles from "./ThreeCircles.module.css";

export interface ThreeCirclesAction {
  icon: ReactNode;
  label: string;
  onTap: () => void;
}

export interface ThreeCirclesProps {
  left: ThreeCirclesAction;
  center: ThreeCirclesAction;
  right: ThreeCirclesAction;
  accent?: AccentName | string;
}

/** Pattern #12 Three Circles — decision-moment chrome. Center is bigger,
 *  in the project accent. Flanks are paper-white with sumi glyphs. */
export function ThreeCircles({ left, center, right, accent }: ThreeCirclesProps) {
  const accentColor = accent
    ? accent in colors.accents
      ? colors.accents[accent as AccentName]
      : accent
    : undefined;

  const centerStyle: CSSProperties = accentColor
    ? ({
        "--accent": accentColor,
        boxShadow: shadowFromAccent(accentColor, "resting"),
      } as CSSProperties)
    : {};

  return (
    <div
      data-kinari-component="three-circles"
      className={styles.row}
      role="group"
      aria-label="Decision"
    >
      <button
        type="button"
        data-role="left"
        aria-label={left.label}
        className={clsx(styles.btn, styles.flank)}
        onClick={left.onTap}
      >
        {left.icon}
      </button>
      <button
        type="button"
        data-role="center"
        aria-label={center.label}
        className={clsx(styles.btn, styles.center)}
        style={centerStyle}
        onClick={center.onTap}
      >
        {center.icon}
      </button>
      <button
        type="button"
        data-role="right"
        aria-label={right.label}
        className={clsx(styles.btn, styles.flank)}
        onClick={right.onTap}
      >
        {right.icon}
      </button>
    </div>
  );
}

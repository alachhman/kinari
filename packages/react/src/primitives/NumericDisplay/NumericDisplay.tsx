import { type CSSProperties } from "react";
import clsx from "clsx";
import { colors, type AccentName } from "@kinari/tokens";
import styles from "./NumericDisplay.module.css";

export interface NumericDisplayProps {
  value: number | string;
  unit?: string;
  /** Accent override — defaults to kaki-iro warm signal. */
  accent?: AccentName | string;
  /** Type role — sans (default) or serif italic. */
  font?: "sans" | "serif";
  /** Auto-pluralize unit. Default: false (Kinari honors P#10). */
  pluralize?: boolean;
  className?: string;
}

/** Pattern #07 Numeral Display — celebratory numbers in warm signal. */
export function NumericDisplay({
  value,
  unit,
  accent,
  font = "sans",
  pluralize = false,
  className,
}: NumericDisplayProps) {
  const accentColor = accent
    ? accent in colors.accents
      ? colors.accents[accent as AccentName]
      : accent
    : undefined;

  const numericValue = typeof value === "number" ? value : Number(value);
  const displayUnit = unit && pluralize && numericValue !== 1 ? `${unit}s` : unit;

  const style: CSSProperties = accentColor ? { color: accentColor } : {};

  return (
    <span
      data-kinari-component="numeric-display"
      className={clsx(styles.numeric, styles[font], className)}
      style={style}
    >
      <span>{value}</span>
      {displayUnit && <span className={styles.unit}>{displayUnit}</span>}
    </span>
  );
}

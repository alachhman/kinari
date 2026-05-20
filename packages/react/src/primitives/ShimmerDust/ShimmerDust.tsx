import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { colors, type AccentName } from "@kinari/tokens";
import styles from "./ShimmerDust.module.css";

export interface ShimmerDustProps {
  children: ReactNode;
  /** When true, the shimmer overlay is visible and animating. */
  active: boolean;
  /** Project accent for the shimmer hue. Default: kaki-iro. */
  accent?: AccentName | string;
  className?: string;
}

/** AI-processing overlay — CSS-only sweep across children. */
export function ShimmerDust({ children, active, accent, className }: ShimmerDustProps) {
  const accentColor = accent
    ? accent in colors.accents
      ? colors.accents[accent as AccentName]
      : accent
    : undefined;

  const style: CSSProperties | undefined = accentColor
    ? ({ "--shimmer-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <div
      data-kinari-component="shimmer-dust"
      data-active={active}
      className={clsx(styles.wrapper, className)}
      style={style}
    >
      {children}
      <div className={styles.overlay} data-kinari-element="shimmer-overlay" aria-hidden="true" />
    </div>
  );
}

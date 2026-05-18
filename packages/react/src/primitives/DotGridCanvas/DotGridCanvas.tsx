import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./DotGridCanvas.module.css";

export interface DotGridCanvasProps {
  children: ReactNode;
  variant?: "dot-grid" | "paper-tone";
  spacing?: number;
  className?: string;
}

/** Pattern #02 Dot-Grid Canvas — backgrounds with quiet structure. */
export function DotGridCanvas({
  children,
  variant = "dot-grid",
  spacing,
  className,
}: DotGridCanvasProps) {
  const style: CSSProperties = spacing
    ? ({ "--dot-spacing": `${spacing}px` } as CSSProperties)
    : {};

  return (
    <div
      data-kinari-component="dot-grid-canvas"
      data-variant={variant}
      className={clsx(
        styles.canvas,
        variant === "dot-grid" ? styles.dotGrid : styles.paperTone,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

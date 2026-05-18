import { type ElementType, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./TypePair.module.css";

export interface TypeRoleProps {
  children: ReactNode;
  as?: ElementType;
  className?: string | undefined;
}

/** Visual Language §01 type role: Display — friendly serif weight 600. */
export function Display({ children, as: As = "h2", className }: TypeRoleProps) {
  return <As className={clsx(styles.display, className)}>{children}</As>;
}

/** Type role: Label — chunky bold sans for stickers, CTAs, badges. */
export function Label({ children, as: As = "span", className }: TypeRoleProps) {
  return <As className={clsx(styles.label, className)}>{children}</As>;
}

/** Type role: Body — running prose. */
export function Body({ children, as: As = "div", className }: TypeRoleProps) {
  return <As className={clsx(styles.body, className)}>{children}</As>;
}

// Re-export NumericDisplay as Numeric for convenience
export { NumericDisplay as Numeric } from "../NumericDisplay";

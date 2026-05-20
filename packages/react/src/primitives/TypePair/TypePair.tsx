import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./TypePair.module.css";

export type TypeRoleProps = {
  children: ReactNode;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

/** Visual Language §01 type role: Display — friendly serif weight 600. */
export function Display({ children, as: As = "h2", className, ...rest }: TypeRoleProps) {
  return (
    <As className={clsx(styles.display, className)} {...rest}>
      {children}
    </As>
  );
}

/** Type role: Label — chunky bold sans for stickers, CTAs, badges. */
export function Label({ children, as: As = "span", className, ...rest }: TypeRoleProps) {
  return (
    <As className={clsx(styles.label, className)} {...rest}>
      {children}
    </As>
  );
}

/** Type role: Body — running prose. */
export function Body({ children, as: As = "div", className, ...rest }: TypeRoleProps) {
  return (
    <As className={clsx(styles.body, className)} {...rest}>
      {children}
    </As>
  );
}

// Re-export NumericDisplay as Numeric for convenience
export { NumericDisplay as Numeric } from "../NumericDisplay";

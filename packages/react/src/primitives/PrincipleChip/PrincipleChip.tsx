import styles from "./PrincipleChip.module.css";
import { PRINCIPLES, principleHref, type PrincipleNumber } from "./principles";

export interface PrincipleChipProps {
  number: PrincipleNumber;
  variant?: "number-only" | "full";
  href?: string;
}

/** Pattern #06 cross-reference chip. Renders `#N Title` or just `#N`. */
export function PrincipleChip({ number, variant = "full", href }: PrincipleChipProps) {
  const target = href ?? principleHref(number);
  const title = PRINCIPLES[number].name;

  return (
    <a data-kinari-component="principle-chip" className={styles.chip} href={target}>
      <span className={styles.number}>#{number}</span>
      {variant === "full" && <span>{title}</span>}
    </a>
  );
}

import { type CSSProperties, type ReactNode, useState } from "react";
import { Display, Body } from "../../primitives/TypePair";
import styles from "./SingleButton.module.css";

export interface SingleButtonProps {
  shape: ReactNode;
  onTap: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  satellites?: ReactNode;
  size?: 56 | 64 | 72;
  spendAnimation?: boolean;
}

/** Pattern #11 Single Button — one branded shape, invariant across contexts.
 *  The shape itself is consumer-provided. */
export function SingleButton({
  shape,
  onTap,
  title,
  subtitle,
  satellites,
  size = 72,
  spendAnimation = true,
}: SingleButtonProps) {
  const [spending, setSpending] = useState(false);

  const handleClick = () => {
    if (spendAnimation) {
      setSpending(true);
      setTimeout(() => setSpending(false), 220);
    }
    onTap();
  };

  const style: CSSProperties = { "--single-button-size": `${size}px` } as CSSProperties;

  return (
    <div className={styles.wrapper}>
      {title && (
        <Display as="div" className={styles.title}>
          {title}
        </Display>
      )}
      {subtitle && (
        <Body as="div" className={styles.subtitle}>
          {subtitle}
        </Body>
      )}
      <div className={styles.row}>
        {satellites}
        <button
          data-kinari-component="single-button"
          data-spending={spending}
          type="button"
          className={styles.button}
          style={style}
          onClick={handleClick}
        >
          {shape}
        </button>
      </div>
    </div>
  );
}

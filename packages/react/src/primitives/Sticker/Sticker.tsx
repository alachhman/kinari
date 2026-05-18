import { type CSSProperties, type ReactNode, useMemo } from "react";
import clsx from "clsx";
import { shadowFromAccent } from "../../utils";
import { type AccentName, colors } from "@kinari/tokens";
import styles from "./Sticker.module.css";

export interface StickerProps {
  children: ReactNode;
  /** Subtle tilt. Default: stable randomized within ±1.2°. */
  rotation?: number;
  /** Resting (default) or floating shadow depth. */
  lift?: "resting" | "floating";
  /** When set, generates a colored shadow via shadowFromAccent. */
  accent?: AccentName | string;
  /** Die-cut (default) or polaroid variant. */
  variant?: "die-cut" | "polaroid";
  /** Element role — defaults to div. */
  as?: "div" | "a" | "button";
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** Pattern #01 Sticker Primitive — the framework's primary noun.
 *  Renders an object-with-weight on kinari paper. */
export function Sticker({
  children,
  rotation,
  lift = "resting",
  accent,
  variant = "die-cut",
  as = "div",
  href,
  onClick,
  className,
}: StickerProps) {
  const stableRotation = useMemo(() => {
    if (rotation !== undefined) return rotation;
    return Math.random() * 2.3 - 1.2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accentHex =
    accent && (accent in colors.accents ? colors.accents[accent as AccentName] : accent);

  const style: CSSProperties = {
    "--sticker-rotation": `${stableRotation}deg`,
    ...(accentHex ? { boxShadow: shadowFromAccent(accentHex, lift) } : {}),
  } as CSSProperties;

  const classNames = clsx(
    styles.sticker,
    lift === "floating" && styles.floating,
    variant === "polaroid" && styles.polaroid,
    className,
  );

  const dataAttrs = { "data-kinari-component": "sticker" };

  if (as === "a") {
    return (
      <a {...dataAttrs} className={classNames} style={style} href={href}>
        {children}
      </a>
    );
  }
  if (as === "button") {
    return (
      <button
        {...dataAttrs}
        type="button"
        className={classNames}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <div {...dataAttrs} className={classNames} style={style}>
      {children}
    </div>
  );
}

import { type CSSProperties, type ReactNode, useState } from "react";
import clsx from "clsx";
import { shadowFromAccent } from "../../utils";
import { warnOnceForCallSite } from "../../utils/warnOnceForCallSite";
import { type AccentName, colors } from "@kinari/tokens";
import styles from "./Sticker.module.css";

export interface StickerProps {
  children: ReactNode;
  /** Subtle tilt. Default: stable randomized within ±1.2°. */
  rotation?: number;
  /** Resting (default) or floating shadow depth. */
  lift?: "resting" | "floating";
  /** Tint the drop shadow with this accent's hue. Sticker background stays white. */
  shadowAccent?: AccentName | string;
  /** @deprecated Use `shadowAccent` instead. Removed in v0.3. */
  accent?: AccentName | string;
  /** Die-cut (default) or polaroid variant. */
  variant?: "die-cut" | "polaroid";
  /** Polaroid-only. Caption rendered below the photo. */
  caption?: ReactNode;
  /** Polaroid-only. Aspect ratio of the photo area. Default: "square". */
  photoAspect?: "square" | "4/3" | "3/4" | "16/9";
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
  shadowAccent,
  accent,
  variant = "die-cut",
  caption,
  photoAspect = "square",
  as = "div",
  href,
  onClick,
  className,
}: StickerProps) {
  // Use `useState` (not `useMemo`) for stable-per-mount values. The committed
  // state survives React 19 StrictMode's simulated remount in dev; `useMemo`
  // with `[]` deps technically works the same here, but `useState` more clearly
  // signals "remember this once" and avoids the eslint-disable.
  const [stableRotation] = useState<number>(() => rotation ?? Math.random() * 2.3 - 1.2);

  // Migration: shadowAccent is the v0.2 name. accent is deprecated.
  if (accent && !shadowAccent) {
    warnOnceForCallSite(
      "Sticker prop `accent` is deprecated; rename to `shadowAccent`. Behavior is unchanged.",
    );
  }
  const resolvedAccent = shadowAccent ?? accent;
  const accentHex =
    resolvedAccent &&
    (resolvedAccent in colors.accents
      ? colors.accents[resolvedAccent as AccentName]
      : resolvedAccent);

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

  const content =
    variant === "polaroid" ? (
      <>
        <div className={styles.photo} data-kinari-element="photo" data-aspect={photoAspect}>
          {children}
        </div>
        {caption && <div className={styles.caption}>{caption}</div>}
      </>
    ) : (
      children
    );

  if (as === "a") {
    return (
      <a {...dataAttrs} className={classNames} style={style} href={href}>
        {content}
      </a>
    );
  }
  if (as === "button") {
    return (
      <button {...dataAttrs} type="button" className={classNames} style={style} onClick={onClick}>
        {content}
      </button>
    );
  }
  return (
    <div {...dataAttrs} className={classNames} style={style}>
      {content}
    </div>
  );
}

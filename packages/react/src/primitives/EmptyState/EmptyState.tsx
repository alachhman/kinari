import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { colors, type AccentName, shadowFromAccent } from "@kinari/tokens";
import styles from "./EmptyState.module.css";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  /** Single kanji glyph rendered above the title. */
  glyph: string;
  /** Title — typically the English translation. */
  title: ReactNode;
  /** Small-caps reading line below the title (e.g., "kara · empty"). */
  reading?: string;
  /** Italic gloss paragraph. */
  body?: ReactNode;
  /** CTA. Omit for an action-less empty state. */
  action?: EmptyStateAction;
  /** Project accent for the CTA fill. Default: shikon. */
  accent?: AccentName | string;
  className?: string;
}

/** Pattern from Library Growth: empty state for DotGridCanvas surfaces. */
export function EmptyState({
  glyph,
  title,
  reading,
  body,
  action,
  accent = "shikon",
  className,
}: EmptyStateProps) {
  const accentColor = accent in colors.accents ? colors.accents[accent as AccentName] : accent;

  const style: CSSProperties = {
    "--accent": accentColor,
    "--action-shadow": shadowFromAccent(accentColor, "resting"),
  } as CSSProperties;

  return (
    <div
      data-kinari-component="empty-state"
      className={clsx(styles.empty, className)}
      style={style}
    >
      <div className={styles.glyph} aria-hidden="true">
        {glyph}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {reading && (
        <div className={styles.reading} aria-hidden="true">
          {reading}
        </div>
      )}
      {body && <p className={styles.body}>{body}</p>}
      {action && (
        <button
          type="button"
          className={styles.action}
          onClick={action.onClick}
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

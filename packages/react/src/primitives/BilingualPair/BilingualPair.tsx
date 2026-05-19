import { type ReactNode } from "react";
import clsx from "clsx";
import styles from "./BilingualPair.module.css";

export interface BilingualPairProps {
  primary: ReactNode;
  secondary: ReactNode;
  orientation?: "stacked" | "inline";
  primaryLang?: "ja" | "en" | "ko" | "zh";
  size?: "small" | "medium" | "large";
}

const PAIRED_LANG: Record<NonNullable<BilingualPairProps["primaryLang"]>, string> = {
  ja: "en",
  ko: "en",
  zh: "en",
  en: "ja",
};

/** Pattern #06 Bilingual Pair — two languages, one designed typographic unit. */
export function BilingualPair({
  primary,
  secondary,
  orientation = "stacked",
  primaryLang = "ja",
  size = "medium",
}: BilingualPairProps) {
  const secondaryLang = PAIRED_LANG[primaryLang];

  return (
    <span
      data-kinari-component="bilingual-pair"
      className={clsx(styles.pair, styles[orientation], styles[size])}
    >
      <span className={styles.primary} lang={primaryLang}>
        {primary}
      </span>
      <span className={styles.secondary} lang={secondaryLang}>
        {secondary}
      </span>
    </span>
  );
}

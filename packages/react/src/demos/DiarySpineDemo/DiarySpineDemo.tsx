import { useState, type ReactNode } from "react";
import styles from "./DiarySpineDemo.module.css";

export interface DiarySpineEntry {
  id: string;
  sticker: ReactNode;
  detail: ReactNode;
}

export interface DiarySpineDemoProps {
  entries: DiarySpineEntry[];
}

export function DiarySpineDemo({ entries }: DiarySpineDemoProps) {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className={styles.demo}>
      <div className={styles.grid}>
        {entries.map((e) => {
          const isFocused = focused === e.id;
          const isBlurred = focused !== null && !isFocused;
          return (
            <button
              key={e.id}
              type="button"
              data-kinari-element="entry"
              data-entry-id={e.id}
              data-focus={isFocused}
              data-blurred={isBlurred}
              aria-expanded={isFocused}
              className={styles.entry}
              onClick={() => setFocused(isFocused ? null : e.id)}
            >
              {isFocused ? e.detail : e.sticker}
            </button>
          );
        })}
      </div>
    </div>
  );
}

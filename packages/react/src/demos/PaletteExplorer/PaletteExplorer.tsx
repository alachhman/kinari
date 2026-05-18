import { useState } from "react";
import { colors, type AccentName } from "@kinari/tokens";
import { ThreeCircles } from "../../patterns";
import styles from "./PaletteExplorer.module.css";

export interface PaletteExplorerProps {
  defaultAccent?: AccentName;
  allowCustom?: boolean;
}

const ACCENT_NAMES: AccentName[] = [
  "moegi",
  "kakishibu",
  "sakura",
  "asagi",
  "yamabuki",
  "shikon",
];

export function PaletteExplorer({
  defaultAccent = "shikon",
  allowCustom = false,
}: PaletteExplorerProps) {
  const [active, setActive] = useState<AccentName>(defaultAccent);

  return (
    <div
      data-kinari-component="palette-explorer"
      data-active-accent={active}
      className={styles.explorer}
    >
      <div role="radiogroup" aria-label="Accent palette" className={styles.swatches}>
        {ACCENT_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            role="radio"
            aria-checked={active === name}
            aria-label={name}
            data-selected={active === name}
            onClick={() => setActive(name)}
            className={styles.swatch}
            style={{ backgroundColor: colors.accents[name] }}
          />
        ))}
      </div>

      <div className={styles.preview}>
        <ThreeCircles
          accent={active}
          left={{ icon: "✕", label: "discard", onTap: () => {} }}
          center={{ icon: "✓", label: "confirm", onTap: () => {} }}
          right={{ icon: "↻", label: "retry", onTap: () => {} }}
        />
      </div>

      {allowCustom && (
        <div className={styles.customRow}>
          <input
            type="color"
            aria-label="Custom accent"
            onChange={(e) => setActive(e.target.value as AccentName)}
          />
        </div>
      )}
    </div>
  );
}

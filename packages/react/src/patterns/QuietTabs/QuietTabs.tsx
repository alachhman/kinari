import { type CSSProperties, type ReactNode } from "react";
import { colors, type AccentName } from "@kinari/tokens";
import styles from "./QuietTabs.module.css";

export interface QuietTabsTab {
  id: string;
  icon: ReactNode;
  label: string;
  href?: string;
  onSelect?: () => void;
}

export interface QuietTabsProps {
  tabs: QuietTabsTab[];
  active: string;
  accent?: AccentName | string;
  hidden?: boolean;
}

/** Pattern #10 Quiet Tabs — floating icon-only bottom bar for constellation
 *  products. Active tab is a filled pill in the project accent. */
export function QuietTabs({ tabs, active, accent, hidden }: QuietTabsProps) {
  if (hidden) return null;

  const accentColor = accent
    ? accent in colors.accents
      ? colors.accents[accent as AccentName]
      : accent
    : undefined;

  const style: CSSProperties = accentColor ? ({ "--accent": accentColor } as CSSProperties) : {};

  return (
    <nav
      data-kinari-component="quiet-tabs"
      className={styles.bar}
      aria-label="Primary navigation"
      style={style}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const commonProps = {
          "aria-label": tab.label,
          ...(isActive ? { "aria-current": "page" as const } : {}),
          className: styles.tab,
        };

        if (tab.href) {
          return (
            <a
              key={tab.id}
              {...commonProps}
              href={tab.href}
              onClick={tab.onSelect ? () => tab.onSelect!() : undefined}
            >
              {tab.icon}
            </a>
          );
        }
        return (
          <button key={tab.id} {...commonProps} type="button" onClick={tab.onSelect}>
            {tab.icon}
          </button>
        );
      })}
    </nav>
  );
}

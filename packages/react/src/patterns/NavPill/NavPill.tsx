import { useEffect } from "react";
import { BilingualPair } from "../../primitives";
import styles from "./NavPill.module.css";

export interface NavPillStep {
  href: string;
  titleJa: string;
  titleEn: string;
}

export interface NavPillProps {
  steps: NavPillStep[];
  current: number;
  onNavigate?: (index: number, direction: "prev" | "next") => void;
  keyboard?: boolean;
}

/** Pattern #09 Navigation Pill — linear sequence nav. */
export function NavPill({ steps, current, onNavigate, keyboard = true }: NavPillProps) {
  const prev = current > 0 ? current - 1 : null;
  const next = current < steps.length - 1 ? current + 1 : null;
  const currentStep = steps[current];

  useEffect(() => {
    if (!keyboard) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (target?.isContentEditable) return;
      if (e.key === "ArrowLeft" && prev !== null) {
        e.preventDefault();
        onNavigate?.(prev, "prev");
      } else if (e.key === "ArrowRight" && next !== null) {
        e.preventDefault();
        onNavigate?.(next, "next");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onNavigate, keyboard]);

  return (
    <nav
      data-kinari-component="nav-pill"
      className={styles.navPill}
      aria-label="Pattern navigation"
    >
      <a
        className={styles.zone}
        href={prev !== null ? steps[prev]!.href : undefined}
        aria-label="previous step"
        aria-disabled={prev === null}
        onClick={(e) => {
          if (prev === null) e.preventDefault();
          else if (onNavigate) {
            e.preventDefault();
            onNavigate(prev, "prev");
          }
        }}
      >
        <span className={styles.zoneLabel}>← prev</span>
      </a>

      <div className={styles.center}>
        {currentStep && (
          <BilingualPair
            primary={currentStep.titleJa}
            secondary={`${currentStep.titleEn} · ${current + 1}/${steps.length}`}
            orientation="stacked"
            size="small"
          />
        )}
        <div className={styles.dots}>
          {steps.map((_, i) => (
            <span
              key={i}
              data-kinari-component="nav-pill-dot"
              data-active={i === current}
              className={styles.dot}
            />
          ))}
        </div>
      </div>

      <a
        className={styles.zone}
        href={next !== null ? steps[next]!.href : undefined}
        aria-label="next step"
        aria-disabled={next === null}
        onClick={(e) => {
          if (next === null) e.preventDefault();
          else if (onNavigate) {
            e.preventDefault();
            onNavigate(next, "next");
          }
        }}
      >
        <span className={styles.zoneLabel}>next →</span>
      </a>
    </nav>
  );
}

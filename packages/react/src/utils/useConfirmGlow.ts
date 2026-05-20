import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import styles from "./useConfirmGlow.module.css";

export interface UseConfirmGlowOptions {
  /** Color for the radial-gradient center. Default: var(--kaki-iro). */
  color?: string;
  /** Total animation duration (bloom + contract). Default: 300. */
  duration?: number;
}

export interface UseConfirmGlowResult {
  /** Trigger the bloom centered on a target. */
  glow: (target: RefObject<HTMLElement> | DOMRect) => void;
  /** True while the bloom is animating. */
  isGlowing: boolean;
}

/** Returns a centered bloom-and-contract glow effect controllable from anywhere. */
export function useConfirmGlow(opts: UseConfirmGlowOptions = {}): UseConfirmGlowResult {
  const { color, duration = 300 } = opts;
  const [isGlowing, setIsGlowing] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const halfTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazy-mount the portal element on first glow() call.
  const ensurePortal = useCallback((): HTMLDivElement => {
    if (typeof document === "undefined") {
      throw new Error("useConfirmGlow: document is undefined (SSR)");
    }
    if (portalRef.current) return portalRef.current;
    const el = document.createElement("div");
    el.setAttribute("data-kinari-element", "confirm-glow");
    el.className = styles.glow ?? "";
    if (color) el.style.setProperty("--glow-color", color);
    document.body.appendChild(el);
    portalRef.current = el;
    return el;
  }, [color]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (halfTimerRef.current) clearTimeout(halfTimerRef.current);
      if (portalRef.current) {
        portalRef.current.remove();
        portalRef.current = null;
      }
    };
  }, []);

  const glow = useCallback(
    (target: RefObject<HTMLElement> | DOMRect) => {
      let rect: DOMRect;
      if (target instanceof DOMRect) {
        rect = target;
      } else if (target.current) {
        rect = target.current.getBoundingClientRect();
      } else {
        return;
      }

      const el = ensurePortal();
      el.style.left = `${rect.left + rect.width / 2}px`;
      el.style.top = `${rect.top + rect.height / 2}px`;
      el.setAttribute("data-state", "blooming");
      setIsGlowing(true);

      if (halfTimerRef.current) clearTimeout(halfTimerRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);

      halfTimerRef.current = setTimeout(() => {
        el.setAttribute("data-state", "contracting");
      }, duration / 2);

      timerRef.current = setTimeout(() => {
        el.setAttribute("data-state", "idle");
        setIsGlowing(false);
      }, duration);
    },
    [duration, ensurePortal],
  );

  return { glow, isGlowing };
}

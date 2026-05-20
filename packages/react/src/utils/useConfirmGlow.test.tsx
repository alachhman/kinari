import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useConfirmGlow } from "./useConfirmGlow";

describe("useConfirmGlow", () => {
  it("returns isGlowing=false initially", () => {
    const { result } = renderHook(() => useConfirmGlow());
    expect(result.current.isGlowing).toBe(false);
  });

  it("sets isGlowing=true when glow() is called with a DOMRect, then false after duration", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useConfirmGlow({ duration: 300 }));
    const rect = new DOMRect(100, 100, 40, 40);

    act(() => {
      result.current.glow(rect);
    });
    expect(result.current.isGlowing).toBe(true);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current.isGlowing).toBe(false);
    vi.useRealTimers();
  });

  it("mounts a portal element on document.body and cleans up on unmount", () => {
    const { unmount, result } = renderHook(() => useConfirmGlow());
    const rect = new DOMRect(0, 0, 10, 10);
    act(() => {
      result.current.glow(rect);
    });
    expect(document.body.querySelector('[data-kinari-element="confirm-glow"]')).not.toBeNull();
    unmount();
    expect(document.body.querySelector('[data-kinari-element="confirm-glow"]')).toBeNull();
  });
});

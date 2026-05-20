import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CaptureRitualDemo } from "./CaptureRitualDemo";

describe("<CaptureRitualDemo>", () => {
  it("renders a shutter button and corner brackets", () => {
    const { container } = render(<CaptureRitualDemo />);
    expect(container.querySelector('[data-kinari-element="shutter"]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-kinari-element="bracket"]')).toHaveLength(4);
  });

  it("on shutter tap, advances to settled", () => {
    vi.useFakeTimers();
    const { container } = render(<CaptureRitualDemo />);
    fireEvent.click(container.querySelector('[data-kinari-element="shutter"]')!);
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(container.querySelector('[data-state="settled"]')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("replay resets the demo", () => {
    const { container } = render(<CaptureRitualDemo />);
    fireEvent.click(container.querySelector('[data-kinari-element="shutter"]')!);
    fireEvent.click(screen.getByRole("button", { name: /replay/i }));
    expect(container.querySelector('[data-state="idle"]')).toBeInTheDocument();
  });

  it("renders a polite live region for capture announcements", () => {
    const { container } = render(<CaptureRitualDemo />);
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });
});

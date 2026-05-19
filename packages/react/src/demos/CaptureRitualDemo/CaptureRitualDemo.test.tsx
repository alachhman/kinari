import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CaptureRitualDemo } from "./CaptureRitualDemo";

describe("<CaptureRitualDemo>", () => {
  it("renders a shutter button and corner brackets", () => {
    const { container } = render(<CaptureRitualDemo />);
    expect(container.querySelector('[data-kinari-element="shutter"]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-kinari-element="bracket"]')).toHaveLength(4);
  });

  it("on shutter tap, advances to bloom and then to settled", () => {
    const { container } = render(<CaptureRitualDemo />);
    fireEvent.click(container.querySelector('[data-kinari-element="shutter"]')!);
    expect(container.querySelector('[data-state="blooming"]')).toBeInTheDocument();
  });

  it("replay resets the demo", () => {
    const { container } = render(<CaptureRitualDemo />);
    fireEvent.click(container.querySelector('[data-kinari-element="shutter"]')!);
    fireEvent.click(screen.getByRole("button", { name: /replay/i }));
    expect(container.querySelector('[data-state="idle"]')).toBeInTheDocument();
  });
});

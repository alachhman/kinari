import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdjustAffordance } from "./AdjustAffordance";

describe("<AdjustAffordance>", () => {
  it("renders default glyph and label", () => {
    render(<AdjustAffordance onAdjust={() => {}} />);
    expect(screen.getByRole("button", { name: /Adjust/i })).toBeInTheDocument();
    expect(screen.getByText("↻")).toBeInTheDocument();
  });

  it("fires onAdjust on click", () => {
    const onAdjust = vi.fn();
    render(<AdjustAffordance onAdjust={onAdjust} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onAdjust).toHaveBeenCalled();
  });

  it("renders custom label and glyph", () => {
    render(<AdjustAffordance onAdjust={() => {}} label="Refine" glyph={<span>★</span>} />);
    expect(screen.getByRole("button", { name: /Refine/i })).toBeInTheDocument();
    expect(screen.getByText("★")).toBeInTheDocument();
  });

  it("applies size variant via data attribute", () => {
    const { container } = render(<AdjustAffordance onAdjust={() => {}} size="small" />);
    expect(container.firstChild).toHaveAttribute("data-size", "small");
  });
});

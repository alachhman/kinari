import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NumericDisplay } from "./NumericDisplay";

describe("<NumericDisplay>", () => {
  it("renders the value", () => {
    render(<NumericDisplay value={94} />);
    expect(screen.getByText("94")).toBeInTheDocument();
  });

  it("renders the unit beside the value", () => {
    render(<NumericDisplay value={94} unit="kcal" />);
    expect(screen.getByText("kcal")).toBeInTheDocument();
  });

  it("does NOT auto-pluralize by default (P#10 — imperfection is a signature)", () => {
    render(<NumericDisplay value={1} unit="Words" />);
    expect(screen.getByText("Words")).toBeInTheDocument();
    expect(screen.queryByText("Word")).not.toBeInTheDocument();
  });

  it("supports serif font role", () => {
    const { container } = render(<NumericDisplay value={10} font="serif" />);
    expect((container.firstChild as HTMLElement).className).toContain("serif");
  });

  it("applies data-kinari-component='numeric-display'", () => {
    const { container } = render(<NumericDisplay value={1} />);
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "numeric-display");
  });

  it("sets aria-label combining value and unit", () => {
    render(<NumericDisplay value={94} unit="kcal" />);
    const el = screen.getByLabelText("94 kcal");
    expect(el).toBeInTheDocument();
  });
});

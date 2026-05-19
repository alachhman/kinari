import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrincipleChip } from "./PrincipleChip";

describe("<PrincipleChip>", () => {
  it("renders #1 with full title by default", () => {
    render(<PrincipleChip number={1} />);
    expect(screen.getByText(/#1/)).toBeInTheDocument();
    expect(screen.getByText(/Photos supply the color/)).toBeInTheDocument();
  });

  it("renders only #N in number-only variant", () => {
    render(<PrincipleChip number={3} variant="number-only" />);
    expect(screen.getByText("#3")).toBeInTheDocument();
    expect(screen.queryByText(/Capture/)).not.toBeInTheDocument();
  });

  it("defaults href to /principles#NN-slug", () => {
    render(<PrincipleChip number={10} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/principles#10-imperfections-are-signatures",
    );
  });

  it("respects custom href", () => {
    render(<PrincipleChip number={2} href="/custom" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/custom");
  });
});

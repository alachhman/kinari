import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SoftSpringDemo } from "./SoftSpringDemo";

describe("<SoftSpringDemo>", () => {
  it("renders the sticker-settle scenario by default", () => {
    render(<SoftSpringDemo />);
    expect(screen.getByRole("button", { name: /replay/i })).toBeInTheDocument();
  });

  it("supports cascade-order scenario", () => {
    render(<SoftSpringDemo scenario="cascade-order" />);
    expect(screen.getByText(/subject/i)).toBeInTheDocument();
    expect(screen.getByText(/chrome/i)).toBeInTheDocument();
    expect(screen.getByText(/text lands last/i)).toBeInTheDocument();
  });

  it("supports drill-in scenario", () => {
    const { container } = render(<SoftSpringDemo scenario="drill-in" />);
    expect(container.querySelector('[data-kinari-scenario="drill-in"]')).toBeInTheDocument();
  });
});

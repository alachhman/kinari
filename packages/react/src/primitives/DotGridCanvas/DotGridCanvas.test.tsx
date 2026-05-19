import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DotGridCanvas } from "./DotGridCanvas";

describe("<DotGridCanvas>", () => {
  it("renders children", () => {
    render(
      <DotGridCanvas>
        <span>hello</span>
      </DotGridCanvas>,
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies dot-grid variant by default", () => {
    const { container } = render(<DotGridCanvas>x</DotGridCanvas>);
    expect((container.firstChild as HTMLElement).className).toContain("dotGrid");
  });

  it("supports paper-tone variant", () => {
    const { container } = render(<DotGridCanvas variant="paper-tone">x</DotGridCanvas>);
    expect((container.firstChild as HTMLElement).className).toContain("paperTone");
  });
});

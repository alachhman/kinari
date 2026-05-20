import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { ShimmerDust } from "./ShimmerDust";

describe("<ShimmerDust>", () => {
  it("wraps children and adds an overlay", () => {
    const { container } = render(
      <ShimmerDust active={false}>
        <span>inner</span>
      </ShimmerDust>,
    );
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "shimmer-dust");
    expect(container.querySelector('[data-kinari-element="shimmer-overlay"]')).toBeInTheDocument();
  });

  it("sets data-active='true' when active prop is true", () => {
    const { container } = render(
      <ShimmerDust active={true}>
        <span>inner</span>
      </ShimmerDust>,
    );
    expect(container.firstChild).toHaveAttribute("data-active", "true");
  });

  it("sets data-active='false' when not active", () => {
    const { container } = render(
      <ShimmerDust active={false}>
        <span>inner</span>
      </ShimmerDust>,
    );
    expect(container.firstChild).toHaveAttribute("data-active", "false");
  });
});

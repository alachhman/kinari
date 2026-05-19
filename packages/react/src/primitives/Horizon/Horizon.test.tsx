import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Horizon } from "./Horizon";

describe("<Horizon>", () => {
  it("renders a default · center mark", () => {
    render(<Horizon />);
    expect(screen.getByText("·")).toBeInTheDocument();
  });

  it("renders custom mark", () => {
    render(<Horizon mark="原則" />);
    expect(screen.getByText("原則")).toBeInTheDocument();
  });

  it("applies data-kinari-component='horizon'", () => {
    const { container } = render(<Horizon />);
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "horizon");
  });

  it("applies tight/normal/loose spacing classes", () => {
    const { rerender, container } = render(<Horizon spacing="tight" />);
    expect((container.firstChild as HTMLElement).className).toContain("tight");
    rerender(<Horizon spacing="loose" />);
    expect((container.firstChild as HTMLElement).className).toContain("loose");
  });
});

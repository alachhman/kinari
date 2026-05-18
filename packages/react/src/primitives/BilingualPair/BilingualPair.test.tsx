import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BilingualPair } from "./BilingualPair";

describe("<BilingualPair>", () => {
  it("renders both primary and secondary content", () => {
    render(<BilingualPair primary="原則" secondary="gensoku · principles" />);
    expect(screen.getByText("原則")).toBeInTheDocument();
    expect(screen.getByText("gensoku · principles")).toBeInTheDocument();
  });

  it("supports stacked (default) and inline orientations", () => {
    const { rerender, container } = render(
      <BilingualPair primary="A" secondary="b" orientation="stacked" />,
    );
    expect((container.firstChild as HTMLElement).className).toContain("stacked");
    rerender(<BilingualPair primary="A" secondary="b" orientation="inline" />);
    expect((container.firstChild as HTMLElement).className).toContain("inline");
  });

  it("supports small/medium/large sizes", () => {
    const { container } = render(<BilingualPair primary="A" secondary="b" size="large" />);
    expect((container.firstChild as HTMLElement).className).toContain("large");
  });

  it("sets lang attributes on each language slot", () => {
    render(<BilingualPair primary="原則" secondary="gensoku" primaryLang="ja" />);
    expect(screen.getByText("原則")).toHaveAttribute("lang", "ja");
    expect(screen.getByText("gensoku")).toHaveAttribute("lang", "en");
  });
});

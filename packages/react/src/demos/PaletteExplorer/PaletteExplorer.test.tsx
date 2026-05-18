import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaletteExplorer } from "./PaletteExplorer";

describe("<PaletteExplorer>", () => {
  it("renders all six 伝統色 swatches", () => {
    render(<PaletteExplorer />);
    expect(screen.getByLabelText("moegi")).toBeInTheDocument();
    expect(screen.getByLabelText("kakishibu")).toBeInTheDocument();
    expect(screen.getByLabelText("sakura")).toBeInTheDocument();
    expect(screen.getByLabelText("asagi")).toBeInTheDocument();
    expect(screen.getByLabelText("yamabuki")).toBeInTheDocument();
    expect(screen.getByLabelText("shikon")).toBeInTheDocument();
  });

  it("updates the active accent when a swatch is clicked", () => {
    const { container } = render(<PaletteExplorer defaultAccent="shikon" />);
    expect(container.querySelector('[data-active-accent="shikon"]')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("moegi"));
    expect(container.querySelector('[data-active-accent="moegi"]')).toBeInTheDocument();
  });
});

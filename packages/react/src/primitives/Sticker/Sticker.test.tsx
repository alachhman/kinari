import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sticker } from "./Sticker";

describe("<Sticker>", () => {
  it("renders children", () => {
    render(<Sticker>hello</Sticker>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("renders as a div by default", () => {
    const { container } = render(<Sticker>x</Sticker>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as an anchor when as='a' and href is provided", () => {
    render(
      <Sticker as="a" href="/foo">
        link
      </Sticker>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/foo");
  });

  it("renders as a button when as='button'", () => {
    render(
      <Sticker as="button" onClick={() => {}}>
        tap
      </Sticker>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies data-kinari-component='sticker'", () => {
    const { container } = render(<Sticker>x</Sticker>);
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "sticker");
  });

  it("applies a custom rotation when passed", () => {
    const { container } = render(<Sticker rotation={2.5}>x</Sticker>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue("--sticker-rotation")).toBe("2.5deg");
  });

  it("uses a stable rotation per mount when none is passed", () => {
    const { container, rerender } = render(<Sticker>x</Sticker>);
    const first = (container.firstChild as HTMLElement).style.getPropertyValue(
      "--sticker-rotation",
    );
    rerender(<Sticker>y</Sticker>);
    const second = (container.firstChild as HTMLElement).style.getPropertyValue(
      "--sticker-rotation",
    );
    expect(first).toBe(second);
  });
});

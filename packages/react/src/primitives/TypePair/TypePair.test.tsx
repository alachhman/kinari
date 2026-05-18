import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Display, Label, Body } from "./TypePair";

describe("type-role components", () => {
  it("Display renders as h2 by default", () => {
    render(<Display>title</Display>);
    expect(screen.getByText("title").tagName).toBe("H2");
  });

  it("Label renders as span by default with chunky weight", () => {
    render(<Label>label</Label>);
    expect(screen.getByText("label").tagName).toBe("SPAN");
  });

  it("Body renders as div by default", () => {
    render(<Body>body</Body>);
    expect(screen.getByText("body").tagName).toBe("DIV");
  });

  it("each accepts an `as` override", () => {
    render(<Display as="h1">h1 title</Display>);
    expect(screen.getByText("h1 title").tagName).toBe("H1");
  });
});

import { describe, expect, it } from "vitest";
import { type } from "./type";

describe("type roles", () => {
  it("exposes the four roles plus numericSerif variant", () => {
    expect(type.display).toBeDefined();
    expect(type.label).toBeDefined();
    expect(type.body).toBeDefined();
    expect(type.numericSans).toBeDefined();
    expect(type.numericSerif).toBeDefined();
  });

  it("display is serif weight 600", () => {
    expect(type.display.family).toMatch(/Georgia/);
    expect(type.display.weight).toBe(600);
  });

  it("numericSans is heavy italic with negative letter-spacing", () => {
    expect(type.numericSans.weight).toBe(800);
    expect(type.numericSans.italic).toBe(true);
    expect(type.numericSans.letterSpacing).toBe("-0.03em");
  });
});

import { describe, expect, it } from "vitest";
import { shadow, shadowFromAccent } from "./shadow";

describe("shadow recipes", () => {
  it("exposes umber shadow set for white/near-white elements", () => {
    expect(shadow.umber.contact).toContain("rgba(72,55,32");
    expect(shadow.umber.resting).toContain("rgba(72,55,32");
    expect(shadow.umber.floating).toContain("rgba(72,55,32");
  });

  it("exposes sumi shadow set for dark-on-paper elements", () => {
    expect(shadow.sumi.resting).toContain("rgba(26,26,26");
  });

  it("all umber recipes cast to lower-right (positive offsets)", () => {
    // Spec §03 rule 2: offset-x and offset-y both positive
    const checkOffsets = (shadowStr: string) => {
      const layers = shadowStr.split("),").map((l) => l.trim());
      for (const layer of layers) {
        const match = layer.match(/^(-?\d+)px\s+(-?\d+)px/);
        if (match) {
          const [, x, y] = match;
          expect(Number(x)).toBeGreaterThanOrEqual(0);
          expect(Number(y)).toBeGreaterThanOrEqual(0);
        }
      }
    };
    checkOffsets(shadow.umber.contact);
    checkOffsets(shadow.umber.resting);
    checkOffsets(shadow.umber.floating);
  });
});

describe("shadowFromAccent", () => {
  it("returns a shadow string with the accent's hue at ~45% alpha", () => {
    const shikon = shadowFromAccent("#5B3D6E");
    expect(shikon).toMatch(/rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/);
    // Should mention the shikon RGB approximately (91, 61, 110)
    expect(shikon).toMatch(/rgba\(9[0-5],/);
  });

  it("supports lift levels", () => {
    const contact = shadowFromAccent("#5B3D6E", "contact");
    const resting = shadowFromAccent("#5B3D6E", "resting");
    const floating = shadowFromAccent("#5B3D6E", "floating");

    // Floating should have at least as many layers as resting, which has more than contact
    const contactLayers = contact.split(",").length;
    const restingLayers = resting.split(",").length;
    const floatingLayers = floating.split(",").length;
    expect(restingLayers).toBeGreaterThanOrEqual(contactLayers);
    expect(floatingLayers).toBeGreaterThanOrEqual(restingLayers);
  });

  it("throws on invalid hex input", () => {
    expect(() => shadowFromAccent("not-a-color")).toThrow();
  });
});

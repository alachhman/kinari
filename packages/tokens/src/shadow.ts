import { parse, formatRgb } from "culori";

export const shadow = {
  /** White / near-white elements drop warm umber shadows.
   *  Per Visual Language §03 Rule 1. */
  umber: {
    contact: "2px 2px 0 rgba(72,55,32,0.07)",
    resting:
      "4px 4px 0 rgba(72,55,32,0.07), 10px 18px 30px rgba(72,55,32,0.10), 18px 30px 48px rgba(72,55,32,0.06)",
    floating:
      "6px 6px 0 rgba(72,55,32,0.08), 14px 26px 40px rgba(72,55,32,0.13), 22px 36px 56px rgba(72,55,32,0.08)",
  },

  /** Sumi-on-paper elements (dark cards) drop deeper sumi shadows. */
  sumi: {
    resting: "4px 5px 0 rgba(26,26,26,0.18), 10px 16px 24px rgba(26,26,26,0.24)",
  },
} as const;

export type ShadowLift = "contact" | "resting" | "floating";

/**
 * Generate a colored shadow for elements drawn in an accent hue.
 * Per Visual Language §03 Rule 1: "Colored elements drop shadows in their
 * own hue at ~40–55% alpha."
 */
export function shadowFromAccent(hex: string, lift: ShadowLift = "resting"): string {
  const parsed = parse(hex);
  if (!parsed) {
    throw new Error(`shadowFromAccent: cannot parse color "${hex}"`);
  }

  // Extract RGB 0–255
  const rgbStr = formatRgb(parsed);
  // formatRgb returns "rgb(91, 61, 110)" — parse it back to numbers
  const match = rgbStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) {
    throw new Error(`shadowFromAccent: unexpected rgb format "${rgbStr}"`);
  }
  const [, r, g, b] = match;

  const rgbaAt = (alpha: number) => `rgba(${r},${g},${b},${alpha.toFixed(2)})`;

  switch (lift) {
    case "contact":
      return `2px 2px 0 ${rgbaAt(0.18)}`;
    case "floating":
      return `6px 6px 0 ${rgbaAt(0.45)}, 14px 26px 40px ${rgbaAt(0.4)}, 22px 36px 56px ${rgbaAt(0.2)}`;
    case "resting":
    default:
      return `4px 5px 0 ${rgbaAt(0.18)}, 8px 14px 24px ${rgbaAt(0.4)}, 16px 26px 38px ${rgbaAt(0.18)}`;
  }
}

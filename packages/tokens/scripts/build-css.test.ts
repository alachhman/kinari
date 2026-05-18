import { describe, expect, it } from "vitest";
import { readFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildTokensCss } from "./build-css";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "dist");
const outPath = join(outDir, "tokens.css");

describe("buildTokensCss", () => {
  it("produces a tokens.css file containing all core colors", () => {
    if (existsSync(outDir)) rmSync(outDir, { recursive: true });
    mkdirSync(outDir, { recursive: true });

    buildTokensCss(outPath);

    expect(existsSync(outPath)).toBe(true);
    const css = readFileSync(outPath, "utf8");

    expect(css).toContain("--kinari: #f7f5f0");
    expect(css).toContain("--sumi: #1a1a1a");
    expect(css).toContain("--kaki-iro: #d97a3c");
    expect(css).toContain("--shiro: #ffffff");
  });

  it("includes the six accents", () => {
    buildTokensCss(outPath);
    const css = readFileSync(outPath, "utf8");
    expect(css).toContain("--moegi: #7DAE5C");
    expect(css).toContain("--shikon: #5B3D6E");
  });

  it("includes ease-tawami and durations", () => {
    buildTokensCss(outPath);
    const css = readFileSync(outPath, "utf8");
    expect(css).toContain("--ease-tawami: cubic-bezier(0.22, 0.61, 0.36, 1)");
    expect(css).toContain("--duration-sticker: 240ms");
  });

  it("includes umber shadow recipes verbatim", () => {
    buildTokensCss(outPath);
    const css = readFileSync(outPath, "utf8");
    expect(css).toContain("--shadow-umber-resting:");
    expect(css).toContain("rgba(72,55,32,0.07)");
  });

  it("wraps everything in :root { }", () => {
    buildTokensCss(outPath);
    const css = readFileSync(outPath, "utf8");
    expect(css.trim().startsWith(":root {")).toBe(true);
    expect(css.trim().endsWith("}")).toBe(true);
  });
});

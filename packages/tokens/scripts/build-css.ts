import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { colors } from "../src/colors";
import { motion } from "../src/motion";
import { shadow } from "../src/shadow";
import { spacing } from "../src/spacing";

const here = dirname(fileURLToPath(import.meta.url));
const defaultOut = resolve(here, "..", "dist", "tokens.css");

/** Generate the `:root { --... }` CSS variables block. Exported for tests. */
export function buildTokensCss(outPath: string = defaultOut): void {
  const lines: string[] = [":root {"];

  // Core colors
  lines.push(`  --kinari: ${colors.kinari};`);
  lines.push(`  --sumi: ${colors.sumi};`);
  lines.push(`  --kaki-iro: ${colors.kakiIro};`);
  lines.push(`  --shiro: ${colors.shiro};`);
  lines.push(`  --paper-tone: ${colors.paperTone};`);
  lines.push(`  --sumi-soft: ${colors.sumiSoft};`);
  lines.push(`  --sumi-muted: ${colors.sumiMuted};`);
  lines.push(`  --sumi-mute: ${colors.sumiMute};`);

  // Accent palette
  for (const [name, hex] of Object.entries(colors.accents)) {
    lines.push(`  --${name}: ${hex};`);
  }

  // Motion
  lines.push(`  --ease-tawami: ${motion.easeTawami};`);
  lines.push(`  --duration-sticker: ${motion.duration.stickerTransform}ms;`);
  lines.push(`  --duration-chip: ${motion.duration.chipSlide}ms;`);
  lines.push(`  --duration-cross-fade: ${motion.duration.crossFade}ms;`);
  lines.push(`  --duration-drill-in: ${motion.duration.drillIn}ms;`);
  lines.push(`  --duration-label-land: ${motion.duration.labelLand}ms;`);
  lines.push(`  --duration-glow-bloom: ${motion.duration.glowBloom}ms;`);
  lines.push(`  --duration-glow-contract: ${motion.duration.glowContract}ms;`);
  lines.push(`  --duration-ai-shimmer: ${motion.duration.aiShimmer}ms;`);

  // Shadow recipes
  lines.push(`  --shadow-umber-contact: ${shadow.umber.contact};`);
  lines.push(`  --shadow-umber-resting: ${shadow.umber.resting};`);
  lines.push(`  --shadow-umber-floating: ${shadow.umber.floating};`);
  lines.push(`  --shadow-sumi-resting: ${shadow.sumi.resting};`);

  // Spacing
  lines.push(`  --space-page-vertical: ${spacing.pageVertical};`);
  lines.push(`  --space-section-gap: ${spacing.sectionGap};`);
  lines.push(`  --space-sticker-gap: ${spacing.stickerGap};`);
  lines.push(`  --space-content-sticker: ${spacing.contentSticker};`);
  lines.push(`  --space-content-reading: ${spacing.contentReading};`);
  lines.push(`  --space-nav-pill-offset: ${spacing.navPillOffset};`);
  lines.push(`  --space-nav-pill-reserve: ${spacing.navPillReserve};`);

  lines.push("}");
  lines.push("");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, lines.join("\n"), "utf8");
}

// Run directly via `pnpm build`
if (import.meta.url === `file://${process.argv[1]}`) {
  buildTokensCss();
  console.log(`Generated ${defaultOut}`);
}

# Kinari Library + Site — Design Spec

**Date:** 2026-05-18
**Status:** Approved through brainstorming; ready for implementation planning
**Phase:** v0.1 of `@kinari/tokens`, `@kinari/react`, and `apps/site` (the public reference site)
**Supersedes:** The "Phase 3 — Public static site" line item in [2026-05-18-kinari-framework-design.md](2026-05-18-kinari-framework-design.md), which is now realized as the combined library + site delivered here.

---

## Goal

Build the first **code reference implementation** of the Kinari framework for the web, and a public **reference site** that demonstrates it. The markdown framework at [`docs/`](../../) remains the source of truth; this spec describes the code artifacts that consume and render it.

Two artifacts ship in lockstep at v0.1:

1. **`@kinari/tokens`** — platform-agnostic design tokens (colors, motion easing, spacing, shadow recipes, type scale). JS + auto-generated CSS variables. Future packages (React Native, SwiftUI, Figma plugin) consume the same tokens.
2. **`@kinari/react`** — web reference implementation. React 19 + TypeScript + CSS Modules. Ships visual primitives, working pattern components, and interactive demo components.
3. **`apps/site`** — Astro 5 reference site at the framework's eventual public URL. Consumes `@kinari/tokens` + `@kinari/react`. Renders the existing markdown docs in Kinari's own visual language.

## Non-goals (v0.1)

- React Native or SwiftUI packages. Deferred until an iOS/mobile project earns them.
- npm publishing. Workspace-internal consumption only.
- Dark mode. Kinari is paper-on-light by design.
- Internationalization. Framework docs are English with Japanese as a designed visual element; prose is not translated.
- Storybook. The reference site doubles as the showcase.
- Newsletter / analytics / comments / RSS / "edit on GitHub" / version selector.
- Server-side anything. Site is fully static.

---

## Decisions ledger (resolved during brainstorming)

| Question | Decision |
|---|---|
| Library scope | Web reference implementation now; shared tokens prepared for future iOS |
| Package shape | `@kinari/tokens` + `@kinari/react`, separate but versioned in lockstep |
| Monorepo tooling | pnpm workspaces; flat `packages/` + `apps/`; no Turborepo for v0.1 |
| Styling approach | CSS Modules + CSS variables sourced from `@kinari/tokens` |
| React version | React 19 stable |
| Site stack | Astro 5; markdown read in-place from `../../docs/` via `glob()` loader |
| Site accent color | 紫紺 *shikon* `#5B3D6E` |
| Homepage shape | "Reference Dense" — compact hero, inline section previews with example items |
| Pattern detail shape | "Sticker-Rich Showpiece" — every callout is its own sticker, three-up "Across media" row |
| Site nav model | Hub-and-spokes with Pattern #09 Navigation Pill on the 12 pattern detail pages |
| Interactive demos | Full suite — 6 demo components covering motion, capture, subject lift, drill-in, palette, easing |
| Site search | Pagefind, lazy-loaded, ⌘K / Ctrl+K |
| Hosting | GitHub Pages from this repo, deployed via Actions on push to `master` |
| Tokens CSS source | Generated from JS by a build script (<50 LOC) |
| Pre-commit hooks | `simple-git-hooks` (lighter than Husky) |
| Light/dark | Light only — intentional |

---

## Architecture overview

```
kinari/  (single monorepo)
├─ docs/                              ← framework markdown, source of truth (unchanged)
├─ packages/
│   ├─ tokens/                        ← @kinari/tokens
│   └─ react/                         ← @kinari/react
└─ apps/
    └─ site/                          ← @kinari/site (private, Astro)
```

**Build order:** tokens → react → site. Each layer earns the next.

**Data flow:**
- `docs/*.md` → Astro content collections in `apps/site` → custom remark plugin transforms idioms into `<PrincipleChip />`, `<BilingualPair />`, etc. → static HTML pages → Pagefind indexes the built site → deployed to GitHub Pages.
- `packages/tokens` is the only place colors, motion easing, shadows, spacing, and type roles are defined. `tokens.css` is generated from the TS files at build time.
- `packages/react` imports from `@kinari/tokens` (workspace dep). The site imports both.

**The framework eats its own dogfood:** the site is built in the patterns it documents. The Navigation Pill on pattern detail pages is `<NavPill>` from `@kinari/react`, not a one-off.

---

## Repository layout

```
kinari/
├─ README.md
├─ CHANGELOG.md
├─ package.json                       ← workspace root
├─ pnpm-workspace.yaml
├─ tsconfig.base.json                 ← strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes
├─ .changeset/                        ← reserved; not used until first publish
├─ .github/workflows/
│   ├─ ci.yml                         ← lint, typecheck, test, visual diff, bundle-size check
│   └─ deploy.yml                     ← GitHub Pages deploy on push to master
│
├─ docs/                              ← unchanged: principles.md, visual-language.md, lineage.md, patterns/
│
├─ packages/
│   ├─ tokens/
│   │   ├─ package.json               ← "name": "@kinari/tokens"
│   │   ├─ src/
│   │   │   ├─ index.ts
│   │   │   ├─ colors.ts
│   │   │   ├─ motion.ts
│   │   │   ├─ spacing.ts
│   │   │   ├─ type.ts
│   │   │   ├─ shadow.ts
│   │   │   └─ cssvar.ts              ← typed helper: cssvar("shikon") → "var(--shikon)"
│   │   ├─ scripts/
│   │   │   └─ build-css.ts           ← reads ./src, emits dist/tokens.css
│   │   ├─ dist/                      ← generated; gitignored
│   │   │   └─ tokens.css
│   │   └─ README.md
│   │
│   └─ react/
│       ├─ package.json               ← "name": "@kinari/react"
│       ├─ src/
│       │   ├─ index.ts               ← public barrel
│       │   ├─ primitives/
│       │   │   ├─ Sticker/{Sticker.tsx, Sticker.module.css, Sticker.test.tsx, index.ts}
│       │   │   ├─ Horizon/
│       │   │   ├─ BilingualPair/
│       │   │   ├─ NumericDisplay/
│       │   │   ├─ PrincipleChip/
│       │   │   ├─ DotGridCanvas/
│       │   │   └─ TypePair/
│       │   ├─ patterns/
│       │   │   ├─ NavPill/
│       │   │   ├─ QuietTabs/
│       │   │   ├─ SingleButton/
│       │   │   └─ ThreeCircles/
│       │   ├─ demos/
│       │   │   ├─ SoftSpringDemo/
│       │   │   ├─ CaptureRitualDemo/
│       │   │   ├─ SubjectLiftDemo/
│       │   │   ├─ DiarySpineDemo/
│       │   │   ├─ PaletteExplorer/
│       │   │   ├─ MotionEasingExplorer/
│       │   │   └─ assets/            ← sample images (apple, donut, etc.) used by demos
│       │   └─ utils/
│       │       ├─ usePrefersReducedMotion.ts
│       │       └─ shadowFromAccent.ts ← OKLCH-based helper
│       └─ README.md
│
└─ apps/
    └─ site/
        ├─ package.json               ← "name": "@kinari/site", "private": true
        ├─ astro.config.mjs
        ├─ tsconfig.json
        ├─ public/
        │   ├─ favicon.svg
        │   ├─ og-image.png
        │   └─ pagefind/              ← generated post-build by Pagefind CLI
        └─ src/
            ├─ content/
            │   └─ config.ts          ← Astro content collections with glob() loader
            ├─ pages/
            │   ├─ index.astro
            │   ├─ principles.astro
            │   ├─ visual-language.astro
            │   ├─ lineage.astro
            │   └─ patterns/
            │       ├─ index.astro
            │       └─ [slug].astro
            ├─ layouts/
            │   ├─ Base.astro
            │   ├─ Doc.astro
            │   └─ PatternPage.astro
            ├─ components/             ← site-specific (not for library)
            │   ├─ SearchTrigger.astro
            │   └─ SiteHeader.astro
            ├─ plugins/
            │   ├─ remark-principle-chip.ts
            │   ├─ remark-bilingual-headers.ts
            │   └─ remark-demo-islands.ts
            └─ styles/
                └─ site.css           ← page layouts only; visual language comes from @kinari/tokens
```

**Public surface of `@kinari/react`:**

```ts
// packages/react/src/index.ts
export {
  Sticker, Horizon, BilingualPair, NumericDisplay,
  PrincipleChip, DotGridCanvas, TypePair,
  Display, Label, Body, Numeric,
} from "./primitives";

export { NavPill, QuietTabs, SingleButton, ThreeCircles } from "./patterns";

// Separate barrel so consumers can tree-shake demos out
export * as demos from "./demos";

export { usePrefersReducedMotion, shadowFromAccent } from "./utils";
```

---

## `@kinari/tokens` — design

### Public API

```ts
// colors.ts
export type AccentName = "moegi" | "kakishibu" | "sakura" | "asagi" | "yamabuki" | "shikon";

export const colors = {
  kinari:    "#f7f5f0",
  sumi:      "#1a1a1a",
  kakiIro:   "#d97a3c",
  shiro:     "#ffffff",
  paperTone: "#f4ede0",
  sumiSoft:  "#2a2a2a",
  sumiMuted: "#6b6b6b",
  sumiMute:  "#8a8a8a",
  accents: {
    moegi:     "#7DAE5C",
    kakishibu: "#B5683A",
    sakura:    "#E08596",
    asagi:     "#4FA9AA",
    yamabuki:  "#D4A12B",
    shikon:    "#5B3D6E",
  },
} as const;

// motion.ts
export const motion = {
  easeTawami: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  duration: {
    chipSlide: 180, stickerTransform: 240, crossFade: 200,
    drillIn: 280, labelLand: 160, glowBloom: 150, glowContract: 150,
    aiShimmer: 700, fluidQuantity: 500,
  },
  cascade: { subjectDelay: 0, chromeDelay: 80, textDelay: 160 },
} as const;

// shadow.ts
export const shadow = {
  umber: {
    contact:  "2px 2px 0 rgba(72,55,32,0.07)",
    resting:  "4px 4px 0 rgba(72,55,32,0.07), 10px 18px 30px rgba(72,55,32,0.10), 18px 30px 48px rgba(72,55,32,0.06)",
    floating: "6px 6px 0 rgba(72,55,32,0.08), 14px 26px 40px rgba(72,55,32,0.13), 22px 36px 56px rgba(72,55,32,0.08)",
  },
  sumi: {
    resting: "4px 5px 0 rgba(26,26,26,0.18), 10px 16px 24px rgba(26,26,26,0.24)",
  },
} as const;

// spacing.ts
export const spacing = {
  pageVertical:   "60px",
  sectionGap:     "40px",
  stickerGap:     "20px",
  contentSticker: "880px",
  contentReading: "720px",
  navPillOffset:  "18px",
  navPillReserve: "130px",
} as const;

// type.ts
export const type = {
  display: { family: 'Georgia, "Newsreader", "Tiempos", "Source Serif 4", serif', weight: 600, italic: false },
  label:   { family: '-apple-system, "SF Pro Text", "Inter", system-ui, sans-serif', weight: 800, letterSpacing: "-0.01em" },
  body:    { family: '-apple-system, "SF Pro Text", "Inter", system-ui, sans-serif', weight: 400, lineHeight: 1.55 },
  numericSans:  { family: '-apple-system, "SF Pro Text", system-ui, sans-serif', weight: 800, italic: true, letterSpacing: "-0.03em" },
  numericSerif: { family: 'Georgia, "Newsreader", serif', weight: 600, italic: true },
} as const;

// cssvar.ts — typed helper
type Vars =
  | "kinari" | "sumi" | "kaki-iro" | "shiro" | "paper-tone"
  | "sumi-soft" | "sumi-muted" | "sumi-mute"
  | "moegi" | "kakishibu" | "sakura" | "asagi" | "yamabuki" | "shikon"
  | "ease-tawami"
  | "shadow-umber-contact" | "shadow-umber-resting" | "shadow-umber-floating"
  | "shadow-sumi-resting";
export function cssvar(name: Vars): string { return `var(--${name})`; }
```

### Generated CSS

`scripts/build-css.ts` (≤50 LOC) reads the TS exports and emits `dist/tokens.css`:

```css
:root {
  --kinari: #f7f5f0;
  --sumi: #1a1a1a;
  --kaki-iro: #d97a3c;
  --shiro: #ffffff;
  --paper-tone: #f4ede0;
  --sumi-soft: #2a2a2a;
  --sumi-muted: #6b6b6b;
  --sumi-mute: #8a8a8a;
  --moegi: #7DAE5C;
  --kakishibu: #B5683A;
  --sakura: #E08596;
  --asagi: #4FA9AA;
  --yamabuki: #D4A12B;
  --shikon: #5B3D6E;
  --ease-tawami: cubic-bezier(0.22, 0.61, 0.36, 1);
  --duration-sticker: 240ms;
  --duration-chip: 180ms;
  --duration-cross-fade: 200ms;
  --duration-drill-in: 280ms;
  --duration-label-land: 160ms;
  --duration-glow-bloom: 150ms;
  --duration-glow-contract: 150ms;
  --duration-ai-shimmer: 700ms;
  --shadow-umber-contact: 2px 2px 0 rgba(72,55,32,0.07);
  --shadow-umber-resting: 4px 4px 0 rgba(72,55,32,0.07), 10px 18px 30px rgba(72,55,32,0.10), 18px 30px 48px rgba(72,55,32,0.06);
  --shadow-umber-floating: 6px 6px 0 rgba(72,55,32,0.08), 14px 26px 40px rgba(72,55,32,0.13), 22px 36px 56px rgba(72,55,32,0.08);
  --shadow-sumi-resting: 4px 5px 0 rgba(26,26,26,0.18), 10px 16px 24px rgba(26,26,26,0.24);
}
```

### Build & lifecycle

- `pnpm --filter @kinari/tokens build` — runs `build-css.ts`, emits `dist/`.
- `pnpm --filter @kinari/tokens dev` — watch mode; regenerates `tokens.css` on TS changes.
- Tokens package exports both ESM (`dist/index.js`) and TS source (`src/index.ts`). For in-repo workspace consumption, TS source is used directly via path mapping (no compile step needed). The published-to-npm story (future) adds `tsup` for ESM/CJS dual emit.
- `package.json` exports map:
  ```json
  "exports": {
    ".": { "import": "./src/index.ts", "types": "./src/index.ts" },
    "./tokens.css": "./dist/tokens.css"
  }
  ```

---

## `@kinari/react` — visual primitives (7 components)

Detailed APIs follow. Every primitive obeys these common rules:

- **Strict TypeScript:** `interface`s are exported; no `any`.
- **CSS Modules:** one `.module.css` per component, scoped automatically.
- **Accessibility default:** visible focus rings in `var(--shikon)` (or configured site accent), `aria-label`s on decorative kanji.
- **Reduced motion:** `usePrefersReducedMotion` hook gates animations and rotations; under reduced motion, components render the end state instantly.
- **No global side effects:** no portals, no global event listeners except where explicitly required (e.g., `<NavPill>` keyboard handler, scoped to its own focus context).
- **`data-kinari-component="<name>"`** on the root element so consumers can scope additional CSS.

### `<Sticker>`

```ts
export interface StickerProps {
  children: React.ReactNode;
  rotation?: number;                    // default: stable randomized within ±1.2°
  lift?: "resting" | "floating";        // default: "resting"
  accent?: AccentName | string;         // when set, shadow uses shadowFromAccent
  variant?: "die-cut" | "polaroid";     // default: "die-cut"
  as?: "div" | "a" | "button";          // default: "div"
  href?: string;                        // required when as="a"
  onClick?: () => void;                 // required when as="button"
  className?: string;
}
```

Hover straightens to `0deg` and lifts along the upper-left diagonal. Rotation is seeded once per mount via a `useRef(useMemo(...))` pattern so re-renders don't re-roll.

### `<Horizon>`

```ts
export interface HorizonProps {
  mark?: React.ReactNode;               // default: "·"
  spacing?: "tight" | "normal" | "loose"; // default: "normal" (40px = sectionGap)
}
```

Hairline gradient + center mark. Pure CSS.

### `<BilingualPair>`

```ts
export interface BilingualPairProps {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  orientation?: "stacked" | "inline";   // default: "stacked"
  primaryLang?: "ja" | "en" | "ko" | "zh"; // default: "ja"
  size?: "small" | "medium" | "large";  // default: "medium"
}
```

Weight ratio is fixed: serif 600 above sans 700 letter-spaced uppercase. Locale swap changes content, not visual relationship.

### `<NumericDisplay>`

```ts
export interface NumericDisplayProps {
  value: number | string;
  unit?: string;
  accent?: AccentName | string;         // default: kakiIro
  font?: "sans" | "serif";              // default: "sans"
  pluralize?: boolean;                  // default: false — Kinari celebrates the imperfection (P#10)
}
```

Heavy italic, `font-variant-numeric: tabular-nums` built in.

### `<PrincipleChip>`

```ts
export interface PrincipleChipProps {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  variant?: "number-only" | "full";     // default: "full"
  href?: string;                        // default: /principles#NN-slug
}
```

Internal lookup table `PRINCIPLES: Record<1..10, { slug, name }>` lives in `packages/react/src/primitives/PrincipleChip/principles.ts`. If the markdown framework's principle names change, this table updates.

### `<DotGridCanvas>`

```ts
export interface DotGridCanvasProps {
  children: React.ReactNode;
  variant?: "dot-grid" | "paper-tone";  // default: "dot-grid"
  spacing?: number;                     // default: 14
  className?: string;
}
```

### `<TypePair>` + helpers

```ts
export const Display: React.FC<TypeRoleProps>;
export const Label:   React.FC<TypeRoleProps>;
export const Body:    React.FC<TypeRoleProps>;
export const Numeric: React.FC<NumericDisplayProps>; // re-export

interface TypeRoleProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;     // default: "div" for Body, "h2" for Display, "span" for Label
  className?: string;
}
```

---

## `@kinari/react` — working pattern components (4 components)

### `<NavPill>` — Pattern #09

```ts
export interface NavPillStep {
  href: string;
  titleJa: string;
  titleEn: string;
}

export interface NavPillProps {
  steps: NavPillStep[];
  current: number;
  onNavigate?: (index: number, direction: "prev" | "next") => void;
  keyboard?: boolean;                   // default: true
  accent?: AccentName | string;
}
```

Three-zone bottom-fixed pill: `← prev | breadcrumb + dot strip | next →`. Slight `rotate(-0.3deg)`. Below 600px width collapses to icon-only. Keyboard: ←/→, 1–9, Home/End — listener scoped to document but bypassed when focus is inside a `<input>`/`<textarea>`/`[contenteditable]`.

### `<QuietTabs>` — Pattern #10

```ts
export interface QuietTabsTab {
  id: string;
  icon: React.ReactNode;
  label: string;                        // aria-label only; no visible text
  href?: string;
  onSelect?: () => void;
}

export interface QuietTabsProps {
  tabs: QuietTabsTab[];                 // 3–5 enforced by TS template-literal types
  active: string;
  accent?: AccentName | string;
  hidden?: boolean;
}

QuietTabs.LeftRail: React.FC<QuietTabsProps>;  // ≥720px alt layout
```

Sliding accent pill, 140ms `--ease-tawami`. `hidden` triggers page-replace (instant disappear, no fade — per framework rule).

### `<SingleButton>` — Pattern #11

```ts
export interface SingleButtonProps {
  shape: React.ReactNode;               // the invariant branded shape (consumer-provided)
  onTap: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  satellites?: React.ReactNode;
  size?: 56 | 64 | 72;                  // default: 72
  spendAnimation?: boolean;             // default: true
}
```

No default shape — Pattern #11's whole point is that the shape is the brand. Tap-spent fade is the only motion; shape never animates on context change.

### `<ThreeCircles>` — Pattern #12

```ts
export interface ThreeCirclesAction {
  icon: React.ReactNode;
  label: string;                        // aria-label
  onTap: () => void;
}

export interface ThreeCirclesProps {
  left:   ThreeCirclesAction;
  center: ThreeCirclesAction;           // affirmative; always accented; 60pt
  right:  ThreeCirclesAction;
  accent?: AccentName | string;
}
```

Center 60pt with `shadowFromAccent(accent)`; flanks 48pt in paper-white with sumi glyphs. The three-slot API makes "four buttons" or "dropdown collapse" impossible by construction.

---

## `@kinari/react` — interactive demo components (6 components)

All demos:
- Live in `packages/react/src/demos/` and are re-exported via `import * as demos from "@kinari/react/demos"` (separate barrel for tree-shaking).
- Accept an optional `replay` button slot.
- Respect `prefers-reduced-motion` by rendering the end state with a small "motion reduced" notice.
- Have a **combined bundle-size budget of ≤40KB minified+gzipped including assets**. CI fails if exceeded.

### `<SoftSpringDemo>` — Pattern #08 motion sandbox

```ts
export interface SoftSpringDemoProps {
  scenario?: "sticker-settle" | "cascade-order" | "drill-in" | "all";
  showEasingComparison?: boolean;
}
```

With `showEasingComparison`, runs three boxes side-by-side: `--ease-tawami` (correct), spring with overshoot (wrong), linear (wrong). Cascade-order scenario shows subject → chrome → text with the 160ms text delay labeled.

### `<CaptureRitualDemo>` — Pattern #03

```ts
export interface CaptureRitualDemoProps {
  subject?: React.ReactNode;            // default: apple cutout from assets
  accent?: AccentName | string;
}
```

Corner brackets + shutter circle + two-stage bloom glow. ~600ms total. Replay button below.

### `<SubjectLiftDemo>` — Pattern #05

```ts
export interface SubjectLiftDemoProps {
  src: string;                          // pre-masked subject image
  context: string;                      // background scene
}
```

~30 shimmer particles via Canvas 2D over ~700ms; cutout sticker emerges with bloom glow. **No real ML** — shows the vocabulary, not the technology.

### `<DiarySpineDemo>` — Pattern #04

```ts
export interface DiarySpineDemoProps {
  entries: Array<{ id: string; sticker: React.ReactNode; detail: React.ReactNode }>;
}
```

Sticker wall of 4 entries. Tap drills in: target scales to 1.4×, siblings shrink and Gaussian-blur in place, chrome blurs to white. Tap again to return.

### `<PaletteExplorer>` — Visual Language §02

```ts
export interface PaletteExplorerProps {
  defaultAccent?: AccentName;           // default: "shikon"
  allowCustom?: boolean;                // default: false
}
```

Click a swatch; the embedded preview (sample `<QuietTabs>`, `<ThreeCircles>`, `<Sticker>`) recolors. `allowCustom: true` shows a hex input.

### `<MotionEasingExplorer>`

```ts
export interface MotionEasingExplorerProps {
  mode?: "comparison" | "explore";      // default: "comparison"
}
```

Two animating boxes side by side: correct soft-out vs. bouncy spring. `mode: "explore"` exposes duration / damping sliders.

---

## `apps/site` — page inventory & layouts

### Routes (17 total)

| Route | Layout | Source | Demo islands |
|---|---|---|---|
| `/` | `Home.astro` | Hand-laid + counts pulled from collections | none |
| `/principles/` | `Doc.astro` | `docs/principles.md` | none |
| `/visual-language/` | `Doc.astro` | `docs/visual-language.md` | `<PaletteExplorer>` in §02, `<MotionEasingExplorer>` in §08 |
| `/lineage/` | `Doc.astro` | `docs/lineage.md` | none |
| `/patterns/` | `PatternIndex.astro` | `docs/patterns/_index.md` | none |
| `/patterns/01-sticker-primitive/` | `PatternPage.astro` | `docs/patterns/01-…md` | none |
| `/patterns/02-dot-grid-canvas/` | `PatternPage.astro` | `docs/patterns/02-…md` | none |
| `/patterns/03-capture-ritual/` | `PatternPage.astro` | `docs/patterns/03-…md` | `<CaptureRitualDemo>` |
| `/patterns/04-diary-spine/` | `PatternPage.astro` | `docs/patterns/04-…md` | `<DiarySpineDemo>` |
| `/patterns/05-subject-lift/` | `PatternPage.astro` | `docs/patterns/05-…md` | `<SubjectLiftDemo>` |
| `/patterns/06-bilingual-pair/` | `PatternPage.astro` | `docs/patterns/06-…md` | none (the page itself is the demo) |
| `/patterns/07-numeral-display/` | `PatternPage.astro` | `docs/patterns/07-…md` | none |
| `/patterns/08-soft-spring/` | `PatternPage.astro` | `docs/patterns/08-…md` | `<SoftSpringDemo>` |
| `/patterns/09-navigation-pill/` | `PatternPage.astro` | `docs/patterns/09-…md` | working `<NavPill>` mounted inline |
| `/patterns/10-quiet-tabs/` | `PatternPage.astro` | `docs/patterns/10-…md` | working `<QuietTabs>` mounted inline |
| `/patterns/11-single-button/` | `PatternPage.astro` | `docs/patterns/11-…md` | working `<SingleButton>` mounted inline |
| `/patterns/12-three-circles/` | `PatternPage.astro` | `docs/patterns/12-…md` | working `<ThreeCircles>` mounted inline |

### Astro content collection config

```ts
// apps/site/src/content/config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  docs: defineCollection({
    loader: glob({ base: "../../docs", pattern: "{principles,visual-language,lineage}.md" }),
  }),
  patterns: defineCollection({
    loader: glob({ base: "../../docs/patterns", pattern: "*.md" }),
  }),
};
```

The collection includes all `*.md` (13 entries: `_index.md` + the 12 numbered patterns). `/patterns/` renders `_index.md`; the dynamic `[slug].astro` filters `_index` out of its `getStaticPaths()` so it only generates the 12 detail routes.

### Custom remark plugins

Three site-only plugins transform markdown idioms into Kinari components:

1. **`remark-principle-chip.ts`** — `[#1 Photos supply the color](principles.md#…)` → `<PrincipleChip number={1} />`. Fixture tests cover ≥10 cases including malformed input.
2. **`remark-bilingual-headers.ts`** — `## 01 · Typography · 書体 *shotai*` → `<BilingualPair primary="書体" secondary="shotai · typography" size="large" />` with serif-italic sub.
3. **`remark-demo-islands.ts`** — fenced blocks like ```` ```mockup-island name="SoftSpring" scenario="cascade-order" ``` ```` → embed the demo island inline. Markdown still reads cleanly without rendering.

To add demo embeds we add a few sentinel fenced blocks to the existing markdown docs in a single commit at the start of site work. The markdown stays the source of truth; the site renders it.

### Layouts

- **`Base.astro`** — `<html lang="en" data-accent="shikon">`, head (meta tags, favicon, OG image, Pagefind init), imports `@kinari/tokens/tokens.css`, body wraps in `<DotGridCanvas>`.
- **`Doc.astro`** — `<Base>` + `max-width: 720px` + paper-tone background + `<SearchTrigger>` top-right. Used for principles, visual-language, lineage.
- **`PatternPage.astro`** — `<Base>` + `max-width: 880px` + dot-grid + `<NavPill>` bottom-fixed wired up with all 12 pattern slugs from the collection. Used for `[slug].astro`.

### Search

- Pagefind crawls `apps/site/dist/` after Astro builds.
- A thin custom React island (lazy-loaded, ~5 KB on top of Pagefind's ~80 KB) opens on ⌘K / Ctrl+K.
- Results show bilingual page title, snippet, path.
- Indexed languages: `en`, `ja` (so kanji and romaji both find matches).

### Build & deploy

```
pnpm dev          → tokens watch + site dev
pnpm build        → tokens → react → site → pagefind index
pnpm preview      → serve dist locally
```

**GitHub Actions `deploy.yml`** (push to `master`):

1. checkout, setup pnpm + Node 22
2. `pnpm install --frozen-lockfile`
3. `pnpm build`
4. upload `apps/site/dist/` as Pages artifact
5. `actions/deploy-pages@v4`

First URL: `https://<user>.github.io/kinari/`. Custom domain deferred.

---

## Testing & quality

### Vitest unit tests — `packages/react`

- One `*.test.tsx` per primitive and pattern.
- ≥80% coverage on `src/primitives` and `src/patterns`. Demos exempt.
- Type-level tests via `*.test-d.ts` (`expect-error` comments) for invariants like "ThreeCircles cannot accept four children."

### Playwright visual regression

- Story pages at `apps/site/test/visual/<component>.html`.
- Screenshot diffs against `__snapshots__/`.
- ≤0.1% pixel changes allowed; per-pixel threshold 1.
- Runs in CI on every PR.

### Accessibility

- `@axe-core/playwright` over every story page and every built site route.
- Zero violations at `serious` or `critical`.
- Manual checklist in `docs/QA.md` run before tagged releases.

### Type checking, linting, formatting

- TypeScript strict; `noUncheckedIndexedAccess`; `exactOptionalPropertyTypes`.
- ESLint: `@typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`. CI fails on lint errors.
- Prettier on commit via `simple-git-hooks` (one-line config in root `package.json`).

### CI workflow — `.github/workflows/ci.yml`

Jobs on every PR:

1. `install` — `pnpm install --frozen-lockfile`
2. `lint-type` — `pnpm lint && pnpm typecheck`
3. `test` — `pnpm test` (Vitest across packages)
4. `visual` — `pnpm build && pnpm test:visual` (Playwright)
5. `build-site` — verifies `apps/site/dist/` has all 17 routes and `pagefind/` index
6. `bundle-size` — verifies `@kinari/react/demos` ≤ 40KB gzipped, each pattern page ≤ 100KB JS gzipped

All jobs must pass to merge.

---

## Risks & open decisions

### Real risks

1. **Astro `glob()` loader path traversal under GitHub Actions.** Mitigation: explicit `process.cwd()` resolution; CI smoke check asserts `patterns` collection has exactly 13 entries. Fallback: `prebuild` script symlinks `docs/` → `apps/site/.docs/`.
2. **Remark plugin edge cases.** Mitigation: ≥10 fixture tests per plugin. Fallback: switch the affected idiom to literal MDX (cost: docs no longer pure markdown).
3. **Bundle size on demo-heavy pattern pages.** Budget enforced in CI. First fallback: replace SubjectLift canvas particles with CSS animation.
4. **`shadowFromAccent` color math.** Uses `culori` (OKLCH-aware) so accents look right on warm kinari paper. ~10KB added to tokens package.

### Accepted tradeoffs

- No Storybook in v0.1. Site doubles as showcase.
- No npm publish in v0.1. Workspace-internal only.
- No dark mode. Intentional per framework ethos.
- CSS Modules instead of vanilla-extract. Cost: less CSS-var type safety. Mitigation: `cssvar()` typed helper.

---

## Phasing (suggested build order)

The implementation plan will detail tasks; this is the macro order.

1. **Repo plumbing** — pnpm workspaces, base `tsconfig`, ESLint, Prettier, `simple-git-hooks`, CI skeleton, `.gitignore` additions.
2. **`@kinari/tokens`** — full JS exports + `build-css.ts` + generated `tokens.css` + Vitest tests for the build script + `cssvar()` helper.
3. **`@kinari/react` primitives** — 7 components, each with `.tsx`, `.module.css`, `.test.tsx`. `usePrefersReducedMotion` and `shadowFromAccent` utilities.
4. **`@kinari/react` patterns** — 4 working components.
5. **`@kinari/react` demos** — 6 demo components + assets.
6. **`apps/site` scaffold** — Astro config, content collections, layouts, base styles.
7. **`apps/site` remark plugins** — three plugins + fixture tests.
8. **`apps/site` pages** — homepage, doc pages, pattern index, pattern detail dynamic route.
9. **`apps/site` search** — Pagefind integration + search island.
10. **CI: ci.yml + deploy.yml + bundle-size + visual regression jobs.**
11. **First production deploy** to GitHub Pages.

---

## Acceptance criteria for v0.1

- [ ] `pnpm install && pnpm build` succeeds from clean checkout on Node 22 / pnpm 9.
- [ ] All 17 site routes render with no console errors in production build.
- [ ] All Vitest tests pass; primitives + patterns at ≥80% coverage.
- [ ] All Playwright visual diffs pass.
- [ ] All `@axe-core/playwright` checks pass with zero `serious`/`critical` violations.
- [ ] Pagefind index built; ⌘K / Ctrl+K opens search; results found for "shikon", "sticker primitive", "撓み".
- [ ] Bundle size: `@kinari/react/demos` ≤ 40 KB gzipped; each pattern page ≤ 100 KB JS gzipped.
- [ ] Reduced-motion mode: all animated components render end-states instantly with notice.
- [ ] CI workflow green on a fresh PR.
- [ ] GitHub Pages deploy succeeds and site is reachable at `https://<user>.github.io/kinari/`.

---

*This spec is the source of truth for the v0.1 library + site implementation. The implementation plan, generated next, breaks it into discrete tasks.*

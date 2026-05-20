# Kinari Library v0.2 — Polish + Additions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land v0.2 of `@kinari/react` — 5 polish items + 5 new components/hooks, refactor 2 demos to consume the new primitives, update the preview app, and ship a clean CHANGELOG entry.

**Architecture:** All changes are within `packages/react/` (and a small `apps/preview/` update). No new packages, no new dependencies, no token changes. Polish first (5 tasks), then additions (5 tasks), then demo refactors (2 tasks), then preview update + version bump + CHANGELOG (2 tasks). Single feature branch, single batch.

**Tech Stack:** React 19 · TypeScript 5.4+ strict · CSS Modules · Vitest 2 · @testing-library/react 16 · jsdom. No new dependencies in this plan.

**Plan scope:** v0.2 only. Explicitly deferred: standalone `<PolaroidSticker>` component, ghost-sticker EmptyState variant, axe-core CI integration, npm publish, Plan B (the site).

---

## File Structure

### Files modified

| Path | What changes |
|---|---|
| `packages/react/package.json` | Version `0.1.0` → `0.2.0` |
| `packages/react/src/primitives/TypePair/TypePair.tsx` | Widen prop type to spread HTML attrs |
| `packages/react/src/primitives/TypePair/TypePair.test.tsx` | Add 2 passthrough tests |
| `packages/react/src/primitives/Sticker/Sticker.tsx` | Replace `useMemo` with `useState` initializer; rename `accent` to `shadowAccent`; flesh out `polaroid` variant (caption + photoAspect); polaroid CSS class wiring |
| `packages/react/src/primitives/Sticker/Sticker.module.css` | Add polaroid caption + aspect-ratio classes |
| `packages/react/src/primitives/Sticker/Sticker.test.tsx` | Add 4 tests: stable-rotation across StrictMode remounts, shadowAccent works, accent deprecation warning, polaroid caption + photoAspect |
| `packages/react/src/primitives/NumericDisplay/NumericDisplay.tsx` | Add `aria-label` when value + unit present |
| `packages/react/src/primitives/NumericDisplay/NumericDisplay.test.tsx` | One new test asserting the aria-label |
| `packages/react/src/primitives/Horizon/Horizon.tsx` | `aria-hidden="true"` on the two gradient lines |
| `packages/react/src/primitives/Horizon/Horizon.test.tsx` | One assertion |
| `packages/react/src/primitives/index.ts` | Add EmptyState, ShimmerDust, AdjustAffordance barrel exports |
| `packages/react/src/patterns/NavPill/NavPill.tsx` | Add `aria-current="step"` to breadcrumb |
| `packages/react/src/patterns/NavPill/NavPill.test.tsx` | One assertion |
| `packages/react/src/patterns/SingleButton/SingleButton.tsx` | Derive `aria-label` from `title` |
| `packages/react/src/patterns/SingleButton/SingleButton.test.tsx` | One assertion |
| `packages/react/src/patterns/ThreeCircles/ThreeCircles.tsx` | Wrap row in `role="group" aria-label="Decision"` |
| `packages/react/src/patterns/ThreeCircles/ThreeCircles.test.tsx` | One assertion |
| `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.tsx` | Use local asset imports + `<ShimmerDust>` wrapper + `aria-live` |
| `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.test.tsx` | Update default prop test + aria-live assertion |
| `packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.tsx` | Use `useConfirmGlow` + `aria-live` |
| `packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.test.tsx` | One aria-live assertion; existing tests still pass |
| `packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.module.css` | Drop the bloom keyframes (moved to useConfirmGlow CSS) |
| `packages/react/src/demos/DiarySpineDemo/DiarySpineDemo.tsx` | Add `aria-expanded` on each entry button |
| `packages/react/src/demos/DiarySpineDemo/DiarySpineDemo.test.tsx` | One assertion |
| `packages/react/src/utils/index.ts` | Add `useConfirmGlow` barrel export |
| `apps/preview/src/App.tsx` | Rename `accent="moegi"` → `shadowAccent="moegi"`; add 3 new preview blocks (polaroid, EmptyState, AdjustAffordance) |
| `CHANGELOG.md` | Add `## v0.2` section |

### Files created

| Path | Responsibility |
|---|---|
| `packages/react/src/primitives/EmptyState/EmptyState.tsx` | New primitive |
| `packages/react/src/primitives/EmptyState/EmptyState.module.css` | EmptyState CSS |
| `packages/react/src/primitives/EmptyState/EmptyState.test.tsx` | EmptyState tests |
| `packages/react/src/primitives/EmptyState/index.ts` | EmptyState barrel |
| `packages/react/src/primitives/ShimmerDust/ShimmerDust.tsx` | New primitive |
| `packages/react/src/primitives/ShimmerDust/ShimmerDust.module.css` | ShimmerDust CSS |
| `packages/react/src/primitives/ShimmerDust/ShimmerDust.test.tsx` | ShimmerDust tests |
| `packages/react/src/primitives/ShimmerDust/index.ts` | ShimmerDust barrel |
| `packages/react/src/primitives/AdjustAffordance/AdjustAffordance.tsx` | New primitive |
| `packages/react/src/primitives/AdjustAffordance/AdjustAffordance.module.css` | AdjustAffordance CSS |
| `packages/react/src/primitives/AdjustAffordance/AdjustAffordance.test.tsx` | AdjustAffordance tests |
| `packages/react/src/primitives/AdjustAffordance/index.ts` | AdjustAffordance barrel |
| `packages/react/src/utils/useConfirmGlow.ts` | Hook implementation |
| `packages/react/src/utils/useConfirmGlow.module.css` | Glow portal CSS |
| `packages/react/src/utils/useConfirmGlow.test.tsx` | Hook tests |
| `packages/react/src/utils/warnOnceForCallSite.ts` | Dev-only deduped warning helper used by Sticker deprecation |
| `packages/react/src/demos/SubjectLiftDemo/assets/apple-on-counter.jpg` | Local context image (sourced before plan execution) |
| `packages/react/src/demos/SubjectLiftDemo/assets/apple-cutout.png` | Local pre-masked subject (sourced before plan execution) |

**Total: 14 modified, 18 created. 14 tasks across 4 phases.**

---

## Phase 1 — Polish (Tasks 1–5)

### Task 1: P1 — `<TypePair>` HTML attribute pass-through

**Files:**
- Modify: `packages/react/src/primitives/TypePair/TypePair.tsx`
- Modify: `packages/react/src/primitives/TypePair/TypePair.test.tsx`

- [ ] **Step 1: Write the failing tests**

Append to `packages/react/src/primitives/TypePair/TypePair.test.tsx`:

```tsx
  it("Display spreads inline style to the rendered element", () => {
    render(<Display style={{ color: "rgb(255, 0, 0)" }}>x</Display>);
    expect(screen.getByText("x")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("Label spreads arbitrary data-* attributes", () => {
    render(<Label data-testid="lbl">Label</Label>);
    expect(screen.getByTestId("lbl")).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run:
```bash
pnpm --filter @kinari/react test -- TypePair
```
Expected: TWO new tests fail (TypePair's existing tests still pass).

- [ ] **Step 3: Update the type and implementation**

Replace the contents of `packages/react/src/primitives/TypePair/TypePair.tsx` with:

```tsx
import { type ElementType, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./TypePair.module.css";

export type TypeRoleProps = {
  children: ReactNode;
  as?: ElementType;
} & React.HTMLAttributes<HTMLElement>;

/** Visual Language §01 type role: Display — friendly serif weight 600. */
export function Display({ children, as: As = "h2", className, ...rest }: TypeRoleProps) {
  return (
    <As className={clsx(styles.display, className)} {...rest}>
      {children}
    </As>
  );
}

/** Type role: Label — chunky bold sans for stickers, CTAs, badges. */
export function Label({ children, as: As = "span", className, ...rest }: TypeRoleProps) {
  return (
    <As className={clsx(styles.label, className)} {...rest}>
      {children}
    </As>
  );
}

/** Type role: Body — running prose. */
export function Body({ children, as: As = "div", className, ...rest }: TypeRoleProps) {
  return (
    <As className={clsx(styles.body, className)} {...rest}>
      {children}
    </As>
  );
}

// Re-export NumericDisplay as Numeric for convenience
export { NumericDisplay as Numeric } from "../NumericDisplay";
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm --filter @kinari/react test -- TypePair`
Expected: ALL TypePair tests pass.

- [ ] **Step 5: Typecheck the whole package**

Run: `pnpm --filter @kinari/react typecheck`
Expected: zero errors.

- [ ] **Step 6: Commit**

```bash
git add packages/react/src/primitives/TypePair/
git commit -m "Widen TypePair prop type to spread HTML attributes (Display/Label/Body)"
```

---

### Task 2: P2 — `<Sticker>` rotation stability under StrictMode

**Files:**
- Modify: `packages/react/src/primitives/Sticker/Sticker.tsx`
- Modify: `packages/react/src/primitives/Sticker/Sticker.test.tsx`

- [ ] **Step 1: Write the failing test**

Append to `packages/react/src/primitives/Sticker/Sticker.test.tsx`:

```tsx
import { StrictMode } from "react";

  it("preserves rotation seed across StrictMode double-mount", () => {
    // Force Math.random to return a sequence so we can detect re-rolls
    const seq = [0.1, 0.9, 0.5];
    let i = 0;
    const spy = vi.spyOn(Math, "random").mockImplementation(() => seq[i++ % seq.length]!);

    const { container, rerender } = render(
      <StrictMode>
        <Sticker>only</Sticker>
      </StrictMode>,
    );
    const first = (container.firstChild as HTMLElement).style.getPropertyValue("--sticker-rotation");

    // Force a parent re-render; the rotation must NOT change
    rerender(
      <StrictMode>
        <Sticker>only</Sticker>
      </StrictMode>,
    );
    const second = (container.firstChild as HTMLElement).style.getPropertyValue("--sticker-rotation");

    expect(first).toBe(second);
    spy.mockRestore();
  });
```

Make sure `vi` is imported at the top:
```tsx
import { describe, expect, it, vi } from "vitest";
```

- [ ] **Step 2: Run the test to verify it fails (or flakes)**

Run: `pnpm --filter @kinari/react test -- Sticker`
Expected: the new test may or may not fail depending on `useMemo` behavior under StrictMode — the existing implementation uses `useMemo(...,[])` which CAN re-evaluate. Either way, the next step makes the behavior bulletproof.

- [ ] **Step 3: Swap `useMemo` for `useState` initializer in `Sticker.tsx`**

Open `packages/react/src/primitives/Sticker/Sticker.tsx`. Find the rotation block:

```tsx
import { type CSSProperties, type ReactNode, useMemo } from "react";
```

Change to:

```tsx
import { type CSSProperties, type ReactNode, useState } from "react";
```

Then find:

```tsx
  const stableRotation = useMemo(() => {
    if (rotation !== undefined) return rotation;
    // Range -1.2 to +1.1, stable across re-renders via useMemo with empty deps.
    return Math.random() * 2.3 - 1.2;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
```

Replace with:

```tsx
  // `useState` initializer is guaranteed to run exactly once even under
  // React 19 StrictMode's intentional double-mount in dev.
  const [stableRotation] = useState<number>(() => rotation ?? Math.random() * 2.3 - 1.2);
```

(Removes the eslint-disable comment since `useState` doesn't have a deps array.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm --filter @kinari/react test -- Sticker`
Expected: all Sticker tests pass, including the new StrictMode test.

- [ ] **Step 5: Commit**

```bash
git add packages/react/src/primitives/Sticker/Sticker.tsx packages/react/src/primitives/Sticker/Sticker.test.tsx
git commit -m "Use useState initializer for Sticker rotation (StrictMode-safe)"
```

---

### Task 3: P3 — Sticker `accent` → `shadowAccent` rename with deprecation

**Files:**
- Create: `packages/react/src/utils/warnOnceForCallSite.ts`
- Modify: `packages/react/src/primitives/Sticker/Sticker.tsx`
- Modify: `packages/react/src/primitives/Sticker/Sticker.test.tsx`

- [ ] **Step 1: Create the warn-once helper**

Create `packages/react/src/utils/warnOnceForCallSite.ts`:

```ts
/**
 * Print a console.warn exactly once per call site in dev.
 * Call sites are identified by the React Error stack trace.
 * In production (process.env.NODE_ENV === "production"), this is a no-op.
 */
const seen = new Set<string>();

export function warnOnceForCallSite(message: string): void {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") return;

  // Use Error stack to identify the call site
  const stack = new Error().stack ?? "";
  // Strip the first two lines (Error message + this function itself)
  const callSite = stack.split("\n").slice(2, 4).join("\n");

  const key = message + "::" + callSite;
  if (seen.has(key)) return;
  seen.add(key);

  // eslint-disable-next-line no-console
  console.warn(message);
}

/** Test-only — reset the seen set so tests can re-fire warnings. */
export function __resetWarnedOnce(): void {
  seen.clear();
}
```

- [ ] **Step 2: Write the failing tests**

Append to `packages/react/src/primitives/Sticker/Sticker.test.tsx`:

```tsx
import { __resetWarnedOnce } from "../../utils/warnOnceForCallSite";

  it("accepts shadowAccent (the new prop name)", () => {
    const { container } = render(<Sticker shadowAccent="moegi">x</Sticker>);
    const el = container.firstChild as HTMLElement;
    // moegi rgb is approx (125, 174, 92)
    expect(el.style.boxShadow).toMatch(/rgba\(12[0-9],/);
  });

  it("accepts deprecated accent prop and warns once", () => {
    __resetWarnedOnce();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Sticker accent="moegi">x</Sticker>);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toMatch(/deprecated/i);
    warn.mockRestore();
  });

  it("prefers shadowAccent when both are passed", () => {
    __resetWarnedOnce();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(
      <Sticker shadowAccent="moegi" accent="shikon">x</Sticker>,
    );
    const el = container.firstChild as HTMLElement;
    // moegi rgb is approx (125, 174, 92); shikon would be (91, 61, 110)
    expect(el.style.boxShadow).toMatch(/rgba\(12[0-9],/);
    // No warning since shadowAccent is explicitly set
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm --filter @kinari/react test -- Sticker`
Expected: the three new tests fail (`shadowAccent` is unknown prop, deprecated `accent` doesn't warn).

- [ ] **Step 4: Update `Sticker.tsx` with new prop + deprecation**

Open `packages/react/src/primitives/Sticker/Sticker.tsx`. Find the `StickerProps` interface and replace it:

```tsx
export interface StickerProps {
  children: ReactNode;
  /** Subtle tilt. Default: stable randomized within ±1.2°. */
  rotation?: number;
  /** Resting (default) or floating shadow depth. */
  lift?: "resting" | "floating";
  /** Tint the drop shadow with this accent's hue. Sticker background stays white. */
  shadowAccent?: AccentName | string;
  /** @deprecated Use `shadowAccent` instead. Removed in v0.3. */
  accent?: AccentName | string;
  /** Die-cut (default) or polaroid variant. */
  variant?: "die-cut" | "polaroid";
  /** Element role — defaults to div. */
  as?: "div" | "a" | "button";
  href?: string;
  onClick?: () => void;
  className?: string;
}
```

Add the deprecation warning import at the top:

```tsx
import { warnOnceForCallSite } from "../../utils/warnOnceForCallSite";
```

Update the body to resolve the accent and warn if needed. Find the line that reads:

```tsx
  const accentHex = accent && (accent in colors.accents
    ? colors.accents[accent as AccentName]
    : accent);
```

Replace with:

```tsx
  // Migration: shadowAccent is the v0.2 name. accent is deprecated.
  if (accent && !shadowAccent) {
    warnOnceForCallSite(
      "Sticker prop `accent` is deprecated; rename to `shadowAccent`. Behavior is unchanged.",
    );
  }
  const resolvedAccent = shadowAccent ?? accent;
  const accentHex =
    resolvedAccent &&
    (resolvedAccent in colors.accents
      ? colors.accents[resolvedAccent as AccentName]
      : resolvedAccent);
```

Update the props destructuring at the top of the function to include both:

```tsx
export function Sticker({
  children,
  rotation,
  lift = "resting",
  shadowAccent,
  accent,
  variant = "die-cut",
  as = "div",
  href,
  onClick,
  className,
}: StickerProps) {
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm --filter @kinari/react test -- Sticker`
Expected: all Sticker tests pass.

- [ ] **Step 6: Typecheck**

Run: `pnpm --filter @kinari/react typecheck`
Expected: zero errors.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/utils/warnOnceForCallSite.ts \
        packages/react/src/primitives/Sticker/Sticker.tsx \
        packages/react/src/primitives/Sticker/Sticker.test.tsx
git commit -m "Rename Sticker accent → shadowAccent with deprecation warning"
```

---

### Task 4: P4 — `<SubjectLiftDemo>` ships local assets

**Files:**
- Source: two CC0 images (≤80KB jpg + ≤30KB png) saved as `apple-on-counter.jpg` and `apple-cutout.png`
- Create: `packages/react/src/demos/SubjectLiftDemo/assets/apple-on-counter.jpg`
- Create: `packages/react/src/demos/SubjectLiftDemo/assets/apple-cutout.png`
- Modify: `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.tsx`
- Modify: `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.test.tsx`

- [ ] **Step 1: Source the assets**

Two options:

**Option A (recommended):** Source from Unsplash (CC0). Search for "apple on wood counter" and a clean-background apple. Save to:
- `packages/react/src/demos/SubjectLiftDemo/assets/apple-on-counter.jpg` (≤80 KB; resize/compress as needed via `sips -Z 800 -s formatOptions 75 …` on macOS, or `magick … -resize 800x -quality 75`)
- `packages/react/src/demos/SubjectLiftDemo/assets/apple-cutout.png` (≤30 KB; mask the apple separately, save with transparency)

**Option B (fallback for plan execution):** Use placeholder colored rectangles. Create:

```bash
mkdir -p packages/react/src/demos/SubjectLiftDemo/assets
# Generate a placeholder JPG (warm-toned solid color, ~6KB)
printf '%s' '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#b9a888"/><circle cx="300" cy="200" r="80" fill="#d97a3c"/></svg>' \
  > /tmp/context.svg
# Use built-in tools to convert if available, else accept SVG as-is.
```

For Option B, ship `.svg` files instead and update the prop defaults accordingly. **Prefer Option A.**

- [ ] **Step 2: Verify the assets exist and are within budget**

Run:
```bash
ls -la packages/react/src/demos/SubjectLiftDemo/assets/
```
Expected: two files, each within budget (jpg ≤80KB, png ≤30KB).

- [ ] **Step 3: Write the failing test**

Append to `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.test.tsx`:

```tsx
  it("uses local asset URLs by default (no external http)", () => {
    const { container } = render(<SubjectLiftDemo src={undefined as any} context={undefined as any} />);
    // Note: when no src/context are passed, defaults are bundled URLs (Vite's ?url import)
    // which resolve to a local /assets/... path or a data URL during tests.
    const imgs = container.querySelectorAll("img");
    expect(imgs).toHaveLength(2);
    imgs.forEach((img) => {
      const src = img.getAttribute("src") ?? "";
      expect(src).not.toMatch(/^https?:\/\//);
    });
  });
```

Note: if `SubjectLiftDemoProps` types `src` and `context` as required `string`, change to optional (`?: string`) and let defaults kick in via the function signature destructuring.

- [ ] **Step 4: Run the test to verify it fails**

Run: `pnpm --filter @kinari/react test -- SubjectLiftDemo`
Expected: fails because props don't have local defaults yet.

- [ ] **Step 5: Update `SubjectLiftDemo.tsx`**

Open `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.tsx`. Add imports at the top:

```tsx
import cutoutUrl from "./assets/apple-cutout.png?url";
import contextUrl from "./assets/apple-on-counter.jpg?url";
```

Change the props interface to make `src` and `context` optional:

```tsx
export interface SubjectLiftDemoProps {
  src?: string;
  context?: string;
}
```

Update the function signature to use defaults:

```tsx
export function SubjectLiftDemo({
  src = cutoutUrl,
  context = contextUrl,
}: SubjectLiftDemoProps = {}) {
  // ... existing body unchanged
}
```

- [ ] **Step 6: Add the Vitest config for `?url` imports (if not already present)**

Open `packages/react/vitest.config.ts`. The current `defineConfig` should already work since Vite handles `?url` natively. If tests can't resolve the `?url` import, add this stub at the top of `test-setup.ts`:

```ts
// Stub Vite ?url imports for test environment
declare module "*?url" {
  const src: string;
  export default src;
}
```

Run tests; if it still fails with "cannot resolve `?url`", confirm `vitest.config.ts` extends Vite plugins (it should, via `defineConfig` from `vitest/config` which auto-extends).

- [ ] **Step 7: Run the test to verify it passes**

Run: `pnpm --filter @kinari/react test -- SubjectLiftDemo`
Expected: pass.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/demos/SubjectLiftDemo/
git commit -m "Ship local assets for SubjectLiftDemo (no external Unsplash)"
```

---

### Task 5: P5 — Accessibility audit pass

**Files (touched in sequence — each is small):**
- Modify: 9 component files + their tests

This task batches all a11y additions into one commit. Each component's change is one or two lines plus one test assertion.

- [ ] **Step 1: Write all failing a11y tests**

Make these additions:

**`packages/react/src/primitives/NumericDisplay/NumericDisplay.test.tsx`** — append:
```tsx
  it("sets aria-label combining value and unit", () => {
    render(<NumericDisplay value={94} unit="kcal" />);
    const el = screen.getByLabelText("94 kcal");
    expect(el).toBeInTheDocument();
  });
```

**`packages/react/src/primitives/Horizon/Horizon.test.tsx`** — append:
```tsx
  it("marks gradient lines as decorative", () => {
    const { container } = render(<Horizon />);
    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    // Two lines + maybe the mark depending on impl; expect at least 2
    expect(hidden.length).toBeGreaterThanOrEqual(2);
  });
```

**`packages/react/src/patterns/NavPill/NavPill.test.tsx`** — append:
```tsx
  it("marks the current breadcrumb as aria-current='step'", () => {
    const steps = [
      { href: "/a", titleJa: "あ", titleEn: "a" },
      { href: "/b", titleJa: "い", titleEn: "b" },
    ];
    const { container } = render(<NavPill steps={steps} current={1} />);
    expect(container.querySelector('[aria-current="step"]')).toBeInTheDocument();
  });
```

**`packages/react/src/patterns/SingleButton/SingleButton.test.tsx`** — append:
```tsx
  it("derives aria-label from title when no explicit label given", () => {
    render(<SingleButton shape={<span>S</span>} onTap={() => {}} title="Capture" />);
    expect(screen.getByLabelText("Capture")).toBeInTheDocument();
  });
```

**`packages/react/src/patterns/ThreeCircles/ThreeCircles.test.tsx`** — append:
```tsx
  it("groups the row as a decision group", () => {
    const { container } = render(
      <ThreeCircles
        left={{ icon: "L", label: "L", onTap: () => {} }}
        center={{ icon: "C", label: "C", onTap: () => {} }}
        right={{ icon: "R", label: "R", onTap: () => {} }}
      />,
    );
    expect(container.querySelector('[role="group"][aria-label="Decision"]')).toBeInTheDocument();
  });
```

**`packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.test.tsx`** — append:
```tsx
  it("renders a polite live region for capture announcements", () => {
    const { container } = render(<CaptureRitualDemo />);
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });
```

**`packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.test.tsx`** — append:
```tsx
  it("renders a polite live region for lift announcements", () => {
    const { container } = render(<SubjectLiftDemo />);
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });
```

**`packages/react/src/demos/DiarySpineDemo/DiarySpineDemo.test.tsx`** — append:
```tsx
  it("reflects focus via aria-expanded on each entry", () => {
    const entries = [
      { id: "a", sticker: <span>A</span>, detail: <span>A!</span> },
      { id: "b", sticker: <span>B</span>, detail: <span>B!</span> },
    ];
    const { container } = render(<DiarySpineDemo entries={entries} />);
    const buttons = container.querySelectorAll('[aria-expanded]');
    expect(buttons.length).toBe(2);
    buttons.forEach((b) => expect(b.getAttribute("aria-expanded")).toBe("false"));
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm --filter @kinari/react test`
Expected: 8 new failing assertions (one per component).

- [ ] **Step 3: Update `NumericDisplay.tsx`**

In `packages/react/src/primitives/NumericDisplay/NumericDisplay.tsx`, in the JSX:

```tsx
    <span
      data-kinari-component="numeric-display"
      className={clsx(styles.numeric, styles[font], className)}
      style={style}
      aria-label={displayUnit ? `${value} ${displayUnit}` : undefined}
    >
```

- [ ] **Step 4: Update `Horizon.tsx`**

In `packages/react/src/primitives/Horizon/Horizon.tsx`, ensure both gradient lines have `aria-hidden="true"` (current impl already does — verify by reading the file). If only one line has it, add to both. Confirm the new test passes.

- [ ] **Step 5: Update `NavPill.tsx`**

In `packages/react/src/patterns/NavPill/NavPill.tsx`, find the center breadcrumb `<div className={styles.center}>` and add `aria-current="step"`:

```tsx
      <div className={styles.center} aria-current="step">
```

- [ ] **Step 6: Update `SingleButton.tsx`**

In `packages/react/src/patterns/SingleButton/SingleButton.tsx`, on the `<button>`:

```tsx
        <button
          data-kinari-component="single-button"
          data-spending={spending}
          type="button"
          className={styles.button}
          style={style}
          onClick={handleClick}
          aria-label={typeof title === "string" ? title : undefined}
        >
```

- [ ] **Step 7: Update `ThreeCircles.tsx`**

In `packages/react/src/patterns/ThreeCircles/ThreeCircles.tsx`, change the outer `<div>`:

```tsx
    <div
      data-kinari-component="three-circles"
      className={styles.row}
      role="group"
      aria-label="Decision"
    >
```

- [ ] **Step 8: Update `CaptureRitualDemo.tsx`**

In `packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.tsx`, inside the wrapper, add a live region. Find the `<div className={styles.demo}>` element and add an aria-live div right before the closing tag:

```tsx
        <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
          {state === "settled" ? "Capture complete" : ""}
        </div>
```

- [ ] **Step 9: Update `SubjectLiftDemo.tsx`**

In `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.tsx`, add a live region similarly:

```tsx
        <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
          {state === "lifted" ? "Subject lifted" : ""}
        </div>
```

- [ ] **Step 10: Update `DiarySpineDemo.tsx`**

In `packages/react/src/demos/DiarySpineDemo/DiarySpineDemo.tsx`, on each entry `<button>`:

```tsx
            <button
              key={e.id}
              type="button"
              data-kinari-element="entry"
              data-entry-id={e.id}
              data-focus={isFocused}
              data-blurred={isBlurred}
              className={styles.entry}
              aria-expanded={isFocused}
              onClick={() => setFocused(isFocused ? null : e.id)}
            >
```

- [ ] **Step 11: Run all tests to verify they pass**

Run: `pnpm --filter @kinari/react test`
Expected: all tests pass.

- [ ] **Step 12: Commit**

```bash
git add packages/react/src/
git commit -m "A11y pass — aria-labels, live regions, decision grouping"
```

---

## Phase 2 — Additions (Tasks 6–10)

### Task 6: A1 — `<Sticker variant="polaroid">` extension

**Files:**
- Modify: `packages/react/src/primitives/Sticker/Sticker.tsx`
- Modify: `packages/react/src/primitives/Sticker/Sticker.module.css`
- Modify: `packages/react/src/primitives/Sticker/Sticker.test.tsx`

- [ ] **Step 1: Write the failing tests**

Append to `packages/react/src/primitives/Sticker/Sticker.test.tsx`:

```tsx
  it("polaroid variant renders a caption below the photo", () => {
    render(
      <Sticker variant="polaroid" caption="June · Maine coast">
        <img src="/test.jpg" alt="" />
      </Sticker>,
    );
    expect(screen.getByText("June · Maine coast")).toBeInTheDocument();
  });

  it("polaroid variant applies the requested photoAspect class", () => {
    const { container } = render(
      <Sticker variant="polaroid" photoAspect="4/3" caption="x">
        <img src="/test.jpg" alt="" />
      </Sticker>,
    );
    expect(container.querySelector('[data-kinari-element="photo"]')).toHaveAttribute(
      "data-aspect",
      "4/3",
    );
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm --filter @kinari/react test -- Sticker`
Expected: two new tests fail.

- [ ] **Step 3: Extend `StickerProps` interface**

In `packages/react/src/primitives/Sticker/Sticker.tsx`, find the `StickerProps` interface and add `caption` + `photoAspect`:

```tsx
export interface StickerProps {
  children: ReactNode;
  rotation?: number;
  lift?: "resting" | "floating";
  shadowAccent?: AccentName | string;
  /** @deprecated Use `shadowAccent` instead. Removed in v0.3. */
  accent?: AccentName | string;
  variant?: "die-cut" | "polaroid";
  /** Polaroid-only. Caption rendered below the photo. */
  caption?: ReactNode;
  /** Polaroid-only. Aspect ratio of the photo area. Default: "square". */
  photoAspect?: "square" | "4/3" | "3/4" | "16/9";
  as?: "div" | "a" | "button";
  href?: string;
  onClick?: () => void;
  className?: string;
}
```

Add `caption` and `photoAspect` to the destructure with defaults:

```tsx
export function Sticker({
  children,
  rotation,
  lift = "resting",
  shadowAccent,
  accent,
  variant = "die-cut",
  caption,
  photoAspect = "square",
  as = "div",
  href,
  onClick,
  className,
}: StickerProps) {
```

Update the rendered children body — when `variant === "polaroid"`, wrap children in a `.photo` div:

```tsx
  const content =
    variant === "polaroid" ? (
      <>
        <div
          className={styles.photo}
          data-kinari-element="photo"
          data-aspect={photoAspect}
        >
          {children}
        </div>
        {caption && <div className={styles.caption}>{caption}</div>}
      </>
    ) : (
      children
    );
```

Then in the existing branches (`as === "a"`, `"button"`, default `"div"`), replace `{children}` with `{content}`.

- [ ] **Step 4: Extend `Sticker.module.css`**

Append to `packages/react/src/primitives/Sticker/Sticker.module.css`:

```css
.polaroid {
  padding: 14px 14px 30px;
}

.photo {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.photo > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.photo[data-aspect="square"] { aspect-ratio: 1; }
.photo[data-aspect="4/3"]    { aspect-ratio: 4/3; }
.photo[data-aspect="3/4"]    { aspect-ratio: 3/4; }
.photo[data-aspect="16/9"]   { aspect-ratio: 16/9; }

.caption {
  font-family: Georgia, serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--sumi);
  margin-top: 12px;
  text-align: center;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm --filter @kinari/react test -- Sticker`
Expected: all Sticker tests pass.

- [ ] **Step 6: Typecheck**

Run: `pnpm --filter @kinari/react typecheck`
Expected: zero errors.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/primitives/Sticker/
git commit -m "Flesh out Sticker polaroid variant — caption + photoAspect props"
```

---

### Task 7: A2 — `<EmptyState>` primitive

**Files:**
- Create: `packages/react/src/primitives/EmptyState/EmptyState.tsx`
- Create: `packages/react/src/primitives/EmptyState/EmptyState.module.css`
- Create: `packages/react/src/primitives/EmptyState/EmptyState.test.tsx`
- Create: `packages/react/src/primitives/EmptyState/index.ts`
- Modify: `packages/react/src/primitives/index.ts`

- [ ] **Step 1: Write the failing tests**

Create `packages/react/src/primitives/EmptyState/EmptyState.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("<EmptyState>", () => {
  it("renders glyph, title, reading, and body", () => {
    render(
      <EmptyState
        glyph="空"
        title="Your diary is empty."
        reading="kara · empty"
        body="Nothing to see yet."
      />,
    );
    expect(screen.getByText("空")).toBeInTheDocument();
    expect(screen.getByText("Your diary is empty.")).toBeInTheDocument();
    expect(screen.getByText("kara · empty")).toBeInTheDocument();
    expect(screen.getByText("Nothing to see yet.")).toBeInTheDocument();
  });

  it("renders an action button and fires onClick", () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        glyph="空"
        title="t"
        action={{ label: "+ Begin", onClick }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "+ Begin" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders without a button when no action prop", () => {
    render(<EmptyState glyph="空" title="t" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("marks glyph as decorative for AT", () => {
    render(<EmptyState glyph="空" title="t" />);
    expect(screen.getByText("空")).toHaveAttribute("aria-hidden", "true");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm --filter @kinari/react test -- EmptyState`
Expected: fail — module doesn't exist.

- [ ] **Step 3: Create `EmptyState.module.css`**

```css
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 360px;
  margin: 0 auto;
  padding: 32px 16px;
}

.glyph {
  font-family: Georgia, serif;
  font-size: 56px;
  color: var(--sumi-mute);
  line-height: 1;
  transform: rotate(-2deg);
  display: inline-block;
  text-shadow: 4px 6px 0 rgba(72, 55, 32, 0.06);
  margin-bottom: 18px;
}

.title {
  font-family: Georgia, serif;
  font-weight: 600;
  font-size: 22px;
  color: var(--sumi);
  margin: 0;
}

.reading {
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sumi-mute);
  margin-top: 6px;
}

.body {
  font-family: Georgia, serif;
  font-style: italic;
  color: var(--sumi-muted);
  font-size: 14px;
  margin: 16px 0 24px;
  line-height: 1.6;
}

.action {
  background: var(--accent, var(--shikon));
  color: var(--shiro);
  border: none;
  border-radius: 999px;
  padding: 10px 22px;
  font-family: -apple-system, "SF Pro Text", system-ui, sans-serif;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  box-shadow: var(--action-shadow, 4px 5px 0 rgba(91, 61, 110, 0.20));
  transition: transform var(--duration-cross-fade) var(--ease-tawami);
}
.action:hover { transform: translateY(-1px); }
.action:focus-visible { outline: 2px solid var(--sumi); outline-offset: 3px; }
```

- [ ] **Step 4: Create `EmptyState.tsx`**

```tsx
import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { colors, type AccentName, shadowFromAccent } from "@kinari/tokens";
import styles from "./EmptyState.module.css";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  /** Single kanji glyph rendered above the title. */
  glyph: string;
  /** Title — typically the English translation. */
  title: ReactNode;
  /** Small-caps reading line below the title (e.g., "kara · empty"). */
  reading?: string;
  /** Italic gloss paragraph. */
  body?: ReactNode;
  /** CTA. Omit for an action-less empty state. */
  action?: EmptyStateAction;
  /** Project accent for the CTA fill. Default: shikon. */
  accent?: AccentName | string;
  className?: string;
}

/** Pattern from Library Growth (v0.1 spec): empty state for DotGridCanvas surfaces. */
export function EmptyState({
  glyph,
  title,
  reading,
  body,
  action,
  accent = "shikon",
  className,
}: EmptyStateProps) {
  const accentColor =
    accent in colors.accents ? colors.accents[accent as AccentName] : accent;

  const style: CSSProperties = {
    "--accent": accentColor,
    "--action-shadow": shadowFromAccent(accentColor, "resting"),
  } as CSSProperties;

  return (
    <div
      data-kinari-component="empty-state"
      className={clsx(styles.empty, className)}
      style={style}
    >
      <div className={styles.glyph} aria-hidden="true">
        {glyph}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {reading && (
        <div className={styles.reading} aria-hidden="true">
          {reading}
        </div>
      )}
      {body && <p className={styles.body}>{body}</p>}
      {action && (
        <button
          type="button"
          className={styles.action}
          onClick={action.onClick}
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Create `EmptyState/index.ts`**

```ts
export { EmptyState, type EmptyStateProps, type EmptyStateAction } from "./EmptyState";
```

- [ ] **Step 6: Add to primitives barrel**

Open `packages/react/src/primitives/index.ts`. Add:

```ts
export { EmptyState, type EmptyStateProps, type EmptyStateAction } from "./EmptyState";
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `pnpm --filter @kinari/react test -- EmptyState`
Expected: all 4 EmptyState tests pass.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/primitives/EmptyState/ packages/react/src/primitives/index.ts
git commit -m "Add <EmptyState> primitive — kanji + bilingual + accent CTA"
```

---

### Task 8: A3 — `useConfirmGlow()` hook

**Files:**
- Create: `packages/react/src/utils/useConfirmGlow.ts`
- Create: `packages/react/src/utils/useConfirmGlow.module.css`
- Create: `packages/react/src/utils/useConfirmGlow.test.tsx`
- Modify: `packages/react/src/utils/index.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/react/src/utils/useConfirmGlow.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useConfirmGlow } from "./useConfirmGlow";

describe("useConfirmGlow", () => {
  it("returns isGlowing=false initially", () => {
    const { result } = renderHook(() => useConfirmGlow());
    expect(result.current.isGlowing).toBe(false);
  });

  it("sets isGlowing=true when glow() is called with a DOMRect, then false after duration", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useConfirmGlow({ duration: 300 }));
    const rect = new DOMRect(100, 100, 40, 40);

    act(() => {
      result.current.glow(rect);
    });
    expect(result.current.isGlowing).toBe(true);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current.isGlowing).toBe(false);
    vi.useRealTimers();
  });

  it("mounts a portal element on document.body and cleans up on unmount", () => {
    const { unmount, result } = renderHook(() => useConfirmGlow());
    const rect = new DOMRect(0, 0, 10, 10);
    act(() => {
      result.current.glow(rect);
    });
    expect(document.body.querySelector('[data-kinari-element="confirm-glow"]')).not.toBeNull();
    unmount();
    expect(document.body.querySelector('[data-kinari-element="confirm-glow"]')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm --filter @kinari/react test -- useConfirmGlow`
Expected: fail — module doesn't exist.

- [ ] **Step 3: Create `useConfirmGlow.module.css`**

```css
.glow {
  position: fixed;
  pointer-events: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow-color, var(--kaki-iro)) 0%, transparent 70%);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.6);
  z-index: 9999;
}
.glow[data-state="blooming"]    { animation: kinari-glow-bloom 150ms var(--ease-tawami) forwards; }
.glow[data-state="contracting"] { animation: kinari-glow-contract 150ms var(--ease-tawami) forwards; }

@keyframes kinari-glow-bloom {
  to {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.2);
  }
}
@keyframes kinari-glow-contract {
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glow[data-state="blooming"],
  .glow[data-state="contracting"] {
    animation: none;
    opacity: 0;
  }
}
```

- [ ] **Step 4: Create `useConfirmGlow.ts`**

```ts
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import styles from "./useConfirmGlow.module.css";

export interface UseConfirmGlowOptions {
  /** Color for the radial-gradient center. Default: var(--kaki-iro). */
  color?: string;
  /** Total animation duration (bloom + contract). Default: 300. */
  duration?: number;
}

export interface UseConfirmGlowResult {
  /** Trigger the bloom centered on a target. */
  glow: (target: RefObject<HTMLElement> | DOMRect) => void;
  /** True while the bloom is animating. */
  isGlowing: boolean;
}

type GlowState = "idle" | "blooming" | "contracting";

/** Returns a centered bloom-and-contract glow effect controllable from anywhere. */
export function useConfirmGlow(opts: UseConfirmGlowOptions = {}): UseConfirmGlowResult {
  const { color, duration = 300 } = opts;
  const [isGlowing, setIsGlowing] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const halfTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazy-mount the portal element on first glow() call.
  const ensurePortal = useCallback((): HTMLDivElement => {
    if (typeof document === "undefined") {
      throw new Error("useConfirmGlow: document is undefined (SSR)");
    }
    if (portalRef.current) return portalRef.current;
    const el = document.createElement("div");
    el.setAttribute("data-kinari-element", "confirm-glow");
    el.className = styles.glow;
    if (color) el.style.setProperty("--glow-color", color);
    document.body.appendChild(el);
    portalRef.current = el;
    return el;
  }, [color]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (halfTimerRef.current) clearTimeout(halfTimerRef.current);
      if (portalRef.current) {
        portalRef.current.remove();
        portalRef.current = null;
      }
    };
  }, []);

  const glow = useCallback(
    (target: RefObject<HTMLElement> | DOMRect) => {
      let rect: DOMRect;
      if (target instanceof DOMRect) {
        rect = target;
      } else if (target.current) {
        rect = target.current.getBoundingClientRect();
      } else {
        return;
      }

      const el = ensurePortal();
      el.style.left = `${rect.left + rect.width / 2}px`;
      el.style.top = `${rect.top + rect.height / 2}px`;
      el.setAttribute("data-state", "blooming");
      setIsGlowing(true);

      if (halfTimerRef.current) clearTimeout(halfTimerRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);

      halfTimerRef.current = setTimeout(() => {
        el.setAttribute("data-state", "contracting");
      }, duration / 2);

      timerRef.current = setTimeout(() => {
        el.setAttribute("data-state", "idle");
        setIsGlowing(false);
      }, duration);
    },
    [duration, ensurePortal],
  );

  return { glow, isGlowing };
}
```

- [ ] **Step 5: Update utils barrel**

In `packages/react/src/utils/index.ts`, add:

```ts
export { useConfirmGlow, type UseConfirmGlowOptions, type UseConfirmGlowResult } from "./useConfirmGlow";
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm --filter @kinari/react test -- useConfirmGlow`
Expected: all 3 hook tests pass.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/utils/useConfirmGlow.ts \
        packages/react/src/utils/useConfirmGlow.module.css \
        packages/react/src/utils/useConfirmGlow.test.tsx \
        packages/react/src/utils/index.ts
git commit -m "Add useConfirmGlow hook — portal-based bloom + contract"
```

---

### Task 9: A4 — `<ShimmerDust>` primitive

**Files:**
- Create: `packages/react/src/primitives/ShimmerDust/ShimmerDust.tsx`
- Create: `packages/react/src/primitives/ShimmerDust/ShimmerDust.module.css`
- Create: `packages/react/src/primitives/ShimmerDust/ShimmerDust.test.tsx`
- Create: `packages/react/src/primitives/ShimmerDust/index.ts`
- Modify: `packages/react/src/primitives/index.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/react/src/primitives/ShimmerDust/ShimmerDust.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { ShimmerDust } from "./ShimmerDust";

describe("<ShimmerDust>", () => {
  it("wraps children and adds an overlay", () => {
    const { container } = render(
      <ShimmerDust active={false}>
        <span>inner</span>
      </ShimmerDust>,
    );
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "shimmer-dust");
    expect(container.querySelector('[data-kinari-element="shimmer-overlay"]')).toBeInTheDocument();
  });

  it("sets data-active='true' when active prop is true", () => {
    const { container } = render(
      <ShimmerDust active={true}>
        <span>inner</span>
      </ShimmerDust>,
    );
    expect(container.firstChild).toHaveAttribute("data-active", "true");
  });

  it("sets data-active='false' when not active", () => {
    const { container } = render(
      <ShimmerDust active={false}>
        <span>inner</span>
      </ShimmerDust>,
    );
    expect(container.firstChild).toHaveAttribute("data-active", "false");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm --filter @kinari/react test -- ShimmerDust`
Expected: fail.

- [ ] **Step 3: Create `ShimmerDust.module.css`**

```css
.wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    45deg,
    transparent 0 6px,
    rgba(217, 122, 60, 0.3) 6px 8px
  );
}

/* Use color-mix where supported; fallback above */
@supports (background: color-mix(in srgb, red, blue)) {
  .overlay {
    background: repeating-linear-gradient(
      45deg,
      transparent 0 6px,
      color-mix(in srgb, var(--shimmer-accent, var(--kaki-iro)) 30%, transparent) 6px 8px
    );
  }
}

.wrapper[data-active="true"] .overlay {
  animation: kinari-shimmer 700ms var(--ease-tawami) forwards;
}

@keyframes kinari-shimmer {
  0%   { opacity: 0; background-position: 0 0; }
  30%  { opacity: 0.6; }
  100% { opacity: 0; background-position: 80px 0; }
}

@media (prefers-reduced-motion: reduce) {
  .wrapper[data-active="true"] .overlay {
    animation: none;
    opacity: 0;
  }
}
```

- [ ] **Step 4: Create `ShimmerDust.tsx`**

```tsx
import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { colors, type AccentName } from "@kinari/tokens";
import styles from "./ShimmerDust.module.css";

export interface ShimmerDustProps {
  children: ReactNode;
  /** When true, the shimmer overlay is visible and animating. */
  active: boolean;
  /** Project accent for the shimmer hue. Default: kaki-iro. */
  accent?: AccentName | string;
  className?: string;
}

/** AI-processing overlay — CSS-only sweep across children. */
export function ShimmerDust({ children, active, accent, className }: ShimmerDustProps) {
  const accentColor = accent
    ? accent in colors.accents
      ? colors.accents[accent as AccentName]
      : accent
    : undefined;

  const style: CSSProperties | undefined = accentColor
    ? ({ "--shimmer-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <div
      data-kinari-component="shimmer-dust"
      data-active={active}
      className={clsx(styles.wrapper, className)}
      style={style}
    >
      {children}
      <div className={styles.overlay} data-kinari-element="shimmer-overlay" aria-hidden="true" />
    </div>
  );
}
```

- [ ] **Step 5: Create `ShimmerDust/index.ts`**

```ts
export { ShimmerDust, type ShimmerDustProps } from "./ShimmerDust";
```

- [ ] **Step 6: Add to primitives barrel**

Open `packages/react/src/primitives/index.ts`. Add:

```ts
export { ShimmerDust, type ShimmerDustProps } from "./ShimmerDust";
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `pnpm --filter @kinari/react test -- ShimmerDust`
Expected: all 3 tests pass.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/primitives/ShimmerDust/ packages/react/src/primitives/index.ts
git commit -m "Add <ShimmerDust> primitive — CSS-only AI processing overlay"
```

---

### Task 10: A5 — `<AdjustAffordance>` primitive

**Files:**
- Create: `packages/react/src/primitives/AdjustAffordance/AdjustAffordance.tsx`
- Create: `packages/react/src/primitives/AdjustAffordance/AdjustAffordance.module.css`
- Create: `packages/react/src/primitives/AdjustAffordance/AdjustAffordance.test.tsx`
- Create: `packages/react/src/primitives/AdjustAffordance/index.ts`
- Modify: `packages/react/src/primitives/index.ts`

- [ ] **Step 1: Write the failing tests**

Create `packages/react/src/primitives/AdjustAffordance/AdjustAffordance.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdjustAffordance } from "./AdjustAffordance";

describe("<AdjustAffordance>", () => {
  it("renders default glyph and label", () => {
    render(<AdjustAffordance onAdjust={() => {}} />);
    expect(screen.getByRole("button", { name: /Adjust/i })).toBeInTheDocument();
    expect(screen.getByText("↻")).toBeInTheDocument();
  });

  it("fires onAdjust on click", () => {
    const onAdjust = vi.fn();
    render(<AdjustAffordance onAdjust={onAdjust} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onAdjust).toHaveBeenCalled();
  });

  it("renders custom label and glyph", () => {
    render(
      <AdjustAffordance onAdjust={() => {}} label="Refine" glyph={<span>★</span>} />,
    );
    expect(screen.getByRole("button", { name: /Refine/i })).toBeInTheDocument();
    expect(screen.getByText("★")).toBeInTheDocument();
  });

  it("applies size variant via data attribute", () => {
    const { container } = render(<AdjustAffordance onAdjust={() => {}} size="small" />);
    expect(container.firstChild).toHaveAttribute("data-size", "small");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm --filter @kinari/react test -- AdjustAffordance`
Expected: fail.

- [ ] **Step 3: Create `AdjustAffordance.module.css`**

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--shiro);
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  color: var(--sumi);
  font-family: -apple-system, "SF Pro Text", system-ui, sans-serif;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  box-shadow: var(--shadow-umber-resting);
  transition:
    transform var(--duration-cross-fade) var(--ease-tawami),
    box-shadow var(--duration-cross-fade) var(--ease-tawami);
}

.pill:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-umber-floating);
}

.pill:focus-visible {
  outline: 2px solid var(--shikon);
  outline-offset: 3px;
}

.pill[data-size="small"] {
  padding: 6px 12px;
  font-size: 11px;
}

.glyph {
  color: var(--kaki-iro);
  font-size: 15px;
  line-height: 1;
}

.pill[data-size="small"] .glyph {
  font-size: 13px;
}

@media (prefers-reduced-motion: reduce) {
  .pill { transition: none; }
}
```

- [ ] **Step 4: Create `AdjustAffordance.tsx`**

```tsx
import { type ReactNode } from "react";
import clsx from "clsx";
import styles from "./AdjustAffordance.module.css";

export interface AdjustAffordanceProps {
  /** Fired when tapped. */
  onAdjust: () => void;
  /** Label text. Default: "Adjust". */
  label?: string;
  /** Glyph rendered to the left of the label. Default: "↻". */
  glyph?: ReactNode;
  /** Size. Default: "medium". */
  size?: "small" | "medium";
  className?: string;
}

/** AI-result recovery affordance. The kaki-iro retry glyph is intentional —
 *  it's the framework-reserved color for celebratory numerals AND this
 *  recovery moment (an exception documented in the spec). */
export function AdjustAffordance({
  onAdjust,
  label = "Adjust",
  glyph = "↻",
  size = "medium",
  className,
}: AdjustAffordanceProps) {
  return (
    <button
      type="button"
      data-kinari-component="adjust-affordance"
      data-size={size}
      className={clsx(styles.pill, className)}
      onClick={onAdjust}
      aria-label={label}
    >
      <span className={styles.glyph} aria-hidden="true">
        {glyph}
      </span>
      <span>{label}</span>
    </button>
  );
}
```

- [ ] **Step 5: Create `AdjustAffordance/index.ts`**

```ts
export { AdjustAffordance, type AdjustAffordanceProps } from "./AdjustAffordance";
```

- [ ] **Step 6: Add to primitives barrel**

Open `packages/react/src/primitives/index.ts`. Add:

```ts
export { AdjustAffordance, type AdjustAffordanceProps } from "./AdjustAffordance";
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `pnpm --filter @kinari/react test -- AdjustAffordance`
Expected: all 4 tests pass.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/primitives/AdjustAffordance/ packages/react/src/primitives/index.ts
git commit -m "Add <AdjustAffordance> primitive — AI-result recovery pill"
```

---

## Phase 3 — Demo refactors (Tasks 11–12)

### Task 11: Refactor `<CaptureRitualDemo>` to use `useConfirmGlow`

**Files:**
- Modify: `packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.tsx`
- Modify: `packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.module.css`

- [ ] **Step 1: Open the current implementation**

Read `packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.tsx` to refresh on the current structure. Note the existing `[data-state="blooming"]` selector chain and the `.bloom` element.

- [ ] **Step 2: Update `CaptureRitualDemo.tsx` to use the hook**

Replace the contents of `CaptureRitualDemo.tsx` with:

```tsx
import { useRef, useState, type ReactNode } from "react";
import { useConfirmGlow } from "../../utils/useConfirmGlow";
import { type AccentName } from "@kinari/tokens";
import styles from "./CaptureRitualDemo.module.css";

export interface CaptureRitualDemoProps {
  subject?: ReactNode;
  accent?: AccentName | string;
}

export function CaptureRitualDemo({ subject = "🍎", accent }: CaptureRitualDemoProps) {
  const [state, setState] = useState<"idle" | "settled">("idle");
  const shutterRef = useRef<HTMLButtonElement | null>(null);
  const { glow } = useConfirmGlow({ color: accent });

  const fire = () => {
    if (shutterRef.current) {
      glow(shutterRef);
    }
    // Subject lands after the glow peak
    setTimeout(() => setState("settled"), 200);
  };

  const reset = () => setState("idle");

  return (
    <div className={styles.demo}>
      <div className={styles.stage} data-state={state}>
        <div className={styles.frame}>
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketTL}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketTR}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketBL}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketBR}`} />
        </div>
        <div className={styles.subject}>{subject}</div>
        <button
          ref={shutterRef}
          data-kinari-element="shutter"
          type="button"
          className={styles.shutter}
          onClick={fire}
          aria-label="Capture"
        />
        <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
          {state === "settled" ? "Capture complete" : ""}
        </div>
      </div>
      <button type="button" className={styles.replay} onClick={reset} aria-label="Replay">
        ↻ replay
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Clean up `CaptureRitualDemo.module.css`**

Open `packages/react/src/demos/CaptureRitualDemo/CaptureRitualDemo.module.css`. Remove the `.bloom` styles and `@keyframes bloom` (now handled by `useConfirmGlow`'s portal). Also remove the `[data-state="blooming"]` selector if it's only used for `.bloom`.

Find and delete:

```css
.bloom {
  position: absolute;
  inset: 30%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--kaki-iro) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.6);
  pointer-events: none;
}
[data-state="blooming"] .bloom {
  animation: bloom 300ms var(--ease-tawami) forwards;
}
@keyframes bloom {
  0%   { opacity: 0; transform: scale(0.6); }
  50%  { opacity: 0.6; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1); }
}
```

Keep the `.subject` selector but simplify — change from `[data-state="settled"] .subject { opacity: 1; }` (existing) — actually keep that, it's still in use.

- [ ] **Step 4: Run the existing tests**

Run: `pnpm --filter @kinari/react test -- CaptureRitualDemo`
Expected: all existing tests still pass. Old test that checked for `[data-state="blooming"]` element — verify if it exists; if it does, update it to instead assert that clicking the shutter eventually leads to `[data-state="settled"]`:

If a test exists like:
```tsx
it("on shutter tap, advances to bloom and then to settled", () => {
  fireEvent.click(container.querySelector('[data-kinari-element="shutter"]')!);
  expect(container.querySelector('[data-state="blooming"]')).toBeInTheDocument();
});
```

Update it to:
```tsx
it("on shutter tap, advances to settled", async () => {
  vi.useFakeTimers();
  fireEvent.click(container.querySelector('[data-kinari-element="shutter"]')!);
  act(() => { vi.advanceTimersByTime(250); });
  expect(container.querySelector('[data-state="settled"]')).toBeInTheDocument();
  vi.useRealTimers();
});
```

(Import `act` from `@testing-library/react` and `vi` from `vitest` at the top if not already.)

- [ ] **Step 5: Run tests again**

Run: `pnpm --filter @kinari/react test -- CaptureRitualDemo`
Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add packages/react/src/demos/CaptureRitualDemo/
git commit -m "Refactor CaptureRitualDemo to use useConfirmGlow"
```

---

### Task 12: Refactor `<SubjectLiftDemo>` to use `<ShimmerDust>`

**Files:**
- Modify: `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.tsx`
- Modify: `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.module.css`

- [ ] **Step 1: Update `SubjectLiftDemo.tsx`**

Replace the contents of `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.tsx` with:

```tsx
import { useState } from "react";
import { ShimmerDust } from "../../primitives/ShimmerDust";
import cutoutUrl from "./assets/apple-cutout.png?url";
import contextUrl from "./assets/apple-on-counter.jpg?url";
import styles from "./SubjectLiftDemo.module.css";

export interface SubjectLiftDemoProps {
  src?: string;
  context?: string;
}

export function SubjectLiftDemo({
  src = cutoutUrl,
  context = contextUrl,
}: SubjectLiftDemoProps = {}) {
  const [state, setState] = useState<"idle" | "shimmering" | "lifted">("idle");

  const lift = () => {
    setState("shimmering");
    setTimeout(() => setState("lifted"), 700);
  };

  return (
    <div className={styles.demo}>
      <div className={styles.stage} data-state={state}>
        <ShimmerDust active={state === "shimmering"}>
          <img src={context} alt="" className={styles.context} aria-hidden="true" />
          <img src={src} alt="" className={styles.subject} aria-hidden="true" />
        </ShimmerDust>
        <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
          {state === "lifted" ? "Subject lifted" : ""}
        </div>
      </div>
      <button type="button" className={styles.cta} onClick={lift} aria-label="Lift subject">
        Lift subject ↑
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Clean up `SubjectLiftDemo.module.css`**

Open `packages/react/src/demos/SubjectLiftDemo/SubjectLiftDemo.module.css`. Remove the inline shimmer-related styles:

Delete these blocks:
```css
.shimmer { position: absolute; inset: 0; opacity: 0; pointer-events: none; background: repeating-linear-gradient(45deg, transparent 0 6px, color-mix(in srgb, var(--kaki-iro) 30%, transparent) 6px 8px); }
[data-state="shimmering"] .shimmer { animation: shimmer 700ms var(--ease-tawami) forwards; }
@keyframes shimmer { 0% { opacity: 0; } 30% { opacity: 0.6; } 100% { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  [data-state="shimmering"] .shimmer { animation: none; opacity: 0; }
}
```

Keep all other styles (.demo, .stage, .context, .subject, .cta, the data-state subject/context fade rules).

- [ ] **Step 3: Run tests**

Run: `pnpm --filter @kinari/react test -- SubjectLiftDemo`
Expected: all existing tests still pass, including the live-region test from Phase 1 a11y.

- [ ] **Step 4: Commit**

```bash
git add packages/react/src/demos/SubjectLiftDemo/
git commit -m "Refactor SubjectLiftDemo to wrap with <ShimmerDust>"
```

---

## Phase 4 — Preview app update, version bump, CHANGELOG (Tasks 13–14)

### Task 13: Update `apps/preview` with new components + rename

**Files:**
- Modify: `apps/preview/src/App.tsx`

- [ ] **Step 1: Rename `accent` props to `shadowAccent` in the preview**

Open `apps/preview/src/App.tsx`. Find the two stickers using `accent`:

```tsx
            <Sticker accent="moegi">
              <span style={{ color: "var(--moegi)", fontWeight: 700, fontSize: 14 }}>
                moegi shadow
              </span>
            </Sticker>
            <Sticker accent="shikon">
              <span style={{ color: "var(--shikon)", fontWeight: 700, fontSize: 14 }}>
                shikon shadow
              </span>
            </Sticker>
```

Replace with:

```tsx
            <Sticker shadowAccent="moegi">
              <span style={{ color: "var(--moegi)", fontWeight: 700, fontSize: 14 }}>
                moegi shadow
              </span>
            </Sticker>
            <Sticker shadowAccent="shikon">
              <span style={{ color: "var(--shikon)", fontWeight: 700, fontSize: 14 }}>
                shikon shadow
              </span>
            </Sticker>
```

- [ ] **Step 2: Add an example polaroid sticker to the Sticker block**

Still in the `<Sticker>` preview-block-body, after the four existing stickers, add:

```tsx
            <Sticker variant="polaroid" caption="Maine coast · June" photoAspect="4/3">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #8da4b3 0%, #b9c6cd 40%, #d4ddc8 100%)",
                }}
              />
            </Sticker>
```

- [ ] **Step 3: Add a new preview block for `<EmptyState>` and `<AdjustAffordance>`**

After the primitives section, before the patterns section, insert a new sub-section. Find this line:

```tsx
      <Horizon mark="*" />

      {/* ─── PATTERNS ────────────────────────────────────────── */}
```

Replace with:

```tsx
      <Horizon mark="*" />

      {/* ─── NEW IN v0.2 ─────────────────────────────────────── */}
      <section className="preview-section">
        <div className="preview-section-eyebrow">layer 01.5</div>
        <h2 className="preview-section-title">New in v0.2</h2>
        <p className="preview-section-sub">Empty state · Adjust affordance.</p>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;EmptyState&gt;</span>
            <span className="preview-block-desc">kanji + bilingual + accent CTA</span>
          </div>
          <EmptyState
            glyph="空"
            title="Your diary is empty."
            reading="kara · empty"
            body="Nothing to see yet. Capture your first artifact to begin."
            action={{ label: "+ Begin", onClick: () => {} }}
            accent="shikon"
          />
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;AdjustAffordance&gt;</span>
            <span className="preview-block-desc">AI-result recovery pill</span>
          </div>
          <div className="preview-block-body">
            <AdjustAffordance onAdjust={() => {}} />
            <AdjustAffordance onAdjust={() => {}} label="Refine" size="small" />
          </div>
        </div>
      </section>

      <Horizon mark="*" />

      {/* ─── PATTERNS ────────────────────────────────────────── */}
```

- [ ] **Step 4: Add the new imports at the top**

At the top of `apps/preview/src/App.tsx`, find the import block:

```tsx
import {
  Sticker,
  Horizon,
  BilingualPair,
  NumericDisplay,
  PrincipleChip,
  Display,
  Label,
  Body,
  NavPill,
  QuietTabs,
  SingleButton,
  ThreeCircles,
} from "@kinari/react";
```

Add `EmptyState` and `AdjustAffordance`:

```tsx
import {
  Sticker,
  Horizon,
  BilingualPair,
  NumericDisplay,
  PrincipleChip,
  Display,
  Label,
  Body,
  EmptyState,
  AdjustAffordance,
  NavPill,
  QuietTabs,
  SingleButton,
  ThreeCircles,
} from "@kinari/react";
```

- [ ] **Step 5: Typecheck the preview**

Run: `pnpm --filter @kinari/preview typecheck`
Expected: zero errors.

- [ ] **Step 6: Smoke-test the preview build**

Run: `pnpm --filter @kinari/preview build`
Expected: build completes; `apps/preview/dist/` exists.

- [ ] **Step 7: Commit**

```bash
git add apps/preview/src/App.tsx
git commit -m "Update preview app: shadowAccent rename + polaroid, EmptyState, AdjustAffordance blocks"
```

---

### Task 14: Version bump + CHANGELOG

**Files:**
- Modify: `packages/react/package.json`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Bump version in `packages/react/package.json`**

Open `packages/react/package.json`. Find:
```json
  "version": "0.1.0",
```

Change to:
```json
  "version": "0.2.0",
```

- [ ] **Step 2: Add the v0.2 section to `CHANGELOG.md`**

Read the existing `CHANGELOG.md` to see the v0.1 section format. Then prepend a new section above v0.1:

```markdown
## v0.2 — 2026-05-19

`@kinari/react` 0.1.0 → 0.2.0. Tokens unchanged.

### Added

- `<EmptyState>` — kanji glyph + bilingual reading + italic gloss + filled accent CTA. For DotGridCanvas surfaces before content lands.
- `<ShimmerDust active>` — CSS-only AI-processing overlay. Wrap any element; parent controls when it sweeps.
- `<AdjustAffordance>` — small white pill with kaki-iro retry glyph + body-sans label. Reserved kaki-iro use (alongside `<NumericDisplay>`).
- `useConfirmGlow()` hook — bloom-and-contract effect, portal-mounted, accepts a `RefObject<HTMLElement>` or `DOMRect`.
- `<Sticker variant="polaroid">` now accepts `caption` and `photoAspect` ("square" / "4/3" / "3/4" / "16/9") props.

### Changed

- **Breaking:** `<Sticker accent>` is renamed to `<Sticker shadowAccent>`. Old prop still works in v0.2 with a deprecation warning; removed in v0.3.
- `<TypePair>` `Display`, `Label`, `Body` now spread arbitrary HTML attributes (style, data-*, event handlers) to the rendered element.
- `<Sticker>` rotation seed now uses a `useState` initializer, guaranteed stable across React 19 StrictMode double-mount.
- `<SubjectLiftDemo>` ships local sample assets — no external Unsplash dependency.

### Improved (accessibility)

- `<NumericDisplay>` exposes `aria-label="${value} ${unit}"`.
- `<Horizon>` gradient lines marked `aria-hidden`.
- `<NavPill>` breadcrumb tagged `aria-current="step"`.
- `<SingleButton>` derives `aria-label` from string `title` when no explicit label given.
- `<ThreeCircles>` row grouped as `role="group" aria-label="Decision"`.
- `<CaptureRitualDemo>` and `<SubjectLiftDemo>` announce completion via `aria-live="polite"`.
- `<DiarySpineDemo>` entries expose `aria-expanded`.

### Refactored (internal)

- `<CaptureRitualDemo>` now uses `useConfirmGlow` instead of inline keyframes.
- `<SubjectLiftDemo>` now wraps its subject in `<ShimmerDust>` instead of inline shimmer CSS.

---
```

(Add a horizontal rule and keep the v0.1 section intact below.)

- [ ] **Step 3: Run the entire test suite + build + lint + typecheck**

Run:
```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```
Expected: all green.

- [ ] **Step 4: Commit**

```bash
git add packages/react/package.json CHANGELOG.md
git commit -m "Bump @kinari/react to 0.2.0; add v0.2 CHANGELOG entry"
```

- [ ] **Step 5: Tag the milestone**

```bash
git tag -a kinari-react-v0.2 -m "Kinari react v0.2 — polish + 5 additions"
```

(Local tag only; push to remote at merge time.)

---

## Self-review

**Spec coverage:**

- ✅ P1 TypePair passthrough → Task 1
- ✅ P2 Sticker rotation StrictMode safety → Task 2
- ✅ P3 Sticker accent → shadowAccent rename → Task 3
- ✅ P4 SubjectLiftDemo local assets → Task 4
- ✅ P5 A11y audit pass → Task 5
- ✅ A1 Polaroid Sticker variant extension → Task 6
- ✅ A2 EmptyState primitive → Task 7
- ✅ A3 useConfirmGlow hook → Task 8
- ✅ A4 ShimmerDust primitive → Task 9
- ✅ A5 AdjustAffordance primitive → Task 10
- ✅ CaptureRitualDemo refactor → Task 11
- ✅ SubjectLiftDemo refactor → Task 12
- ✅ Preview app updates → Task 13
- ✅ Version bump + CHANGELOG → Task 14

All 14 tasks map to a spec item. No spec item lacks a task.

**Placeholder scan:** no TBDs, no "implement later", no "fill in details". Every step has the exact code or command needed.

**Type consistency:**
- `StickerProps` adds `shadowAccent`, `caption`, `photoAspect` consistently — Task 3 introduces `shadowAccent`, Task 6 adds the polaroid props.
- `useConfirmGlow`'s `glow(target)` accepts `RefObject<HTMLElement> | DOMRect` consistently in Task 8 (definition) and Task 11 (usage in CaptureRitualDemo refactor).
- `EmptyStateAction` is referenced only inside the EmptyState file (Task 7) — no cross-file consistency issue.
- `ShimmerDustProps.active: boolean` — matches usage in Task 12 (`active={state === "shimmering"}`).

---

## Acceptance criteria

- [ ] `pnpm install && pnpm build` succeeds clean.
- [ ] `pnpm typecheck` zero errors.
- [ ] `pnpm lint` zero warnings.
- [ ] `pnpm test` passes; coverage at or above v0.1 thresholds (≥80% on primitives + patterns).
- [ ] Preview app builds and renders all new sections (EmptyState, AdjustAffordance, polaroid Sticker example).
- [ ] `<Sticker accent>` fires `console.warn` exactly once per call site in dev; production build has no warning code.
- [ ] CaptureRitualDemo and SubjectLiftDemo play their full animations end-to-end.
- [ ] `prefers-reduced-motion: reduce` suppresses ShimmerDust and useConfirmGlow animations (instant state changes).
- [ ] No external network dependencies in any demo.
- [ ] CHANGELOG `## v0.2` section is complete; tag `kinari-react-v0.2` exists locally.
- [ ] GitHub Pages auto-deploys the updated preview after merge (existing workflow).

When all green, v0.2 is ready to merge.

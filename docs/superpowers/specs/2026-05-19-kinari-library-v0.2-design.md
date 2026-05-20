# Kinari Library v0.2 — Polish + Additions Design Spec

**Date:** 2026-05-19
**Status:** Approved through brainstorming; ready for implementation planning
**Phase:** Library v0.2 — polish to existing components + 5 new additions
**Supersedes nothing:** v0.1 design ([2026-05-18](2026-05-18-kinari-library-and-site-design.md)) remains the architectural baseline. This spec adds to it.

---

## Goal

Two-part deliverable on top of `@kinari/react@0.1.0`:

1. **Polish** — fix 5 real friction items observed while building the preview app: TypePair API gaps, Sticker rotation stability under StrictMode, ambiguous Sticker accent API, demo dependency on external Unsplash images, missing accessibility primitives.

2. **Additions** — 5 new exports that fill gaps the v0.1 spec called out as deferred or implicit: PolaroidSticker (via Sticker variant), EmptyState, useConfirmGlow hook, ShimmerDust, AdjustAffordance.

Result: `@kinari/react@0.2.0`. Tokens package unchanged.

## Non-goals

- New tokens (no palette / motion / shadow changes).
- New patterns (the 4 patterns from v0.1 stay).
- Visual regression tooling (deferred to Plan B / the site).
- npm publish.
- New platform packages (react-native, swiftui).
- Storybook.

---

## Decisions ledger

| Question | Decision |
|---|---|
| Round size | Full v0.2 — polish + all 5 additions |
| Order | Polish first, additions after |
| Sticker accent API | Rename `accent` → `shadowAccent` with deprecation warning; old prop still works (removed in v0.3) |
| ConfirmGlow API | Imperative hook: `const { glow, isGlowing } = useConfirmGlow(opts)` |
| ShimmerDust implementation | CSS-only animation (gradient + transform); no Canvas |
| PolaroidSticker shape | Sticker variant `variant="polaroid"` with `caption` + `photoAspect` props; not a new component |
| EmptyState shape | Kanji glyph + bilingual title + reading + italic gloss + filled accent CTA |
| AdjustAffordance shape | Small white pill with kaki-iro retry glyph + body-sans label |
| A11y depth | Add missing aria-labels, add `aria-live="polite"` on demos that announce state changes, verify keyboard tab order. Defer axe-core CI to Plan B. |
| Version bump | `@kinari/react`: 0.1.0 → 0.2.0; `@kinari/tokens`: unchanged |

---

## Polish — 5 items

### P1 — `<TypePair>` (Display / Label / Body) HTML pass-through

**Friction:** building the preview, inline `style` props on `<Display as="h3" style={{ fontSize: 26 }}>` failed to compile because `TypeRoleProps` didn't include them. Workaround was dropping the inline styles entirely.

**Change:** type widens to extend `React.HTMLAttributes<HTMLElement>`; component spreads `...rest` onto the rendered element.

```ts
// Before
export interface TypeRoleProps {
  children: ReactNode;
  as?: ElementType;
  className?: string | undefined;
}

// After
export type TypeRoleProps = {
  children: ReactNode;
  as?: ElementType;
} & React.HTMLAttributes<HTMLElement>;
```

Implementation:
```tsx
export function Display({ children, as: As = "h2", className, ...rest }: TypeRoleProps) {
  return <As className={clsx(styles.display, className)} {...rest}>{children}</As>;
}
```

### P2 — `<Sticker>` rotation stability under StrictMode

**Risk:** `useMemo(() => Math.random()*…, [])` is re-evaluated under React 19 StrictMode's intentional double-mount in dev. Two mounts → two different random values → visible flicker.

**Change:** swap to `useState` initializer (function form), which is guaranteed to be invoked exactly once even with StrictMode double-mount.

```tsx
const [stableRotation] = useState<number>(
  () => rotation ?? Math.random() * 2.3 - 1.2,
);
```

**Contract preserved:** changing the `rotation` prop after mount does NOT update the rendered tilt. This is intentional and matches the documented "stable per mount" contract.

### P3 — `<Sticker accent>` → `<Sticker shadowAccent>`

**API breaking change** in v0.2. Old name was misleading: `accent="moegi"` only tinted the *drop shadow*, not the sticker background; visitors expected accent to color the entire sticker.

**New API:**
```ts
interface StickerProps {
  /** When set, the drop shadow is tinted with this accent's hue. The sticker background stays white. */
  shadowAccent?: AccentName | string;
  /** @deprecated Use `shadowAccent` instead. Will be removed in v0.3. */
  accent?: AccentName | string;
  // ... other props
}
```

**Migration handling in `Sticker.tsx`:**
```tsx
const resolvedAccent = shadowAccent ?? accent;
if (accent && !shadowAccent && process.env.NODE_ENV !== "production") {
  // Warn once per call site
  warnOnceForCallSite(
    "Sticker prop `accent` is deprecated; rename to `shadowAccent`. Behavior is unchanged.",
  );
}
```

The `warnOnceForCallSite` helper uses a `Set<string>` keyed by the React stack trace to avoid spamming logs during dev rerenders.

**Old call sites still compile** (deprecated typed prop). The `apps/preview` is updated to `shadowAccent` in the same commit that adds the deprecation so no warning fires.

### P4 — `<SubjectLiftDemo>` ships local assets

**Friction:** demo currently loads two external Unsplash URLs; subject to network failures, CDN changes, image rotation.

**Change:** add `packages/react/src/demos/assets/`:

| Asset | Source | Size budget |
|---|---|---|
| `apple-on-counter.jpg` | CC0 Unsplash photo of an apple on a wood surface | ≤80 KB |
| `apple-cutout.png` | Pre-masked transparent PNG of just the apple | ≤30 KB |

Updated default props:
```ts
import cutoutUrl from "./assets/apple-cutout.png?url";
import contextUrl from "./assets/apple-on-counter.jpg?url";

export function SubjectLiftDemo({
  src = cutoutUrl,
  context = contextUrl,
}: SubjectLiftDemoProps) { /* ... */ }
```

Vite resolves `?url` imports correctly; Vitest needs the same config (already true via Vite's transform pipeline).

**Total bundle size impact:** +110 KB to the demo assets, NOT to the consumer's main bundle — assets are only loaded when the demo component is instantiated.

### P5 — Accessibility audit pass

| Component | Change | Reason |
|---|---|---|
| `<NumericDisplay>` | Add `aria-label={\`${value} ${unit}\`}` when both are present | Screen readers otherwise read "94" and "kcal" as two unrelated tokens |
| `<Horizon>` | Add `aria-hidden="true"` on the two gradient `<div>` lines | They're decorative; `role="separator"` on the parent is the semantic carrier |
| `<NavPill>` | Add `aria-current="step"` on the breadcrumb center zone | Currently relies on visual cues only |
| `<QuietTabs>` | Add `aria-label="Primary navigation"` if not already present | Verified — already there |
| `<SingleButton>` | Derive `aria-label` from `title` prop when no explicit label given | Currently a button with no text |
| `<ThreeCircles>` | Add `role="group" aria-label="Decision"` on the row container | Groups the three buttons as a single semantic unit |
| `<CaptureRitualDemo>` | Add `<div aria-live="polite">` that announces "Capture complete" when state transitions to `settled` | Otherwise the visual capture moment is silent to AT users |
| `<SubjectLiftDemo>` | Add same `aria-live` announcing "Subject lifted" on `state="lifted"` | Same reason |
| `<DiarySpineDemo>` | Add `aria-expanded={isFocused}` on each entry button | Communicates the drill-in state |

No new dependencies. Each addition is one or two lines + a test assertion. Existing tests don't change behavior; new tests assert the new attributes' presence.

**Deferred:** formal `@axe-core/playwright` CI integration moves to Plan B (the site).

---

## Additions — 5 components / hooks

### A1 — `<Sticker variant="polaroid">` extension

Not a new component. Existing `polaroid` variant gets fleshed out.

**New props:**
```ts
interface StickerProps {
  // ... existing
  /** Polaroid-only. Caption rendered below the photo. */
  caption?: ReactNode;
  /** Polaroid-only. Aspect ratio of the photo area. Default: "square". */
  photoAspect?: "square" | "4/3" | "3/4" | "16/9";
}
```

**Use:**
```tsx
<Sticker variant="polaroid" caption="June · Maine coast" photoAspect="square">
  <img src="/beach.jpg" alt="" />
</Sticker>
```

**Implementation:** when `variant === "polaroid"`, children are wrapped in a `.photo` div with `aspect-ratio` driven by a CSS class derived from `photoAspect`. The caption renders below in Georgia 600, 14px, centered, color `var(--sumi)`. Existing variant CSS gets a small extension:

```css
.polaroid { padding: 14px 14px 30px; }
.polaroid .photo { width: 100%; border-radius: 8px; overflow: hidden; }
.polaroid .photoSquare  { aspect-ratio: 1; }
.polaroid .photo43      { aspect-ratio: 4/3; }
.polaroid .photo34      { aspect-ratio: 3/4; }
.polaroid .photo169     { aspect-ratio: 16/9; }
.polaroid .caption {
  font-family: Georgia, serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--sumi);
  margin-top: 12px;
  text-align: center;
}
```

### A2 — `<EmptyState>`

```ts
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
  /** CTA. Omit for an empty state without action. */
  action?: EmptyStateAction;
  /** Project accent for the CTA fill. Default: shikon. */
  accent?: AccentName | string;
  className?: string;
}
```

**Use:**
```tsx
<EmptyState
  glyph="空"
  title="Your diary is empty."
  reading="kara · empty"
  body="Nothing to see yet. Capture your first artifact."
  action={{ label: "+ Begin", onClick: () => openCapture() }}
  accent="shikon"
/>
```

**Layout (vertical, centered):**
- Kanji glyph: Georgia 56px, `var(--sumi-mute)` (≈#8a8a8a), `transform: rotate(-2deg)`, text-shadow per upper-left light rule, margin-bottom 18px.
- Title: Georgia 600, 22px, `var(--sumi)`.
- Reading: 11px, letter-spacing 0.22em, uppercase, `var(--sumi-mute)`, margin-top 6px.
- Body: Georgia italic, 14px, `var(--sumi-muted)`, margin: 16px 0 24px.
- Action: filled accent pill button, padding 10px 22px, 13px chunky sans 700, accent box-shadow via `shadowFromAccent(accent)`.

**Accessibility:** glyph gets `aria-hidden="true"`; the reading line gets `aria-hidden="true"` (decoration); title is the semantic anchor; the CTA renders as a `<button>` with `aria-label={action.label}` (redundant but bullet-proof).

**Files:** `packages/react/src/primitives/EmptyState/EmptyState.{tsx,module.css,test.tsx}` + `index.ts`. Add to `primitives/index.ts` barrel.

### A3 — `useConfirmGlow()` hook

```ts
import { type RefObject } from "react";

export interface UseConfirmGlowOptions {
  /** Color for the radial-gradient stops. Default: var(--kaki-iro) */
  color?: string;
  /** Total animation duration in ms (bloom + contract). Default: 300 */
  duration?: number;
}

export interface UseConfirmGlowResult {
  /** Trigger the bloom centered on a target. */
  glow: (target: RefObject<HTMLElement> | DOMRect) => void;
  /** True while the bloom is animating. */
  isGlowing: boolean;
}

export function useConfirmGlow(opts?: UseConfirmGlowOptions): UseConfirmGlowResult;
```

**Implementation:**
1. The hook owns a `useRef<HTMLDivElement | null>(null)` for a single portal-mounted glow element.
2. First call to `glow()` creates the portal element (lazy-mount); attaches to `document.body`.
3. `glow(target)` reads the bounding rect (from `target.current.getBoundingClientRect()` or directly if `target` is a `DOMRect`), positions the portal `<div>` at the rect's center, sets `data-state="blooming"`, schedules `setTimeout(150ms)` → `data-state="contracting"`, schedules `setTimeout(300ms)` → `data-state="idle"` and sets `isGlowing = false`.
4. CSS handles the actual animation via keyframes keyed off `data-state`. `prefers-reduced-motion: reduce` makes the keyframes a no-op (instant state change, no visible glow).
5. Cleanup: on unmount, the hook removes the portal element from `document.body`.

**Styling (in tokens via CSS variables; component CSS adds the keyframes):**
```css
.glow {
  position: fixed;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle, var(--kaki-iro) 0%, transparent 70%);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.6);
  z-index: 9999;
}
.glow[data-state="blooming"]    { animation: bloom 150ms var(--ease-tawami) forwards; }
.glow[data-state="contracting"] { animation: contract 150ms var(--ease-tawami) forwards; }
@keyframes bloom {
  to { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
}
@keyframes contract {
  to { opacity: 0; transform: translate(-50%, -50%) scale(1); }
}
```

**Files:** `packages/react/src/utils/useConfirmGlow.{ts,test.tsx}` + a `useConfirmGlow.module.css`. Add to `utils/index.ts` barrel.

**Demo refactor:** `<CaptureRitualDemo>` calls `useConfirmGlow()` instead of managing its own animation state. Roughly −25 lines of inline keyframe + state code.

### A4 — `<ShimmerDust>`

```ts
export interface ShimmerDustProps {
  children: ReactNode;
  /** When true, the shimmer overlay is visible. Parent controls timing. */
  active: boolean;
  /** Project accent for the shimmer hue. Default: kaki-iro. */
  accent?: AccentName | string;
  className?: string;
}
```

**Use:**
```tsx
<ShimmerDust active={state === "shimmering"}>
  <img src="..." alt="" />
</ShimmerDust>
```

**Implementation:** wrapper `<div>` with `position: relative` containing children and an absolutely-positioned `<div class="shimmer">` overlay. The overlay's background is a layered diagonal-stripe gradient using the accent color. When `active` is true, the overlay animates `opacity` 0 → 0.6 → 0 + `background-position` translating across the surface (700ms total).

```css
.shimmer {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    45deg,
    transparent 0 6px,
    color-mix(in srgb, var(--shimmer-accent, var(--kaki-iro)) 30%, transparent) 6px 8px
  );
}
.wrapper[data-active="true"] .shimmer {
  animation: shimmer 700ms var(--ease-tawami) forwards;
}
@keyframes shimmer {
  0%   { opacity: 0; background-position: 0 0; }
  30%  { opacity: 0.6; }
  100% { opacity: 0; background-position: 80px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .wrapper[data-active="true"] .shimmer { animation: none; opacity: 0; }
}
```

**Files:** `packages/react/src/primitives/ShimmerDust/{ShimmerDust.tsx,ShimmerDust.module.css,ShimmerDust.test.tsx,index.ts}`. Add to `primitives/index.ts` barrel.

**Demo refactor:** `<SubjectLiftDemo>` wraps its subject image in `<ShimmerDust active={state === "shimmering"}>` and drops its inline `.shimmer` styles.

### A5 — `<AdjustAffordance>`

```ts
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
```

**Use:**
```tsx
<AdjustAffordance onAdjust={() => openAdjustSheet()} />
```

**Implementation:** `<button>` with class `.pill`. Renders as a small white pill (≥36px tall at medium, ≥28px at small), with the kaki-iro retry glyph + body sans label.

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
  transition: transform var(--duration-cross-fade) var(--ease-tawami);
}
.pill:hover, .pill:focus-visible {
  transform: translateY(-1px);
  box-shadow: var(--shadow-umber-floating);
}
.pill:focus-visible { outline: 2px solid var(--shikon); outline-offset: 3px; }
.pill .glyph { color: var(--kaki-iro); font-size: 15px; }
.pill[data-size="small"] { padding: 6px 12px; font-size: 11px; }
```

**Reserved color rule:** the kaki-iro glyph is intentional and respects Pattern #07 (kaki-iro is reserved for celebratory numerals OR — by extension — this recovery affordance). Document this exception in the component's README block.

**Files:** `packages/react/src/primitives/AdjustAffordance/{AdjustAffordance.tsx,.module.css,.test.tsx,index.ts}`. Add to `primitives/index.ts` barrel.

---

## Testing strategy

### Per-component tests

| Change | Test file | Assertions |
|---|---|---|
| P1 TypePair passthrough | `TypePair.test.tsx` (extend) | inline style propagates; `data-foo` attrs propagate; existing tests still pass |
| P2 Sticker rotation stability | `Sticker.test.tsx` (extend) | mounting + unmounting + remounting produces same seed (mock `Math.random`); StrictMode double-mount preserves value |
| P3 Sticker rename | `Sticker.test.tsx` (extend) | `shadowAccent="moegi"` works; `accent="moegi"` works with one `console.warn` fired; both passing simultaneously prefers `shadowAccent` |
| P4 SubjectLiftDemo assets | `SubjectLiftDemo.test.tsx` (extend) | default `src` URL doesn't start with `http`; loads local |
| P5 A11y | each existing test (extend) | new aria-* attributes present (one assertion per item) |
| A1 Polaroid extension | `Sticker.test.tsx` (extend) | `caption` text renders in the right slot; `photoAspect="4/3"` applies a class with `aspect-ratio: 4/3` |
| A2 EmptyState | `EmptyState.test.tsx` (new) | renders glyph + title + reading + body + button; clicking button fires onClick; missing action prop renders without a button |
| A3 useConfirmGlow | `useConfirmGlow.test.tsx` (new) | `glow(rect)` sets `isGlowing=true`; portal appears in `document.body`; after `duration` ms, `isGlowing=false`; cleanup on unmount removes portal |
| A4 ShimmerDust | `ShimmerDust.test.tsx` (new) | `active=true` adds `data-active="true"`; reduced-motion media query suppresses animation |
| A5 AdjustAffordance | `AdjustAffordance.test.tsx` (new) | default glyph + label; `onAdjust` fires; custom label/glyph render |

### Coverage targets (unchanged from v0.1)

- `packages/react/src/primitives/` ≥ 80% lines + functions
- `packages/react/src/patterns/` ≥ 80% lines + functions
- Demos exempt
- New `utils/useConfirmGlow.test.tsx` counts toward primitives bucket since it's load-bearing for the demos

### Lint / typecheck / format

All passing per existing config. No new ESLint plugins. No new TypeScript flags.

---

## Migration

### Breaking change: `<Sticker accent>` → `<Sticker shadowAccent>`

Single breaking change in v0.2. Migration window:

| Version | `accent` works | `shadowAccent` works | Warning |
|---|---|---|---|
| v0.1 | ✅ | — | — |
| v0.2 | ✅ (deprecated) | ✅ | dev console.warn once per call site |
| v0.3 | ❌ (TypeScript error) | ✅ | — |

`apps/preview` is migrated in the same commit that adds the deprecation. Future consumers see the warning at dev time and have all of v0.2 to migrate before v0.3 removes the old prop.

### Demo refactors

`<CaptureRitualDemo>` and `<SubjectLiftDemo>` get internal refactors to use `useConfirmGlow` and `<ShimmerDust>` respectively. Existing demo tests must still pass — behavior is unchanged; only implementation moves.

### Preview app additions

`apps/preview/src/App.tsx` adds three new sections after the existing layout-03 demos:
- A `<Sticker variant="polaroid">` example block in the existing primitives section
- An `<EmptyState>` block in a new "layer 01.5" sub-section
- An `<AdjustAffordance>` block paired with a stock result-sticker

Total preview app diff: ~80 lines added.

---

## Acceptance criteria for v0.2

- [ ] `pnpm install && pnpm build` succeeds clean.
- [ ] `pnpm typecheck` zero errors.
- [ ] `pnpm lint` zero warnings.
- [ ] `pnpm test` all suites pass; coverage at or above v0.1 thresholds.
- [ ] All 5 polish items verifiable in the preview app.
- [ ] All 5 additions visible in the preview app.
- [ ] `apps/preview` deploys successfully to GitHub Pages via the existing workflow on push to master.
- [ ] `console.warn` fires exactly once per `<Sticker accent>` call site in dev mode; never in production.
- [ ] Visual demo regression: capture and subject-lift demos still play their full animations end-to-end.
- [ ] `prefers-reduced-motion: reduce` shorts out all new animations (ShimmerDust, ConfirmGlow, EmptyState glyph tilt unaffected since it's not animated).
- [ ] No external network dependencies in any demo (Unsplash URLs removed; local assets in place).
- [ ] CHANGELOG entry under `## v0.2` lists every change.

---

## Risks & open items

### Known risks

1. **`Math.random` mock in Sticker rotation test.** Vitest's `vi.spyOn(Math, "random")` is the safest path; using a module-level mock could leak. Mitigation: scope the mock to the test block.
2. **`useConfirmGlow` SSR safety.** The hook touches `document.body`. Need a `typeof document !== "undefined"` guard before portal creation. Test runs in jsdom so it works; consumers on Next.js SSR would otherwise crash.
3. **`<ShimmerDust>` accent color-mix support.** Older Safari (pre-15.4) doesn't support `color-mix()`. Mitigation: ship a fallback to `rgba(217,122,60,0.3)` (hard-coded kaki-iro 30%) via `@supports`. Add the `@supports not (background: color-mix(in srgb, red, blue))` block in the CSS.
4. **Sticker deprecation warning noise.** If consumers use `accent` many times per render (e.g., in a sticker wall), spamming the console would be bad. Mitigation: the `warnOnceForCallSite` helper dedupes by stack trace.

### Open items (deferred to a later round)

- A `<PolaroidSticker>` as its own component instead of a variant — revisit when a project earns it.
- A "ghost sticker" variant of EmptyState (option C from the brainstorm) — revisit if a project earns it.
- Formal `@axe-core/playwright` CI — Plan B (the site).
- Bundle size budget enforcement in CI — Plan B.
- Storybook-style per-component playground URLs in the preview app — could be a separate v0.2.x polish item.

---

## Phasing

Single batch. Implementation order: polish first (P1 → P5), then additions (A1 → A5). Each item is its own commit; tests land with the implementation. The plan (writing-plans next) will lay out task-level breakdown.

---

*This spec is the source of truth for v0.2. The implementation plan, generated next, breaks it into discrete tasks.*

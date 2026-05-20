# Changelog

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
- `<Sticker>` rotation seed now uses a `useState` initializer for cleaner "remember once" semantics (drops the `eslint-disable` comment).
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

## v0.1 — 2026-05-18

Initial release of the Kinari design framework.

### Added

- **README** — entry point with how-to-use and layer pointers
- **Principles** (`docs/principles.md`) — 10 commitments
- **Visual Language** (`docs/visual-language.md`) — 8 sections: typography, color, shadows, photo treatment, backgrounds, iconography, layout, motion
- **Lineage** (`docs/lineage.md`) — three traditions, vocabulary, principle-to-source map, reading list
- **Pattern Library** (`docs/patterns/`) — 12 seed patterns:
  - 01 Sticker Primitive · 02 Dot-Grid Canvas · 03 Capture Ritual · 04 Diary Spine
  - 05 Subject Lift · 06 Bilingual Pair · 07 Numeral Display · 08 Soft Spring
  - 09 Navigation Pill · 10 Quiet Tabs · 11 Single Button · 12 Three Circles
- **Reference context** (`docs/context/`) — preserved app captures, motion analysis, navigation analysis

### Deferred

- Figma library (Phase 2)
- Public static site (Phase 3)
- First example project applying Kinari (Phase 4)

### Decisions ledger

See [the design spec](docs/superpowers/specs/2026-05-18-kinari-framework-design.md#decisions-ledger-resolved-during-brainstorming) for the full ledger of decisions made during brainstorming.

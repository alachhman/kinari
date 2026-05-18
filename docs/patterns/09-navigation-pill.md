# Pattern 09 · Navigation Pill · 案内 *annai*

**Core:** Linear navigation chrome for documentation, tours, and onboarding sequences. **Not for product navigation.**

**Serves principles:** [#4 Chunky over skinny](../principles.md#04-chunky-over-skinny) · [#6 Time is the spine](../principles.md#06-time-is-the-spine)

**Source:** Designed for the framework's own site — the brainstorming tour proved out the geometry. Not visible in the reference apps (which use product-navigation patterns; see [#10 Quiet Tabs](10-quiet-tabs.md), [#11 Single Button](11-single-button.md), [#12 Three Circles](12-three-circles.md)).

---

## Spirit

A bottom-fixed sticker pill anchored ≥18px above the bottom edge, with slight rotation (-0.3°), warm-umber shadow, and light from the upper-left. **The nav itself obeys the framework's own visual language** — the same sticker primitive treatment as any content sticker.

Three zones inside the pill:
1. **Prev** — `← 前へ prev` (bilingual lockup, disabled at start)
2. **Current breadcrumb** — bilingual section pair on top, dot-strip progress indicator below
3. **Next** — `次へ next →` (bilingual lockup, disabled at end)

Keyboard parity: `← / →` arrows for prev/next, number keys `1–N` to jump.

The pattern is for **linear sequences** — docs, tours, onboarding flows, framework reference sites. Products with co-equal top-level sections should use [Quiet Tabs](10-quiet-tabs.md). Products with one dominant verb should use [Single Button](11-single-button.md).

---

## Across media

### Mobile

Fixed-position SwiftUI overlay. Below 600px width: breadcrumb collapses to JP-only; dot strip hides; the pill becomes `← prev | 1/7 | next →` only.

### Web

CSS:

```css
.tour-nav {
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%) rotate(-0.3deg);
  display: flex;
  align-items: stretch;
  gap: 4px;
  background: #ffffff;
  border-radius: 999px;
  padding: 6px;
  box-shadow:
    4px 4px 0 rgba(72,55,32,0.07),
    10px 18px 30px rgba(72,55,32,0.14),
    18px 30px 48px rgba(72,55,32,0.08);
}
```

Page transitions inside a tour use the page-replace pattern from [Soft Spring](08-soft-spring.md).

### Marketing

Tours of the framework, "how to use Kinari" walkthroughs, multi-step product feature explanations. The nav pill scales down on mobile and stays bottom-anchored.

---

## Examples in the wild

- **Framework brainstorming tour** (`kinari-tour-v2.html` in the brainstorming scratch) — the canonical implementation
- Multi-step product onboarding flows in the wild often approach this pattern but rarely commit to it; this is partly why Kinari canonizes the geometry

---

## Anti-patterns

- **Using Navigation Pill for product nav.** Product surfaces with co-equal sections use [Quiet Tabs](10-quiet-tabs.md). Verb-led products use [Single Button](11-single-button.md). The Navigation Pill is *only* for linear doc/tour browsing.
- **Pagination text instead of dots.** "1 / 7" pagination is redundant when a dot strip is present — drop one or the other; never both.
- **Sliding the whole pill** between pages. The pill stays fixed; only the breadcrumb content swaps via the page-replace transition.
- **Horizontal page slides** triggered by prev/next. The transition is a page-replace cross-fade, never a slide.

---

## Cross-references

- [Pattern #10 Quiet Tabs](10-quiet-tabs.md) — for product nav with co-equal sections
- [Pattern #11 Single Button](11-single-button.md) — for product nav with one dominant verb
- [Pattern #08 Soft Spring](08-soft-spring.md) — the page-replace transition this pattern uses

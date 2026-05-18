# Pattern 08 · Soft Spring · 撓み *tawami*

**Core:** Things settle into place like a branch bending under snow — soft-out easing, **no overshoot**.

**Serves principles:** [#4 Chunky over skinny](../principles.md#04-chunky-over-skinny) · [#5 Forgiving by default](../principles.md#05-forgiving-by-default)

**Source:** Frame-by-frame analysis of both reference videos (see [`docs/context/motion-analysis-from-references.md`](../context/motion-analysis-from-references.md)). Neither app overshoots anywhere. The name *Tawami* refers to the gentle bend of a branch under snow weight — a Japanese aesthetic concept of grace under load, not bounce.

---

## Spirit

The framework's motion vocabulary is **not** spring physics. Despite the romaji *tawami* gesturing toward springiness, the references show no overshoot anywhere. The correct read is a *soft-out settle*: things slow as they arrive, but never bounce past their destination.

Motion lives on **elements**, never on **screens**. Page transitions are replaces (hard cut or brief white-flash), not slides. Within a screen, individual elements cascade in with a strict order — subject first, chrome second, text last.

The cumulative effect is an interface that feels *placed by a hand*. Things settle. Things don't snap. Things never overshoot. The framework reads as physical-but-quiet — the opposite of bouncy 3D-card design system aesthetics and the opposite of industrial linear-tween corporate UI.

---

## The complete motion specification

All motion in Kinari obeys this pattern. The full spec lives in [Visual Language → Motion](../visual-language.md#08--motion--撓み-tawami), which is the canonical source. Highlights:

### Default easing

```css
--ease-tawami: cubic-bezier(0.22, 0.61, 0.36, 1);
```

UIKit equivalent: damping ratio = 1.0 (critically damped). **Never** use spring physics with bounce parameters.

### Duration bands by element type

- Chip pill slide: 120–180ms · Sticker scale/translate: 180–260ms · Cross-fade: 150–220ms · Drill-in: 200–300ms · Label-after-visual: 120–180ms · Confirmation glow: 150ms bloom + 150ms contract · AI shimmer: 600–800ms · Fluid quantity: 400–600ms + residual ripple.

### Cascade order

Subject → chrome → text. Labels are always last. 80–120ms after their visual settles.

### Focus drill-in

Scale + blur, never slide. Hero scales ~1.4×; siblings shrink and Gaussian-blur in place; chrome blurs/fades to white. No horizontal slide between list and detail.

### Cross-fade for cosmetic switches

When stroke styles or button states change, old and new overlap at mid-opacity for 80–120ms. Never vanish before the replacement exists.

### Confirmation glow

Bloom (~150ms) → contract (~150ms). The bloom is the haptic moment.

### Tap-spent fade

CTAs fade to invisible *as they're tapped*. The button visibly spends itself. No scale-down press.

### Page replace

Hard cut or 100ms white-flash, then the new context's elements cascade in. **No horizontal page slides anywhere.**

---

## Across media

### Mobile

Spring animations with `cubic-bezier(0.22, 0.61, 0.36, 1)` — SwiftUI: `.animation(.easeOut(duration: 0.3))` or a custom Animation curve. Haptics fire on capture and confirmation; never on routine actions.

### Web

CSS transitions and animations use the same curve:

```css
:root {
  --ease-tawami: cubic-bezier(0.22, 0.61, 0.36, 1);
}
.sticker {
  transition: transform 240ms var(--ease-tawami), opacity 200ms var(--ease-tawami);
}
```

### Marketing

Hero animations, scroll-linked animations, micro-interactions all share the vocabulary. Page entrances cascade the same way as in-product. Hover lifts use the same lift-along-the-diagonal pattern as Sticker Primitive.

---

## Examples in the wild

- **KiteSprint** — subject-capture bloom (~500ms cascade); fluid water-tracker fill (~500ms + 200ms ripple); food-log → detail drill-in (scale + blur)
- **Om Patel** — donut shimmer cutout (~700ms); diary-entry settle (~400ms with last-text 200ms after); Korean cup word-reveal (~330ms cascade)

---

## Anti-patterns — forbidden

- **Spring overshoot / rubber-band / bounce** — anywhere
- **Staggered row entrances on scroll** — items appear as scrolled to, no fanfare
- **Full-screen horizontal slides between flow steps**
- **Rotational shimmer on chrome** — shimmer is reserved for AI cutout (see [Pattern #5 Subject Lift](05-subject-lift.md))
- **Half-sheet modals** — note input docks into a band on the dot-grid canvas instead
- **Scale-down press feedback** on buttons
- **Traditional progress spinners** — see [Pattern #5 Subject Lift](05-subject-lift.md)

---

## Cross-references

- [Visual Language → Motion](../visual-language.md#08--motion--撓み-tawami) — the canonical full spec
- [Pattern #03 Capture Ritual](03-capture-ritual.md) — the bloom-and-contract glow
- [Pattern #05 Subject Lift](05-subject-lift.md) — the AI shimmer vocabulary
- [Pattern #04 Diary Spine](04-diary-spine.md) — the focus drill-in
- [`docs/context/motion-analysis-from-references.md`](../context/motion-analysis-from-references.md) — source frame analysis

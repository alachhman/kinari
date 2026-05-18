# Kinari "Soft Spring" — Motion Analysis

From dense frame extraction (10–12 fps) of KiteSprint (今日Plog) and Om Patel demos. Timings are wall-clock estimates from inter-frame deltas.

## KiteSprint — per-transition notes

**A. Border-style swap.** Active chip pill slides one position in ~150 ms. Sticker strokes **cross-fade** (double-line → sage single-line); both states co-exist mid-opacity at the midpoint. No scale, no bounce. Total ~250 ms.

**B. Subject capture.** Four-beat cascade ~500 ms: subject Gaussian-blurred, warm halo bleeds out (~100 ms) → subject sharpens, halo *contracts* into a crisp ring (~150 ms) → outer glow dims (~150 ms) → ✓ desaturates sage→gray as user "taps" (~100 ms).

**C. Kcal + note modal.** Hard page-replace into a composite (sage band with title + `思考中…` sparkle, sticker overlapping band, note sheet below). Sticker *lifts up* into the dot-grid zone (~200 ms); orange `94 kcal` numerals fade in beneath.

**D. Food-log list.** Near-instant page-replace, no row entrances. Top kcal pill bar fades in after (~200 ms). Auto-scroll is smooth and inertial.

**E. Detail view (depth-of-field).** Tapped sticker scales ~1.4× to center in ~200 ms. *Concurrently*: siblings shrink and Gaussian-blur in place; chrome blurs/fades to white. Label and timestamp fade in ~100 ms after hero lands. Total ~300 ms.

**F. Water tracker.** Continuous fluid fill 500→750 ml over ~500 ms with rippling lingering ~200 ms past landing.

## Om Patel — per-transition notes

**A. Cutout reveal (donut), ~700 ms.** Reticle/subhead fade (~100 ms) → **shimmer-dust particles** rise across the frame (~200 ms) → shutter morphs into crop/✓/✕ circles fading from below → shimmer peaks (~300 ms), camera image desaturates → shimmer recedes, background unifies to taupe → sticker settles with drop shadow.

**B. Diary entry, ~400 ms.** ✓ button **fades to invisible** (tap pulse) → sticker shrinks/translates to its slot, label chip exits → date header and sibling stickers ghost in → subcount and new label fade in **last**.

**C. Word reveal (Korean cup), ~330 ms.** White die-cut sticker border fades in (~80 ms) → **soft yellow radial glow** blooms behind cutout (~150 ms) → bilingual chip (`Cup 📣 / 컵`) docks onto sticker's lower edge → ✓ (purple) appears brightest first, ↻ and ✕ at equal weight → pencil hint pill fades in last.

**D. Populated diary scroll.** Cross-screen begins with brief **white-flash fade** (~100 ms). Scroll is inertial; no staggered re-entrances.

## Unified Motion Language — "Soft Spring"

- **Easing is *settled, never springy*.** No overshoot. Default curve: soft-out, e.g. `cubic-bezier(0.22, 0.61, 0.36, 1)`.
- **Duration bands:**
  - Active chip pill slide: **120–180 ms**
  - Sticker scale/translate: **180–260 ms**
  - State cross-fade (stroke, button color): **150–220 ms**
  - Depth-of-field blur on drill-in: **200–300 ms** (concurrent with hero scale)
  - Label fade-in *after* visual lands: **120–180 ms**
  - AI cutout shimmer: **600–800 ms**, bloom peak ~200 ms in
  - Fluid quantity changes: **400–600 ms** + ~200 ms residual ripple
- **Cascade order:** *subject first, chrome second, text last.* Label is the final piece, ~80–120 ms after its visual settles.
- **Focus = scale + blur, never slide.** Drill-in enlarges target and Gaussian-blurs siblings in place; siblings stay visible but recede in depth.
- **Cross-fade over redraw for cosmetic switches.** Stroke styles and button states overlap old + new for ~80–120 ms; one state never vanishes before the next exists.
- **Confirmation has a two-stage glow.** Capture / AI-resolve moments use a diffuse warm halo (sage-warm or lemon-yellow) that **blooms then contracts**. The bloom is the haptic moment.
- **Tap-acknowledged is a fade, not a press.** Active CTAs desaturate or fade to invisible before screen change — the button visibly "spends itself."
- **Page-replace is the default.** Hard-cut or brief white-flash (~100 ms), then animate the new context's *elements*. Motion lives on elements, not screens.
- **Scrolling is inertial and unanimated.**
- **Implied haptics:** halo bloom on capture → `.soft` tick; active chip snap → `.selection`; bilingual label chip docking → `.success` light; fluid level target → `.light`.
- **Anti-patterns:** spring overshoot; staggered row entrances on scroll; full-screen horizontal slides between flow steps; rotational shimmer on chrome (shimmer is reserved for AI cutout); half-sheet modals (note input docks into a band); scale-down press feedback; spinners (replaced by sparkle-star + `思考中`, or shimmer-dust).

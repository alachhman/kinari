# Visual Language · 視覚言語 *shikaku-gengo*

> The look, in rules.

Architecture is locked: every project uses this skeleton. Specifics flex: accent color, exact display font, and image content come per project. The structure is what makes projects siblings; the specifics are what give each its own life.

These rules translate the [principles](principles.md) into concrete decisions. Where a rule serves a specific principle, the principle is cited in line.

---

## 01 · Typography · 書体 *shotai*

> Four roles, never more.

A serif speaks. A bold sans labels. The system text reads. The numeric display celebrates.

| Role | Default | Approved alternates | Use |
|---|---|---|---|
| **Display (serif)** | Georgia | Newsreader · Tiempos · Source Serif 4 | Dates, hero headlines, manifesto-style copy. Friendly serif — never austere. |
| **Label (chunky sans)** | system-ui (SF Pro) | Inter 800 | Sticker captions, badge text, CTAs. Heavy weight (700–900), tight letter-spacing. |
| **Body (system sans)** | system-ui (SF Pro Text) | Inter 400 | Running text, descriptions, settings. Avoid below 14px outside metadata. |
| **Numeric display** | system-ui heavy *italic* | — | Celebratory numbers (kcal, scores, counts, section totals). In 柿色 *kaki-iro*. **Always italicized** — forward-leaning, like a finished signature. Includes the serif numerals on principle/pattern stickers. |

**Why four:** more roles fragment the voice; fewer roles can't express the editorial-meets-utilitarian tone Kinari needs. Four is what the references converge on.

---

## 02 · Color · 配色 *haishoku*

> Paper, ink, and one warm thing.

### Core palette — locked, framework-wide

| Name | Kanji | Romaji | Hex | Role |
|---|---|---|---|---|
| Paper | 生成 | *kinari* | `#f7f5f0` | Universal background. Warm off-white, never pure white. |
| Ink | 墨 | *sumi* | `#1a1a1a` | All text. Never pure black. |
| Warm Signal | 柿色 | *kaki-iro* | `#d97a3c` | Reserved for [Numeric Display](patterns/07-numeral-display.md) and rare celebratory callouts. |
| Card | 白 | *shiro* | `#ffffff` | Elevated surfaces only — cards, modals, sticker backs. |

These four never change between projects. They're the framework's signature.

### Accent — palette-agnostic, one per project

Each project picks **one** accent color. The framework is palette-agnostic on accents: a project can choose from the curated 伝統色 (traditional Japanese color) starter library below, or from any documented color tradition that fits the project's domain.

**Rules:**
- One accent per project. Never two.
- Saturation tuned to function as a UI signal against `kinari` paper.
- Restrained enough not to overpower photographs.
- Always *named* in the project's own docs (the color has cultural standing or a project-specific story — never "just looks nice").

**Curated starter library** (six examples):

| Kanji | Romaji | English gloss | Hex | Resonance |
|---|---|---|---|---|
| 萌黄 | *moegi* | sprouting green | `#7DAE5C` | Wellness · growth · food |
| 柿渋 | *kakishibu* | persimmon-tannin | `#B5683A` | Earthy warmth · craft · recipes |
| 桜 | *sakura* | cherry blossom | `#E08596` | Gentleness · journaling · soft moments |
| 浅葱 | *asagi* | pale blue-green | `#4FA9AA` | Calm · contemplation · depth |
| 山吹 | *yamabuki* | kerria gold | `#D4A12B` | Celebration · energy · accomplishment |
| 紫紺 | *shikon* | deep purple | `#5B3D6E` | Gravitas · tools · professional |

Hex values are research-informed approximations; canonical JIS (Japan Industrial Standards) values may differ slightly. Tune per project.

Serves: [Principle #1](principles.md#01-photos-supply-the-color-chrome-stays-quiet).

---

## 03 · Shadows · 影 *kage*

Two first-class rules. Not afterthoughts.

### Rule 1 — Shadows inherit a tint from the element they fall from

**Pure black `box-shadow` values are forbidden.**

- **White / near-white elements** (cards, stickers, kinari paper itself) drop a **warm umber** shadow — `rgba(72, 55, 32, ...)` at low alpha (0.05–0.12 typical). This pulls from kinari's underlying warmth and harmonizes with the paper rather than punching a neutral hole through it.
- **Colored elements** (accent swatches, accent-colored CTAs, illustrations) drop shadows in their **own hue** at ~40–55% alpha. A 萌黄 *moegi* element drops a faintly green shadow; a 紫紺 *shikon* element drops a violet one; a 柿色 *kaki-iro* numeric callout drops a warm orange one.
- **Sumi-on-paper elements** (the dark footer-sticker pattern, dark hero cards) drop deeper sumi shadows — `rgba(26, 26, 26, ...)` at 0.18–0.30 alpha. Black-on-black-on-paper has the strongest gravitational pull on the page; honor that.

### Rule 2 — Light comes from the upper-left at ~30° off vertical

**Centered shadows (`offset-x: 0`) are forbidden.**

All shadows cast to the lower-right with both `offset-x` and `offset-y` **positive**, in roughly **1 : 2 ratio** (x : y).

Scale to the element's apparent depth:

| Lift level | Example offsets |
|---|---|
| Contact (~1px lift) | `2px 2px 0 ...` |
| Resting (~8–12px lift) | `6px 12px 24px ...` |
| Floating (~20–30px lift) | `12px 22px 40px ...` |
| Hovered / lifted | Shadows extend along the same diagonal — never invert. |

When an element rotates (Sticker Primitive's slight tilt), the shadow rotates with the element via `transform`, not via shadow-offset adjustment. **The light source stays fixed; the element moves.**

Serves: [Principle #1](principles.md#01-photos-supply-the-color-chrome-stays-quiet) (shadows shouldn't introduce new chroma) · [Principle #10](principles.md#10-imperfections-are-signatures) (a hand placed this here, under this light).

---

## 04 · Photo treatment · 写真処理 *shashin-shori*

> Two shapes, never raw.

- **Cutout (primary):** subject-masked photo + thin white die-cut border + soft drop shadow. The default treatment for objects. See [Sticker Primitive](patterns/01-sticker-primitive.md).
- **Polaroid (fallback):** white-bordered photo with bottom-heavy caption space. Used when the subject can't be cleanly masked (landscapes, scenes, abstract photography).
- **Raw rectangular crop:** **forbidden.** Even hero images get treatment — shadow + radius at minimum.

Photos always wear a frame. The framework's no-naked-rectangle rule is what keeps user content from feeling like stock asset slots.

---

## 05 · Backgrounds · 地紙 *jigami*

> Surfaces with quiet structure.

Empty space carries texture. Never decoration; always grain.

- **Dot grid (default workspace):** 12pt grid, ~12% sumi-ink opacity dots on kinari paper. Used on capture / canvas / planner / detail surfaces. See [Dot-Grid Canvas](patterns/02-dot-grid-canvas.md).

  CSS:
  ```css
  background: #f7f5f0;
  background-image: radial-gradient(circle, rgba(26,26,26,0.13) 1px, transparent 1px);
  background-size: 12px 12px;
  ```

- **Paper tone (long-form):** `#f4ede0`, no dots. Used for reading-heavy surfaces (long-form articles, settings panels, marketing pages where text dominates).

Serves: [Principle #9](principles.md#09-the-background-is-a-workspace-not-a-frame).

---

## 06 · Iconography · 図像 *zuzō*

> Friendly circles. Thin-line glyphs inside.

Controls feel like physical objects, not symbols.

- Tap targets are **circles or pills**, **44pt minimum**.
- Glyphs inside are SF Symbols (or equivalent), **thin or regular weight** — let the container do the visual work.
- **Active states fill the container** with the project accent.
- **Inactive states** are white circles with sumi-ink glyphs.

Serves: [Principle #4](principles.md#04-chunky-over-skinny).

---

## 07 · Layout · 配置 *haichi*

Every Kinari surface obeys the same layout skeleton.

- **Content max-width:** **880px** for sticker-rich pages (principles, patterns, palette grids). **720px** for long-form reading surfaces. Wider tires the eye; narrower crowds the stickers.
- **Page padding rhythm:** 56–64px vertical at the page edges · 32–48px between major sections · 18–24px gap inside sticker walls.
- **Horizon dividers** — a hairline gradient line with a center mark · `<div class="horizon">...</div>`. Used between major sections in place of heavy borders or large vertical gaps alone.
- **Persistent chrome floats above content.** A fixed-position nav pill (see [Navigation Pill](patterns/09-navigation-pill.md)) sits ≥18px above the bottom edge; never glued to the chrome. Content scrolls beneath it. Reserve ~120–140px of bottom padding so the last sticker isn't covered.

### Cross-platform translation

- **Mobile:** sticker walls collapse from 2-col to 1-col below 600px; palette grids collapse from 4-col to 2-col; nav pill collapses to icon-only (`prev` / breadcrumb-jp-only / `next`).
- **Web:** as above. Long-scroll pages get a sticky day/month side strip when content is dense (rare).
- **Marketing:** identical layout; the dot-grid canvas is the universal background.

---

## 08 · Motion · 撓み *tawami*

Grounded in close frame-by-frame analysis of the reference videos — see [`docs/context/motion-analysis-from-references.md`](context/motion-analysis-from-references.md).

Despite the pattern name *Tawami* (gentle bend), the references show **no overshoot anywhere**. The framework's motion vocabulary is **not** spring physics. The correct read is a *soft-out settle*: things slow as they arrive, but never bounce past their destination.

### Default easing

```css
--ease-tawami: cubic-bezier(0.22, 0.61, 0.36, 1);
```

Soft-out, no overshoot. The UIKit equivalent is an animation with damping ratio = 1.0 (critically damped); never use spring physics with bounce/overshoot parameters.

### Duration bands

| Element / event | Duration |
|---|---|
| Active chip pill slide | 120–180ms |
| Sticker scale / translate | 180–260ms |
| State cross-fade (stroke, button color) | 150–220ms |
| Depth-of-field drill-in (hero scale + sibling blur) | 200–300ms |
| Label fade-in *after* its visual lands | 120–180ms |
| Confirmation glow bloom + contract | 150ms bloom · 150ms contract |
| AI cutout shimmer | 600–800ms total · bloom peak ~200ms in |
| Fluid quantity change | 400–600ms + ~200ms residual ripple |

### Cascade order — *subject first, chrome second, text last*

When multiple elements animate into a new context, the **subject** (the artifact) leads. **Chrome** (buttons, frames, modals) follows. **Text** labels and metadata are *always last*, fading in 80–120ms after their visual has settled. This is observed consistently in both reference apps.

### Focus is scale + blur, never slide

Drilling into a detail enlarges the target ~1.4× to center while *concurrently* shrinking and Gaussian-blurring siblings in place. Siblings remain visible but recede in depth. Chrome blurs/fades to white. **No horizontal slide between list and detail.**

### Cross-fade over redraw for cosmetic switches

When stroke styles, button states, or chip selections change, old and new overlap at mid-opacity for 80–120ms. One state never vanishes before the next exists.

### Confirmation is a two-stage glow

Capture / AI-resolve moments emit a diffuse warm halo that **blooms** (~150ms expansion) then **contracts** (~150ms tightening to a crisp ring). The bloom is the haptic moment — `UIImpactFeedbackGenerator(.soft)` or equivalent fires at peak bloom. Color follows the project accent (lighter tint).

### Tap acknowledgment is a fade, not a press

Active CTAs desaturate or fade to invisible before the screen changes — the button **visibly spends itself**. No scale-down depression on press.

### Page transitions are replaces, not slides

Hard cut or brief white-flash (~100ms), then animate the *elements* of the new context. **Motion lives on elements, never on screens.** No horizontal page slides between flow steps anywhere in the framework.

### Scrolling is inertial and unanimated

No staggered row entrances when content scrolls into view — items appear as they're scrolled to, no fanfare.

### Implied haptics

| Event | Haptic |
|---|---|
| Capture / cutout bloom | `.soft` (single tick at peak) |
| Active chip / pill snap | `.selection` |
| Bilingual label chip docking onto sticker | `.success` light |
| Fluid level reaching target | `.light` |
| Confirmation ✓ tap | `.success` |

### Anti-patterns — forbidden

- Spring overshoot / rubber-band / bounce
- Staggered row entrances on scroll
- Full-screen horizontal slides between flow steps
- Rotational shimmer on chrome (shimmer is *reserved* for AI cutout — see [Subject Lift](patterns/05-subject-lift.md))
- Half-sheet modals (note input docks into a band on the dot-grid canvas instead)
- Scale-down press feedback on buttons
- Traditional progress spinners (replaced by sparkle-star + 思考中 text or shimmer-dust particles)

Governed by [Pattern #8 Soft Spring](patterns/08-soft-spring.md), with element-specific motion sub-rules cross-referenced from Patterns #3, #4, and #5.

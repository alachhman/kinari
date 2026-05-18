# Kinari (生成) — Design Framework Spec

**Date:** 2026-05-18
**Status:** Approved through brainstorming; ready for implementation planning
**Author:** Anthony (with Claude as collaborator)

---

## Summary

**Kinari (生成)** is a cross-platform design framework for personal software — a layered system of principles, a visual language, and a named pattern library, all rooted in a documented design lineage (Hara, Hobonichi, Fukasawa, the "quiet tech" movement). It is not a component library or a code package. It is a **portable point of view** that survives translation between mobile native, web, and marketing surfaces. The framework's novelty is not the aesthetic — that aesthetic already exists as an unconsolidated constellation. The novelty is the **packaging**: principles you can apply, a visual language you can spec, patterns you can name in a project brief.

The name 生成 *kinari* is the Japanese color name for unbleached natural cloth — the paper of the framework. Naming the framework after its background is deliberate: the most important surface, the one everything else sits on, gets the name.

---

## Motivation

The user is starting a body of personal software projects across mobile, web, and marketing surfaces. Without a unifying framework, each project will reinvent its visual decisions and accumulate inconsistencies. With a fully-built design system, each project will be slowed by infrastructure that exceeds its needs.

Kinari is the middle path: a written framework with three layers (principles, visual language, patterns) that any new project can consult and interpret. Its goal is **recognizable signature**, not **shipping velocity** — projects made with Kinari should feel like siblings, not like clones, and the relationship should be evident to a viewer.

The aesthetic anchor is a documented design tradition the user already responds to — Japanese restraint as articulated by Kenya Hara and embodied by MUJI; the Hobonichi Techo's dot-grid scrapbook page logic; Fukasawa & Morrison's *super-normal* product philosophy; and the recent "quiet tech" / "post-AI minimalism" movement in software design. Two iOS apps surfaced this aesthetic for the user (Butter Camera's Plog template, an unnamed dad-built language-learning app) and are preserved as reference material at `docs/context/`.

---

## Goals

1. **A portable point of view.** Principles and patterns described abstractly enough to translate from mobile native to web to marketing surface without rewriting.
2. **A recognizable signature.** Projects made with Kinari should be identifiable as siblings — by typography, by photo treatment, by capture ritual, by diary spine, by motion posture.
3. **Honest attribution.** Every borrowing from the Japanese design tradition is credited; the framework's positioning is "consolidation of an existing tradition," not "invention."
4. **Publish-ready structure.** Even though the initial repo is private and personal, the framework is structured so it can be made public later without a rewrite.
5. **Started small, grown by projects.** Eight seed patterns. The library grows as real projects earn new ones.

## Non-goals

- A code component library (no React/Swift/etc. components shipped).
- A design tokens package (no Style Dictionary, no Theo).
- A Figma library (deferred to v0.2 — markdown-first for now).
- A public website (deferred — structure permits one later).
- An open-source license decision (deferred — repo private for now).
- Shipping velocity. Kinari is for signature, not speed.

---

## Approach

**Layered system, started small.** Three nested layers:

1. **Principles** (top) — ten written commitments. The unchanging core.
2. **Visual Language** (middle) — typography, color, photo treatment, backgrounds, iconography, motion. The translation of principles into rules.
3. **Pattern Library** (bottom) — named UI metaphors, described abstractly, with per-medium translation notes. Eight seed patterns; more added as projects earn them.

Plus a **Lineage** layer that runs alongside — honest attribution to the design traditions Kinari consolidates.

---

## Skeleton

The framework lives as markdown in a single repository.

```
fe-fw/                                        ← (folder to be renamed `kinari` after spec approval)
├── README.md                                 ← what Kinari is + how to apply it
├── docs/
│   ├── principles.md                         ← the 10 commitments + commentary
│   ├── visual-language.md                    ← typography, color, photo, background, iconography, motion
│   ├── lineage.md                            ← three traditions, vocabulary, living practice, principle-to-source map, reading list
│   ├── patterns/
│   │   ├── _index.md                         ← pattern table of contents
│   │   ├── 01-sticker-primitive.md
│   │   ├── 02-dot-grid-canvas.md
│   │   ├── 03-capture-ritual.md
│   │   ├── 04-diary-spine.md
│   │   ├── 05-subject-lift.md
│   │   ├── 06-bilingual-pair.md
│   │   ├── 07-numeral-display.md
│   │   ├── 08-soft-spring.md
│   │   ├── 09-navigation-pill.md
│   │   ├── 10-quiet-tabs.md
│   │   ├── 11-single-button.md
│   │   └── 12-three-circles.md
│   ├── context/                              ← reference materials (already exists)
│   │   ├── _index.md
│   │   ├── KiteSprint-2055871758352441792.md
│   │   └── om_patel5-2055487997567553698.md
│   └── superpowers/
│       └── specs/
│           └── 2026-05-18-kinari-framework-design.md   ← this file
└── examples/                                 ← (deferred) real projects applying the framework
```

`.superpowers/` (the brainstorming companion's scratch directory) is in `.gitignore`.

---

## The Framework

### Identity

| Field | Value |
|---|---|
| **Name** | Kinari |
| **Kanji** | 生成 |
| **Romaji** | *kinari* |
| **Meaning** | Unbleached natural cloth (the framework's paper color) |
| **Tagline (v1)** | A design framework for personal software. |
| **Positioning** | Consolidation of an existing Japanese-restraint design tradition for cross-platform personal software. Publish-ready (private now, public-capable later). |

### Principles (10)

The complete principles document. Each principle has a **rule** (one sentence), a **gloss** (plain English), a **body** (commentary), and a **source** (lineage trace).

1. **Photos supply the color; chrome stays quiet.** *The user's stuff is the star. The framework is the gallery.* Chrome is off-white, near-black, and one disciplined accent. Saturation comes from user content. Source: Hara *White* / MUJI / *kanso*.
2. **The user's stuff is the atomic unit.** *Not a row in a table. Not a card in a feed. The artifact itself.* Lists treat each entry as an object with weight, not as a row to scan. Source: Cosmos.so / Are.na / the sticker primitive in references.
3. **Capture is a ritual.** *The moment a user makes something deserves ceremony.* Inputs are framed: quiet build-up, focused capture moment, clear confirmation, small celebration. Source: *ma* / Hobonichi page / slow-tech wave.
4. **Chunky over skinny.** *Touch targets feel like physical objects; nothing reads like fine print.* Big radii, fat strokes, generous touch targets. Source: Fukasawa & Morrison, *Super Normal* / *mingei*.
5. **Forgiving by default.** *Mistakes are recoverable, not punished.* Every destructive action is one tap from undo; AI outputs always offer "different from expected? adjust." Source: *hobonichi* ("almost-daily") / post-AI minimalism critique.
6. **Time is the spine.** *Default organization is a diary, not a folder tree.* Dated headings, item counts, reverse-chronological scroll. Source: Hobonichi Techo / Day One / diary tradition.
7. **Bilingual is first-class.** *Labels respect more than one language as a visual unit.* Two-language label pairs are designed lockups, not i18n string swaps. Source: Japanese product-packaging convention (MUJI, Tsutaya).
8. **AI feels like craft, not magic.** *The user is the author; the model is a careful collaborator.* No confidence scores, no "generating..." spinners — AI outputs present as if a careful person produced them. Source: "Quiet tech" / post-AI minimalism / craft over spectacle.
9. **The background is a workspace, not a frame.** *Surfaces feel like the page of a planner — quiet, structured, yours.* Backgrounds carry subtle structure (dot grid, paper tone); never empty white expanses, never decorated. Source: Hobonichi dot-grid page / bullet journal lineage.
10. **Imperfections are signatures.** *Made-by-a-person beats machine-perfect, every time.* Hand-coded counter copy ("1 Words"), handwritten timestamps, slightly off-grid stickers. Source: *wabi-sabi* / the visible hand.

### Visual Language

#### Typography — four roles, never more

| Role | Default | Approved alternates | Use |
|---|---|---|---|
| Display (serif) | Georgia | Newsreader, Tiempos, Source Serif 4 | Dates, hero headlines, manifesto copy |
| Label (chunky sans) | system-ui (SF Pro) | Inter 800 | Sticker captions, badge text, CTAs (weight 700–900) |
| Body (system sans) | system-ui (SF Pro Text) | Inter 400 | Running text, descriptions, settings (≥14px) |
| Numeric display | system-ui heavy *italic* | — | Celebratory numbers, in 柿色 *kaki-iro*, **always italicized** (forward-leaning, like a finished signature). Includes serif numerals on principle/pattern stickers. |

#### Color — paper, ink, and one warm thing

**Core (framework-wide, locked):**

| Name | Kanji | Romaji | Hex | Role |
|---|---|---|---|---|
| Paper | 生成 | *kinari* | `#f7f5f0` | Universal background, warm off-white |
| Ink | 墨 | *sumi* | `#1a1a1a` | All text, never pure black |
| Warm Signal | 柿色 | *kaki-iro* | `#d97a3c` | Numerics and celebratory callouts (Numeral Display) |
| Card | 白 | *shiro* | `#ffffff` | Elevated surfaces (cards, modals, sticker backs) |

**Accent (one per project, palette-agnostic):**

Each project picks **one** accent. Examples from the curated 伝統色 (Japanese traditional color) starter library:

| Kanji | Romaji | English gloss | Hex | Resonance |
|---|---|---|---|---|
| 萌黄 | *moegi* | sprouting green | `#7DAE5C` | Wellness, growth, food |
| 柿渋 | *kakishibu* | persimmon-tannin | `#B5683A` | Earthy warmth, craft |
| 桜 | *sakura* | cherry blossom | `#E08596` | Gentleness, journaling |
| 浅葱 | *asagi* | pale blue-green | `#4FA9AA` | Calm, contemplation |
| 山吹 | *yamabuki* | kerria gold | `#D4A12B` | Celebration, energy |
| 紫紺 | *shikon* | deep purple | `#5B3D6E` | Gravitas, tools |

Projects are free to choose **outside this library** — any documented color tradition works (Pantone with story, JIS, regional). Rules:
- One accent per project (never two).
- Saturation tuned to function as a UI signal against kinari paper.
- Restrained enough not to overpower photographs.
- Always *named* in project docs (the color has cultural standing or a project-specific story).

#### Photo treatment — two shapes, never raw

- **Cutout (primary):** subject-masked photo + thin white die-cut border + soft drop shadow. The default treatment for objects.
- **Polaroid (fallback):** white-bordered photo with bottom-heavy caption space. Used when the subject can't be cleanly masked (landscapes, scenes).
- **Raw rectangular crop:** forbidden. Even hero images get treatment (shadow + radius at minimum).

#### Shadows — colored by what they fall from, cast by the same sun

Two first-class rules, not afterthoughts.

**Rule 1 — Shadows inherit a tint from the element they fall from, never from a universal "shadow color."** Pure black `box-shadow` values are forbidden.

- **White / near-white elements** (cards, stickers, the kinari paper itself) drop a **warm umber** shadow — `rgba(72, 55, 32, ...)` at low alpha (0.05–0.12 typical). This pulls from kinari's underlying warmth and harmonizes with the paper rather than punching a neutral hole through it.
- **Colored elements** (accent swatches, accent-colored CTAs, illustrations) drop shadows in their **own hue** at ~40–55% alpha. A 萌黄 *moegi* element drops a faintly green shadow; a 紫紺 *shikon* element drops a violet one; a 柿色 *kaki-iro* numeric callout drops a warm orange one.
- **Sumi-on-paper elements** (the dark "footer sticker" pattern, dark hero cards) drop deeper sumi shadows — `rgba(26, 26, 26, ...)` at 0.18–0.30 alpha. Black-on-black-on-paper has the strongest gravitational pull on the page; honor that.

**Rule 2 — Light comes from the upper-left at ~30° off vertical. All shadows cast to the lower-right.** Centered shadows (`offset-x: 0`) are forbidden; they imply light from directly above, which reads as technical/rendered. A consistent oblique light direction makes every surface feel placed by the same hand, under the same window.

- Box-shadow `offset-x` and `offset-y` are both **positive**, in roughly **1 : 2 ratio** (x : y).
- Scale to the element's apparent depth:
  - Contact shadow (∼1px lift): `2px 2px 0 ...`
  - Resting shadow (∼8–12px lift): `6px 12px 24px ...`
  - Floating shadow (∼20–30px lift): `12px 22px 40px ...`
  - Hovered/lifted: shadows extend along the same diagonal, never invert.
- When an element rotates (Sticker Primitive rotation), the shadow rotates with it via `transform`, not via shadow offset adjustment — light source stays fixed, the element moves.

**Why it matters.** Together these two rules enforce principle #1 (chrome stays quiet — shadows don't shout) and principle #10 (imperfections are signatures — a hand placed this here). A generic centered black shadow reads as "design system component"; a hue-matched diagonal shadow reads as "this object was thoughtfully placed here, under this light, by someone."

#### Backgrounds

- **Dot grid (default workspace):** 12pt grid, ~12% sumi-ink opacity dots on kinari paper. Used on capture / canvas / planner / detail surfaces.
- **Paper tone (long-form):** `#f4ede0`, no dots. Used for reading-heavy surfaces (long-form, settings, marketing pages).

#### Iconography

Friendly circles, thin-line glyphs inside. Touch targets 44pt minimum. Active states fill the container with the project accent; inactive states are white circles with sumi-ink glyphs.

#### Layout — `配置 haichi`

Every Kinari surface obeys the same layout skeleton.

- **Content max-width: 880px** for text/sticker-rich pages, **720px** for long-form reading surfaces. Wider than this and the eye tires; narrower and stickers feel cramped.
- **Page padding rhythm:** 56–64px vertical at the page edges, 32–48px between major sections, 18–24px gap inside sticker walls.
- **Horizon dividers** (`<div class="horizon">`) — a hairline gradient line with a center mark — separate major sections. Used in place of heavy borders or large vertical gaps alone.
- **Persistent chrome floats above content** — a fixed-position nav pill (see Pattern #09) sits ≥18px above the bottom edge; never glued to the chrome. Content scrolls beneath it. Padding at the bottom of the content area reserves space (~120-140px) so the last sticker isn't covered.
- **Cross-platform translation:**
  - **Mobile:** sticker walls collapse from 2-col to 1-col below 600px; palette grids collapse from 4-col to 2-col; nav pill collapses to icon-only (prev / breadcrumb-jp-only / next).
  - **Web:** layout above. Long-scroll pages get a sticky day/month side strip when content is dense (rare).
  - **Marketing:** identical layout; the dot-grid canvas is the universal background.

#### Motion

Grounded in close frame-by-frame analysis of the reference videos (see `docs/context/motion-analysis-from-references.md`). The framework's motion vocabulary is **not** spring physics — despite the pattern name *Tawami* (gentle bend), the references show **no overshoot anywhere**. The correct read is a *soft-out settle*: things slow as they arrive, but never bounce past their destination.

**Default easing.** `cubic-bezier(0.22, 0.61, 0.36, 1)` — soft-out, no overshoot. The UIKit equivalent is an animation with damping ratio = 1.0 (critically damped); never use spring physics with bounce/overshoot parameters.

**Duration bands** by element type:

| Element / event | Duration |
|---|---|
| Active chip pill slide | 120–180ms |
| Sticker scale / translate | 180–260ms |
| State cross-fade (stroke, button color) | 150–220ms |
| Depth-of-field drill-in (hero scale + sibling blur) | 200–300ms |
| Label fade-in *after* its visual lands | 120–180ms |
| Confirmation glow bloom + contract | 150ms bloom, 150ms contract |
| AI cutout shimmer | 600–800ms total, bloom peak ~200ms in |
| Fluid quantity change | 400–600ms + ~200ms residual ripple |

**Cascade order — subject first, chrome second, text last.** When multiple elements animate into a new context, the subject (the artifact) leads. Chrome (buttons, frames, modals) follows. Text labels and metadata are *always* last, fading in 80–120ms after their visual has settled. This is observed consistently in both references.

**Focus is scale + blur, never slide.** Drilling into a detail enlarges the target ~1.4× to center while *concurrently* shrinking and Gaussian-blurring siblings in place. Siblings remain visible but recede in depth. Chrome blurs/fades to white. No horizontal slide between list and detail.

**Cross-fade over redraw for cosmetic switches.** When stroke styles, button states, or chip selections change, old and new overlap at mid-opacity for 80–120ms. One state never vanishes before the next exists.

**Confirmation is a two-stage glow.** Capture / AI-resolve moments emit a diffuse warm halo that **blooms** (~150ms expansion) then **contracts** (~150ms tightening to a crisp ring). The bloom is the haptic moment — `UIImpactFeedbackGenerator(.soft)` or equivalent fires at peak bloom. Two observed color variants: sage-warm (KiteSprint) and lemon-yellow (Om Patel); use the project accent's lighter tint by default.

**Tap acknowledgment is a fade, not a press.** Active CTAs desaturate or fade to invisible before the screen changes — the button visibly *spends itself*. No scale-down depression on press.

**Page transitions are replaces, not slides.** Hard cut or brief white-flash (~100ms), then animate the *elements* of the new context. **Motion lives on elements, never on screens.** No horizontal page slides between flow steps anywhere in the framework.

**Scrolling is inertial and unanimated.** No staggered row entrances when content scrolls into view — items appear as they're scrolled to, no fanfare.

**Implied haptic moments:**

| Event | Haptic |
|---|---|
| Capture / cutout bloom | `.soft` (single tick at peak) |
| Active chip / pill snap | `.selection` |
| Bilingual label chip docking onto sticker | `.success` light |
| Fluid level reaching target | `.light` |
| Confirmation ✓ tap | `.success` |

**Anti-patterns — forbidden by the framework:**

- Spring overshoot / rubber-band / bounce
- Staggered row entrances on scroll
- Full-screen horizontal slides between flow steps
- Rotational shimmer on chrome (shimmer is *reserved* for AI cutout — see Pattern #05)
- Half-sheet modals (note input docks into a band on the dot-grid canvas instead)
- Scale-down press feedback on buttons
- Traditional progress spinners (replaced by sparkle-star + 思考中 text *or* shimmer-dust particles — see Pattern #05)

These rules are governed by Pattern #08 (Soft Spring / *Tawami*), with element-specific motion sub-rules cross-referenced from Patterns #03 (Capture Ritual), #04 (Diary Spine), and #05 (Subject Lift).

### Pattern Library (12 seed patterns)

Each pattern has its own doc with: name (English + romaji + kanji), one-line core, principles served, spirit description (abstract metaphor), per-medium notes (mobile / web / marketing), and real-world examples.

| # | Pattern | Romaji | Kanji | Serves | Core |
|---|---|---|---|---|---|
| 01 | Sticker Primitive | *shīru* | シール | 02, 01 | The user's stuff is rendered as a die-cut sticker — an object with weight, not a row in a list. Shadow inherits its tint from the sticker's own hue (see Visual Language → Shadows). |
| 02 | Dot-Grid Canvas | *hōgan* | 方眼 | 09, 01 | Backgrounds carry quiet structure — never empty, never decorated. |
| 03 | Capture Ritual | *utsushi* | 写し | 03, 05 | The moment a user makes something is framed with quiet ceremony. Confirmation is a two-stage glow (bloom → contract); tap acknowledgment is a fade, never a press (see Visual Language → Motion). |
| 04 | Diary Spine | *nikki* | 日記 | 06, 02 | Content is organized chronologically by default. Time is the load-bearing axis. Drill-in to detail is scale + blur, never slide; scrolling is inertial and unanimated (see Visual Language → Motion). |
| 05 | Subject Lift | *kirinuki* | 切り抜き | 08, 03 | AI segments a subject from its background and presents the result as craft, not technology. AI processing is communicated via shimmer-dust particles or sparkle-star + 思考中 text — never a traditional spinner (see Visual Language → Motion). |
| 06 | Bilingual Pair | *heiki* | 並記 | 07 | Two languages, one typographic unit. Labels are designed, not translated. |
| 07 | Numeral Display | *sūji* | 数字 | 02, 04 | Numbers that matter get the warm signal and the chunky display treatment — celebrated, not just shown. |
| 08 | Soft Spring | *tawami* | 撓み | 04, 05 | Things settle into place like a branch bending under snow — soft-out easing, **no overshoot**. Governs all motion in the framework: easing curve, duration bands, cascade order (subject → chrome → text), page-replace policy, implied haptics, and anti-patterns. See Visual Language → Motion for the full spec, grounded in close frame analysis of the reference videos (`docs/context/motion-analysis-from-references.md`). |
| 09 | Navigation Pill | *annai* | 案内 | 04, 06 | **Doc/tour-browsing nav only** (framework site, tutorials, onboarding sequences) — *not* product navigation. A bottom-fixed sticker pill anchored ≥18px above the bottom edge, slight rotation (-0.3°). Three zones: `← 前へ prev` · current breadcrumb (bilingual pair + dot-strip indicator) · `次へ next →`. Disabled state at start/end. Keyboard parity (←/→/1-N). On mobile, breadcrumb collapses to JP-only; dot strip hides. Page transitions invoke Pattern #08 page-replace. |
| 10 | Quiet Tabs | *shizukana tabu* | 静かなタブ | 01, 04, 07 | **Product nav — constellation products** (co-equal top-level sections). Floating bottom row of 3–5 icon-only destinations. Active slot is a filled stadium pill in the project accent; pill slides between slots in 120–180ms. Floats ≥18px above the surface edge; content scrolls beneath. Bar hides wholesale on tool / detail / capture surfaces (page-replace style). Web: floating bottom dock; above 720px, optionally mirrored as a left rail. Grounded in KiteSprint's bottom tab bar (see `docs/context/nav-analysis-from-references.md`). |
| 11 | Single Button | *hitotsu-botan* | 一つボタン | 02, 03, 10 | **Product nav — one-verb products** (capture, compose, ask). A single hero CTA replaces persistent navigation entirely. The button's *shape* is the app's logo-in-place — recognizable branded geometry (shutter ring, inkstone, etc.) anchored bottom-center; the *meaning* shifts by context. Small satellite circles may flank it. Web: fixed bottom-center FAB on mobile; hero CTA at eye-line on desktop. Grounded in Om Patel's multicolor shutter. |
| 12 | Three Circles | *mittsu-no-maru* | 三つの丸 | 03, 05, 08 | **Decision moments — confirm/retry/discard, trash/close/edit, or any branching ternary.** Three equal-sized round buttons in a horizontal row, bottom-anchored, replacing all other chrome during the decision. Center is the affirmative — slightly larger, project-accent fill; flanks are paper-white with sumi-ink glyphs. Strongest cross-reference geometry in both reference videos (apple capture, donut capture, sandwich confirm, cup reveal, salad detail). Web: centered triplet of 56–72px circles. **Never collapses to a dropdown.** |

Per-medium notes are **looser (spirit + intent)** at the framework level. Concrete implementations (specific APIs, CSS, SwiftUI) live in `examples/` when real projects demonstrate them.

**Library growth.** Patterns visible in references but not yet seeded: *Adjust Affordance* ("different from expected?" recovery), *Polaroid Variant* (sticker treatment for un-maskable subjects), *Empty State* (dot-grid canvas before content). Each gets added when a project earns it.

### Lineage

Three streams feed the framework. Each is credited explicitly in `docs/lineage.md`:

1. **Philosophy (1980s–2010s):** Kenya Hara — *Designing Design* (2007) and *White* (2010); Naoto Fukasawa & Jasper Morrison — *Super Normal* (2007).
2. **Product (2001–present):** Hobonichi Techo — Itoi Shigesato's planner. Dot-grid, dated entries, accumulated stickers, "almost-daily" forgiveness.
3. **Movement (2023–2026):** "Quiet tech" / "Bento UI" / "Japandi (digital)" / post-AI minimalism. Living practice: Linear, Things 3, Day One, Cosmos.so, Are.na, iA Writer, bento.me, Butter Camera, Hobonichi.

**Vocabulary borrowed honestly:** *ma* (negative space), *kanso* (simplicity), *shibui* (restrained beauty), *wabi-sabi* (imperfection), *mingei* (folk craft), *hobonichi* (almost-daily). Each is used in line with established design discourse; each is glossed in `lineage.md`.

**Reading list:** Hara *Designing Design* and *White* (Lars Müller); Fukasawa & Morrison *Super Normal* (Lars Müller); Hobonichi Techo 2026 product pages (1101.com); "The Rise of Quiet Tech" (TechFinder); bentogrids.com gallery; Cosmos.so UI board.

---

## Implementation Plan Overview

The spec → plan transition will be handled by the `writing-plans` skill. Approximate phases:

**Phase 1 — Write the framework (this spec → markdown docs).**
1. Initialize the repo (`git init`, rename folder to `kinari`).
2. Add `.gitignore` (with `.superpowers/` excluded).
3. Write `README.md`.
4. Write `docs/principles.md`.
5. Write `docs/visual-language.md`.
6. Write `docs/lineage.md`.
7. Write `docs/patterns/_index.md`.
8. Write 8 individual `docs/patterns/0X-<name>.md` files.
9. Update `docs/context/_index.md` to point at the new framework.
10. Commit, push to a private remote.

**Phase 2 — (deferred) Figma library.**
**Phase 3 — (deferred) Public static site.**
**Phase 4 — (deferred) First example project applying the framework.**

---

## Open Questions / TBDs

- **Final folder rename.** `fe-fw/` → `kinari/` once spec is approved. Will require `git mv` if/after `git init`.
- **License.** Deferred until public-facing decision. Likely candidates if/when public: CC-BY-4.0 (docs), MIT (any code).
- **Tagline.** "A design framework for personal software." is the v1 working tagline. May be refined when the README is written.
- **Versioning.** v0.1 for the seed library; updates via PR + dated changelog entries in `README.md` (or a separate `CHANGELOG.md`). Decide when first PR arrives.
- **Public site.** Astro vs Next vs MDX-based. Decide when public release is on the table.
- **JIS color values.** Current accent hex values are research-informed approximations; canonical Japan Industrial Standards values may differ. Tune in `visual-language.md` if precision matters.
- **Folder rename pre-approval.** Whether to rename `fe-fw/` to `kinari/` *before* writing markdown files (cleaner) or *after* (preserves continuity with this spec's `path`). Recommend before.

---

## Decisions ledger (resolved during brainstorming)

| Question | Decision |
|---|---|
| Project medium | Cross-platform (mobile + web + marketing) |
| Framework purpose | Personal aesthetic signature |
| Emotional center | Playfully welcomed + tended to / cared for |
| Approach | C — Layered system, started small |
| Skeleton | Markdown-first; Figma + site deferred |
| Positioning | Publish-ready (consolidation claim) |
| Accent strategy | Palette-agnostic; project picks one named accent |
| Pattern names | English primary + romaji secondary |
| Per-medium notes | Looser (spirit + intent) at framework level |
| Seed patterns | 8 (added Subject Lift, Bilingual Pair, Numeral Display, Soft Spring) |
| Name | **Kinari (生成)** |
| Numeric display | Always italicized (forward-leaning) |
| Shadow color rule | Inherit tint from the element above; pure black forbidden |
| Light direction | Upper-left at ~30° off vertical; shadows offset positive x and y in ~1:2 ratio |
| Motion easing | Soft-out settle, NO overshoot. Default: `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Motion cascade | Subject → chrome → text. Labels always fade in last (80–120ms after their visual settles) |
| Page transitions | Replace, not slide. Motion lives on elements, never on screens |
| Confirmation glow | Two-stage: bloom (~150ms expand) → contract (~150ms tighten). Bloom is the haptic moment |
| AI processing motion | Shimmer-dust particles OR sparkle-star + 思考中 text. Never traditional spinners |
| Layout max-width | 880px for sticker-rich pages, 720px for long-form reading |
| Persistent nav | Bottom-fixed sticker pill, ≥18px from bottom edge, obeys the sticker primitive's visual language (rotation, shadow, light direction) |
| Section dividers | Horizon line (hairline gradient + center mark) between major sections |
| Bilingual section headers | Every framework section gets the bilingual pair lockup (e.g. `書体 · shotai · typography`) — added during agent rebuild, now canonical |
| Numeric-display section counts | Every section that contains a discrete count of items shows it in italic kaki-iro (`10 Principles`, `8 Patterns`) — applies Pattern #07 to the framework's own meta-structure |
| `禁止 kinshi` stamp | Anti-patterns shown alongside correct patterns with a small `禁止` stamp — the absence/forbidden state is documented, not omitted |
| Nav pattern scope | Pattern #09 (Navigation Pill) is for doc/tour browsing **only** — not product nav |
| Product nav patterns | Three canonized: #10 Quiet Tabs (constellation), #11 Single Button (one-verb), #12 Three Circles (decisions). Each grounded in the references — see `docs/context/nav-analysis-from-references.md` |

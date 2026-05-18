# Kinari Framework — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write the complete markdown framework documentation for Kinari — README, principles, lineage, visual language, pattern library index, and 12 individual pattern docs — turning the brainstorming spec into an applied, navigable framework that future projects can interpret.

**Architecture:** Three layered markdown docs (principles → visual language → patterns) plus a lineage attribution doc, all written as plain `.md` files under `docs/`. No build step, no code components, no Figma library in this phase. Each pattern doc follows a consistent template defined in `docs/patterns/_index.md`. Cross-references between files use relative markdown links so the docs work as a static site later.

**Tech Stack:** Plain markdown. No tools required beyond a text editor and git. All content references the canonical spec at `docs/superpowers/specs/2026-05-18-kinari-framework-design.md`.

**Plan scope:** Phase 1 only. Explicitly deferred per spec: Figma library (Phase 2), public static site (Phase 3), first example project (Phase 4).

---

## File Structure

| Path | Responsibility | Approx size |
|---|---|---|
| `README.md` | Entry point. What Kinari is, the lineage claim, how to apply, quick links to layers. | ~150 lines |
| `docs/principles.md` | Top layer. The 10 commitments, each with rule + gloss + body + source. | ~200 lines |
| `docs/visual-language.md` | Middle layer. Typography, color, shadows, photo treatment, backgrounds, iconography, layout, motion. | ~350 lines |
| `docs/lineage.md` | Honest attribution. Three traditions, vocabulary, living practice, principle-to-source map, reading list. | ~200 lines |
| `docs/patterns/_index.md` | Pattern library entry point. Template definition, table of all 12 patterns, growth policy. | ~120 lines |
| `docs/patterns/01-sticker-primitive.md` through `12-three-circles.md` | One file per pattern, following the template. Each ~40-80 lines. | ~700 lines total |
| `docs/context/_index.md` | Updated to point at the framework docs (currently points only to reference materials). | ~30 line change |

Total: ~1,750 lines of new/updated markdown across 18 files.

**Cross-referencing convention:**
- Principles referenced as `[Principle #N](../principles.md#NN-slug)` or shorthand `(see Principle #N)` in prose
- Patterns referenced as `[Pattern #N](./NN-name.md)` from within patterns/, or `[Pattern #N](./patterns/NN-name.md)` from elsewhere
- Visual language sub-sections referenced by anchor: `(see Visual Language → Motion)`
- Spec is the upstream source of truth; docs are downstream prose-expanded form

---

## Task 1: Write the top-level README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md` with the following content**

```markdown
# Kinari · 生成

> A design framework for personal software.

*Kinari* (生成) is the Japanese color name for unbleached natural cloth — the paper of this framework. Naming a framework after its background is deliberate: the most important surface, the one everything else sits on, gets the name.

## What this is

Kinari is a cross-platform design framework for personal software — a layered system of **principles**, a **visual language**, and a **named pattern library**, all rooted in a documented design lineage (Hara, Hobonichi, Fukasawa, the "quiet tech" movement). It is not a component library or a code package. It is a portable point of view that survives translation between mobile native, web, and marketing surfaces.

The framework's novelty is not the aesthetic — that aesthetic already exists as an unconsolidated constellation. The novelty is the **packaging**: principles you can apply, a visual language you can spec, patterns you can name in a project brief.

## How to use it

When starting a new personal-software project that should feel like part of this family:

1. **Read [the principles](docs/principles.md) first.** They're the unchanging core. Every design decision should be traceable to one of the ten.
2. **Apply [the visual language](docs/visual-language.md).** It locks the architecture (typography roles, core palette, shadow rules, motion easing) while leaving project-specific decisions (accent color, exact display font, content) open.
3. **Reach for [the patterns](docs/patterns/_index.md) by name.** Twelve named UI metaphors — Sticker Primitive, Capture Ritual, Diary Spine, etc. — that translate across mobile, web, and marketing. Pick the patterns the project earns; ignore the ones it doesn't.
4. **Trace borrowings through [the lineage](docs/lineage.md).** Every commitment in this framework comes from somewhere documented. Read the sources if you want the philosophy underneath.

## The three layers

**Principles** (top, prose) — Ten commitments. Unchanging core.
[→ Read the principles](docs/principles.md)

**Visual Language** (middle, rules) — Typography, color, shadows, photo treatment, backgrounds, iconography, layout, motion.
[→ Read the visual language](docs/visual-language.md)

**Pattern Library** (bottom, named metaphors) — Twelve seed patterns, each abstractly described with per-medium translation notes.
[→ Read the patterns](docs/patterns/_index.md)

**Lineage** (alongside) — Honest attribution to the traditions Kinari consolidates.
[→ Read the lineage](docs/lineage.md)

## Status

**Version:** v0.1
**Scope:** principles, visual language, lineage, and a 12-pattern seed library.
**Deferred:** Figma library, public site, first example project.

## License

Not yet decided. Currently a private personal artifact. Likely candidates if/when published: CC-BY-4.0 (docs), MIT (any future code).

## Sources

The framework was developed from two iOS reference apps (preserved in [`docs/context/`](docs/context/)) and a documented design lineage. See [`docs/lineage.md`](docs/lineage.md) for the full reading list.

The canonical design spec lives at [`docs/superpowers/specs/2026-05-18-kinari-framework-design.md`](docs/superpowers/specs/2026-05-18-kinari-framework-design.md).
```

- [ ] **Step 2: Verify the file exists and links resolve**

Run:
```bash
ls -la README.md
grep -c '\.md)' README.md
```
Expected: file exists, ~7 markdown links present.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Add top-level README"
```

---

## Task 2: Write the principles document

**Files:**
- Create: `docs/principles.md`

The spec's "Principles (10)" section is the source. Each principle gets: rule (heading), gloss (italic one-liner), body (1-2 paragraph commentary), source (lineage trace).

- [ ] **Step 1: Create `docs/principles.md` with the following content**

```markdown
# Principles · 原則 *gensoku*

> Ten things we believe about making things.

The framework is a point of view, not a component library. These ten commitments hold whether the surface is a mobile app, a website, or a printed thing. Every project that ships under Kinari interprets them; none of them get ignored.

The numbering is permanent — patterns and visual-language rules reference principles by number throughout the framework.

---

## 01. Photos supply the color; chrome stays quiet.

*The user's stuff is the star. The framework is the gallery.*

Chrome is off-white, near-black, and one disciplined accent. Saturation comes from the user's photographs, illustrations, and content — never from decorative gradients, brand colors, or marketing flourish. Calmness is a frame, not a constraint.

**Source:** Kenya Hara, *White* / MUJI house style / 簡素 *kanso* (see [Lineage](lineage.md)).

---

## 02. The user's stuff is the atomic unit.

*Not a row in a table. Not a card in a feed. The artifact itself.*

Lists treat each entry as an object with weight and presence — a photo, a note, a clip, a draft — not as a row to scan. Detail views isolate one item; list views collect many. The artifact has a life of its own. The framework's primary UI primitive (the [Sticker Primitive](patterns/01-sticker-primitive.md)) is the visual enforcer of this principle.

**Source:** Cosmos.so · Are.na · the sticker-primitive pattern in both reference apps.

---

## 03. Capture is a ritual.

*The moment a user makes something deserves ceremony.*

Inputs are framed: a quiet build-up, a focused capture moment, a clear confirmation, a small celebration. No drive-by typing into anonymous text fields. The interface treats authorship as sacred, even when the artifact is a sandwich photo. See the [Capture Ritual](patterns/03-capture-ritual.md) pattern.

**Source:** 間 *ma* (the pause that gives the act meaning) · the Hobonichi page · the slow-tech wave.

---

## 04. Chunky over skinny.

*Touch targets feel like physical objects; nothing reads like fine print.*

Big, generous corner radii. Fat strokes. White CTAs with real weight. Pills, stickers, and circles instead of thin lines and tight grids. The interface looks like it could be picked up.

**Source:** Fukasawa & Morrison's *Super Normal* · 民藝 *mingei* (folk craft).

---

## 05. Forgiving by default.

*Mistakes are recoverable, not punished.*

Every destructive or finalizing action is one tap from undo. AI-generated outputs always offer "different from expected? adjust." Confirm-modal scolding is replaced by graceful unwinding. Care looks like grace.

**Source:** ほぼ日 *hobonichi* ("almost-daily" — forgiveness baked into the planner brand) · post-AI minimalism critique.

---

## 06. Time is the spine.

*Default organization is a diary, not a folder tree.*

Dated headings, item counts, reverse-chronological scroll. Users' lives accumulate; the framework accepts that as the natural shape. Categories and tags are secondary — time is the load-bearing axis. See the [Diary Spine](patterns/04-diary-spine.md) pattern.

**Source:** Hobonichi Techo · Day One · the broader diary tradition.

---

## 07. Bilingual is first-class.

*Labels respect more than one language as a visual unit.*

When localization matters, both languages appear together as designed pairs — not as a string swapped out by i18n. Even monolingual surfaces inherit the care: labels are typeset, not just rendered. See the [Bilingual Pair](patterns/06-bilingual-pair.md) pattern.

**Source:** Japanese product-packaging convention (MUJI, Tsutaya).

---

## 08. AI feels like craft, not magic.

*The user is the author; the model is a careful collaborator.*

No confidence scores, no "generating…" spinners screaming AI. Subject masks, classifications, transcriptions — all presented as if a thoughtful person produced them. The user can always adjust without shaming the model. See the [Subject Lift](patterns/05-subject-lift.md) pattern.

**Source:** "Quiet tech" discourse · post-AI minimalism · craft over spectacle.

---

## 09. The background is a workspace, not a frame.

*Surfaces feel like the page of a planner — quiet, structured, yours.*

Backgrounds carry subtle structure (a dot grid, a paper tone, a soft texture) that signals "this is your space to fill." They're never empty white expanses; they're never decorated. They invite work without instructing. See the [Dot-Grid Canvas](patterns/02-dot-grid-canvas.md) pattern.

**Source:** Hobonichi dot-grid page · the bullet journal lineage.

---

## 10. Imperfections are signatures.

*Made-by-a-person beats machine-perfect, every time.*

Hand-coded counter copy ("1 Words"). Handwritten timestamps. Slightly off-grid stickers. Photographs that aren't art-directed. The framework celebrates the visible hand. Polish where it serves; texture where it speaks.

**Source:** 侘寂 *wabi-sabi* (imperfection / transience).

---

*See [Lineage](lineage.md) for the full attribution map, vocabulary, and reading list.*
```

- [ ] **Step 2: Verify principle count and structure**

Run:
```bash
grep -c '^## 0\|^## 10\.' docs/principles.md
grep -c '^\*\*Source:' docs/principles.md
```
Expected: 10 principles (one heading match for 01-09 + one for 10), 10 sources.

- [ ] **Step 3: Commit**

```bash
git add docs/principles.md
git commit -m "Add principles document — 10 commitments with sources"
```

---

## Task 3: Write the lineage document

**Files:**
- Create: `docs/lineage.md`

Source: the spec's "Lineage" section, plus the structure already drafted in the brainstorming Lineage screen. Maps each principle to its tradition.

- [ ] **Step 1: Create `docs/lineage.md` with the following content**

```markdown
# Lineage · 系譜 *keifu*

> We don't invent. We curate.

The aesthetic this framework holds is not new. It's a recognized design tradition that lives, today, as a *constellation* — across decades of writing, a planner brand, a handful of working apps, and a recent wave of "quiet tech" discourse. Nobody has yet packaged it as a usable cross-platform framework. That packaging is what Kinari is.

This doc credits the sources honestly. Every commitment in [the principles](principles.md) traces back to something written, designed, or practiced by someone. Read the sources if you want the philosophy underneath.

---

## Three traditions feed this framework

### 01. Japanese restraint, as written down

**Eras:** 1980s–2010s. **Form:** books, manifestos, product philosophy.

Kenya Hara's articulation of MUJI's design philosophy — emptiness as a positive value, acceptance over appetite, white as a container for meaning. Naoto Fukasawa & Jasper Morrison's *Super Normal* — the quality of unremarkable everyday objects, designed to disappear into use.

**Read:**
- Kenya Hara, *[Designing Design](https://www.lars-mueller-publishers.com/designing-design)* (2007)
- Kenya Hara, *[White](https://www.lars-mueller-publishers.com/white-0)* (2010)
- Naoto Fukasawa & Jasper Morrison, *[Super Normal](https://www.lars-mueller-publishers.com/super-normal)* (2007)

### 02. The Hobonichi Techo as a software UI

**Eras:** 2001–present. **Form:** a Japanese planner, manufactured continuously by Hobonichi (糸井重里's company).

Itoi Shigesato's planner is the literal organizational and surface metaphor both Kinari reference apps borrow wholesale: a dot-grid page, dated entries, accumulated stickers, hand-written ephemera. The Hobonichi product team has published 25+ years of small design decisions in service of one idea: *the page is yours.*

**Read:**
- [Hobonichi Techo 2026 — official site](https://www.1101.com/store/techo/en/2026/)

### 03. "Quiet tech" and the post-AI swing

**Eras:** 2023–2026. **Form:** essays, working apps, design-discourse posts.

A reaction to AI/engagement maximalism — software that gets out of the way, that treats the user as an author, that hides the model behind craft. Adjacent terms in circulation:
- **Bento UI** — the layout dialect (modular tile grids; bento.me, Apple Widgets, recent Notion).
- **Japandi (digital)** — the warm-pastel palette dialect.
- **Post-AI minimalism** — the philosophical claim that smarter AI should produce *emptier* surfaces.

**Read:**
- [The Rise of Quiet Tech](https://www.techfinder.io/post/the-rise-of-quiet-tech-designing-technology-that-gets-out-of-the-way) (TechFinder)
- [Bento Grids gallery](https://bentogrids.com/) — working pattern library
- [Cosmos.so · UI design-system board](https://www.cosmos.so/ui/design-system) — community-curated taste in this lineage

**Living practice** (apps and sites making in this voice today, without naming what they do):

| App / Site | What they get right |
|---|---|
| Linear | Restrained chrome, editorial type, dot-grid hints |
| Things 3 | Chunky-but-quiet; time as spine |
| Day One | Diary spine, photo-as-artifact |
| Cosmos.so | Collection-as-craft; "your stuff is the unit" |
| Are.na | Research-as-collection; prose-as-UI |
| iA Writer | Typography-first; restraint as feature |
| bento.me | Bento layout; modular tile grids |
| Butter Camera (黄油相机) | The original "Plog" framing; sticker primitive |
| Hobonichi Techo | Analog ancestor; dot-grid + dated diary |

---

## A vocabulary we borrow, honestly

Japanese aesthetic terms with established design-discourse meaning. We use them as they're used in the literature — never as decoration we don't understand.

| Kanji | Romaji | Meaning | Where it serves Kinari |
|---|---|---|---|
| 間 | *ma* | interval, pause, negative space | Generous whitespace · "[Capture is a ritual](principles.md#03-capture-is-a-ritual)" (the pause that gives the act meaning) |
| 簡素 | *kanso* | simplicity, elimination | "[Photos supply the color; chrome stays quiet](principles.md#01-photos-supply-the-color-chrome-stays-quiet)" · the four-roles-only typography |
| 渋い | *shibui* | restrained, quiet beauty | The whole framework's posture — beauty that doesn't announce itself |
| 侘寂 | *wabi-sabi* | imperfection, transience | "[Imperfections are signatures](principles.md#10-imperfections-are-signatures)" (Principle #10) |
| 民藝 | *mingei* | folk craft, everyday objects | "[Chunky over skinny](principles.md#04-chunky-over-skinny)" · controls that feel like physical objects |
| ほぼ日 | *hobonichi* | almost-daily | "[Forgiving by default](principles.md#05-forgiving-by-default)" · "[Time is the spine](principles.md#06-time-is-the-spine)" |

---

## Each principle, traced back

| # | Principle | Source |
|---|---|---|
| 01 | Photos supply the color; chrome stays quiet | Hara, *White* · MUJI · *kanso* |
| 02 | The user's stuff is the atomic unit | Cosmos.so · Are.na · sticker primitive in references |
| 03 | Capture is a ritual | *ma* · Hobonichi page · slow-tech wave |
| 04 | Chunky over skinny | Fukasawa & Morrison, *Super Normal* · *mingei* |
| 05 | Forgiving by default | *hobonichi* · post-AI minimalism |
| 06 | Time is the spine | Hobonichi Techo · Day One · diary tradition |
| 07 | Bilingual is first-class | Japanese product-packaging (MUJI, Tsutaya) |
| 08 | AI feels like craft, not magic | "Quiet tech" · post-AI minimalism |
| 09 | The background is a workspace | Hobonichi dot-grid · bullet journal lineage |
| 10 | Imperfections are signatures | *wabi-sabi* |

---

## What this framework adds

Hara wrote books. Hobonichi makes a planner. Fukasawa designs objects. The quiet-tech essayists make arguments. Linear, Things 3, Cosmos.so practice the aesthetic without naming it.

**What's missing is a cross-platform design framework that pulls the threads into a usable form** — principles you can apply, a visual language you can spec, patterns you can name in a project brief. That's what Kinari packages. The novelty isn't the aesthetic; it's the consolidation.

---

## Reference materials from this project

The framework was developed against close study of two iOS reference apps. Their captures and analyses live in [`docs/context/`](context/):

- **[KiteSprint capture](context/KiteSprint-2055871758352441792.md)** — frame-by-frame breakdown of the Chinese food-diary app (Butter Camera "Plog" template)
- **[Om Patel capture](context/om_patel5-2055487997567553698.md)** — the dad-built kids' language-learning app
- **[Motion analysis](context/motion-analysis-from-references.md)** — frame-by-frame motion study (~260 frames across both videos at 10–12 fps)
- **[Navigation analysis](context/nav-analysis-from-references.md)** — persistent vs. contextual chrome, three product-nav patterns derived from the references
```

- [ ] **Step 2: Verify principle-to-source mapping**

Run:
```bash
grep -c '| 01 \|| 02 \|| 03 \|| 04 \|| 05 \|| 06 \|| 07 \|| 08 \|| 09 \|| 10 ' docs/lineage.md
```
Expected: 10 (each principle has a source row).

- [ ] **Step 3: Commit**

```bash
git add docs/lineage.md
git commit -m "Add lineage document — three traditions, vocabulary, source map"
```

---

## Task 4: Write the visual language document

**Files:**
- Create: `docs/visual-language.md`

Source: the spec's full Visual Language section (typography, color, shadows, photo treatment, backgrounds, iconography, layout, motion). This is the largest doc — multiple steps.

- [ ] **Step 1: Create `docs/visual-language.md` with the front matter and Typography section**

Create the file with this initial content (we'll append more in subsequent steps):

```markdown
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
```

Run: `wc -l docs/visual-language.md` — expected: ~30 lines.

- [ ] **Step 2: Append the Color section**

Append to `docs/visual-language.md`:

```markdown

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
```

Run: `wc -l docs/visual-language.md` — expected: ~70 lines.

- [ ] **Step 3: Append the Shadows section**

Append:

```markdown

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
```

Run: `wc -l docs/visual-language.md` — expected: ~110 lines.

- [ ] **Step 4: Append Photo Treatment, Backgrounds, Iconography sections**

Append:

```markdown

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
```

Run: `wc -l docs/visual-language.md` — expected: ~165 lines.

- [ ] **Step 5: Append Layout section**

Append:

```markdown

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
```

Run: `wc -l docs/visual-language.md` — expected: ~195 lines.

- [ ] **Step 6: Append the Motion section (final, longest)**

Append:

```markdown

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
```

Run: `wc -l docs/visual-language.md` — expected: ~310 lines.

- [ ] **Step 7: Verify section count and commit**

Run:
```bash
grep -c '^## 0\|^## 10\|^---$' docs/visual-language.md
```
Expected: 8 numbered sections + the lead `---` dividers (so ~9-10 matches total).

```bash
git add docs/visual-language.md
git commit -m "Add visual language document — 8 sections (typography → motion)"
```

---

## Task 5: Write the patterns index

**Files:**
- Create: `docs/patterns/_index.md`

This defines the **template** that every pattern doc follows, plus a table of all 12. The template doubles as the format spec for every individual pattern file.

- [ ] **Step 1: Create `docs/patterns/_index.md` with the following content**

```markdown
# Pattern Library · 手本 *tehon*

> Twelve seed patterns. Each is a UI *metaphor*, described in spirit, translatable across mobile / web / marketing.

A pattern is a **named UI metaphor** — not a component, not a snippet. It survives translation between media because it's described abstractly: what it *feels* like, what *job* it does, what *principles* it serves. Concrete implementations live in `examples/` once real projects demonstrate them.

The library is intended to grow. New patterns get added when a project earns one — observed in the wild, named with a Japanese romaji, mapped to principles. Existing patterns get refined as real implementations surface edge cases.

---

## The pattern doc template

Every pattern file follows this structure. When adding a new pattern, copy this template and fill each section.

```markdown
# Pattern NN · [English Name] · [Kanji] *[romaji]*

**Core:** One sentence describing the pattern.

**Serves principles:** [list with numbers and links to principles.md]

**Source:** Where this comes from — reference apps, design tradition, both.

---

## Spirit

Abstract description (2-3 paragraphs). What the pattern feels like in use, what
job it does, what the underlying metaphor is. This is the longest section and
the most important — it's what makes the pattern survive translation.

---

## Across media

### Mobile (iOS / Android native)

How it manifests on native mobile. Specific APIs / weights / sizes if helpful.

### Web

How it translates to web. CSS hints if helpful.

### Marketing

How it shows up on marketing surfaces (landing pages, content sites).

---

## Examples in the wild

Concrete references: which app, which screen, which transition. Both the
project's own reference materials (KiteSprint, Om Patel) and external examples
when applicable.

---

## Anti-patterns

Specific motions / shapes / behaviors this pattern is *not*. Helps the reader
recognize misuse. Optional but encouraged.

---

## Cross-references

- Related patterns
- Related visual-language sections
- Spec section if helpful
```

---

## The twelve seed patterns

| # | Name | Romaji | Kanji | Serves | One-line |
|---|---|---|---|---|---|
| 01 | [Sticker Primitive](01-sticker-primitive.md) | *shīru* | シール | 1, 2 | The user's stuff as a die-cut sticker — object with weight. |
| 02 | [Dot-Grid Canvas](02-dot-grid-canvas.md) | *hōgan* | 方眼 | 1, 9 | Backgrounds carry quiet structure — never empty. |
| 03 | [Capture Ritual](03-capture-ritual.md) | *utsushi* | 写し | 3, 5 | The moment of authorship is framed with ceremony. |
| 04 | [Diary Spine](04-diary-spine.md) | *nikki* | 日記 | 2, 6 | Time is the load-bearing organizational axis. |
| 05 | [Subject Lift](05-subject-lift.md) | *kirinuki* | 切り抜き | 3, 8 | AI segments subjects and presents them as craft. |
| 06 | [Bilingual Pair](06-bilingual-pair.md) | *heiki* | 並記 | 7 | Two languages, one designed typographic unit. |
| 07 | [Numeral Display](07-numeral-display.md) | *sūji* | 数字 | 2, 4 | Numbers that matter get the warm signal and the chunk. |
| 08 | [Soft Spring](08-soft-spring.md) | *tawami* | 撓み | 4, 5 | Things settle like a branch under snow — no overshoot. |
| 09 | [Navigation Pill](09-navigation-pill.md) | *annai* | 案内 | 4, 6 | Doc / tour browsing nav. Linear, prev-next, breadcrumb + dot strip. |
| 10 | [Quiet Tabs](10-quiet-tabs.md) | *shizukana tabu* | 静かなタブ | 1, 4, 7 | Product nav for constellation apps. Floating icon-only pills with a sliding accent indicator. |
| 11 | [Single Button](11-single-button.md) | *hitotsu-botan* | 一つボタン | 2, 3, 10 | Product nav for one-verb apps. A single branded shape replaces persistent navigation. |
| 12 | [Three Circles](12-three-circles.md) | *mittsu-no-maru* | 三つの丸 | 3, 5, 8 | Decision-moment chrome. Three round buttons for confirm / retry / discard. |

---

## Library growth

Patterns visible in references but not yet seeded — candidates for v0.2:

- **Adjust Affordance** — the "different from expected? tap to adjust" recovery pattern that softens AI failure modes (visible in Om Patel's cup-reveal flow). Partially subsumed by [Three Circles](12-three-circles.md) but the *language* of the affordance is its own thing.
- **Polaroid Variant** — the white-bordered photo treatment for un-maskable subjects (landscapes, scenes). Currently a sub-rule of [Sticker Primitive](01-sticker-primitive.md); may earn its own doc when a project leans on it.
- **Empty State** — what [Dot-Grid Canvas](02-dot-grid-canvas.md) does before the user has added anything. Currently implicit; deserves naming when an example project surfaces it.

Each gets named, sketched, and added when a real project demands it.
```

- [ ] **Step 2: Verify pattern table has 12 rows**

Run:
```bash
grep -c '^| 0\|^| 1' docs/patterns/_index.md
```
Expected: 12 (one per pattern, 01-12).

- [ ] **Step 3: Commit**

```bash
git add docs/patterns/_index.md
git commit -m "Add pattern library index — template and 12-pattern table of contents"
```

---

## Task 6: Pattern #01 — Sticker Primitive

**Files:**
- Create: `docs/patterns/01-sticker-primitive.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 01 · Sticker Primitive · シール *shīru*

**Core:** The user's stuff is rendered as a die-cut sticker — an object with weight, not a row in a list.

**Serves principles:** [#1 Photos supply the color](../principles.md#01-photos-supply-the-color-chrome-stays-quiet) · [#2 The user's stuff is the atomic unit](../principles.md#02-the-users-stuff-is-the-atomic-unit)

**Source:** Both reference apps' core UI primitive (subject-masked food photos in KiteSprint; cutout objects with labels in Om Patel). Conceptual ancestors: Polaroid Lab, Apple iOS 16+ Subject Lift, the long tradition of die-cut paper stickers.

---

## Spirit

A sticker is an *object with weight*. It is not a row in a table; it is not a card in a feed. It is a thing the user can imagine picking up — a die-cut shape on a soft surface, with a slight rotation, a thin white border, and a hand-placed drop shadow.

The sticker is the framework's primary noun. Every artifact the user creates — a photograph, a clip, a note, an entry — wears this treatment. The label, when present, sits below the cutout in chunky bold sans-serif, like text printed on a physical adhesive sticker.

The rotation matters: each sticker carries a tiny tilt (-1.2° to +1.1° varying), which is what makes it feel hand-placed rather than pinned to a grid. When hovered or focused, the sticker straightens to 0° and lifts along the upper-left light diagonal — a quiet "I see you noticing me."

---

## Across media

### Mobile

Subject-masked photo (iOS 16+ Subject Lift API, or pre-masked PNG) wrapped in a thin white border via `filter: drop-shadow()` or an SVG mask. Label in `system-ui` 700–800 weight below. Slight CSS `transform: rotate(±0.5–1.2deg)`. Tap-to-pick-up uses `UIImpactFeedbackGenerator(.light)`.

### Web

Same visual treatment via SVG `filter` or CSS `clip-path` + `filter: drop-shadow()`. Pre-masked PNGs are fine for cases without programmatic cutout. Collections render as flex/grid sticker walls; hover lightens the shadow and straightens the rotation.

### Marketing

Stickers become hero artwork. Editorial layouts place product / person / object cutouts on kinari pages. Same shape rules; larger scale.

---

## Examples in the wild

- **KiteSprint canvas** — food stickers (apple, salad, toast, drink) on a window-night background; each rotated slightly.
- **Om Patel diary** — "Donut", "Forest", "Iced tea", "Roller skates" as labeled cutouts with chunky bold sans labels.
- **Apple iOS Subject Lift** — system-level subject masking; the OS primitive Kinari builds on.

---

## Anti-patterns

- **Raw rectangular crops with no border.** Forbidden by [Visual Language → Photo treatment](../visual-language.md#04--photo-treatment--写真処理-shashin-shori).
- **Black drop shadows** under stickers. The shadow must inherit a tint from the sticker (warm umber for white stickers; the element's hue for colored stickers). See [Visual Language → Shadows](../visual-language.md#03--shadows--影-kage).
- **Centered shadows** (`offset-x: 0`). Light comes from the upper-left.
- **Rigid grid alignment.** A wall of stickers should have varying slight rotations — never all at the same angle, never all at exactly 0°.

---

## Cross-references

- [Pattern #07 Numeral Display](07-numeral-display.md) — numbers that sit *on* stickers (e.g. "94 kcal" beneath a food sticker)
- [Pattern #04 Diary Spine](04-diary-spine.md) — sticker collections organized chronologically
- [Visual Language → Shadows](../visual-language.md#03--shadows--影-kage) — shadow tinting and light direction
- [Visual Language → Photo treatment](../visual-language.md#04--photo-treatment--写真処理-shashin-shori) — polaroid variant for un-maskable subjects
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/01-sticker-primitive.md
git commit -m "Add pattern doc: 01 Sticker Primitive"
```

---

## Task 7: Pattern #02 — Dot-Grid Canvas

**Files:**
- Create: `docs/patterns/02-dot-grid-canvas.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 02 · Dot-Grid Canvas · 方眼 *hōgan*

**Core:** Backgrounds carry quiet structure — never empty, never decorated.

**Serves principles:** [#1 Photos supply the color; chrome stays quiet](../principles.md#01-photos-supply-the-color-chrome-stays-quiet) · [#9 The background is a workspace, not a frame](../principles.md#09-the-background-is-a-workspace-not-a-frame)

**Source:** The Hobonichi Techo planner page — a 25+ year-old physical artifact. Both reference apps use the dot grid wholesale. Bullet journal lineage descended from Ryder Carroll's 2013 system.

---

## Spirit

The Hobonichi page on a screen. 12pt grid, ~12% sumi-ink opacity dots on kinari paper. Provides invisible structure for placing artifacts without instructing the user where they go.

A blank white page reads as *empty*. A printed grid reads as *prescriptive*. A dot grid threads the needle: it offers structure when the eye seeks it, disappears when the eye doesn't. The page becomes an invitation, not an instruction.

Every primary surface in a Kinari product is a dot-grid canvas. Settings panels are not. Modals are not. Marketing pages are. The rule of thumb: *if this is a place where the user works or where their stuff lives, it's a canvas*.

---

## Across media

### Mobile

SwiftUI `Canvas` with a stride-based dot pattern, or a tiled image. Used for capture / composition / detail / canvas / diary surfaces. Not for system surfaces (settings, modals, alerts).

### Web

CSS one-liner on the root or page-level element:

```css
background: #f7f5f0;
background-image: radial-gradient(circle, rgba(26,26,26,0.13) 1px, transparent 1px);
background-size: 12px 12px;
background-position: 0 0;
```

Long-form reading surfaces (settings, documentation that's mostly text) switch to the **paper tone** variant (`#f4ede0`, no dots) — see [Visual Language → Backgrounds](../visual-language.md#05--backgrounds--地紙-jigami).

### Marketing

Default for every framework-aligned marketing page. Hero areas, feature breakdowns, pricing — all share the dot grid. The grid is the framework's visual signature on the open web.

---

## Examples in the wild

- **KiteSprint** — every capture and composition surface
- **Om Patel** — diary view, cutout reveal screens
- **Hobonichi Techo** — the analog ancestor; their official product photography for the 2026 planner shows the dot grid in dozens of variants

---

## Anti-patterns

- **Pure white backgrounds.** Read as empty / sterile. Always use kinari paper.
- **Heavier grids** (lined, square-grid, or dot grids at >20% opacity). Read as instructional rather than invitational.
- **Decorative backgrounds** (gradients, patterns, illustrations). The background must be quiet; the user's content is the color.
- **Marketing-page background images.** The dot grid is the marketing-page signature.

---

## Cross-references

- [Visual Language → Backgrounds](../visual-language.md#05--backgrounds--地紙-jigami) — paper tone variant for reading-heavy surfaces
- [Pattern #01 Sticker Primitive](01-sticker-primitive.md) — what lives *on* the canvas
- [Pattern #04 Diary Spine](04-diary-spine.md) — the dot-grid canvas as a backdrop for chronological entries
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/02-dot-grid-canvas.md
git commit -m "Add pattern doc: 02 Dot-Grid Canvas"
```

---

## Task 8: Pattern #03 — Capture Ritual

**Files:**
- Create: `docs/patterns/03-capture-ritual.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 03 · Capture Ritual · 写し *utsushi*

**Core:** The moment a user makes something is framed with quiet ceremony.

**Serves principles:** [#3 Capture is a ritual](../principles.md#03-capture-is-a-ritual) · [#5 Forgiving by default](../principles.md#05-forgiving-by-default)

**Source:** KiteSprint's apple-onboarding and food-capture flows · Om Patel's donut / sandwich / cup capture sequences · 間 *ma* (the meaningful pause).

---

## Spirit

The act of creating an artifact — taking a photo, writing an entry, adding an item — is the most important moment in any Kinari product. The interface treats it with care.

Thin white corner brackets frame the focus area. A single large round action anchors the bottom. Post-capture brings a soft beat of celebration (see [Pattern #8 Soft Spring](08-soft-spring.md) for the two-stage glow), then settle. Recovery is always one tap away — "different from expected? adjust" — so the user never feels punished for trying.

The ritual is what makes a product feel *tended to*. A drive-by tap-to-add input would say "your stuff is data." A framed capture moment says "your stuff is an artifact, and we're going to make it well together."

---

## Across media

### Mobile

Custom camera surface with `AVCaptureSession` + overlay; corner brackets in SwiftUI. Shutter is a 64pt white circle with subtle ring detail. Post-capture sheet slides up with a light haptic. The bloom glow at peak haptic is part of the Soft Spring vocabulary (see [Pattern #8](08-soft-spring.md)).

### Web

Form-based capture flows borrow the same posture: a focused composition area, a large primary button (white with accent on hover or fill), a soft "saved" animation. **Never inline drive-by inputs for meaningful authorship.** A comment box is not a form field — it's a small capture ritual.

### Marketing

Sign-up, contact, and comment forms all wear the same friendly chrome. CTAs are big white pills. Submissions get a small ceremony — sticker reveal, glow, settle — not a flash redirect.

---

## Examples in the wild

- **KiteSprint apple flow** — subject framed by ring outline · ✓ desaturates as the user taps · the 94 kcal numeral fades in beneath
- **Om Patel donut capture** — shimmer-dust during AI cutout (see [Pattern #5](05-subject-lift.md)) · soft glow on sticker reveal · gentle "different from expected? adjust" recovery hint
- **iOS system Camera** — the bracket framing is the canonical Apple precedent

---

## Anti-patterns

- **Inline auto-save** without acknowledgment — strips the moment of meaning
- **Confirm-modal scolding** ("Are you sure?") — replaces grace with friction
- **Spinner-heavy AI processing** — see [Pattern #5 Subject Lift](05-subject-lift.md) for the correct vocabulary
- **Scale-down press feedback** on capture buttons — buttons should *fade and spend themselves*, not depress (see Visual Language → Motion's tap-acknowledgment rule)

---

## Cross-references

- [Pattern #5 Subject Lift](05-subject-lift.md) — what happens when AI is involved in the capture
- [Pattern #8 Soft Spring](08-soft-spring.md) — the two-stage confirmation glow, the tap-spent fade
- [Pattern #12 Three Circles](12-three-circles.md) — the decision triad that often follows capture
- [Visual Language → Motion](../visual-language.md#08--motion--撓み-tawami) — confirmation glow, tap acknowledgment, page-replace
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/03-capture-ritual.md
git commit -m "Add pattern doc: 03 Capture Ritual"
```

---

## Task 9: Pattern #04 — Diary Spine

**Files:**
- Create: `docs/patterns/04-diary-spine.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 04 · Diary Spine · 日記 *nikki*

**Core:** Content is organized chronologically by default. Time is the load-bearing axis.

**Serves principles:** [#2 The user's stuff is the atomic unit](../principles.md#02-the-users-stuff-is-the-atomic-unit) · [#6 Time is the spine](../principles.md#06-time-is-the-spine)

**Source:** Hobonichi Techo · Day One · the broader diary tradition · KiteSprint's daily food log · Om Patel's vocab diary.

---

## Spirit

Serif date headers (Georgia / Newsreader at 22–32pt) with a muted item-count subhead ("1 Words"). Items below as sticker rows or sticker walls, reverse chronological. Categories and tags are secondary; time is load-bearing.

Most products organize content by category, project, or tag. Kinari defaults to chronology because *users' lives accumulate*. The diary spine accepts that as the natural shape and makes the accumulation itself the navigable structure.

The dates are not metadata; they are the **navigation**. New items glow briefly on entry. Old items dim with time. The user can scroll back into yesterday, last week, last year — and the page reads like a journal, not a database.

---

## Across media

### Mobile

SwiftUI `Section` with a serif header (`.font(.system(.title, design: .serif))`) + a muted count subhead. Each row uses the [Sticker Primitive](01-sticker-primitive.md). Pull-to-refresh adds a new sticker to the top with a brief glow.

### Web

Long-scroll page with date anchors. Optional sticky month/day strip on the side for jump navigation when entries are dense. Pagination by month if entries number in the thousands.

### Marketing

Blogs, changelogs, news, archives all wear this spine. Each post is a sticker + date + body. Yearly archive is a sticker wall organized by month — the framework's signature take on the "archive page."

---

## Examples in the wild

- **KiteSprint daily food log** — `今天 17:25` headers with calorie-numeral stickers beneath
- **Om Patel vocab diary** — `Feb 23 — 1 Words`, `Feb 21 — 8 Words` (ungrammatical "Words" is intentional — see [Principle #10](../principles.md#10-imperfections-are-signatures))
- **Hobonichi Techo** — the analog ancestor; each daily page is its own diary spine
- **Day One** — well-known software descendant

---

## Anti-patterns

- **Category-first navigation.** Time is the default; categories are filters layered on top.
- **Hidden timestamps.** Every artifact in the diary shows when it landed.
- **Staggered row entrance animations on scroll.** Items appear as they're scrolled to — no fanfare. See [Visual Language → Motion](../visual-language.md#08--motion--撓み-tawami).
- **Pagination buttons.** The diary is long-scroll. Jump navigation is via the date anchor strip, not a "page 2 of 10."

---

## Cross-references

- [Pattern #01 Sticker Primitive](01-sticker-primitive.md) — the unit of each diary entry
- [Pattern #07 Numeral Display](07-numeral-display.md) — kcal / word-count / score numerals on diary entries
- [Pattern #8 Soft Spring](08-soft-spring.md) — focus drill-in (scale + blur) when tapping a diary entry to expand
- [Visual Language → Layout](../visual-language.md#07--layout--配置-haichi) — content max-width, padding rhythm
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/04-diary-spine.md
git commit -m "Add pattern doc: 04 Diary Spine"
```

---

## Task 10: Pattern #05 — Subject Lift

**Files:**
- Create: `docs/patterns/05-subject-lift.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 05 · Subject Lift · 切り抜き *kirinuki*

**Core:** AI segments a subject from its background and presents the result as craft, not technology.

**Serves principles:** [#3 Capture is a ritual](../principles.md#03-capture-is-a-ritual) · [#8 AI feels like craft, not magic](../principles.md#08-ai-feels-like-craft-not-magic)

**Source:** Apple iOS 16+ Subject Lift system API · KiteSprint apple onboarding flow · Om Patel cutout flows (donut, sandwich, cup).

---

## Spirit

A soft white ring outlines the subject as the model works; a gentle confirmation glow when the cutout finalizes. **No "AI thinking" spinner, no confidence score.** The moment feels like the user pressed a button and a sticker appeared.

The technical action is segmentation; the experiential framing is *craft*. The user is the author of the sticker — the model is the careful collaborator who handled the masking. The interface never reveals that there's a model behind the curtain; it just shows the result, beautifully.

This is the framework's strongest stance on AI-as-craft. Any model output that affects user content — masking, classification, generation — wears this treatment.

---

## Across media

### Mobile

On-device subject lift via Apple's Vision framework (iOS 16+) or equivalent. Surface the result with the ring outline + bloom glow vocabulary from [Soft Spring](08-soft-spring.md). Shimmer-dust particles fill the in-between time (~600–800ms).

### Web

Server-side segmentation (or WebAssembly model) hidden behind the same visual ritual. The shimmer-dust effect is CSS particles or a Lottie animation. The UI hides the *work* behind *craft*.

### Marketing

Editorial product photography uses subject-lifted treatment as a *stylistic choice*, not a technical reveal. The framework's own marketing renders product / person / object cutouts identically — the AI heritage shows up as an aesthetic move, not a feature ad.

---

## Examples in the wild

- **KiteSprint apple → kcal flow** — sparkle-star + `思考中…` text indicator (a typographic spinner replacement) during the segmentation
- **Om Patel donut cutout** — full-frame shimmer-dust particle effect during the cutout phase; the subject sharpens as the dust recedes
- **Apple iOS 16+ Photos → Subject Lift** — the OS primitive; long-press a subject and it cleanly lifts

---

## Anti-patterns

- **Traditional progress spinners** — forbidden. Replace with sparkle-star + `思考中` text or shimmer-dust particles.
- **Confidence scores or model metadata visible to the user.** The user is the author. The model is invisible.
- **"AI" or "ML" branding in the UI.** The framework's stance is that AI gets *dressed as craft*, not labeled as AI.
- **Shaming on failure.** "Different from expected? tap to adjust" is the recovery affordance — see [Pattern #12 Three Circles](12-three-circles.md) for the geometry.

---

## Cross-references

- [Pattern #03 Capture Ritual](03-capture-ritual.md) — the framing around the capture moment
- [Pattern #8 Soft Spring](08-soft-spring.md) — the two-stage glow vocabulary at the moment of cutout completion
- [Pattern #12 Three Circles](12-three-circles.md) — the retry/confirm/discard triad that often follows a cutout
- [Visual Language → Motion](../visual-language.md#08--motion--撓み-tawami) — the AI shimmer is reserved for this pattern; not for chrome
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/05-subject-lift.md
git commit -m "Add pattern doc: 05 Subject Lift"
```

---

## Task 11: Pattern #06 — Bilingual Pair

**Files:**
- Create: `docs/patterns/06-bilingual-pair.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 06 · Bilingual Pair · 並記 *heiki*

**Core:** Two languages, one designed typographic unit. Labels are designed, not translated.

**Serves principles:** [#7 Bilingual is first-class](../principles.md#07-bilingual-is-first-class)

**Source:** Japanese product-packaging convention (MUJI, Tsutaya). Om Patel's `Cup / 컵` stickers. KiteSprint's `细线 clean` / `虚线 rhythm` / `圆点 soft` / `双层 premium` chip selectors.

---

## Spirit

Two languages lock up as a single designed unit — English on top, secondary language below (or vice versa, locale-dependent), with established weight and spacing relationships. Treated like brand wordmarks on Japanese product packaging — **never as "string and its tooltip."**

The bilingual pair is what makes Kinari respect more than one language as a visual primitive. Where i18n would swap a string, the framework swaps the *primary position* of the pair while preserving the typographic relationship. The reader who recognizes both sees one elegant lockup; the reader who knows only one still gets the structure.

This is also why Kinari section headers (`原則 · gensoku · principles`) wear this treatment by default — even in the framework's own docs.

---

## Across media

### Mobile

Sticker labels, button text, hero copy can all wear the pair. Locale switches change which language is primary; the visual relationship survives. Use a flex column with the larger language above and the smaller below; spacing handled by `gap` rather than margins so the typographic lockup is preserved across font sizes.

### Web

Same. CSS handles the typography lockup; localization swaps content but never breaks the visual relationship. A `.pair` component class can carry this everywhere:

```html
<span class="pair">
  <span class="pair-jp">原則</span>
  <span class="pair-en">gensoku · principles</span>
</span>
```

### Marketing

Brand wordmarks, pricing, calls-to-action — all support bilingual treatment when the audience earns it. Section headers and navigation labels often wear the pair on framework-aligned marketing.

---

## Examples in the wild

- **Om Patel sticker labels** — `Cup` (large bold sans, English) with `컵` (smaller, Korean) below, sometimes with a speaker icon for pronunciation
- **KiteSprint chip selectors** — `细线 clean`, `虚线 rhythm` — Chinese + English glossing as one chip
- **MUJI product packaging** — the canonical industrial precedent; every product wears the bilingual pair on its label
- **Tsutaya cassette / album covers** — pre-internet Japanese precedent for the lockup

---

## Anti-patterns

- **Translation tooltips** ("hover for Japanese") — strips the typography of intent
- **Single-language nav labels.** Kinari nav uses icons-only (see [Pattern #10 Quiet Tabs](10-quiet-tabs.md)) precisely to avoid single-language chrome.
- **Misaligned weight relationships.** The two languages should have a fixed *visual weight ratio*; one isn't subordinate to the other in any sense beyond locale primacy.

---

## Cross-references

- [Pattern #10 Quiet Tabs](10-quiet-tabs.md) — chooses icons-only specifically to dodge the single-language-label problem
- [Visual Language → Typography](../visual-language.md#01--typography--書体-shotai) — the type roles that support the pair
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/06-bilingual-pair.md
git commit -m "Add pattern doc: 06 Bilingual Pair"
```

---

## Task 12: Pattern #07 — Numeral Display

**Files:**
- Create: `docs/patterns/07-numeral-display.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 07 · Numeral Display · 数字 *sūji*

**Core:** Numbers that matter get the warm signal and the chunky display treatment — celebrated, not just shown.

**Serves principles:** [#2 The user's stuff is the atomic unit](../principles.md#02-the-users-stuff-is-the-atomic-unit) · [#4 Chunky over skinny](../principles.md#04-chunky-over-skinny)

**Source:** KiteSprint's `94 kcal` / `584 kcal` / `1,399 kcal` callouts · Om Patel's `1 Words` / `8 Words` / `34 Words` diary subheads.

---

## Spirit

Heavy-weight sans-serif (800–900), **italic**, tight letter-spacing, in 柿色 *kaki-iro* warm signal (`#d97a3c`). The unit (kcal, words, MB, $, mi) hangs smaller and lighter beside or below in the same color. Reserved for celebratory numbers — counts, scores, totals — **never for every metric**.

The italic is deliberate: it gives the number a forward-leaning quality, like a finished signature or a confidently completed total. The kaki-iro warm makes it the single color signal across an otherwise quiet UI — your eye finds the number first, then the surrounding context.

Numerals always italicize when stylized. This includes serif numerals in display contexts (principle numbers, pattern numbers on stickers): Georgia italic 600.

---

## Across media

### Mobile

`system-ui` heavy italic in `#d97a3c` for sans-serif numerals; Georgia italic 600 for serif numerals (principle / pattern numbering). Use `font-variant-numeric: tabular-nums` for any numeric that updates in place (counters, scores) so the digits don't jitter.

### Web

CSS:

```css
.numeric-display {
  font-weight: 800;
  font-style: italic;
  color: #d97a3c;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
```

### Marketing

Hero stats on landing pages. Pricing cards. Anywhere a number is the point. Sparingly — three or four numbers per page maximum, or the warm signal stops being a signal.

---

## Examples in the wild

- **KiteSprint** — `94 kcal` on the apple sticker · `584 kcal` on the salad detail · `1,399 kcal` in the daily summary
- **Om Patel** — `1 Words`, `8 Words`, `34 Words` subheaders (note the intentional `Words` plural — see [Principle #10](../principles.md#10-imperfections-are-signatures))
- **Linear / Things 3** — adjacent precedents in heavy-italic display numerals

---

## Anti-patterns

- **Roman (non-italic) display numerals.** Always italicize.
- **Non-kaki-iro stylized numbers.** The warm signal is reserved for this pattern; using another color undermines it.
- **Stylizing every number.** If you stylize the page count, the timestamp, the share count, the like count — none of them are signals anymore. Pick the numbers that *celebrate something*; let the rest sit in body type.

---

## Cross-references

- [Visual Language → Typography](../visual-language.md#01--typography--書体-shotai) — the four type roles; numeric display is the fourth
- [Visual Language → Color](../visual-language.md#02--color--配色-haishoku) — kaki-iro lives in the core palette
- [Pattern #01 Sticker Primitive](01-sticker-primitive.md) — numerals often sit on or beside stickers
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/07-numeral-display.md
git commit -m "Add pattern doc: 07 Numeral Display"
```

---

## Task 13: Pattern #08 — Soft Spring

**Files:**
- Create: `docs/patterns/08-soft-spring.md`

This is the largest pattern doc because it governs all motion. Most of the substance is in [Visual Language → Motion](../visual-language.md#08--motion--撓み-tawami); this doc reframes it as a pattern.

- [ ] **Step 1: Create the file with the following content**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/08-soft-spring.md
git commit -m "Add pattern doc: 08 Soft Spring"
```

---

## Task 14: Pattern #09 — Navigation Pill

**Files:**
- Create: `docs/patterns/09-navigation-pill.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/09-navigation-pill.md
git commit -m "Add pattern doc: 09 Navigation Pill"
```

---

## Task 15: Pattern #10 — Quiet Tabs

**Files:**
- Create: `docs/patterns/10-quiet-tabs.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 10 · Quiet Tabs · 静かなタブ *shizukana tabu*

**Core:** Product navigation for *constellation* products — apps with co-equal top-level sections. Floating icon-only tabs with a sliding accent indicator.

**Serves principles:** [#1 Photos supply the color; chrome stays quiet](../principles.md#01-photos-supply-the-color-chrome-stays-quiet) · [#4 Chunky over skinny](../principles.md#04-chunky-over-skinny) · [#7 Bilingual is first-class](../principles.md#07-bilingual-is-first-class)

**Source:** KiteSprint's 4-tab bottom bar (bowl / dial / trash / camera) with a filled sage-pill active state — see [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md).

---

## Spirit

Floating bottom row of 3–5 icon-only destinations. Active slot is a filled stadium pill in the project accent; the pill **slides between slots** in 120–180ms, soft-out easing (see [Pattern #8 Soft Spring](08-soft-spring.md)). Floats ≥18px above the surface edge; the dot-grid canvas scrolls beneath.

The pill is the only structural "you are here" signal — no header chrome, no breadcrumbs, no underlines. **The accent color is the structure.** This is the framework's strongest stance on chrome staying quiet.

The bar hides wholesale on tool / detail / capture surfaces. No fade-out animation; it's a **page-replace** (see [Pattern #8](08-soft-spring.md)) — the bar is part of the page being replaced.

---

## Across media

### Mobile

Native tab bar implementation customized with the visual language. iOS: a custom view in place of `UITabBar` (or `TabView` with the appropriate styling) — the framework can't quite use the system tab bar because the system tab bar lacks the sliding-pill active state and the floating-pill geometry.

### Web

Floating bottom dock. CSS:

```css
.quiet-tabs {
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  background: #ffffff;
  padding: 4px;
  border-radius: 999px;
  box-shadow: 3px 3px 0 rgba(72,55,32,0.07), 8px 16px 24px rgba(72,55,32,0.14);
}
.quiet-tabs-pill {
  /* the sliding accent pill — see kinari-nav-demo.html for the full impl */
}
```

Above 720px width, optionally mirror the dock as a **left rail** with the same active-pill pattern.

### Marketing

Rare on marketing surfaces — Quiet Tabs are a product pattern. If a marketing site uses them (e.g. for a multi-feature landing), follow product rules.

---

## Examples in the wild

- **KiteSprint** — 4 icon-only tabs (bowl / dial / trash / camera) with sage pill sliding between slots; pill hides wholesale on camera and detail flows
- **iOS Tab Bar** — system-level adjacent precedent; Kinari's version adds the sliding pill + floating-above-paper geometry

---

## Anti-patterns

- **Labels on tabs.** Always icons-only. Labels would require single-language text (forbidden by [Principle #7](../principles.md#07-bilingual-is-first-class)) or bilingual lockups (which don't fit in a tab slot).
- **More than 5 tabs.** If you need more than 5 top-level destinations, you have either a hierarchical product (use a left rail) or a constellation that needs splitting.
- **Animated transitions of the bar itself** on page change. The bar **page-replaces**; it doesn't slide or fade.
- **Bottom border or shadow on the page above the bar.** The bar floats; the surface scrolls beneath. No separator.

---

## Cross-references

- [Pattern #11 Single Button](11-single-button.md) — for one-verb products instead
- [Pattern #12 Three Circles](12-three-circles.md) — for decision moments that *replace* the tab bar temporarily
- [Pattern #08 Soft Spring](08-soft-spring.md) — sliding-pill timing and page-replace policy
- [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md) — source analysis
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/10-quiet-tabs.md
git commit -m "Add pattern doc: 10 Quiet Tabs"
```

---

## Task 16: Pattern #11 — Single Button

**Files:**
- Create: `docs/patterns/11-single-button.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 11 · Single Button · 一つボタン *hitotsu-botan*

**Core:** Product navigation for *one-verb* products. A single branded shape replaces persistent navigation entirely.

**Serves principles:** [#2 The user's stuff is the atomic unit](../principles.md#02-the-users-stuff-is-the-atomic-unit) · [#3 Capture is a ritual](../principles.md#03-capture-is-a-ritual) · [#10 Imperfections are signatures](../principles.md#10-imperfections-are-signatures)

**Source:** Om Patel's multicolor segmented shutter ring — see [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md). Conceptual ancestor: any product whose entire UI is built around one dominant verb (Instagram's shutter, Snap's camera, AnyList's add button).

---

## Spirit

One branded shape anchors the app's bottom-center. It is the app's **logo-in-place** — a recognizable geometry that appears on every surface (camera, diary, edit). The shape never changes. The *meaning* does.

In capture mode, the button takes a photo. In diary mode, the same button goes back to capture. In edit mode, the same button saves. The shape stays invariant; the surrounding context — title, subtitle, satellite circles — tells the user what verb is currently bound to the shape.

This pattern is for products with **one dominant action**. Camera-first apps. Compose-first apps. Ask-first apps. The product *is* a single verb made repeatable, and the navigation reflects that.

Small satellite circles may flank the primary on certain surfaces (recent stickers next to a shutter on the diary, a cancel circle alongside a save). Satellites stay small and quiet — the primary is always the center of attention.

---

## Across media

### Mobile

Fixed bottom-center button at 56–72pt diameter — about half the frame width's worth of presence. The branded shape is custom-drawn (SwiftUI Shape or SVG); it is **not** a system button styled to look custom. The shape is the brand.

### Web

Fixed bottom-center FAB on mobile breakpoints. On desktop, the same shape often promotes to a hero CTA at eye-line, with the surrounding context (title, subtitle) reading above it.

```css
.single-button {
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #ffffff;
  /* branded shape rendered inside */
}
```

### Marketing

The branded shape appears in marketing as the product's mark — landing-page hero, app icon, social avatar. Consistency between the in-product button and the marketing mark is part of the pattern.

---

## Examples in the wild

- **Om Patel** — multicolor pastel segmented shutter ring; same shape across camera, diary, edit; satellites of recent-sticker thumbnails on diary mode
- **Instagram's shutter** — adjacent precedent
- **AnyList's "+ add"** — adjacent precedent in a non-camera context

---

## Anti-patterns

- **Changing the button's shape per context.** The shape is invariant. Only the meaning changes.
- **Adding a tab bar.** If your product has a Single Button and also a Quiet Tabs row, you don't have a one-verb product — pick one pattern.
- **Generic system-style FAB** (Material's elevated round button). The button is the *brand* — it should not look like any other app's add button.
- **Animating the shape itself** on context change. The surrounding text changes; the shape stays.

---

## Cross-references

- [Pattern #10 Quiet Tabs](10-quiet-tabs.md) — for constellation products instead
- [Pattern #03 Capture Ritual](03-capture-ritual.md) — the most common companion: a Single-Button app's primary verb is usually a capture
- [Pattern #08 Soft Spring](08-soft-spring.md) — the tap-spent fade applies to the button when it commits an action
- [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md) — source analysis
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/11-single-button.md
git commit -m "Add pattern doc: 11 Single Button"
```

---

## Task 17: Pattern #12 — Three Circles

**Files:**
- Create: `docs/patterns/12-three-circles.md`

- [ ] **Step 1: Create the file with the following content**

```markdown
# Pattern 12 · Three Circles · 三つの丸 *mittsu-no-maru*

**Core:** Decision-moment chrome. Three equal-sized round buttons in a horizontal row for confirm / retry / discard.

**Serves principles:** [#3 Capture is a ritual](../principles.md#03-capture-is-a-ritual) · [#5 Forgiving by default](../principles.md#05-forgiving-by-default) · [#8 AI feels like craft, not magic](../principles.md#08-ai-feels-like-craft-not-magic)

**Source:** The strongest cross-reference geometry in both apps. Appears in: KiteSprint apple capture confirmation · Om Patel donut / sandwich / cup cutout reveals · KiteSprint salad detail action triad (trash / dismiss / edit). See [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md).

---

## Spirit

Three round buttons in a row, bottom-anchored, replacing all other chrome during the decision. **Center is bigger** (60pt), the affirmative, filled with the project accent. **Flanks are paper-white** (48pt) with sumi-ink glyphs — never accent-colored.

This means the accent color reads as "the affirmative path" everywhere in the app. Whatever the verbs are — retry / confirm / discard, trash / close / edit, cancel / save / share — the geometry stays the same. The verbs adapt; the *decision shape* doesn't.

The pattern replaces tab bar / single button entirely during the decision. It **never collapses to a dropdown**, **never appears with a fourth option** (that would be a different pattern). Three is the cap because three is the cognitive limit for a ternary decision at a tap.

---

## Across media

### Mobile

Three buttons in a row, bottom-anchored. Center 60pt, flanks 48pt. Gap 16–24pt between buttons. Glyph stroke 1.5–3px. Haptic `.success` on center tap.

### Web

Centered triplet of 56–72pt circles. CSS:

```css
.three-circle.center {
  width: 60px; height: 60px;
  background: var(--accent);
  color: #ffffff;
  box-shadow: 4px 5px 0 rgba(/* accent */ 0.18), 8px 14px 24px rgba(/* accent */ 0.40);
}
.three-circle.flank {
  width: 48px; height: 48px;
  background: #ffffff;
  color: #1a1a1a;
  box-shadow: 3px 4px 0 rgba(72,55,32,0.06), 6px 10px 18px rgba(72,55,32,0.12);
}
```

### Marketing

Rare on marketing surfaces — the pattern is in-product. Possible exception: an interactive demo on a marketing page that walks through a decision flow.

---

## Examples in the wild

- **KiteSprint apple confirmation** — three circles at bottom: ✕ (left), large green ✓ (center), ↻ (right). Same geometry on every capture-confirm flow.
- **Om Patel donut cutout** — crop / ✓ / ✕ triad with purple ✓ in the center
- **Om Patel cup word reveal** — ↻ retry / ✓ confirm / ✕ discard with the same geometry
- **KiteSprint salad detail** — trash / ✕ close / pencil edit; same three-circle row, different verbs

---

## Anti-patterns

- **Two buttons.** That's not Three Circles. Confirm/cancel binary decisions use a different geometry (chip pair, or single button with implicit cancel-via-tap-elsewhere).
- **Four+ buttons.** That's an action sheet, not Three Circles. The pattern caps at three.
- **Collapsing to a dropdown / menu.** The three circles are the decision; never hide them behind a menu.
- **Accent-coloring the flanks.** Only the center is accented. The flanks are paper-white — this is how the accent reads as "affirmative" everywhere in the app.
- **Equal sizes for all three.** The center is bigger. This is intentional — it's not a row of equal options, it's a *recommended path with two alternatives*.

---

## Cross-references

- [Pattern #03 Capture Ritual](03-capture-ritual.md) — the most common parent; Three Circles is what often follows a capture
- [Pattern #05 Subject Lift](05-subject-lift.md) — the AI cutout almost always ends in a Three Circles decision
- [Pattern #10 Quiet Tabs](10-quiet-tabs.md) — the tab bar that Three Circles temporarily replaces during a decision
- [Pattern #11 Single Button](11-single-button.md) — the single button Three Circles temporarily replaces in one-verb products
- [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md) — source analysis
```

- [ ] **Step 2: Commit**

```bash
git add docs/patterns/12-three-circles.md
git commit -m "Add pattern doc: 12 Three Circles"
```

---

## Task 18: Update context index

**Files:**
- Modify: `docs/context/_index.md`

The context index currently points only at the reference materials. Now that the framework docs exist, it should orient the reader: "you are looking at reference material; the framework itself lives in `../`."

- [ ] **Step 1: Read the current content**

Run:
```bash
cat docs/context/_index.md
```

- [ ] **Step 2: Prepend a "where this fits" header**

Use the Edit tool. Find the first heading (probably `# Design-framework context...` or similar) and replace it with:

```markdown
# Reference Context · 参考資料 *sankō shiryō*

> Source materials for the Kinari framework — not the framework itself.

**The framework lives at the repository root.** This directory holds the *reference materials* the framework was developed from: app captures, motion analyses, navigation analyses.

- **[README](../../README.md)** — what Kinari is and how to apply it
- **[Principles](../principles.md)** — the 10 commitments
- **[Visual Language](../visual-language.md)** — typography, color, shadows, photo, backgrounds, iconography, layout, motion
- **[Lineage](../lineage.md)** — honest attribution to the design traditions Kinari consolidates
- **[Pattern Library](../patterns/_index.md)** — 12 named UI metaphors

---

## What's in this directory
```

This replaces the previous opening so the reader is oriented to the framework first.

- [ ] **Step 3: Verify the file still has its original reference content**

Run:
```bash
grep -c 'KiteSprint\|Om Patel\|motion-analysis\|nav-analysis' docs/context/_index.md
```
Expected: ≥4 (each reference doc is still mentioned).

- [ ] **Step 4: Commit**

```bash
git add docs/context/_index.md
git commit -m "Update context index — orient reader to framework first"
```

---

## Task 19: Final verification + cleanup commit

**Files:**
- Verify: all framework files
- Optional create: `CHANGELOG.md`

This task is the cross-document health check — make sure all links resolve, no placeholders slipped through, the framework reads as a cohesive whole.

- [ ] **Step 1: Verify no TBDs / placeholders / stray TODOs**

Run:
```bash
grep -rn 'TBD\|TODO\|FIXME\|XXX\|placeholder' docs/ README.md
```
Expected: no matches in framework docs (matches in `docs/superpowers/specs/` for the spec's intentional Open Questions section are fine — those are explicitly deferred items).

If matches appear in `docs/principles.md`, `docs/visual-language.md`, `docs/lineage.md`, or `docs/patterns/`, fix inline before continuing.

- [ ] **Step 2: Verify all internal links resolve**

Run:
```bash
# Find all relative markdown links and check the target exists
grep -rn '\](\.\./\|\](\./' docs/ README.md | while IFS=: read file line content; do
  echo "$content" | grep -oE '\]\([^)]+\)' | while read link; do
    # extract path from link
    target=$(echo "$link" | sed -E 's/\]\(([^#)]+)(#[^)]*)?\)/\1/')
    # resolve relative to file's directory
    dir=$(dirname "$file")
    full=$(realpath -m "$dir/$target" 2>/dev/null)
    if [ ! -e "$full" ]; then
      echo "BROKEN: $file:$line -> $target"
    fi
  done
done | head -20
```

Expected: no "BROKEN" lines. If any appear, fix the link paths.

- [ ] **Step 3: Verify all 12 pattern files exist**

Run:
```bash
ls docs/patterns/*.md | wc -l
```
Expected: 13 (`_index.md` + 12 pattern files).

```bash
ls docs/patterns/ | sort
```
Expected output:
```
_index.md
01-sticker-primitive.md
02-dot-grid-canvas.md
03-capture-ritual.md
04-diary-spine.md
05-subject-lift.md
06-bilingual-pair.md
07-numeral-display.md
08-soft-spring.md
09-navigation-pill.md
10-quiet-tabs.md
11-single-button.md
12-three-circles.md
```

- [ ] **Step 4: Verify each pattern doc has the required sections**

Run:
```bash
for f in docs/patterns/[0-9]*.md; do
  echo "=== $f ==="
  grep -c '^\*\*Core:\|^\*\*Serves principles:\|^\*\*Source:\|^## Spirit\|^## Across media\|^## Cross-references' "$f"
done
```
Expected: each file shows 6 (one for each required section: Core, Serves principles, Source, Spirit, Across media, Cross-references).

Any file showing fewer than 6 has a missing section — fix before continuing.

- [ ] **Step 5: Verify the principle ↔ pattern cross-references are reciprocal**

For each principle that a pattern claims to serve, the principle's source line should at least be consistent. Spot-check:

Run:
```bash
# Patterns claim "Serves principles: #1 #2" — those principles should exist
grep -h '^\*\*Serves principles:' docs/patterns/[0-9]*.md
```
Expected: every referenced principle number is 1–10. No #11 or #0 etc.

- [ ] **Step 6: Create a v0.1 tag marker (optional CHANGELOG)**

Decide with the user: tag the current commit as v0.1, or skip tagging until the public release.

If tagging:
```bash
git tag -a v0.1 -m "Kinari v0.1 — initial framework: principles, visual language, lineage, 12 seed patterns"
```

If skipping, document the version in a brief CHANGELOG:

```bash
cat > CHANGELOG.md <<'EOF'
# Changelog

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
EOF
git add CHANGELOG.md
```

- [ ] **Step 7: Final status check and commit**

Run:
```bash
git status
git log --oneline
```

Expected status: clean working tree (all 18 tasks committed). Expected log: 18+ commits from this plan, plus the initial spec commit at the root.

If CHANGELOG was added:
```bash
git commit -m "Add CHANGELOG.md for v0.1"
```

---

## Self-review (completed by plan author)

### Spec coverage

- ✅ Principles (10) → Task 2 (full prose) + cross-references throughout pattern docs
- ✅ Visual Language (typography, color, shadows, photo, backgrounds, iconography, layout, motion) → Task 4 (8-step build with append per section)
- ✅ Lineage (three traditions, vocabulary, principle-source map, reading list) → Task 3
- ✅ Pattern Library (12 seed patterns + index + template) → Tasks 5–17
- ✅ Reference context preservation → covered in initial commit (already in repo); reference index updated in Task 18
- ✅ README → Task 1

### Placeholders

- No "TBD" / "TODO" / "placeholder" left in any task's content
- All file paths are exact
- All commit messages are concrete
- All verification commands are runnable

### Type consistency

- Pattern numbering 01–12 used consistently across `_index.md`, individual files, and cross-references in `principles.md` / `visual-language.md`
- All principle numbers reference 1–10 (no #0 or #11)
- All Japanese romaji match across patterns and index (`shīru`, `hōgan`, `utsushi`, `nikki`, `kirinuki`, `heiki`, `sūji`, `tawami`, `annai`, `shizukana tabu`, `hitotsu-botan`, `mittsu-no-maru`)
- File naming convention: `NN-kebab-case-name.md`

### Scope check

- Phase 1 only: documentation. No Figma, no site, no examples. Each deferred phase explicitly named in the spec.
- 18 files (17 created + 1 modified). Single implementation plan.

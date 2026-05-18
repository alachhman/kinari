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

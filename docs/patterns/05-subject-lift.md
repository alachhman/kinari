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

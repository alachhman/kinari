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

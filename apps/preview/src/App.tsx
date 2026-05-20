import {
  Sticker,
  Horizon,
  BilingualPair,
  NumericDisplay,
  PrincipleChip,
  Display,
  Label,
  Body,
  EmptyState,
  AdjustAffordance,
  NavPill,
  QuietTabs,
  SingleButton,
  ThreeCircles,
} from "@kinari/react";
import {
  PaletteExplorer,
  MotionEasingExplorer,
  SoftSpringDemo,
  CaptureRitualDemo,
  SubjectLiftDemo,
  DiarySpineDemo,
} from "@kinari/react/demos";

const navSteps = [
  { href: "#sticker", titleJa: "シール", titleEn: "sticker" },
  { href: "#capture", titleJa: "写し", titleEn: "capture" },
  { href: "#subject-lift", titleJa: "切り抜き", titleEn: "subject lift" },
];

const diaryEntries = [
  { id: "a", sticker: <span>Donut</span>, detail: <span>🍩 Donut · finished it</span> },
  { id: "b", sticker: <span>Iced tea</span>, detail: <span>🧃 Iced tea · refreshing</span> },
  { id: "c", sticker: <span>Forest</span>, detail: <span>🌲 Forest · long walk</span> },
  { id: "d", sticker: <span>Skates</span>, detail: <span>⛸ Roller skates · cruise</span> },
];

export function App() {
  return (
    <div className="preview-page">
      <header className="preview-hero">
        <h1 className="preview-hero-name">Kinari</h1>
        <div className="preview-hero-kanji">生成</div>
        <p className="preview-tagline">A design framework for personal software.</p>
      </header>

      <Horizon mark="・" />

      {/* ─── PRIMITIVES ─────────────────────────────────────────── */}
      <section className="preview-section">
        <div className="preview-section-eyebrow">layer 01</div>
        <h2 className="preview-section-title">Primitives</h2>
        <p className="preview-section-sub">Visual building blocks.</p>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;Sticker&gt;</span>
            <span className="preview-block-desc">die-cut object with weight</span>
          </div>
          <div className="preview-block-body">
            <Sticker>
              <Display as="h3">Hello</Display>
            </Sticker>
            <Sticker lift="floating">
              <Display as="h3">Floating</Display>
            </Sticker>
            <Sticker shadowAccent="moegi">
              <span style={{ color: "var(--moegi)", fontWeight: 700, fontSize: 14 }}>
                moegi shadow
              </span>
            </Sticker>
            <Sticker shadowAccent="shikon">
              <span style={{ color: "var(--shikon)", fontWeight: 700, fontSize: 14 }}>
                shikon shadow
              </span>
            </Sticker>
            <Sticker variant="polaroid" caption="Maine coast · June" photoAspect="4/3">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #8da4b3 0%, #b9c6cd 40%, #d4ddc8 100%)",
                }}
              />
            </Sticker>
          </div>
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;Horizon&gt;</span>
            <span className="preview-block-desc">section divider with center mark</span>
          </div>
          <div className="preview-block-body" style={{ flexDirection: "column", width: "100%" }}>
            <Horizon mark="·" />
            <Horizon mark="原則 · gensoku" />
          </div>
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;BilingualPair&gt;</span>
            <span className="preview-block-desc">two languages, one designed unit</span>
          </div>
          <div className="preview-block-body">
            <BilingualPair primary="原則" secondary="gensoku · principles" size="large" />
            <BilingualPair primary="手本" secondary="tehon · patterns" size="medium" />
            <BilingualPair primary="案内" secondary="annai · nav" size="small" />
          </div>
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;NumericDisplay&gt;</span>
            <span className="preview-block-desc">celebratory numbers in warm signal</span>
          </div>
          <div className="preview-block-body" style={{ gap: 28 }}>
            <NumericDisplay value={94} unit="kcal" />
            <NumericDisplay value={584} unit="kcal" />
            <NumericDisplay value={"1,399"} unit="kcal" />
            <NumericDisplay value={1} unit="Words" />
            <NumericDisplay value={12} font="serif" />
          </div>
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;PrincipleChip&gt;</span>
            <span className="preview-block-desc">accent-tinted cross-reference</span>
          </div>
          <div className="preview-block-body" style={{ gap: 10 }}>
            <PrincipleChip number={1} />
            <PrincipleChip number={2} />
            <PrincipleChip number={4} />
            <PrincipleChip number={8} variant="number-only" />
            <PrincipleChip number={10} />
          </div>
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;TypePair&gt;</span>
            <span className="preview-block-desc">four type roles</span>
          </div>
          <div
            className="preview-block-body"
            style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}
          >
            <Display as="h3">Display · serif 600</Display>
            <Label>LABEL · CHUNKY SANS 800</Label>
            <Body>Body — running prose, 14–16px, comfortable line-height.</Body>
          </div>
        </div>
      </section>

      <Horizon mark="*" />

      {/* ─── NEW IN v0.2 ─────────────────────────────────────── */}
      <section className="preview-section">
        <div className="preview-section-eyebrow">layer 01.5</div>
        <h2 className="preview-section-title">New in v0.2</h2>
        <p className="preview-section-sub">Empty state · Adjust affordance.</p>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;EmptyState&gt;</span>
            <span className="preview-block-desc">kanji + bilingual + accent CTA</span>
          </div>
          <EmptyState
            glyph="空"
            title="Your diary is empty."
            reading="kara · empty"
            body="Nothing to see yet. Capture your first artifact to begin."
            action={{ label: "+ Begin", onClick: () => {} }}
            accent="shikon"
          />
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;AdjustAffordance&gt;</span>
            <span className="preview-block-desc">AI-result recovery pill</span>
          </div>
          <div className="preview-block-body">
            <AdjustAffordance onAdjust={() => {}} />
            <AdjustAffordance onAdjust={() => {}} label="Refine" size="small" />
          </div>
        </div>
      </section>

      <Horizon mark="*" />

      {/* ─── PATTERNS ────────────────────────────────────────── */}
      <section className="preview-section" id="capture">
        <div className="preview-section-eyebrow">layer 02</div>
        <h2 className="preview-section-title">Patterns</h2>
        <p className="preview-section-sub">Working components from the framework&apos;s library.</p>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;NavPill&gt;</span>
            <span className="preview-block-desc">Pattern #09 — prev/next + dot strip</span>
          </div>
          <div className="preview-pattern-stage">
            <NavPill steps={navSteps} current={1} keyboard={false} />
          </div>
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;QuietTabs&gt;</span>
            <span className="preview-block-desc">Pattern #10 — floating icon-only tabs</span>
          </div>
          <div className="preview-pattern-stage">
            <QuietTabs
              active="bowl"
              accent="shikon"
              tabs={[
                { id: "bowl", icon: "🥣", label: "Today" },
                { id: "dial", icon: "⏱", label: "Goals" },
                { id: "trash", icon: "🗑", label: "Trash" },
                { id: "camera", icon: "📷", label: "Capture" },
              ]}
            />
          </div>
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;SingleButton&gt;</span>
            <span className="preview-block-desc">Pattern #11 — one branded shape</span>
          </div>
          <div className="preview-pattern-stage" style={{ position: "relative" }}>
            <SingleButton
              shape={
                <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
                  <circle cx="18" cy="18" r="16" fill="#5B3D6E" />
                </svg>
              }
              size={64}
              onTap={() => {}}
              title="Capture"
              subtitle="add a memory"
            />
          </div>
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;ThreeCircles&gt;</span>
            <span className="preview-block-desc">Pattern #12 — decision triad</span>
          </div>
          <div className="preview-pattern-stage">
            <ThreeCircles
              accent="shikon"
              left={{ icon: "✕", label: "discard", onTap: () => {} }}
              center={{ icon: "✓", label: "confirm", onTap: () => {} }}
              right={{ icon: "↻", label: "retry", onTap: () => {} }}
            />
          </div>
        </div>
      </section>

      <Horizon mark="*" />

      {/* ─── DEMOS ────────────────────────────────────────────── */}
      <section className="preview-section" id="subject-lift">
        <div className="preview-section-eyebrow">layer 03</div>
        <h2 className="preview-section-title">Interactive demos</h2>
        <p className="preview-section-sub">Click around. Replay buttons reset each one.</p>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;PaletteExplorer&gt;</span>
            <span className="preview-block-desc">six 伝統色 swatches</span>
          </div>
          <PaletteExplorer defaultAccent="shikon" />
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;MotionEasingExplorer&gt;</span>
            <span className="preview-block-desc">soft-out vs spring overshoot</span>
          </div>
          <MotionEasingExplorer mode="comparison" />
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;SoftSpringDemo&gt;</span>
            <span className="preview-block-desc">Pattern #08 — cascade order</span>
          </div>
          <SoftSpringDemo scenario="cascade-order" />
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;CaptureRitualDemo&gt;</span>
            <span className="preview-block-desc">Pattern #03 — bracket + bloom + settle</span>
          </div>
          <CaptureRitualDemo />
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;SubjectLiftDemo&gt;</span>
            <span className="preview-block-desc">Pattern #05 — shimmer cutout</span>
          </div>
          <SubjectLiftDemo
            src="https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400&auto=format&fit=crop"
            context="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&auto=format&fit=crop"
          />
        </div>

        <div className="preview-block">
          <div className="preview-block-head">
            <span className="preview-block-name">&lt;DiarySpineDemo&gt;</span>
            <span className="preview-block-desc">Pattern #04 — focus drill-in</span>
          </div>
          <DiarySpineDemo entries={diaryEntries} />
        </div>
      </section>

      <Horizon mark="生成" />

      <footer
        style={{
          textAlign: "center",
          marginTop: 40,
          color: "var(--sumi-mute)",
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Kinari library v0.1 · this is a preview, not the public site
      </footer>
    </div>
  );
}

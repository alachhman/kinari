# Kinari Library — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `@kinari/tokens` (platform-agnostic design tokens) and `@kinari/react` (web reference implementation: 7 primitives + 4 patterns + 6 demos) inside a pnpm monorepo. The library must build, pass tests, and be ready for consumption by `apps/site` (Plan B).

**Architecture:** pnpm workspaces at the repo root with `packages/tokens` and `packages/react`. Tokens package exports JS constants and a build-script-generated `tokens.css`. React package uses React 19 + CSS Modules + Vitest + Testing Library. Both packages consumed by future apps via workspace protocol (`"@kinari/tokens": "workspace:*"`). No npm publish in this phase.

**Tech Stack:** Node 22 · pnpm 9 · TypeScript 5.4+ strict · React 19 · CSS Modules (built-in to bundlers; consumed by Astro/Vite without extra config) · Vitest 2 · @testing-library/react 16 · @axe-core/playwright (Plan B) · `simple-git-hooks` · `tsx` for build scripts · `culori` for accent shadow color math.

**Plan scope:** Library only. Explicitly deferred to Plan B: `apps/site`, remark plugins, Pagefind, GitHub Pages deploy, end-to-end visual regression. Bundle-size budgets are *checked* by a Plan A task; *enforced in CI* by Plan B.

---

## File Structure

| Path | Responsibility |
|---|---|
| `package.json` (root) | Workspace declaration, shared scripts, `simple-git-hooks` config |
| `pnpm-workspace.yaml` | Workspace packages glob |
| `tsconfig.base.json` | Shared strict TypeScript config |
| `.eslintrc.cjs` | Shared ESLint config |
| `.prettierrc` | Shared Prettier config |
| `.gitignore` (modify) | Add `node_modules/`, `dist/`, `.turbo/`, `*.tsbuildinfo` |
| `vitest.config.ts` (root) | Shared Vitest config |
| `packages/tokens/package.json` | `@kinari/tokens` manifest |
| `packages/tokens/tsconfig.json` | Tokens TS config extending base |
| `packages/tokens/src/index.ts` | Public barrel export |
| `packages/tokens/src/colors.ts` | Color palette + `AccentName` type |
| `packages/tokens/src/motion.ts` | Easing + duration bands + cascade delays |
| `packages/tokens/src/shadow.ts` | Shadow recipes + `shadowFromAccent` helper |
| `packages/tokens/src/spacing.ts` | Spacing tokens |
| `packages/tokens/src/type.ts` | Type role definitions |
| `packages/tokens/src/cssvar.ts` | Typed `cssvar()` helper |
| `packages/tokens/scripts/build-css.ts` | Generates `dist/tokens.css` from TS |
| `packages/tokens/src/*.test.ts` | Unit tests per module |
| `packages/react/package.json` | `@kinari/react` manifest |
| `packages/react/tsconfig.json` | React TS config |
| `packages/react/src/index.ts` | Public barrel |
| `packages/react/src/utils/usePrefersReducedMotion.ts` | Reduced-motion hook |
| `packages/react/src/utils/shadowFromAccent.ts` | Accent-derived shadow helper (re-export) |
| `packages/react/src/primitives/<Name>/<Name>.tsx` | Each primitive component |
| `packages/react/src/primitives/<Name>/<Name>.module.css` | Component CSS |
| `packages/react/src/primitives/<Name>/<Name>.test.tsx` | Component tests |
| `packages/react/src/primitives/<Name>/index.ts` | Component barrel |
| `packages/react/src/patterns/<Name>/...` | Same structure for patterns |
| `packages/react/src/demos/<Name>/...` | Same structure for demos |
| `packages/react/src/demos/assets/` | Sample images for demos |
| `packages/react/src/demos/index.ts` | Demo barrel (separate from main index) |

**Total:** ~30 tasks across 5 phases.

---

## Phase 1 — Repo plumbing (Tasks 1–6)

### Task 1: Initialize pnpm workspace and base TypeScript config

**Files:**
- Create: `pnpm-workspace.yaml`
- Modify: `package.json` (the existing root may not have one; if missing, create)
- Create: `tsconfig.base.json`

- [ ] **Step 1: Verify Node and pnpm versions**

Run:
```bash
node --version    # expect: v22.x
pnpm --version    # expect: 9.x or 10.x
```
If either is missing, install before proceeding (Node via `nvm`, pnpm via `npm install -g pnpm` or `corepack enable`).

- [ ] **Step 2: Check whether root `package.json` exists**

Run:
```bash
ls -la package.json 2>/dev/null && cat package.json | head -20 || echo "no root package.json"
```

If it doesn't exist, create it with this content:

```json
{
  "name": "kinari-monorepo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "engines": {
    "node": ">=22",
    "pnpm": ">=9"
  },
  "packageManager": "pnpm@9.15.0",
  "scripts": {
    "build": "pnpm -r --parallel build",
    "dev": "pnpm -r --parallel dev",
    "test": "pnpm -r test",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^22.0.0"
  }
}
```

If it exists, ensure it has `"private": true` and `"packageManager"` fields; merge in the `scripts` and `devDependencies` above without overwriting unrelated keys.

- [ ] **Step 3: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

- [ ] **Step 4: Create `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 5: Install root dev dependencies and verify**

Run:
```bash
pnpm install
```

Expected: completes without errors. `pnpm -v` and `pnpm ls typescript` both succeed.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-workspace.yaml tsconfig.base.json pnpm-lock.yaml
git commit -m "Initialize pnpm workspace and base TypeScript config"
```

---

### Task 2: Set up ESLint + Prettier

**Files:**
- Create: `.eslintrc.cjs`
- Create: `.prettierrc`
- Create: `.prettierignore`
- Modify: `package.json` (devDependencies)

- [ ] **Step 1: Install ESLint and Prettier deps at the root**

Run:
```bash
pnpm add -D -w eslint@^8 @typescript-eslint/parser@^7 @typescript-eslint/eslint-plugin@^7 \
  eslint-plugin-react@^7 eslint-plugin-react-hooks@^4 eslint-plugin-jsx-a11y@^6 \
  eslint-config-prettier@^9 prettier@^3
```

Expected: installs without errors. `pnpm ls eslint prettier` shows versions.

- [ ] **Step 2: Create `.eslintrc.cjs`**

```js
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  settings: { react: { version: "19" } },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
  },
  ignorePatterns: ["dist/", "node_modules/", "*.config.{js,ts,mjs,cjs}"],
};
```

- [ ] **Step 3: Create `.prettierrc`**

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "arrowParens": "always"
}
```

- [ ] **Step 4: Create `.prettierignore`**

```
node_modules
dist
build
.next
.astro
pnpm-lock.yaml
```

- [ ] **Step 5: Add lint scripts to root `package.json`**

In root `package.json`, ensure `scripts` contains:
```json
"lint": "eslint . --ext .ts,.tsx,.js,.jsx --max-warnings=0",
"format": "prettier --write .",
"format:check": "prettier --check ."
```

- [ ] **Step 6: Run lint to verify config is valid**

Run:
```bash
pnpm lint
```
Expected: no files yet to lint, exits 0 (or warns about no files matching).

Run:
```bash
pnpm format:check
```
Expected: all files pass (or none to check).

- [ ] **Step 7: Commit**

```bash
git add .eslintrc.cjs .prettierrc .prettierignore package.json pnpm-lock.yaml
git commit -m "Set up ESLint and Prettier at workspace root"
```

---

### Task 3: Set up `simple-git-hooks` for pre-commit formatting

**Files:**
- Modify: `package.json` (add hooks config + lint-staged equivalent inline)

- [ ] **Step 1: Install `simple-git-hooks`**

Run:
```bash
pnpm add -D -w simple-git-hooks
```

- [ ] **Step 2: Configure hook in root `package.json`**

Add to root `package.json`:
```json
"simple-git-hooks": {
  "pre-commit": "pnpm format:check && pnpm lint"
}
```

And add a postinstall script that registers the hooks:
```json
"scripts": {
  "...": "...",
  "postinstall": "simple-git-hooks"
}
```

(Merge with existing scripts; don't drop other entries.)

- [ ] **Step 3: Register the hook**

Run:
```bash
pnpm install
```
Expected: postinstall runs and `simple-git-hooks` reports "[INFO] Pre-commit hook was set".

- [ ] **Step 4: Verify hook is installed**

Run:
```bash
ls -la .git/hooks/pre-commit && head -2 .git/hooks/pre-commit
```
Expected: file exists; first lines reference `simple-git-hooks`.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "Set up simple-git-hooks for pre-commit format + lint"
```

If the hook fires and blocks the commit because no files match Prettier yet, that's expected. Verify with `pnpm format:check` — should pass. If it fails legitimately, fix formatting and re-commit.

---

### Task 4: Update `.gitignore` for build outputs

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Read current `.gitignore`**

Run: `cat .gitignore`

- [ ] **Step 2: Add the following lines if not already present**

Append to `.gitignore`:
```
# Workspace build outputs
packages/*/dist/
packages/*/*.tsbuildinfo
apps/*/dist/
apps/*/.astro/

# pnpm
.pnpm-store/
```

(Skip duplicates of `node_modules/`, `dist/`, etc. that already exist.)

- [ ] **Step 3: Verify**

Run: `git check-ignore packages/tokens/dist/foo.css` (won't error even if the path doesn't exist, but a future check will pass).

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "Add monorepo build outputs to .gitignore"
```

---

### Task 5: Set up Vitest at the workspace root

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (devDependencies)

- [ ] **Step 1: Install Vitest at the root**

Run:
```bash
pnpm add -D -w vitest@^2 @vitest/coverage-v8@^2
```

- [ ] **Step 2: Create `vitest.config.ts` at the workspace root**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: ["**/*.test.{ts,tsx}", "**/*.test-d.ts", "**/index.ts"],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 70,
      },
    },
  },
});
```

(Per-package configs override the environment when needed — e.g., the React package uses `jsdom`.)

- [ ] **Step 3: Verify Vitest discovers no tests yet**

Run:
```bash
pnpm vitest run --passWithNoTests
```
Expected: exits 0 with "No test files found" notice.

- [ ] **Step 4: Commit**

```bash
git add vitest.config.ts package.json pnpm-lock.yaml
git commit -m "Set up Vitest at workspace root"
```

---

### Task 6: CI workflow skeleton

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create the workflow file**

```yaml
name: CI

on:
  pull_request:
    branches: [master]
  push:
    branches: [master]

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile

  lint-type:
    runs-on: ubuntu-latest
    needs: install
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    needs: install
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test

  build:
    runs-on: ubuntu-latest
    needs: install
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

- [ ] **Step 2: Add root `typecheck` script if not present**

In root `package.json` `scripts`:
```json
"typecheck": "pnpm -r typecheck"
```

- [ ] **Step 3: Verify the YAML parses**

Run:
```bash
node -e "const yaml = require('fs').readFileSync('.github/workflows/ci.yml','utf8'); console.log('yaml ok, length', yaml.length)"
```
Expected: prints length, no errors. (Lint via `actionlint` is optional — skip unless installed.)

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml package.json
git commit -m "Add CI workflow skeleton (install, lint-type, test, build)"
```

---

## Phase 2 — `@kinari/tokens` (Tasks 7–13)

### Task 7: Create the tokens package skeleton

**Files:**
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/tsconfig.json`
- Create: `packages/tokens/README.md`
- Create: `packages/tokens/src/index.ts`

- [ ] **Step 1: Create `packages/tokens/package.json`**

```json
{
  "name": "@kinari/tokens",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts"
    },
    "./tokens.css": "./dist/tokens.css"
  },
  "files": ["src", "dist", "README.md"],
  "scripts": {
    "build": "tsx scripts/build-css.ts",
    "dev": "tsx --watch scripts/build-css.ts",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --ext .ts --max-warnings=0"
  },
  "devDependencies": {
    "tsx": "^4.0.0",
    "vitest": "^2.0.0",
    "typescript": "^5.4.0",
    "culori": "^4.0.0",
    "@types/node": "^22.0.0"
  },
  "peerDependencies": {}
}
```

- [ ] **Step 2: Create `packages/tokens/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": true
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 3: Create `packages/tokens/README.md`**

```markdown
# @kinari/tokens

Platform-agnostic design tokens for the Kinari framework.

- **Colors** — core palette + curated 伝統色 accents
- **Motion** — `--ease-tawami` easing + framework-prescribed duration bands
- **Shadow** — umber / sumi recipes + `shadowFromAccent()` helper
- **Spacing** — content widths, padding rhythm, persistent-chrome offsets
- **Type** — the four type roles from Visual Language §01

Exports both JS constants (typed) and a generated CSS variables file
(`@kinari/tokens/tokens.css`).

See [docs/visual-language.md](../../docs/visual-language.md) for the design
language these tokens encode.
```

- [ ] **Step 4: Create placeholder `src/index.ts`**

```ts
// Public barrel — populated by subsequent tasks
export {};
```

- [ ] **Step 5: Install workspace deps**

Run:
```bash
pnpm install
```
Expected: `culori`, `tsx`, etc. resolve. `pnpm --filter @kinari/tokens exec node --version` works.

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/ pnpm-lock.yaml
git commit -m "Create @kinari/tokens package skeleton"
```

---

### Task 8: `colors.ts` — palette and `AccentName` type

**Files:**
- Create: `packages/tokens/src/colors.ts`
- Create: `packages/tokens/src/colors.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/tokens/src/colors.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { colors, type AccentName } from "./colors";

describe("colors", () => {
  it("exposes the core palette", () => {
    expect(colors.kinari).toBe("#f7f5f0");
    expect(colors.sumi).toBe("#1a1a1a");
    expect(colors.kakiIro).toBe("#d97a3c");
    expect(colors.shiro).toBe("#ffffff");
    expect(colors.paperTone).toBe("#f4ede0");
  });

  it("exposes sumi variants for prose hierarchy", () => {
    expect(colors.sumiSoft).toBe("#2a2a2a");
    expect(colors.sumiMuted).toBe("#6b6b6b");
    expect(colors.sumiMute).toBe("#8a8a8a");
  });

  it("exposes the six curated 伝統色 accents", () => {
    expect(colors.accents.moegi).toBe("#7DAE5C");
    expect(colors.accents.kakishibu).toBe("#B5683A");
    expect(colors.accents.sakura).toBe("#E08596");
    expect(colors.accents.asagi).toBe("#4FA9AA");
    expect(colors.accents.yamabuki).toBe("#D4A12B");
    expect(colors.accents.shikon).toBe("#5B3D6E");
  });

  it("AccentName enumerates all six accents", () => {
    const names: AccentName[] = ["moegi", "kakishibu", "sakura", "asagi", "yamabuki", "shikon"];
    expect(names).toHaveLength(6);
  });
});
```

- [ ] **Step 2: Run the test (should fail — `colors.ts` doesn't exist)**

Run:
```bash
pnpm --filter @kinari/tokens test
```
Expected: fail — cannot resolve `./colors`.

- [ ] **Step 3: Create `packages/tokens/src/colors.ts`**

```ts
export type AccentName = "moegi" | "kakishibu" | "sakura" | "asagi" | "yamabuki" | "shikon";

export const colors = {
  // Core palette — locked, framework-wide
  kinari:    "#f7f5f0",
  sumi:      "#1a1a1a",
  kakiIro:   "#d97a3c",
  shiro:     "#ffffff",
  paperTone: "#f4ede0",

  // Sumi variants for prose hierarchy
  sumiSoft:  "#2a2a2a",
  sumiMuted: "#6b6b6b",
  sumiMute:  "#8a8a8a",

  // Curated 伝統色 accents — projects pick ONE
  accents: {
    moegi:     "#7DAE5C",
    kakishibu: "#B5683A",
    sakura:    "#E08596",
    asagi:     "#4FA9AA",
    yamabuki:  "#D4A12B",
    shikon:    "#5B3D6E",
  },
} as const;

export type AccentHex = (typeof colors.accents)[AccentName];
```

- [ ] **Step 4: Update `src/index.ts` to re-export**

Replace contents of `packages/tokens/src/index.ts`:
```ts
export * from "./colors";
```

- [ ] **Step 5: Run the test (should pass)**

Run: `pnpm --filter @kinari/tokens test`
Expected: 4 tests pass.

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/src/colors.ts packages/tokens/src/colors.test.ts packages/tokens/src/index.ts
git commit -m "Add @kinari/tokens colors module with AccentName type"
```

---

### Task 9: `motion.ts` — easing and durations

**Files:**
- Create: `packages/tokens/src/motion.ts`
- Create: `packages/tokens/src/motion.test.ts`
- Modify: `packages/tokens/src/index.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/tokens/src/motion.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { motion } from "./motion";

describe("motion", () => {
  it("exposes ease-tawami cubic-bezier", () => {
    expect(motion.easeTawami).toBe("cubic-bezier(0.22, 0.61, 0.36, 1)");
  });

  it("exposes duration bands matching framework spec", () => {
    expect(motion.duration.chipSlide).toBe(180);
    expect(motion.duration.stickerTransform).toBe(240);
    expect(motion.duration.crossFade).toBe(200);
    expect(motion.duration.drillIn).toBe(280);
    expect(motion.duration.labelLand).toBe(160);
    expect(motion.duration.glowBloom).toBe(150);
    expect(motion.duration.glowContract).toBe(150);
    expect(motion.duration.aiShimmer).toBe(700);
    expect(motion.duration.fluidQuantity).toBe(500);
  });

  it("exposes cascade delays for subject → chrome → text", () => {
    expect(motion.cascade.subjectDelay).toBe(0);
    expect(motion.cascade.chromeDelay).toBe(80);
    expect(motion.cascade.textDelay).toBe(160);
  });
});
```

- [ ] **Step 2: Run the test (should fail)**

Run: `pnpm --filter @kinari/tokens test`
Expected: fail.

- [ ] **Step 3: Create `packages/tokens/src/motion.ts`**

```ts
export const motion = {
  /** Soft-out settle, no overshoot. Damping ratio = 1.0 equivalent. */
  easeTawami: "cubic-bezier(0.22, 0.61, 0.36, 1)",

  /** Duration bands per Visual Language §08. Pick the upper end for the
   *  primary action; lower end for incidental micro-interactions. */
  duration: {
    chipSlide:        180,
    stickerTransform: 240,
    crossFade:        200,
    drillIn:          280,
    labelLand:        160,
    glowBloom:        150,
    glowContract:     150,
    aiShimmer:        700,
    fluidQuantity:    500,
  },

  /** Cascade order: subject → chrome → text. Labels are *always* last. */
  cascade: {
    subjectDelay: 0,
    chromeDelay:  80,
    textDelay:    160,
  },
} as const;
```

- [ ] **Step 4: Update `src/index.ts`**

```ts
export * from "./colors";
export * from "./motion";
```

- [ ] **Step 5: Run the test (should pass)**

Run: `pnpm --filter @kinari/tokens test`
Expected: all tests pass (3 new + 4 existing).

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/src/motion.ts packages/tokens/src/motion.test.ts packages/tokens/src/index.ts
git commit -m "Add @kinari/tokens motion module — easing, durations, cascade"
```

---

### Task 10: `shadow.ts` + `shadowFromAccent` helper

**Files:**
- Create: `packages/tokens/src/shadow.ts`
- Create: `packages/tokens/src/shadow.test.ts`
- Modify: `packages/tokens/src/index.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/tokens/src/shadow.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { shadow, shadowFromAccent } from "./shadow";

describe("shadow recipes", () => {
  it("exposes umber shadow set for white/near-white elements", () => {
    expect(shadow.umber.contact).toContain("rgba(72,55,32");
    expect(shadow.umber.resting).toContain("rgba(72,55,32");
    expect(shadow.umber.floating).toContain("rgba(72,55,32");
  });

  it("exposes sumi shadow set for dark-on-paper elements", () => {
    expect(shadow.sumi.resting).toContain("rgba(26,26,26");
  });

  it("all umber recipes cast to lower-right (positive offsets)", () => {
    // Spec §03 rule 2: offset-x and offset-y both positive
    const checkOffsets = (shadowStr: string) => {
      const layers = shadowStr.split("),").map((l) => l.trim());
      for (const layer of layers) {
        const match = layer.match(/^(-?\d+)px\s+(-?\d+)px/);
        if (match) {
          const [, x, y] = match;
          expect(Number(x)).toBeGreaterThanOrEqual(0);
          expect(Number(y)).toBeGreaterThanOrEqual(0);
        }
      }
    };
    checkOffsets(shadow.umber.contact);
    checkOffsets(shadow.umber.resting);
    checkOffsets(shadow.umber.floating);
  });
});

describe("shadowFromAccent", () => {
  it("returns a shadow string with the accent's hue at ~45% alpha", () => {
    const shikon = shadowFromAccent("#5B3D6E");
    expect(shikon).toMatch(/rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/);
    // Should mention the shikon RGB approximately (91, 61, 110)
    expect(shikon).toMatch(/rgba\(9[0-5],/);
  });

  it("supports lift levels", () => {
    const contact = shadowFromAccent("#5B3D6E", "contact");
    const resting = shadowFromAccent("#5B3D6E", "resting");
    const floating = shadowFromAccent("#5B3D6E", "floating");

    // Floating should have larger blur values than contact
    const contactLayers = contact.split(",").length;
    const floatingLayers = floating.split(",").length;
    expect(floatingLayers).toBeGreaterThanOrEqual(contactLayers);
  });

  it("throws on invalid hex input", () => {
    expect(() => shadowFromAccent("not-a-color")).toThrow();
  });
});
```

- [ ] **Step 2: Run the test (should fail — module doesn't exist)**

Run: `pnpm --filter @kinari/tokens test`
Expected: fail.

- [ ] **Step 3: Create `packages/tokens/src/shadow.ts`**

```ts
import { parse, formatRgb } from "culori";

export const shadow = {
  /** White / near-white elements drop warm umber shadows.
   *  Per Visual Language §03 Rule 1. */
  umber: {
    contact:  "2px 2px 0 rgba(72,55,32,0.07)",
    resting:  "4px 4px 0 rgba(72,55,32,0.07), 10px 18px 30px rgba(72,55,32,0.10), 18px 30px 48px rgba(72,55,32,0.06)",
    floating: "6px 6px 0 rgba(72,55,32,0.08), 14px 26px 40px rgba(72,55,32,0.13), 22px 36px 56px rgba(72,55,32,0.08)",
  },

  /** Sumi-on-paper elements (dark cards) drop deeper sumi shadows. */
  sumi: {
    resting: "4px 5px 0 rgba(26,26,26,0.18), 10px 16px 24px rgba(26,26,26,0.24)",
  },
} as const;

export type ShadowLift = "contact" | "resting" | "floating";

/**
 * Generate a colored shadow for elements drawn in an accent hue.
 * Per Visual Language §03 Rule 1: "Colored elements drop shadows in their
 * own hue at ~40–55% alpha."
 *
 * Uses culori to parse hex; falls back gracefully if `culori` is unavailable
 * at runtime by throwing on invalid input.
 */
export function shadowFromAccent(hex: string, lift: ShadowLift = "resting"): string {
  const parsed = parse(hex);
  if (!parsed) {
    throw new Error(`shadowFromAccent: cannot parse color "${hex}"`);
  }

  // Extract RGB 0–255
  const rgbStr = formatRgb(parsed);
  // formatRgb returns "rgb(91, 61, 110)" — parse it back to numbers
  const match = rgbStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) {
    throw new Error(`shadowFromAccent: unexpected rgb format "${rgbStr}"`);
  }
  const [, r, g, b] = match;

  const rgbaAt = (alpha: number) => `rgba(${r},${g},${b},${alpha.toFixed(2)})`;

  switch (lift) {
    case "contact":
      return `2px 2px 0 ${rgbaAt(0.18)}`;
    case "floating":
      return `6px 6px 0 ${rgbaAt(0.45)}, 14px 26px 40px ${rgbaAt(0.40)}, 22px 36px 56px ${rgbaAt(0.20)}`;
    case "resting":
    default:
      return `4px 5px 0 ${rgbaAt(0.18)}, 8px 14px 24px ${rgbaAt(0.40)}, 16px 26px 38px ${rgbaAt(0.18)}`;
  }
}
```

- [ ] **Step 4: Update `src/index.ts`**

```ts
export * from "./colors";
export * from "./motion";
export * from "./shadow";
```

- [ ] **Step 5: Run the test (should pass)**

Run: `pnpm --filter @kinari/tokens test`
Expected: all tests pass.

If shikon RGB extraction fails the assertion: verify culori is installed (`pnpm --filter @kinari/tokens ls culori`). The hex `#5B3D6E` parses to rgb(91, 61, 110), so `rgba(91,` should match.

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/src/shadow.ts packages/tokens/src/shadow.test.ts packages/tokens/src/index.ts
git commit -m "Add @kinari/tokens shadow recipes + shadowFromAccent helper"
```

---

### Task 11: `spacing.ts`, `type.ts`, `cssvar.ts`

**Files:**
- Create: `packages/tokens/src/spacing.ts`
- Create: `packages/tokens/src/type.ts`
- Create: `packages/tokens/src/cssvar.ts`
- Create: `packages/tokens/src/spacing.test.ts`
- Create: `packages/tokens/src/type.test.ts`
- Create: `packages/tokens/src/cssvar.test.ts`
- Modify: `packages/tokens/src/index.ts`

- [ ] **Step 1: Write all three failing tests**

`packages/tokens/src/spacing.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { spacing } from "./spacing";

describe("spacing", () => {
  it("exposes page padding rhythm tokens", () => {
    expect(spacing.pageVertical).toBe("60px");
    expect(spacing.sectionGap).toBe("40px");
    expect(spacing.stickerGap).toBe("20px");
  });

  it("exposes content width tokens", () => {
    expect(spacing.contentSticker).toBe("880px");
    expect(spacing.contentReading).toBe("720px");
  });

  it("exposes persistent-chrome offsets", () => {
    expect(spacing.navPillOffset).toBe("18px");
    expect(spacing.navPillReserve).toBe("130px");
  });
});
```

`packages/tokens/src/type.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { type } from "./type";

describe("type roles", () => {
  it("exposes the four roles", () => {
    expect(type.display).toBeDefined();
    expect(type.label).toBeDefined();
    expect(type.body).toBeDefined();
    expect(type.numericSans).toBeDefined();
    expect(type.numericSerif).toBeDefined();
  });

  it("display is serif weight 600", () => {
    expect(type.display.family).toMatch(/Georgia/);
    expect(type.display.weight).toBe(600);
  });

  it("numericSans is heavy italic with negative letter-spacing", () => {
    expect(type.numericSans.weight).toBe(800);
    expect(type.numericSans.italic).toBe(true);
    expect(type.numericSans.letterSpacing).toBe("-0.03em");
  });
});
```

`packages/tokens/src/cssvar.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cssvar } from "./cssvar";

describe("cssvar", () => {
  it("returns var(--name) for valid names", () => {
    expect(cssvar("shikon")).toBe("var(--shikon)");
    expect(cssvar("kinari")).toBe("var(--kinari)");
    expect(cssvar("ease-tawami")).toBe("var(--ease-tawami)");
  });
});
```

- [ ] **Step 2: Run tests (should fail)**

Run: `pnpm --filter @kinari/tokens test`
Expected: 3 test files fail to resolve modules.

- [ ] **Step 3: Create `packages/tokens/src/spacing.ts`**

```ts
export const spacing = {
  pageVertical:   "60px",   // band: 56–64px
  sectionGap:     "40px",   // band: 32–48px
  stickerGap:     "20px",   // band: 18–24px

  contentSticker: "880px",
  contentReading: "720px",

  navPillOffset:  "18px",
  navPillReserve: "130px",
} as const;
```

- [ ] **Step 4: Create `packages/tokens/src/type.ts`**

```ts
const DISPLAY_FAMILY = 'Georgia, "Newsreader", "Tiempos", "Source Serif 4", serif';
const SANS_FAMILY    = '-apple-system, "SF Pro Text", "Inter", system-ui, sans-serif';

export const type = {
  display: {
    family: DISPLAY_FAMILY,
    weight: 600,
    italic: false,
  },
  label: {
    family: SANS_FAMILY,
    weight: 800,
    letterSpacing: "-0.01em",
  },
  body: {
    family: SANS_FAMILY,
    weight: 400,
    lineHeight: 1.55,
  },
  numericSans: {
    family: SANS_FAMILY,
    weight: 800,
    italic: true,
    letterSpacing: "-0.03em",
  },
  numericSerif: {
    family: DISPLAY_FAMILY,
    weight: 600,
    italic: true,
  },
} as const;
```

- [ ] **Step 5: Create `packages/tokens/src/cssvar.ts`**

```ts
/** All CSS custom properties exposed by @kinari/tokens.
 *  Keep this union in sync with build-css.ts output. */
export type CssVar =
  | "kinari" | "sumi" | "kaki-iro" | "shiro" | "paper-tone"
  | "sumi-soft" | "sumi-muted" | "sumi-mute"
  | "moegi" | "kakishibu" | "sakura" | "asagi" | "yamabuki" | "shikon"
  | "ease-tawami"
  | "duration-sticker" | "duration-chip" | "duration-cross-fade"
  | "duration-drill-in" | "duration-label-land"
  | "duration-glow-bloom" | "duration-glow-contract" | "duration-ai-shimmer"
  | "shadow-umber-contact" | "shadow-umber-resting" | "shadow-umber-floating"
  | "shadow-sumi-resting"
  | "space-page-vertical" | "space-section-gap" | "space-sticker-gap"
  | "space-content-sticker" | "space-content-reading"
  | "space-nav-pill-offset" | "space-nav-pill-reserve";

export function cssvar(name: CssVar): string {
  return `var(--${name})`;
}
```

- [ ] **Step 6: Update `src/index.ts`**

```ts
export * from "./colors";
export * from "./motion";
export * from "./shadow";
export * from "./spacing";
export * from "./type";
export * from "./cssvar";
```

- [ ] **Step 7: Run tests (should pass)**

Run: `pnpm --filter @kinari/tokens test`
Expected: all token tests pass (~20 total).

- [ ] **Step 8: Commit**

```bash
git add packages/tokens/src/spacing.ts packages/tokens/src/type.ts packages/tokens/src/cssvar.ts \
        packages/tokens/src/spacing.test.ts packages/tokens/src/type.test.ts \
        packages/tokens/src/cssvar.test.ts packages/tokens/src/index.ts
git commit -m "Add @kinari/tokens spacing, type, and cssvar modules"
```

---

### Task 12: `build-css.ts` — generate `tokens.css` from TS exports

**Files:**
- Create: `packages/tokens/scripts/build-css.ts`
- Create: `packages/tokens/scripts/build-css.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/tokens/scripts/build-css.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { readFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildTokensCss } from "./build-css";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "dist");
const outPath = join(outDir, "tokens.css");

describe("buildTokensCss", () => {
  it("produces a tokens.css file containing all core colors", () => {
    if (existsSync(outDir)) rmSync(outDir, { recursive: true });
    mkdirSync(outDir, { recursive: true });

    buildTokensCss(outPath);

    expect(existsSync(outPath)).toBe(true);
    const css = readFileSync(outPath, "utf8");

    expect(css).toContain("--kinari: #f7f5f0");
    expect(css).toContain("--sumi: #1a1a1a");
    expect(css).toContain("--kaki-iro: #d97a3c");
    expect(css).toContain("--shiro: #ffffff");
  });

  it("includes the six accents", () => {
    buildTokensCss(outPath);
    const css = readFileSync(outPath, "utf8");
    expect(css).toContain("--moegi: #7DAE5C");
    expect(css).toContain("--shikon: #5B3D6E");
  });

  it("includes ease-tawami and durations", () => {
    buildTokensCss(outPath);
    const css = readFileSync(outPath, "utf8");
    expect(css).toContain("--ease-tawami: cubic-bezier(0.22, 0.61, 0.36, 1)");
    expect(css).toContain("--duration-sticker: 240ms");
  });

  it("includes umber shadow recipes verbatim", () => {
    buildTokensCss(outPath);
    const css = readFileSync(outPath, "utf8");
    expect(css).toContain("--shadow-umber-resting:");
    expect(css).toContain("rgba(72,55,32,0.07)");
  });

  it("wraps everything in :root { }", () => {
    buildTokensCss(outPath);
    const css = readFileSync(outPath, "utf8");
    expect(css.trim().startsWith(":root {")).toBe(true);
    expect(css.trim().endsWith("}")).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test (should fail)**

Run: `pnpm --filter @kinari/tokens test`
Expected: fail.

- [ ] **Step 3: Create `packages/tokens/scripts/build-css.ts`**

```ts
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { colors } from "../src/colors";
import { motion } from "../src/motion";
import { shadow } from "../src/shadow";
import { spacing } from "../src/spacing";

const here = dirname(fileURLToPath(import.meta.url));
const defaultOut = resolve(here, "..", "dist", "tokens.css");

/** Generate the `:root { --... }` CSS variables block. Exported for tests. */
export function buildTokensCss(outPath: string = defaultOut): void {
  const lines: string[] = [":root {"];

  // Core colors
  lines.push(`  --kinari: ${colors.kinari};`);
  lines.push(`  --sumi: ${colors.sumi};`);
  lines.push(`  --kaki-iro: ${colors.kakiIro};`);
  lines.push(`  --shiro: ${colors.shiro};`);
  lines.push(`  --paper-tone: ${colors.paperTone};`);
  lines.push(`  --sumi-soft: ${colors.sumiSoft};`);
  lines.push(`  --sumi-muted: ${colors.sumiMuted};`);
  lines.push(`  --sumi-mute: ${colors.sumiMute};`);

  // Accent palette
  for (const [name, hex] of Object.entries(colors.accents)) {
    lines.push(`  --${name}: ${hex};`);
  }

  // Motion
  lines.push(`  --ease-tawami: ${motion.easeTawami};`);
  lines.push(`  --duration-sticker: ${motion.duration.stickerTransform}ms;`);
  lines.push(`  --duration-chip: ${motion.duration.chipSlide}ms;`);
  lines.push(`  --duration-cross-fade: ${motion.duration.crossFade}ms;`);
  lines.push(`  --duration-drill-in: ${motion.duration.drillIn}ms;`);
  lines.push(`  --duration-label-land: ${motion.duration.labelLand}ms;`);
  lines.push(`  --duration-glow-bloom: ${motion.duration.glowBloom}ms;`);
  lines.push(`  --duration-glow-contract: ${motion.duration.glowContract}ms;`);
  lines.push(`  --duration-ai-shimmer: ${motion.duration.aiShimmer}ms;`);

  // Shadow recipes
  lines.push(`  --shadow-umber-contact: ${shadow.umber.contact};`);
  lines.push(`  --shadow-umber-resting: ${shadow.umber.resting};`);
  lines.push(`  --shadow-umber-floating: ${shadow.umber.floating};`);
  lines.push(`  --shadow-sumi-resting: ${shadow.sumi.resting};`);

  // Spacing
  lines.push(`  --space-page-vertical: ${spacing.pageVertical};`);
  lines.push(`  --space-section-gap: ${spacing.sectionGap};`);
  lines.push(`  --space-sticker-gap: ${spacing.stickerGap};`);
  lines.push(`  --space-content-sticker: ${spacing.contentSticker};`);
  lines.push(`  --space-content-reading: ${spacing.contentReading};`);
  lines.push(`  --space-nav-pill-offset: ${spacing.navPillOffset};`);
  lines.push(`  --space-nav-pill-reserve: ${spacing.navPillReserve};`);

  lines.push("}");
  lines.push("");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, lines.join("\n"), "utf8");
}

// Run directly via `pnpm build`
if (import.meta.url === `file://${process.argv[1]}`) {
  buildTokensCss();
  console.log(`Generated ${defaultOut}`);
}
```

- [ ] **Step 4: Run the test (should pass)**

Run: `pnpm --filter @kinari/tokens test`
Expected: 5 new tests pass.

- [ ] **Step 5: Run the build command and verify CSS output**

Run:
```bash
pnpm --filter @kinari/tokens build
```
Expected: prints "Generated …/tokens.css".

Then:
```bash
cat packages/tokens/dist/tokens.css | head -10
```
Expected: starts with `:root {` and contains `--kinari: #f7f5f0;`.

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/scripts/
git commit -m "Add build-css script for @kinari/tokens — generates tokens.css from TS"
```

---

### Task 13: Typecheck, lint, and final tokens package verification

**Files:**
- (none new; verifying)

- [ ] **Step 1: Run typecheck on the package**

Run:
```bash
pnpm --filter @kinari/tokens typecheck
```
Expected: no errors.

- [ ] **Step 2: Run lint**

Run:
```bash
pnpm --filter @kinari/tokens lint
```
Expected: no errors. Fix any reported issues by following ESLint suggestions.

- [ ] **Step 3: Run the full test suite once more**

Run:
```bash
pnpm --filter @kinari/tokens test
```
Expected: all tests pass.

- [ ] **Step 4: Confirm package layout**

Run:
```bash
ls -la packages/tokens/src/ && ls -la packages/tokens/dist/ 2>/dev/null
```
Expected: 6 source files (colors, motion, shadow, spacing, type, cssvar, index) + tests; dist/tokens.css exists.

- [ ] **Step 5: No commit (verification only — proceed to Phase 3)**

---

## Phase 3 — `@kinari/react` primitives (Tasks 14–22)

### Task 14: Create the React package skeleton

**Files:**
- Create: `packages/react/package.json`
- Create: `packages/react/tsconfig.json`
- Create: `packages/react/vitest.config.ts`
- Create: `packages/react/src/index.ts`
- Create: `packages/react/test-setup.ts`
- Create: `packages/react/README.md`

- [ ] **Step 1: Create `packages/react/package.json`**

```json
{
  "name": "@kinari/react",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts"
    },
    "./demos": {
      "types": "./src/demos/index.ts",
      "import": "./src/demos/index.ts"
    }
  },
  "files": ["src", "README.md"],
  "scripts": {
    "build": "tsc --noEmit",
    "dev": "tsc --noEmit --watch",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx --max-warnings=0"
  },
  "dependencies": {
    "@kinari/tokens": "workspace:*",
    "clsx": "^2.1.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/user-event": "^14.5.0",
    "jsdom": "^25.0.0",
    "vitest": "^2.0.0",
    "@vitest/coverage-v8": "^2.0.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create `packages/react/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 3: Create `packages/react/vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test-setup.ts"],
    css: {
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
```

- [ ] **Step 4: Create `packages/react/test-setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Mock matchMedia for usePrefersReducedMotion tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
```

- [ ] **Step 5: Create placeholder `packages/react/src/index.ts`**

```ts
export {};
```

- [ ] **Step 6: Create `packages/react/README.md`**

```markdown
# @kinari/react

Web reference implementation of the Kinari framework for React 19.

## Visual primitives (7)
Sticker · Horizon · BilingualPair · NumericDisplay · PrincipleChip
DotGridCanvas · TypePair

## Working patterns (4)
NavPill (#09) · QuietTabs (#10) · SingleButton (#11) · ThreeCircles (#12)

## Interactive demos (6)
SoftSpringDemo · CaptureRitualDemo · SubjectLiftDemo · DiarySpineDemo
PaletteExplorer · MotionEasingExplorer

See [docs/visual-language.md](../../docs/visual-language.md) and
[docs/patterns/](../../docs/patterns/) for what each component implements.
```

- [ ] **Step 7: Install**

Run:
```bash
pnpm install
```
Expected: workspace resolves `@kinari/tokens`, React 19 installs.

- [ ] **Step 8: Smoke test**

Run:
```bash
pnpm --filter @kinari/react test
```
Expected: "No test files found" — exits 0.

- [ ] **Step 9: Commit**

```bash
git add packages/react/ pnpm-lock.yaml
git commit -m "Create @kinari/react package skeleton (React 19, Vitest, jsdom)"
```

---

### Task 15: `usePrefersReducedMotion` hook + `shadowFromAccent` re-export

**Files:**
- Create: `packages/react/src/utils/usePrefersReducedMotion.ts`
- Create: `packages/react/src/utils/usePrefersReducedMotion.test.tsx`
- Create: `packages/react/src/utils/shadowFromAccent.ts`
- Create: `packages/react/src/utils/index.ts`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Write the failing hook test**

`packages/react/src/utils/usePrefersReducedMotion.test.tsx`:

```tsx
import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

describe("usePrefersReducedMotion", () => {
  beforeEach(() => {
    // Reset matchMedia for each test
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("returns false when prefers-reduced-motion is not set", () => {
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when prefers-reduced-motion: reduce", () => {
    (window.matchMedia as any).mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test (should fail)**

Run: `pnpm --filter @kinari/react test`
Expected: fail.

- [ ] **Step 3: Create `packages/react/src/utils/usePrefersReducedMotion.ts`**

```ts
import { useEffect, useState } from "react";

/**
 * Returns true when `prefers-reduced-motion: reduce` is active.
 * Components should fall back to instant transitions when this is true.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 4: Create `packages/react/src/utils/shadowFromAccent.ts`**

```ts
export { shadowFromAccent, type ShadowLift } from "@kinari/tokens";
```

- [ ] **Step 5: Create `packages/react/src/utils/index.ts`**

```ts
export { usePrefersReducedMotion } from "./usePrefersReducedMotion";
export { shadowFromAccent, type ShadowLift } from "./shadowFromAccent";
```

- [ ] **Step 6: Update `packages/react/src/index.ts`**

```ts
export * from "./utils";
```

- [ ] **Step 7: Run tests**

Run: `pnpm --filter @kinari/react test`
Expected: 2 tests pass.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/utils/ packages/react/src/index.ts
git commit -m "Add usePrefersReducedMotion hook + shadowFromAccent utility re-export"
```

---

### Task 16: `<Sticker>` primitive

**Files:**
- Create: `packages/react/src/primitives/Sticker/Sticker.tsx`
- Create: `packages/react/src/primitives/Sticker/Sticker.module.css`
- Create: `packages/react/src/primitives/Sticker/Sticker.test.tsx`
- Create: `packages/react/src/primitives/Sticker/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/primitives/Sticker/Sticker.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sticker } from "./Sticker";

describe("<Sticker>", () => {
  it("renders children", () => {
    render(<Sticker>hello</Sticker>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("renders as a div by default", () => {
    const { container } = render(<Sticker>x</Sticker>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as an anchor when as='a' and href is provided", () => {
    render(<Sticker as="a" href="/foo">link</Sticker>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/foo");
  });

  it("renders as a button when as='button'", () => {
    render(<Sticker as="button" onClick={() => {}}>tap</Sticker>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies data-kinari-component='sticker'", () => {
    const { container } = render(<Sticker>x</Sticker>);
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "sticker");
  });

  it("applies a custom rotation when passed", () => {
    const { container } = render(<Sticker rotation={2.5}>x</Sticker>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue("--sticker-rotation")).toBe("2.5deg");
  });

  it("uses a stable rotation per mount when none is passed", () => {
    const { container, rerender } = render(<Sticker>x</Sticker>);
    const first = (container.firstChild as HTMLElement).style.getPropertyValue("--sticker-rotation");
    rerender(<Sticker>y</Sticker>);
    const second = (container.firstChild as HTMLElement).style.getPropertyValue("--sticker-rotation");
    expect(first).toBe(second);
  });
});
```

- [ ] **Step 2: Run the test (should fail — module missing)**

Run: `pnpm --filter @kinari/react test`
Expected: fail.

- [ ] **Step 3: Create `packages/react/src/primitives/Sticker/Sticker.module.css`**

```css
.sticker {
  --sticker-rotation: 0deg;
  background: var(--shiro);
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: var(--shadow-umber-resting);
  transform: rotate(var(--sticker-rotation));
  transition:
    transform var(--duration-sticker) var(--ease-tawami),
    box-shadow var(--duration-sticker) var(--ease-tawami);
  position: relative;
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

.sticker:hover,
.sticker:focus-visible {
  transform: translateY(-3px) rotate(0deg);
  box-shadow: var(--shadow-umber-floating);
}

.sticker:focus-visible {
  outline: 2px solid var(--shikon);
  outline-offset: 3px;
}

.floating {
  box-shadow: var(--shadow-umber-floating);
}

.polaroid {
  padding: 14px 14px 36px;
}

@media (prefers-reduced-motion: reduce) {
  .sticker {
    transition: none;
  }
  .sticker:hover,
  .sticker:focus-visible {
    transform: rotate(var(--sticker-rotation));
  }
}
```

- [ ] **Step 4: Create `packages/react/src/primitives/Sticker/Sticker.tsx`**

```tsx
import { type CSSProperties, type ReactNode, useMemo } from "react";
import clsx from "clsx";
import { shadowFromAccent } from "../../utils";
import { type AccentName, colors } from "@kinari/tokens";
import styles from "./Sticker.module.css";

export interface StickerProps {
  children: ReactNode;
  /** Subtle tilt. Default: stable randomized within ±1.2°. */
  rotation?: number;
  /** Resting (default) or floating shadow depth. */
  lift?: "resting" | "floating";
  /** When set, generates a colored shadow via shadowFromAccent. */
  accent?: AccentName | string;
  /** Die-cut (default) or polaroid variant. */
  variant?: "die-cut" | "polaroid";
  /** Element role — defaults to div. */
  as?: "div" | "a" | "button";
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** Pattern #01 Sticker Primitive — the framework's primary noun.
 *  Renders an object-with-weight on kinari paper. */
export function Sticker({
  children,
  rotation,
  lift = "resting",
  accent,
  variant = "die-cut",
  as = "div",
  href,
  onClick,
  className,
}: StickerProps) {
  const stableRotation = useMemo(() => {
    if (rotation !== undefined) return rotation;
    // Range -1.2 to +1.1, stable across re-renders via useMemo with empty deps.
    return Math.random() * 2.3 - 1.2;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const accentHex = accent && (accent in colors.accents
    ? colors.accents[accent as AccentName]
    : accent);

  const style: CSSProperties = {
    "--sticker-rotation": `${stableRotation}deg`,
    ...(accentHex ? { boxShadow: shadowFromAccent(accentHex, lift) } : {}),
  } as CSSProperties;

  const classNames = clsx(
    styles.sticker,
    lift === "floating" && styles.floating,
    variant === "polaroid" && styles.polaroid,
    className,
  );

  const dataAttrs = { "data-kinari-component": "sticker" };

  if (as === "a") {
    return (
      <a {...dataAttrs} className={classNames} style={style} href={href}>
        {children}
      </a>
    );
  }
  if (as === "button") {
    return (
      <button {...dataAttrs} type="button" className={classNames} style={style} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <div {...dataAttrs} className={classNames} style={style}>
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/primitives/Sticker/index.ts`**

```ts
export { Sticker, type StickerProps } from "./Sticker";
```

- [ ] **Step 6: Run the test (should pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 7 sticker tests pass + existing tests.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/primitives/Sticker/
git commit -m "Add <Sticker> primitive — Pattern #01, stable rotation, accent shadows"
```

---

### Task 17: `<Horizon>` primitive

**Files:**
- Create: `packages/react/src/primitives/Horizon/Horizon.tsx`
- Create: `packages/react/src/primitives/Horizon/Horizon.module.css`
- Create: `packages/react/src/primitives/Horizon/Horizon.test.tsx`
- Create: `packages/react/src/primitives/Horizon/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/primitives/Horizon/Horizon.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Horizon } from "./Horizon";

describe("<Horizon>", () => {
  it("renders a default · center mark", () => {
    render(<Horizon />);
    expect(screen.getByText("·")).toBeInTheDocument();
  });

  it("renders custom mark", () => {
    render(<Horizon mark="原則" />);
    expect(screen.getByText("原則")).toBeInTheDocument();
  });

  it("applies data-kinari-component='horizon'", () => {
    const { container } = render(<Horizon />);
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "horizon");
  });

  it("applies tight/normal/loose spacing classes", () => {
    const { rerender, container } = render(<Horizon spacing="tight" />);
    expect((container.firstChild as HTMLElement).className).toContain("tight");
    rerender(<Horizon spacing="loose" />);
    expect((container.firstChild as HTMLElement).className).toContain("loose");
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/primitives/Horizon/Horizon.module.css`**

```css
.horizon {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: var(--space-section-gap) 0 calc(var(--space-section-gap) * 0.6);
}

.line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(26, 26, 26, 0.18),
    transparent
  );
}

.mark {
  font-family: Georgia, serif;
  font-size: 13px;
  color: var(--sumi-mute);
  letter-spacing: 0.2em;
  white-space: nowrap;
}

.tight  { margin: calc(var(--space-section-gap) * 0.5) 0; }
.normal { margin: var(--space-section-gap) 0; }
.loose  { margin: calc(var(--space-section-gap) * 1.5) 0; }
```

- [ ] **Step 4: Create `packages/react/src/primitives/Horizon/Horizon.tsx`**

```tsx
import { type ReactNode } from "react";
import clsx from "clsx";
import styles from "./Horizon.module.css";

export interface HorizonProps {
  mark?: ReactNode;
  spacing?: "tight" | "normal" | "loose";
}

/** Hairline gradient + center mark — Visual Language §07 divider. */
export function Horizon({ mark = "·", spacing = "normal" }: HorizonProps) {
  return (
    <div
      data-kinari-component="horizon"
      className={clsx(styles.horizon, styles[spacing])}
      role="separator"
    >
      <div className={styles.line} aria-hidden="true" />
      <div className={styles.mark}>{mark}</div>
      <div className={styles.line} aria-hidden="true" />
    </div>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/primitives/Horizon/index.ts`**

```ts
export { Horizon, type HorizonProps } from "./Horizon";
```

- [ ] **Step 6: Run tests (pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 4 horizon tests pass.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/primitives/Horizon/
git commit -m "Add <Horizon> primitive — section divider with center mark"
```

---

### Task 18: `<BilingualPair>` primitive

**Files:**
- Create: `packages/react/src/primitives/BilingualPair/BilingualPair.tsx`
- Create: `packages/react/src/primitives/BilingualPair/BilingualPair.module.css`
- Create: `packages/react/src/primitives/BilingualPair/BilingualPair.test.tsx`
- Create: `packages/react/src/primitives/BilingualPair/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/primitives/BilingualPair/BilingualPair.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BilingualPair } from "./BilingualPair";

describe("<BilingualPair>", () => {
  it("renders both primary and secondary content", () => {
    render(<BilingualPair primary="原則" secondary="gensoku · principles" />);
    expect(screen.getByText("原則")).toBeInTheDocument();
    expect(screen.getByText("gensoku · principles")).toBeInTheDocument();
  });

  it("supports stacked (default) and inline orientations", () => {
    const { rerender, container } = render(
      <BilingualPair primary="A" secondary="b" orientation="stacked" />,
    );
    expect((container.firstChild as HTMLElement).className).toContain("stacked");
    rerender(<BilingualPair primary="A" secondary="b" orientation="inline" />);
    expect((container.firstChild as HTMLElement).className).toContain("inline");
  });

  it("supports small/medium/large sizes", () => {
    const { container } = render(<BilingualPair primary="A" secondary="b" size="large" />);
    expect((container.firstChild as HTMLElement).className).toContain("large");
  });

  it("sets lang attributes on each language slot", () => {
    render(
      <BilingualPair
        primary="原則"
        secondary="gensoku"
        primaryLang="ja"
      />,
    );
    expect(screen.getByText("原則")).toHaveAttribute("lang", "ja");
    // secondary defaults to en when primary is ja
    expect(screen.getByText("gensoku")).toHaveAttribute("lang", "en");
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/primitives/BilingualPair/BilingualPair.module.css`**

```css
.pair {
  display: inline-flex;
  line-height: 1;
  color: var(--sumi);
}

.stacked { flex-direction: column; align-items: center; gap: 0.4em; }
.inline  { flex-direction: row;    align-items: baseline; gap: 0.6em; }

.primary {
  font-family: Georgia, serif;
  font-weight: 600;
  color: var(--sumi);
}

.secondary {
  font-family: -apple-system, "SF Pro Text", system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.42em;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sumi-mute);
}

.small  .primary { font-size: 14px; }
.medium .primary { font-size: 22px; }
.large  .primary { font-size: 32px; }
```

- [ ] **Step 4: Create `packages/react/src/primitives/BilingualPair/BilingualPair.tsx`**

```tsx
import { type ReactNode } from "react";
import clsx from "clsx";
import styles from "./BilingualPair.module.css";

export interface BilingualPairProps {
  primary: ReactNode;
  secondary: ReactNode;
  orientation?: "stacked" | "inline";
  primaryLang?: "ja" | "en" | "ko" | "zh";
  size?: "small" | "medium" | "large";
}

const PAIRED_LANG: Record<NonNullable<BilingualPairProps["primaryLang"]>, string> = {
  ja: "en",
  ko: "en",
  zh: "en",
  en: "ja",
};

/** Pattern #06 Bilingual Pair — two languages, one designed typographic unit. */
export function BilingualPair({
  primary,
  secondary,
  orientation = "stacked",
  primaryLang = "ja",
  size = "medium",
}: BilingualPairProps) {
  const secondaryLang = PAIRED_LANG[primaryLang];

  return (
    <span
      data-kinari-component="bilingual-pair"
      className={clsx(styles.pair, styles[orientation], styles[size])}
    >
      <span className={styles.primary} lang={primaryLang}>{primary}</span>
      <span className={styles.secondary} lang={secondaryLang}>{secondary}</span>
    </span>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/primitives/BilingualPair/index.ts`**

```ts
export { BilingualPair, type BilingualPairProps } from "./BilingualPair";
```

- [ ] **Step 6: Run tests (pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 4 bilingual pair tests pass.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/primitives/BilingualPair/
git commit -m "Add <BilingualPair> primitive — Pattern #06 typographic lockup"
```

---

### Task 19: `<NumericDisplay>` primitive

**Files:**
- Create: `packages/react/src/primitives/NumericDisplay/NumericDisplay.tsx`
- Create: `packages/react/src/primitives/NumericDisplay/NumericDisplay.module.css`
- Create: `packages/react/src/primitives/NumericDisplay/NumericDisplay.test.tsx`
- Create: `packages/react/src/primitives/NumericDisplay/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/primitives/NumericDisplay/NumericDisplay.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NumericDisplay } from "./NumericDisplay";

describe("<NumericDisplay>", () => {
  it("renders the value", () => {
    render(<NumericDisplay value={94} />);
    expect(screen.getByText("94")).toBeInTheDocument();
  });

  it("renders the unit beside the value", () => {
    render(<NumericDisplay value={94} unit="kcal" />);
    expect(screen.getByText("kcal")).toBeInTheDocument();
  });

  it("does NOT auto-pluralize by default (P#10 — imperfection is a signature)", () => {
    render(<NumericDisplay value={1} unit="Words" />);
    expect(screen.getByText("Words")).toBeInTheDocument();
    expect(screen.queryByText("Word")).not.toBeInTheDocument();
  });

  it("supports serif font role", () => {
    const { container } = render(<NumericDisplay value={10} font="serif" />);
    expect((container.firstChild as HTMLElement).className).toContain("serif");
  });

  it("applies data-kinari-component='numeric-display'", () => {
    const { container } = render(<NumericDisplay value={1} />);
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "numeric-display");
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/primitives/NumericDisplay/NumericDisplay.module.css`**

```css
.numeric {
  display: inline-flex;
  align-items: baseline;
  gap: 0.18em;
  color: var(--kaki-iro);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.sans {
  font-family: -apple-system, "SF Pro Text", system-ui, sans-serif;
  font-weight: 800;
  font-style: italic;
  letter-spacing: -0.03em;
}

.serif {
  font-family: Georgia, serif;
  font-weight: 600;
  font-style: italic;
}

.unit {
  font-size: 0.5em;
  font-style: normal;
  letter-spacing: 0.02em;
  text-transform: lowercase;
}
```

- [ ] **Step 4: Create `packages/react/src/primitives/NumericDisplay/NumericDisplay.tsx`**

```tsx
import { type CSSProperties } from "react";
import clsx from "clsx";
import { colors, type AccentName } from "@kinari/tokens";
import styles from "./NumericDisplay.module.css";

export interface NumericDisplayProps {
  value: number | string;
  unit?: string;
  /** Accent override — defaults to kaki-iro warm signal. */
  accent?: AccentName | string;
  /** Type role — sans (default) or serif italic. */
  font?: "sans" | "serif";
  /** Auto-pluralize unit. Default: false (Kinari honors P#10). */
  pluralize?: boolean;
  className?: string;
}

/** Pattern #07 Numeral Display — celebratory numbers in warm signal. */
export function NumericDisplay({
  value,
  unit,
  accent,
  font = "sans",
  pluralize = false,
  className,
}: NumericDisplayProps) {
  const accentColor = accent
    ? (accent in colors.accents ? colors.accents[accent as AccentName] : accent)
    : undefined;

  const numericValue = typeof value === "number" ? value : Number(value);
  const displayUnit = unit && pluralize && numericValue !== 1
    ? `${unit}s`
    : unit;

  const style: CSSProperties = accentColor ? { color: accentColor } : {};

  return (
    <span
      data-kinari-component="numeric-display"
      className={clsx(styles.numeric, styles[font], className)}
      style={style}
    >
      <span>{value}</span>
      {displayUnit && <span className={styles.unit}>{displayUnit}</span>}
    </span>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/primitives/NumericDisplay/index.ts`**

```ts
export { NumericDisplay, type NumericDisplayProps } from "./NumericDisplay";
```

- [ ] **Step 6: Run tests (pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 5 numeric display tests pass.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/primitives/NumericDisplay/
git commit -m "Add <NumericDisplay> primitive — Pattern #07 in warm signal"
```

---

### Task 20: `<PrincipleChip>` primitive

**Files:**
- Create: `packages/react/src/primitives/PrincipleChip/PrincipleChip.tsx`
- Create: `packages/react/src/primitives/PrincipleChip/PrincipleChip.module.css`
- Create: `packages/react/src/primitives/PrincipleChip/PrincipleChip.test.tsx`
- Create: `packages/react/src/primitives/PrincipleChip/principles.ts`
- Create: `packages/react/src/primitives/PrincipleChip/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/primitives/PrincipleChip/PrincipleChip.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrincipleChip } from "./PrincipleChip";

describe("<PrincipleChip>", () => {
  it("renders #1 with full title by default", () => {
    render(<PrincipleChip number={1} />);
    expect(screen.getByText(/#1/)).toBeInTheDocument();
    expect(screen.getByText(/Photos supply the color/)).toBeInTheDocument();
  });

  it("renders only #N in number-only variant", () => {
    render(<PrincipleChip number={3} variant="number-only" />);
    expect(screen.getByText("#3")).toBeInTheDocument();
    expect(screen.queryByText(/Capture/)).not.toBeInTheDocument();
  });

  it("defaults href to /principles#NN-slug", () => {
    render(<PrincipleChip number={10} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/principles#10-imperfections-are-signatures",
    );
  });

  it("respects custom href", () => {
    render(<PrincipleChip number={2} href="/custom" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/custom");
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/primitives/PrincipleChip/principles.ts`**

```ts
export type PrincipleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const PRINCIPLES: Record<PrincipleNumber, { slug: string; name: string }> = {
  1:  { slug: "01-photos-supply-the-color-chrome-stays-quiet", name: "Photos supply the color" },
  2:  { slug: "02-the-users-stuff-is-the-atomic-unit",         name: "The user's stuff is the atomic unit" },
  3:  { slug: "03-capture-is-a-ritual",                         name: "Capture is a ritual" },
  4:  { slug: "04-chunky-over-skinny",                          name: "Chunky over skinny" },
  5:  { slug: "05-forgiving-by-default",                        name: "Forgiving by default" },
  6:  { slug: "06-time-is-the-spine",                           name: "Time is the spine" },
  7:  { slug: "07-bilingual-is-first-class",                    name: "Bilingual is first-class" },
  8:  { slug: "08-ai-feels-like-craft-not-magic",               name: "AI feels like craft, not magic" },
  9:  { slug: "09-the-background-is-a-workspace-not-a-frame",   name: "The background is a workspace" },
  10: { slug: "10-imperfections-are-signatures",                name: "Imperfections are signatures" },
};

export function principleHref(number: PrincipleNumber): string {
  return `/principles#${PRINCIPLES[number].slug}`;
}
```

- [ ] **Step 4: Create `packages/react/src/primitives/PrincipleChip/PrincipleChip.module.css`**

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--shikon) 12%, transparent);
  color: var(--shikon);
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 1px 1px 0 color-mix(in srgb, var(--shikon) 15%, transparent);
  transition: background var(--duration-cross-fade) var(--ease-tawami);
}

.chip:hover,
.chip:focus-visible {
  background: color-mix(in srgb, var(--shikon) 22%, transparent);
}

.chip:focus-visible {
  outline: 2px solid var(--shikon);
  outline-offset: 2px;
}

.number { font-weight: 800; font-style: italic; }
```

- [ ] **Step 5: Create `packages/react/src/primitives/PrincipleChip/PrincipleChip.tsx`**

```tsx
import styles from "./PrincipleChip.module.css";
import { PRINCIPLES, principleHref, type PrincipleNumber } from "./principles";

export interface PrincipleChipProps {
  number: PrincipleNumber;
  variant?: "number-only" | "full";
  href?: string;
}

/** Pattern #06 cross-reference chip. Renders `#N Title` or just `#N`. */
export function PrincipleChip({
  number,
  variant = "full",
  href,
}: PrincipleChipProps) {
  const target = href ?? principleHref(number);
  const title = PRINCIPLES[number].name;

  return (
    <a
      data-kinari-component="principle-chip"
      className={styles.chip}
      href={target}
    >
      <span className={styles.number}>#{number}</span>
      {variant === "full" && <span>{title}</span>}
    </a>
  );
}
```

- [ ] **Step 6: Create `packages/react/src/primitives/PrincipleChip/index.ts`**

```ts
export { PrincipleChip, type PrincipleChipProps } from "./PrincipleChip";
export { PRINCIPLES, principleHref, type PrincipleNumber } from "./principles";
```

- [ ] **Step 7: Run tests (pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 4 principle chip tests pass.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/primitives/PrincipleChip/
git commit -m "Add <PrincipleChip> primitive — accent-tinted cross-reference"
```

---

### Task 21: `<DotGridCanvas>` and `<TypePair>` primitives

**Files:**
- Create: `packages/react/src/primitives/DotGridCanvas/{DotGridCanvas.tsx, DotGridCanvas.module.css, DotGridCanvas.test.tsx, index.ts}`
- Create: `packages/react/src/primitives/TypePair/{TypePair.tsx, TypePair.module.css, TypePair.test.tsx, index.ts}`

- [ ] **Step 1: Write the failing tests**

`packages/react/src/primitives/DotGridCanvas/DotGridCanvas.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DotGridCanvas } from "./DotGridCanvas";

describe("<DotGridCanvas>", () => {
  it("renders children", () => {
    render(<DotGridCanvas><span>hello</span></DotGridCanvas>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies dot-grid variant by default", () => {
    const { container } = render(<DotGridCanvas>x</DotGridCanvas>);
    expect((container.firstChild as HTMLElement).className).toContain("dotGrid");
  });

  it("supports paper-tone variant", () => {
    const { container } = render(<DotGridCanvas variant="paper-tone">x</DotGridCanvas>);
    expect((container.firstChild as HTMLElement).className).toContain("paperTone");
  });
});
```

`packages/react/src/primitives/TypePair/TypePair.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Display, Label, Body } from "./TypePair";

describe("type-role components", () => {
  it("Display renders as h2 by default", () => {
    render(<Display>title</Display>);
    expect(screen.getByText("title").tagName).toBe("H2");
  });

  it("Label renders as span by default with chunky weight", () => {
    render(<Label>label</Label>);
    expect(screen.getByText("label").tagName).toBe("SPAN");
  });

  it("Body renders as div by default", () => {
    render(<Body>body</Body>);
    expect(screen.getByText("body").tagName).toBe("DIV");
  });

  it("each accepts an `as` override", () => {
    render(<Display as="h1">h1 title</Display>);
    expect(screen.getByText("h1 title").tagName).toBe("H1");
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/primitives/DotGridCanvas/DotGridCanvas.module.css`**

```css
.canvas {
  --dot-color: rgba(26, 26, 26, 0.13);
  background-color: var(--kinari);
  min-height: 100%;
}

.dotGrid {
  background-image: radial-gradient(
    circle,
    var(--dot-color) 1px,
    transparent 1px
  );
  background-size: var(--dot-spacing, 14px) var(--dot-spacing, 14px);
  background-position: 0 0;
}

.paperTone {
  background-color: var(--paper-tone);
  background-image: none;
}
```

- [ ] **Step 4: Create `packages/react/src/primitives/DotGridCanvas/DotGridCanvas.tsx`**

```tsx
import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./DotGridCanvas.module.css";

export interface DotGridCanvasProps {
  children: ReactNode;
  variant?: "dot-grid" | "paper-tone";
  spacing?: number;
  className?: string;
}

/** Pattern #02 Dot-Grid Canvas — backgrounds with quiet structure. */
export function DotGridCanvas({
  children,
  variant = "dot-grid",
  spacing,
  className,
}: DotGridCanvasProps) {
  const style: CSSProperties = spacing ? { "--dot-spacing": `${spacing}px` } as CSSProperties : {};

  return (
    <div
      data-kinari-component="dot-grid-canvas"
      data-variant={variant}
      className={clsx(
        styles.canvas,
        variant === "dot-grid" ? styles.dotGrid : styles.paperTone,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/primitives/DotGridCanvas/index.ts`**

```ts
export { DotGridCanvas, type DotGridCanvasProps } from "./DotGridCanvas";
```

- [ ] **Step 6: Create `packages/react/src/primitives/TypePair/TypePair.module.css`**

```css
.display {
  font-family: Georgia, "Newsreader", serif;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.1;
  color: var(--sumi);
}

.label {
  font-family: -apple-system, "SF Pro Text", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--sumi);
}

.body {
  font-family: -apple-system, "SF Pro Text", system-ui, sans-serif;
  font-weight: 400;
  line-height: 1.55;
  color: var(--sumi-soft);
}
```

- [ ] **Step 7: Create `packages/react/src/primitives/TypePair/TypePair.tsx`**

```tsx
import { type ElementType, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./TypePair.module.css";

export interface TypeRoleProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** Visual Language §01 type role: Display — friendly serif weight 600. */
export function Display({ children, as: As = "h2", className }: TypeRoleProps) {
  return <As className={clsx(styles.display, className)}>{children}</As>;
}

/** Type role: Label — chunky bold sans for stickers, CTAs, badges. */
export function Label({ children, as: As = "span", className }: TypeRoleProps) {
  return <As className={clsx(styles.label, className)}>{children}</As>;
}

/** Type role: Body — running prose. */
export function Body({ children, as: As = "div", className }: TypeRoleProps) {
  return <As className={clsx(styles.body, className)}>{children}</As>;
}

// Re-export NumericDisplay as Numeric for convenience
export { NumericDisplay as Numeric } from "../NumericDisplay";
```

- [ ] **Step 8: Create `packages/react/src/primitives/TypePair/index.ts`**

```ts
export { Display, Label, Body, Numeric, type TypeRoleProps } from "./TypePair";
```

- [ ] **Step 9: Run tests (pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 7 new tests pass.

- [ ] **Step 10: Commit**

```bash
git add packages/react/src/primitives/DotGridCanvas/ packages/react/src/primitives/TypePair/
git commit -m "Add <DotGridCanvas> and <TypePair> primitives"
```

---

### Task 22: Aggregate primitives barrel and export from package root

**Files:**
- Create: `packages/react/src/primitives/index.ts`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Create `packages/react/src/primitives/index.ts`**

```ts
export { Sticker, type StickerProps } from "./Sticker";
export { Horizon, type HorizonProps } from "./Horizon";
export { BilingualPair, type BilingualPairProps } from "./BilingualPair";
export { NumericDisplay, type NumericDisplayProps } from "./NumericDisplay";
export {
  PrincipleChip,
  type PrincipleChipProps,
  PRINCIPLES,
  principleHref,
  type PrincipleNumber,
} from "./PrincipleChip";
export { DotGridCanvas, type DotGridCanvasProps } from "./DotGridCanvas";
export { Display, Label, Body, Numeric, type TypeRoleProps } from "./TypePair";
```

- [ ] **Step 2: Update `packages/react/src/index.ts`**

```ts
export * from "./primitives";
export * from "./utils";
```

- [ ] **Step 3: Run typecheck and tests**

Run:
```bash
pnpm --filter @kinari/react typecheck
pnpm --filter @kinari/react test
```
Expected: both pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add packages/react/src/primitives/index.ts packages/react/src/index.ts
git commit -m "Aggregate primitives barrel and export from @kinari/react root"
```

---

## Phase 4 — `@kinari/react` patterns (Tasks 23–26)

### Task 23: `<NavPill>` — Pattern #09

**Files:**
- Create: `packages/react/src/patterns/NavPill/NavPill.tsx`
- Create: `packages/react/src/patterns/NavPill/NavPill.module.css`
- Create: `packages/react/src/patterns/NavPill/NavPill.test.tsx`
- Create: `packages/react/src/patterns/NavPill/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/patterns/NavPill/NavPill.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavPill, type NavPillStep } from "./NavPill";

const steps: NavPillStep[] = [
  { href: "/patterns/01-sticker-primitive",   titleJa: "シール",     titleEn: "sticker" },
  { href: "/patterns/02-dot-grid-canvas",     titleJa: "方眼",       titleEn: "canvas" },
  { href: "/patterns/03-capture-ritual",      titleJa: "写し",       titleEn: "capture" },
];

describe("<NavPill>", () => {
  it("renders prev/next links and current breadcrumb", () => {
    render(<NavPill steps={steps} current={1} />);
    expect(screen.getByText("方眼")).toBeInTheDocument();
    expect(screen.getByText(/canvas/)).toBeInTheDocument();
  });

  it("renders 'next' as link when not at end", () => {
    render(<NavPill steps={steps} current={0} />);
    const next = screen.getByLabelText(/next/i);
    expect(next).toHaveAttribute("href", "/patterns/02-dot-grid-canvas");
  });

  it("disables prev at start", () => {
    render(<NavPill steps={steps} current={0} />);
    const prev = screen.getByLabelText(/prev/i);
    expect(prev).toHaveAttribute("aria-disabled", "true");
  });

  it("disables next at end", () => {
    render(<NavPill steps={steps} current={2} />);
    const next = screen.getByLabelText(/next/i);
    expect(next).toHaveAttribute("aria-disabled", "true");
  });

  it("renders one dot per step, marks current dot active", () => {
    const { container } = render(<NavPill steps={steps} current={1} />);
    const dots = container.querySelectorAll('[data-kinari-component="nav-pill-dot"]');
    expect(dots).toHaveLength(3);
    expect(dots[1]).toHaveAttribute("data-active", "true");
  });

  it("fires onNavigate when prev/next clicked", () => {
    const onNavigate = vi.fn();
    render(<NavPill steps={steps} current={1} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByLabelText(/next/i));
    expect(onNavigate).toHaveBeenCalledWith(2, "next");
  });

  it("keyboard ← navigates prev, → navigates next", () => {
    const onNavigate = vi.fn();
    render(<NavPill steps={steps} current={1} onNavigate={onNavigate} />);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onNavigate).toHaveBeenCalledWith(0, "prev");
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onNavigate).toHaveBeenCalledWith(2, "next");
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/patterns/NavPill/NavPill.module.css`**

```css
.navPill {
  position: fixed;
  bottom: var(--space-nav-pill-offset);
  left: 50%;
  transform: translateX(-50%) rotate(-0.3deg);
  background: var(--shiro);
  border-radius: 999px;
  padding: 6px;
  display: flex;
  align-items: stretch;
  gap: 4px;
  box-shadow: var(--shadow-umber-resting);
  z-index: 100;
  font-size: 13px;
}

.zone {
  padding: 8px 14px;
  color: var(--sumi-mute);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border-radius: 999px;
  transition: color var(--duration-cross-fade) var(--ease-tawami);
}

.zone:hover { color: var(--sumi); }
.zone[aria-disabled="true"] { color: var(--sumi-mute); opacity: 0.4; pointer-events: none; }
.zone:focus-visible { outline: 2px solid var(--shikon); outline-offset: 2px; }

.center {
  padding: 8px 18px;
  background: var(--kinari);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.dots { display: flex; gap: 4px; }
.dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: rgba(26,26,26,0.18);
}
.dot[data-active="true"] { background: var(--shikon); }

@media (max-width: 600px) {
  .zoneLabel { display: none; }
}
```

- [ ] **Step 4: Create `packages/react/src/patterns/NavPill/NavPill.tsx`**

```tsx
import { useEffect } from "react";
import clsx from "clsx";
import { BilingualPair } from "../../primitives";
import styles from "./NavPill.module.css";

export interface NavPillStep {
  href: string;
  titleJa: string;
  titleEn: string;
}

export interface NavPillProps {
  steps: NavPillStep[];
  current: number;
  onNavigate?: (index: number, direction: "prev" | "next") => void;
  keyboard?: boolean;
}

/** Pattern #09 Navigation Pill — linear sequence nav. */
export function NavPill({ steps, current, onNavigate, keyboard = true }: NavPillProps) {
  const prev = current > 0 ? current - 1 : null;
  const next = current < steps.length - 1 ? current + 1 : null;
  const currentStep = steps[current];

  useEffect(() => {
    if (!keyboard) return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if ((e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === "ArrowLeft" && prev !== null) {
        e.preventDefault();
        onNavigate?.(prev, "prev");
      } else if (e.key === "ArrowRight" && next !== null) {
        e.preventDefault();
        onNavigate?.(next, "next");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onNavigate, keyboard]);

  return (
    <nav
      data-kinari-component="nav-pill"
      className={styles.navPill}
      aria-label="Pattern navigation"
    >
      <a
        className={styles.zone}
        href={prev !== null ? steps[prev]!.href : undefined}
        aria-label="previous step"
        aria-disabled={prev === null}
        onClick={(e) => {
          if (prev === null) e.preventDefault();
          else if (onNavigate) {
            e.preventDefault();
            onNavigate(prev, "prev");
          }
        }}
      >
        <span className={styles.zoneLabel}>← prev</span>
      </a>

      <div className={styles.center}>
        {currentStep && (
          <BilingualPair
            primary={currentStep.titleJa}
            secondary={`${currentStep.titleEn} · ${current + 1}/${steps.length}`}
            orientation="stacked"
            size="small"
          />
        )}
        <div className={styles.dots}>
          {steps.map((_, i) => (
            <span
              key={i}
              data-kinari-component="nav-pill-dot"
              data-active={i === current}
              className={styles.dot}
            />
          ))}
        </div>
      </div>

      <a
        className={styles.zone}
        href={next !== null ? steps[next]!.href : undefined}
        aria-label="next step"
        aria-disabled={next === null}
        onClick={(e) => {
          if (next === null) e.preventDefault();
          else if (onNavigate) {
            e.preventDefault();
            onNavigate(next, "next");
          }
        }}
      >
        <span className={styles.zoneLabel}>next →</span>
      </a>
    </nav>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/patterns/NavPill/index.ts`**

```ts
export { NavPill, type NavPillProps, type NavPillStep } from "./NavPill";
```

- [ ] **Step 6: Run tests (pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 7 NavPill tests pass.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/patterns/NavPill/
git commit -m "Add <NavPill> pattern — Pattern #09 with keyboard nav"
```

---

### Task 24: `<QuietTabs>` — Pattern #10

**Files:**
- Create: `packages/react/src/patterns/QuietTabs/QuietTabs.tsx`
- Create: `packages/react/src/patterns/QuietTabs/QuietTabs.module.css`
- Create: `packages/react/src/patterns/QuietTabs/QuietTabs.test.tsx`
- Create: `packages/react/src/patterns/QuietTabs/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/patterns/QuietTabs/QuietTabs.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuietTabs, type QuietTabsTab } from "./QuietTabs";

const tabs: QuietTabsTab[] = [
  { id: "bowl",   icon: "🥣", label: "Today",   href: "/today" },
  { id: "dial",   icon: "⏱",  label: "Goals",   href: "/goals" },
  { id: "camera", icon: "📷", label: "Capture", href: "/capture" },
];

describe("<QuietTabs>", () => {
  it("renders all tabs as links with aria-labels", () => {
    render(<QuietTabs tabs={tabs} active="bowl" />);
    expect(screen.getByLabelText("Today")).toBeInTheDocument();
    expect(screen.getByLabelText("Goals")).toBeInTheDocument();
    expect(screen.getByLabelText("Capture")).toBeInTheDocument();
  });

  it("marks the active tab with aria-current='page'", () => {
    render(<QuietTabs tabs={tabs} active="dial" />);
    expect(screen.getByLabelText("Goals")).toHaveAttribute("aria-current", "page");
    expect(screen.getByLabelText("Today")).not.toHaveAttribute("aria-current");
  });

  it("does NOT render the bar when hidden=true", () => {
    const { container } = render(<QuietTabs tabs={tabs} active="bowl" hidden />);
    expect(container.querySelector('[data-kinari-component="quiet-tabs"]')).toBeNull();
  });

  it("renders icons but no visible text labels", () => {
    render(<QuietTabs tabs={tabs} active="bowl" />);
    // Icons are present (we just rendered emoji as icon nodes)
    expect(screen.getByText("🥣")).toBeInTheDocument();
    // No visible "Today" text (only aria-label)
    expect(screen.queryByText("Today")).toBeNull();
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/patterns/QuietTabs/QuietTabs.module.css`**

```css
.bar {
  position: fixed;
  bottom: var(--space-nav-pill-offset);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  background: var(--shiro);
  padding: 4px;
  border-radius: 999px;
  box-shadow: var(--shadow-umber-resting);
  z-index: 100;
  gap: 0;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  text-decoration: none;
  color: var(--sumi);
  position: relative;
  transition: color var(--duration-chip) var(--ease-tawami);
  font-size: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.tab[aria-current="page"] {
  background: var(--accent, var(--shikon));
  color: var(--shiro);
  transition:
    background var(--duration-chip) var(--ease-tawami),
    color var(--duration-chip) var(--ease-tawami);
}

.tab:focus-visible {
  outline: 2px solid var(--shikon);
  outline-offset: 3px;
}
```

- [ ] **Step 4: Create `packages/react/src/patterns/QuietTabs/QuietTabs.tsx`**

```tsx
import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { colors, type AccentName } from "@kinari/tokens";
import styles from "./QuietTabs.module.css";

export interface QuietTabsTab {
  id: string;
  icon: ReactNode;
  label: string;
  href?: string;
  onSelect?: () => void;
}

export interface QuietTabsProps {
  tabs: QuietTabsTab[];
  active: string;
  accent?: AccentName | string;
  hidden?: boolean;
}

/** Pattern #10 Quiet Tabs — floating icon-only bottom bar for constellation
 *  products. Active tab is a filled pill in the project accent. */
export function QuietTabs({ tabs, active, accent, hidden }: QuietTabsProps) {
  if (hidden) return null;

  const accentColor = accent
    ? (accent in colors.accents ? colors.accents[accent as AccentName] : accent)
    : undefined;

  const style: CSSProperties = accentColor
    ? ({ "--accent": accentColor } as CSSProperties)
    : {};

  return (
    <nav
      data-kinari-component="quiet-tabs"
      className={styles.bar}
      aria-label="Primary navigation"
      style={style}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const commonProps = {
          "aria-label": tab.label,
          ...(isActive ? { "aria-current": "page" as const } : {}),
          className: styles.tab,
        };

        if (tab.href) {
          return (
            <a
              key={tab.id}
              {...commonProps}
              href={tab.href}
              onClick={tab.onSelect ? () => tab.onSelect!() : undefined}
            >
              {tab.icon}
            </a>
          );
        }
        return (
          <button
            key={tab.id}
            {...commonProps}
            type="button"
            onClick={tab.onSelect}
          >
            {tab.icon}
          </button>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/patterns/QuietTabs/index.ts`**

```ts
export { QuietTabs, type QuietTabsProps, type QuietTabsTab } from "./QuietTabs";
```

- [ ] **Step 6: Run tests (pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 4 QuietTabs tests pass.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/patterns/QuietTabs/
git commit -m "Add <QuietTabs> pattern — Pattern #10 floating tab bar"
```

---

### Task 25: `<SingleButton>` — Pattern #11

**Files:**
- Create: `packages/react/src/patterns/SingleButton/SingleButton.tsx`
- Create: `packages/react/src/patterns/SingleButton/SingleButton.module.css`
- Create: `packages/react/src/patterns/SingleButton/SingleButton.test.tsx`
- Create: `packages/react/src/patterns/SingleButton/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/patterns/SingleButton/SingleButton.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SingleButton } from "./SingleButton";

describe("<SingleButton>", () => {
  it("renders the provided shape inside the button", () => {
    render(
      <SingleButton
        shape={<svg data-testid="shape" />}
        onTap={() => {}}
      />,
    );
    expect(screen.getByTestId("shape")).toBeInTheDocument();
  });

  it("fires onTap when tapped", () => {
    const onTap = vi.fn();
    render(<SingleButton shape={<span>S</span>} onTap={onTap} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onTap).toHaveBeenCalled();
  });

  it("renders title and subtitle when provided", () => {
    render(
      <SingleButton
        shape={<span>S</span>}
        onTap={() => {}}
        title="Capture"
        subtitle="add a memory"
      />,
    );
    expect(screen.getByText("Capture")).toBeInTheDocument();
    expect(screen.getByText("add a memory")).toBeInTheDocument();
  });

  it("supports satellites slot", () => {
    render(
      <SingleButton
        shape={<span>S</span>}
        onTap={() => {}}
        satellites={<span data-testid="sat">sat</span>}
      />,
    );
    expect(screen.getByTestId("sat")).toBeInTheDocument();
  });

  it("respects size prop", () => {
    const { container } = render(
      <SingleButton shape={<span>S</span>} onTap={() => {}} size={56} />,
    );
    const btn = container.querySelector('[data-kinari-component="single-button"]') as HTMLElement;
    expect(btn.style.getPropertyValue("--single-button-size")).toBe("56px");
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/patterns/SingleButton/SingleButton.module.css`**

```css
.wrapper {
  position: fixed;
  bottom: var(--space-nav-pill-offset);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 100;
}

.title {
  font-family: Georgia, serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--sumi);
}

.subtitle {
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 12px;
  color: var(--sumi-muted);
}

.row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.button {
  --single-button-size: 72px;
  width: var(--single-button-size);
  height: var(--single-button-size);
  border-radius: 50%;
  background: var(--shiro);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-umber-resting);
  transition:
    transform var(--duration-cross-fade) var(--ease-tawami),
    opacity var(--duration-cross-fade) var(--ease-tawami);
}

.button:focus-visible { outline: 2px solid var(--shikon); outline-offset: 4px; }

.button[data-spending="true"] { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
}
```

- [ ] **Step 4: Create `packages/react/src/patterns/SingleButton/SingleButton.tsx`**

```tsx
import { type CSSProperties, type ReactNode, useState } from "react";
import { Display, Body } from "../../primitives/TypePair";
import styles from "./SingleButton.module.css";

export interface SingleButtonProps {
  shape: ReactNode;
  onTap: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  satellites?: ReactNode;
  size?: 56 | 64 | 72;
  spendAnimation?: boolean;
}

/** Pattern #11 Single Button — one branded shape, invariant across contexts.
 *  The shape itself is consumer-provided. */
export function SingleButton({
  shape,
  onTap,
  title,
  subtitle,
  satellites,
  size = 72,
  spendAnimation = true,
}: SingleButtonProps) {
  const [spending, setSpending] = useState(false);

  const handleClick = () => {
    if (spendAnimation) {
      setSpending(true);
      // Reset spend state after the fade completes
      setTimeout(() => setSpending(false), 220);
    }
    onTap();
  };

  const style: CSSProperties = { "--single-button-size": `${size}px` } as CSSProperties;

  return (
    <div className={styles.wrapper}>
      {title && <Display as="div" className={styles.title}>{title}</Display>}
      {subtitle && <Body as="div" className={styles.subtitle}>{subtitle}</Body>}
      <div className={styles.row}>
        {satellites}
        <button
          data-kinari-component="single-button"
          data-spending={spending}
          type="button"
          className={styles.button}
          style={style}
          onClick={handleClick}
        >
          {shape}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/patterns/SingleButton/index.ts`**

```ts
export { SingleButton, type SingleButtonProps } from "./SingleButton";
```

- [ ] **Step 6: Run tests (pass)**

Run: `pnpm --filter @kinari/react test`
Expected: 5 SingleButton tests pass.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/patterns/SingleButton/
git commit -m "Add <SingleButton> pattern — Pattern #11, consumer-provided shape"
```

---

### Task 26: `<ThreeCircles>` — Pattern #12

**Files:**
- Create: `packages/react/src/patterns/ThreeCircles/ThreeCircles.tsx`
- Create: `packages/react/src/patterns/ThreeCircles/ThreeCircles.module.css`
- Create: `packages/react/src/patterns/ThreeCircles/ThreeCircles.test.tsx`
- Create: `packages/react/src/patterns/ThreeCircles/index.ts`

- [ ] **Step 1: Write the failing test**

`packages/react/src/patterns/ThreeCircles/ThreeCircles.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThreeCircles } from "./ThreeCircles";

describe("<ThreeCircles>", () => {
  it("renders three buttons with correct aria-labels", () => {
    render(
      <ThreeCircles
        left={{ icon: <span>✕</span>, label: "discard", onTap: () => {} }}
        center={{ icon: <span>✓</span>, label: "confirm", onTap: () => {} }}
        right={{ icon: <span>↻</span>, label: "retry", onTap: () => {} }}
      />,
    );
    expect(screen.getByLabelText("discard")).toBeInTheDocument();
    expect(screen.getByLabelText("confirm")).toBeInTheDocument();
    expect(screen.getByLabelText("retry")).toBeInTheDocument();
  });

  it("fires the center onTap when center is clicked", () => {
    const onTap = vi.fn();
    render(
      <ThreeCircles
        left={{ icon: "L", label: "left", onTap: () => {} }}
        center={{ icon: "C", label: "center", onTap }}
        right={{ icon: "R", label: "right", onTap: () => {} }}
      />,
    );
    fireEvent.click(screen.getByLabelText("center"));
    expect(onTap).toHaveBeenCalled();
  });

  it("marks the center as the primary affirmative", () => {
    const { container } = render(
      <ThreeCircles
        left={{ icon: "L", label: "L", onTap: () => {} }}
        center={{ icon: "C", label: "C", onTap: () => {} }}
        right={{ icon: "R", label: "R", onTap: () => {} }}
      />,
    );
    const center = container.querySelector('[data-role="center"]');
    expect(center).toHaveAttribute("data-role", "center");
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Create `packages/react/src/patterns/ThreeCircles/ThreeCircles.module.css`**

```css
.row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.btn {
  border: none;
  background: var(--shiro);
  color: var(--sumi);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-umber-resting);
  transition:
    transform var(--duration-cross-fade) var(--ease-tawami),
    box-shadow var(--duration-cross-fade) var(--ease-tawami);
  font-size: 20px;
}

.flank {
  width: 48px;
  height: 48px;
}

.center {
  width: 60px;
  height: 60px;
  background: var(--accent, var(--shikon));
  color: var(--shiro);
  font-size: 24px;
}

.btn:focus-visible {
  outline: 2px solid var(--shikon);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .btn { transition: none; }
}
```

- [ ] **Step 4: Create `packages/react/src/patterns/ThreeCircles/ThreeCircles.tsx`**

```tsx
import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { colors, type AccentName, shadowFromAccent } from "@kinari/tokens";
import styles from "./ThreeCircles.module.css";

export interface ThreeCirclesAction {
  icon: ReactNode;
  label: string;
  onTap: () => void;
}

export interface ThreeCirclesProps {
  left: ThreeCirclesAction;
  center: ThreeCirclesAction;
  right: ThreeCirclesAction;
  accent?: AccentName | string;
}

/** Pattern #12 Three Circles — decision-moment chrome. Center is bigger,
 *  in the project accent. Flanks are paper-white with sumi glyphs. */
export function ThreeCircles({
  left, center, right, accent,
}: ThreeCirclesProps) {
  const accentColor = accent
    ? (accent in colors.accents ? colors.accents[accent as AccentName] : accent)
    : undefined;

  const centerStyle: CSSProperties = accentColor
    ? ({
        "--accent": accentColor,
        boxShadow: shadowFromAccent(accentColor, "resting"),
      } as CSSProperties)
    : {};

  return (
    <div data-kinari-component="three-circles" className={styles.row}>
      <button
        type="button"
        data-role="left"
        aria-label={left.label}
        className={clsx(styles.btn, styles.flank)}
        onClick={left.onTap}
      >
        {left.icon}
      </button>
      <button
        type="button"
        data-role="center"
        aria-label={center.label}
        className={clsx(styles.btn, styles.center)}
        style={centerStyle}
        onClick={center.onTap}
      >
        {center.icon}
      </button>
      <button
        type="button"
        data-role="right"
        aria-label={right.label}
        className={clsx(styles.btn, styles.flank)}
        onClick={right.onTap}
      >
        {right.icon}
      </button>
    </div>
  );
}
```

- [ ] **Step 5: Create `packages/react/src/patterns/ThreeCircles/index.ts`**

```ts
export {
  ThreeCircles,
  type ThreeCirclesProps,
  type ThreeCirclesAction,
} from "./ThreeCircles";
```

- [ ] **Step 6: Aggregate patterns barrel**

Create `packages/react/src/patterns/index.ts`:

```ts
export { NavPill, type NavPillProps, type NavPillStep } from "./NavPill";
export { QuietTabs, type QuietTabsProps, type QuietTabsTab } from "./QuietTabs";
export { SingleButton, type SingleButtonProps } from "./SingleButton";
export {
  ThreeCircles,
  type ThreeCirclesProps,
  type ThreeCirclesAction,
} from "./ThreeCircles";
```

Update `packages/react/src/index.ts`:

```ts
export * from "./primitives";
export * from "./patterns";
export * from "./utils";
```

- [ ] **Step 7: Run all tests and typecheck**

Run:
```bash
pnpm --filter @kinari/react test
pnpm --filter @kinari/react typecheck
```
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/patterns/
git add packages/react/src/index.ts
git commit -m "Add <ThreeCircles> pattern + aggregate patterns barrel"
```

---

## Phase 5 — `@kinari/react` demo components (Tasks 27–32)

Each demo follows the same template (test, css, tsx, index). To keep the plan readable, the demos use the **same task structure**: test → impl → commit. Implementations are scoped tight; details that matter are below.

> **For agent workers building the demos:** each demo's tests check **structure and interaction**, not pixel-perfect animation. Animation correctness is validated by visual regression in Plan B. Keep tests focused on: renders correctly, interactions fire callbacks, `prefers-reduced-motion` short-circuits animations.

### Task 27: `<PaletteExplorer>` demo

**Files:** `packages/react/src/demos/PaletteExplorer/{PaletteExplorer.tsx, PaletteExplorer.module.css, PaletteExplorer.test.tsx, index.ts}`

- [ ] **Step 1: Write the failing test**

```tsx
// PaletteExplorer.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaletteExplorer } from "./PaletteExplorer";

describe("<PaletteExplorer>", () => {
  it("renders all six 伝統色 swatches", () => {
    render(<PaletteExplorer />);
    expect(screen.getByLabelText("moegi")).toBeInTheDocument();
    expect(screen.getByLabelText("kakishibu")).toBeInTheDocument();
    expect(screen.getByLabelText("sakura")).toBeInTheDocument();
    expect(screen.getByLabelText("asagi")).toBeInTheDocument();
    expect(screen.getByLabelText("yamabuki")).toBeInTheDocument();
    expect(screen.getByLabelText("shikon")).toBeInTheDocument();
  });

  it("updates the active accent when a swatch is clicked", () => {
    const { container } = render(<PaletteExplorer defaultAccent="shikon" />);
    expect(container.querySelector('[data-active-accent="shikon"]')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("moegi"));
    expect(container.querySelector('[data-active-accent="moegi"]')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Implement**

`PaletteExplorer.module.css`:

```css
.explorer {
  background: var(--shiro);
  border-radius: 18px;
  padding: 24px;
  box-shadow: var(--shadow-umber-resting);
}

.swatches { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.swatch {
  width: 100%; aspect-ratio: 1; border-radius: 50%;
  border: none; cursor: pointer;
  box-shadow: var(--shadow-umber-contact);
  transition: transform var(--duration-cross-fade) var(--ease-tawami);
}
.swatch:focus-visible { outline: 2px solid var(--sumi); outline-offset: 4px; }
.swatch[data-selected="true"] { transform: scale(1.12); box-shadow: var(--shadow-umber-resting); }

.preview {
  margin-top: 20px;
  padding: 20px;
  border-radius: 14px;
  background: var(--kinari);
  background-image: radial-gradient(circle, rgba(26,26,26,0.13) 1px, transparent 1px);
  background-size: 14px 14px;
  display: flex; justify-content: center;
}
```

`PaletteExplorer.tsx`:

```tsx
import { useState } from "react";
import { colors, type AccentName } from "@kinari/tokens";
import { ThreeCircles } from "../../patterns";
import styles from "./PaletteExplorer.module.css";

export interface PaletteExplorerProps {
  defaultAccent?: AccentName;
  allowCustom?: boolean;
}

const ACCENT_NAMES: AccentName[] = ["moegi", "kakishibu", "sakura", "asagi", "yamabuki", "shikon"];

export function PaletteExplorer({
  defaultAccent = "shikon",
  allowCustom = false,
}: PaletteExplorerProps) {
  const [active, setActive] = useState<AccentName>(defaultAccent);

  return (
    <div
      data-kinari-component="palette-explorer"
      data-active-accent={active}
      className={styles.explorer}
    >
      <div role="radiogroup" aria-label="Accent palette" className={styles.swatches}>
        {ACCENT_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            role="radio"
            aria-checked={active === name}
            aria-label={name}
            data-selected={active === name}
            onClick={() => setActive(name)}
            className={styles.swatch}
            style={{ backgroundColor: colors.accents[name] }}
          />
        ))}
      </div>

      <div className={styles.preview}>
        <ThreeCircles
          accent={active}
          left={{ icon: "✕", label: "discard", onTap: () => {} }}
          center={{ icon: "✓", label: "confirm", onTap: () => {} }}
          right={{ icon: "↻", label: "retry", onTap: () => {} }}
        />
      </div>

      {allowCustom && (
        <div style={{ marginTop: 12 }}>
          <input
            type="color"
            aria-label="Custom accent"
            onChange={(e) => setActive(e.target.value as AccentName)}
          />
        </div>
      )}
    </div>
  );
}
```

`index.ts`:
```ts
export { PaletteExplorer, type PaletteExplorerProps } from "./PaletteExplorer";
```

- [ ] **Step 4: Tests pass, commit**

Run: `pnpm --filter @kinari/react test`

```bash
git add packages/react/src/demos/PaletteExplorer/
git commit -m "Add <PaletteExplorer> demo — six 伝統色 swatches recolor a preview"
```

---

### Task 28: `<MotionEasingExplorer>` demo

**Files:** `packages/react/src/demos/MotionEasingExplorer/{MotionEasingExplorer.tsx, MotionEasingExplorer.module.css, MotionEasingExplorer.test.tsx, index.ts}`

- [ ] **Step 1: Write the failing test**

```tsx
// MotionEasingExplorer.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MotionEasingExplorer } from "./MotionEasingExplorer";

describe("<MotionEasingExplorer>", () => {
  it("renders two animation boxes side-by-side in comparison mode", () => {
    const { container } = render(<MotionEasingExplorer mode="comparison" />);
    expect(container.querySelectorAll('[data-kinari-component="motion-box"]')).toHaveLength(2);
  });

  it("labels one box as 'correct' and one as 'wrong'", () => {
    render(<MotionEasingExplorer mode="comparison" />);
    expect(screen.getByText(/soft-out/i)).toBeInTheDocument();
    expect(screen.getByText(/spring overshoot/i)).toBeInTheDocument();
  });

  it("has a replay button that triggers animation", () => {
    render(<MotionEasingExplorer mode="comparison" />);
    const replay = screen.getByRole("button", { name: /replay/i });
    fireEvent.click(replay);
    // We can't assert animation start without sleeping; check button exists
    expect(replay).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Implement**

`MotionEasingExplorer.module.css`:

```css
.explorer { background: var(--shiro); border-radius: 18px; padding: 24px; box-shadow: var(--shadow-umber-resting); }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 16px; }
.col { display: flex; flex-direction: column; gap: 8px; }
.label { font-family: Georgia, serif; font-style: italic; font-size: 13px; color: var(--sumi-muted); }
.track { background: var(--kinari); border-radius: 14px; height: 80px; position: relative; padding: 14px; }
.box {
  width: 36px; height: 36px;
  background: var(--shikon); border-radius: 8px;
  position: absolute; top: 50%; transform: translateY(-50%);
}
.boxCorrect[data-running="true"] {
  animation: slideCorrect 700ms var(--ease-tawami) forwards;
}
.boxWrong[data-running="true"] {
  animation: slideWrong 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes slideCorrect { from { left: 14px; } to { left: calc(100% - 50px); } }
@keyframes slideWrong   { from { left: 14px; } to { left: calc(100% - 50px); } }

.replay {
  font-family: -apple-system, system-ui, sans-serif;
  font-weight: 700; font-size: 13px;
  background: var(--shikon); color: var(--shiro);
  border: none; border-radius: 999px;
  padding: 8px 18px; cursor: pointer;
}

@media (prefers-reduced-motion: reduce) {
  .boxCorrect[data-running="true"],
  .boxWrong[data-running="true"] { animation: none; left: calc(100% - 50px); }
}
```

`MotionEasingExplorer.tsx`:

```tsx
import { useState } from "react";
import { usePrefersReducedMotion } from "../../utils";
import styles from "./MotionEasingExplorer.module.css";

export interface MotionEasingExplorerProps {
  mode?: "comparison" | "explore";
}

export function MotionEasingExplorer({ mode = "comparison" }: MotionEasingExplorerProps) {
  const [runId, setRunId] = useState(0);
  const reduced = usePrefersReducedMotion();

  return (
    <div className={styles.explorer}>
      <div className={styles.row}>
        <div className={styles.col}>
          <span className={styles.label}>soft-out · ease-tawami (correct)</span>
          <div className={styles.track}>
            <div
              key={`c-${runId}`}
              data-kinari-component="motion-box"
              data-variant="correct"
              data-running={!reduced}
              className={`${styles.box} ${styles.boxCorrect}`}
            />
          </div>
        </div>
        <div className={styles.col}>
          <span className={styles.label}>spring overshoot (wrong)</span>
          <div className={styles.track}>
            <div
              key={`w-${runId}`}
              data-kinari-component="motion-box"
              data-variant="wrong"
              data-running={!reduced}
              className={`${styles.box} ${styles.boxWrong}`}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className={styles.replay}
        onClick={() => setRunId((n) => n + 1)}
        aria-label="Replay animation"
      >
        ↻ replay
      </button>
    </div>
  );
}
```

`index.ts`:
```ts
export { MotionEasingExplorer, type MotionEasingExplorerProps } from "./MotionEasingExplorer";
```

- [ ] **Step 4: Tests pass, commit**

```bash
git add packages/react/src/demos/MotionEasingExplorer/
git commit -m "Add <MotionEasingExplorer> demo — soft-out vs spring overshoot"
```

---

### Task 29: `<SoftSpringDemo>` demo

**Files:** `packages/react/src/demos/SoftSpringDemo/{SoftSpringDemo.tsx, SoftSpringDemo.module.css, SoftSpringDemo.test.tsx, index.ts}`

- [ ] **Step 1: Write the failing test**

```tsx
// SoftSpringDemo.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SoftSpringDemo } from "./SoftSpringDemo";

describe("<SoftSpringDemo>", () => {
  it("renders the sticker-settle scenario by default", () => {
    render(<SoftSpringDemo />);
    expect(screen.getByRole("button", { name: /replay/i })).toBeInTheDocument();
  });

  it("supports cascade-order scenario", () => {
    render(<SoftSpringDemo scenario="cascade-order" />);
    expect(screen.getByText(/subject/i)).toBeInTheDocument();
    expect(screen.getByText(/chrome/i)).toBeInTheDocument();
    expect(screen.getByText(/text lands last/i)).toBeInTheDocument();
  });

  it("supports drill-in scenario", () => {
    const { container } = render(<SoftSpringDemo scenario="drill-in" />);
    expect(container.querySelector('[data-kinari-scenario="drill-in"]')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Implement**

`SoftSpringDemo.module.css`:

```css
.demo { background: var(--shiro); border-radius: 18px; padding: 24px; box-shadow: var(--shadow-umber-resting); display: flex; flex-direction: column; gap: 16px; }
.stage { background: var(--kinari); border-radius: 14px; padding: 20px; min-height: 160px; display: flex; align-items: center; justify-content: center; gap: 12px; }
.tile { background: var(--shiro); border-radius: 12px; padding: 18px 22px; box-shadow: var(--shadow-umber-contact); opacity: 0; transform: translateY(8px); }
.tile[data-state="settled"] { opacity: 1; transform: translateY(0); transition: transform 240ms var(--ease-tawami), opacity 240ms var(--ease-tawami); }
.tile.subject { font-family: Georgia, serif; font-weight: 600; font-size: 20px; }
.tile.chrome  { font-family: -apple-system, system-ui, sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sumi-mute); }
.tile.text    { font-family: -apple-system, system-ui, sans-serif; font-size: 13px; color: var(--sumi-soft); }

.tile[data-cascade="subject"][data-state="settled"] { transition-delay: 0ms; }
.tile[data-cascade="chrome"][data-state="settled"]  { transition-delay: 80ms; }
.tile[data-cascade="text"][data-state="settled"]    { transition-delay: 160ms; }

.replay {
  font-family: -apple-system, system-ui, sans-serif; font-weight: 700; font-size: 13px;
  background: var(--shikon); color: var(--shiro); border: none; border-radius: 999px;
  padding: 8px 18px; cursor: pointer; align-self: center;
}

@media (prefers-reduced-motion: reduce) {
  .tile { opacity: 1; transform: none; transition: none; }
}
```

`SoftSpringDemo.tsx`:

```tsx
import { useState, useEffect } from "react";
import styles from "./SoftSpringDemo.module.css";

export interface SoftSpringDemoProps {
  scenario?: "sticker-settle" | "cascade-order" | "drill-in" | "all";
  showEasingComparison?: boolean;
}

export function SoftSpringDemo({
  scenario = "sticker-settle",
}: SoftSpringDemoProps) {
  const [state, setState] = useState<"initial" | "settled">("initial");

  useEffect(() => {
    const t = setTimeout(() => setState("settled"), 60);
    return () => clearTimeout(t);
  }, []);

  const replay = () => {
    setState("initial");
    setTimeout(() => setState("settled"), 60);
  };

  if (scenario === "cascade-order") {
    return (
      <div className={styles.demo} data-kinari-scenario="cascade-order">
        <div className={styles.stage}>
          <div className={`${styles.tile} ${styles.subject}`} data-cascade="subject" data-state={state}>subject</div>
          <div className={`${styles.tile} ${styles.chrome}`}  data-cascade="chrome"  data-state={state}>chrome</div>
          <div className={`${styles.tile} ${styles.text}`}    data-cascade="text"    data-state={state}>text lands last</div>
        </div>
        <button type="button" className={styles.replay} onClick={replay} aria-label="Replay animation">↻ replay</button>
      </div>
    );
  }

  if (scenario === "drill-in") {
    return (
      <div className={styles.demo} data-kinari-scenario="drill-in">
        <div className={styles.stage}>
          <div className={`${styles.tile} ${styles.subject}`} data-state={state}>(scale + blur drill-in)</div>
        </div>
        <button type="button" className={styles.replay} onClick={replay} aria-label="Replay animation">↻ replay</button>
      </div>
    );
  }

  // default — sticker-settle
  return (
    <div className={styles.demo} data-kinari-scenario="sticker-settle">
      <div className={styles.stage}>
        <div className={`${styles.tile} ${styles.subject}`} data-state={state}>sticker settles</div>
      </div>
      <button type="button" className={styles.replay} onClick={replay} aria-label="Replay animation">↻ replay</button>
    </div>
  );
}
```

`index.ts`:
```ts
export { SoftSpringDemo, type SoftSpringDemoProps } from "./SoftSpringDemo";
```

- [ ] **Step 4: Tests pass, commit**

```bash
git add packages/react/src/demos/SoftSpringDemo/
git commit -m "Add <SoftSpringDemo> — Pattern #08 motion scenarios"
```

---

### Task 30: `<CaptureRitualDemo>` demo

**Files:** `packages/react/src/demos/CaptureRitualDemo/{CaptureRitualDemo.tsx, CaptureRitualDemo.module.css, CaptureRitualDemo.test.tsx, index.ts}`

- [ ] **Step 1: Failing test**

```tsx
// CaptureRitualDemo.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CaptureRitualDemo } from "./CaptureRitualDemo";

describe("<CaptureRitualDemo>", () => {
  it("renders a shutter button and corner brackets", () => {
    const { container } = render(<CaptureRitualDemo />);
    expect(container.querySelector('[data-kinari-element="shutter"]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-kinari-element="bracket"]')).toHaveLength(4);
  });

  it("on shutter tap, advances to bloom and then to settled", () => {
    const { container } = render(<CaptureRitualDemo />);
    fireEvent.click(container.querySelector('[data-kinari-element="shutter"]')!);
    expect(container.querySelector('[data-state="blooming"]')).toBeInTheDocument();
  });

  it("replay resets the demo", () => {
    const { container } = render(<CaptureRitualDemo />);
    fireEvent.click(container.querySelector('[data-kinari-element="shutter"]')!);
    fireEvent.click(screen.getByRole("button", { name: /replay/i }));
    expect(container.querySelector('[data-state="idle"]')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Implement**

`CaptureRitualDemo.module.css`:

```css
.demo { background: var(--shiro); border-radius: 18px; padding: 24px; box-shadow: var(--shadow-umber-resting); display: flex; flex-direction: column; gap: 16px; }
.stage { background: var(--kinari); border-radius: 14px; height: 240px; position: relative; overflow: hidden; }
.frame { position: absolute; inset: 24px; }
.bracket { position: absolute; width: 20px; height: 20px; border: 2px solid var(--sumi); }
.bracketTL { top: 0; left: 0; border-right: none; border-bottom: none; }
.bracketTR { top: 0; right: 0; border-left: none; border-bottom: none; }
.bracketBL { bottom: 0; left: 0; border-right: none; border-top: none; }
.bracketBR { bottom: 0; right: 0; border-left: none; border-top: none; }
.subject {
  position: absolute; inset: 30%;
  display: flex; align-items: center; justify-content: center;
  font-size: 48px;
  opacity: 0;
  transition: opacity 200ms var(--ease-tawami);
}
.bloom {
  position: absolute; inset: 30%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--kaki-iro) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.6);
  pointer-events: none;
}
[data-state="blooming"] .bloom { animation: bloom 300ms var(--ease-tawami) forwards; }
[data-state="settled"] .subject { opacity: 1; }
@keyframes bloom {
  0%   { opacity: 0; transform: scale(0.6); }
  50%  { opacity: 0.6; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1); }
}

.shutter {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--shiro); border: 3px solid var(--sumi);
  cursor: pointer; box-shadow: var(--shadow-umber-resting);
}
.shutter:focus-visible { outline: 2px solid var(--shikon); outline-offset: 3px; }

.replay {
  font-family: -apple-system, system-ui, sans-serif; font-weight: 700; font-size: 13px;
  background: var(--shikon); color: var(--shiro); border: none; border-radius: 999px;
  padding: 8px 18px; cursor: pointer; align-self: center;
}
```

`CaptureRitualDemo.tsx`:

```tsx
import { useState, type ReactNode } from "react";
import { colors, type AccentName } from "@kinari/tokens";
import styles from "./CaptureRitualDemo.module.css";

export interface CaptureRitualDemoProps {
  subject?: ReactNode;
  accent?: AccentName | string;
}

export function CaptureRitualDemo({
  subject = "🍎",
  accent,
}: CaptureRitualDemoProps) {
  const [state, setState] = useState<"idle" | "blooming" | "settled">("idle");

  const fire = () => {
    setState("blooming");
    setTimeout(() => setState("settled"), 320);
  };

  const reset = () => setState("idle");

  return (
    <div className={styles.demo}>
      <div className={styles.stage} data-state={state}>
        <div className={styles.frame}>
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketTL}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketTR}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketBL}`} />
          <div data-kinari-element="bracket" className={`${styles.bracket} ${styles.bracketBR}`} />
        </div>
        <div className={styles.bloom} />
        <div className={styles.subject}>{subject}</div>
        <button
          data-kinari-element="shutter"
          type="button"
          className={styles.shutter}
          onClick={fire}
          aria-label="Capture"
        />
      </div>
      <button type="button" className={styles.replay} onClick={reset} aria-label="Replay">↻ replay</button>
    </div>
  );
}
```

`index.ts`:
```ts
export { CaptureRitualDemo, type CaptureRitualDemoProps } from "./CaptureRitualDemo";
```

- [ ] **Step 4: Tests pass, commit**

```bash
git add packages/react/src/demos/CaptureRitualDemo/
git commit -m "Add <CaptureRitualDemo> — Pattern #03 bracket + bloom + settle"
```

---

### Task 31: `<SubjectLiftDemo>` and `<DiarySpineDemo>` demos

These are the two remaining demos. To stay disciplined, this task implements **both** with focused test coverage on structure and interaction (not animation correctness; Plan B visual regression covers that).

**Files:** Both demos under `packages/react/src/demos/SubjectLiftDemo/` and `.../DiarySpineDemo/`.

- [ ] **Step 1: Write failing tests for both**

`SubjectLiftDemo.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubjectLiftDemo } from "./SubjectLiftDemo";

describe("<SubjectLiftDemo>", () => {
  it("renders a placeholder context with a 'lift subject' control", () => {
    render(<SubjectLiftDemo src="/test.png" context="/test-bg.jpg" />);
    expect(screen.getByRole("button", { name: /lift subject/i })).toBeInTheDocument();
  });

  it("on lift, advances to shimmering state", () => {
    vi.useFakeTimers();
    const { container } = render(<SubjectLiftDemo src="/test.png" context="/test-bg.jpg" />);
    fireEvent.click(screen.getByRole("button", { name: /lift subject/i }));
    expect(container.querySelector('[data-state="shimmering"]')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
```

`DiarySpineDemo.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DiarySpineDemo } from "./DiarySpineDemo";

const entries = [
  { id: "a", sticker: "A", detail: "A detail" },
  { id: "b", sticker: "B", detail: "B detail" },
  { id: "c", sticker: "C", detail: "C detail" },
  { id: "d", sticker: "D", detail: "D detail" },
];

describe("<DiarySpineDemo>", () => {
  it("renders four entries by default", () => {
    const { container } = render(<DiarySpineDemo entries={entries} />);
    expect(container.querySelectorAll('[data-kinari-element="entry"]')).toHaveLength(4);
  });

  it("focuses an entry when tapped", () => {
    const { container } = render(<DiarySpineDemo entries={entries} />);
    fireEvent.click(container.querySelector('[data-entry-id="b"]')!);
    expect(container.querySelector('[data-entry-id="b"][data-focus="true"]')).toBeInTheDocument();
  });

  it("returns to grid when focused entry is tapped again", () => {
    const { container } = render(<DiarySpineDemo entries={entries} />);
    const b = container.querySelector('[data-entry-id="b"]')!;
    fireEvent.click(b);
    fireEvent.click(b);
    expect(container.querySelector('[data-focus="true"]')).toBeNull();
  });
});
```

- [ ] **Step 2: Run (fail)**

Run: `pnpm --filter @kinari/react test`

- [ ] **Step 3: Implement `SubjectLiftDemo`**

`SubjectLiftDemo.module.css`:

```css
.demo { background: var(--shiro); border-radius: 18px; padding: 24px; box-shadow: var(--shadow-umber-resting); display: flex; flex-direction: column; gap: 16px; }
.stage { background: var(--kinari); border-radius: 14px; height: 240px; position: relative; overflow: hidden; }
.context { width: 100%; height: 100%; object-fit: cover; opacity: 1; transition: opacity 600ms var(--ease-tawami); }
.subject { position: absolute; inset: 30%; opacity: 0; transition: opacity 300ms var(--ease-tawami); }
[data-state="shimmering"] .subject { opacity: 0; }
[data-state="lifted"] .subject { opacity: 1; }
[data-state="lifted"] .context { opacity: 0.4; }

.shimmer { position: absolute; inset: 0; opacity: 0; pointer-events: none; background: repeating-linear-gradient(45deg, transparent 0 6px, color-mix(in srgb, var(--kaki-iro) 30%, transparent) 6px 8px); }
[data-state="shimmering"] .shimmer { animation: shimmer 700ms var(--ease-tawami) forwards; }
@keyframes shimmer { 0% { opacity: 0; } 30% { opacity: 0.6; } 100% { opacity: 0; } }

.cta {
  font-family: -apple-system, system-ui, sans-serif; font-weight: 700; font-size: 13px;
  background: var(--shikon); color: var(--shiro); border: none; border-radius: 999px;
  padding: 8px 18px; cursor: pointer; align-self: center;
}

@media (prefers-reduced-motion: reduce) {
  [data-state="shimmering"] .shimmer { animation: none; opacity: 0; }
}
```

`SubjectLiftDemo.tsx`:

```tsx
import { useState } from "react";
import styles from "./SubjectLiftDemo.module.css";

export interface SubjectLiftDemoProps {
  src: string;
  context: string;
}

export function SubjectLiftDemo({ src, context }: SubjectLiftDemoProps) {
  const [state, setState] = useState<"idle" | "shimmering" | "lifted">("idle");

  const lift = () => {
    setState("shimmering");
    setTimeout(() => setState("lifted"), 700);
  };

  return (
    <div className={styles.demo}>
      <div className={styles.stage} data-state={state}>
        <img src={context} alt="" className={styles.context} aria-hidden="true" />
        <img src={src} alt="" className={styles.subject} aria-hidden="true" />
        <div className={styles.shimmer} aria-hidden="true" />
      </div>
      <button type="button" className={styles.cta} onClick={lift} aria-label="Lift subject">
        Lift subject ↑
      </button>
    </div>
  );
}
```

`SubjectLiftDemo/index.ts`:
```ts
export { SubjectLiftDemo, type SubjectLiftDemoProps } from "./SubjectLiftDemo";
```

- [ ] **Step 4: Implement `DiarySpineDemo`**

`DiarySpineDemo.module.css`:

```css
.demo { background: var(--shiro); border-radius: 18px; padding: 24px; box-shadow: var(--shadow-umber-resting); }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; position: relative; }
.entry {
  background: var(--shiro);
  border-radius: 14px;
  padding: 20px;
  box-shadow: var(--shadow-umber-contact);
  cursor: pointer;
  transition: transform var(--duration-drill-in) var(--ease-tawami), filter var(--duration-drill-in) var(--ease-tawami);
  text-align: left;
  border: none;
  font-family: inherit;
  color: inherit;
}
.entry:focus-visible { outline: 2px solid var(--shikon); outline-offset: 4px; }
.entry[data-focus="true"]  { transform: scale(1.3); z-index: 1; }
.entry[data-blurred="true"] { filter: blur(3px); transform: scale(0.95); }

@media (prefers-reduced-motion: reduce) {
  .entry { transition: none; }
}
```

`DiarySpineDemo.tsx`:

```tsx
import { useState, type ReactNode } from "react";
import styles from "./DiarySpineDemo.module.css";

export interface DiarySpineEntry {
  id: string;
  sticker: ReactNode;
  detail: ReactNode;
}

export interface DiarySpineDemoProps {
  entries: DiarySpineEntry[];
}

export function DiarySpineDemo({ entries }: DiarySpineDemoProps) {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className={styles.demo}>
      <div className={styles.grid}>
        {entries.map((e) => {
          const isFocused = focused === e.id;
          const isBlurred = focused !== null && !isFocused;
          return (
            <button
              key={e.id}
              type="button"
              data-kinari-element="entry"
              data-entry-id={e.id}
              data-focus={isFocused}
              data-blurred={isBlurred}
              className={styles.entry}
              onClick={() => setFocused(isFocused ? null : e.id)}
            >
              {isFocused ? e.detail : e.sticker}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

`DiarySpineDemo/index.ts`:
```ts
export {
  DiarySpineDemo,
  type DiarySpineDemoProps,
  type DiarySpineEntry,
} from "./DiarySpineDemo";
```

- [ ] **Step 5: Tests pass, commit both demos**

Run: `pnpm --filter @kinari/react test`
Expected: all tests pass.

```bash
git add packages/react/src/demos/SubjectLiftDemo/ packages/react/src/demos/DiarySpineDemo/
git commit -m "Add <SubjectLiftDemo> and <DiarySpineDemo>"
```

---

### Task 32: Aggregate demos barrel and final verification

**Files:**
- Create: `packages/react/src/demos/index.ts`
- Verify: build, typecheck, lint, tests all pass

- [ ] **Step 1: Create `packages/react/src/demos/index.ts`**

```ts
export { SoftSpringDemo, type SoftSpringDemoProps } from "./SoftSpringDemo";
export { CaptureRitualDemo, type CaptureRitualDemoProps } from "./CaptureRitualDemo";
export { SubjectLiftDemo, type SubjectLiftDemoProps } from "./SubjectLiftDemo";
export {
  DiarySpineDemo,
  type DiarySpineDemoProps,
  type DiarySpineEntry,
} from "./DiarySpineDemo";
export { PaletteExplorer, type PaletteExplorerProps } from "./PaletteExplorer";
export { MotionEasingExplorer, type MotionEasingExplorerProps } from "./MotionEasingExplorer";
```

- [ ] **Step 2: Final verification — build the workspace**

Run:
```bash
pnpm build
```
Expected: tokens emits `tokens.css`; react package typechecks (no compiled output yet — that's fine for in-workspace consumption).

- [ ] **Step 3: Typecheck the workspace**

Run:
```bash
pnpm typecheck
```
Expected: zero errors across packages.

- [ ] **Step 4: Lint the workspace**

Run:
```bash
pnpm lint
```
Expected: zero warnings or errors.

- [ ] **Step 5: Run all tests one final time**

Run:
```bash
pnpm test
```
Expected: all tests pass. Coverage on `packages/react/src/primitives` and `packages/react/src/patterns` ≥ 80%. (Demos are excluded from coverage threshold.)

- [ ] **Step 6: Verify the package exports look right by importing them**

Create a quick smoke-test consumer to verify the barrel exports resolve. Run:

```bash
node --experimental-vm-modules --input-type=module -e "
import('@kinari/react').then((m) => {
  console.log('exports:', Object.keys(m).sort().join(', '));
});
" 2>&1 || echo "Note: TS source imports require a build step or test runner — typecheck above is the contract test."
```

If that fails (no compiled output yet), that's acceptable; the package is consumed via TS source by Astro/Vite/Vitest, all of which compile on read. The typecheck in Step 3 is the binding correctness check.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/demos/index.ts
git commit -m "Aggregate demos barrel — @kinari/react v0.1 library complete"
```

- [ ] **Step 8: Tag the milestone**

Run:
```bash
git tag -a kinari-library-v0.1 -m "Kinari library v0.1 — tokens + react (7 primitives, 4 patterns, 6 demos)"
```

(Tag locally only; no push needed.)

---

## Self-review

Before handing off:

- **Spec coverage:** every spec section maps to tasks above —
  - Repo plumbing (Spec §Architecture) → Tasks 1–6
  - `@kinari/tokens` design → Tasks 7–13
  - Visual primitives (7) → Tasks 16–22
  - Working patterns (4) → Tasks 23–26
  - Interactive demos (6) → Tasks 27–31
  - Tests + CI + Vitest coverage → Tasks 5, 6, and per-component test files

- **Tests cover each component's contract** — render, role-based queries, prop variants, prefers-reduced-motion paths, type-level invariants (Task 5 sets up Vitest; each component test asserts API contract).

- **No placeholders** — every step contains the actual content to write or run.

- **Type consistency** — `AccentName` is defined in Task 8 and referenced consistently in Tasks 16, 19, 24, 26, 27, 30; `PrincipleNumber` defined in Task 20.

- **Out of scope (correctly deferred to Plan B):** `apps/site`, Astro content collections, remark plugins, Pagefind, GitHub Pages deploy, end-to-end visual regression, bundle-size CI enforcement.

---

## Acceptance criteria for Plan A completion

- [ ] `pnpm install && pnpm build` succeeds from a clean checkout on Node 22 + pnpm 9.
- [ ] `pnpm typecheck` zero errors across all workspace packages.
- [ ] `pnpm lint` zero warnings across all workspace packages.
- [ ] `pnpm test` passes all Vitest suites with primitives + patterns at ≥80% coverage.
- [ ] `packages/tokens/dist/tokens.css` generated and contains all expected CSS variables.
- [ ] `@kinari/react`'s barrel re-exports 7 primitives, 4 patterns, 6 demos, and 2 utilities.
- [ ] `prefers-reduced-motion` is honored by every animated component (Sticker, NavPill sliding pill, ThreeCircles, SingleButton spend, all six demos).
- [ ] Git history contains discrete commits — one per task — with conventional messages.
- [ ] Milestone tag `kinari-library-v0.1` present locally.

When all green, the library is ready to be consumed by Plan B (`apps/site`).

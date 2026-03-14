# Bergmann & Co. — Claude Instructions

---

## Installed Skills & When to Use Them

### 1. `frontend-design` — Primary Coding Skill
**Invoke before writing any frontend code, every session, no exceptions.**

```
Skill("frontend-design")
```

Guides production-grade HTML/CSS/JS with intentional aesthetic direction. Enforces:
- Bold typographic choices — never Inter, Arial, or generic system fonts
- Cohesive color systems via CSS variables
- Motion that serves meaning (GSAP scroll reveals, hover states)
- Spatial composition: asymmetry, overlap, generous negative space
- Atmospheric backgrounds (textures, layered elements) over flat fills

**This project constraint:** The aesthetic is already defined — pure black/white, Montserrat + Lato, GSAP animations. Use the skill to maintain that precision and avoid drift.

---

### 2. `ui-ux-pro-max` — UX Intelligence & Pre-Delivery Validation
**Invoke for any UX decision, typography/color choice, accessibility concern, or pre-launch quality check.**

```
Skill("ui-ux-pro-max")
```

**Script path:**
```bash
UIUX="/Users/jeff/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.0.1/.claude/skills/ui-ux-pro-max/scripts/search.py"
```

**Useful queries for this project:**

```bash
# Check fintech/financial site best practices
python3 $UIUX "financial services landing page minimal" --design-system -p "Bergmann Co"

# Typography guidance (we use Montserrat/Lato — validate the pairing)
python3 $UIUX "luxury financial editorial typography" --domain typography

# Animation timing for GSAP scroll reveals
python3 $UIUX "scroll reveal entrance animation timing" --domain ux

# Accessibility audit before delivery
python3 $UIUX "accessibility contrast keyboard nav focus" --domain ux

# Landing page structure validation
python3 $UIUX "hero cta services process contact footer" --domain landing
```

**Run the pre-delivery checklist mentally against §1 (Accessibility) and §2 (Touch & Interaction) before every delivery.**

Key rules to always enforce:
- Body text contrast ≥ 4.5:1 (black on white passes; white on dark overlay — verify)
- All interactive elements have visible focus rings (`outline: 0.125rem solid #4d65ff`)
- Touch targets ≥ 44×44px (nav links, buttons, cookie toggles)
- `prefers-reduced-motion` — GSAP animations should degrade gracefully
- Animation duration 150–400ms; use `ease-out` for entrances, `ease-in` for exits
- `transform`/`opacity` only — never animate `width`, `height`, `top`, `left`

---

### 3. `playwright-skill` — Screenshot, Compare & Validate
**Use for every visual verification loop — never rely on mental diffs.**

```
Skill("playwright-skill")
```

**Skill directory:**
```bash
SKILL_DIR="/Users/jeff/.claude/plugins/cache/playwright-skill/playwright-skill/4.1.0/skills/playwright-skill"
```

**Dev server:** `python3 -m http.server 8787` from `/Users/jeff/SFGCM Website`

**Execution pattern:**
```bash
# Always write scripts to /tmp — never to the project
cd "$SKILL_DIR" && node run.js /tmp/playwright-test-*.js
```

**Standard screenshot script template:**
```javascript
// /tmp/playwright-test-NAME.js
const { chromium } = require('playwright');
const TARGET_URL = 'http://localhost:8787';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5500); // wait for loader animation
  try { await page.locator('#acceptCookies').click({ timeout: 800 }); } catch(e) {}

  // Full page
  await page.screenshot({ path: '/tmp/screenshot-full.png', fullPage: true });

  // Specific section
  await page.$eval('.c-services__projects', el => el.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  const box = await page.$eval('.c-services__projects', el => el.getBoundingClientRect());
  await page.screenshot({ path: '/tmp/screenshot-services.png',
    clip: { x: 0, y: box.y, width: 1440, height: box.height } });

  await browser.close();
  console.log('Screenshots saved to /tmp/');
})();
```

**Comparison workflow (required — minimum 2 rounds):**
1. Screenshot local → read PNG → compare vs reference
2. List ALL specific mismatches with measurements: `"heading is 52px, original shows ~42px"`, `"gap between cards is 28px, should be 0px"`
3. Fix all mismatches
4. Re-screenshot → re-compare
5. Stop only when no visible differences remain or user approves

**When inspecting the original site:**
```javascript
// Inspect computed styles of any element
const style = await page.evaluate(() => {
  const el = document.querySelector('.section_projects');
  const cs = getComputedStyle(el);
  return { fontFamily: cs.fontFamily, fontSize: cs.fontSize, bg: cs.backgroundImage };
});
```

---

### 4. `ckm:design` — Brand Assets & Banners *(situational)*
**Use when creating new marketing assets, social media images, or banners for Bergmann & Co.**

```
Skill("ckm:design")
```

Capabilities relevant to this project:
- **Logo generation** — if logo variants are needed (white, black, inverted)
- **Banner design** — 22 art direction styles for social/web headers
- **Social photos** — HTML→screenshot export for Instagram/LinkedIn posts
- **CIP mockups** — business cards, letterhead, stationery if needed

Not relevant for day-to-day site coding.

---

### 5. `ckm:brand` — Brand Compliance *(situational)*
**Use when reviewing content tone, expanding copy, or auditing brand consistency.**

```
Skill("ckm:brand")
```

Relevant for: ensuring new copy matches Bergmann & Co.'s voice (premium, precise, understated financial authority). Not needed for structural CSS/layout work.

---

### 6. `ckm:design-system` — Token Architecture *(situational)*
**Use if extending the CSS custom property system or creating a formal design token spec.**

```
Skill("ckm:design-system")
```

Our existing token system is in `assets/css/main.css` under `:root {}`. Use this skill if the token architecture needs formalising across multiple files or a JSON token export is required.

---

## Reference Image Workflow

**If a reference image is provided:**
1. Match layout, spacing, typography, and color exactly — no improvements, no additions
2. Swap in placeholder content only if actual content isn't provided (`https://placehold.co/`)
3. Screenshot → compare → fix → re-screenshot. Minimum 2 full comparison rounds
4. Stop only when no visible differences remain, or user explicitly approves

**If no reference image:**
1. Invoke `frontend-design` skill first
2. Design from scratch with high craft to match the established Bergmann & Co. aesthetic
3. Still run 2 screenshot comparison rounds against the live reference at `https://bergmann-co.com/`

---

## Standard Design-to-Code Workflow

```
1. frontend-design skill    → commit to aesthetic direction
2. ui-ux-pro-max (optional) → validate UX decisions, get font/color guidance
3. Write HTML/CSS/JS        → following project design rules below
4. playwright screenshot    → http://localhost:8787
5. Compare vs reference     → list specific pixel-level mismatches
6. Fix all mismatches       → repeat from step 4
7. ui-ux-pro-max checklist  → §1 Accessibility + §2 Touch minimum
8. Deliver                  → only when no visible differences remain
```

---

## Project Context

| Property | Value |
|---|---|
| **Site** | Bergmann & Co. — financial advisory |
| **Reference** | `https://bergmann-co.com/` |
| **Stack** | Pure HTML/CSS/JS — no framework, no build tool |
| **Pages** | `index.html`, `impressum.html`, `datenschutz.html` |
| **Dev server** | `python3 -m http.server 8787` |
| **Assets** | `assets/css/`, `assets/js/main.js`, `assets/images/` |

---

## Design Tokens (Do Not Change)

```css
--color-dark:        #000000;   /* pure black — not charcoal */
--color-light:       #FFFFFF;
--color-mid:         #F4F4F4;   /* card/section backgrounds only */
--color-border:      #E8E8E8;
--color-accent:      #4d65ff;   /* focus outlines only */
--font-heading:      'Montserrat', sans-serif;   /* NOT Oswald */
--font-body:         'Lato', sans-serif;
--nav-height:        72px;
--section-pad-v:     110px;
--section-pad-h:     64px;
--max-width:         1320px;
```

---

## Architecture Rules

**Fonts:** Montserrat (headings, 500–600 weight) + Lato (body, 300–400 weight). Loaded via Google Fonts CDN in `assets/css/fonts.css`. Never use Oswald — it was an error in an earlier version.

**Animation stack:** GSAP 3 + ScrollTrigger + CustomEase + SplitType for `.skew-up` word reveals. Splide.js for mobile carousel. SmoothScroll for anchor scrolling.

**Page loader:** Pure black bg → white logo pulses (GSAP opacity 1→0.15→1, 2 cycles) → panel slides DOWN (`yPercent: 105`) to reveal site. Logo uses `filter: brightness(0) invert(1)` to force white from the black PNG source.

**Hero section:** Text-only (no image element). Background: `bg-texture.jpeg` (concentric circles pattern, `background-position: right center`). Single-column flex layout, content centered vertically. Headline: Montserrat 600, `clamp(40px, 4.2vw, 64px)`.

**Services section:** 4-column alternating grid `[stacked images] [content card] [stacked images] [content card]`. Content cards: `background: #F4F4F4`, `border-radius: 12px`, `margin: 16px`. No outer border.

**CTA band ("Optimieren Sie Ihre Kapitalstruktur"):** `background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('../images/hero-graphic.webp')`. 2-column layout: heading left, tag + text right.

**Process section:** 3-column: photo | numbered steps | photo. Photos use `aspect-ratio: 3/4`, `filter: grayscale(30%)`.

---

## Image Assignments

| File | Used In | Notes |
|---|---|---|
| `logo-black.png` | Nav | Light bg contexts |
| `logo-white.png` | Loader, Footer | Dark bg contexts |
| `bg-texture.jpeg` | Hero background | Concentric circles — `background-position: right center` |
| `hero-graphic.webp` | CTA band background | Dark overlay `rgba(0,0,0,0.8)` |
| `cta-texture.png` | Services: Service 1 top image | Hestia building photo |
| `process-right.jpeg` | Services: Service 1 bottom image | Portrait/office photo |
| `service-extra.png` | Services: Service 2 top image | Architectural interior |
| `service-leveraged.jpeg` | Services: Service 2 bottom image | Office/finance photo |
| `service-debt.png` | Process section: LEFT photo | Group of professionals |
| `process-left.jpeg` | Process section: RIGHT photo | Building exterior |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤991px` | Nav collapses to burger, services stack to 1-column (images side-by-side), process hides photos |
| `≤767px` | Industries switches to Splide carousel, smaller padding |
| `≤479px` | Cookie banner becomes bottom sheet, hero headline reduces to 36px |

---

## Critical Anti-Patterns (Never Do)

- Do not use `Oswald` font — it was a mistake. Always `Montserrat` for headings
- Do not add a decorative image to the hero section — it is intentionally text-only
- Do not center the CTA band content — it is a 2-column left/right layout
- Do not use `bg-texture.jpeg` in the CTA band — that image goes in the hero
- Do not use `hero-graphic.webp` as a visible `<img>` anywhere — it is a CSS background only
- Do not use `service-debt.png` in services — it goes in the process section
- Do not use `cta-texture.png` in the process section — it goes in services (service 1 top)
- Do not animate `width`, `height`, `top`, or `left` — GSAP uses `transform`/`opacity` only
- Do not use charcoal (`#27313D`) — the brand color is pure black `#000000`

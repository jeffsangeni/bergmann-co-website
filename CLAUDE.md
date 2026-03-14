# Bergmann & Co. — Claude Instructions

---

## Installed Skills & When to Use Them

### 1. `frontend-design` — Primary Coding Skill
**Invoke before writing any frontend code, every session, no exceptions.**

```
Skill("frontend-design")
```

**This project constraint:** The aesthetic is already defined — white + `#262527`, Space Grotesk + Inter, GSAP animations, modern SaaS-finance hybrid. Use the skill to maintain that precision and avoid drift.

---

### 2. `playwright-skill` — Screenshot, Compare & Validate
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

**Loader wait:** The site has a GSAP loader animation. Always `waitForTimeout(5500)` after `goto()` on `index.html` before taking screenshots.

---

### 3. Other Skills (situational)

- `ui-ux-pro-max` — UX validation, accessibility checks, font/color guidance
- `ckm:design` — Brand assets, banners, social media images
- `ckm:brand` — Brand voice compliance for copy
- `ckm:design-system` — Formal design token architecture if needed

---

## Project Context

| Property | Value |
|---|---|
| **Site** | Bergmann & Co. — financial advisory |
| **Stack** | Pure HTML/CSS/JS — no framework, no build tool |
| **Hosting** | Vercel (planned) |
| **GitHub** | `jeffsangeni/bergmann-co-website` |
| **Branch** | `v2-enhanced-animations` (active development) |
| **Dev server** | `python3 -m http.server 8787` |

### Pages

| Page | Path | Indexed |
|---|---|---|
| `index.html` | `/` | Yes |
| `impressum.html` | `/impressum` | Yes |
| `datenschutz.html` | `/datenschutz` | Yes |
| `erichjosephs.html` | `/erichjosephs` | No (`noindex, nofollow`) |
| `marcusmueller.html` | `/marcusmueller` | No (`noindex, nofollow`) |
| `mb.html` | `/mb` | No (`noindex, nofollow`) |

### Assets

| Directory | Contents |
|---|---|
| `assets/css/main.css` | Full design system, tokens, all component styles |
| `assets/css/card.css` | Digital business card page styles |
| `assets/js/main.js` | GSAP animations, lightbox, counters, particles, industry/feature anims, cursor glow |
| `assets/images/` | Logos, headshots, textures |
| `favicon.svg` | SVG favicon ("B" on dark rounded square) |
| `vercel.json` | Clean URLs, security headers |
| `robots.txt` | Blocks card pages from crawlers |
| `sitemap.xml` | Public pages only |

---

## Design Tokens (Current)

```css
--color-dark:        #262527;
--color-dark-80:     rgba(38, 37, 39, 0.80);
--color-dark-60:     rgba(38, 37, 39, 0.60);
--color-white:       #ffffff;
--color-surface:     #fafafa;
--color-border:      rgba(38, 37, 39, 0.08);
--font-heading:      'Space Grotesk', sans-serif;
--font-body:         'Inter', sans-serif;
--nav-height:        72px;
--container-max:     1200px;
--radius-sm/md/lg/xl: 8px / 12px / 16px / 20px;
```

---

## Architecture Rules

**Fonts:** Space Grotesk (headings, 600–700 weight) + Inter (body, 400–500 weight). Loaded via Google Fonts CDN.

**Color palette:** White (`#ffffff`) + dark (`#262527`) as primary pair. Surface `#fafafa` for alternating sections. No pure black `#000000`.

**Animation stack:** GSAP 3 + ScrollTrigger + CustomEase. Feature card and industry card SVG animations are GSAP looping timelines (not CSS keyframes). Service card hover has cursor-following radial gradient glow via JS mousemove.

**Page loader:** Dark bg → white logo fades in → progress bar fills → loader fades out → hero animates in.

**Section order:** Hero → Features/Capital Solutions (white) → Services (dark) → Process (white) → Industries (surface) → CTA Band (dark) → Footer (white).

**Hero section:** Text-only with animated orbs, grid overlay, particles. Badge label, headline with gradient accent, subtitle, 2 buttons, stats strip.

**Services section:** Dark background (`--color-dark`). Two side-by-side cards with white text. Cursor-following glow on hover (not animated border).

**Process section:** Vertical timeline with numbered markers (01–05). Line fills on scroll via ScrollTrigger scrub.

**Industries section:** 4 cards with GSAP-animated SVG illustrations (bar chart, buildings, yield curve, network graph). All loop automatically.

**CTA band:** Dark bg, 2-column layout: heading/text left, inline contact form right.

**Contact lightbox:** Opens via `.js-open-lightbox` class on any CTA button. Backdrop blur, form with firstName/lastName/email/company/message.

**Digital card pages:** Standalone pages (no GSAP, no loader). Max-width 480px centered. Avatar, vCard download, about text, website link, 6 contact links. Uses `card.css`.

---

## Image Assignments

| File | Used In | Notes |
|---|---|---|
| `logo-black.png` | Nav, footer, card pages | Light bg contexts |
| `logo-white.png` | Loader | Dark bg contexts |
| `bg-texture.jpeg` | Not currently used | Available for future use |
| `ej-headshot.jpeg` | `/erichjosephs` card page | Erich Josephs profile photo |
| `mm-headshot.jpeg` | `/marcusmueller` card page | Marcus Mueller profile photo |
| `mb-headshot.jpg` | `/mb` card page | Maximilian Bergmann profile photo |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤991px` | Nav collapses to burger, features/services stack to 1-column, industries to 2-column grid |
| `≤767px` | Industries to 1-column, footer nav gap reduces, form rows stack |
| `≤479px` | Hero badge shrinks to 10px, stats become 3-column grid, buttons go full-width, footer stacks vertically |

---

## Critical Anti-Patterns (Never Do)

- Do not use `Montserrat`, `Lato`, or `Oswald` fonts — the rebrand uses Space Grotesk + Inter
- Do not use pure black `#000000` — the brand color is `#262527`
- Do not add CSS keyframe animations for feature/industry card SVGs — they use GSAP timelines
- Do not use animated rotating border on service cards — it was replaced with cursor-following glow
- Do not add a green pulsing dot to the hero badge — it was removed
- Do not animate `width`, `height`, `top`, or `left` — GSAP uses `transform`/`opacity` only
- Do not add images to the hero section — it is intentionally text-only with abstract orbs/particles
- Do not center the CTA band content — it is a 2-column left/right layout
- Do not add the card pages to `sitemap.xml` or remove their `noindex` — they are private digital business cards

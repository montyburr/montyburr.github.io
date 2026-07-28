# Design Notes — reference analysis

Source: `portfolio-reference/website1/` (21 frames, `w1_000s.png`–`w1_040s.png`, every 2s of a
42s scroll-through) and `portfolio-reference/website2/` (15 frames, `w2_000s.png`–`w2_014s.png`,
every 1s of a 15s hover interaction on a projects list). Note: the brief referred to a `reference/`
folder; the screenshots are actually at the repo-root `portfolio-reference/` — using that path
throughout.

All hex values below were sampled directly from pixel data in the PNGs (via a small script reading
raw RGB values at specific coordinates), not eyeballed — except where marked "visual estimate",
where anti-aliasing made it hard to land on a clean pixel and the value is a best-guess from
looking at the frame.

---

## 1. Section order (website1)

1. **Hero** (`Home`) — name, rotating tagline, CTA buttons, location.
2. **About Me** — two-column: bio copy (left) + a bordered panel with a `</>` icon (right).
3. **Technical Skills** — 5 category cards in a 3-then-2 grid (Frontend, Backend, Databases,
   Cloud/Tools, Concepts), each a bullet list.
4. **Featured Projects** — the section website2 replaces. One large bordered container holding a
   media banner, project title + status badge, description, tech-tag pills, action buttons, and a
   4-column "case study" grid (The Problem / Architecture / Challenges Solved / What I Learned)
   per project, repeated per project inside the same outer frame.
5. **Experience** — vertical timeline, alternating left/right entry cards off a central line.
6. **Achievements** — 2-column cards with a circular icon badge.
7. **Contact ("Let's Connect")** — centered heading, bordered card with an underline-style form
   (Name / Email / Message), gradient "Send Message" pill, fallback mailto line, 5 circular social
   icons.
8. **Footer** — plain copyright line, full-width, outside the contact card.

Nav order matches 1:1 — Home, About, Skills, Projects, Experience, Achievements, Contact — as a
single floating pill.

## 2. Section order (website2 — projects reference)

Not a full page; a single "Selected Projects" module: small logo mark + "SELECTED PROJECTS" label
top-left, hamburger icon top-right, a rotated email address running up the left edge, a thin
vertical scroll-progress line on the far right, and a stack of 6 full-width numbered project rows
(`01.`–`06.`) each with a huge title, a small tech-tag line underneath, and a thin divider before
the next row.

## 3. Layout grid & spacing rhythm

**website1**
- Content column reads as a centered container roughly 1100–1150px wide against a 1600px-wide
  capture — generous side margins.
- Nav: floating pill, centered, ~40px tall, sits with a visible top gap over the hero; once
  scrolled past the hero it re-docks flush to the very top of the viewport (still centered, still
  pill-shaped) — a sticky/pinned nav, not a nav that disappears.
- Section vertical rhythm: large, roughly 96–130px of breathing room between a section's last
  element and the next section's heading.
- Two-column split (About): ~60/40, text left, media right.
- Skills grid: 3 columns on the first row, 2 on the second (5 cards total), even gaps (~35–40px).
- Achievements: 2 columns.
- Experience: single center line, alternating card left/right, generous vertical gap between
  timeline nodes (~150–200px).
- Cards consistently: 1px border, ~12–16px border-radius, generous internal padding (~28–32px).

**website2**
- Full-bleed rows, no card chrome at all — a flat list, not a grid of boxes.
- Each row: a large title line + a small tag line underneath + a thin 1px divider before the next
  row. Vertical rhythm per row looks like ~110–120px including the divider gap.
- The floating preview thumbnail is fixed to the upper-right quadrant of the viewport, not
  attached to the row itself — it's independently positioned and just happens to track roughly to
  the hovered row's vertical position (see §6).

## 4. Colour palette (sampled)

**website1**
| Role | Hex | Notes |
|---|---|---|
| Page background | `#030509` | near-black, faint blue tint |
| Elevated card background | `#101216` | skills/project cards |
| Card border (resting) | `#23292c` – `#2a2d2a` | subtle, low-contrast |
| Display heading (name) | `#f0e5c1` | warm cream, not pure white |
| Accent gold (tagline, links, active nav, headings-within-cards) | ~`#cdaa30`–`#d1a428` (button fill sampled at `#dab74d`) | varies slightly — treat as one gold accent with a lighter tint for filled buttons |
| Muted/inactive nav text | `#515151` | |
| Body copy / muted paragraph text | ~`#e6e6e6` off-white / ~`#9a9a9a` muted gray (visual estimate — anti-aliasing made exact sampling unreliable) | |

**website2**
| Role | Hex | Notes |
|---|---|---|
| Page background | `#1a1a1a`–`#1b1b1b` | dark charcoal — noticeably *lighter* than website1's near-black |
| Hover accent (green) | `#23e459` | vivid green — **this is the one thing we recolour to gold** |
| Idle title text (row not hovered, no other row active either) | `#dedede` | brighter than I first assumed |
| Dimmed title text (a *different* row is actively hovered) | `#4d4d4d` | siblings dim further than their true idle state |

## 5. Typography

- **Display/serif** (website1 name, section-internal headings like "Frontend", timeline
  role titles, tagline): a high-contrast serif with ball terminals and a double-story "g" —
  reads like **Playfair Display** or a close relative. Used only for short, emphasized strings,
  never body paragraphs.
- **Sans** (nav, body copy, subtitle line, buttons, tags, form labels): a clean geometric/rounded
  sans — reads like **Poppins** or **Inter**. This carries all reading-length text.
- Rough size jumps (website1, estimated from frame proportions): hero name ~72–80px, tagline
  serif line ~40px, section H2 ("About Me", "Technical Skills", etc.) ~28–32px, card headings
  ~20px, body ~16–17px, small-caps eyebrow label ("HI, I'M") ~14px with wide letter-spacing
  (~0.15–0.2em) and full uppercase.
- Small-caps-style labels (eyebrow line, nav items) are not true small-caps — they're
  regular-case sans text set in a smaller size with wide tracking.
- **website2**: the huge numbered titles are a bold, condensed/compressed grotesk (tall,
  narrow counters, heavy weight) — reads like **Anton** or Archivo Black Condensed. The small
  label ("SELECTED PROJECTS"), row numbers, and tech tags use a plain sans at a small size with
  moderate letter-spacing on the all-caps label specifically.

## 6. Component shapes & effects

- **Buttons**: fully pill-shaped (`border-radius: 999px`), two variants — solid gold-gradient
  fill with dark text, and outlined (1px gold border, gold text, transparent fill). Both used
  side-by-side in the hero and repeated in project cards ("Live Demo" / "GitHub").
- **Nav**: pill-shaped container, dark translucent fill (looks like a blurred/semi-transparent
  background, not solid), thin 1px border.
- **Cards** (skills, achievements, project detail-grid boxes): 1px border, ~12–16px radius, flat
  dark elevated fill, no shadow at rest.
- **Hover state on cards**: border switches to gold and the whole card gets a soft gold glow
  (box-shadow), plus — distinctly — a soft circular gold spotlight appears to hover **inside**
  the card, tracking the cursor position (visible in `w1_016s.png`/`w1_018s.png`). This is a
  cursor-follow radial-gradient spotlight layered over the card, not just a border change.
- **Big project container** (website1): the entire "Featured Projects" section sits inside one
  large bordered frame with a gold 1px edge, visible on all sides across multiple scroll frames —
  the projects aren't separate floating cards, they're panels inside one continuous frame.
- **Timeline**: a vertical 1px gold line down the center; each entry has a small solid gold dot
  node on the line. There also appears to be a second, independently-moving small dot that tracks
  scroll position along the same line (a scroll-progress marker distinct from the fixed entry
  nodes) — inferred from its position shifting between frames independently of the entry nodes.
- **Form inputs** (Contact): no boxes — plain text baseline with a thin 1px underline, label
  text visible above/inside as a placeholder-style prompt. Minimal, not bordered-box inputs.
- **Social icons** (footer): circular, 1px border, icon centered, dark fill — same visual
  language as the achievement icon badges.

**website2 (to be recoloured/retypeset for our Projects section)**
- No card chrome at all — this section's whole visual identity is typographic + a floating
  image, not boxes.
- Numbered prefix (`01.`, `02.`...) sits to the left of each title, smaller and dimmer than the
  title itself.
- Floating preview thumbnail: a plain rectangular screenshot (hard corners, no radius visible),
  modest drop shadow, no border — positioned upper-right, independent of row position, and it
  visibly **cross-fades** between two project screenshots during a transition rather than
  swapping instantly (see `w2_009s.png` — you can see both images ghosted together mid-fade).
- A small icon appears next to the currently-hovered title (looked like an external-link glyph
  for some rows, a pencil/edit-ish glyph for others in these frames — possibly it's actually a
  consistent icon and the apparent difference is just motion blur/frame timing; worth treating as
  one consistent "view project" icon rather than reproducing per-row icon variance).

## 7. Inferred animation/motion (2s-apart / 1s-apart deltas)

**website1**
- **Rotating typewriter tagline**: cycles through multiple short phrases ("Building Real-Time
  Systems." → "React · Node.js · SAP · Supabase." → "Full-Stack Software" → ...), typing
  character-by-character with a blinking cursor, fully erasing before the next phrase types in.
  This is the one clearly "designed" text animation on the page.
- **Ambient particle/constellation field**: many small gold dots with faint connecting lines
  between nearby dots, positions drifting slightly frame-to-frame (confirmed by comparing
  `w1_000s`→`w1_006s` — dot positions shift a few px, lines redraw between different neighbors).
  Dense in/around the hero. A handful of single glowing dots also appear near headings/cards
  further down the page (About, Skills, Achievements, Contact) — could be the same canvas
  extending the full page height at low density, or independent decorative accents; I can't tell
  which from stills, so I'd implement it as one canvas spanning at least the hero (required by
  the brief anyway) and treat the further-down dots as optional/skippable if they turn out to be
  a separate mechanism.
- **Sticky nav re-dock**: floats with top margin over the hero, then pins flush to the viewport
  top once you scroll past it.
- **Card hover**: border + glow fade in, plus the cursor-spotlight effect described in §6.
- **Card entrance**: cards appear to already be in place with no obvious fade/slide-in visible
  between frames (unlike our current site's scroll fade-in) — I did not see evidence of an
  entrance animation here, just hover states.
- **Scroll-linked timeline dot**: a second marker seems to slide along the timeline's vertical
  line as you scroll (see §6).

**website2**
- **Hover highlight wipe**: the title text transitions between muted and accent color via what
  looks like a left-to-right wipe rather than an instant swap — `w2_007s.png` and `w2_009s.png`
  both catch a row mid-transition with half the word one color and half the other.
- **Sibling dimming**: hovering any row doesn't just brighten that row — it also dims the
  *other* rows further (idle-no-hover state `#dedede` vs. dimmed-while-sibling-hovered `#4d4d4d`).
- **Floating thumbnail**: appears/repositions to roughly track the hovered row's vertical
  position, with what looks like easing/lag (it doesn't snap instantly — compare `w2_010s` to
  `w2_011s`, cursor is already back on row 1 but the thumbnail is still mid-move), and
  cross-fades its image content between projects rather than cutting.
- A small dot-indicator was visible under the tag row briefly in the very first frames of
  website1's project section (not website2) — likely a media carousel dot for that one project's
  own screenshot set, not relevant to the row-list pattern we're borrowing.

---

## What I'll build from this (summary before coding)

- Adopt website1's palette (near-black `#030509` bg, cream `#f0e5c1` display text, gold
  `~#d1a428`/`#dab74d` accent), pill nav (floating → sticky-docked on scroll), rotating typewriter
  tagline, pill CTA buttons, card hover glow + cursor-spotlight, particle canvas in the hero.
- For Projects: website2's numbered full-width row list + cursor-follow floating preview +
  hover-wipe + sibling-dimming, recoloured to the gold accent instead of green, title type set in
  website1's serif/weight scale rather than the condensed grotesk (per your instruction to
  retypeset so it matches, not look bolted on), tech tags as small dot-separated text (matching
  website2) rather than website1's pill-chip tag style, since that's part of *this* section's
  borrowed identity.
- No content on your site maps to: the 4-column "Problem/Architecture/Challenges/What I Learned"
  per-project case-study grid, the Achievements section (LeetCode/IIT Madras-style), or a
  functioning name+email+message contact **form** (yours is currently mailto links). I'm not
  filling these with placeholder text — flagging them for you in the chat now that this is
  written, per your instruction.

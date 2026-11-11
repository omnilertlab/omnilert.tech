# Ventriloc — Design System for omnilert.tech

> Editorial data observatory on warm paper — a single orange ember punctuating
> monochrome precision.

**Theme:** light/dark. **Light is canonical** — every token below is the light
value verbatim. **Dark is a faithful role-for-role translation** of the same
tokens, structure, and rules, not a different design.

Source: Refero Styles — Ventriloc
(https://styles.refero.design/style/f99aca3e-5289-4595-a7cc-77a72052f4b8).
Implemented in `src/index.css`; light tokens are `:root`, dark roles are
`[data-theme='dark']`. Light is the site default; the toggle in the header
switches themes.

## Colors

| Name | Light (canonical) | Token | Role |
|------|-------|-------|------|
| Graphite | `#202020` | `--color-graphite` | Primary text, headings, nav links, icon strokes |
| Canvas White | `#ffffff` | `--color-canvas-white` | Page background, card elevation |
| Ash | `#efefef` | `--color-ash` | Primary card and section background, nav pill container |
| Fog | `#f5f5f5` | `--color-fog` | Subtle background for nested surfaces |
| Ivory | `#ebe6dd` | `--color-ivory` | Warm accent background wash for featured blocks |
| Steel | `#4d4d4d` | `--color-steel` | Secondary body text |
| Slate | `#828282` | `--color-slate` | Muted helper text, tertiary nav items |
| Mist | `#e8e8e8` | `--color-mist` | Hairline dividers |
| Ember Orange | `#ff682c` | `--color-ember-orange` | Orange text accent for links, tags, emphasized short phrases. **Do not promote it to the primary CTA color.** |
| Brass | `#816729` | `--color-brass` | Secondary accent for chart strokes, decorative lines, tag text |

### Dark translation (role-for-role)

| Role | Light | Dark |
|------|-------|------|
| Page background (`--bg`) | Canvas White `#ffffff` | Warm graphite `#121210` |
| Primary surface (`--surface` / Ash) | Ash `#efefef` | Graphite `#202020` |
| Nested surface (`--surface-2` / Fog) | Fog `#f5f5f5` | `#1c1c1a` |
| Ivory wash (`--ivory`) | Ivory `#ebe6dd` | `#2a2a27` |
| Primary text (`--ink` / Graphite) | Graphite `#202020` | Warm ivory `#f5f2ea` |
| Secondary text (`--muted` / Steel) | Steel `#4d4d4d` | `#a8a49b` |
| Muted text (`--muted-2` / Slate) | Slate `#828282` | Slate `#828282` |
| Divider (`--line` / Mist) | Mist `#e8e8e8` | `#33332f` |
| Ember Orange (`--ember`) | `#ff682c` | `#ff682c` (unchanged) |
| Brass (`--brass`) | `#816729` | `#816729` (unchanged) |
| Primary CTA fill (`--cta-bg` / `--cta-text`) | Graphite `#202020` / white | Warm ivory `#f5f2ea` / `#121210` (the same anchor, inverted so the filled button stays legible on a dark canvas) |
| Data card background (`--data-card-bg`) | Canvas White `#ffffff` | Graphite `#202020` |

## Typography

- **PolySans** for headings and display text, **weight 400 only**,
  letter-spacing `-0.02em`. Substitute: Inter Tight or Space Grotesk at
  weight 400. Font stack: `'PolySans', 'Inter Tight', 'Space Grotesk', system-ui, sans-serif`.
- **Inter** for body copy, UI labels, button text, captions, metadata.
  Weights 400 / 500 / 600, sizes 12–18px, line height 1.15–1.50.

| Role | Size | Line height | Letter spacing |
|------|------|-------------|----------------|
| display | 66px | 0.91 | -1.32px |
| heading-lg | 40px | 1.2 | -0.8px |
| heading | 32px | 1.19 | -0.64px |
| subheading | 18px | 1.25 | 0px |
| caption | 14px | 1.43 | 0px |

Classes: `.text-display`, `.text-heading-lg`, `.text-heading`,
`.text-subheading`, `.text-caption` in `src/index.css`.

## Spacing & layout

- Base unit 4px; density comfortable.
- Section gap **80px**, element gap **20px**, card padding **40px**.
- Page max-width **1200px** (`.container-ventriloc`).

## Border radii

| Element | Value |
|---------|-------|
| tags | 20px (`.tag`) |
| cards | 8px (`.card`) |
| buttons | 0px (`.btn`) |
| nav-pills | 200px (`.pill-nav`) |
| asymmetric-card | 6px 0px 0px (`.card-asym`) |

## Components

- **Primary CTA** (`.btn-primary`): dark filled Graphite `#202020`, white
  text, 0px corners, PolySans 16px weight 400, padding 10px 20px, no shadow.
  In dark theme the fill inverts to warm ivory (see table above).
- **Ghost outlined button** (`.btn-ghost`): transparent, 1px Graphite border,
  Graphite text, 0px radius, same padding and type.
- **Navigation pill** (`.pill-nav`): Ash `#efefef` background, 200px radius,
  8px vertical / 18px horizontal padding, PolySans 16px items.
- **Asymmetric card** (`.card-asym`): Ash background, radius 6px 0px 0px,
  70px top / 60px left padding.
- **Data dashboard card** (`.card-data`): white surface, 20px radius,
  40px padding, charts with Ember Orange and Brass strokes.
- **Hero**: 66px PolySans headline (line-height 0.91), 18px Inter Steel
  subtext, two-column split — headline + dual-button CTA stack on the left,
  three overlapping data dashboard cards on the right.
- **Link with orange underline** (`.link-ember`): 1px Ember `#ff682c`
  underline, offset 3px. Used sparingly, for the one or two most important
  links per page.
- **Section divider**: no visible line — sections are separated by 80px
  whitespace and alternating white / Ash bands (`.band-ash`, `.band-ivory`).

## Rules (do not break these)

- Use PolySans exclusively at weight 400 for all headings — **never bold**
  the display type.
- Keep pages **95% achromatic**; Ember Orange appears only as link
  underlines, chart highlights, and small icon accents.
- **Do not use Ember Orange as a filled button background.**
- **Do not add box-shadows** to cards or buttons — depth comes from surface
  color contrast, not elevation.
- Do not use symmetric border-radius on feature cards; the asymmetric
  6px 0px 0px and the 0px button radius are deliberate contrast.
- **Do not introduce blue, green, or other chromatic colors** — Ember +
  Brass are the limit.
- Do not set line-height above 1.25 on display headings.
- Use 20px element gaps and 80px section gaps; separate sections by
  alternating surface bands rather than dividers or shadows.
- Pair Inter for all body and UI text; PolySans for headings, nav items,
  and button labels only. Letter-spacing -0.02em on every PolySans element.

## Imagery

Visuals are almost entirely data-driven: chart widgets, circular progress
indicators, and stat cards in a flat, minimal style with thin Ember and Brass
strokes. No lifestyle photography, no stock imagery, no hero illustrations.
The charts ARE the imagery. Icons are thin-stroke, monoline, Graphite.

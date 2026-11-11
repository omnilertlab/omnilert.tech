# omnilert.tech

Omnilert — an independent startup in active development. This is the company site:
a Ventriloc-inspired, multi-page animated site with a Control Room
admin for editing the site's copy, divisions, updates, and early-access inbox.
Light is the default theme; dark is a faithful role-for-role translation of
the same tokens (see `DESIGN.md`).

**Positioning is a draft.** Every word on the site is editable from the Control
Room (`/admin`) — the story sharpens as the product does. This site is not
affiliated with any other company named Omnilert.

## Pages

- `/` — Home: Signal Observatory hero, ticker, about, how it works, divisions, updates, early access
- `/app` — Omnilert App: the product people use every day
- `/lab` — Omnilert Lab: R&D, detection prototypes, alert-fatigue research, field notes
- `/archive` — All updates grouped by year, filterable by division
- `/team` — Principles and divisions-as-teams (no individual profiles yet)
- `/admin` — Control Room: edit site copy, divisions, updates, and the inbox

## Design

Ventriloc, from [Refero Styles](https://styles.refero.design/style/f99aca3e-5289-4595-a7cc-77a72052f4b8) — full spec in [`DESIGN.md`](DESIGN.md):

- Light canonical tokens: Graphite `#202020`, Canvas White `#ffffff`, Ash
  `#efefef`, Fog `#f5f5f5`, Ivory `#ebe6dd`, Steel `#4d4d4d`, Slate `#828282`,
  Mist `#e8e8e8`, Ember Orange `#ff682c`, Brass `#816729`. Dark translates
  each role (page `#121210`, surface `#202020`, ivory text `#f5f2ea`); Ember
  and Brass keep their exact values. Pages are ~95% achromatic.
- Headings in PolySans (Inter Tight / Space Grotesk fallback) at weight 400
  only, letter-spacing -0.02em; display 66px / 0.91, heading-lg 40px,
  heading 32px, subheading 18px. Body in Inter. No bold headings.
- Primary CTA: Graphite filled, white text, 0px corners, PolySans 16px 400,
  10px 20px padding. Ghost: 1px Graphite border, transparent. Ash pill nav
  (200px radius). Asymmetric cards 6px 0px 0px, data cards 20px radius,
  regular cards 8px, 40px padding, 80px section gaps, 1200px max-width.
  No box shadows, no Ember-filled buttons, no blue/green.
- Animated: word-by-word hero headline, scroll reveals, count-up stats,
  infinite signal ticker, scanning Signal Observatory panel (its timer only
  runs while on screen), hover-lift cards, page transitions.
  Respects `prefers-reduced-motion`.
- Routing is real client-side routing (`react-router-dom`). Scroll buttons
  scroll in place without changing the route — the old hash-section bug
  (buttons landing on "That page isn't here") is fixed by design.

## Stack

Vite 6 + React 19 + TypeScript + Tailwind CSS 4, `react-router-dom` 7.
No server backend in this repo.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # type-check + production build into dist/
npm run preview # serve the production build locally
```

## Content & admin — how the backend works here

The hosted preview artifact had a server backend. This standalone repo
version uses local data instead, until a backend is wired up:

- `src/content.json` is the source of truth shipped in the repo (hero copy,
  about, how-it-works, both divisions with long descriptions + 4 features
  each, updates, ticker items, footer note).
- The Control Room (`/admin`) edits that content in the browser and persists
  edits to `localStorage` for preview. Use **Export content.json** in the
  Control Room to download the edited file, replace `src/content.json`, and
  commit it to make changes permanent for everyone.
- Early-access form submissions are saved to `localStorage` and appear in the
  Control Room inbox, where they can be marked handled or deleted.

## Deploy

**Vercel (recommended):** import this repo, framework preset Vite, build
command `npm run build`, output directory `dist`. SPA routing works out of
the box.

**GitHub Pages:** the repo includes `.github/workflows/deploy.yml`, which
builds and publishes `dist/` to Pages on every push to `main`. Set the repo's
Pages source to "GitHub Actions". `public/404.html` restores deep links
(`/app`, `/lab`, …) after a hard refresh. If Pages hosts this as a project
site (`omnilertlab.github.io/omnilert.tech/`), set `base: '/omnilert.tech/'`
in `vite.config.ts` first.

**Custom domain:** point `omnilert.tech` at your host (Vercel / Pages) and
keep `base: '/'` in `vite.config.ts`.

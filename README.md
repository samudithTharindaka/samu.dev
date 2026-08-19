# Samu.dev Portfolio

Cinematic single-page portfolio for Samudith Tharindaka — full-viewport snap scenes on home, nested routes for works and journeys.

## Run

```bash
npm install
npm run dev
```

## Customize content

Edit files in `src/content/`:

| File | What it controls |
|---|---|
| `site.ts` | Name, nav, about lines, works hub labels |
| `projects.ts` | Web project cards + detail copy/links |
| `journey.ts` | Timeline milestones + game gallery images |
| `contact.ts` | Contact placeholders (email, socials, form) |
| `logos.ts` | Brand logo imports for the about timeline |

## Customize motion

| File | What it controls |
|---|---|
| `src/styles/tokens.css` | Durations, easing, colors, type scale |
| `src/motion/sceneController.ts` | Snap behavior (wheel / keys / touch) |
| `src/motion/useReveal.ts` | Reusable enter animations |
| `src/motion/drawLine.ts` | SVG staircase draw helper |
| `src/motion/lenis.ts` | Smooth scroll on nested pages |

Scene-local animations live in each scene/page `useEffect` — tweak freely.

## Routes

- `/` — Hero → About → Works → Contact (snap)
- `/works/web` — Web projects grid
- `/works/web/:slug` — Project detail
- `/works/games` — Game gallery
- `/journey/interactive` | `/journey/business` — Career timelines

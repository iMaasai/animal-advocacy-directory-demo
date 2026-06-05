# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Type-check with tsc (no dedicated test suite)
```

Deployment is automatic on push to `main` via Vercel.

## Architecture

This is a single-page React 19 + TypeScript app built with Vite. There is no backend — all data is static.

**Data flow:**
- `constants.ts` is the single source of truth: it holds the `ORGANISATIONS` array plus the `REGIONS`, `FOCI`, and `SPECIES` filter options.
- `App.tsx` owns all application state (`filters`, `currentView`, modal open/close, `isBlueprint`) and passes props down. There is no global state library.
- Filtering is a `useMemo` in `App.tsx` that runs over `ORGANISATIONS` on every filter change.

**Two views** are toggled via `currentView` state:
- `'directory'` — `Hero` + `Sidebar` + `OrgCard` grid
- `'map'` — `MapView` (D3 Geo + TopoJSON SVG map of Africa)

**Modals** (`ShareModal`, `FeedbackModal`, `OrgDetailModal`, `GetListedModal`) all live in `components/Modals.tsx` and are controlled from `App.tsx`.

**Styling:** Tailwind CSS loaded via CDN (configured in `index.html`), not installed as a PostCSS plugin. Brand colours are inline Tailwind arbitrary values: `#1db4ab` (teal), `#7970af` (purple), `#b2a942` (gold), `#282e3e` (dark).

**Blueprint mode** is a CSS `filter: grayscale` + contrast overlay toggled by the `isBlueprint` boolean; styles are injected as a `<style>` block inside `App.tsx`.

## Managing Organisation Data

All org data lives in `constants.ts` (`ORGANISATIONS` array). To add an org, copy an existing entry — the required shape is defined in `types.ts` (`Organisation` interface). Use lowercase-kebab-case for `id`. For logos, paste a Google Drive share link; `getDirectDriveUrl()` (in `constants.ts`) converts it to a direct image URL. Leave `logo: ''` for an initial-letter fallback.

Valid `species` and `focus` values must match the exact strings in the `SPECIES` and `FOCI` arrays in `constants.ts` — the filter matching is case-insensitive substring but the canonical strings are defined there.

If adding an org from a country not yet represented, add the country to the `REGIONS` array too.

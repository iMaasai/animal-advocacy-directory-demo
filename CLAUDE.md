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

**Styling:** Tailwind CSS loaded via CDN (configured in `index.html`), not installed as a PostCSS plugin. Brand colours are available both as named aliases (`offwhite`, `brandteal`, `brandpurple`, `brandgold`, `branddark`) defined in the `tailwind.config` block in `index.html`, and as inline arbitrary values. Both are used in the codebase — prefer the named aliases for clarity.

**Typography:** `Droid Serif` is the default body/heading font. `Lato` is available via the `.lato-font` utility class (used on buttons and labels). Both are loaded via Google Fonts in `index.html`.

**Blueprint mode** is a CSS `filter: grayscale` + contrast overlay toggled by the `isBlueprint` boolean; styles are injected as a `<style>` block inside `App.tsx`.

**Analytics:** `@vercel/analytics` is integrated via `<Analytics />` in `App.tsx`. Use `track('Event_Name', { ...props })` from `@vercel/analytics/react` when adding new interactive elements (outbound links, CTAs). Existing call sites are in `components/Modals.tsx`.

**importmap:** `index.html` contains an importmap that loads React, react-dom, and lucide-react from esm.sh. If package versions are bumped in `package.json`, the importmap URLs in `index.html` must be updated to match.

## Known Stubs / Disabled Features

- **FeedbackModal** (`components/Modals.tsx`): `handleSubmit` uses a `setTimeout` to simulate a network request. Feedback is not actually sent anywhere — the modal is a UI prototype.
- **Sort dropdown** (`App.tsx`): The "Sort by" select in the directory header is decorative — there is no sort handler wired up.
- **Recommendation engine** (`components/Modals.tsx:274`): The "Similar Organisations" section in `OrgDetailModal` is disabled via a hardcoded `false &&` guard. The scoring logic (species × 10 + focus × 5 + region × 5) is intact but hidden pending refinement. See `RECOMMENDATION_ENGINE_STATUS.md` for details.

## Managing Organisation Data

All org data lives in `constants.ts` (`ORGANISATIONS` array). To add an org, copy an existing entry — the required shape is defined in `types.ts` (`Organisation` interface). Use lowercase-kebab-case for `id`. For logos, paste a Google Drive share link; `getDirectDriveUrl()` (in `constants.ts`) converts it to a direct image URL. Leave `logo: ''` for an initial-letter fallback.

Valid `species` and `focus` values must match the exact strings in the `SPECIES` and `FOCI` arrays in `constants.ts` — the filter matching is case-insensitive substring but the canonical strings are defined there.

`org.country` supports comma-separated values for organisations operating across multiple countries (e.g. `'Kenya, Uganda, Nigeria'`). `OrgDetailModal` splits on commas when displaying. The `type Region = string` definition in `types.ts` doesn't reflect this — treat the field as a CSV string.

If adding an org from a country not yet represented, add the country to the `REGIONS` array too. Also update the hardcoded country list in `handleQuickFilter` (`App.tsx`) if the new country should appear as a quick-filter chip in `Hero`.

# Improvement Opportunities

Audit conducted 2026-06-05. Findings grouped by category, ordered within each by impact.

---

## Quick Wins (High-Impact, Low-Effort)

- **Enable "Similar Organisations"** — Remove the `false &&` guard at `Modals.tsx:274`. The scoring algorithm is intact; the UI just needs the flag lifted and the weights reviewed (see `RECOMMENDATION_ENGINE_STATUS.md`).
- **Implement sort** — The sort dropdown (`App.tsx:131`) renders but has no handler. Wire up A-Z, Newest (by `id` insertion order), and Featured sorts.
- **Accessibility: aria-labels on icon buttons** — `OrgCard.tsx` and `Modals.tsx` render icon-only links (website, social, email) with no `aria-label`. Add e.g. `aria-label="Visit official website"`.
- **Accessibility: Search input label** — `Hero.tsx` search input uses placeholder text only; add `aria-label="Search organisations"`.
- **Pre-compute sorted arrays** — `Modals.tsx:248,262` calls `[...org.focus].sort()` and `[...org.species].sort()` on every render. Sort once in `constants.ts` or memoize.

---

## UX / Feature Gaps

- **Filter by "has website" / "has social"** — 20+ orgs have empty `website` or `social` fields. A checkbox filter would help users find only orgs they can reach.
- **Quick filter parity** — `handleQuickFilter` (`App.tsx:49`) hardcodes 7 countries. Should be derived from actual org counts to stay in sync automatically.
- **Map → directory feedback** — Clicking a country in `MapView` filters the directory but gives no visual confirmation which country is active in the `Sidebar`. Sync the selected region filter chip.
- **Empty-state detail** — When no orgs match filters, the empty state (`App.tsx:150`) doesn't say which filter caused it. Naming the active filters helps users self-correct.

---

## Code Quality

- **XSS risk: innerHTML in OrgCard** — `OrgCard.tsx` logo error handler sets `target.parentElement.innerHTML` directly using `org.name`. If `org.name` ever contains HTML characters, this is an injection point. Replace with DOM manipulation or a fallback React state flag.
- **Duplicate country-parsing logic** — `org.country.split(',')` appears independently in `OrgCard.tsx:25`, `Modals.tsx:113`, and `MapView.tsx`. Extract to a shared `parseCountries(country: string): string[]` utility in `constants.ts`.
- **Hardcoded countries in filter logic** — `App.tsx:49` and `Modals.tsx:122` both lowercase/check country strings independently. Consolidate into one normalisation helper.
- **Pan-African case sensitivity** — `Modals.tsx:124` checks `.includes('pan-african')` after `.toLowerCase()` — correct — but `App.tsx:35` does `org.country.includes(r)` without normalising case. A Pan-African org won't match a region filter for "Pan-African" if cases differ.
- **`window.location.href` in ShareModal** — `Modals.tsx:348` accesses `window` directly; wrap in a check or move to a prop for testability.
- **Blueprint styles re-inject on every render** — The `<style>` block in `App.tsx:65-88` is recreated each render. Move to a static CSS class in `index.html` or a CSS module.

---

## Performance

- **geojson not cached** — `MapView.tsx` fetches the geojson on every mount. Cache in a module-level variable or `sessionStorage` so view-toggling doesn't re-fetch.
- **No debounce on search** — `Hero.tsx` search updates fire on every keystroke, re-running the `useMemo` filter over the full `ORGANISATIONS` array. A 150–200 ms debounce would reduce work.
- **Images missing width/height hints** — Lazy-loaded logos in `OrgCard.tsx` and `Modals.tsx` have no `width`/`height` attributes; browsers can't reserve space, causing cumulative layout shift.

---

## Accessibility

- **Map: SVG paths not keyboard-navigable** — Country `<path>` elements in `MapView.tsx` have `onClick` but no `tabIndex` or `role="button"`, so keyboard-only users can't interact with the map.
- **Modal focus trap missing** — All four modals lack a focus trap; Tab key escapes the modal into background content. Use a library or manual trap on `keydown`.
- **Backdrop click closes modal without keyboard confirmation** — Fine for mouse users, but users navigating by keyboard can accidentally dismiss by tabbing out.
- **Footer emoji as content** — `Footer.tsx` uses a `🩵` emoji as visible content; wrap in `<span aria-hidden="true">` and provide adjacent text for screen readers.
- **`<Info>` icon in disclaimer banner** — `App.tsx:114` renders an icon with no `aria-label`; the banner text is descriptive enough, so `aria-hidden="true"` on the icon would suffice.

---

## Data Integrity

- **Untyped `Focus` and `Species`** — `types.ts` defines these as `type Focus = string`. Replacing with union types (or enums) derived from the `FOCI`/`SPECIES` constants would catch typos at compile time.
- **Inconsistent species labels** — Some orgs use shortened species strings (e.g. `'Chickens'`) that won't substring-match the canonical `'Chickens (broilers and laying hens)'` string from `SPECIES`. Audit `constants.ts` for consistency.
- **Empty required fields not validated** — 16+ orgs have `address: ''`, 20+ have `website: ''`. Consider a build-time validation script that logs warnings for incomplete entries.
- **Social URL scheme inconsistency** — Some `social` values omit `https://`; `Modals.tsx:225` patches this with a `startsWith('http')` guard, but `OrgCard.tsx` may not. Normalise URLs in `constants.ts`.

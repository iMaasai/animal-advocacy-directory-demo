# Recommendation Engine Status

## Overview
The "Similar Organisations" recommendation engine has been temporarily disabled in the user interface because the weighting/scoring logic was not yielding the expected quality of recommendations.

## Changes Made
- **File**: `components/Modals.tsx`
- **Component**: `OrgDetailModal`
- **Action**: The UI rendering condition for the similar organizations section was manually overridden to `false`.

```tsx
// components/Modals.tsx - Line ~274
{false && similarOrgs.length > 0 && (
  <div className="mt-16 pt-10 border-t border-[#e1e9de]">
    {/* ... UI for Similar Organisations ... */}
  </div>
)}
```

## Current Scoring Logic (Pending Review)
The background logic is still computationally intact, but hidden. It calculates similarity as follows:

1. **Species Override (10 pts)**: Overlapping species between two organizations carry the highest weight. (10 points per shared species).
2. **Focus Areas (5 pts)**: Overlapping programme/intervention focus areas. (5 points per shared focus).
3. **Region / Country Operations (up to 5 pts)**:
   - 5 points per specific shared country.
   - If there is no specific country match but one of the organizations is 'Pan-African', a base overlap score of 5 is awarded.

```ts
// components/Modals.tsx - Line ~115
const similarOrgs = ORGANISATIONS
  .filter(o => o.id !== org.id)
  .map(o => {
    // ...
    let countryScore = sharedCountryCount * 5;
    if (countryScore === 0 && isPanAfrican) {
      countryScore = 5;
    }
    
    return { 
      org: o, 
      score: (sharedSpecies * 10) + (sharedFocus * 5) + countryScore 
    };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)
  .map(item => item.org);
```

## Next Steps
When we return to this feature, we need to refine the variables and weights. For example:
- Determine if regional overlap should be weighted higher than focus overlap.
- Implement specialized weighting for specific high-value features.
- Remove the `false &&` boolean flag in `Modals.tsx` once the logic is finalized.

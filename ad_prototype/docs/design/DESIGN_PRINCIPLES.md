# 홍보잇다 — Current Design Principles

Current operating policy: [DESIGN_MAINTENANCE.md](../../DESIGN_MAINTENANCE.md). These principles describe the shared design language; they do not request a new reconstruction.

## Identity and service focus

- Official name: **홍보잇다**.
- Use the selected C-concept logo and its approved variants. See the [brand guide](../../public/assets/branding/selected/BRAND_GUIDE.md).
- Keep the warm orange, ivory, and navy identity. `src/design-tokens.css` at the app root is the implementation source for shared colors, sizes, spacing, and surfaces.
- Use visual assets to explain the service and next action. Characters and decorative backgrounds are supporting elements.

## Clear mobile interaction

- Make the next action easy to identify, with natural Korean labels.
- Support senior and first-time users with readable text, strong contrast, comfortable spacing, and touch targets of at least 44 × 44 CSS pixels where practical.
- Pair icons with labels; communicate meaning beyond color alone.
- Preserve Photo → Information → Results, persistent mobile navigation, and result-type tabs unless the user or relevant professor feedback calls for a change.
- Reserve room for fixed controls and mobile safe areas. Avoid horizontal overflow, clipped labels, obscured fields, and inaccessible actions.
- Keep sample outputs, loading, errors, retries, and storage limitations understandable.

## Responsive and accessible presentation

Adapt widths, spacing, and typography within the existing information structure. Preserve comfortable previews and clear save/copy actions on mobile and desktop. Respect keyboard navigation, visible focus, readable selected states, and reduced-motion preferences.

Sound and vibration remain optional. Avoid excessive animation and assets that compete with primary controls. The “three-second understanding” idea is a design heuristic, not a measured result.

## Evidence and historical references

The current mobile requirements and their source images are in the [professor feedback](../../feedback/2026-10-12-professor-uiux-feedback.md). The corresponding [implementation record](../../feedback/2026-10-12-uiux-implementation.md) identifies what was changed and verified.

Earlier full-redesign instructions and phase reports are retained in the [archive](../archive/README.md). They explain past decisions but do not govern routine maintenance.

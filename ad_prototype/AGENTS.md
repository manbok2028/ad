# 홍보잇다 — Working Instructions

## Current operating mode

Preserve the currently validated structure, while allowing changes requested by the user or through additional professor feedback.

**현재 검증된 구조를 유지하되, 추가 교수님 피드백과 사용자 요청에 따라 변경한다.**

For UI work, read [DESIGN_MAINTENANCE.md](DESIGN_MAINTENANCE.md). Use [design principles](docs/design/DESIGN_PRINCIPLES.md) for shared visual rules and relevant files under `feedback/` for task-specific feedback. User instructions determine the requested scope. Historical documents under `docs/archive/` are reference material; their full-redesign directives are not active instructions.

The permanent major-change approval policy in `DESIGN_MAINTENANCE.md` takes precedence over older unrestricted restructuring instructions. Safe local refinements may proceed autonomously; new major structural proposals require explicit user approval. A concrete change already requested by the user is authorized within that scope.

## Development environment

- Preserve the current React 19, Vite 8, TypeScript, and Tailwind CSS v4 setup in `package.json` and `vite.config.ts`.
- Inspect the actual local environment before starting a server. Reuse a working server; otherwise follow [local preview instructions](docs/LOCAL_PREVIEW.md).
- Do not assume that Figma Make, a particular port, or an external preview is running. Do not add absent plugins or configuration files based on archived documentation.
- Preserve existing user changes, secrets, API contracts, downloads, clipboard behavior, and recoverable failure states.

## Relevant source files

- `src/main.tsx`: entrypoint and stylesheet imports.
- `src/App.tsx`: creation state, result tabs, records, and local sample exports.
- `src/StudioScreens.tsx`: common shell, home, creation menu, and navigation.
- `src/index.css`: global styling and Tailwind entrypoint.
- `src/feedback-layout.css`: persistent mobile navigation and tabbed result presentation.
- `src/design-tokens.css`: shared colors, spacing, typography, and control tokens.
- `scripts/verify-professor-feedback.mjs`: focused navigation, tab, and export verification.

Follow imports and inspect additional files only as needed. Keep CSS imports before other rules and use the existing design tokens. Internal refactoring is permitted when it preserves the user-facing flow and fixes a documented issue.

## Verification and reporting

Run the production build and relevant checks for changes that affect behavior. Inspect real browser renders for visual changes; do not claim visual verification from code alone. Explain changes, verification, limitations, and remaining work in Korean.

Use [the documentation index](docs/README.md) to find current references. Preserve original professor feedback and source images. Update links and script paths when moving documents; `scripts/document-paths.mjs` maps historical checkpoint paths.

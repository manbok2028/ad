# Mobile reference implementation — October 12, 2026

Reference: [Professor feedback](2026-10-12-professor-uiux-feedback.md), particularly `10.12.b.png`. The user explicitly requested separating Create from Menu and adjusting photo entry, information entry, results, and saved materials while preserving branding and fixed navigation.

## Create and Menu

- Create contains only four production choices, each with a short description: complete everything, image, video, and promotional copy.
- Menu contains text-size/simple-mode settings, completion-notification settings, usage instructions, plan information, and access to the existing login/signup demo.
- Home's main Create action and desktop/mobile Create navigation open the creation chooser.
- Accessible dialog names identify the two purposes. Shared preferences and existing dialog focus/Escape behavior remain intact.

## Photo and information entry

- The upload area and an existing product-photo example are emphasized. Format and destination controls remain available as optional disclosures.
- Information entry shows the selected photo and allows direct replacement with the existing validated upload handler. Rejected files retain the usable previous image.
- Added an optional store/product name. It is retained in drafts, saved records, generated copy, and local sample media.
- Product description and key features remain required. Audience is optional, placed under additional information, and omitted from generated sentences when empty.
- On mobile work screens, duplicate branding/settings headers are hidden; the sticky read-aloud bar, workflow indicator, and bottom navigation remain available. Settings are accessible through Menu.

## Focused results (reference screens 5–8)

- The selected Image / Video / Copy panel is displayed below the fixed controls.
- Image shows the full PNG preview with Save immediately below it. Video presents the photo-based sample with playback and save controls together. Copy uses a selectable read-only text area, character count, and a prominent Copy All action.
- Optional original-text and publishing guidance remain in disclosures below the main actions.
- Preview display preserves aspect ratio. Responsive sizing keeps the primary result actions within the tested initial viewport.
- The image preview and exported PNG still share the same cached file. Media captions avoid duplicating a separate name headline; full standalone promotional copy retains the name.
- Read-aloud guidance matches the revised chooser/input flow. On the visible copy panel, it reads the full displayed copy and hashtags.

## My Promotional Materials

- Added All / Image / Video / Copy filters and rows with product-photo thumbnails or type icons, title, date, and a reopen action.
- A multi-output creation appears as a result entry for each available kind, backed by the same source record. Opening a row selects its corresponding result tab.
- Records remain session-local; the existing refresh/close warning is retained. Permanent storage was not added.

## Validation

- Production build and TypeScript checks passed.
- Browser checks passed at 320, 375, 390, 430, 768, 1024, and 1440px, with a supplementary short viewport.
- Verified menu separation, chooser entrypoints, available one/two/three-result tabs, pinned control alignment, keyboard navigation, filtered records, selected-tab reopening, and input/name retention.
- Verified valid/invalid photo replacement, reset/undo, clipboard copy, PNG preview/download SHA-256 equality, and video cancellation/export while switching tabs.
- Primary save/copy controls were checked to be visible in the tested initial result viewport. Mobile and desktop screenshots were captured and representative renders inspected.
- A mocked SpeechSynthesis test verified the exact copy text sent for read-aloud; actual voice output depends on the device/browser and was not evaluated acoustically.

## Assets and implementation

The photo example in `public/assets/samples/product-example.png` reuses `D_고혜숙/public/sample-product.png`. The original asset was not changed; no paid AI generation or new external dependency was needed.

Main files: `src/App.tsx`, `src/StudioScreens.tsx`, `src/PhotoStep.tsx`, `src/main.tsx`, `src/mobile-reference.css`, and `scripts/verify-professor-feedback.mjs`.

The pre-change restoration point is `../../ad_restore_archive/.phase4b-mobile-reference-20261012-before/`, relative to the app root. Screenshots and functional evidence are in the task's `outputs/mobile-reference/` directory. Changes are local; no commit, push, or deployment was performed.

## Follow-up: compact reference layout and permanent approval policy

- The user explicitly authorized the reference screens 2–5 adaptation. Create now opens a full-screen mobile chooser and a centered desktop dialog. Its secondary Settings / Usage link changes dialog purpose and resets focus to the new dialog.
- Settings retains its purpose, with four compact secondary creation shortcuts: All, Image, Copy, Video. These reuse the existing creation handler, start at the photo step, and retain the photo and all entered details. No duplicate generation implementation was added.
- The information screen places the selected photo/change action, name, description, key point, and primary action together. Existing optional audience/settings/hashtags remain in an expandable additional-settings area.
- Core information controls fit the tested mobile 844px height and desktop 900px height. Smaller heights, expanded settings, or an open keyboard use natural scrolling rather than reducing accessible text sizes.
- `DESIGN_MAINTENANCE.md` now has a permanent major-change approval policy with precedence over historical restructuring directives. Existing maintenance rules were preserved, with `AGENTS.md` pointing to that policy.
- Build, TypeScript, documentation links, and whitespace checks passed. Browser verification passed at 320, 375, 390, 430, 768, 1024, and 1440px. The four menu shortcuts, retained photo/details, dialog focus, copy/downloads, result tabs, and history behavior were verified. Representative mobile and desktop screenshots were inspected.
- Evidence: task workspace `outputs/compact-approval/`. Restoration point: `../../ad_restore_archive/.phase4b-approval-compact-20261012-before/`.

### Pending major structural proposals

None required to complete this authorized scope. New major proposals must follow the permanent approval policy before implementation.

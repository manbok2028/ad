# 홍보잇다 — Design Maintenance

## Operating rule

**현재 검증된 구조를 유지하되, 추가 교수님 피드백과 사용자 요청에 따라 변경한다.**

Preserve the currently validated structure. Change it when additional professor feedback or the user's request calls for a change. The current structure is a working baseline, not a claim of final professor approval.

Use this document for routine UI maintenance. Read [AGENTS.md](AGENTS.md) for the development environment, [design principles](docs/design/DESIGN_PRINCIPLES.md) for branding, and relevant [feedback records](docs/README.md#feedback) for the current task. Archived redesign instructions are historical references and do not authorize a new redesign.

## Permanent user-approval policy — takes precedence

This policy applies to all future maintenance work. It takes precedence over earlier rules or historical instructions that allow unrestricted restructuring. Existing maintenance rules remain in effect wherever they do not conflict with this policy.

**Intuitive UX and visual clarity are the absolute highest design priorities.** Preserve mobile-first and senior-friendly accessibility, professional visual quality, original asset production/refinement, the official 홍보잇다 identity, and functional reliability. Improving appearance never justifies breaking a working feature or losing user data.

### Safe changes that may proceed autonomously

- Typography, readability, and contrast improvements.
- Local color, spacing, and alignment refinements within the established identity.
- Minor responsive corrections on mobile and desktop.
- Illustration positioning/scaling and regeneration of unsuitable assets using the imagegen skill.
- Replacement of decorative emojis and weak placeholders, without changing the approved logo or brand concept.
- Non-destructive accessibility improvements and minor visual/interaction refinements.

### Major changes requiring explicit user approval

- Major page layouts or section restructuring.
- Navigation and menu architecture changes.
- Modifications to the **사진 → 설명 → 결과** workflow.
- Changes to the approved logo or core 홍보잇다 brand identity.
- Removal, replacement, or major modification of existing features.
- Major changes to screen transitions or core interactions.

Approval applies to the concrete change and scope approved by the user. An explicit implementation request already authorizes its specified change; do not request the same approval again. Additional professor feedback alone is not approval for unrelated major restructuring.

### Required proposal process

When a new major problem is found, do the following **in Korean**:

1. Explain the exact problem and its impact on usability and visual quality.
2. Propose at least two practical solutions when possible.
3. Compare their advantages and disadvantages.
4. Recommend the best solution and ask for explicit approval.
5. Do not implement the major change until approval is received.

Collect pending structural proposals separately from implemented fixes. While waiting, continue unrelated safe refinements. If the user rejects a proposal, preserve the current implementation. No silence, elapsed time, general maintenance authorization, or archived redesign directive counts as approval.

Progress updates, findings, proposals, approval requests, and final reports must be in Korean. Use actual mobile/desktop screenshots when available, and distinguish verified changes from pending proposals.

## Preserve the user-facing baseline

- Keep the official name **홍보잇다** and the selected orange/ivory/navy brand identity.
- Preserve the main journey: **Photo → Information → Results**.
- Preserve mobile bottom destinations: **Home → Create → My Promotional Materials → Menu**. Keep the menu persistent, with safe-area spacing and no covered controls.
- Preserve the result screen's top **Image / Video / Copy** tabs. Display the selected result, expose only available result types, and keep keyboard access and exports working.
- Preserve the compact sticky read-aloud bar on service screens and position result tabs below its measured height, following the user's October 12 request. Keep controls from covering focused content.
- Preserve current desktop navigation, usable inputs, draft recovery, clipboard behavior, downloads, and failure/retry states.
- Keep sample-output labels accurate while real AI functionality is not connected.

The protected structure means information order, destination meaning, and user-visible behavior. It does not freeze pixels, CSS rules, or the internal component tree.

## Authorized routine improvements

Fix evidence-backed problems in contrast, text size, spacing, alignment, asset scale, icons, selected states, responsive layout, and loading/error/empty-state presentation. Local layout corrections and internal refactoring are allowed when needed for overflow, clipping, accessibility, or functional defects and when the user-facing baseline is preserved.

Apply shared tokens consistently. Preserve the chosen primary logo concept; use its approved vector variants. Prefer CSS/positioning fixes before regenerating an asset. If regeneration is appropriate and within the task's authorized scope, use the relevant image-generation workflow, retain the previous asset, and verify the replacement in the actual page.

Use service previews and actions as the visual focus. Supporting illustrations should aid comprehension without dominating the interface or hiding text. Preserve the established illustration style and brand colors.

Keep motion subtle and respect reduced-motion preferences. Sound and vibration remain optional. Avoid unrelated dependencies, API changes, data-contract changes, or paid external operations outside the user's authorization.

## Priority and scope

1. Prevent broken workflows, data loss, and inaccessible essential controls.
2. Improve task clarity, readability, and senior-friendly mobile access.
3. Preserve the current navigation and journey within the requested scope.
4. Maintain visual consistency, asset quality, and appropriate decorative polish.

If an unrequested change to the screen order or navigation architecture is necessary, explain the concrete issue in Korean and request a decision. An explicit user request to change that structure is authorization; do not ask for the same authorization again. Additional professor feedback should be applied within the user's requested task.

## Bounded review cycle

1. Inspect the actual affected screen and identify specific problems.
2. Select the highest-impact corrections within the current request.
3. Preserve user changes and create a verified restoration point before significant modifications.
4. Implement, inspect the rendered result, and run relevant checks.
5. Report the outcome and stop when the requested issues are resolved. Repeat only when new evidence exposes an unresolved problem.

Do not create edits merely to keep a continuous-improvement loop running. Evaluate meaningful changes from user-experience, frontend reliability, and visual-design perspectives; separate runtime agents are not required.

## Verification and reporting

- For visual changes, inspect affected mobile widths (320, 375, 390, 430px) and larger layouts (768, 1024, 1440px) as relevant.
- Check text/input focus, short viewports, fixed-navigation spacing, selected states, and unintended overflow.
- For result/navigation changes, verify tabs, keyboard behavior, retained input, clipboard copying, and applicable downloads. Preview and exported content should agree.
- Run the production build and appropriate type/functional checks. Archived Phase 4-B evidence does not prove the current UI passes.
- Report changes, verification, remaining issues, and actual files in Korean. Do not imply deployment, API-quality verification, or final professor approval without evidence.

## Documentation discipline

Keep active instructions concise. Store new professor feedback and implementation notes under `feedback/`; preserve source images and the original message analysis. Store past task reports under `docs/archive/`. Update the document index and compatibility mappings when files move. Read archived material only when relevant to the current task.

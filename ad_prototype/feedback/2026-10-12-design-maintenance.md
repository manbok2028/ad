# Design maintenance — October 12, 2026

Policy: [DESIGN_MAINTENANCE.md](../DESIGN_MAINTENANCE.md). This cycle preserves the established journey, section order, navigation destinations, selected logo, and orange/ivory/navy identity.

## Problems observed in rendered screens

- Creation-menu actions appeared as loosely spaced text rows, with little visual separation between clickable options.
- Result-card headings and repeated supporting text consumed significant mobile space.
- The exported poster's secondary copy was too small at mobile preview scale; the desktop preview was also constrained to a narrow width.
- The mobile video preview pushed the playback control close to the fixed bottom navigation.
- The desktop service illustration could use a smaller display size without changing its content.

## Implemented refinements

- Added clear surfaces, borders, icon backgrounds, and stronger type to the existing menu rows.
- Strengthened result headings and tightened supporting typography and spacing.
- Increased poster headline type from 64px to 72px and secondary copy from 34px to 48px in the local sample renderer, with line spacing adjusted to fit the existing canvas. Preview and download still use the same generated PNG.
- Expanded the image preview to the available mobile width and up to 520px on larger screens.
- Limited the portrait video preview's display width responsively so playback controls remain easier to reach.
- Reduced the desktop service illustration's maximum display width to 840px. Existing images remain unchanged.

## Additional user request: persistent upper controls

The user selected a small sticky read-aloud bar, with the Image / Video / Copy tabs pinned immediately below it on the result screen.

- The read-aloud button retains its existing speech behavior and accessible text label.
- The bar is sticky on service screens and accounts for the top safe area.
- Its actual height is measured using ResizeObserver; result tabs use that measurement rather than a guessed offset.
- The result guidance sentence remains in the scrolling content, reducing the persistent area.
- Scroll margins protect focused fields and result actions from the fixed controls.
- The bottom four-destination navigation remains persistent. The existing dialog focus trap remains intact.

The existing login screen retains its own read-aloud control and layout.

## Verification

- Production build and TypeScript check: passed.
- Browser checks: passed at 320, 375, 390, 430, 768, 1024, and 1440px, plus the existing short-viewport check.
- Verified that the read-aloud bar stays at the top and the result tabs align below it without overlap; their combined lower edge is at most 145 CSS pixels in the tested normal viewports.
- Verified one/two/three-result flows, keyboard tabs, four-destination navigation, dialog focus/Escape, input retention, clipboard copy, PNG download, and video cancellation/export while switching tabs.
- Preview/download PNG SHA-256 equality: passed.
- Captured 63 after-change screenshots and inspected representative mobile and desktop renders. No unintended horizontal overflow or runtime page errors were found in the tested flows.

## Assets and boundaries

The existing service illustrations and approved vector logo were suitable. No new raster asset or imagegen call was needed; the refinements use CSS display changes. No external AI generation was performed. The app continues to identify outputs as samples.

Primary implementation files: `src/maintenance-refinements.css`, `src/StudioScreens.tsx`, `src/App.tsx`, and `src/main.tsx`. Sticky-control checks were added to `scripts/verify-professor-feedback.mjs`.

Pre-change restoration point: `../../ad_restore_archive/.phase4b-visual-maintenance-20261012-before/`, relative to the app root. Local screenshots and functional evidence are stored in the task's `outputs/design-maintenance/` directory.

## 2026-10-12 추가 유지보수 주기

- 입력 예시 글자의 대비, 좁은 모바일 카드의 단어 줄바꿈, 사진 선택 입력의 키보드 초점 표시, 데스크톱 설명 제목 정렬을 수정했습니다.
- 실제 화면 33개 상태(320·390·1440px)와 7개 너비의 기능 검증을 수행했습니다. 주요 동작·저장·복사·입력 유지와 브랜드·구조를 보존했습니다.
- 추가 구조 변경이나 에셋 재생성이 필요한 문제는 발견되지 않았습니다. 근거 있는 안전한 수정 후 이번 주기를 종료했습니다.
- 검토 보고서와 캡처는 작업 공간의 outputs/maintenance-cycle에 보존했습니다. 실제 AI 품질·음성 출력 품질·사용자 시험은 검증 범위에 포함하지 않습니다.

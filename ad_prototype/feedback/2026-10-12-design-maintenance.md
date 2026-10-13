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

## 2026-10-12 다섯 전문 관점 추가 검토

- 시니어 UX·시각 디자인·에셋·프런트엔드·모바일 접근성 관점으로 대안을 비교했습니다. 실제 전문가 회의나 사용자 시험이 아닌 관점별 검토입니다.
- 발견: 홍보할 곳 설정의 열기/닫기 동시 표기, 일반 설명과 비슷한 업로드 오류·로딩 안내, 필수 입력의 접근성 속성 부족.
- 선택: 아이콘만 표시 대신 펼치기/접기 문구, 모달 대신 기존 위치의 안내 상자, 새 검증 체계 대신 aria-required 보완. 구조 변경은 없습니다.
- 재검토에서 안내 상자 사이 간격을 12px로 보완했습니다. 7개 너비에서 플랫폼·오류·로딩·필수 입력 상태와 기존 기능을 재검증했습니다.
- 승인 대기 구조 제안은 없습니다. 에셋 교체 필요가 없어 기존 이미지를 보존했습니다. 복원 기준은 bc0a4b0 커밋입니다.
- 결과·대안 비교·1–5 주관적 평가·캡처는 작업 공간 outputs/design-council/전문관점검토.md와 하위 폴더에 기록했습니다. 실제 AI 및 사용자 시험은 포함하지 않습니다.
- 중요한 안전한 수정이 완료되어 주기를 종료합니다. 다음은 새 사용자 피드백을 근거로 재검토하는 것입니다. 이번 추가 변경은 아직 로컬 상태입니다.

## 2026-10-12 반복 개선 및 현재 상태 최종 감사

- 기존 추가 개선 3개를 현재 코드로 재검증했습니다. 영상 미리보기의 긴 문구는 원문을 유지하며 3줄로 제한했고, 간편모드 설명 입력은 일반18px/간편22px로 구분했습니다. 짧은 화면에서 입력칸·주요 버튼에 초점이 갈 때 고정 읽기 바·탭·하단 메뉴 사이로 보이도록 최소 스크롤을 보완했습니다.
- 추가 발견: 320px 설정 메뉴에서 ‘한 번에 만들기’와 ‘이미지 만들기’의 ‘만들기’가 중간에서 나뉘었습니다. 글자 축소·한 열 재배치·단어 단위 줄바꿈을 비교했습니다. 시니어 UX와 접근성은 글자 유지, 시각 디자인은 단어 단위 균형, 에셋은 아이콘 형태 유지, 프런트엔드는 국소 CSS 변경을 우선해 기존 두 열에 word-break와 아이콘 축소 방지 두 규칙을 적용했습니다.
- `src/compact-reference.css`와 회귀 검사 `scripts/verify-menu-shortcuts.mjs`에 반영했습니다. 일반·간편 × 7너비의 14조합에서 56버튼의 ‘만들기’ 단어 보존, 20px 아이콘, 넘침 여부를 확인했습니다. 320px 수정 전·후와 1440px 캡처를 직접 비교했습니다.
- 105개 화면 상태와 7너비 핵심 기능·긴 입력 검사는 마지막 두 CSS 규칙 변경 직전에 통과했습니다. 마지막 변경 이후 해당 메뉴 검사, 실제 100·200% 브라우저 확대, 빌드와 타입 검사를 통과했습니다. 문구 복사·PNG 일치·영상 취소/저장·입력 유지·기록 필터·고정 내비게이션의 증거를 보존했습니다.
- 200% 확대 캡처의 잘못된 자르기를 발견해 `scripts/verify-maintenance-zoom.mjs`를 브라우저 합성 화면 직접 캡처로 보완했습니다. 최종 증거는 `zoom-surface/`이며 최초 `zoom/` 이미지는 시각 검증 근거로 쓰지 않습니다.
- 전체 한국어 보고서와 증거: 작업 공간 `outputs/council-final-audit/디자인_반복검토_완료.md`. 이 파일에는 네 개선 주기의 다섯 관점 비교, 요구사항별 증거, 검사 범위와 한계, 복원점 및 다음 행동을 기록했습니다.
- 마지막 수정 전 복원점: `C:/Users/82104/Desktop/파이널/ad_restore_archive/.council-shortcut-wrap-20261012-before/compact-reference.css`(원본과 해시 일치 확인). 기존 미커밋 변경은 보존했습니다.
- 현재 검사 범위에서 중요한 추가 독립 수정이나 승인 대기 구조 제안은 없습니다. 기존 브랜드·내비게이션·핵심 흐름·에셋을 유지하며 반복 검토를 마칩니다. 다음은 교수님 실제 조작 피드백 확인입니다. iPhone 실기기·화면 읽기 프로그램·시니어 사용자 시험은 별도이며 S21+는 사용자 확인 기록입니다.
- 이번 주 범위는 UI/UX입니다. 크레딧 숫자는 가안이고 실 AI·결제·장기 저장을 완료로 처리하지 않습니다. 추가 변경은 아직 로컬이며 이번 검토에서 GitHub 커밋·푸시·배포를 실행하지 않았습니다.

## 2026-10-12 GitHub 게시 전 최종 개선·검증

사용자가 마지막 개선 후 GitHub 게시를 요청했습니다. 원격 브랜치는 실제로 `feature/UI-Screen`으로 변경되어 있었고, 로컬도 같은 이름·추적 대상으로 맞췄습니다. 아래는 앞선 로컬 전용 기록 이후의 최신 게시 준비 상태입니다.

- 설명 화면의 이름 입력이 선택 사항이라는 안내가 압축 화면에서 숨겨져 있었습니다. 제목 옆에 ‘선택’, 두 필수 항목에는 ‘필수’를 16px 보조 글자로 표시했습니다. 기존 입력·검증·화면 순서는 유지합니다. 이름을 비워도 결과 버튼을 사용할 수 있고, 두 필수 항목은 기존 검증을 유지하는지 확인했습니다.
- 체크리스트의 상단 요약과 화면 표에 남아 있던 미결정 문구를 사용자 결정과 맞췄습니다. 기존 홈 제작 버튼 사용, 하단 메뉴는 서비스 화면만, 현행 채널 선택 흐름, 이번 주 UI/UX 검토 범위를 반영했습니다. 교수님 원문과 상태별 한계는 보존했습니다.
- 함께 게시할 기존 개선: 메뉴 단어 줄바꿈·아이콘 유지, 간편모드 22px 입력, 긴 영상 문구 3줄 처리, 고정 영역에 가린 초점 노출, 사진 오류·로딩 안내, 펼치기/접기 상태 표시 및 필수 접근성 속성.
- 최종 코드로 7너비×15화면 상태(105개), 7너비 제작·복사·저장·입력 유지, 긴 내용·짧은 화면, 일반/간편 메뉴14조합, 실제100/200% 확대 검사를 통과했습니다. 빌드·TypeScript 검사도 통과했습니다. `verify-professor-feedback.mjs`에는 선택/필수 표시와 이름 없는 정상 진행 검증을 추가했습니다.
- [105상태 검사](evidence/2026-10-12-final/inspection.json), [기능 검사](evidence/2026-10-12-final/workflow.json), [긴 내용·짧은 화면](evidence/2026-10-12-final/stress.json), [메뉴 검사](evidence/2026-10-12-final/menu.json), [확대 검사](evidence/2026-10-12-final/zoom.json).
- 실제 캡처: [320px 설명·일반모드](evidence/2026-10-12-final/information-mobile-320.png), [1440px 설명](evidence/2026-10-12-final/information-desktop-1440.png), [390px 결과 문구](evidence/2026-10-12-final/result-copy-mobile-390.png), [320px 메뉴](evidence/2026-10-12-final/menu-mobile-320.png), [200% 확대](evidence/2026-10-12-final/zoom-copy-200.png).
- 게시 전 미커밋 파일17개를 `ad_restore_archive/.pre-ui-screen-publish-20261012/`에 복사하고 해시 일치를 확인했습니다. 예전 사용자 변경을 되돌리거나 원격 이력을 덮어쓰지 않습니다.
- 실제 AI·결제·크레딧은 향후 개발이며 이번 게시에 차감 로직을 추가하지 않습니다. iPhone 실기기와 시니어 사용자 과업 검증은 별도입니다. GitHub 업로드와 Vercel 배포 성공은 각각 확인해야 하며 같은 상태로 간주하지 않습니다.

# 프로젝트 폴더 정리

2026-10-10. 저장소 루트에는 A~F 팀 폴더, `ad_prototype`, `README.md`를 유지한다. `.git`과 `.gitignore`는 GitHub 연결에 필요한 관리 항목이다.

- `A_손용범` ~ `F_육성준`: 기존 팀별 작업.
- `A_손용범/assets/홍보잇다/`: 생성·사용한 시각 에셋 모음. 원본·웹용·로고·아이콘·라이선스를 분리한다.
- `ad_prototype`: 실제 React 앱. Vercel의 Root Directory가 사용하므로 폴더 이름은 유지한다.
- `README.md`: 팀별 작업과 현재 폴더 안내.

루트의 `PHASE4_REFINEMENT.md`는 처음에 `ad_prototype/docs/`로 이동했으며, 2026-10-12 문서 정리 후 현재 위치는 `ad_prototype/docs/archive/PHASE4_REFINEMENT.md`다.

## 2026-10-12 문서 정리

- `ad_prototype/AGENTS.md`: 개발 환경과 현재 작업 지침을 찾는 시작점.
- `ad_prototype/DESIGN_MAINTENANCE.md`: **현재 검증된 구조를 유지하되, 추가 교수님 피드백과 사용자 요청에 따라 변경한다.**
- `ad_prototype/README.md`, `docs/README.md`: 실행 안내와 문서 색인.
- `docs/design/DESIGN_PRINCIPLES.md`: 현재 디자인 원칙을 짧게 정리한 기준.
- `docs/LOCAL_PREVIEW.md`: 기존 로컬 실행 안내.
- `docs/archive/`: 이전 전면 재설계 지침과 단계별 계획·보고서. 기록용이며 현재 작업 명령으로 실행하지 않는다.
- `feedback/`: 교수님 피드백 원문 분석, 원본 이미지, 반영·검증 기록. 기존 자료는 보존했다.

기존 `HASE4B_MASTER.md`는 이름을 바로잡아 `docs/archive/PHASE4B_MASTER.md`로 이동했다. 문서 내부의 파일 링크를 새 위치에 맞췄고, `scripts/document-paths.mjs`에서 과거 백업 manifest의 파일 경로를 현재 위치로 연결한다. 이동 기록은 `docs/document-moves.json`에 있다.

Phase 4-B 감사는 과거 에셋·검증 자료를 검사한다. 현재 화면 검증을 대체하지 않는다. 백업 스크립트는 현재의 루트 Markdown과 `docs/`, `feedback/`을 함께 보존한다.

정리 전 문서·스크립트·피드백 28개 파일의 SHA-256 검증 사본은 작업 채팅의 `work/docs-before-maintenance-20261012/`에 따로 보존했다.

삭제한 백업은 없다. 다음 복원 폴더는 저장소 밖, 같은 상위 경로의 **`ad_restore_archive/`**에 보존했다.

- `.phase3-checkpoint-20261009`
- `.phase4b-checkpoint-20261009`
- `.phase4b-checkpoint-20261010-audio-fixes`
- `.phase4b-verified-20261010`
- `.phase4b-verified-20261010-final`

예전 보고서의 `../.phase...` 위치는 작성 당시의 위치다. 현재 `ad_prototype`에서 복원 자료를 찾으려면 **`../../ad_restore_archive/.phase...`**를 사용한다. 백업 생성·확인 스크립트도 새 경로를 사용한다.

# Planning & Orchestration Methodology (기획 및 조율 방법론)

이 스킬은 Product Manager와 Orchestrator 에이전트가 작업을 계획할 때 사용합니다.

## 1. 기능 명세 (Feature Specs) 작성 규칙
- 모든 기능 기획은 `spec.md`에 요구사항, UX 플로우, 제약 조건을 명확히 기록해야 합니다.
- 개발 전 반드시 '어엇을 만들 것인가(What)'와 '왜 만드는가(Why)'를 명시하세요.

## 2. 단계별 계획 (Phased Plans)
- 작업 큐(Task Queue) 관리 및 실행 규칙 (State Management)
  1. 작업 파일 생성 (Task Generation): 새로운 단계가 시작될 때마다 단일 파일을 덮어쓰지 말고, 반드시 `.gemini/agents/tasks/` 폴더에 `task-<순번>.json` 파일을 누적 생성하라. 포함해야 할 JSON 속성: task_id, created_at(생성된 날짜와 시간(한국시간)), assigned_agent(할당 에이전트), status(초기값: pending), description(작업 내용), result(작업 결과), completed_at(작업 완료 시간).
  2. 상태 추적: 하나의 에이전트 작업이 끝날 때마다 새로 생성된 `log-task-*.md` 파일과 해당 task JSON 파일의 상태가 시간과 함께 [completed]로 변경되었는지 확인하고, 검증되면 다음 task JSON 파일을 생성한 뒤 다음 에이전트를 호출하라.
- 기획(Plan) -> 구현(Implement) -> 리뷰(Review)의 단계를 강제하여 에이전트 간의 작업 충돌을 방지하세요.
- **중요: 모든 구현 단계의 작업 결과물 경로는 `.gemini` 외부 디렉토리로 지정해야 합니다.**


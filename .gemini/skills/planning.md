# Planning & Orchestration Methodology (기획 및 조율 방법론)

이 스킬은 Product Manager와 Orchestrator 에이전트가 작업을 계획할 때 사용합니다.

## 1. 기능 명세 (Feature Specs) 작성 규칙
- 모든 기능 기획은 `spec.md`에 요구사항, UX 플로우, 제약 조건을 명확히 기록해야 합니다.
- 개발 전 반드시 '어엇을 만들 것인가(What)'와 '왜 만드는가(Why)'를 명시하세요.

## 2. 단계별 계획 (Phased Plans)
- 작업을 분할할 때는 `plan.md`에 체크리스트 형태로 작성하세요.
- 기획(Plan) -> 구현(Implement) -> 리뷰(Review)의 단계를 강제하여 에이전트 간의 작업 충돌을 방지하세요.
- **중요: 모든 구현 단계의 작업 결과물 경로는 `.gemini` 외부 디렉토리로 지정해야 합니다.**


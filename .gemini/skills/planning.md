---
name: Planning & Orchestration Methodology
description: 기능 명세 작성, 단계별 계획 수립 및 에이전트 간 조율 방법론
target_agents: [Product Manager, Orchestrator]
---
# Planning & Orchestration Methodology (기획 및 조율 방법론)

이 스킬은 Product Manager와 Orchestrator 에이전트가 작업을 계획할 때 사용합니다.

## 1. 기능 명세 (Feature Specs) 작성 규칙
- 모든 기능 기획은 `spec.md`에 요구사항, UX 플로우, 제약 조건을 명확히 기록해야 합니다.
- `spec.md` 작성 시 다음 목차 템플릿을 준수하세요: `목적(Why)`, `기능 명세(What)`, `데이터 흐름(Data Flow)`, `예외 케이스(Edge Cases)`.

## 2. 단계별 계획 (Phased Plans)
- 작업 큐(Task Queue) 관리 및 실행 규칙 (State Management)
  1. 작업 파일 생성 (Task Generation): 새로운 단계가 시작될 때마다 `.gemini/agents/tasks/` 폴더에 `task-<순번>.json` 파일을 누적 생성하라.
  2. 상태 추적: 하나의 에이전트 작업이 끝날 때마다 상태가 `[completed]`로 변경되었는지 확인하고, 검증되면 다음 task JSON 파일을 생성하라.
- 기획(Plan) -> 구현(Implement) -> 리뷰(Review)의 단계를 강제하여 에이전트 간의 작업 충돌을 방지하세요.

## 🚨 안티 패턴 (Do Not)
- 명확한 종료 조건(Definition of Done) 없이 에이전트에게 모호한 지시를 내리지 마세요.
- 동일한 파일을 수정해야 하는 작업을 여러 에이전트에게 동시에 병렬로 할당하지 마세요.

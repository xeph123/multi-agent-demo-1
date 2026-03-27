---
name: planning
description: "기획(PM) 및 조율(Orchestrator)을 위한 단계별 태스크 관리 및 병렬 실행 표준 가이드"
metadata:
  version: "1.3.0"
  workflow: "Sequential Planning + Parallel Implementation"
---

# Planning & Orchestration Methodology (기획 및 조율 표준)

본 가이드는 **Product Manager(PM)**와 **Orchestrator**가 프로젝트의 생애주기를 관리하고 에이전트 간의 작업 충돌을 방지하기 위해 준수해야 하는 운영 원칙입니다.

## 1. 정교한 기능 명세 (Feature Spec) 작성
- **Spec First**: 모든 개발은 `src/docs/spec.md`가 확정된 후 시작한다.
- **Co-Authoring**: `@.gemini/skills/doc-coauthoring`을 활용하여 사용자로부터 컨텍스트를 완벽히 추출하라.
- **Template**: 목적(Why), 기능 명세(What), 데이터 흐름(Data Flow), 예외 케이스(Edge Cases), 종료 조건(Definition of Done)을 반드시 포함하라.



## 2. 태스크 라이프사이클 및 상태 관리 (Task Queue)
오케스트레이터는 `src/agents/tasks/` 폴더 내의 JSON 파일을 통해 모든 하위 에이전트의 상태를 **'직접'** 관리한다.

1. **[Pending] (생성)**: 새로운 단계 기획 시 `task-<순번>-<agent>.json` 생성.
    * `created_at`: 반드시 셸에서 `Get-Date -Format "yyyy-MM-dd HH:mm:ss"`를 실행한 실제 시간을 기록.
2. **[Running] (실행 직전)**: 하위 에이전트 호출(`gemini -p ...`) **직전**에 오케스트레이터가 직접 `status`를 `running`으로 변경.
3. **[Completed/Failed] (사후 검증)**: 에이전트 작업 종료 후, 오케스트레이터가 결과물을 검토하고 `status`와 `completed_at`(실제 시간)을 직접 업데이트.

## 3. 단계별 강제 워크플로우 (Phased Execution)
작업의 안정성을 위해 다음 순서를 강제하며, 각 단계 종료 시 `@.gemini/skills/context-manager`로 `context.md`를 갱신하라.

| 단계 | 수행 내용 | 에이전트 |
| :--- | :--- | :--- |
| **1. Plan** | 요구사항 분석 및 `spec.md` 작성 | PM |
| **2. Design** | API 명세(`architect`) 및 디자인 토큰(`designer`) 확정 | Architect, Designer |
| **3. Implement** | **[Parallel]** Backend와 Frontend 코딩 동시 진행 | BE/FE Specialists |
| **4. Review** | 코드 리뷰 및 통합 테스트 (최대 3회 재작업) | Debugger/QA |



## 🚨 안티 패턴 (Strictly Forbidden)
- **Vague Instructions**: 명확한 종료 조건(DoD) 없이 에이전트에게 "알아서 해줘"라고 지시하는 행위.
- **Race Condition**: 동일한 파일을 수정해야 하는 태스크를 서로 다른 에이전트에게 병렬로 할당하는 행위.
- **Shadow Completion**: 오케스트레이터의 확인 없이 하위 에이전트가 스스로 태스크를 완료 처리하는 행위.
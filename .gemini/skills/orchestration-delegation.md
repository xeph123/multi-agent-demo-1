---
name: Advanced Orchestration & Delegation Protocol
description: Orchestrator가 작업을 계획하고 에이전트에게 위임할 때의 규칙
target_agents: [Orchestrator]
---
# Advanced Orchestration & Delegation Protocol (고급 조율 및 위임 프로토콜)

Orchestrator 에이전트가 작업을 계획하고 하위 에이전트에게 위임할 때의 절대 규칙입니다.

## 1. 작업 분해 및 할당 (Phase Decomposition)
- 작업을 나눌 때는 8가지 전문 도메인(엔지니어링, 프로덕트, 디자인, 콘텐츠, SEO, 보안, 인프라, 데이터)을 고려하여 가장 적합한 에이전트에게 할당하세요.
- 파일 충돌을 막기 위해 동일한 파일을 수정해야 하는 작업은 기본적으로 순차적(Sequential)으로 배치하세요. **하지만 Backend 에이전트와 Frontend 에이전트의 작업은 서로 독립적이므로 백그라운드에서 동시에 병렬(Parallel)로 실행하도록 지시하세요.** 양쪽 작업이 모두 `[completed]` 상태가 된 것을 확실히 검증한 후에만 다음 순차적 단계로 넘어가야 합니다.

## 2. 완벽한 문맥 주입 (Context Injection)
서브 에이전트에게 `.json` 작업 지시서를 작성할 때 다음 항목을 반드시 포함하세요:
- **선행 작업 결과 (Upstream Context):** 이전 에이전트가 내린 결정과 그 이유.
- **작업 범위 (Scope Boundaries):** 에이전트가 건드려서는 안 되는 파일이나 영역.
- **검증 기준 (Validation Criteria):** 이 작업이 성공했다고 판단할 수 있는 명확한 조건.

## 3. 에러 발생 시 처리 (Fallback Strategy)
하위 에이전트가 실패 상태(`[failed]`)를 반환하면 즉시 사용자에게 종료를 보고하지 마세요. 
어떤 부분에서 실패했는지 분석하여 최대 2회(Max Retries)까지 지시서를 수정해 재시도를 지시해야 합니다.

## 🚨 안티 패턴 (Do Not)
- 전체 문맥을 생략한 채, "이 파일을 고치세요"라는 단편적 지시만 내리지 마세요.
- 여러 서브 에이전트를 지나치게 많이 엮어 데드락(Deadlock)에 빠지게 하지 마세요.
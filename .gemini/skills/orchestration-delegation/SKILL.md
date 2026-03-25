---
name: orchestration-delegation
description: "에이전트 간 지능적 작업 분해, 문맥 주입 및 병렬 실행 최적화 프로토콜"
metadata:
  version: "1.2.0"
  strategy: "Context-Aware Delegation & Parallel Sync"
---

# Orchestration & Delegation Protocol (지능형 조율 및 위임 표준)

본 가이드는 **Orchestrator**가 복잡한 프로젝트를 세부 과업으로 분해하고, 하위 에이전트에게 **완벽한 문맥(Context)**을 전달하여 작업 성공률을 극대화하기 위한 절대 규칙입니다.

## 1. 도메인 기반 작업 분해 (Domain-Specific Decomposition)
- **Expert Alignment**: 18개 에이전트의 전문 도메인(기획, 설계, 디자인, FE/BE 구현, 보안, 인프라, 데이터, 문서화)을 고려하여 가장 적합한 페르소나에게 할당하라.
- **Dependency Management**: 동일 파일을 수정하는 작업은 '순차적(Sequential)'으로 배치하되, **Backend(`backend`, `dba`)와 Frontend(`frontend`, `designer`) 작업은 백그라운드에서 반드시 '병렬(Parallel)'로 실행하라.** - **Synchronization**: 병렬 작업 시 `Wait-Job` 등을 통해 양쪽의 `[completed]` 상태를 모두 검증한 후에만 다음 단계(통합 리뷰/QA)로 진입하라.



## 2. 완벽한 문맥 주입 (High-Fidelity Context Injection)
서브 에이전트에게 지시(`gemini -p ...`)할 때, 다음 3가지 핵심 요소를 지시문에 반드시 포함하라.
- **[Upstream Context]**: 선행 에이전트(예: PM, Architect)가 내린 결정 사항과 그 이유(Why).
- **[Scope Boundaries]**: 작업 대상 파일과 절대 수정해서는 안 되는 금지 영역(Forbidden Zones).
- **[Definition of Done]**: 작업 완료를 판단할 명확한 검증 기준(예: 특정 API 응답 확인, 린트 통과).

## 3. 회복 탄력성 전략 (Fallback & Retry Strategy)
에이전트가 실패(`[failed]`)를 반환할 경우의 대응 수칙이다.
- **Root Cause Analysis**: 즉시 보고하지 말고, `@.gemini/skills/persistent-debugging-protocol`을 활용하여 실패 원인을 분석하라.
- **Max Retries**: 분석된 원인을 바탕으로 지시서(Prompt)를 보정하여 **최대 2회**까지 재시도를 지시하라. 
- **Escalation**: 2회 재시도 후에도 실패 시, 모든 로그를 요약하여 사용자에게 최종 보고하고 개입을 요청하라.

## 🚨 안티 패턴 (Strictly Forbidden)
- **Context-Free Tasking**: "이 파일을 고치세요"와 같은 단편적 지시. (반드시 전체 그림 속에서의 역할을 설명하라.)
- **Deadlock Assignment**: 여러 에이전트가 서로의 산출물을 기다리게 하여 전체 공정을 멈추게 하는 설계.
- **Blind Trust**: 하위 에이전트의 완료 보고를 검증 없이 그대로 수용하는 행위.
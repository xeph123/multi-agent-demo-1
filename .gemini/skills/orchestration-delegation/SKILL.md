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

## 4. 위임 장부 기록 프로토콜 (Delegation Ledger Recording)
에이전트 간 모든 호출 내역은 `src/logs/agent-ledger.md` 파일에 실시간으로 기록되어야 합니다.
- **기록 시점**: 서브에이전트 호출 직전(결과: `대기중`) 및 호출 완료 직후(결과: `success` 또는 `failed`).
- **정확한 시각**: 반드시 `Get-Date` 명령어를 통해 실제 시스템 시각(`YYYY-MM-DD HH:mm:ss`)을 조회하여 기록하라.
- **인코딩 (Crucial)**: 모든 장부 기록은 반드시 **UTF-8(BOM 없음)** 인코딩을 유지해야 한다. 특히 Windows PowerShell에서 파일에 기록할 때는 `$OutputEncoding = [System.Text.Encoding]::UTF8`을 설정하거나, 리다이렉션(`>>`) 대신 인코딩이 보장되는 도구/스크립트를 사용하여 한글 깨짐을 방지하라.
- **토큰 정보**: 호출 완료 시 터미널에 출력된 Usage Stats에서 `P/C/T` 정보를 추출하여 기입하라. (예: `P: 500 / C: 120 / T: 620`)
- **테이블 포맷**:
| 시간 | 호출자 | 수신자 | 태스크 ID | 호출 지시 내용 | 결과 | 토큰 (P/C/T) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |

## 5. 메모리 동기화 및 핸드오프 (Memory & Handoff)
에이전트 간 정교한 기술 데이터 공유가 필요할 경우 `src/agents/memory/`를 적극 활용하라.
- **트리거**: API 규격, 특정 알고리즘, 복잡한 디자인 토큰 등 단순 텍스트 지시로 전달하기 어려운 '구조적 정보'가 발생할 때.
- **작업**: 해당 정보를 `src/agents/memory/memo-<topic>.md` 파일로 작성하고, 다음 에이전트 호출 시 해당 경로를 `@파라미터`로 포함하여 읽게 하라.
- **예시**: "Frontend 에이전트, `src/agents/memory/memo-auth-types.md`의 타입을 참고하여 UI를 구현해."

## 🚨 안티 패턴 (Strictly Forbidden)
- **Context-Free Tasking**: "이 파일을 고치세요"와 같은 단편적 지시. (반드시 전체 그림 속에서의 역할을 설명하라.)
- **Deadlock Assignment**: 여러 에이전트가 서로의 산출물을 기다리게 하여 전체 공정을 멈추게 하는 설계.
- **Blind Trust**: 하위 에이전트의 완료 보고를 검증 없이 그대로 수용하는 행위.
- **Silent Delegation**: 위임 장부(Ledger)에 기록하지 않고 조용히 에이전트를 호출하는 행위.
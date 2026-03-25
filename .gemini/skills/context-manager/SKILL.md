---
name: context-manager
description: "멀티 에이전트 워크플로우의 상태 유지, 토큰 최적화 및 에이전트 간 배턴 터치(Handover) 가이드"
metadata:
  version: "1.2.0"
  strategy: "Adaptive Summarization"
---

# Context & Memory Management (컨텍스트 관리 표준)

본 가이드는 에이전트 간의 작업 전환 시 맥락이 끊기거나, 불필요한 파일 누적으로 인한 토큰 초과를 방지하기 위해 **Orchestrator**가 반드시 준수해야 하는 규칙입니다.

## 1. 적응형 상태 동기화 (Adaptive State Sync)
- **트리거:** 에이전트가 교체될 때(예: Designer -> Frontend) 또는 서브 태스크가 3개 완료될 때마다 실행합니다.
- **작업:** `src/docs/context.md`를 최신 상태로 갱신하여, 새로 투입되는 에이전트가 이전 히스토리를 전부 읽지 않고도 즉시 업무에 투입되게 합니다.



## 2. 표준 요약 스키마 (Standard Summary Schema)
`context.md`는 다음 구조를 **엄격히** 유지하며, 이전 내용은 '요약' 후 덮어쓰기(Overwrite) 합니다.

```markdown
# 📍 Project Heartbeat (현재 상태)
- **Status:** [Planning | Designing | Implementing | Reviewing]
- **Progress:** [▓▓▓▓░░░░░░] 40%

## 🔑 Key Single Source of Truth (핵심 결정 사항)
> 다음 작업자가 절대 잊으면 안 되는 핵심 파라미터
- **Design Tokens:** (예: Primary Color #141413, Font Lora)
- **API Spec:** (예: Base URL /api/v1, Auth JWT)
- **Tech Stack:** (예: Next.js 15, Prisma, Tailwind)

## ✅ Completed Milestones
1. [Task Name] - [핵심 산출물 경로]
2. ...

## 🎯 Next Immediate Goals
- [에이전트명]: [수행할 구체적 액션]

## ⚠️ Blockers & Risks
- 발견된 버그나 기술적 제약 사항 (없으면 "None")
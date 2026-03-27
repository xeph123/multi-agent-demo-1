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
- **언어:** 모든 상태 요약, 결정 사항, 목표 및 리스크 보고는 반드시 품격 있는 **한글(Korean)**로 작성하라.



## 2. 표준 요약 스키마 (Standard Summary Schema)
`context.md`는 다음 구조를 **엄격히** 유지하며, 이전 내용은 '요약' 후 덮어쓰기(Overwrite) 합니다.

```markdown
# 📍 Project Heartbeat (현재 프로젝트 상태)
- **Status (상태):** [Planning(기획) | Designing(설계) | Implementing(구현) | Reviewing(리뷰)]
- **Progress (공정률):** [▓▓▓▓░░░░░░] 40%

## 🔑 Key Single Source of Truth (핵심 결정 사항)
> 다음 작업자가 절대 잊으면 안 되는 핵심 파라미터 및 규격
- **Design Tokens:** (예: 메인 색상 #141413, 폰트 Lora)
- **API Spec:** (예: 베이스 URL /api/v1, 인증 방식 JWT)
- **Tech Stack:** (예: React, Fastify, SQLite)

## ✅ Completed Milestones (완료된 마일스톤)
1. [태스크 명] - [핵심 산출물 경로]
2. ...

## 🎯 Next Immediate Goals (다음 즉각적 목표)
- [에이전트명]: [수행할 구체적 액션 (한글로 상세히 기술)]

## ⚠️ Blockers & Risks (장애물 및 리스크)
- 발견된 버그나 기술적 제약 사항 (없으면 "없음")
```
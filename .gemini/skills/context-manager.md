---
name: Context & Memory Management
description: 멀티 에이전트 환경에서 컨텍스트 손실을 방지하기 위한 작업 상태 요약 규칙
target_agents: [Orchestrator, Status Reporter]
---
# Context & Memory Management (컨텍스트 관리)

잦은 파일 생성과 에이전트 통신으로 인한 토큰 초과(Token Overflow) 및 지시 문맥 상실을 방지하기 위한 규칙입니다.

## 1. 주기적인 상태 요약 (Periodic Summarization)
- 오케스트레이터(Orchestrator)는 서브 태스크가 3~5개 이상 완료될 때마다 전체 워크플로우를 점검하세요.
- 누적된 `task-*.json`의 결과를 읽고, 현재까지 진행된 핵심 결과물과 앞으로 남은 목표를 `.gemini/agents/workspace/context.md` 파일에 압축하여 요약(Summarize) 및 덮어쓰기(Overwrite) 하라.

## 2. 요약 포맷 (Summary Format)
`context.md` 파일은 항상 다음 포맷을 유지해야 합니다:
```markdown
# 프로젝트 현재 상태 (Project Status)
- **최근 업데이트 시간:** YYYY-MM-DD HH:mm:ss
- **현재 진행 단계:** [기획 / 디자인 / 구현 / 리뷰 / 완료]
- **완료된 핵심 작업:** 
  1. ...
  2. ...
- **다음에 즉시 수행될 목표:** ...
- **알려진 이슈 및 보류 사항:** ...
```

## 🚨 안티 패턴 (Do Not)
- 너무 많은 이전 작업을 개별적으로 전부 나열하여 불필요한 토큰 낭비를 유발하지 마세요.
- 중요한 환경 파라미터(예: 포트 번호, 사용된 디자인 토큰, DB 스키마 등)를 요약에서 누락시키지 마세요.

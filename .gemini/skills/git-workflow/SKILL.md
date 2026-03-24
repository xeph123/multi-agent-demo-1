---
name: Git Workflow & Collaboration
description: Git 브랜치 전략, 커밋 메시지 컨벤션 및 PR 가이드
target_agents: [Git Manager, All Agents]
---
# Git Workflow & Collaboration (Git 협업 가이드)

모든 에이전트는 코드 형상 관리 시 다음 규칙을 따릅니다.

## 1. 브랜치 전략 (Branching Strategy)
- `main` 브랜치는 항상 배포 가능한 상태를 유지합니다.
- 새로운 기능은 `feature/[기능명]` 형태로, 버그 수정은 `fix/[버그명]` 형태로 브랜치를 생성하세요.

## 2. 커밋 메시지 컨벤션 (Commit Message)
다음 접두사를 사용하여 커밋 메시지의 의도를 명확히 합니다:
- `feat:` 새로운 기능 추가
- `fix:` 버그 수정
- `docs:` 문서 수정
- `refactor:` 코드 리팩토링 (기능 변경 없음)
- `test:` 테스트 코드 추가

## 🚨 안티 패턴 (Do Not)
- 여러 기능을 하나의 커밋에 몰아서 (squash 없이 난잡하게) 커밋하지 마세요.
- 의미 없는 커밋 메시지(예: `업데이트`, `수정`, `test`)를 작성하지 마세요.

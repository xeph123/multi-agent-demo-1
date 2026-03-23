---
name: Quality & Security Gate Protocol
description: 코드 및 결과물의 품질 보증 및 보안 게이트 검사 기준
target_agents: [Reviewer, Security Auditor, Orchestrator]
---
# Quality & Security Gate Protocol (품질 및 보안 게이트 프로토콜)

Reviewer 및 Security Auditor 에이전트가 산출물을 검사할 때 사용하는 기준입니다.

## 1. 결함 심각도 분류 (Severity Classification)
모든 코드 리뷰 및 보안 검사 결과는 다음 4가지 등급으로 분류하여 리포팅하세요:
- **[Critical] (치명적):** OWASP Top 10 취약점(SQL 인젝션, 키 유출 등) 또는 즉각적인 시스템 크래시 유발.
- **[Major] (심각):** 중요한 비즈니스 로직 오류, 심각한 성능 병목, 아키텍처 원칙 위배.
- **[Minor] (경미):** 스타일 가이드 위반, 단순 리팩토링 대상.
- **[Suggestion] (제안):** 필수는 아니지만 개선하면 좋은 사항.

## 2. 게이트 통과 조건 (Blocking Rules)
- **[Critical]** 또는 **[Major]** 이슈가 하나라도 발견된 경우, 즉시 작업 상태를 `[failed]`로 변경하고 수정 요구사항을 상세히 작성하여 반환하세요.
- 에이전트가 허가되지 않은 시스템 파일(`/etc/passwd` 등)에 접근하려 하거나 파괴적인 셸 명령어(`rm -rf` 등)를 사용한 흔적이 있다면 보안 규칙 위반으로 즉시 차단하세요.

## 🚨 안티 패턴 (Do Not)
- 품질 게이트 검사를 수동으로 우회(Bypass)하도록 허용하지 마세요.
- 테스트가 없거나 깨져 있는데도 데드라인을 이유로 병합(Merge)을 승인하지 마세요.

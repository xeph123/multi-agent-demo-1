---
name: Security Audit & Code Review Checklist
description: 보안 취약점 검증(OWASP) 및 코드 리뷰 기준
target_agents: [Security Auditor, Code Reviewer]
---
# Security Audit & Code Review Checklist (보안 감사 및 코드 리뷰 체크리스트)

이 스킬은 Security Auditor 및 Code Reviewer 에이전트 전용입니다.

## 1. 보안 검증 (Security Audit)
코드 배포 전 다음 OWASP Top 10 취약점을 반드시 확인하세요:
- JWT 토큰, API 키, AWS 비밀키 등이 코드에 하드코딩되어 있지 않은가?
- SQL 인젝션, XSS, CSRF 공격을 방어할 수 있도록 입력값이 이스케이프/검증되었는가?

## 2. 코드 리뷰 규칙 (Code Review)
- 함수가 단일 책임 원칙(SRP)을 위배하지 않는지 확인하세요.
- `quality-security-gate.md`의 기준에 따라 발견된 사항을 [Critical], [Major], [Minor]의 심각도(Severity) 태그를 붙여 리포팅하세요.

## 🚨 안티 패턴 (Do Not)
- 리뷰 시 단순히 "코드가 이상함" 같은 모호한 코멘트를 남기지 마세요. 구체적인 해결책이나 대안 코드를 함께 제시해야 합니다.
- 민감한 데이터 처리 로직을 클라이언트(프론트엔드)에 두도록 허용하지 마세요.

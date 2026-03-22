# Security Audit & Code Review Checklist (보안 감사 및 코드 리뷰 체크리스트)

이 스킬은 Security Auditor, Code Reviewer, Tester 에이전트 전용입니다.

## 1. 보안 검증 (Security Audit)
코드 배포 전 다음 OWASP Top 10 취약점을 반드시 확인하세요:
- JWT 토큰, API 키, AWS 비밀키 등이 코드에 하드코딩되어 있지 않은가?
- SQL 인젝션, XSS, CSRF 공격을 방어할 수 있도록 입력값이 처리되었는가?

## 2. 코드 리뷰 규칙 (Code Review)
- 함수가 단일 책임 원칙(SRP)을 위배하지 않는지 확인하세요.
- [Critical], [Major], [Minor]의 심각도(Severity) 태그를 붙여 발견된 사항을 리포팅하세요.

## 3. 테스트 (Testing)
- 작성된 로직에 대해 Vitest, MSW 등을 활용하여 단위 테스트(Unit Test) 및 스냅샷 테스트를 포함하세요.

---
name: security-review
description: "OWASP Top 10 기반 보안 감사 및 클린 코드 리뷰 가이드라인"
metadata:
  version: "1.2.0"
  focus: "Proactive Security & Maintainability"
---

# Security Audit & Code Review Checklist (보안 감사 및 코드 리뷰 표준)

본 가이드는 **Security Auditor** 및 **Code Reviewer** 에이전트가 산출물의 안전성과 유지보수성을 검증할 때 반드시 통과해야 하는 체크리스트입니다.

## 1. 하이엔드 보안 검증 (Security Audit - OWASP Focus)
배포 승인 전, 다음 보안 항목을 전수 조사하고 위반 시 즉시 반려(`Critical`)하라.

- **[Secrets Management]**: `src/` 내 모든 파일에 API Key, JWT Secret, DB PW 등이 평문으로 노출되어 있는가? (하드코딩 절대 금지)
- **[Injection Defense]**: 모든 사용자 입력값(Query, Body, Params)에 대해 SQL 인젝션, NoSQL 인젝션 방어 로직(Parameterization 등)이 적용되었는가?
- **[XSS/CSRF]**: 프론트엔드 렌더링 시 데이터 이스케이프가 적절한가? 중요한 상태 변경 요청에 CSRF 토큰이나 보안 헤더가 포함되었는가?
- **[Broken Auth]**: 인증이 필요한 엔드포인트에 미들웨어가 누락되지 않았는가? Sensitive Data가 로그에 남지 않는가?



## 2. 구조적 코드 리뷰 규칙 (Clean Code & Patterns)
단순한 문법 검사를 넘어, 프로젝트의 지속 가능성을 위해 다음을 확인하라.

- **[SRP - Single Responsibility]**: 하나의 함수/클래스가 오직 한 가지 일만 수행하는가? 덩치가 큰 함수는 `@.gemini/skills/backend-patterns`에 따라 분리하라.
- **[Error Handling]**: `@.gemini/skills/persistent-debugging` 지침에 따라 에러 발생 시 적절한 로그와 예외 처리가 되어 있는가? (빈 `catch` 블록 금지)
- **[Design Consistency]**: `@.gemini/skills/frontend-design`의 컴포넌트 구조와 `@.gemini/skills/api-design`의 명세를 정확히 준수했는가?

## 3. 피드백 루프 및 리포팅 (Reporting Protocol)
- **Severity Tagging**: 모든 피드백에는 `[Critical]`, `[Major]`, `[Minor]`, `[Suggestion]` 태그를 반드시 부착하라.
- **Actionable Advice**: "코드가 이상함"과 같은 모호한 표현을 금지한다. 반드시 **[현재 코드] -> [문제점] -> [대안 코드/수정 방향]** 순으로 제시하라.
- **Gate Integration**: `Critical` 또는 `Major` 이슈가 해결되지 않은 상태에서 상태를 `completed`로 변경하는 행위를 엄격히 차단하라.

## 🚨 안티 패턴 (Strictly Forbidden)
- **Client-Side Trust**: 민감한 비즈니스 로직이나 보안 검증을 클라이언트(브라우저)에만 의존하도록 방치하는 행위.
- **Nitpicking Without Logic**: 논리적 근거 없이 개인적인 코딩 취향만으로 수정을 요구하는 행위.
- **Ignoring Context**: `context.md`에 정의된 기존 아키텍처 결정을 무시하고 새로운 패턴을 강요하는 행위.
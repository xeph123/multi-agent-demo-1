---
name: quality-security-gate
description: "산출물 품질 등급 분류, OWASP 기반 보안 검사 및 자동화 게이트 승인 표준"
metadata:
  version: "1.2.0"
  compliance: "OWASP Top 10 / SOC2 / Project Standard"
---

# Quality & Security Gate Protocol (품질 및 보안 게이트 표준)

본 가이드는 **Reviewer**, **Security Auditor**, **Orchestrator**가 에이전트의 산출물을 최종 승인하거나 차단할 때 준수해야 하는 강제 프로토콜입니다.

## 1. 결함 심각도 및 대응 매뉴얼 (Severity & Action)
모든 검사 결과는 다음 4단계 등급에 따라 리포팅하며, **Critical/Major** 등급 발견 시 즉시 작업을 반려(`failed`)하라.

| 등급 | 정의 | 조치 사항 |
| :--- | :--- | :--- |
| **[Critical]** | SQL 인젝션, API 키 노출, 시스템 크래시, 무단 파일 접근 | 즉시 중단 및 원인 에이전트 격리 |
| **[Major]** | 비즈니스 로직 오류, N+1 쿼리, 아키텍처 위배, 테스트 실패 | 수정 지시 및 재검토 (최대 3회) |
| **[Minor]** | 린트(Lint) 위반, 네이밍 컨벤션 불일치, 주석 미비 | 자동 수정 제안 후 조건부 승인 |
| **[Suggestion]** | 성능 최적화 제안, 코드 가독성 개선 아이디어 | 참고용 피드백 제공 |

[Image of a software development quality gate and security audit workflow]

## 2. 보안 게이트 통과 조건 (Hard-Blocking Rules)
다음 조건 중 하나라도 위반 시, 어떤 이유로도 승인(`completed`)될 수 없다.
- **[No Hardcodes]**: 소스코드 내에 비밀번호, JWT 시크릿, 클라우드 인증키가 평문으로 존재해서는 안 된다. (`.env` 활용 필수)
- **[Safe Commands]**: 에이전트가 `rm -rf /`, `chmod 777` 등 파괴적인 명령어를 실행하려 한 흔적이 없어야 한다.
- **[Logic Integrity]**: `architect`가 정의한 `src/docs/api-spec.md`의 데이터 규격을 단 하나라도 어기지 않아야 한다.
- **[Test Validation]**: `@.gemini/skills/qa-testing`에 정의된 핵심 시나리오 테스트가 100% 통과되어야 한다.

## 3. 자동화 리뷰 및 리포팅 (Reporting)
- **RCA Linkage**: 거절된 작업은 `@.gemini/skills/persistent-debugging` 프로토콜에 따라 실패 보고서를 작성하고 `context.md`에 실패 원인을 기록하라.
- **Security Scanner**: `scout` 에이전트를 활용하여 외부 라이브러리의 취약점(CVE) 유무를 사전에 스캔하고 결과를 첨부하라.

## 🚨 안티 패턴 (Strictly Forbidden)
- **Bypass Approval**: "시간이 없어서", "사소해서"라는 이유로 품질 게이트를 수동으로 우회하는 행위.
- **Silent Security**: 보안 취약점을 발견했음에도 코드 수정 없이 주석으로만 남기고 승인하는 행위.
- **Opaque Feedback**: "코드가 이상함"과 같은 모호한 피드백 금지. 반드시 파일명, 라인 번호, 수정 제안 코드를 포함하라.
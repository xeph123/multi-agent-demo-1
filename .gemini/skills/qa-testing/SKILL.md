---
name: qa-testing
description: "Playwright 기반의 사용자 시나리오 검증, E2E 테스트 및 회귀 테스트 표준 가이드"
metadata:
  version: "1.2.0"
  framework: "Playwright / Jest / Vitest"
---

# QA & E2E Testing (품질 보증 및 자동화 테스트 표준)

본 가이드는 **QA Agent** 및 **Tester**가 시스템의 비즈니스 로직을 검증하고, 배포 전 결함을 차단하기 위해 준수해야 하는 엔지니어링 표준입니다.

## 1. 사용자 중심 E2E 테스트 원칙 (User-Centric Testing)
- **Critical Path First**: 서비스의 핵심 매출/가치 흐름(예: 가입 -> 장바구니 -> 결제 완료)을 최우선으로 검증하라.
- **Data-Driven Selectors**: 디자인 변경에 취약한 CSS 클래스나 ID 대신, `data-testid` 또는 `aria-label` 등 의미론적 속성을 활용하여 요소를 선택하라.
- **State-Based Wait**: `sleep()` 같은 하드코딩된 대기 대신, 특정 요소의 출현이나 네트워크 응
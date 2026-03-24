---
name: QA & E2E Testing
description: 통합 테스트 및 E2E 테스트(Playwright/Cypress) 작성 가이드
target_agents: [QA Agent, Tester]
---
# QA & E2E Testing (품질 보증 및 E2E 테스트)

소프트웨어 품질 확보를 위한 테스트 작성 규칙입니다.

## 1. E2E 테스트 원칙
- 실제 사용자의 관점에서 주요 비즈니스 흐름(예: 로그인 -> 상품 담기 -> 결제)을 검증하세요.
- UI 요소 선택 시 CSS 클래스보다 `data-testid` 속성을 활용하세요.

```javascript
// 예시: Playwright 테스트 구조
test('사용자는 올바른 정보로 로그인할 수 있다', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="submit-btn"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## 2. 테스트 커버리지 및 엣지 케이스
- 정상적인 흐름(Happy Path)뿐만 아니라 예외 케이스(실패, 비정상적인 입력)도 반드시 테스트하세요.

## 🚨 안티 패턴 (Do Not)
- 하드코딩된 대기 시간(`sleep`, `wait(5000)`)을 사용하지 마세요. 상태 변화를 기반으로 대기해야 합니다.
- 일시적으로 실패하는(Flaky) 테스트를 무시하거나 주석 처리하지 마세요.

---
name: Backend & API Logic Patterns
description: 백엔드 로직 작성, 에러 핸들링, 라우팅 및 미들웨어 패턴 가이드
target_agents: [Backend Specialist, API Developer]
---
# Backend & API Logic Patterns (백엔드 로직 및 API 패턴)

이 스킬은 백엔드 에이전트가 로직을 구현할 때 준수해야 합니다.

## 1. 아키텍처 및 계층 분리 (Layered Architecture)
- **Controller - Service - Repository** 계층을 명확히 분리하세요.
- 비즈니스 로직은 Controller가 아닌 Service 계층에 위치해야 합니다.

## 2. 에러 핸들링 중앙화 (Centralized Error Handling)
- 개별 라우트에서 `try-catch`를 남발하지 말고, 전역 에러 처리 미들웨어(Global Error Handler)를 사용하세요.

```javascript
// 예시: 전역 에러 미들웨어 (Express)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
      code: err.code || 'INTERNAL_ERROR'
    }
  });
});
```

## 3. 보안 및 인증 (Security & Auth)
- 민감한 작업 수행 전 반드시 사용자 권한(Authorization)을 검증하세요.

## 🚨 안티 패턴 (Do Not)
- 하드코딩된 비밀번호나 JWT 시크릿을 소스코드에 포함하지 마세요 (`.env` 활용).
- 데이터베이스 쿼리를 루프 안에서 실행하지 마세요 (N+1 문제 발생).

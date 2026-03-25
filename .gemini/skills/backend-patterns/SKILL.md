---
name: backend-patterns
description: 백엔드 계층 분리(Controller-Service-Repository), 전역 에러 핸들링, N+1 쿼리 방지 등 백엔드 아키텍처 설계 및 구현 표준 가이드
metadata:
  version: 1.0.0
  category: development-standard
---

# Backend & API Logic Patterns

## 🎯 적용 원칙 (Core Principles)
이 가이드는 백엔드 관련 모든 작업(코드 생성, 리뷰, 리팩토링)에 강제 적용됩니다.

### 1. 계층형 아키텍처 (Layered Architecture)
* **Controller:** 요청 수신, 응답 반환, 입력 유효성 검사만 수행.
* **Service:** **모든 비즈니스 로직**의 중심. 트랜잭션 단위 관리.
* **Repository:** DB 접근 로직 전용. 매퍼나 ORM 호출만 허용.

### 2. 에러 핸들링 및 보안 (Error & Security)
* **Centralized:** 모든 에러는 `next(err)`를 통해 전역 핸들러로 전달.
* **No Hard-coding:** 환경 변수는 반드시 `process.env` 또는 관련 관리 도구를 사용.
* **Auth First:** 비즈니스 로직 진입 전 미들웨어 단계에서 권한 검증 필수.

### 3. 성능 최적화 (Performance)
* **N+1 문제 금지:** 루프 내에서 DB 쿼리 실행 금지. `Join` 또는 `In-clause` 활용.
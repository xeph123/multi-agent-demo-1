---
name: backend-patterns
description: "고성능 비즈니스 로직 구현, 계층형 아키텍처(Controller-Service-Repository), 트랜잭션 관리 및 무결성 보장 표준"
metadata:
  version: "1.2.0"
  category: "development-standard"
  runtime: "Node.js / NestJS / Express / Prisma / TypeORM"
---

# Backend & API Logic Patterns (백엔드 설계 및 구현 표준)

본 가이드는 모든 백엔드 관련 작업(코드 생성, 리뷰, 리팩토링)에 강제 적용되는 최상위 기술 지침입니다.

## 🎯 1. 계층형 아키텍처 및 책임 분리 (Layered Architecture)
모든 코드는 관심사의 분리(SoC) 원칙에 따라 다음 3계층으로 엄격히 격리한다.

* **Controller (Interface Layer)**: 
    * HTTP 요청 수신 및 응답 반환 전용. 
    * **Logic Zero**: 비즈니스 로직 포함 금지. 오직 파라미터 추출 및 유효성 검사(DTO/Zod)만 수행.
* **Service (Domain Logic Layer)**: 
    * **비즈니스 로직의 유일한 거처**. 서비스 간 결합도를 낮추기 위해 필요 시 `Facade` 패턴 도입.
    * **Transaction Boundary**: 원자적 작업 단위(Unit of Work)를 정의하고 트랜잭션을 제어한다.
* **Repository (Data Access Layer)**: 
    * 데이터베이스와의 직접적인 통신(ORM, Query Builder, SQL)만 허용.
    * Service 레이어에 데이터 엔진의 구체적인 구현(SQL 등)이 노출되지 않도록 추상화한다.



## 🛡️ 2. 데이터 무결성 및 에러 핸들링 (Integrity & Resilience)
* **Input Validation**: 모든 진입점은 `Zod` 또는 `class-validator`를 통해 스키마 검증을 마쳐야 한다. 잘못된 입력은 즉시 `400 Bad Request`를 반환한다.
* **Centralized Error Handling**: 모든 에러는 전역 예외 필터(Global Exception Filter)에서 처리하며, 일관된 에러 객체 구조(`{ code, message, details }`)를 유지한다.
* **Safe Failover**: 외부 API 호출이나 복잡한 연산 시 `Try-Catch`를 활용하되, `@.gemini/skills/persistent-debugging`에 따라 상세 로그(RCA)를 남긴다.

## ⚡ 3. 성능 및 쿼리 최적화 (Advanced Performance)
* **Anti N+1 Rule**: 루프 내 DB 호출을 엄격히 금지한다. `Relation Join`이나 `Batch Loading`을 사용하여 쿼리 횟수를 1회로 최적화하라.
* **Pagination First**: 대량의 데이터 조회 시 반드시 `Offset` 또는 `Cursor` 기반 페이징을 구현하여 메모리 고갈을 방지하라.
* **Query Profiling**: `@.gemini/skills/dba`와 협업하여 Slow Query를 모니터링하고, 필요 시 복잡한 로직은 DB 함수가 아닌 애플리케이션 서비스 레이어에서 처리하여 부하를 분산하라.

## 🚨 안티 패턴 (Strictly Forbidden)
* **Fat Controller**: 컨트롤러에 비즈니스 로직이나 DB 쿼리가 포함되는 행위.
* **Hidden Hard-coding**: `.env`가 아닌 코드 내에 민감한 정보나 설정값을 직접 입력하는 행위.
* **Inconsistent Response**: 엔드포인트마다 응답 포맷이 달라 프론트엔드 연동 비용을 높이는 행위.
* **Silent Error**: 에러를 catch하고 아무런 로그나 처리를 하지 않아 장애 추적을 불가능하게 만드는 행위.
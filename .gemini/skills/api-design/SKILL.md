---
name: api-design
description: "하이엔드 RESTful API 설계 표준, OpenAPI(Swagger) 규격, 상태 코드 전략 및 정밀 데이터 포맷 가이드"
metadata:
  version: "1.2.0"
  runtime: "REST / JSON / OpenAPI 3.0"
  output_format: "Must provide OpenAPI Spec and Markdown Table"
---

# API & Interface Design Standards (인터페이스 설계 표준)

본 가이드는 **System Architect**와 **Backend Specialist**가 API를 설계할 때 준수해야 하는 최상위 규격입니다. 모든 API는 '예측 가능성'과 '일관성'을 최우선 가치로 삼는다.

## 1. 리소스 명명 및 URI 구조 (Naming Strategy)
* **Resource-Oriented**: URI는 반드시 **명사의 복수형**을 사용하며, 계층 구조를 명확히 표현한다. (예: `/v1/users/{userId}/portfolios`)
* **Kebab-case**: URI 경로에 단어 구분 필요 시 `kebab-case`를 사용한다. (예: `/v1/asset-management/transactions`)
* **Versioning**: 모든 API는 접두사에 버전을 포함하여 하위 호환성을 관리한다. (예: `/api/v1/...`)



## 2. HTTP Methods & Idempotency (멱등성)
* `GET`: 리소스 조회. (Side-effect 금지)
* `POST`: 리소스 생성. 동일 요청 반복 시 중복 생성 방지를 위한 `Idempotency-Key` 헤더 지원 검토.
* `PATCH`: 리소스의 부분 수정. (자산 도메인에서는 `PUT`보다 데이터 무결성 측면에서 권장)
* `DELETE`: 리소스 삭제. (실제 서비스에서는 물리 삭제보다 `is_deleted` 필드를 활용한 논리 삭제 권장)

## 3. 응답 스키마 표준화 (Response Enveloping)
모든 응답은 아래의 Envelope 구조를 유지하며, 필드명은 `camelCase`를 엄격히 준수한다.

```json
{
  "success": "boolean",
  "data": "object | array | null",
  "error": {
    "code": "A_B_C_123",      // 서비스별 고유 에러 코드
    "message": "사용자 메시지", // 프론트엔드 노출용 한글 메시지
    "debug": "Internal message" // 개발자용 상세 로깅 (운영환경 배제)
  },
  "meta": {                   // 페이지네이션 및 추가 정보
    "page": 1,
    "limit": 20,
    "totalCount": 100
  },
  "timestamp": "ISO-8601"     // 예: 2026-03-25T17:40:50Z
}
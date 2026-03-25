---
name: api-design
description: "RESTful API 리소스 명명 규칙, JSON 응답 표준, DB 정규화 및 마이그레이션 전략 가이드"
metadata:
  version: "1.1.0"
  output_format: "Must provide OpenAPI Spec or Markdown Table"
---

# API & Database Design Standards

## 1. RESTful API 명명 규칙 (Naming Convention)
* **리소스 중심:** 엔드포인트는 반드시 **명사의 복수형**만 사용함. (예: `/users`, `/orders`)
* **HTTP Methods:** 
  * `GET`: 조회
  * `POST`: 생성 (중복 생성 방지 로직 포함)
  * `PATCH`: 부분 수정 (`PUT`보다 권장)
  * `DELETE`: 논리적/물리적 삭제

## 2. 응답 데이터 표준화 (Data Schema)
모든 API 응답은 아래 구조를 **반드시** 포함해야 하며, 필드명은 `camelCase`를 사용함.

```json
{
  "status": "success | error",
  "payload": {},
  "error": {
    "code": "STRING_ERROR_CODE",
    "message": "Human readable message"
  },
  "timestamp": "ISO-8601"
}
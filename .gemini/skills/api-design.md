# API & Database Design Patterns (API 및 DB 설계 패턴)

이 스킬은 Architect와 DBA 에이전트가 시스템을 설계할 때 준수해야 합니다.

## 1. RESTful API 설계 규칙
- 모든 API 엔드포인트는 명사형의 복수형을 사용하며, HTTP 메서드(GET, POST, PUT, DELETE)를 의미에 맞게 사용합니다.
- 모든 API 응답과 입력값은 Zod와 같은 검증(Validation) 라이브러리를 통해 엄격하게 검증되어야 합니다.
- Rate Limiting(속도 제한)과 에러 응답 형식(표준 JSON 에러 포맷)을 고려하여 설계하세요.

## 2. 데이터베이스 스키마 규칙
- 스키마 설계 시 정규화를 기본으로 하되, 조회 성능이 중요할 경우 역정규화를 고려하세요.
- 마이그레이션 스크립트는 롤백(Rollback)이 가능하도록 작성되어야 합니다.

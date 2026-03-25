---
name: dba
description: "데이터 모델링, 정규화 전략, 인덱스 최적화 및 안정적인 마이그레이션 운영 가이드라인 (SQLite/PostgreSQL/MySQL 대응)"
metadata:
  version: "1.1.0"
  runtime: "SQLite / PostgreSQL / MySQL / MongoDB / Prisma / TypeORM"
---

# Database Administration & Engineering (데이터 설계 및 관리 표준)

본 가이드는 **System Architect**, **DBA**, **Backend Specialist** 에이전트가 데이터 계층을 설계하고 물리적 스키마를 구축할 때 준수해야 하는 운영 원칙입니다.

## 1. 데이터 모델링 및 무결성 (Modeling & Integrity)
- **Normalization (3NF+)**: 모든 테이블은 3차 정규형 이상을 기본으로 설계하여 데이터 중복을 방지하라. 필요 시 `optimizer`와 협의하여 전략적 역정규화를 수행한다.
- **Strict Naming**: 테이블 및 컬럼명은 `snake_case`를 사용하되, 의미가 명확한 단수형 명사를 사용하라. (예: `user`, `order_item`)
- **Primary Key Standard**: 모든 테이블은 `id` 컬럼을 PK로 가지며, 글로벌 확장성을 위해 `UUID v4` 또는 고성능 `BigInt` 사용을 권장한다.
- **Constraints**: `NOT NULL`, `FOREIGN KEY`, `UNIQUE` 제약 조건을 활용하여 애플리케이션 진입 전 데이터 무결성을 1차 방어하라.

## 2. 테스트 및 로컬 환경 최적화 (SQLite Protocol)
- **Prototyping Strategy**: 초기 PoC 및 로컬 테스트 단계에서는 **SQLite**를 활용하여 인프라 오버헤드를 최소화하고 개발 속도를 극대화하라.
- **Path Isolation**: SQLite 데이터베이스 파일(`.db`)은 반드시 `src/server/data/` 또는 `.gemini/cache/` 등 격리된 경로에 위치시켜라.
- **Locking & Concurrency**: SQLite 사용 시 `WAL(Write-Ahead Logging)` 모드 활성화를 검토하여 동시성 문제를 예방하고, 운영 환경(PostgreSQL 등)으로 전환 시 호환되지 않는 구문(일부 Alter Table 등)이 있는지 미리 체크하라.

## 3. 인덱스 및 성능 최적화 (Indexing & Performance)
- **Selective Indexing**: 카디널리티(Cardinality)가 높은 컬럼부터 인덱스를 설계하고, 불필요한 인덱스 생성을 지양하여 쓰기 성능 저하를 막아라.
- **Query Audit**: `SELECT *` 사용을 금지하고, 복잡한 JOIN 쿼리는 반드시 `EXPLAIN ANALYZE`로 실행 계획을 확인하여 Sequential Scan 유무를 체크하라.
- **Connection Pooling**: 백엔드 에이전트 구현 시 커넥션 풀(Connection Pool) 설정을 점검하여 리소스 고갈을 방지하라.

## 4. 마이그레이션 및 안전 운영 (Migration & Safety)
- **Versioned Migration**: 모든 스키마 변경은 `migration-*.sql` 또는 ORM의 마이그레이션 도구를 통해서만 수행하며, 소스 제어 시스템(Git)에 포함하라.
- **Idempotency & Rollback**: 모든 마이그레이션은 여러 번 실행해도 안전해야 하며(멱등성), 반드시 장애 발생 시 즉시 복구 가능한 `Down` 스크립트를 포함하라.
- **Persistence Check**: `@.gemini/skills/devops-debug`와 연계하여 컨테이너 재시작 시에도 데이터가 보존되도록 외부 볼륨 마운트와 권한 설정을 점검하라.

## 🚨 안티 패턴 (Strictly Forbidden)
- **Hardcoded Secrets**: DB 접속 정보를 `.env`가 아닌 코드나 Dockerfile에 직접 노출하는 행위.
- **Schema Drift**: 마이그레이션 도구 없이 DB에 직접 접속하여 수동으로 스키마를 변경하는 행위.
- **Missing Backups**: 파괴적인 명령어(`DROP`, `TRUNCATE`) 수행 전 영향도 분석이나 백업 전략 없이 실행하는 행위.
- **SQLite in Prod**: 고가용성과 대규모 트래픽이 필요한 운영 환경에 SQLite를 그대로 방치하여 배포하는 행위 (최종 배포 전 반드시 운영급 DB로 전환).
# 프로젝트 글로벌 메모리 (Global Memory)

이 문서는 모든 에이전트가 공통으로 참조해야 하는 프로젝트의 핵심 원칙, 기술 스택, 그리고 협업 프로토콜을 정의합니다.

---

## 🚀 1. 프로젝트 비전 (Project Vision)
- **목표**: Gemini CLI와 멀티 에이전트 아키텍처를 활용한 고효율 개발 자동화 워크스페이스 구축.
- **핵심 가치**: 모듈화된 설계, 에이전트 간 명확한 역할 분담, 자동화된 문서화 및 품질 검증.

## 🛠️ 2. 핵심 기술 스택 (Core Tech Stack)
에이전트들은 다음 기술 스택을 최우선으로 고려한다:
- **Core**: JavaScript / Node.js
- **Frontend**: React (Vite 기반), Vanilla CSS (미학적 디자인 중시)
- **Backend**: Express / Fastify (API-first 아키텍처)
- **Storage**: SQLite / PostgreSQL (상황에 맞게 선택)
- **CLI/Agents**: Gemini CLI, MCP Servers, NotebookLM (지식 소스로 활용)

## 🏗️ 3. 아키텍처 원칙 (Architecture Principles)
- **API-First**: 프론트엔드 구현 전 backend/architect 에이전트가 API 명세를 `src/shared/specs/`에 먼저 확정한다.
- **Component-Driven**: UI는 재사용 가능한 작은 단위의 컴포넌트로 분리하여 `src/frontend/components/`에 위치시킨다.
- **Strict Separation**: 비즈니스 로직과 UI 로직을 분리한다 (Hooks 또는 Services 레이어 활용).
- **Traceability**: 모든 코드 변경은 `.gemini/agents/tasks/`의 태스크 ID와 연동된 로그를 남긴다.

## 🌉 4. 에이전트 협업 및 인프라 활용 프로토콜 (Infrastructure & Handoff)

모든 에이전트는 다음 폴더를 프로젝트의 '공통 기억 저장소' 및 '의사결정 엔진'으로 활용한다:

### 📋 4.1. Planning Protocol (`.gemini/agents/plans/`)
- **버전 관리**: 모든 주요 마일스톤이나 복합 태스크는 `plans/`에 로드맵을 작성하고 승인받아야 한다.
- **실패 분석**: 계획대로 진행되지 않을 경우, `debugger`는 수정된 계획을 `plans/`에 리플래닝(Re-planning)하여 기록한다.

### 🧠 4.2. Memory Protocol (`.gemini/memory/`)
- **[Ephemeral Context]**: 에이전트 간 핸드오프 시 필요한 단기 맥락(API 데이터 타입, UI 컬러값 등)은 `memory/` 하위의 전용 마크다운 파일에 기록하여 공유한다.
- **[Knowledge Retention]**: 프로젝트 전체에 영향을 미치는 기술적 결정 사항은 반드시 `memory/global.md`의 'Project Decisons' 섹션에 누적 기록한다.

### 📝 4.3. Logging Protocol (`.gemini/logs/`)
- **[Incident Reports]**: 태스크가 `failed` 처리될 경우, `debugger`는 `logs/errors/`에 공식적인 사후 분석 보고서(RCA)를 작성하고, 다른 에이전트들이 이를 학습하여 동일한 실수를 반복하지 않도록 한다.
- **[Traceability]**: 중차대한 시스템 변경 시, 명령어 실행 추적 로그를 `logs/traces/`에 정확한 날짜와 시각을 포함하여 남겨 시스템 복구의 근거로 삼는다.

### 📜 4.4. Delegation Ledger Protocol (`.gemini/logs/delegation-ledger.md`)
- **[Call Registry]**: 모든 에이전트 간 서브에이전트 호출 시 다음과 같은 포맷으로 호출 지시 내용이 포함된 장부를 기록한다.
- **포맷**: `| YYYY-MM-DD HH:mm:ss | 호출자 | 수신자 | 태스크 ID | 호출 지시 내용 (Summary) | 결과 |`
- **목적**: 프로젝트 전체의 작업 흐름(Flux)을 단일 파일에서 요약 파악할 수 있도록 한다.

---

## 📏 5. 코드 품질 및 명명 규칙 (Standards)
- **Naming**: `kebab-case` (파일/폴더), `camelCase` (변수/함수), `PascalCase` (컴포넌트/클래스).
- **Documentation**: 모든 공개 API와 복잡한 로직은 JSDoc 또는 Markdown으로 문서화한다.
- **Linting**: Prettier와 ESLint의 기본 설정을 준수한다.

---
*마지막 업데이트: 2026-03-26*
*작성자: Antigravity*

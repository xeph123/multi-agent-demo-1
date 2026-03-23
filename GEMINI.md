# Gemini 멀티 에이전트 워크스페이스 (Gemini Multi-Agent Workspace)

이 프로젝트는 Gemini CLI 에이전트들이 상호작용하고 협업하기 위한 전용 워크스페이스입니다. 에이전트의 작업(Task), 계획(Plan), 그리고 코드 생성을 관리하는 데 필요한 인프라를 제공합니다.

## 지침
- 프롬프트 답변은 짧고 간결하게 한글로 작성한다.
- **모든 소스코드 작업 결과물(프론트엔드, 백엔드 등)은 `.gemini` 폴더 외부(프로젝트 루트 또는 `src/` 등)에 위치시켜야 한다.**
- 개념 설명 시 간결하고 핵심적인 전문 용어를 사용한다.
- 추가 설명은 bullet point로 정리

## 토큰 최적화
- 불필요한 서론, 잡담 금지
- 핵심 용어 외 반복적인 설명은 배제
- 코드 주석은 필수적일 때만 사용

## 프로젝트 개요

이 워크스페이스는 Gemini CLI의 실험적인 에이전트 기능을 지원하도록 구성되어 있습니다. 여러 에이전트가 작업 정의, 구현 계획, 작업 영역을 위한 전용 디렉토리를 사용하여 조화롭게 작업할 수 있도록 구조화되어 있습니다.

- **목적:** Gemini CLI 에이전트가 복잡한 다단계 작업을 실행할 수 있는 구조화된 환경 제공.
- **주요 기술:** Gemini CLI, Gemini API.
- **아키텍처:** 오케스트레이터(Orchestrator) 기반의 멀티 에이전트 협업 시스템.

## 주요 파일 및 디렉토리

### 설정 (Configuration)
- **`.gemini/settings.json`**: 실험적인 에이전트 기능을 활성화합니다 (`"experimental.enableAgents": true`).
- **`.env`**: `GEMINI_API_KEY`와 같은 환경 변수를 저장합니다.

### 에이전트 인프라 (`.gemini/agents/`)
- **`tasks/`**: 에이전트의 작업 정의(Task definitions)를 저장하는 용도입니다.
- **`plans/`**: 에이전트가 생성한 구현 계획(Implementation plans)을 저장하는 용도입니다.
- **`workspace/`**: 에이전트가 내부적으로 사용하는 임시 작업 영역입니다. (실제 소스코드는 이 폴더 바깥에 생성합니다.)
- **`logs/`**: 에이전트 실행 로그가 저장됩니다.

### 명령어 (`.gemini/commands/agents/`)
다양한 전문 분야의 에이전트들이 정의된 `.toml` 파일들입니다.
- **`orchestrator.toml`**: 팀장 역할을 수행하며 작업을 분배하고 조율합니다.
- **분야별 에이전트**: `frontend`, `backend`, `dba`, `debugger`, `architect`, `pm`, `security` 등.

### 스킬 (`.gemini/skills/`)
에이전트들이 특정 작업을 수행할 때 참고하는 방법론 및 지침입니다.
- **`planning.md`**: 기능 명세 및 단계별 계획(Phased Plans) 작성 규칙을 정의합니다.
- **`api-design.md`**, **`react-patterns.md`**, **`security-review.md`** 등.

## 사용법 (Usage)

### 주요 명령어 예시
이 워크스페이스에서는 정의된 에이전트들을 호출하여 작업을 수행합니다.

- **오케스트레이터 호출:**
  ```powershell
  gemini /orchestrator "새로운 로그인 시스템 구축을 위한 전체 계획을 세워줘"
  ```

- **특정 에이전트 호출:**
  ```powershell
  gemini /frontend "로그인 UI 컴포넌트 생성"
  ```

### 개발 컨벤션 (Development Conventions)
1. **단계별 계획 (Phased Plans) 준수**: `planning.md`에 따라 [기획 -> 구현 -> 리뷰] 단계를 철저히 지킵니다.
2. **작업 정의**: 모든 작업은 ID를 부여받고 `.gemini/agents/tasks/`에 명확히 기록되어야 합니다.
3. **도구 자동 승인**: 서브 에이전트 호출 시 `-y` 플래그를 사용하여 흐름이 끊기지 않도록 합니다.
4. **결과물 위치**: 에이전트가 생성하는 모든 실제 서비스용 소스코드는 `.gemini` 디렉토리 외부(예: `/frontend`, `/backend`, `/src` 등)에 생성해야 합니다.

---
*참고: 이 파일은 Gemini CLI 상호작용을 위한 컨텍스트를 제공하기 위해 자동으로 생성되었습니다.*

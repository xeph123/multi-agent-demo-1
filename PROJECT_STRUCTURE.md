# 프로젝트 구조 개요 (Project Structure Overview)

이 워크스페이스는 **Gemini CLI 멀티 에이전트 시스템**을 위한 환경으로, 여러 전문 에이전트가 협업하여 복잡한 개발 태스크를 수행할 수 있도록 설계되었습니다.

## 1. 디렉토리 구조 및 역할

### 📂 `.gemini/` (에이전트 코어)
에이전트의 작동 방식, 명령 체계, 스킬셋을 정의하는 핵심 폴더입니다.
- **`agents/`**: 에이전트의 작업(`tasks/`)과 실행 계획(`plans/`)을 관리합니다.
- **`commands/agents/`**: 개별 에이전트(Frontend, Backend, DBA 등)의 역할과 페르소나가 정의된 `.toml` 파일들이 위치합니다.
- **`skills/`**: 에이전트가 특정 도구나 방법론(API 설계, 보안 리뷰, UI 디자인 등)을 사용할 때 참조하는 가이드라인입니다.
- **`memory/`**: 세션 간 공유되는 글로벌 설정 및 히스토리를 저장합니다.
- **`workspace/`**: 에이전트 내부 작업용 임시 영역입니다.

### 📂 루트 디렉토리 및 소스 코드
- **`GEMINI.md`**: 프로젝트의 메인 헌장 및 에이전트 협업 규칙을 명시합니다.
- **`README.md`**: 프로젝트 기본 설명서입니다.
- **`src/` (권장)**: 에이전트가 생성하는 모든 실제 서비스 소스 코드는 `.gemini` 외부인 이곳에 위치해야 합니다.

### 📂 상세 디렉토리 계층 (Detailed Directory Hierarchy)

```text
multi-agent-demo-1/
├── .gitignore
├── GEMINI.md                    # 워크스페이스 메인 지침서
├── README.md                    # 프로젝트 기본 설명
├── PROJECT_STRUCTURE.md         # (현재 파일) 프로젝트 구조 정보
└── .gemini/                     # 에이전트 인프라 루트
    ├── settings.json            # 에이전트 기능 활성화 설정
    ├── agents/                  # 에이전트 실행 데이터
    │   ├── plans/               # 에이전트가 생성한 구현 계획 (.md)
    │   └── tasks/               # 작업 정의 및 상태 기록 (.json)
    ├── commands/                # 에이전트 명령 정의
    │   └── agents/              # 각 분야별 에이전트 설정 (.toml)
    │       ├── orchestrator.toml, frontend.toml, backend.toml, dba.toml,
    │       ├── architect.toml, debugger.toml, designer.toml, devops.toml,
    │       ├── docs.toml, optimizer.toml, pm.toml, reviewer.toml,
    │       ├── scout.toml, security.toml, status.toml, task-planner.toml,
    │       └── task-runner.toml, tester.toml
    ├── skills/                  # 에이전트 지식/가이드 (SKILL.md)
    │   ├── algorithmic-art, api-design, backend-patterns, brand-guidelines,
    │   ├── canvas-design, claude-api, context-manager, dba, devops-debug,
    │   ├── doc-coauthoring, docs-research, docx, frontend-design, git-workflow,
    │   ├── internal-comms, mcp-builder, orchestration-delegation, pdf,
    │   ├── persistent-debugging, planning, pptx, qa-testing, quality-security-gate,
    │   ├── security-review, skill-creator, slack-gif-creator, theme-factory,
    │   └── web-artifacts-builder, webapp-testing, xlsx
    ├── logs/                    # 실행 로그 및 히스토리
    ├── memory/                  # 글로벌/세션별 메모리
    │   ├── history/             # 세션 히스토리 저장소
    │   └── global.md            # 글로벌 메모리 파일
    └── workspace/               # 에이전트 내부 임시 작업 공간
```

## 2. 주요 에이전트 구성
`orchestrator.toml`을 중심으로 다음과 같은 전문 에이전트들이 협업합니다.
- **Orchestrator**: 전체 작업을 분배하고 조율하는 팀장 역할
- **Frontend / Backend**: 각 영역의 코드 구현 담당
- **DBA**: 데이터베이스 모델링 및 쿼리 최적화
- **Security / Reviewer**: 코드 안정성 및 품질 검수
- **PM / Architect**: 기획 및 시스템 설계

## 3. 핵심 개발 컨벤션
1. **Phased Plans**: [기획 -> 구현 -> 리뷰] 단계를 준수하여 진행합니다.
2. **Output Location**: 모든 실행 코드는 반드시 `.gemini` 폴더 외부에 생성합니다.
3. **Task Tracking**: 모든 작업은 ID를 부여받아 `.gemini/agents/tasks/`에 기록됩니다.
4. **Tool Approval**: 효율적인 흐름을 위해 서브 에이전트 호출 시 자동 승인(`-y`)을 활용합니다.

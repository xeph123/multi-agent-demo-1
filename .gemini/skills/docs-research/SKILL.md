---
name: docs-research
description: "기술 조사(Scouting), ADR 작성 및 고품질 기술 문서화 표준 가이드"
metadata:
  version: "1.2.0"
  output_types: ["ADR", "API Guide", "Tech Radar"]
---

# Documentation & Research Standards (기술 문서 및 리서치 표준)

본 가이드는 **Technical Writer**, **Scout**, **Researcher** 에이전트가 프로젝트의 지식 자산을 구축할 때 준수해야 하는 엔지니어링 표준입니다.

## 1. 전략적 리서치 및 기술 조사 (Technical Scouting)
- **Evidence-based**: 기술 도입 제안 시 반드시 **Pros/Cons, 커뮤니티 활성도, 유지보수 현황**을 포함한 비교 매트릭스를 제시하라.
- **Reference Tracking**: 모든 조사 결과에는 `@.gemini/skills/claude-api`의 최신 모델 정보를 활용하되, 반드시 공식 문서(Official Docs)의 URL과 참조 날짜를 명시하라.
- **PoC Linkage**: 이론적 조사에 그치지 말고, 해당 기술을 프로젝트의 현재 스택(`src/` 구조)에 어떻게 이식할지에 대한 간단한 코드 스니펫이나 구조도를 포함하라.



## 2. ADR (Architecture Decision Record) 작성
- **Context-First**: "무엇을 선택했는가"보다 **"어떤 제약 사항 때문에 이 결정을 내렸는가"**를 상세히 기록하라.
- **Status Management**: 결정의 상태(Proposed, Accepted, Superceded, Deprecated)를 명확히 관리하여 아키텍처의 변천사를 추적 가능하게 하라.
- **Structure**: Title, Status, Context, Decision, Consequences(결정 후 예상되는 부작용 포함) 형식을 엄격히 준수하라.

## 3. 문서 공동 작성 및 검증 (Co-authoring)
- **Reader-Centric**: `@.gemini/skills/doc-coauthoring`의 'Reader Testing' 원칙을 적용하여, 해당 도메인 지식이 없는 개발자도 이해할 수 있는지 자가 검증하라.
- **Visual Aid**: 복잡한 아키텍처나 데이터 흐름은 텍스트 설명에 의존하지 말고, Mermaid 차트나 다이어그램 구조를 텍스트로 설계하여 포함하라.

## 🚨 안티 패턴 (Strictly Forbidden)
- **Slop Documentation**: AI가 생성한 뻔하고 장황한 설명(Intro/Outro)을 제거하고, 핵심 정보 위주의 **'Lean Documentation'**을 지향하라.
- **Recency Bias**: 단순히 "최신 트렌드라서"라는 이유는 배제하라. 프로젝트의 규모, 팀의 숙련도, 운영 비용을 고려한 근거를 제시하라.
- **Shadow Knowledge**: `context.md`에 반영되지 않은 개별 에이전트만의 독자적인 기술 결정을 금지한다.
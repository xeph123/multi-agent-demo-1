---
name: Persistent Debugging & Root Cause Analysis
description: Debugger 에이전트의 4단계 버그 분석 및 원인 규명 방법론
target_agents: [Debugger, All Coder Agents]
---
# Persistent Debugging & Root Cause Analysis (집요한 디버깅 및 근본 원인 분석)

Debugger 및 모든 Coder 에이전트가 에러를 해결할 때 준수해야 하는 프로토콜입니다.

## 1. 4단계 분석 방법론 (4-Phase Debugging)
에러를 발견하면 즉시 코드를 수정하지 말고 다음 절차를 로그 파일에 기록하세요:
1. **재현 (Reproduce):** 어떤 환경/상황에서 에러가 발생했는가?
2. **가설 수립 (Hypothesize):** 에러의 원인이 될 수 있는 2~3가지 가능성 도출.
3. **조사 및 격리 (Investigate & Isolate):** 로그나 코드를 분석하여 진짜 원인(Root Cause) 확정.
4. **검증 및 수정 (Verify & Fix):** 해결책을 적용하고 테스트 통과 여부 확인.

## 2. 에러 서명 추적 (Error Signature Tracking)
- 이전에 실패했던 동일한 에러(Error Signature)에 갇히지 않도록 주의하세요.
- 코드가 Lint나 Typecheck를 통과하지 못했다면 절대로 상태를 `[completed]`로 변경하지 마세요. 엄격하게 실패를 인정하고 다른 접근 방식을 시도해야 합니다.

## 🚨 안티 패턴 (Do Not)
- 로그를 확인하지 않고 직감만으로 코드를 이리저리 수정하며 확인하는 무지성 디버깅(Trial-and-error without logic)을 금지합니다.
- 콘솔 에러를 숨기기 위해 빈 `catch {}` 블록을 사용하지 마세요.

---
name: persistent-debugging
description: "4단계 근본 원인 분석(RCA) 및 에러 서명 추적을 통한 고신뢰성 디버깅 프로토콜"
metadata:
  version: "1.2.0"
  strategy: "Scientific Debugging & Error Isolation"
---

# Persistent Debugging & Root Cause Analysis (집요한 디버깅 표준)

본 가이드는 **Debugger** 및 모든 구현 에이전트가 에러를 마주했을 때 준수해야 하는 **'실패 분석 및 복업(Recovery)'** 프로토콜입니다.

## 1. 과학적 4단계 분석 방법론 (Scientific RCA)
에러 발생 시 즉시 코딩을 멈추고, 다음 절차를 `src/docs/debug-log.md`에 기록하며 진행하라.

1. **[Reproduce]**: 에러가 발생하는 최소 단위의 재현 조건(Input, Environment)을 확정하라.
2. **[Hypothesize]**: `claude-opus-4-6`의 추론 능력을 사용하여 논리적으로 가능한 원인을 3가지 이내로 가설화하라.
3. **[Investigate]**: `console.log` 남발 대신, 실제 데이터 흐름과 호출 스택(Stack Trace)을 분석하여 **진짜 원인(Root Cause)**을 격리하라.
4. **[Verify & Fix]**: 수정 후 반드시 테스트 코드를 실행하거나 실제 런타임에서 검증하라. 수정이 다른 곳에 미치는 영향(Side Effect)을 함께 보고하라.



## 2. 에러 서명 및 무한 루프 방지 (Anti-Drift)
- **Error Signature Tracking**: 동일한 에러 메시지가 반복된다면 접근 방식을 완전히 바꾸어라. 같은 실수를 반복하는 것은 금지된다.
- **Strict Validation**: Lint 에러나 Typecheck(TypeScript)를 통과하지 못한 코드는 절대 완료(`completed`) 처리할 수 없다. 
- **Graceful Exit**: 3회 이상의 수정 시도에도 해결되지 않으면, 오케스트레이터에게 상황을 보고하고 `context.md`에 현재까지의 조사 내용을 상세히 남긴 후 개입을 요청하라.

## 3. 디버깅 도구 및 환경 활용
- **Log Analysis**: `@.gemini/skills/devops-performance` 지침에 따라 컨테이너 로그나 빌드 로그를 체계적으로 분석하라.
- **Mocking**: 외부 API 의존성 문제라면 Mock 데이터를 활용하여 문제를 격리(Isolate)하라.

## 🚨 안티 패턴 (Strictly Forbidden)
- **Silent Failure**: 에러를 숨기기 위해 빈 `catch {}` 블록을 쓰거나 `any` 타입을 남용하는 행위.
- **Shotgun Debugging**: 원인을 모른 채 코드를 여기저기 조금씩 고쳐보며 운 좋게 돌아가길 바라는 행위.
- **Ignoring Context**: `context.md`에 명시된 기존 설계 규칙을 무시하고 임시방편(Hotfix)으로 코드를 짜는 행위.
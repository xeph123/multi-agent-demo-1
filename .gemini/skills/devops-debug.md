# DevOps, Debugging & Performance Methodology (인프라, 디버깅 및 성능 최적화)

이 스킬은 DevOps, Debugger, Performance Optimizer 에이전트가 사용합니다.

## 1. DevOps 및 Docker 규칙
- Dockerfile 작성 시 Multi-stage 빌드를 사용하여 이미지 크기를 최소화하고 컨테이너 보안을 준수하세요.
- CI/CD 파이프라인(예: GitHub Actions) 구성 시 테스트 통과 후 배포되도록 설정하세요.

## 2. 4단계 디버깅 방법론 (4-Phase Debugging)
런타임 에러 발생 시 즉시 코드를 수정하지 말고 다음 단계를 따르세요:
1. 현상 파악: 에러 로그의 근본 원인을 파악합니다.
2. 가설 수립: 문제가 발생한 원인에 대한 가설을 세웁니다.
3. 로그 분석: 가설을 검증할 증거를 찾습니다.
4. 해결책 제시: 확정된 원인을 바탕으로 코드를 수정합니다.

## 3. 성능 최적화 (Performance)
- Core Web Vitals 지표를 기준으로 렌더링 병목 현상과 캐싱 효율성을 프로파일링하고 개선안을 제시하세요.

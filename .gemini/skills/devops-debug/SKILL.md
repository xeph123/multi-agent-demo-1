---
name: DevOps & Performance Methodology
description: 인프라 구성, Docker 빌드, 성능 최적화 가이드라인
target_agents: [DevOps, Performance Optimizer]
---
# DevOps & Performance Methodology (인프라 및 성능 최적화)

이 스킬은 DevOps, Performance Optimizer 에이전트가 사용합니다. (에러 디버깅은 `persistent-debugging.md` 참조)

## 1. DevOps 및 Docker 규칙
- Dockerfile 작성 시 Multi-stage 빌드를 사용하여 이미지 크기를 최소화하고 컨테이너 보안을 준수하세요.
- CI/CD 파이프라인(예: GitHub Actions) 구성 시 테스트 통과 후 배포되도록 설정하세요.

```dockerfile
# 예시: Multi-stage Docker 빌드
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
# ...
```

## 2. 성능 최적화 (Performance)
- Core Web Vitals 지표를 기준으로 렌더링 병목 현상과 캐싱 효율성을 프로파일링하고 개선안을 제시하세요.
- 필요 시 CDN, Redis 등 외부 캐싱 레이어 도입을 제안하세요.

## 🚨 안티 패턴 (Do Not)
- 운영 환경 컨테이너를 `root` 권한으로 실행하지 마세요.
- 환경 변수(`.env`) 파일을 Docker 이미지에 구워넣지(Bake-in) 마세요.

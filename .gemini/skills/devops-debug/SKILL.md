---
name: devops-debug
description: "고성능 인프라 구축, 보안 Docker 빌드 및 컨테이너 레벨 디버깅 가이드라인"
metadata:
  version: "1.2.0"
  runtime: "Docker / Node.js / Python / Linux"
---

# DevOps & Debugging Methodology (인프라 및 장애 대응 표준)

본 가이드는 **DevOps** 및 **Performance Optimizer** 에이전트가 시스템을 구축하고, 발생한 인프라 장애를 추적할 때 준수해야 하는 운영 원칙입니다.

## 1. 보안 및 최적화된 빌드 (Secure & Lean Docker)
- **Multi-stage Build**: 빌드 도구와 소스코드를 분리하여 최종 이미지에는 런타임 필수 파일만 포함하라. (`alpine` 기반 권장)
- **Layer Caching**: `package.json` 복사와 의존성 설치(`npm ci`)를 소스코드 복사보다 먼저 수행하여 빌드 시간을 단축하라.
- **Rootless Container**: 반드시 전용 유저를 생성하여 프로세스를 실행하고, `root` 권한 사용을 엄격히 금지하라.



## 2. 인프라 디버깅 및 관측성 (Observability)
장애 발생 시 에이전트는 다음 명령을 통해 상태를 진단하라.
- **Log Analysis**: `docker logs --tail 100 [container_name]`를 통해 런타임 에러 확인.
- **Resource Check**: `docker stats`로 메모리 누수(Memory Leak) 및 CPU 병목 현상 파악.
- **Network Debug**: 컨테이너 간 통신 문제 시 `ping`, `curl`, `netstat` 등을 활용하여 연결성을 격리(Isolate) 분석하라.

## 3. 성능 최적화 (Optimization)
- **Web Vitals**: `@.gemini/skills/frontend-design`과 연계하여 LCP, CLS 지표를 개선하기 위한 캐싱 전략을 수립하라.
- **Environment Management**: API 키나 시크릿은 절대 이미지에 굽지 말고(Bake-in 금지), 런타임 환경변수나 Secret Manager를 통해 주입하라.

## 🚨 안티 패턴 (Strictly Forbidden)
- **Heavy Images**: `ubuntu`나 `node:latest` 같은 무거운 이미지를 그대로 배포하여 공격 표면을 넓히는 행위.
- **Zombie Processes**: 에러 발생 시 자동 재시작(Restart Policy) 설정 없이 컨테이너를 방치하는 행위.
- **Blind Debugging**: 로그 확인 없이 컨테이너를 껐다 켜기만 반복하는 행위.
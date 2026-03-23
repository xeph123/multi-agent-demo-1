---
name: Frontend & UI Development Patterns
description: React/Next.js 컴포넌트 원칙, 스타일링 라이브러리 및 상태 관리 패턴
target_agents: [Frontend Specialist, UI/UX Designer]
---
# Frontend & UI Development Patterns (프론트엔드 및 UI 개발 패턴)

이 스킬은 Frontend Specialist와 UI/UX Designer 에이전트가 참고합니다.

## 1. React/Next.js 컴포넌트 원칙
- 모든 컴포넌트는 함수형으로 작성하며, React Hooks를 활용한 상태 관리를 지향합니다.
- 디렉토리 구조(예: Feature-Sliced Design 아키텍처) 표준을 지키고, 비즈니스 로직과 UI(View)를 분리하세요.
- 에러 바운더리(Error Boundary)를 적용하여 컴포넌트 렌더링 에러가 앱 전체 크래시로 번지지 않도록 방어하세요.

```tsx
// 예시: 로직 분리 커스텀 훅 패턴
const useUserData = (userId) => {
  const { data, error } = useSWR(`/api/users/${userId}`, fetcher);
  return { user: data, isLoading: !error && !data, isError: error };
};
```

## 2. 스타일링 및 디자인 시스템
- Tailwind CSS를 사용하여 반응형 웹 디자인(Mobile-first)을 구현하세요.
- 하드코딩된 색상이나 크기 대신, 정의된 디자인 토큰(Design Tokens)을 사용하세요.

## 🚨 안티 패턴 (Do Not)
- `useEffect` 안에서 불필요하게 상태를 동기화하여 무한 렌더링(Infinite Loop)을 유발하지 마세요.
- 재사용성이 떨어지는 컴포넌트를 분리 명목으로 과도하게 쪼개지 마세요.

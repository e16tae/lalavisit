# Lalavisit | Operations Guide

이 문서는 웹사이트 콘텐츠 업데이트, 브랜드 일관성 유지, 배포 전/후 점검을 담당하는 운영자를 위한 가이드입니다.

## 1. 콘텐츠 관리

### 블로그 게시물
- 데이터 파일: `data/blog-posts.json`
- 필수 필드:
  ```json
  {
    "id": "unique-post-id",
    "title": "제목",
    "excerpt": "요약 (1-2줄)",
    "content": "본문 내용입니다.\\n\\n문단은 \\n\\n으로 구분합니다.",
    "category": "공지사항",
    "author": "작성자",
    "publishedAt": "2025-01-15",
    "thumbnail": "/blog/sample.jpg"
  }
  ```
- Markdown 스타일: `**굵게**`, `- 리스트`, `\n\n` 으로 문단 구분
- 미리보기 이미지는 `public/blog/` 경로에 저장합니다.

### 활동 사진
- 데이터 파일: `data/activities.json`
- 카테고리: `field` (현장), `education` (교육)
  ```json
  {
    "id": 7,
    "title": "활동 제목",
    "description": "설명",
    "date": "2025-01-15",
    "careGrade": "3등급",
    "service": "방문요양",
    "image": "/activities/field/sample.jpg"
  }
  ```
- 이미지는 `public/activities/field/` 또는 `public/activities/education/`에 업로드합니다.

### 이용 후기
- 데이터 파일: `data/reviews.json`
  ```json
  {
    "id": 7,
    "name": "김**",
    "grade": "3등급",
    "service": "방문요양",
    "rating": 5,
    "comment": "이용 후기",
    "date": "2025-01-15"
  }
  ```
- 실명은 약자로 표기하고, 개인정보는 포함하지 않습니다.

## 2. 브랜드 & UI 유지

- 로고: `public/logo.svg`
- 주요 색상 및 폰트는 Tailwind 설정(`tailwind.config`)에 정의되어 있습니다. UI 변경 시 브랜드 가이드를 검토합니다.
- 콘텐츠 업데이트 후 `npm run dev` 로 로컬에서 레이아웃과 반응형 동작을 확인합니다.

## 3. SEO & 마케팅

1. **Search Console**
   - Google Search Console, Naver Search Advisor에 사이트 등록
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 값 갱신
   - Sitemap 제출: `https://www.example.com/sitemap.xml`
2. **Analytics**
   - Google Analytics `NEXT_PUBLIC_GA_ID` 설정
   - 월간/분기별 성과 리포트 확인
3. **콘텐츠 최적화 체크리스트**
   - 페이지별 고유한 `title`/`description`
   - 이미지 `alt` 텍스트 입력
   - Schema.org 구조화 데이터 검증 (`https://validator.schema.org/`)
   - Lighthouse 성능/접근성 점수 90점 이상 유지
4. **지역 비즈니스 등록**
   - Google Business Profile, Naver 플레이스 정보 최신화
   - 주소/연락처 변경 시 즉시 업데이트

## 4. 운영 체크리스트

### 출시 전
- [ ] `.env.example` 기반으로 실제 값 입력 및 배포 환경 검증
- [ ] `scripts/create-k8s-secrets.sh` 실행 후 Secret 생성 확인
- [ ] TLS 인증서 준비 및 적용
- [ ] 브라우저 호환성 (Chrome, Edge, Safari, 모바일) 검토
- [ ] 문의 폼 테스트 메일 수신 확인
- [ ] Search Console/Naver Search Advisor 소유권 확인
- [ ] 404/500 페이지 정상 동작 확인

### 주기적 점검
- **주간**: 상담 폼 테스트, 핵심 페이지 로딩 속도 측정, 콘텐츠 최신화 여부 확인
- **월간**: 의존성 업데이트 검토, SEO 지표 점검, Sitemap 재검증
- **분기별**: 환경 변수/비밀 값 재확인, TLS 만료일 갱신, 접근성 점검

## 5. 자동화 스크립트

- `scripts/create-k8s-secrets.sh`: SMTP 및 공개 변수 Secret 생성
- `scripts/healthcheck.sh` (존재하는 경우): 배포 후 헬스체크 자동화
- `scripts/sync-search-console.sh` (필요 시 추가): 검색엔진 등록 자동화용 템플릿

스크립트 실행 전 `chmod +x scripts/<script-name>.sh` 로 실행 권한을 부여합니다.

## 6. 변경 관리

1. 운영 변경은 Git을 통해 관리하고, 변경 내역을 PR/이슈에 기록합니다.
2. 민감 정보는 절대 커밋하지 않습니다. `.env.local`, `.env.production`은 항상 `.gitignore` 상태를 유지합니다.
3. 배포 후에는 `docs/README.md`의 업데이트 날짜를 검토하고 필요한 문서를 갱신합니다.

## 7. 문의 대응 프로세스

- 문의 메일은 `CONTACT_EMAIL`로 도착합니다.
- 업무 시간을 정의하고 자동 회신 문구를 설정합니다.
- 민감한 개인정보 요청은 답변 전에 내부 승인 절차를 거칩니다.
- 메일 서버 오류 발생 시 `kubectl logs deployment/lalavisit-frontend -n lalavisit` 로 앱 로그를 확인하고, SMTP Secret을 점검합니다.


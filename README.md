# 라라재가방문요양센터 웹사이트

믿을 수 있는 방문요양, 가족요양, 입주간병 서비스를 제공하는 라라재가방문요양센터의 공식 웹사이트 '라라방문'입니다.

## 🚀 기술 스택

- **Framework**: Next.js 15 (App Router, Standalone Mode)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4, shadcn/ui
- **폰트**: Pretendard Variable
- **아이콘**: Lucide React
- **이메일**: Nodemailer (네이버 SMTP)
- **Analytics**: Google Analytics (선택사항)
- **배포**: Docker + Kubernetes + ArgoCD
- **CI/CD**: GitHub Actions

## 📦 주요 기능

### ✅ 완료된 기능

1. **SEO 최적화**
   - 페이지별 메타데이터 (Open Graph, Twitter Cards)
   - sitemap.xml / robots.txt 자동 생성
   - Schema.org 구조화된 데이터 (LocalBusiness, Service)
   - PWA manifest

2. **서비스 페이지**
   - 방문요양, 가족요양, 입주간병 안내
   - 노인장기요양보험 제도 안내
   - 2025년 방문요양 수가 정보
   - 복지용구 대여/구입 안내

3. **소개 페이지**
   - 센터 인삿말
   - 센터장 프로필
   - 네이버 지도 연동
   - 찾아오는 길 안내

4. **활동 갤러리**
   - 현장 사진 (요양등급, 서비스 정보 표기)
   - 교육 사진 (교육 유형, 시간 표기)
   - 탭 UI로 구분

5. **문의 기능**
   - 플로팅 버튼 (전화, 카카오톡, 이메일, 상담신청)
   - 상담 요청 폼
   - 네이버 SMTP로 이메일 전송

6. **후기/리뷰**
   - 홈페이지 리뷰 섹션
   - 카루셀 UI
   - 통계 표시

7. **에러 처리**
   - 404 Not Found
   - 500 Server Error
   - Global Error
   - Loading States

8. **성능 최적화**
   - 이미지 최적화 (AVIF, WebP)
   - React 엄격 모드
   - Multi-stage Docker build

9. **접근성**
   - Skip to content
   - ARIA 레이블
   - 키보드 네비게이션
   - Screen reader 지원

10. **CI/CD**
    - GitHub Actions 자동 빌드
    - Docker 이미지 자동 생성
    - ArgoCD GitOps 배포

## 🛠️ 설치 및 실행

### 사전 요구사항

- Node.js 20 이상
- Docker (배포 시)
- K8s 클러스터 (배포 시)

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 네이버 메일 SMTP 설정
EMAIL_USER=lalavisit@naver.com
EMAIL_PASSWORD=YOUR_PASSWORD
SMTP_HOST=smtp.naver.com
SMTP_PORT=587

# 센터 이메일
CONTACT_EMAIL=lalavisit@naver.com

# 사이트 URL
NEXT_PUBLIC_SITE_URL=https://www.lalavisit.com

# Google Analytics (선택사항)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 카카오톡 채널
NEXT_PUBLIC_KAKAO_CHANNEL_URL=https://pf.kakao.com/_xnxoxoxG/chat
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
lalavisit/
├── .github/
│   └── workflows/
│       └── ci-cd.yaml           # GitHub Actions CI/CD
├── app/                         # Next.js App Router
│   ├── about/                   # 센터 소개
│   ├── activities/              # 활동 갤러리
│   ├── api/                     # API Routes
│   ├── contact/                 # 상담 신청
│   └── services/                # 서비스 안내
├── argocd/
│   └── application.yaml         # ArgoCD Application
├── components/                  # React 컴포넌트
│   ├── floating-contact.tsx
│   ├── footer.tsx
│   ├── google-analytics.tsx
│   ├── navigation.tsx
│   ├── reviews-section.tsx
│   └── schema-org.tsx
├── data/                        # JSON 데이터
│   ├── activities.json          # 활동 사진 메타데이터
│   └── reviews.json             # 후기 데이터
├── k8s/                         # Kubernetes 매니페스트
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── secret-example.yaml
├── lib/
│   └── utils.ts                 # shadcn/ui utils
├── public/                      # 정적 파일
│   ├── activities/
│   └── logo.svg
├── Dockerfile                   # Multi-stage Docker build
├── .dockerignore
├── DEPLOYMENT.md                # K8s 배포 가이드
├── ADMIN_GUIDE.md               # 콘텐츠 관리 가이드
└── README.md
```

## 📝 콘텐츠 관리

콘텐츠 관리 방법은 [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)를 참고하세요.

- 활동 사진: `data/activities.json`
- 후기: `data/reviews.json`

## 🌐 배포

K8s 클러스터에 배포하는 방법은 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

### 빠른 시작

1. **GitHub 저장소 push**
   ```bash
   git push origin main
   ```

2. **GitHub Actions 자동 실행**
   - 빌드 및 테스트
   - Docker 이미지 생성
   - GHCR에 이미지 push

3. **ArgoCD 자동 배포**
   - K8s 매니페스트 동기화
   - 자동으로 클러스터에 배포

## 📊 빌드 정보

- **빌드 크기**: ~129-132 KB (First Load JS)
- **페이지 수**: 13개 (정적 생성)
- **이미지 크기**: ~100MB (Docker)

## 📞 문의

- **전화**: 02-430-2351 / 010-9573-2351
- **이메일**: lalavisit@naver.com
- **주소**: 서울 송파구 송파대로24길 5-14 3층 303호

---

© 2025 라라재가방문요양센터. All rights reserved.

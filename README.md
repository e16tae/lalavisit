# 라라방문 - 라라재가방문요양센터 홈페이지

라라재가방문요양센터의 공식 웹사이트입니다. Next.js, TypeScript, Tailwind CSS, shadcn/ui를 기반으로 구축되었습니다.

## 🚀 주요 기능

- **홈페이지**: 센터 소개 및 서비스 개요
- **소개**: 인사말, 센터장 프로필, 네이버 지도 연동
- **서비스**: 방문요양, 가족요양, 입주간병 안내
- **활동**: 현장 사진 및 교육 사진 갤러리
- **문의**: 전화연결, 상담요청 폼, 카카오채널 연동
- **플로팅 문의 버튼**: 모든 페이지에서 접근 가능한 문의 버튼

## 🛠 기술 스택

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: Docker, Kubernetes, ArgoCD
- **CI/CD**: GitHub Actions

## 📦 시작하기

### 개발 환경 설정

1. 저장소 클론

```bash
git clone https://github.com/e16tae/lalavisit.git
cd lalavisit
```

2. 의존성 설치

```bash
npm install
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
npm run build
npm start
```

## 📂 프로젝트 구조

```
lalavisit/
├── app/                    # Next.js App Router
│   ├── about/             # 소개 페이지
│   ├── services/          # 서비스 페이지
│   ├── activities/        # 활동 페이지
│   ├── contact/           # 문의 페이지
│   ├── api/               # API Routes
│   │   └── contact/       # 상담 신청 API
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── navigation.tsx     # 네비게이션 바
│   ├── floating-contact.tsx # 플로팅 문의 버튼
│   └── footer.tsx         # 푸터
├── data/                  # 데이터 파일
│   └── activities.json    # 활동 메타데이터
├── public/                # 정적 파일
│   ├── logo.svg          # 센터 로고
│   └── activities/       # 활동 사진 (업로드 필요)
├── k8s/                   # Kubernetes 설정
│   ├── deployment.yaml   # K8s Deployment, Service, Ingress
│   └── argocd-app.yaml   # ArgoCD Application
├── .github/
│   └── workflows/
│       └── ci-cd.yml     # GitHub Actions CI/CD
├── Dockerfile            # Docker 이미지 빌드
└── next.config.ts        # Next.js 설정
```

## 🎨 테마 색상

로고(logo.svg)의 색상을 기반으로 구성:
- Primary: `#22BBB4` (청록색)
- Secondary: `#00ACE2` (파란색)

## 📝 활동 사진 업로드

1. 사진 파일을 `public/activities/` 폴더에 저장
2. `data/activities.json` 파일에 메타데이터 추가

### 현장 사진 예시

```json
{
  "id": "field-001",
  "title": "방문요양 서비스 현장",
  "date": "2025-03-15",
  "careGrade": "2등급",
  "service": "방문요양",
  "image": "/activities/field-001.jpg",
  "description": "어르신과 함께하는 일상생활 지원 서비스"
}
```

### 교육 사진 예시

```json
{
  "id": "edu-001",
  "title": "요양보호사 보수교육",
  "date": "2025-04-01",
  "educationType": "보수교육",
  "hours": "8시간",
  "image": "/activities/edu-001.jpg",
  "description": "전문성 향상을 위한 정기 보수교육"
}
```

## 🔧 환경 변수

이메일 발송 기능을 사용하려면 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# 이메일 설정 (예: Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# 카카오톡 비즈니스 API (선택사항)
KAKAO_CHANNEL_ID=your-channel-id
```

## 🐳 Docker 빌드 및 실행

### 로컬에서 Docker 이미지 빌드

```bash
docker build -t lalavisit:latest .
```

### Docker 컨테이너 실행

```bash
docker run -p 3000:3000 lalavisit:latest
```

## ☸️ Kubernetes 배포

### 사전 준비

1. GitHub Container Registry에 이미지 푸시 권한 설정
2. Kubernetes 클러스터 준비
3. ArgoCD 설치 및 설정

### 배포 단계

1. GitHub Container Registry 로그인 시크릿 생성

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=e16tae \
  --docker-password=YOUR_GITHUB_TOKEN \
  --docker-email=YOUR_EMAIL
```

2. ArgoCD Application 생성

```bash
kubectl apply -f k8s/argocd-app.yaml
```

3. ArgoCD가 자동으로 애플리케이션을 동기화하고 배포합니다.

### 수동 배포 (ArgoCD 없이)

```bash
kubectl apply -f k8s/deployment.yaml
```

## 🔄 CI/CD 파이프라인

GitHub Actions를 통한 자동 배포:

1. `main` 브랜치에 코드 푸시
2. GitHub Actions가 자동으로:
   - 테스트 및 빌드 실행
   - Docker 이미지 빌드 및 GHCR에 푸시
   - ArgoCD 동기화 트리거
3. ArgoCD가 Kubernetes 클러스터에 자동 배포

### GitHub Secrets 설정

`.github/workflows/ci-cd.yml`에서 사용되는 시크릿:

- `ARGOCD_SERVER`: ArgoCD 서버 주소
- `ARGOCD_AUTH_TOKEN`: ArgoCD 인증 토큰

## 🔗 도메인 설정

1. DNS 레코드 설정:
   - `A` 레코드: `lalavisit.com` → Kubernetes Ingress IP
   - `A` 레코드: `www.lalavisit.com` → Kubernetes Ingress IP

2. SSL 인증서는 cert-manager가 자동으로 발급 (Let's Encrypt)

## 📞 센터 정보

### 연락처
- **센터 전화**: 02-430-2351
- **센터장 휴대폰**: 010-9573-2351
- **이메일**: lalavisit@naver.com

### 주소
- **도로명**: 서울 송파구 송파대로24길 5-14 3층 303호
- **지번**: 서울 송파구 가락동 104-7 303호
- **우편번호**: 05831

### 찾아오시는 길
- **지하철**: 8호선 가락시장역 6번 출구에서 도보 5분
- **버스**: 문정로데오거리입구 정류장 하차 - 461(간선), 3011/3217/3317(지선), 36(일반)

### 기관 정보
- **기관기호**: 2-11710-00469
- **고유번호증**: 530-80-03437

### 운영 시간
- **24시간 연중무휴**

## 📄 라이선스

이 프로젝트는 라라재가방문요양센터의 소유입니다.

## 🙏 도움말

문제가 발생하거나 질문이 있으신 경우 이슈를 생성해 주세요.

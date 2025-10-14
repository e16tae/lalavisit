# Lalavisit — 재가방문요양센터 웹사이트 템플릿

Next.js 15 기반으로 제작된 재가방문요양센터 웹사이트 템플릿입니다. 실서비스 배포에 앞서 비즈니스 정보, 환경 변수, 인프라 구성을 본인의 환경에 맞게 교체해야 합니다.

## 개요
- 방문요양, 가족요양, 입주간병 서비스 소개 페이지
- 상담 폼(네이버 SMTP) 및 다중 연락처 CTA
- 활동 갤러리, 후기, 소개 섹션이 포함된 정보 구조
- Schema.org, sitemap, robots.txt 등 기본 SEO 설정 제공

## 기술 스택
- **Framework**: Next.js 15 (App Router) + TypeScript
- **UI**: Tailwind CSS 4, shadcn/ui, Lucide Icons, Pretendard Variable
- **폼/검증**: React Hook Form, Zod, Sonner 토스트
- **이메일**: Nodemailer (Naver SMTP 기본값)
- **배포**: Docker, GitHub Actions, ArgoCD, Kong Ingress

## 디렉터리 개요
```
app/            Next.js App Router 페이지
components/     재사용 컴포넌트 및 ui 라이브러리
data/           JSON 기반 콘텐츠 (블로그, 활동, 후기 등)
docs/           통합 문서 (환경, 배포, 운영, 보안)
k8s/            Kubernetes 매니페스트 (base/overlays 구조)
scripts/        시크릿 생성, 헬스체크 등 유틸 스크립트
```

## 빠른 시작

### 1. 필수 요구사항
- Node.js 20+
- npm 10+
- (선택) Docker, kubectl, ArgoCD CLI

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 준비
```bash
cp .env.example .env.local
```
- `.env.local`에 실제 도메인, 연락처, SMTP 자격 증명을 입력합니다.
- 전체 변수 설명은 `docs/environment.md`에서 확인할 수 있습니다.

### 4. 로컬 개발
```bash
npm run dev
# http://localhost:3000
```

### 5. 프로덕션 빌드
```bash
npm run lint
npm run build
npm start
```

## 배포 개요
- GitHub Actions가 main 브랜치에 push될 때 Docker 이미지를 빌드하고 GHCR에 푸시합니다.
- `k8s/overlays/production` 매니페스트 업데이트 후 ArgoCD가 Kubernetes에 적용합니다.
- TLS 인증서는 cert-manager(권장) 또는 수동 Secret으로 설정합니다.
- 상세한 절차는 `docs/deployment.md`를 참고하세요.

## 문서
- `docs/environment.md` – 환경 변수 및 시크릿 구성
- `docs/deployment.md` – CI/CD 및 Kubernetes 배포 가이드
- `docs/workflow.md` – 브랜치 전략, GitHub Actions, 코드 리뷰 정책
- `docs/operations.md` – 콘텐츠 관리, SEO, 운영 체크리스트
- `docs/security.md` – 보안 정책, 공개 준비 점검표

## 유지보수 팁
- 환경 변수, 연락처, 사업자 정보는 반드시 실데이터로 교체 후 배포합니다.
- 월 1회 이상 Lighthouse/Pagespeed, Search Console 지표를 검토합니다.
- 저장소를 새로 공개할 때는 `reset-git-history.sh` 스크립트를 활용해 깔끔한 초기 커밋을 준비할 수 있습니다.
- 자동화 에이전트 작업은 `agent/<issue-id>-slug` 브랜치에서 수행하고, 사람 검토 후에만 main에 반영합니다.
- 민감한 환경 변수는 `./scripts/seal-secrets.sh`로 SealedSecret을 생성해 `k8s/sealed-secrets/`에 커밋합니다.

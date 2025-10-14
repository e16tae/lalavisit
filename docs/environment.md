# Lalavisit | Environment & Configuration

이 문서는 재가방문요양센터 웹사이트 템플릿의 환경 변수를 정의하고, 로컬/프로덕션 환경에 적용하는 방법을 정리합니다. 실제 서비스에 맞는 값으로 교체한 뒤 배포해야 합니다.

## 구성 파일

| 파일 | 용도 |
| ---- | ---- |
| `.env.example` | 기본 변수 템플릿. 새 환경을 준비할 때 복사하여 사용합니다. |
| `.env.local` | 로컬 개발용 비밀 값. Git에 커밋하지 않습니다. |
| `.env.production` | 프로덕션용 값(선택). CI/CD나 시크릿 매니저에만 저장합니다. |
| `k8s/base/configmap.yaml` | 공개 가능한 구성 값. 민감한 값은 포함하지 않습니다. |

```bash
# 로컬 개발 환경 준비
cp .env.example .env.local
cp .env.example .env.production  # 프로덕션 템플릿이 필요할 때
```

## 필수 환경 변수

모든 값은 실제 비즈니스 정보로 변경해야 하며, 공개 정보와 비밀 정보를 구분해 관리합니다.

### 1. 도메인 & 공개 URL
```bash
NEXT_PUBLIC_SITE_URL=https://www.example.com  # 주 도메인
APEX_DOMAIN=example.com                       # apex 리다이렉트용
```
- `metadataBase`, Open Graph, sitemap, robots.txt에서 사용됩니다.
- `APEX_DOMAIN`은 nginx/Kong 리다이렉트 설정에 사용됩니다.

### 2. 연락처 및 기관 정보
```bash
CONTACT_EMAIL=contact@example.com
CERT_EMAIL=admin@example.com
CENTER_PHONE=02-000-0000
CENTER_PHONE_E164=+82-2-000-0000
MOBILE_PHONE=010-0000-0000
FAX_NUMBER=02-000-0001
FAX_NUMBER_E164=+82-2-000-0001
OWNER_NAME=홍길동
BUSINESS_REGISTRATION_NUMBER=000-00-00000
INSTITUTION_CODE=1-23456-78901
```
- Footer, Schema.org LocalBusiness, 상담 폼 등 다수의 컴포넌트에서 참조됩니다.
- 국제 전화번호(E.164)는 +82 형식으로 입력합니다.

### 3. 위치 정보
```bash
STREET_ADDRESS=서울특별시 강남구 테헤란로 123 4층
POSTAL_CODE=06123
CITY=서울
DISTRICT=강남구
LOCALITY=역삼동
LATITUDE=37.4979
LONGITUDE=127.0276
```
- 지도 연동 및 구조화된 데이터에 사용됩니다.
- 위경도 값은 Naver/Google 지도에서 좌표 복사 기능으로 획득합니다.

### 4. SMTP & 이메일
```bash
SMTP_HOST=smtp.naver.com    # 또는 smtp.gmail.com 등
SMTP_PORT=587
EMAIL_USER=your-email@naver.com
EMAIL_PASSWORD=APP_SPECIFIC_PASSWORD
```
- 네이버 메일을 사용하는 경우 **애플리케이션 비밀번호**를 생성해야 합니다.
- 테스트는 `openssl s_client -connect smtp.naver.com:587 -starttls smtp` 명령으로 TLS 연결을 확인합니다.

### 5. 외부 서비스
```bash
NEXT_PUBLIC_KAKAO_CHANNEL_ID=_yourChannelId
NAVER_MAP_PLACE_ID=1234567890
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=
```
- 카카오톡 채널 ID는 Kakao Business 관리자센터에서 확인합니다.
- Naver Map Place ID는 장소 URL의 숫자 부분을 사용합니다.

### 6. 컨테이너 & 배포 설정
```bash
CONTAINER_REGISTRY=ghcr.io
GITHUB_ORG=your-github-id
GITHUB_REPO=lalavisit
IMAGE_NAME=lalavisit-frontend
FULL_IMAGE_NAME=${CONTAINER_REGISTRY}/${GITHUB_ORG}/${IMAGE_NAME}
K8S_NAMESPACE=lalavisit
SECRET_NAME=lalavisit-secrets
TLS_SECRET_NAME=lalavisit-tls
ARGOCD_PROD_APP_NAME=lalavisit-production
ARGOCD_REPO_URL=https://github.com/${GITHUB_ORG}/${GITHUB_REPO}.git
```
- GitHub Container Registry를 기본으로 하며, 다른 레지스트리를 사용할 경우 두 변수만 교체하면 됩니다.
- `ARGOCD_REPO_URL`은 GitOps 배포에서 사용됩니다.

## 로컬 개발 절차

1. `.env.local` 생성 후 필수 값 입력
2. 의존성 설치: `npm install`
3. 개발 서버 실행: `npm run dev`
4. SMTP 테스트 시 더미 계정 대신 실제 발송이 이뤄지므로, 내부 주소로 먼저 검증합니다.

## 프로덕션 시크릿 관리

### Sealed Secrets 워크플로
1. 클러스터에 [bitnami-labs/sealed-secrets](https://github.com/bitnami-labs/sealed-secrets) 컨트롤러 설치
2. 로컬 PC에 `kubeseal` CLI 설치
3. 프로덕션용 환경 변수 파일 준비 (예: `.env.production`)
4. 스크립트 실행
   ```bash
   ./scripts/seal-secrets.sh \
     --env-file .env.production \
     --namespace lalavisit \
     --name lalavisit-secrets \
     --out k8s/sealed-secrets/lalavisit-secrets.sealedsecret.yaml
   ```
5. 생성된 `k8s/sealed-secrets/*.sealedsecret.yaml` 파일을 커밋 → GitOps 파이프라인으로 배포

`k8s/sealed-secrets/lalavisit-secrets.sealedsecret.yaml.example` 파일은 구조를 참고하기 위한 템플릿입니다. 실제 배포 시에는 `encryptedData` 값을 `kubeseal`이 생성한 값으로 교체해야 합니다.

### 기타 Secrets
- **TLS Secret**: `kubectl create secret tls lalavisit-tls ...` 또는 cert-manager `Certificate` 리소스를 사용합니다.
- **GHCR Pull Secret**: 개인 레지스트리를 사용하는 경우 `kubectl create secret docker-registry ghcr-secret ...`.
- (선택) 외부 서비스 토큰은 별도 SealedSecret 또는 External Secrets Operator 연동으로 관리합니다.

### GitHub Secrets (CI/CD)
- `GHCR_PAT` 또는 `GITHUB_TOKEN`: 컨테이너 레지스트리 푸시 권한
- `ARGOCD_SERVER`, `ARGOCD_TOKEN`: ArgoCD API 호출용
- `SLACK_WEBHOOK_URL` (선택): 배포 알림

> GitHub Actions 워크플로우는 Secrets가 존재하지 않으면 실패합니다. 새 레포지토리에 워크플로를 복사한 뒤 반드시 Secret을 등록해 주세요.

## 배포 환경 세부 구성

| 환경 | 권장 값 | 비고 |
| ---- | ------- | ---- |
| `ENVIRONMENT` | `production` / `staging` | 빌드 파이프라인 분기 |
| `K8S_NAMESPACE` | `lalavisit` | Kubernetes 네임스페이스 |
| `RATE_LIMIT_PLUGIN_NAME` | `rate-limiting-lalavisit` | Kong rate limit 플러그인 |

## 검증 체크리스트
1. `.env.local`과 `.env.production`에 민감한 값이 커밋되지 않았는지 확인합니다.
2. `NEXT_PUBLIC_*` 변수만 클라이언트에 노출되도록 관리합니다.
3. 도메인, 연락처, 비즈니스 정보가 모두 실제 정보인지 검토합니다.
4. SMTP 테스트 메일을 발송하고 수신 여부를 확인합니다.
5. Google/Naver Search Console에서 사이트 소유권을 검증합니다.
6. Kubernetes Secrets가 실제로 생성되었는지 `kubectl get secret -n lalavisit`로 확인합니다.

## 문제 해결
- **SMTP 인증 실패**: 앱 비밀번호를 다시 생성하거나 포트/TLS 설정을 확인합니다.
- **구성 값 누락**: 빌드 시 오류가 발생하면 `.env.example`과 비교하여 누락된 변수를 채웁니다.
- **구조화된 데이터 오류**: `npm run build` 후 `npm run start`로 프로덕션 빌드를 확인하며 콘솔 로그를 검토합니다.

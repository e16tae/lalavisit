# Lalavisit | Secrets & Environment

이 문서는 GitHub Actions 빌드와 Kubernetes 배포에 필요한 환경 변수를 최소한으로 정리합니다.

## 1. GitHub Secrets (빌드 시 사용)
저장소 **Settings → Secrets and variables → Actions** 에 다음 값을 추가합니다.

| 키 | 설명 | 사용 위치 |
| --- | --- | --- |
| `SITE_URL` | 공개 사이트 URL (예: `https://www.example.com`) | Docker 빌드 ARG → `NEXT_PUBLIC_SITE_URL` |
| `KAKAO_CHANNEL_ID` | 카카오 채널 ID (`_ABCD1234` 형식) | Docker 빌드 ARG → `NEXT_PUBLIC_KAKAO_CHANNEL_ID` |
| `GOOGLE_VERIFICATION` | Google Search Console HTML 메타 값 (선택) | Docker 빌드 ARG |
| `NAVER_VERIFICATION` | Naver Search Advisor HTML 메타 값 (선택) | Docker 빌드 ARG |

> 워크플로 파일: `.github/workflows/cd-production.yaml`
> `build-and-push` job에서 위 값을 읽어 `NEXT_PUBLIC_*` 빌드 아규먼트로 주입합니다.

Optional:
- `GH_PAT` (필요 시), `ARGOCD_SERVER`, `ARGOCD_TOKEN`, `SLACK_WEBHOOK_URL` 등은 조직 정책에 따라 추가하세요.

## 2. Kubernetes Sealed Secret (런타임 SMTP 설정)
연락처 메일 및 SMTP 자격 증명은 SealedSecret으로 관리합니다.

1. `.env.production` 같은 임시 파일에 아래 값을 입력합니다. (템플릿은 프로젝트 루트 `.env.example` 참고)
   ```bash
   EMAIL_USER=contact@example.com
   EMAIL_PASSWORD=APP_PASSWORD
   SMTP_HOST=smtp.naver.com
   SMTP_PORT=587
   CONTACT_EMAIL=contact@example.com
   ```
2. `kubeseal` CLI와 Sealed Secrets 컨트롤러가 있는 환경에서 실행합니다.
   ```bash
   ./scripts/seal-secrets.sh \
     --env-file .env.production \
     --namespace lalavisit \
     --name lalavisit-secrets \
     --out k8s/sealed-secrets/lalavisit-secrets.sealedsecret.yaml
   ```
3. 생성된 `k8s/sealed-secrets/lalavisit-secrets.sealedsecret.yaml` 파일을 Git에 커밋하면 ArgoCD가 자동으로 Secret을 생성합니다.
4. GHCR Pull Secret (`ghcr-secret`)과 TLS Secret(`lalavisit-tls`)은 별도로 `kubectl create secret ...` 또는 cert-manager를 통해 준비합니다.

## 3. 검증 체크리스트
- `kubectl get pods -n sealed-secrets` 로 컨트롤러가 실행 중인지 확인
- `kubectl apply -k k8s/sealed-secrets` 후 `kubectl get secret -n lalavisit lalavisit-secrets`
- GitHub Secrets 페이지에서 값이 등록되어 있는지 확인
- 워크플로 실행 시 `build-and-push` 단계에서 올바른 값이 빌드 로그에 반영되는지 확인

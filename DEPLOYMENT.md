# K8s 배포 가이드

라라재가방문요양센터 웹사이트의 K8s 배포 가이드입니다.

## 📋 배포 개요

- **컨테이너 레지스트리**: GitHub Container Registry (ghcr.io)
- **CI/CD**: GitHub Actions + ArgoCD
- **배포 환경**: 자체 K8s 클러스터
- **도메인**: www.lalavisit.com

## 🔧 사전 준비

### 1. GitHub Container Registry 설정

GitHub Personal Access Token(PAT) 생성:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. 권한 선택: `write:packages`, `read:packages`, `delete:packages`
4. 생성된 토큰 저장

### 2. K8s Secret 생성

```bash
# Namespace 생성
kubectl apply -f k8s/namespace.yaml

# Secret 생성 (k8s/secret-example.yaml 참고)
kubectl create secret generic lalavisit-secrets \
  --namespace=lalavisit \
  --from-literal=EMAIL_USER=lalavisit@naver.com \
  --from-literal=EMAIL_PASSWORD=YOUR_PASSWORD \
  --from-literal=SMTP_HOST=smtp.naver.com \
  --from-literal=SMTP_PORT=587 \
  --from-literal=CONTACT_EMAIL=lalavisit@naver.com \
  --from-literal=NEXT_PUBLIC_SITE_URL=https://www.lalavisit.com \
  --from-literal=NEXT_PUBLIC_KAKAO_CHANNEL_URL=https://pf.kakao.com/_xnxoxoxG/chat
```

### 3. K8s 매니페스트 업데이트

`k8s/deployment.yaml` 파일에서 이미지 레지스트리 경로 수정:
```yaml
image: ghcr.io/<YOUR_GITHUB_USERNAME>/lalavisit:latest
```

## 🚀 배포 프로세스

### GitHub Actions 워크플로우

main 브랜치에 push하면 자동으로:

1. **빌드 단계**
   - Node.js 의존성 설치
   - Lint 검사
   - Next.js 빌드

2. **Docker 이미지 빌드**
   - Multi-stage build로 최적화
   - GHCR에 이미지 push
   - 태그: `latest`, `main-<sha>`, `<sha>`

3. **매니페스트 업데이트**
   - `k8s/deployment.yaml`의 이미지 태그를 최신 SHA로 업데이트
   - Git commit & push

### ArgoCD 자동 배포

ArgoCD가 Git 저장소를 모니터링하여:

1. `k8s/` 디렉토리의 변경 감지
2. 자동으로 K8s 클러스터에 배포
3. Self-healing 및 Auto-sync 활성화

## 📁 프로젝트 구조

```
lalavisit/
├── .github/
│   └── workflows/
│       └── ci-cd.yaml          # GitHub Actions 워크플로우
├── argocd/
│   └── application.yaml        # ArgoCD Application
├── k8s/
│   ├── namespace.yaml          # Namespace
│   ├── deployment.yaml         # Deployment
│   ├── service.yaml            # Service
│   ├── ingress.yaml            # Ingress (with SSL)
│   └── secret-example.yaml     # Secret 예제
├── Dockerfile                  # Multi-stage build
└── .dockerignore
```

## 🔐 SSL/TLS 설정

Ingress에 cert-manager를 사용하여 Let's Encrypt SSL 인증서 자동 발급:

```yaml
annotations:
  cert-manager.io/cluster-issuer: "letsencrypt-prod"
```

cert-manager가 K8s 클러스터에 설치되어 있어야 합니다.

## 📊 모니터링 및 로그

### Pod 상태 확인
```bash
kubectl get pods -n lalavisit
kubectl describe pod <pod-name> -n lalavisit
```

### 로그 확인
```bash
kubectl logs -f <pod-name> -n lalavisit
```

### 서비스 상태 확인
```bash
kubectl get svc -n lalavisit
kubectl get ingress -n lalavisit
```

## 🔄 수동 배포

필요시 수동으로 배포:

```bash
# 모든 리소스 적용
kubectl apply -f k8s/

# 특정 리소스만 적용
kubectl apply -f k8s/deployment.yaml

# Deployment 재시작
kubectl rollout restart deployment/lalavisit-web -n lalavisit

# Rollout 상태 확인
kubectl rollout status deployment/lalavisit-web -n lalavisit
```

## 🛠️ 트러블슈팅

### 이미지 Pull 실패

```bash
# ImagePullSecret 생성
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=<YOUR_GITHUB_USERNAME> \
  --docker-password=<YOUR_GITHUB_PAT> \
  --namespace=lalavisit

# Deployment에 imagePullSecrets 추가
spec:
  template:
    spec:
      imagePullSecrets:
      - name: ghcr-secret
```

### Pod CrashLoopBackOff

```bash
# 로그 확인
kubectl logs <pod-name> -n lalavisit --previous

# 환경 변수 확인
kubectl exec -it <pod-name> -n lalavisit -- env
```

### Ingress 설정 문제

```bash
# Ingress 상세 확인
kubectl describe ingress lalavisit-web -n lalavisit

# Nginx Ingress Controller 로그
kubectl logs -n ingress-nginx <nginx-controller-pod>
```

## 🔧 로컬 Docker 빌드 테스트

```bash
# Docker 이미지 빌드
docker build -t lalavisit:test .

# 로컬 실행
docker run -p 3000:3000 \
  -e EMAIL_USER=test@example.com \
  -e EMAIL_PASSWORD=password \
  -e SMTP_HOST=smtp.naver.com \
  -e SMTP_PORT=587 \
  lalavisit:test

# 브라우저에서 http://localhost:3000 접속
```

## 📞 문의

배포 관련 문의사항이 있으면 개발팀에 연락하세요.

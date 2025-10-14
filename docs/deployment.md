# Lalavisit | Deployment Guide

이 문서는 Next.js 프런트엔드를 컨테이너로 빌드하여 Kubernetes + ArgoCD 환경에 배포하는 절차를 설명합니다. GitHub Actions, GHCR, Kong Ingress를 기본으로 가정합니다.

## 아키텍처 개요

```
develop → GitHub Actions CI (lint, test, build)
   ↓
main → GitHub Actions CD (Docker build & push, manifests sync)
   ↓
GitOps repo (k8s/overlays/production) → ArgoCD → Kubernetes cluster
   ↓
Kong Ingress → https://www.example.com
```

## 배포 전 준비

1. **레지스트리 권한**: GitHub Repository → Settings → Actions → General → Workflow permissions에서 *Read and write permissions* 활성화
2. **Kubernetes 클러스터**: 1.25 이상, Kong Ingress Controller 설치, cert-manager(Optional) 설치
3. **Secrets 구성**: [환경 구성 문서](./environment.md) 참고. SMTP/TLS Secret, GitHub Secrets, ArgoCD 토큰 필요
4. **도메인 DNS**: `www` / apex 레코드가 Ingress Controller로 향하도록 설정

## 워크플로 요약

### 1. CI (develop 브랜치)
```bash
git checkout develop
git add .
git commit -m "feat: 새 기능"
git push origin develop
```
- Lint (`npm run lint`)
- 타입 검사 (`tsc --noEmit`)
- Next.js 빌드 검증 (`npm run build`)
- Docker 이미지 빌드 테스트

### 2. CD (main 브랜치)
```bash
git checkout main
git merge --ff-only develop
git push origin main
```
- 프로덕션 Docker 이미지 빌드 및 GHCR 푸시
- `k8s/overlays/production` 매니페스트 버전 업데이트
- ArgoCD 자동 동기화 트리거 (웹훅 또는 폴링 기반)

## ArgoCD 설정

`argocd/application.yaml` 예시:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: lalavisit-production
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/YOUR_GITHUB_USERNAME/lalavisit.git
    targetRevision: main
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: lalavisit
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

적용:
```bash
kubectl apply -f argocd/application.yaml
```

## Kubernetes 리소스

- `k8s/base/` : 공통 Deployment, Service, ConfigMap, Secret 템플릿
- `k8s/overlays/production/` : 프로덕션 전용 리소스/패치
- `argocd/` : ArgoCD 애플리케이션 정의

### 핵심 명령어
```bash
# 배포 상태 모니터링
kubectl get pods -n lalavisit -w
kubectl get svc,ingress -n lalavisit

# 롤링 업데이트 강제
kubectl rollout restart deployment/lalavisit-frontend -n lalavisit

# 배포 롤백
kubectl rollout undo deployment/lalavisit-frontend -n lalavisit
```

## SSL/TLS

- cert-manager 사용 시 `k8s/base/certificate.yaml`에 DNS 이름을 실제 도메인으로 교체합니다.
- 수동 TLS Secret 생성 시:
  ```bash
  kubectl create secret tls lalavisit-tls \
    --cert=path/to/fullchain.pem \
    --key=path/to/privkey.pem \
    --namespace=lalavisit
  ```
- Kong Ingress는 `spec.tls.secretName` 값으로 Secret을 참조합니다.

## 검증 절차

1. `kubectl get pods -n lalavisit` 로 모든 Pod가 Ready인지 확인
2. `curl https://www.example.com/api/health` 로 헬스 엔드포인트 확인
3. Lighthouse, PageSpeed Insights로 성능 및 SEO 점검
4. ArgoCD 대시보드에서 Sync 상태가 `Healthy/Synced`인지 확인
5. DNS/SSL 만료일을 운영 캘린더에 등록

## 트러블슈팅

| 증상 | 원인 | 해결 방법 |
| ---- | ---- | -------- |
| ImagePullBackOff | GHCR 인증 실패 | `kubectl create secret docker-registry ghcr-secret ...` 후 ServiceAccount에 연결 |
| 502/504 에러 | Kong 경로 미스매치 | Ingress `host`와 `path` 설정이 실제 도메인과 일치하는지 확인 |
| SMTP 전송 실패 | 잘못된 앱 비밀번호 | 앱 비밀번호 재발급 또는 SMTP 포트/보안 설정 확인 |
| SEO 메타데이터 누락 | 환경 변수 누락 | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID` 등 클라이언트 변수 확인 |

## 수동 배포 (비상용)

```bash
npm install
npm run build
docker build -t ghcr.io/YOUR_GITHUB_USERNAME/lalavisit-frontend:manual .
docker push ghcr.io/YOUR_GITHUB_USERNAME/lalavisit-frontend:manual
kubectl set image deployment/lalavisit-frontend frontend=ghcr.io/YOUR_GITHUB_USERNAME/lalavisit-frontend:manual -n lalavisit
```

> 수동 배포는 GitOps 흐름과 충돌할 수 있으므로, 사용 후에는 ArgoCD 상태를 반드시 `Sync` 시켜야 합니다.


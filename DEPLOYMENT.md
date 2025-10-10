# Deployment Guide

라라재가방문요양센터 배포 가이드입니다. K8s + Kong + ArgoCD 환경으로 배포합니다.

## 📋 배포 아키텍처

```
develop 브랜치 → GitHub Actions (CI) → 테스트 & 빌드 검증
    ↓
main 브랜치 머지 → GitHub Actions (CD) → Docker 이미지 빌드 & 푸시
    ↓
K8s 매니페스트 업데이트 → ArgoCD 자동 감지 → K8s 배포
    ↓
Kong Ingress → www.lalavisit.com
```

## 🛠️ 사전 준비

### 1. Container Registry 설정
이 프로젝트는 GitHub Container Registry (GHCR)를 사용합니다.

- GitHub Repository → Settings → Actions → General
- "Workflow permissions" → "Read and write permissions" 활성화

### 2. K8s 클러스터 준비
- Kubernetes 클러스터 (1.25+)
- Kong Ingress Controller 설치됨
- ArgoCD 설치됨

### 3. TLS 인증서 생성
```bash
# Let's Encrypt 또는 기존 인증서 사용
kubectl create secret tls lalavisit-tls \
  --cert=path/to/tls.crt \
  --key=path/to/tls.key \
  --namespace=lalavisit
```

### 4. K8s Secrets 생성
```bash
# 실제 환경변수로 Secret 생성
kubectl create secret generic lalavisit-secrets \
  --from-literal=email-user=lalavisit@naver.com \
  --from-literal=email-password=YOUR_PASSWORD \
  --from-literal=contact-email=lalavisit@naver.com \
  --namespace=lalavisit
```

**⚠️ 주의**: `k8s/base/secrets.yaml`은 placeholder만 포함합니다. 실제 값은 위 명령어로 생성하세요.

## 📦 배포 프로세스

### 1. Develop 브랜치 (CI)
```bash
# 개발 작업
git checkout develop
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin develop
```

**GitHub Actions 자동 실행**:
- ESLint 검사
- TypeScript 타입 체크
- Next.js 빌드 테스트
- Docker 이미지 빌드 테스트

### 2. Main 브랜치 (CD)
```bash
# PR 생성 및 머지
git checkout main
git merge develop
git push origin main
```

**GitHub Actions 자동 실행**:
1. Docker 이미지 빌드 & GHCR 푸시
2. K8s 매니페스트 업데이트 (`k8s/overlays/production/kustomization.yaml`)
3. ArgoCD 자동 동기화 대기

### 3. ArgoCD Application 설정

**ArgoCD Application 생성**:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: lalavisit-production
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/YOUR_USERNAME/lalavisit.git
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
kubectl apply -f argocd-application.yaml
```

## 🔍 배포 확인

### 1. Pod 상태 확인
```bash
kubectl get pods -n lalavisit -w
```

### 2. Service 확인
```bash
kubectl get svc -n lalavisit
```

### 3. Ingress 확인
```bash
kubectl get ingress -n lalavisit
```

### 4. 로그 확인
```bash
# 특정 Pod 로그
kubectl logs -f <pod-name> -n lalavisit

# 모든 frontend Pod 로그
kubectl logs -f -l app=frontend -n lalavisit
```

### 5. 애플리케이션 헬스 체크
```bash
curl https://www.lalavisit.com/api/health
```

## 🔧 트러블슈팅

### 이미지 Pull 실패
```bash
# GHCR 인증 확인
kubectl get secret -n lalavisit

# ImagePullSecret 생성 (필요시)
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_TOKEN \
  --namespace=lalavisit
```

### Pod 재시작
```bash
kubectl rollout restart deployment/prod-frontend -n lalavisit
```

### Secret 업데이트
```bash
kubectl delete secret lalavisit-secrets -n lalavisit
kubectl create secret generic lalavisit-secrets \
  --from-literal=email-user=NEW_VALUE \
  --namespace=lalavisit
```

### ArgoCD 수동 동기화
```bash
# ArgoCD CLI
argocd app sync lalavisit-production

# 또는 UI에서 "Sync" 버튼 클릭
```

## 📊 모니터링

### ArgoCD UI
```
https://argocd.your-domain.com
```

### K8s Dashboard
```bash
kubectl proxy
# http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

### 리소스 사용량
```bash
kubectl top pods -n lalavisit
```

## 🔄 롤백

### ArgoCD를 통한 롤백
```bash
# 이전 리비전으로 롤백
argocd app rollback lalavisit-production <revision-number>
```

### kubectl을 통한 롤백
```bash
kubectl rollout undo deployment/prod-frontend -n lalavisit
```

### 특정 이미지 태그로 롤백
```bash
cd k8s/overlays/production
# kustomization.yaml의 newTag를 이전 커밋 SHA로 변경
git add kustomization.yaml
git commit -m "chore: rollback to <previous-sha>"
git push
```

## 📝 환경변수 관리

### 빌드타임 환경변수 (public)
- `Dockerfile` build-args로 전달
- `.github/workflows/cd-production.yaml`에서 설정

### 런타임 환경변수 (private)
- K8s Secret으로 관리
- `k8s/base/deployment.yaml`에서 참조

## 🚀 스케일링

### 수동 스케일링
```bash
kubectl scale deployment/prod-frontend --replicas=5 -n lalavisit
```

### 자동 스케일링 (HPA)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
  namespace: lalavisit
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: prod-frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. GitHub Actions 로그
2. ArgoCD Application 상태
3. Pod 로그
4. Kong Ingress 로그

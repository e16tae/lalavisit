# 배포 설정 체크리스트

라라재가방문요양센터 K8s 배포를 위한 전체 설정 체크리스트입니다.

---

## ✅ 1. GitHub 설정 (완료!)

### Repository 설정
- ✅ Repository: `github.com/e16tae/lalavisit`
- ✅ develop 브랜치 생성 완료
- ✅ main 브랜치 푸시 완료

### GitHub Actions 권한 설정
```
⚠️ 수동 확인 필요:

1. GitHub → Repository 설정
2. Settings → Actions → General
3. Workflow permissions
   → ✓ "Read and write permissions" 선택
4. Save
```

**확인 방법:**
- https://github.com/e16tae/lalavisit/settings/actions
- 또는 첫 GitHub Actions 실행 시 권한 오류가 있으면 설정

---

## ✅ 2. ArgoCD Application (완료!)

### 파일 수정 필요 여부: **없음!**
```yaml
✅ argocd/lalavisit-production.yaml
   repoURL: https://github.com/e16tae/lalavisit.git  # 이미 올바름

✅ argocd/lalavisit-dev.yaml
   repoURL: https://github.com/e16tae/lalavisit.git  # 이미 올바름
```

---

## 📋 3. K8s 클러스터 설정 (배포 전 필수)

### 3-1. 네임스페이스 생성
```bash
# 자동으로 생성되지만 미리 해도 됨
kubectl create namespace lalavisit
```

### 3-2. Email Secret 생성 ⚠️ **필수!**
```bash
cd /Users/lmuffin/Documents/Workspace/lalavisit
./scripts/create-k8s-secrets.sh
```

**입력할 값:**
```
Email User: lalavisit@naver.com
Email Password: [새로운 비밀번호]  ← ⚠️ 기존 비밀번호 변경 추천!
Contact Email: lalavisit@naver.com
```

**⚠️ 중요:**
- 이 대화에서 기존 비밀번호(`8MSZKJ4H3157`)가 노출되었습니다
- 네이버 계정 비밀번호를 즉시 변경하고 새 비밀번호를 사용하세요

**확인:**
```bash
kubectl get secret lalavisit-secrets -n lalavisit
kubectl describe secret lalavisit-secrets -n lalavisit
```

---

## 🔐 4. SSL/TLS 인증서 설정

### 타이밍: **배포 전 OR 배포 후 모두 가능**

### ⭐ 옵션 A: Cert-Manager (추천) - 자동 발급

**장점:**
- 자동 발급 및 90일마다 자동 갱신
- 수동 관리 불필요

**단점:**
- 초기 설정 5-10분 소요
- Cert-Manager 설치 필요

**진행 방법:**
1. 상세 가이드: `SSL-SETUP.md` 참조
2. 요약:
```bash
# 1. Cert-Manager 설치 (배포 전)
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml

# 2. 이메일 수정 후 ClusterIssuer 생성
vi k8s/cert-manager/cluster-issuer.yaml  # 이메일 변경
kubectl apply -f k8s/cert-manager/cluster-issuer.yaml

# 3. Ingress 패치 변경
sed -i 's/ingress-patch.yaml/ingress-tls-patch.yaml/g' k8s/overlays/production/kustomization.yaml

# 4. Git 커밋 & 푸시
git add k8s/
git commit -m "feat: Add Cert-Manager for TLS"
git push origin main

# 5. 5-10분 대기 후 확인
kubectl get certificate -n lalavisit -w
```

---

### 옵션 B: 수동 인증서 - 직접 관리

**장점:**
- 즉시 사용 가능
- 기존 인증서 재사용 가능

**단점:**
- 90일마다 수동 갱신 필요

**진행 방법:**
```bash
# 배포 전에 미리 생성해도 되고, 배포 후에 생성해도 됨
./scripts/create-tls-secret.sh /path/to/tls.crt /path/to/tls.key

# 또는
kubectl create secret tls lalavisit-tls \
  --cert=/path/to/tls.crt \
  --key=/path/to/tls.key \
  --namespace=lalavisit
```

**⚠️ 참고:**
- 배포 전: Secret 생성 → 배포 → 즉시 HTTPS 작동
- 배포 후: 배포 → HTTP로 작동 → Secret 생성 → Pod 재시작 → HTTPS 작동

**추천: 배포 전에 미리 생성**

---

## 📦 5. ArgoCD 설정 (배포 직전)

### ArgoCD Application 생성
```bash
# Production 환경
kubectl apply -f argocd/lalavisit-production.yaml

# Dev 환경 (선택사항)
kubectl apply -f argocd/lalavisit-dev.yaml
```

**확인:**
```bash
# ArgoCD에서 애플리케이션 확인
kubectl get application -n argocd

# ArgoCD UI 접속
# https://argocd.your-domain.com
```

---

## 🚀 6. 배포 실행

### 자동 배포 (현재 진행 중)
```bash
# main 브랜치에 푸시되었으므로 GitHub Actions가 자동 실행됨
# 확인: https://github.com/e16tae/lalavisit/actions
```

**GitHub Actions 진행 상황:**
1. ✅ Docker 이미지 빌드
2. ✅ GHCR에 푸시
3. ✅ K8s 매니페스트 업데이트
4. ⏳ ArgoCD 자동 동기화

### 배포 확인
```bash
# Pod 상태 (3개 replica)
kubectl get pods -n lalavisit -w

# Service 확인
kubectl get svc -n lalavisit

# Ingress 확인
kubectl get ingress -n lalavisit

# 로그 확인
kubectl logs -f -l app=frontend -n lalavisit
```

---

## ✅ 7. 배포 후 검증

### Health Check
```bash
# API Health Check
curl https://www.lalavisit.com/api/health

# 예상 응답:
# {
#   "status": "healthy",
#   "timestamp": "2025-10-11T...",
#   "service": "lalavisit-frontend"
# }
```

### SSL/TLS 확인
```bash
# HTTPS 접속
curl -I https://www.lalavisit.com

# 인증서 정보
openssl s_client -connect www.lalavisit.com:443 -servername www.lalavisit.com < /dev/null
```

### 브라우저 테스트
```
1. https://www.lalavisit.com 접속
2. 주요 페이지 확인:
   - 홈페이지 (/)
   - 서비스 (/services)
   - 소개 (/about)
   - 활동사진 (/activities)
   - 문의하기 (/contact)
3. Contact form 제출 테스트
4. 모바일 반응형 확인
```

---

## 📊 설정 요약

### 즉시 설정 필요 (배포 전)
```bash
# 1. GitHub Actions 권한 (수동 확인)
https://github.com/e16tae/lalavisit/settings/actions

# 2. K8s Secret 생성 (필수!)
./scripts/create-k8s-secrets.sh

# 3. SSL 인증서 (선택)
# - Cert-Manager: SSL-SETUP.md 참조
# - 수동 인증서: ./scripts/create-tls-secret.sh
```

### 배포 시작
```bash
# ArgoCD Application 생성
kubectl apply -f argocd/lalavisit-production.yaml
```

### 배포 확인
```bash
kubectl get pods -n lalavisit -w
curl https://www.lalavisit.com/api/health
```

---

## 🔄 일상 운영

### develop 브랜치 작업
```bash
git checkout develop
# ... 개발 작업 ...
git commit -m "feat: 새 기능"
git push origin develop
# → GitHub Actions CI 자동 실행 (테스트만)
```

### main 브랜치 배포
```bash
git checkout main
git merge develop
git push origin main
# → GitHub Actions CD 자동 실행 (빌드 & 배포)
# → ArgoCD 자동 동기화 (K8s 배포)
```

---

## 📞 문제 해결

**GitHub Actions 실패:**
- https://github.com/e16tae/lalavisit/actions 로그 확인
- Workflow permissions 설정 확인

**Pod 시작 실패:**
```bash
kubectl describe pod <pod-name> -n lalavisit
kubectl logs <pod-name> -n lalavisit
```

**Secret 관련 오류:**
```bash
kubectl get secret lalavisit-secrets -n lalavisit
# Secret이 없으면 다시 생성
./scripts/create-k8s-secrets.sh
```

**인증서 문제:**
- `SSL-SETUP.md` 트러블슈팅 섹션 참조

---

## 📚 문서 참조

- `DEPLOYMENT.md` - 전체 배포 가이드
- `SSL-SETUP.md` - SSL/TLS 상세 설정
- `CLAUDE.md` - 프로젝트 개요 및 개발 가이드
- `README.md` - 프로젝트 소개

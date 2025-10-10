# 개발 워크플로우 가이드

라라재가방문요양센터의 Git 브랜치 전략 및 배포 워크플로우입니다.

---

## 🌳 브랜치 전략

```
develop (개발)  ─────→  main (프로덕션)
   ↓                      ↓
CI 테스트              CD 자동 배포
```

### develop 브랜치
- **용도**: 개발 및 테스트
- **자동화**: CI 파이프라인 (테스트, 빌드 검증)
- **배포**: 없음 (테스트만)

### main 브랜치
- **용도**: 프로덕션 배포
- **자동화**: CD 파이프라인 (빌드, 배포)
- **배포**: K8s 클러스터 자동 배포

---

## 📝 일상 작업 프로세스

### 1. 개발 작업 시작

```bash
# develop 브랜치로 전환
git checkout develop

# 최신 코드 받기
git pull origin develop
```

### 2. 코드 수정 및 커밋

```bash
# 파일 수정...
# (Next.js 코드, 컴포넌트, 페이지 등 수정)

# 변경사항 확인
git status

# 커밋
git add .
git commit -m "feat: 새로운 기능 추가"
# 또는
git commit -m "fix: 버그 수정"
# 또는
git commit -m "docs: 문서 업데이트"
```

### 3. develop에 푸시 (CI 실행)

```bash
git push origin develop
```

**→ GitHub Actions CI 자동 실행:**
- ✅ ESLint 코드 품질 체크
- ✅ TypeScript 타입 체크
- ✅ Next.js 빌드 테스트
- ✅ Docker 이미지 빌드 테스트

**확인 방법:**
```
https://github.com/e16tae/lalavisit/actions
```

**CI 통과하면 → 다음 단계 진행**
**CI 실패하면 → 코드 수정 후 다시 푸시**

### 4. 프로덕션 배포 (main 머지)

```bash
# main 브랜치로 전환
git checkout main

# 최신 코드 받기
git pull origin main

# develop 머지
git merge develop

# 푸시 (배포 시작!)
git push origin main
```

**→ GitHub Actions CD 자동 실행:**
1. ✅ Docker 이미지 빌드
2. ✅ GHCR에 푸시 (`ghcr.io/e16tae/lalavisit-frontend:main-<sha>`)
3. ✅ K8s 매니페스트 자동 업데이트
4. ✅ ArgoCD 자동 감지 및 동기화
5. ✅ K8s 클러스터 배포

**배포 시간:** 약 5-10분

### 5. 배포 확인

```bash
# Pod 상태 확인
kubectl get pods -n lalavisit

# 배포 완료 시 3개의 pod가 Running 상태:
# prod-frontend-xxxxx   1/1   Running
# prod-frontend-xxxxx   1/1   Running
# prod-frontend-xxxxx   1/1   Running

# Health Check
curl https://www.lalavisit.com/api/health

# 브라우저 테스트
open https://www.lalavisit.com
```

### 6. develop 동기화 (중요!)

```bash
# 배포 후 develop도 최신 상태로 동기화
git checkout develop
git merge main
git push origin develop
```

---

## 🎯 커밋 메시지 규칙

```bash
# 새 기능
git commit -m "feat: 활동사진 필터링 기능 추가"

# 버그 수정
git commit -m "fix: 연락처 폼 제출 오류 수정"

# UI 개선
git commit -m "style: 메인 페이지 레이아웃 개선"

# 문서
git commit -m "docs: 배포 가이드 업데이트"

# 리팩토링
git commit -m "refactor: 컴포넌트 구조 개선"

# 설정
git commit -m "chore: ESLint 규칙 업데이트"
```

---

## 🔍 배포 상태 모니터링

### GitHub Actions 확인
```
https://github.com/e16tae/lalavisit/actions
```

### K8s 클러스터 확인
```bash
# Pod 상태
kubectl get pods -n lalavisit -w

# Service
kubectl get svc -n lalavisit

# Ingress
kubectl get ingress -n lalavisit

# 로그 (실시간)
kubectl logs -f -l app=frontend -n lalavisit
```

### ArgoCD 확인 (UI 있는 경우)
```
https://argocd.your-domain.com
→ lalavisit-production 애플리케이션 클릭
```

---

## 🚨 긴급 롤백

### 방법 1: Git Revert (권장)
```bash
git checkout main
git revert HEAD
git push origin main
# → 자동으로 이전 버전 재배포
```

### 방법 2: kubectl 직접 롤백
```bash
kubectl rollout undo deployment/prod-frontend -n lalavisit
```

### 방법 3: 특정 버전으로 롤백
```bash
# 1. 이전 커밋 SHA 찾기
git log --oneline

# 2. kustomization.yaml 수정
cd k8s/overlays/production
# newTag를 이전 SHA로 변경

# 3. 커밋 & 푸시
git add .
git commit -m "chore: rollback to <sha>"
git push origin main
```

---

## 📊 배포 플로우 요약

```
┌─────────────┐
│ 코드 수정    │
└──────┬──────┘
       ↓
┌─────────────┐
│ develop 푸시 │ ← git push origin develop
└──────┬──────┘
       ↓
┌─────────────┐
│ CI 실행     │ ← ESLint, TypeScript, Build Test
└──────┬──────┘
       ↓
   CI 통과?
    ↙  ↘
 NO    YES
  ↓     ↓
수정  ┌─────────────┐
←───  │ main 머지   │ ← git merge develop && git push
      └──────┬──────┘
             ↓
      ┌─────────────┐
      │ CD 실행     │ ← Docker Build, GHCR Push
      └──────┬──────┘
             ↓
      ┌─────────────┐
      │ K8s 매니페스트 │ ← kustomization.yaml 자동 업데이트
      │   업데이트   │
      └──────┬──────┘
             ↓
      ┌─────────────┐
      │ ArgoCD 동기화│ ← 자동 감지 및 배포
      └──────┬──────┘
             ↓
      ┌─────────────┐
      │ 배포 완료    │ ← Pod Running, Service 활성화
      └─────────────┘
```

---

## 💡 팁

### 로컬 테스트
```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드 테스트
npm run build

# ESLint 체크
npm run lint
```

### 자주 사용하는 명령어
```bash
# 현재 브랜치 확인
git branch

# 최근 커밋 확인
git log --oneline -5

# 변경사항 확인
git status
git diff

# Pod 로그 실시간 확인
kubectl logs -f -l app=frontend -n lalavisit
```

### 환경변수 변경
```bash
# Secret 업데이트
kubectl delete secret lalavisit-secrets -n lalavisit
./scripts/create-k8s-secrets.sh

# Pod 재시작 (Secret 적용)
kubectl rollout restart deployment/prod-frontend -n lalavisit
```

---

## 📞 문제 해결

**CI 실패:**
- GitHub Actions 로그 확인
- 로컬에서 `npm run build` 및 `npm run lint` 실행

**배포 실패:**
- `kubectl get pods -n lalavisit` 확인
- `kubectl describe pod <pod-name> -n lalavisit` 상세 정보
- `kubectl logs <pod-name> -n lalavisit` 로그 확인

**ArgoCD 동기화 안됨:**
- ArgoCD UI에서 수동 "Sync" 실행
- `kubectl get application -n argocd` 상태 확인

---

## 📚 관련 문서

- `DEPLOYMENT.md` - 배포 상세 가이드
- `SETUP-CHECKLIST.md` - 초기 설정 체크리스트
- `SSL-SETUP.md` - SSL/TLS 인증서 설정
- `CLAUDE.md` - 프로젝트 개발 가이드

# SSL/TLS 인증서 설정 가이드

라라재가방문요양센터의 SSL/TLS 인증서 설정 방법입니다.

## 🔐 두 가지 옵션

### ⭐ **옵션 1: Cert-Manager (추천) - 자동 발급 및 갱신**

**장점:**
- ✅ Let's Encrypt 무료 인증서 자동 발급
- ✅ 90일마다 자동 갱신
- ✅ 수동 관리 불필요
- ✅ 여러 도메인 관리 용이

**단점:**
- ❌ Cert-Manager 설치 필요
- ❌ 초기 설정 시간 5-10분 소요

---

### 📦 **옵션 2: 수동 인증서 - 직접 관리**

**장점:**
- ✅ 기존 인증서 재사용 가능
- ✅ Cert-Manager 설치 불필요

**단점:**
- ❌ 인증서 만료 시 수동 갱신 필요
- ❌ 여러 환경 관리 시 번거로움

---

## 🚀 옵션 1: Cert-Manager 자동 발급 (추천)

### 1단계: Cert-Manager 설치 (배포 전)

```bash
# Cert-Manager 설치 (클러스터에 한 번만)
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml

# 설치 확인 (모든 Pod가 Running 상태가 될 때까지 대기)
kubectl get pods -n cert-manager -w
```

### 2단계: Let's Encrypt Issuer 생성

```bash
# 이메일 주소 수정 필요!
vi k8s/cert-manager/cluster-issuer.yaml

# ClusterIssuer 생성
kubectl apply -f k8s/cert-manager/cluster-issuer.yaml

# 확인
kubectl get clusterissuer
```

### 3단계: Ingress 패치 적용

```bash
# Production kustomization 수정
cd k8s/overlays/production

# kustomization.yaml 수정
vi kustomization.yaml

# 다음 줄 변경:
# 변경 전: - ingress-patch.yaml
# 변경 후: - ingress-tls-patch.yaml
```

또는 명령어로 변경:
```bash
sed -i 's/ingress-patch.yaml/ingress-tls-patch.yaml/g' k8s/overlays/production/kustomization.yaml
```

### 4단계: 변경사항 커밋 & 푸시

```bash
git add k8s/
git commit -m "feat: Add Cert-Manager for automatic TLS certificate management"
git push origin main
```

### 5단계: 배포 및 확인

```bash
# ArgoCD가 자동으로 동기화하거나 수동 동기화
kubectl get certificate -n lalavisit -w

# 인증서 발급 상태 확인 (5-10분 소요)
kubectl describe certificate lalavisit-tls -n lalavisit

# 성공 시 다음과 같이 표시됨:
# Status:
#   Conditions:
#     Type:    Ready
#     Status:  True
```

### 6단계: 테스트

```bash
# HTTPS 접속 확인
curl -I https://www.lalavisit.com

# 인증서 정보 확인
openssl s_client -connect www.lalavisit.com:443 -servername www.lalavisit.com < /dev/null 2>/dev/null | openssl x509 -noout -text
```

---

## 🔧 옵션 2: 수동 인증서 관리

### 1단계: 인증서 준비

**방법 A: 기존 인증서 사용**
```bash
# 기존 인증서 파일 확인
ls -la /path/to/tls.crt
ls -la /path/to/tls.key
```

**방법 B: Let's Encrypt Certbot으로 발급**
```bash
# Certbot 설치 (macOS)
brew install certbot

# 수동 DNS 인증 방식으로 발급
sudo certbot certonly --manual --preferred-challenges dns -d www.lalavisit.com

# 발급된 인증서 위치:
# Certificate: /etc/letsencrypt/live/www.lalavisit.com/fullchain.pem
# Private Key: /etc/letsencrypt/live/www.lalavisit.com/privkey.pem
```

### 2단계: K8s Secret 생성 (배포 전에 해도 됨)

```bash
# 스크립트 사용
./scripts/create-tls-secret.sh /path/to/fullchain.pem /path/to/privkey.pem

# 또는 직접 명령어
kubectl create secret tls lalavisit-tls \
  --cert=/path/to/fullchain.pem \
  --key=/path/to/privkey.pem \
  --namespace=lalavisit
```

### 3단계: 확인

```bash
kubectl get secret lalavisit-tls -n lalavisit
kubectl describe secret lalavisit-tls -n lalavisit
```

### 4단계: 배포 후 테스트

```bash
curl -I https://www.lalavisit.com
```

### ⚠️ 인증서 갱신 (90일마다)

**수동 인증서는 만료 전에 직접 갱신해야 합니다!**

```bash
# 1. 새 인증서 발급
sudo certbot renew

# 2. Secret 업데이트
kubectl delete secret lalavisit-tls -n lalavisit
kubectl create secret tls lalavisit-tls \
  --cert=/etc/letsencrypt/live/www.lalavisit.com/fullchain.pem \
  --key=/etc/letsencrypt/live/www.lalavisit.com/privkey.pem \
  --namespace=lalavisit

# 3. Pod 재시작 (필요시)
kubectl rollout restart deployment/prod-frontend -n lalavisit
```

---

## 📅 타이밍 비교

| 단계 | Cert-Manager | 수동 인증서 |
|------|--------------|-------------|
| **배포 전** | Cert-Manager 설치 + Issuer 생성 | 인증서 발급 + Secret 생성 |
| **배포 시** | Ingress 패치 적용 | 그대로 배포 |
| **배포 후** | 5-10분 대기 (자동 발급) | 즉시 사용 가능 |
| **유지보수** | 자동 갱신 (관리 불필요) | 90일마다 수동 갱신 |

---

## 💡 추천 전략

### 개발/테스트 환경
→ **Cert-Manager (letsencrypt-staging)** 사용
- 테스트 인증서 무제한 발급 가능
- 프로덕션과 동일한 자동화 프로세스

### 프로덕션 환경
→ **Cert-Manager (letsencrypt-prod)** 사용 (추천)
- 장기적으로 관리 부담 최소화
- 자동 갱신으로 인증서 만료 걱정 없음

---

## 🔍 트러블슈팅

### Cert-Manager 인증서 발급 실패

```bash
# Certificate 상태 확인
kubectl describe certificate lalavisit-tls -n lalavisit

# CertificateRequest 확인
kubectl get certificaterequest -n lalavisit
kubectl describe certificaterequest <name> -n lalavisit

# Challenge 확인
kubectl get challenge -n lalavisit
kubectl describe challenge <name> -n lalavisit

# Cert-Manager 로그
kubectl logs -n cert-manager -l app=cert-manager -f
```

**흔한 문제:**
1. DNS가 클러스터를 가리키지 않음
   - `dig www.lalavisit.com` 확인
2. Kong Ingress가 HTTP-01 challenge를 차단
   - Kong 설정 확인
3. Rate limit 초과 (Let's Encrypt)
   - Staging issuer로 테스트 후 Production 사용

### 수동 인증서 문제

```bash
# Secret이 올바르게 생성되었는지 확인
kubectl get secret lalavisit-tls -n lalavisit -o yaml

# Certificate 유효성 확인
kubectl get secret lalavisit-tls -n lalavisit -o jsonpath='{.data.tls\.crt}' | base64 -d | openssl x509 -noout -text
```

---

## 📚 참고 자료

- [Cert-Manager 공식 문서](https://cert-manager.io/docs/)
- [Let's Encrypt 문서](https://letsencrypt.org/docs/)
- [Kong Ingress TLS 설정](https://docs.konghq.com/kubernetes-ingress-controller/latest/guides/configure-https/)

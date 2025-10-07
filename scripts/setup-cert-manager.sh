#!/bin/bash
set -e

echo "========================================="
echo "cert-manager 설치 (SSL 인증서 자동 발급)"
echo "========================================="
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# kubectl 설치 확인
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: kubectl이 설치되어 있지 않습니다.${NC}"
    exit 1
fi

# K8s 클러스터 연결 확인
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Error: K8s 클러스터에 연결할 수 없습니다.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ K8s 클러스터 연결 확인 완료${NC}"
echo ""

# 기존 cert-manager 확인
if kubectl get namespace cert-manager &> /dev/null; then
    echo -e "${YELLOW}⚠ cert-manager가 이미 설치되어 있습니다.${NC}"
    read -p "재설치하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "기존 cert-manager를 제거합니다..."
        kubectl delete namespace cert-manager
        sleep 5
    else
        echo "기존 cert-manager를 사용합니다."

        # ClusterIssuer 확인
        if kubectl get clusterissuer letsencrypt-prod &> /dev/null; then
            echo -e "${GREEN}✓ ClusterIssuer가 이미 존재합니다.${NC}"
            exit 0
        else
            echo -e "${YELLOW}ClusterIssuer를 생성합니다.${NC}"
            # ClusterIssuer 생성으로 건너뜀
        fi
    fi
fi

echo ""
echo -e "${YELLOW}[Step 1] cert-manager 설치${NC}"
echo ""

# Helm 설치 확인
if command -v helm &> /dev/null; then
    echo "Helm을 사용하여 설치합니다..."

    # Helm repo 추가
    helm repo add jetstack https://charts.jetstack.io
    helm repo update

    # cert-manager 설치
    helm install cert-manager jetstack/cert-manager \
        --namespace cert-manager \
        --create-namespace \
        --version v1.13.3 \
        --set installCRDs=true

    echo ""
    echo "설치 중... (약 1-2분 소요)"
    kubectl wait --namespace cert-manager \
        --for=condition=ready pod \
        --selector=app.kubernetes.io/instance=cert-manager \
        --timeout=300s

else
    echo "kubectl를 사용하여 설치합니다..."

    # CRD 설치
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.3/cert-manager.crds.yaml

    # cert-manager 설치
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.3/cert-manager.yaml

    echo ""
    echo "설치 중... (약 1-2분 소요)"
    kubectl wait --namespace cert-manager \
        --for=condition=ready pod \
        --selector=app.kubernetes.io/instance=cert-manager \
        --timeout=300s
fi

echo ""
echo -e "${GREEN}✓ cert-manager 설치 완료${NC}"
echo ""

echo -e "${YELLOW}[Step 2] Let's Encrypt ClusterIssuer 생성${NC}"
echo ""

# Let's Encrypt 이메일 입력
read -p "Let's Encrypt 알림 이메일 [lalavisit@naver.com]: " LETSENCRYPT_EMAIL
LETSENCRYPT_EMAIL=${LETSENCRYPT_EMAIL:-lalavisit@naver.com}

# ClusterIssuer YAML 생성
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: $LETSENCRYPT_EMAIL
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
    - http01:
        ingress:
          class: nginx
EOF

echo ""
echo -e "${GREEN}✓ ClusterIssuer 생성 완료${NC}"
echo ""

# Staging ClusterIssuer도 생성 (테스트용)
echo "테스트용 Staging ClusterIssuer도 생성합니다..."

cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: $LETSENCRYPT_EMAIL
    privateKeySecretRef:
      name: letsencrypt-staging-key
    solvers:
    - http01:
        ingress:
          class: nginx
EOF

echo -e "${GREEN}✓ Staging ClusterIssuer 생성 완료${NC}"
echo ""

echo -e "${YELLOW}[Step 3] 설치 확인${NC}"
echo ""

# cert-manager 상태 확인
echo "cert-manager Pod 상태:"
kubectl get pods -n cert-manager
echo ""

echo "ClusterIssuer 상태:"
kubectl get clusterissuer
echo ""

# ClusterIssuer 상세 정보
kubectl describe clusterissuer letsencrypt-prod | grep -A5 "Status:"
echo ""

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}cert-manager 설치 완료!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

echo -e "${BLUE}다음 단계:${NC}"
echo ""
echo "1. Ingress에 SSL 설정 확인"
echo "   k8s/ingress.yaml의 annotations와 tls 섹션 확인"
echo ""
echo "2. 인증서 발급 확인 (배포 후)"
echo "   kubectl get certificate -n lalavisit"
echo "   kubectl describe certificate lalavisit-tls -n lalavisit"
echo ""
echo "3. 인증서 문제 해결"
echo "   kubectl get certificaterequest -n lalavisit"
echo "   kubectl describe certificaterequest -n lalavisit"
echo ""
echo "   kubectl get order -n lalavisit"
echo "   kubectl describe order -n lalavisit"
echo ""

echo -e "${YELLOW}참고:${NC}"
echo "- 테스트 시에는 letsencrypt-staging 사용 (Rate Limit 방지)"
echo "- 프로덕션에서는 letsencrypt-prod 사용"
echo "- Ingress annotation 변경:"
echo "  cert-manager.io/cluster-issuer: \"letsencrypt-staging\" (테스트)"
echo "  cert-manager.io/cluster-issuer: \"letsencrypt-prod\" (프로덕션)"
echo ""

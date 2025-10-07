#!/bin/bash
set -e

echo "========================================="
echo "Nginx Ingress Controller 설치"
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

# 기존 Ingress Controller 확인
if kubectl get namespace ingress-nginx &> /dev/null; then
    echo -e "${YELLOW}⚠ Nginx Ingress Controller가 이미 설치되어 있습니다.${NC}"
    read -p "재설치하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "기존 Ingress Controller를 제거합니다..."
        kubectl delete namespace ingress-nginx
        sleep 5
    else
        echo "기존 Ingress Controller를 사용합니다."
        exit 0
    fi
fi

echo ""
echo -e "${YELLOW}[Step 1] Nginx Ingress Controller 설치${NC}"
echo ""

# Helm 설치 확인
if command -v helm &> /dev/null; then
    echo "Helm을 사용하여 설치합니다..."

    # Helm repo 추가
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo update

    # Nginx Ingress Controller 설치
    helm install ingress-nginx ingress-nginx/ingress-nginx \
        --namespace ingress-nginx \
        --create-namespace \
        --set controller.service.type=LoadBalancer

    echo ""
    echo "설치 중... (약 1-2분 소요)"
    kubectl wait --namespace ingress-nginx \
        --for=condition=ready pod \
        --selector=app.kubernetes.io/component=controller \
        --timeout=300s

else
    echo "kubectl를 사용하여 설치합니다..."

    # manifest로 설치
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.5/deploy/static/provider/cloud/deploy.yaml

    echo ""
    echo "설치 중... (약 1-2분 소요)"
    kubectl wait --namespace ingress-nginx \
        --for=condition=ready pod \
        --selector=app.kubernetes.io/component=controller \
        --timeout=300s
fi

echo ""
echo -e "${GREEN}✓ Nginx Ingress Controller 설치 완료${NC}"
echo ""

echo -e "${YELLOW}[Step 2] 설치 확인${NC}"
echo ""

# Ingress Controller 상태 확인
echo "Ingress Controller Pod 상태:"
kubectl get pods -n ingress-nginx
echo ""

echo "Ingress Controller Service 상태:"
kubectl get svc -n ingress-nginx
echo ""

# LoadBalancer External IP 확인
EXTERNAL_IP=$(kubectl get svc ingress-nginx-controller -n ingress-nginx -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

if [ -z "$EXTERNAL_IP" ]; then
    EXTERNAL_IP=$(kubectl get svc ingress-nginx-controller -n ingress-nginx -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
fi

if [ -n "$EXTERNAL_IP" ]; then
    echo -e "${GREEN}External IP/Hostname: $EXTERNAL_IP${NC}"
    echo ""
    echo -e "${BLUE}다음 단계:${NC}"
    echo "1. 도메인 DNS 설정에서 www.lalavisit.com를 $EXTERNAL_IP로 A 레코드 추가"
    echo "2. DNS 전파 확인 (최대 48시간 소요)"
    echo "   nslookup www.lalavisit.com"
    echo ""
else
    echo -e "${YELLOW}⚠ External IP가 아직 할당되지 않았습니다.${NC}"
    echo "다음 명령어로 확인하세요:"
    echo "  kubectl get svc ingress-nginx-controller -n ingress-nginx --watch"
    echo ""
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Nginx Ingress Controller 설치 완료!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

echo "IngressClass 확인:"
kubectl get ingressclass
echo ""

echo "다음 단계:"
echo "1. cert-manager 설치 (SSL 인증서 자동 발급)"
echo "   ./scripts/setup-cert-manager.sh"
echo ""
echo "2. 도메인 DNS 설정"
echo "3. 애플리케이션 배포"
echo "   ./scripts/deploy-manual.sh 또는 ./scripts/deploy-argocd.sh"
echo ""

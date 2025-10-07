#!/bin/bash
set -e

echo "========================================="
echo "Kong Ingress Controller 확인 및 설치"
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

# Kong Ingress Controller 확인
echo -e "${YELLOW}[Step 1] Kong Ingress Controller 확인${NC}"
echo ""

if kubectl get namespace kong &> /dev/null; then
    echo -e "${GREEN}✓ Kong namespace가 존재합니다.${NC}"

    # Kong Gateway 확인
    if kubectl get deployment -n kong kong-gateway &> /dev/null 2>&1 || \
       kubectl get deployment -n kong ingress-kong &> /dev/null 2>&1; then
        echo -e "${GREEN}✓ Kong Gateway가 실행 중입니다.${NC}"
    else
        echo -e "${YELLOW}⚠ Kong Gateway를 찾을 수 없습니다.${NC}"
    fi

    # IngressClass 확인
    if kubectl get ingressclass kong &> /dev/null 2>&1; then
        echo -e "${GREEN}✓ Kong IngressClass가 등록되어 있습니다.${NC}"
    else
        echo -e "${YELLOW}⚠ Kong IngressClass를 찾을 수 없습니다.${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Kong Ingress Controller가 설치되어 있지 않습니다.${NC}"
    echo ""
    read -p "Kong Ingress Controller를 설치하시겠습니까? (y/N): " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "Kong Ingress Controller를 설치합니다..."
        echo ""

        # Helm 설치 확인
        if command -v helm &> /dev/null; then
            echo "Helm을 사용하여 설치합니다..."

            # Helm repo 추가
            helm repo add kong https://charts.konghq.com
            helm repo update

            # Kong Ingress Controller 설치
            helm install kong kong/ingress \
                --namespace kong \
                --create-namespace \
                --set controller.ingressController.installCRDs=false

            echo ""
            echo "설치 중... (약 1-2분 소요)"
            kubectl wait --namespace kong \
                --for=condition=ready pod \
                --selector=app.kubernetes.io/name=kong \
                --timeout=300s
        else
            echo "kubectl를 사용하여 설치합니다..."

            # Kong Gateway 설치 (DB-less mode)
            kubectl create namespace kong
            kubectl apply -f https://raw.githubusercontent.com/Kong/kubernetes-ingress-controller/main/deploy/single/all-in-one-dbless.yaml

            echo ""
            echo "설치 중... (약 1-2분 소요)"
            kubectl wait --namespace kong \
                --for=condition=ready pod \
                --selector=app=ingress-kong \
                --timeout=300s
        fi

        echo ""
        echo -e "${GREEN}✓ Kong Ingress Controller 설치 완료${NC}"
    else
        echo ""
        echo -e "${YELLOW}Kong이 설치되어 있지 않으면 Ingress가 작동하지 않습니다.${NC}"
        echo "수동으로 Kong을 설치하거나, 다른 Ingress Controller를 사용하세요."
        exit 0
    fi
fi

echo ""
echo -e "${YELLOW}[Step 2] Kong 설치 확인${NC}"
echo ""

# Kong 상태 확인
echo "Kong Pods 상태:"
kubectl get pods -n kong
echo ""

echo "Kong Services 상태:"
kubectl get svc -n kong
echo ""

# IngressClass 확인
echo "IngressClass 확인:"
kubectl get ingressclass
echo ""

# LoadBalancer External IP 확인
EXTERNAL_IP=$(kubectl get svc -n kong kong-proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "")

if [ -z "$EXTERNAL_IP" ]; then
    EXTERNAL_IP=$(kubectl get svc -n kong kong-proxy -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "")
fi

if [ -z "$EXTERNAL_IP" ]; then
    # kong-gateway-proxy 서비스도 확인
    EXTERNAL_IP=$(kubectl get svc -n kong kong-gateway-proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "")
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
    echo "  kubectl get svc -n kong --watch"
    echo ""
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Kong Ingress Controller 확인 완료!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

echo "다음 단계:"
echo "1. cert-manager 설치 (SSL 인증서 자동 발급)"
echo "   ./scripts/setup-cert-manager.sh"
echo ""
echo "2. 도메인 DNS 설정"
echo "3. 애플리케이션 배포"
echo "   ./scripts/deploy-manual.sh 또는 ./scripts/deploy-argocd.sh"
echo ""

echo -e "${BLUE}Kong 관리 명령어:${NC}"
echo ""
echo "  # Kong 플러그인 확인"
echo "  kubectl get kongplugins -A"
echo ""
echo "  # Kong Ingress 확인"
echo "  kubectl get ingress -A"
echo ""
echo "  # Kong 로그 확인"
echo "  kubectl logs -n kong -l app=ingress-kong"
echo ""

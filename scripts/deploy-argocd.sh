#!/bin/bash
set -e

echo "========================================="
echo "라라재가방문요양센터 ArgoCD 배포"
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
    echo "kubectl config를 확인하세요."
    exit 1
fi

echo -e "${GREEN}✓ K8s 클러스터 연결 확인 완료${NC}"
echo ""

# ArgoCD 설치 확인
echo -e "${YELLOW}[Step 1] ArgoCD 설치${NC}"

if kubectl get namespace argocd &> /dev/null; then
    echo -e "${GREEN}✓ ArgoCD namespace가 이미 존재합니다.${NC}"
    read -p "ArgoCD를 재설치하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "ArgoCD를 제거합니다..."
        kubectl delete namespace argocd
        sleep 5
    else
        echo "기존 ArgoCD를 사용합니다."
    fi
fi

if ! kubectl get namespace argocd &> /dev/null; then
    echo "ArgoCD를 설치합니다..."
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

    echo ""
    echo "ArgoCD 설치 중... (약 1-2분 소요)"
    kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

    echo -e "${GREEN}✓ ArgoCD 설치 완료${NC}"
fi

echo ""
echo -e "${YELLOW}[Step 2] ArgoCD 초기 비밀번호 확인${NC}"

# ArgoCD admin 비밀번호 추출
echo "ArgoCD admin 사용자 초기 비밀번호:"
ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
echo -e "${BLUE}$ARGOCD_PASSWORD${NC}"
echo ""
echo "이 비밀번호를 복사해두세요. 첫 로그인 후 변경할 수 있습니다."
echo ""

# ArgoCD UI 접속 방법 안내
echo -e "${YELLOW}[Step 3] ArgoCD 웹 UI 접속 설정${NC}"
echo ""
echo "ArgoCD 접속 방법을 선택하세요:"
echo "  1) Ingress (도메인: argocd.deuseda.com)"
echo "  2) Port Forwarding (로컬: https://localhost:8080)"
echo "  3) 나중에 설정"
echo ""
read -p "선택 (1-3): " -n 1 -r ACCESS_CHOICE
echo ""
echo ""

if [ "$ACCESS_CHOICE" = "1" ]; then
    echo -e "${GREEN}ArgoCD Ingress를 생성합니다...${NC}"
    kubectl apply -f ../k8s/argocd-ingress.yaml

    echo -e "${GREEN}✓ ArgoCD Ingress 생성 완료${NC}"
    echo ""
    echo -e "${BLUE}ArgoCD 접속 정보:${NC}"
    echo "  URL: https://argocd.deuseda.com"
    echo "  Username: admin"
    echo "  Password: $ARGOCD_PASSWORD"
    echo ""
    echo -e "${YELLOW}주의: DNS 설정이 필요합니다.${NC}"
    echo "  argocd.deuseda.com을 Kong LoadBalancer IP로 A 레코드 추가"
    echo ""

elif [ "$ACCESS_CHOICE" = "2" ]; then
    echo ""
    echo -e "${GREEN}Port Forwarding을 시작합니다...${NC}"
    echo "ArgoCD UI: https://localhost:8080"
    echo "Username: admin"
    echo "Password: $ARGOCD_PASSWORD"
    echo ""
    echo -e "${YELLOW}Ctrl+C를 눌러 종료하세요.${NC}"
    echo ""
    kubectl port-forward svc/argocd-server -n argocd 8080:443
    exit 0
else
    echo "나중에 다음 명령어로 Ingress를 생성할 수 있습니다:"
    echo "  kubectl apply -f k8s/argocd-ingress.yaml"
    echo ""
fi

echo ""
echo -e "${YELLOW}[Step 4] lalavisit Secret 생성${NC}"

# Secret 생성 (수동 배포와 동일)
if kubectl get secret lalavisit-secrets -n lalavisit &> /dev/null; then
    echo -e "${GREEN}✓ Secret이 이미 존재합니다.${NC}"
else
    echo ""
    echo "환경 변수를 설정합니다..."
    echo "(환경 변수가 있으면 자동으로 사용됩니다)"
    echo ""

    # 환경변수 우선, 없으면 프롬프트
    if [ -z "$EMAIL_USER" ]; then
        read -p "EMAIL_USER [lalavisit@naver.com]: " EMAIL_USER
        EMAIL_USER=${EMAIL_USER:-lalavisit@naver.com}
    else
        echo "EMAIL_USER: $EMAIL_USER (환경변수)"
    fi

    if [ -z "$EMAIL_PASSWORD" ]; then
        read -sp "EMAIL_PASSWORD: " EMAIL_PASSWORD
        echo ""
    else
        echo "EMAIL_PASSWORD: ******* (환경변수)"
    fi

    if [ -z "$SMTP_HOST" ]; then
        read -p "SMTP_HOST [smtp.naver.com]: " SMTP_HOST
        SMTP_HOST=${SMTP_HOST:-smtp.naver.com}
    else
        echo "SMTP_HOST: $SMTP_HOST (환경변수)"
    fi

    if [ -z "$SMTP_PORT" ]; then
        read -p "SMTP_PORT [587]: " SMTP_PORT
        SMTP_PORT=${SMTP_PORT:-587}
    else
        echo "SMTP_PORT: $SMTP_PORT (환경변수)"
    fi

    if [ -z "$CONTACT_EMAIL" ]; then
        read -p "CONTACT_EMAIL [lalavisit@naver.com]: " CONTACT_EMAIL
        CONTACT_EMAIL=${CONTACT_EMAIL:-lalavisit@naver.com}
    else
        echo "CONTACT_EMAIL: $CONTACT_EMAIL (환경변수)"
    fi

    if [ -z "$SITE_URL" ]; then
        read -p "SITE_URL [https://www.lalavisit.com]: " SITE_URL
        SITE_URL=${SITE_URL:-https://www.lalavisit.com}
    else
        echo "SITE_URL: $SITE_URL (환경변수)"
    fi

    if [ -z "$KAKAO_CHANNEL_ID" ]; then
        read -p "KAKAO_CHANNEL_ID [_xnxoxoxG]: " KAKAO_ID
        KAKAO_ID=${KAKAO_ID:-_xnxoxoxG}
    else
        KAKAO_ID=$KAKAO_CHANNEL_ID
        echo "KAKAO_CHANNEL_ID: $KAKAO_ID (환경변수)"
    fi

    echo ""
    echo "Secret을 생성합니다..."

    # Namespace 먼저 생성
    kubectl apply -f ../k8s/namespace.yaml

    kubectl create secret generic lalavisit-secrets \
        --namespace=lalavisit \
        --from-literal=EMAIL_USER="$EMAIL_USER" \
        --from-literal=EMAIL_PASSWORD="$EMAIL_PASSWORD" \
        --from-literal=SMTP_HOST="$SMTP_HOST" \
        --from-literal=SMTP_PORT="$SMTP_PORT" \
        --from-literal=CONTACT_EMAIL="$CONTACT_EMAIL" \
        --from-literal=NEXT_PUBLIC_SITE_URL="$SITE_URL" \
        --from-literal=NEXT_PUBLIC_KAKAO_CHANNEL_ID="$KAKAO_ID"

    echo -e "${GREEN}✓ Secret 생성 완료${NC}"
fi

echo ""
echo -e "${YELLOW}[Step 5] ArgoCD Application 생성${NC}"

# ArgoCD Application 배포
kubectl apply -f ../argocd/application.yaml

echo -e "${GREEN}✓ ArgoCD Application 생성 완료${NC}"

echo ""
echo -e "${YELLOW}[Step 6] 동기화 상태 확인${NC}"
echo ""

# ArgoCD CLI 설치 확인
if command -v argocd &> /dev/null; then
    echo "ArgoCD Application 상태:"
    argocd app list || echo "ArgoCD CLI 로그인이 필요합니다."
    echo ""
    echo "ArgoCD CLI 로그인:"
    echo "  argocd login localhost:8080 --username admin --password $ARGOCD_PASSWORD --insecure"
    echo ""
    echo "Application 동기화:"
    echo "  argocd app sync lalavisit"
    echo ""
else
    echo -e "${YELLOW}ArgoCD CLI가 설치되어 있지 않습니다.${NC}"
    echo ""
    echo "ArgoCD CLI 설치 방법:"
    echo ""
    echo "macOS:"
    echo "  brew install argocd"
    echo ""
    echo "Linux:"
    echo "  curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64"
    echo "  chmod +x /usr/local/bin/argocd"
    echo ""
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}ArgoCD 배포가 완료되었습니다!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

echo "다음 단계:"
echo ""
echo "1. ArgoCD 웹 UI 접속:"
echo "   kubectl port-forward svc/argocd-server -n argocd 8080:443"
echo "   https://localhost:8080"
echo ""
echo "2. 로그인 정보:"
echo "   Username: admin"
echo "   Password: $ARGOCD_PASSWORD"
echo ""
echo "3. lalavisit Application 확인:"
echo "   - 웹 UI에서 'lalavisit' 앱 클릭"
echo "   - 'SYNC' 버튼 클릭하여 수동 동기화"
echo "   - 또는 자동 동기화 대기 (약 3분)"
echo ""
echo "4. 배포 상태 확인:"
echo "   kubectl get pods -n lalavisit"
echo "   kubectl get ingress -n lalavisit"
echo ""

echo -e "${YELLOW}이제 Git에 push하면 자동으로 배포됩니다!${NC}"
echo ""

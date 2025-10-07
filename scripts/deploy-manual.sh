#!/bin/bash
set -e

echo "========================================="
echo "라라재가방문요양센터 K8s 수동 배포"
echo "========================================="
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Secret 생성 확인
echo -e "${YELLOW}[Step 1] Secret 설정${NC}"
if kubectl get secret lalavisit-secrets -n lalavisit &> /dev/null; then
    echo -e "${GREEN}✓ Secret이 이미 존재합니다.${NC}"
    read -p "Secret을 재생성하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kubectl delete secret lalavisit-secrets -n lalavisit
    else
        echo "기존 Secret을 유지합니다."
    fi
fi

if ! kubectl get secret lalavisit-secrets -n lalavisit &> /dev/null; then
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

    if [ -z "$KAKAO_CHANNEL_URL" ]; then
        read -p "KAKAO_CHANNEL_URL [https://pf.kakao.com/_xnxoxoxG/chat]: " KAKAO_URL
        KAKAO_URL=${KAKAO_URL:-https://pf.kakao.com/_xnxoxoxG/chat}
    else
        KAKAO_URL=$KAKAO_CHANNEL_URL
        echo "KAKAO_CHANNEL_URL: $KAKAO_URL (환경변수)"
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
        --from-literal=NEXT_PUBLIC_KAKAO_CHANNEL_URL="$KAKAO_URL"

    echo -e "${GREEN}✓ Secret 생성 완료${NC}"
fi

echo ""
echo -e "${YELLOW}[Step 2] GHCR 접근 권한 설정${NC}"

# GHCR이 public이 아닌 경우 ImagePullSecret 필요
if ! kubectl get secret ghcr-secret -n lalavisit &> /dev/null; then
    # 환경변수로 GITHUB_USER와 GITHUB_PAT이 설정되어 있으면 자동으로 생성
    if [ -n "$GITHUB_USER" ] && [ -n "$GITHUB_PAT" ]; then
        echo "GHCR ImagePullSecret을 생성합니다... (환경변수 사용)"

        kubectl create secret docker-registry ghcr-secret \
            --docker-server=ghcr.io \
            --docker-username="$GITHUB_USER" \
            --docker-password="$GITHUB_PAT" \
            --namespace=lalavisit

        echo -e "${GREEN}✓ ImagePullSecret 생성 완료${NC}"
    else
        read -p "GHCR 저장소가 private입니까? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "GitHub Username [e16tae]: " GITHUB_USER
            GITHUB_USER=${GITHUB_USER:-e16tae}

            read -sp "GitHub Personal Access Token (packages 권한 필요): " GITHUB_PAT
            echo ""

            kubectl create secret docker-registry ghcr-secret \
                --docker-server=ghcr.io \
                --docker-username="$GITHUB_USER" \
                --docker-password="$GITHUB_PAT" \
                --namespace=lalavisit

            echo -e "${GREEN}✓ ImagePullSecret 생성 완료${NC}"
        else
            echo "Public 저장소로 진행합니다."
        fi
    fi

        # deployment.yaml에 imagePullSecrets 추가 필요 알림
        echo -e "${YELLOW}주의: ../k8s/deployment.yaml에 다음 내용을 추가해야 합니다:${NC}"
        echo "  spec.template.spec.imagePullSecrets:"
        echo "  - name: ghcr-secret"
    else
        echo "Public 저장소로 진행합니다."
    fi
else
    echo -e "${GREEN}✓ ImagePullSecret이 이미 존재합니다.${NC}"
fi

echo ""
echo -e "${YELLOW}[Step 3] K8s 리소스 배포${NC}"

# Namespace
echo "Namespace 생성..."
kubectl apply -f ../k8s/namespace.yaml

# Deployment
echo "Deployment 생성..."
kubectl apply -f ../k8s/deployment.yaml

# Service
echo "Service 생성..."
kubectl apply -f ../k8s/service.yaml

# Ingress
echo "Ingress 생성..."
kubectl apply -f ../k8s/ingress.yaml

# Apex domain redirect
echo "Apex domain redirect 설정..."
kubectl apply -f ../k8s/ingress-apex-redirect.yaml

echo -e "${GREEN}✓ 모든 리소스 배포 완료${NC}"

echo ""
echo -e "${YELLOW}[Step 4] 배포 상태 확인${NC}"
echo ""

echo "Pods 상태:"
kubectl get pods -n lalavisit
echo ""

echo "Service 상태:"
kubectl get svc -n lalavisit
echo ""

echo "Ingress 상태:"
kubectl get ingress -n lalavisit
echo ""

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}배포가 완료되었습니다!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

echo "다음 명령어로 상태를 확인할 수 있습니다:"
echo ""
echo "  # Pod 로그 확인"
echo "  kubectl logs -f -n lalavisit -l app=lalavisit-web"
echo ""
echo "  # Pod 상세 정보"
echo "  kubectl describe pod -n lalavisit -l app=lalavisit-web"
echo ""
echo "  # 재배포"
echo "  kubectl rollout restart deployment/lalavisit-web -n lalavisit"
echo ""

# Ingress Controller 확인
if ! kubectl get ingressclass &> /dev/null; then
    echo -e "${YELLOW}⚠ Ingress Controller가 설치되어 있지 않은 것 같습니다.${NC}"
    echo "도메인 접속을 위해서는 Ingress Controller가 필요합니다."
    echo "scripts/setup-ingress.sh 스크립트를 실행하세요."
    echo ""
fi

# cert-manager 확인
if ! kubectl get namespace cert-manager &> /dev/null; then
    echo -e "${YELLOW}⚠ cert-manager가 설치되어 있지 않은 것 같습니다.${NC}"
    echo "SSL 인증서 자동 발급을 위해서는 cert-manager가 필요합니다."
    echo "scripts/setup-cert-manager.sh 스크립트를 실행하세요."
    echo ""
fi

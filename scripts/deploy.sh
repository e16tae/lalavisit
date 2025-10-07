#!/bin/bash
set -e

echo "========================================="
echo "라라재가방문요양센터 통합 배포 스크립트"
echo "========================================="
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "배포 방식을 선택하세요:"
echo ""
echo "  1) 수동 배포 (kubectl apply)"
echo "  2) ArgoCD 배포 (GitOps)"
echo "  3) 인프라 설정만 (Ingress + cert-manager)"
echo "  4) 전체 설정 (인프라 + 배포)"
echo ""
read -p "선택 (1-4): " -n 1 -r CHOICE
echo ""
echo ""

case $CHOICE in
    1)
        echo -e "${GREEN}수동 배포를 시작합니다...${NC}"
        echo ""

        # 인프라 확인
        if ! kubectl get ingressclass &> /dev/null 2>&1; then
            echo -e "${YELLOW}⚠ Ingress Controller가 설치되지 않았습니다.${NC}"
            read -p "Ingress Controller를 설치하시겠습니까? (Y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                bash "$SCRIPT_DIR/setup-ingress.sh"
            fi
        fi

        if ! kubectl get namespace cert-manager &> /dev/null 2>&1; then
            echo -e "${YELLOW}⚠ cert-manager가 설치되지 않았습니다.${NC}"
            read -p "cert-manager를 설치하시겠습니까? (Y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                bash "$SCRIPT_DIR/setup-cert-manager.sh"
            fi
        fi

        echo ""
        bash "$SCRIPT_DIR/deploy-manual.sh"
        ;;

    2)
        echo -e "${GREEN}ArgoCD 배포를 시작합니다...${NC}"
        echo ""

        # 인프라 확인
        if ! kubectl get ingressclass &> /dev/null 2>&1; then
            echo -e "${YELLOW}⚠ Ingress Controller가 설치되지 않았습니다.${NC}"
            read -p "Ingress Controller를 설치하시겠습니까? (Y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                bash "$SCRIPT_DIR/setup-ingress.sh"
            fi
        fi

        if ! kubectl get namespace cert-manager &> /dev/null 2>&1; then
            echo -e "${YELLOW}⚠ cert-manager가 설치되지 않았습니다.${NC}"
            read -p "cert-manager를 설치하시겠습니까? (Y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                bash "$SCRIPT_DIR/setup-cert-manager.sh"
            fi
        fi

        echo ""
        bash "$SCRIPT_DIR/deploy-argocd.sh"
        ;;

    3)
        echo -e "${GREEN}인프라 설정을 시작합니다...${NC}"
        echo ""

        echo -e "${YELLOW}[1/2] Nginx Ingress Controller 설치${NC}"
        bash "$SCRIPT_DIR/setup-ingress.sh"

        echo ""
        echo -e "${YELLOW}[2/2] cert-manager 설치${NC}"
        bash "$SCRIPT_DIR/setup-cert-manager.sh"

        echo ""
        echo -e "${GREEN}=========================================${NC}"
        echo -e "${GREEN}인프라 설정 완료!${NC}"
        echo -e "${GREEN}=========================================${NC}"
        echo ""
        echo "이제 배포를 진행할 수 있습니다:"
        echo "  ./scripts/deploy.sh"
        echo ""
        ;;

    4)
        echo -e "${GREEN}전체 설정을 시작합니다...${NC}"
        echo ""

        echo -e "${YELLOW}[1/4] Nginx Ingress Controller 설치${NC}"
        bash "$SCRIPT_DIR/setup-ingress.sh"

        echo ""
        echo -e "${YELLOW}[2/4] cert-manager 설치${NC}"
        bash "$SCRIPT_DIR/setup-cert-manager.sh"

        echo ""
        echo "배포 방식을 선택하세요:"
        echo "  1) 수동 배포"
        echo "  2) ArgoCD 배포"
        read -p "선택 (1-2): " -n 1 -r DEPLOY_CHOICE
        echo ""

        if [ "$DEPLOY_CHOICE" = "1" ]; then
            echo ""
            echo -e "${YELLOW}[3/4] 수동 배포${NC}"
            bash "$SCRIPT_DIR/deploy-manual.sh"
        elif [ "$DEPLOY_CHOICE" = "2" ]; then
            echo ""
            echo -e "${YELLOW}[3/4] ArgoCD 배포${NC}"
            bash "$SCRIPT_DIR/deploy-argocd.sh"
        else
            echo -e "${RED}잘못된 선택입니다.${NC}"
            exit 1
        fi

        echo ""
        echo -e "${GREEN}=========================================${NC}"
        echo -e "${GREEN}전체 설정 및 배포 완료!${NC}"
        echo -e "${GREEN}=========================================${NC}"
        echo ""
        ;;

    *)
        echo -e "${RED}잘못된 선택입니다.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}유용한 명령어:${NC}"
echo ""
echo "  # Pod 상태 확인"
echo "  kubectl get pods -n lalavisit"
echo ""
echo "  # 로그 확인"
echo "  kubectl logs -f -n lalavisit -l app=lalavisit-web"
echo ""
echo "  # Ingress 확인"
echo "  kubectl get ingress -n lalavisit"
echo ""
echo "  # 인증서 확인"
echo "  kubectl get certificate -n lalavisit"
echo ""
echo "  # 재배포"
echo "  kubectl rollout restart deployment/lalavisit-web -n lalavisit"
echo ""

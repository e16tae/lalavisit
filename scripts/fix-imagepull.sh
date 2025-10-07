#!/bin/bash
set -e

echo "========================================="
echo "ImagePullBackOff 문제 해결"
echo "========================================="
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "GHCR 이미지를 pull하기 위한 해결 방법을 선택하세요:"
echo ""
echo "  1) GHCR 저장소를 Public으로 변경 (권장, 가장 간단)"
echo "  2) ImagePullSecret 생성 (Private 유지)"
echo "  3) 현재 상태 확인만"
echo ""
read -p "선택 (1-3): " -n 1 -r CHOICE
echo ""
echo ""

case $CHOICE in
    1)
        echo -e "${YELLOW}GHCR 저장소를 Public으로 변경하세요:${NC}"
        echo ""
        echo "1. 브라우저에서 다음 URL 접속:"
        echo "   https://github.com/e16tae/lalavisit/pkgs/container/lalavisit/settings"
        echo ""
        echo "2. Package settings 페이지에서:"
        echo "   - 'Change visibility' 버튼 클릭"
        echo "   - 'Public' 선택"
        echo "   - 'I understand...' 체크"
        echo "   - 저장소 이름 입력하여 확인"
        echo ""
        echo "3. Public으로 변경 후, 배포 재시작:"
        echo "   kubectl rollout restart deployment/lalavisit-web -n lalavisit"
        echo ""
        echo -e "${GREEN}이 방법이 가장 간단하고 권장됩니다!${NC}"
        ;;

    2)
        echo -e "${YELLOW}ImagePullSecret을 생성합니다...${NC}"
        echo ""

        # GitHub PAT 확인
        if [ -z "$GITHUB_PAT" ]; then
            echo "GitHub Personal Access Token이 필요합니다."
            echo ""
            echo "1. GitHub에서 PAT 생성:"
            echo "   https://github.com/settings/tokens"
            echo "   - 'Generate new token (classic)'"
            echo "   - Scopes: 'read:packages' 선택"
            echo "   - 생성된 토큰 복사"
            echo ""
            read -sp "GitHub Personal Access Token: " GITHUB_PAT
            echo ""
            echo ""
        else
            echo -e "${GREEN}✓ GITHUB_PAT 환경변수 발견${NC}"
        fi

        if [ -z "$GITHUB_USER" ]; then
            read -p "GitHub Username [e16tae]: " GITHUB_USER
            GITHUB_USER=${GITHUB_USER:-e16tae}
        else
            echo -e "${GREEN}✓ GITHUB_USER 환경변수 발견: $GITHUB_USER${NC}"
        fi

        echo ""
        echo "ImagePullSecret을 생성합니다..."

        # Secret 생성
        if kubectl get secret ghcr-secret -n lalavisit &> /dev/null; then
            echo -e "${YELLOW}기존 ghcr-secret을 삭제하고 재생성합니다...${NC}"
            kubectl delete secret ghcr-secret -n lalavisit
        fi

        kubectl create secret docker-registry ghcr-secret \
            --docker-server=ghcr.io \
            --docker-username="$GITHUB_USER" \
            --docker-password="$GITHUB_PAT" \
            --namespace=lalavisit

        echo -e "${GREEN}✓ ImagePullSecret 생성 완료${NC}"
        echo ""

        # Deployment 확인 및 업데이트
        HAS_SECRET=$(kubectl get deployment lalavisit-web -n lalavisit -o jsonpath='{.spec.template.spec.imagePullSecrets[0].name}' 2>/dev/null || echo "")

        if [ -z "$HAS_SECRET" ]; then
            echo "Deployment에 imagePullSecrets를 추가합니다..."
            kubectl patch deployment lalavisit-web -n lalavisit -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name":"ghcr-secret"}]}}}}'
            echo -e "${GREEN}✓ Deployment 업데이트 완료${NC}"
        else
            echo -e "${GREEN}✓ Deployment에 이미 imagePullSecrets 설정됨${NC}"
            echo "배포를 재시작합니다..."
            kubectl rollout restart deployment/lalavisit-web -n lalavisit
        fi

        echo ""
        echo -e "${GREEN}ImagePullSecret 설정 완료!${NC}"
        ;;

    3)
        echo -e "${YELLOW}현재 상태 확인 중...${NC}"
        echo ""
        ;;

    *)
        echo -e "${RED}잘못된 선택입니다.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${YELLOW}현재 상태:${NC}"
echo ""

# Pod 상태
echo "Pods:"
kubectl get pods -n lalavisit -l app=lalavisit-web
echo ""

# Secret 확인
echo "ImagePullSecret:"
if kubectl get secret ghcr-secret -n lalavisit &> /dev/null; then
    echo -e "${GREEN}✓ ghcr-secret 존재함${NC}"
else
    echo -e "${RED}✗ ghcr-secret 없음${NC}"
fi
echo ""

# Deployment ImagePullSecrets 확인
echo "Deployment imagePullSecrets:"
HAS_SECRET=$(kubectl get deployment lalavisit-web -n lalavisit -o jsonpath='{.spec.template.spec.imagePullSecrets[0].name}' 2>/dev/null || echo "")
if [ -n "$HAS_SECRET" ]; then
    echo -e "${GREEN}✓ 설정됨: $HAS_SECRET${NC}"
else
    echo -e "${RED}✗ 설정 안됨${NC}"
fi
echo ""

echo -e "${BLUE}Pod 로그 확인:${NC}"
echo "kubectl logs -n lalavisit -l app=lalavisit-web"
echo ""
echo -e "${BLUE}Pod 상세 정보:${NC}"
POD_NAME=$(kubectl get pods -n lalavisit -l app=lalavisit-web --sort-by=.metadata.creationTimestamp -o jsonpath='{.items[-1:].metadata.name}')
if [ -n "$POD_NAME" ]; then
    echo "kubectl describe pod $POD_NAME -n lalavisit"
fi
echo ""

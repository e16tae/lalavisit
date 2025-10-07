#!/bin/bash
set -e

echo "========================================="
echo "라라재가방문요양센터 배포 디버깅"
echo "========================================="
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}[1] Pod 상세 정보 확인${NC}"
echo ""
kubectl get pods -n lalavisit
echo ""

# 가장 최근 Pod 이름 가져오기
POD_NAME=$(kubectl get pods -n lalavisit -l app=lalavisit-web --sort-by=.metadata.creationTimestamp -o jsonpath='{.items[-1:].metadata.name}')

if [ -n "$POD_NAME" ]; then
    echo -e "${YELLOW}최근 Pod: $POD_NAME${NC}"
    echo ""
    echo "Pod Events:"
    kubectl describe pod "$POD_NAME" -n lalavisit | grep -A 20 "Events:"
    echo ""
else
    echo -e "${RED}Pod을 찾을 수 없습니다.${NC}"
fi

echo ""
echo -e "${YELLOW}[2] Deployment 정보${NC}"
echo ""
kubectl get deployment lalavisit-web -n lalavisit -o wide
echo ""

echo "Deployment Image:"
kubectl get deployment lalavisit-web -n lalavisit -o jsonpath='{.spec.template.spec.containers[0].image}'
echo ""
echo ""

echo -e "${YELLOW}[3] ImagePullSecret 확인${NC}"
echo ""
if kubectl get secret ghcr-secret -n lalavisit &> /dev/null; then
    echo -e "${GREEN}✓ ImagePullSecret (ghcr-secret) 존재함${NC}"
    kubectl get secret ghcr-secret -n lalavisit
else
    echo -e "${RED}✗ ImagePullSecret (ghcr-secret) 없음${NC}"
    echo ""
    echo -e "${YELLOW}해결방법 1: ImagePullSecret 생성${NC}"
    echo "kubectl create secret docker-registry ghcr-secret \\"
    echo "  --docker-server=ghcr.io \\"
    echo "  --docker-username=e16tae \\"
    echo "  --docker-password=YOUR_GITHUB_PAT \\"
    echo "  --namespace=lalavisit"
    echo ""
    echo -e "${YELLOW}해결방법 2: GHCR 저장소를 public으로 변경${NC}"
    echo "https://github.com/e16tae/lalavisit/pkgs/container/lalavisit/settings"
fi

echo ""
echo -e "${YELLOW}[4] Deployment에 ImagePullSecret 설정 확인${NC}"
echo ""
HAS_IMAGE_PULL_SECRET=$(kubectl get deployment lalavisit-web -n lalavisit -o jsonpath='{.spec.template.spec.imagePullSecrets[0].name}' 2>/dev/null || echo "")

if [ -n "$HAS_IMAGE_PULL_SECRET" ]; then
    echo -e "${GREEN}✓ Deployment에 imagePullSecrets 설정됨: $HAS_IMAGE_PULL_SECRET${NC}"
else
    echo -e "${RED}✗ Deployment에 imagePullSecrets 설정 안됨${NC}"
    echo ""
    echo -e "${YELLOW}해결방법: Deployment에 imagePullSecrets 추가${NC}"
    echo "kubectl patch deployment lalavisit-web -n lalavisit -p '{\"spec\":{\"template\":{\"spec\":{\"imagePullSecrets\":[{\"name\":\"ghcr-secret\"}]}}}}'"
fi

echo ""
echo -e "${YELLOW}[5] GitHub Actions 이미지 확인${NC}"
echo ""
IMAGE_TAG=$(kubectl get deployment lalavisit-web -n lalavisit -o jsonpath='{.spec.template.spec.containers[0].image}')
echo "현재 이미지: $IMAGE_TAG"
echo ""
echo "GHCR에 이미지가 존재하는지 확인:"
echo "https://github.com/e16tae/lalavisit/pkgs/container/lalavisit"
echo ""

echo ""
echo -e "${YELLOW}[6] Ingress 및 Certificate 상태${NC}"
echo ""
kubectl get ingress -n lalavisit
echo ""
kubectl get certificate -n lalavisit
echo ""

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}디버깅 정보 수집 완료${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

echo -e "${BLUE}일반적인 해결 방법:${NC}"
echo ""
echo "1. GHCR 저장소를 public으로 변경 (권장):"
echo "   - https://github.com/e16tae/lalavisit/pkgs/container/lalavisit/settings"
echo "   - Change visibility → Public"
echo ""
echo "2. ImagePullSecret 생성 및 적용:"
echo "   export GITHUB_PAT=ghp_your_token"
echo "   kubectl create secret docker-registry ghcr-secret \\"
echo "     --docker-server=ghcr.io \\"
echo "     --docker-username=e16tae \\"
echo "     --docker-password=\$GITHUB_PAT \\"
echo "     --namespace=lalavisit"
echo ""
echo "   kubectl patch deployment lalavisit-web -n lalavisit \\"
echo "     -p '{\"spec\":{\"template\":{\"spec\":{\"imagePullSecrets\":[{\"name\":\"ghcr-secret\"}]}}}}'"
echo ""
echo "3. 배포 재시작:"
echo "   kubectl rollout restart deployment/lalavisit-web -n lalavisit"
echo ""

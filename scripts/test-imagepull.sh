#!/bin/bash
set -e

echo "========================================="
echo "ImagePullSecret 검증 테스트"
echo "========================================="
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}[1] Secret 존재 확인${NC}"
if kubectl get secret ghcr-secret -n lalavisit &> /dev/null; then
    echo -e "${GREEN}✓ ghcr-secret 존재함${NC}"
else
    echo -e "${RED}✗ ghcr-secret 없음${NC}"
    exit 1
fi
echo ""

echo -e "${YELLOW}[2] Secret 내용 확인${NC}"
echo "Secret .dockerconfigjson 내용:"
kubectl get secret ghcr-secret -n lalavisit -o jsonpath='{.data.\.dockerconfigjson}' | base64 -d | jq '.' 2>/dev/null || echo "jq가 설치되어 있지 않음"
echo ""

echo -e "${YELLOW}[3] Secret 타입 확인${NC}"
SECRET_TYPE=$(kubectl get secret ghcr-secret -n lalavisit -o jsonpath='{.type}')
if [ "$SECRET_TYPE" = "kubernetes.io/dockerconfigjson" ]; then
    echo -e "${GREEN}✓ Secret 타입 올바름: $SECRET_TYPE${NC}"
else
    echo -e "${RED}✗ Secret 타입 잘못됨: $SECRET_TYPE${NC}"
    echo "  예상: kubernetes.io/dockerconfigjson"
fi
echo ""

echo -e "${YELLOW}[4] Deployment imagePullSecrets 설정 확인${NC}"
PULL_SECRET=$(kubectl get deployment lalavisit-web -n lalavisit -o jsonpath='{.spec.template.spec.imagePullSecrets[0].name}' 2>/dev/null || echo "")
if [ "$PULL_SECRET" = "ghcr-secret" ]; then
    echo -e "${GREEN}✓ Deployment에 imagePullSecrets 설정됨${NC}"
else
    echo -e "${RED}✗ Deployment에 imagePullSecrets 설정 안됨${NC}"
fi
echo ""

echo -e "${YELLOW}[5] 테스트 Pod 생성${NC}"
echo "테스트 Pod을 생성하여 실제 이미지 pull을 시도합니다..."

# 현재 이미지 태그 가져오기
CURRENT_IMAGE=$(kubectl get deployment lalavisit-web -n lalavisit -o jsonpath='{.spec.template.spec.containers[0].image}')
echo "테스트할 이미지: $CURRENT_IMAGE"
echo ""

# 테스트 Pod YAML 생성
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: imagepull-test
  namespace: lalavisit
spec:
  imagePullSecrets:
  - name: ghcr-secret
  containers:
  - name: test
    image: $CURRENT_IMAGE
    command: ["sh", "-c", "echo 'Image pull successful!' && sleep 10"]
  restartPolicy: Never
EOF

echo "테스트 Pod 생성됨. 상태 확인 중..."
echo ""

# Pod 상태 확인 (최대 60초 대기)
for i in {1..60}; do
    POD_STATUS=$(kubectl get pod imagepull-test -n lalavisit -o jsonpath='{.status.phase}' 2>/dev/null || echo "")
    POD_REASON=$(kubectl get pod imagepull-test -n lalavisit -o jsonpath='{.status.containerStatuses[0].state.waiting.reason}' 2>/dev/null || echo "")

    if [ "$POD_STATUS" = "Running" ] || [ "$POD_STATUS" = "Succeeded" ]; then
        echo -e "${GREEN}✓ 테스트 성공: 이미지 pull 성공!${NC}"
        echo ""
        kubectl logs imagepull-test -n lalavisit 2>/dev/null || true
        break
    elif [ "$POD_REASON" = "ImagePullBackOff" ] || [ "$POD_REASON" = "ErrImagePull" ]; then
        echo -e "${RED}✗ 테스트 실패: 이미지 pull 실패${NC}"
        echo ""
        echo "Pod Events:"
        kubectl describe pod imagepull-test -n lalavisit | grep -A 10 "Events:"
        break
    fi

    echo -n "."
    sleep 1
done
echo ""

# 테스트 Pod 삭제
echo "테스트 Pod 삭제..."
kubectl delete pod imagepull-test -n lalavisit --ignore-not-found=true
echo ""

echo -e "${YELLOW}[6] 실제 Pods 상태 확인${NC}"
kubectl get pods -n lalavisit -l app=lalavisit-web
echo ""

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}검증 완료${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

echo -e "${BLUE}추가 디버깅 명령어:${NC}"
echo ""
echo "# Secret 상세 정보"
echo "kubectl describe secret ghcr-secret -n lalavisit"
echo ""
echo "# Deployment 상세 정보"
echo "kubectl describe deployment lalavisit-web -n lalavisit"
echo ""
echo "# Pod Events 확인"
echo "kubectl describe pod -n lalavisit -l app=lalavisit-web"
echo ""

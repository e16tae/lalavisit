#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: ./scripts/seal-secrets.sh [options]

Options:
  --env-file <path>        환경 변수 파일 (.env.production 등)
  --namespace <ns>         Secret을 생성할 네임스페이스 (기본: lalavisit)
  --name <name>            Secret 이름 (기본: lalavisit-secrets)
  --out <path>             출력 파일 경로
  --controller-namespace   Sealed Secrets 컨트롤러 네임스페이스 (필요 시)
  --controller-name        Sealed Secrets 컨트롤러 이름 (필요 시)

예시:
  ./scripts/seal-secrets.sh \
    --env-file .env.production \
    --namespace lalavisit \
    --name lalavisit-secrets \
    --out k8s/sealed-secrets/lalavisit-secrets.sealedsecret.yaml

사전 준비:
  - kubectl이 올바른 컨텍스트로 설정되어 있어야 합니다.
  - 클러스터에 sealed-secrets 컨트롤러가 설치되어 있어야 합니다.
  - 로컬에 kubeseal CLI가 설치되어 있어야 합니다.
USAGE
}

ENV_FILE=""
NAMESPACE="lalavisit"
SECRET_NAME="lalavisit-secrets"
OUTPUT=""
CONTROLLER_NAMESPACE=""
CONTROLLER_NAME=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --env-file)
      ENV_FILE="$2"; shift 2;;
    --namespace)
      NAMESPACE="$2"; shift 2;;
    --name)
      SECRET_NAME="$2"; shift 2;;
    --out)
      OUTPUT="$2"; shift 2;;
    --controller-namespace)
      CONTROLLER_NAMESPACE="$2"; shift 2;;
    --controller-name)
      CONTROLLER_NAME="$2"; shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      echo "Unknown option: $1" >&2
      usage; exit 1;;
  esac
done

if [[ -z "$ENV_FILE" ]]; then
  echo "--env-file 옵션을 지정하세요." >&2
  usage; exit 1
fi

if [[ -z "$OUTPUT" ]]; then
  OUTPUT="k8s/sealed-secrets/${SECRET_NAME}.sealedsecret.yaml"
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "환경 변수 파일을 찾을 수 없습니다: $ENV_FILE" >&2
  exit 1
fi

if ! command -v kubectl >/dev/null 2>&1; then
  echo "kubectl 명령을 찾을 수 없습니다." >&2
  exit 1
fi

if ! command -v kubeseal >/dev/null 2>&1; then
  echo "kubeseal 명령을 찾을 수 없습니다. Sealed Secrets CLI를 설치하세요." >&2
  exit 1
fi

TMP_SECRET=$(mktemp)
trap 'rm -f "$TMP_SECRET"' EXIT

kubectl create secret generic "$SECRET_NAME" \
  --namespace "$NAMESPACE" \
  --from-env-file="$ENV_FILE" \
  --dry-run=client -o yaml > "$TMP_SECRET"

SEALED_ARGS=(--format yaml)
if [[ -n "$CONTROLLER_NAMESPACE" ]]; then
  SEALED_ARGS+=(--controller-namespace "$CONTROLLER_NAMESPACE")
fi
if [[ -n "$CONTROLLER_NAME" ]]; then
  SEALED_ARGS+=(--controller-name "$CONTROLLER_NAME")
fi

mkdir -p "$(dirname "$OUTPUT")"

kubeseal "${SEALED_ARGS[@]}" < "$TMP_SECRET" > "$OUTPUT"

cat <<EOFMSG
SealedSecret 생성 완료 ✅
  입력 파일 : $ENV_FILE
  출력 파일 : $OUTPUT

생성된 파일을 검토한 뒤 Git에 커밋하여 배포 파이프라인에 포함하세요.
EOFMSG

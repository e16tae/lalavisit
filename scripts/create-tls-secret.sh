#!/bin/bash

# TLS Secret 생성 스크립트
# Usage: ./scripts/create-tls-secret.sh <cert-file> <key-file>

set -e

echo "🔒 Creating TLS Secret for Lalavisit..."
echo ""

# Check arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 <cert-file> <key-file>"
    echo "Example: $0 /path/to/tls.crt /path/to/tls.key"
    exit 1
fi

CERT_FILE=$1
KEY_FILE=$2

# Validate files
if [ ! -f "$CERT_FILE" ]; then
    echo "❌ Certificate file not found: $CERT_FILE"
    exit 1
fi

if [ ! -f "$KEY_FILE" ]; then
    echo "❌ Key file not found: $KEY_FILE"
    exit 1
fi

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

echo "📋 Files:"
echo "  Certificate: $CERT_FILE"
echo "  Key: $KEY_FILE"
echo ""
read -p "Create TLS secret with these files? (y/N): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Cancelled."
    exit 0
fi

# Create namespace if not exists
echo ""
echo "🔨 Creating namespace 'lalavisit' (if not exists)..."
kubectl create namespace lalavisit --dry-run=client -o yaml | kubectl apply -f -

# Delete existing secret if exists
echo "🗑️  Deleting existing TLS secret (if exists)..."
kubectl delete secret lalavisit-tls -n lalavisit --ignore-not-found=true

# Create new TLS secret
echo "✨ Creating new TLS secret..."
kubectl create secret tls lalavisit-tls \
  --cert="$CERT_FILE" \
  --key="$KEY_FILE" \
  --namespace=lalavisit

echo ""
echo "✅ TLS secret 'lalavisit-tls' created successfully in namespace 'lalavisit'!"
echo ""
echo "🔍 Verify the secret:"
echo "  kubectl get secret lalavisit-tls -n lalavisit"
echo "  kubectl describe secret lalavisit-tls -n lalavisit"

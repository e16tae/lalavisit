#!/bin/bash

# Create ImagePullSecret for GitHub Container Registry (GHCR)
# This allows K8s to pull images from private GHCR repositories

set -e

echo "============================================"
echo "Create GHCR ImagePullSecret for K8s"
echo "============================================"
echo ""

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
  echo "❌ kubectl not found. Please install kubectl first."
  exit 1
fi

# Get GitHub credentials
read -p "GitHub Username (e.g., e16tae): " GITHUB_USERNAME
read -sp "GitHub Personal Access Token (with read:packages scope): " GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_USERNAME" ] || [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ Username or token cannot be empty"
  exit 1
fi

# Create namespace if not exists
kubectl create namespace lalavisit --dry-run=client -o yaml | kubectl apply -f -

# Create imagePullSecret
echo ""
echo "Creating imagePullSecret..."
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username="$GITHUB_USERNAME" \
  --docker-password="$GITHUB_TOKEN" \
  --docker-email="$GITHUB_USERNAME@users.noreply.github.com" \
  --namespace=lalavisit \
  --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo "✅ ImagePullSecret created successfully!"
echo ""
echo "Next steps:"
echo "1. Update k8s/base/deployment.yaml to add:"
echo "   spec:"
echo "     template:"
echo "       spec:"
echo "         imagePullSecrets:"
echo "           - name: ghcr-secret"
echo ""
echo "2. Commit and push the changes"
echo ""

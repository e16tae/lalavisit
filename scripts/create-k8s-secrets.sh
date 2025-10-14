#!/bin/bash

# K8s Secret 생성 스크립트
# Usage: ./scripts/create-k8s-secrets.sh

set -e

echo "🔐 Creating Kubernetes Secrets for Lalavisit..."
echo ""

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Prompt for values
echo "Enter the following values:"
read -p "Email User (e.g., lalavisit@naver.com): " EMAIL_USER
read -s -p "Email Password: " EMAIL_PASSWORD
echo ""
read -p "Contact Email (e.g., lalavisit@naver.com): " CONTACT_EMAIL
echo ""

# Confirm values
echo ""
echo "📋 Summary:"
echo "  Email User: $EMAIL_USER"
echo "  Email Password: ********"
echo "  Contact Email: $CONTACT_EMAIL"
echo ""
read -p "Create secrets with these values? (y/N): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Cancelled."
    exit 0
fi

# Create namespace if not exists
echo ""
echo "🔨 Creating namespace 'lalavisit' (if not exists)..."
kubectl create namespace lalavisit --dry-run=client -o yaml | kubectl apply -f -

# Delete existing secret if exists
echo "🗑️  Deleting existing secret (if exists)..."
kubectl delete secret lalavisit-secrets -n lalavisit --ignore-not-found=true

# Create new secret
echo "✨ Creating new secret..."
kubectl create secret generic lalavisit-secrets \
  --from-literal=email-user="$EMAIL_USER" \
  --from-literal=email-password="$EMAIL_PASSWORD" \
  --from-literal=contact-email="$CONTACT_EMAIL" \
  --namespace=lalavisit

echo ""
echo "✅ Secret 'lalavisit-secrets' created successfully in namespace 'lalavisit'!"
echo ""
echo "🔍 Verify the secret:"
echo "  kubectl get secret lalavisit-secrets -n lalavisit"
echo "  kubectl describe secret lalavisit-secrets -n lalavisit"

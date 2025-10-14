#!/bin/bash

# Git History Reset Script
# This script will completely reset git history and start fresh with main branch
# WARNING: This is a DESTRUCTIVE operation. Make sure you have backups!

set -e  # Exit on any error

PROJECT_NAME="lalavisit"
CURRENT_DIR=$(pwd)

echo "========================================"
echo "Git History Reset Script"
echo "Project: $PROJECT_NAME"
echo "========================================"
echo ""
echo "⚠️  WARNING: This script will:"
echo "   1. Delete ALL git history"
echo "   2. Create a fresh repository with only main branch"
echo "   3. Remove all commit history permanently"
echo ""
echo "This is a DESTRUCTIVE operation and CANNOT be undone!"
echo ""

# Ask for confirmation
read -p "Are you absolutely sure you want to proceed? (type 'YES' to confirm): " confirmation

if [ "$confirmation" != "YES" ]; then
    echo "❌ Operation cancelled."
    exit 1
fi

echo ""
echo "📋 Step 1: Creating backup..."

# Create backup directory
BACKUP_DIR="../${PROJECT_NAME}-backup-$(date +%Y%m%d-%H%M%S)"
echo "   Creating backup at: $BACKUP_DIR"
cp -r . "$BACKUP_DIR"
echo "✅ Backup created successfully"

echo ""
echo "📋 Step 2: Checking for uncommitted changes..."

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

echo "✅ Working directory is clean"

echo ""
echo "📋 Step 3: Removing git history..."

# Remove .git directory
rm -rf .git

echo "✅ Git history removed"

echo ""
echo "📋 Step 4: Initializing new git repository..."

# Initialize new git repository
git init

echo "✅ New git repository initialized"

echo ""
echo "📋 Step 5: Configuring git..."

# Set default branch to main
git checkout -b main

# Configure git user (if not already configured globally)
if ! git config user.name > /dev/null 2>&1; then
    echo "⚠️  Git user.name not configured. Please run:"
    echo "   git config --global user.name 'Your Name'"
    echo "   git config --global user.email 'your.email@example.com'"
    exit 1
fi

echo "✅ Git configured"

echo ""
echo "📋 Step 6: Creating initial commit..."

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit

Korean Home Care Center Website Template

This is a template for creating a home care center website.
All business-specific information has been removed and replaced with placeholders.

See docs/environment.md for configuration instructions.

Features:
- Korean language optimized (Pretendard font)
- Next.js 15 with App Router
- Tailwind CSS 4
- Contact form with Naver SMTP
- SEO optimized with Schema.org
- Responsive design
- Naver Maps integration
- KakaoTalk integration

Tech Stack:
- Frontend: Next.js 15 + TypeScript
- Styling: Tailwind CSS 4
- Email: Nodemailer (Naver SMTP)
- Deployment: Vercel or Kubernetes"

echo "✅ Initial commit created"

echo ""
echo "📋 Step 7: Creating develop branch..."

# Create develop branch
git checkout -b develop

# Switch back to main
git checkout main

echo "✅ develop branch created"

echo ""
echo "========================================"
echo "✅ Git history reset complete!"
echo "========================================"
echo ""
echo "📊 Repository status:"
git log --oneline --graph --all --decorate
echo ""
echo "🌿 Current branches:"
git branch -a
echo ""
echo "📦 Backup location: $BACKUP_DIR"
echo ""
echo "🚀 Next steps:"
echo "   1. Review the changes: git log"
echo "   2. Update remote repository (if exists):"
echo "      git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   3. Force push to remote (⚠️  DESTRUCTIVE):"
echo "      git push -f origin main"
echo "      git push -f origin develop"
echo "   4. Set default branch to main in GitHub settings"
echo ""
echo "⚠️  Remember to update GitHub repository settings:"
echo "   - Set 'main' as default branch"
echo "   - Delete old branches if any exist"
echo "   - Update branch protection rules"
echo ""

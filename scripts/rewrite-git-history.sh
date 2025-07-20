#!/bin/bash

echo "⚠️  WARNING: This will rewrite your Git history!"
echo "📝 This changes the author on ALL previous commits."
echo "🚨 Only run this if you understand the implications."
echo ""

read -p "Are you sure you want to rewrite Git history? (type 'YES' to confirm): " confirm

if [ "$confirm" != "YES" ]; then
    echo "❌ Aborted. No changes made."
    exit 1
fi

echo "🔄 Rewriting Git history to update author information..."

# Your old email/name patterns (update these to match your actual info)
OLD_EMAIL="brianbonk@Brian-Bonks-MacBook-Pro.local"
OLD_NAME="Brian Bonk"

# New identity
NEW_NAME="setliststreet"
NEW_EMAIL="setliststreet@proton.me"

# Rewrite history
git filter-branch --env-filter "
    if [ \$GIT_COMMITTER_EMAIL = '$OLD_EMAIL' ]
    then
        export GIT_COMMITTER_NAME='$NEW_NAME'
        export GIT_COMMITTER_EMAIL='$NEW_EMAIL'
    fi
    if [ \$GIT_AUTHOR_EMAIL = '$OLD_EMAIL' ]
    then
        export GIT_AUTHOR_NAME='$NEW_NAME'
        export GIT_AUTHOR_EMAIL='$NEW_EMAIL'
    fi
" --tag-name-filter cat -- --branches --tags

echo ""
echo "✅ Git history rewritten successfully!"
echo "🔄 You'll need to force push to update the remote repository:"
echo "   git push --force-with-lease origin main"
echo ""
echo "⚠️  WARNING: This will overwrite the remote history!"
echo "📝 Make sure no one else is working on the repository when you do this." 
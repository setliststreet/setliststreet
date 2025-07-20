#!/bin/bash

echo "🔧 Setting up anonymous Git identity for Setlist Street project..."

# Set local git config for this repository only
git config user.name "setliststreet"
git config user.email "setliststreet@proton.me"

echo "✅ Git identity updated for this repository:"
echo "   Name: $(git config user.name)"
echo "   Email: $(git config user.email)"

echo ""
echo "🔒 Your personal information is now hidden from future commits!"
echo "📝 Note: Previous commits will still show your old identity."
echo "💡 If you want to update previous commits, run: ./scripts/rewrite-git-history.sh" 
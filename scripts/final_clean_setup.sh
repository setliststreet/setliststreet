#!/bin/bash
echo "=============================================="
echo "FINAL CLEAN REPOSITORY SETUP"
echo "=============================================="

cd "/Users/brianbonk/Downloads/Setlist Street GitHub"

echo "Step 1: Creating final backup..."
cp -r . "../Setlist Street GitHub FINAL BACKUP" 2>/dev/null || echo "Backup attempted"

echo "Step 2: Removing ALL git history..."
rm -rf .git

echo "Step 3: Removing PowerPoint file specifically..."
rm -f "pagetextdescriptions/Setlist Street template.pptx"

echo "Step 4: Creating optimized .gitignore..."
cat > .gitignore << 'GITIGNORE_EOF'
# Build outputs and dependencies
node_modules/
.next/
out/
dist/
build/
.turbo/
package-lock.json

# Environment files
.env*

# Logs and cache
*.log
.cache/
.DS_Store

# Large files - PowerPoint presentations
*.pptx
*.ppt

# Other generated files
*.tsbuildinfo
next-env.d.ts

# IDE files
.vscode/settings.json
.idea/
GITIGNORE_EOF

echo "Step 5: Initializing fresh git..."
git init

echo "Step 6: Adding files (excluding PowerPoint)..."
git add .

echo "Step 7: Checking what will be committed..."
echo "Files to commit: $(git ls-files | wc -l)"
echo "Repository will NOT include:"
echo "- PowerPoint presentations"
echo "- node_modules"  
echo "- Build outputs"
echo ""
echo "Repository WILL include:"
echo "- All source code (.tsx, .ts, .js files)"
echo "- Visual design assets (PNG, SVG files)"
echo "- Configuration files"
echo "- Documentation"

echo "Step 8: Creating commit..."
git commit -m "Initial commit: Setlist Street project

Source code and visual assets included.
Large PowerPoint files excluded to meet GitHub size limits.
Ready for development and collaboration."

echo "Step 9: Setting up GitHub remote..."
git remote add origin https://github.com/setliststreet/setliststreet.git
git branch -M main

echo "Step 10: Pushing to GitHub..."
git push -u origin main --force

echo ""
echo "[SUCCESS] Clean repository uploaded!"
echo "[WEB] Visit: https://github.com/setliststreet/setliststreet"
echo ""
echo "Final size check:"
du -sh .git

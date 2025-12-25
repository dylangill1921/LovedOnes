# Quick GitHub Pages Deployment

## 🚀 Quick Start

### 1. Install gh-pages
```bash
cd family-website
npm install --save-dev gh-pages
```

### 2. Update package.json Homepage
Open `package.json` and replace `YOUR_USERNAME` with your GitHub username:
```json
"homepage": "https://YOUR_USERNAME.github.io/LovedOnes"
```

**Example:** If your GitHub username is `dylangill1921`, it should be:
```json
"homepage": "https://dylangill1921.github.io/LovedOnes"
```

### 3. Initialize Git (if needed)
```bash
git init
git add .
git commit -m "Initial commit - Family website"
```

### 4. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `LovedOnes`
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** check any boxes (no README, .gitignore, or license)
5. Click "Create repository"

### 5. Connect and Push
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/LovedOnes.git
git branch -M main
git push -u origin main
```

### 6. Deploy to GitHub Pages
```bash
npm run deploy
```

### 7. Enable GitHub Pages
1. Go to your repository: `https://github.com/YOUR_USERNAME/LovedOnes`
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **gh-pages** branch
4. Click **Save**

## ✅ Done!

Your site will be live at:
**https://YOUR_USERNAME.github.io/LovedOnes**

(Replace `YOUR_USERNAME` with your actual GitHub username)

## 🔄 Updating Your Site

Whenever you make changes:
```bash
git add .
git commit -m "Your update message"
git push origin main
npm run deploy
```

## 📝 Notes

- The first deployment may take a few minutes
- After deploying, wait 1-2 minutes for GitHub Pages to update
- The 404.html file handles React Router routing automatically
- All routes should work correctly!


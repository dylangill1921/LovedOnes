# GitHub Pages Deployment Guide

## Step 1: Install gh-pages package

```bash
cd family-website
npm install --save-dev gh-pages
```

## Step 2: Update package.json

The `package.json` has been updated with:
- `homepage` field (you need to replace `YOUR_USERNAME` with your GitHub username)
- `predeploy` and `deploy` scripts

**Important:** Update the `homepage` field in `package.json`:
- Replace `YOUR_USERNAME` with your actual GitHub username
- Example: `"homepage": "https://dylangill1921.github.io/LovedOnes"`

## Step 3: Initialize Git (if not already done)

```bash
cd family-website
git init
git add .
git commit -m "Initial commit - Family website React app"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `LovedOnes` (or your preferred name)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 5: Connect and Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/LovedOnes.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

## Step 6: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build your React app
2. Deploy it to the `gh-pages` branch
3. Make it available at: `https://YOUR_USERNAME.github.io/LovedOnes`

## Step 7: Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **gh-pages branch**
4. Click **Save**

## Step 8: Update Homepage URL (Important!)

After your first deployment, update the `homepage` in `package.json` with your actual GitHub Pages URL, then run `npm run deploy` again.

## Future Updates

Whenever you make changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
npm run deploy
```

## Troubleshooting

### If routes don't work:
React Router uses BrowserRouter which requires server configuration. GitHub Pages serves static files, so you may need to:
- Use HashRouter instead (routes will have # in URL)
- Or configure a 404.html redirect (more complex)

### If assets don't load:
Make sure the `homepage` field in `package.json` matches your GitHub Pages URL exactly.

## Your Site URL

Once deployed, your site will be available at:
`https://YOUR_USERNAME.github.io/LovedOnes`

Replace `YOUR_USERNAME` with your GitHub username!


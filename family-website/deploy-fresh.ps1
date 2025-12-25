# Fresh Deployment Script for GitHub Pages
# This ensures you're deploying the latest code

Write-Host "🚀 Starting Fresh Deployment..." -ForegroundColor Green

# Step 1: Remove old build
Write-Host "`n📦 Cleaning old build..." -ForegroundColor Cyan
if (Test-Path "build") {
    Remove-Item -Path "build" -Recurse -Force
    Write-Host "  ✓ Old build removed" -ForegroundColor Green
} else {
    Write-Host "  ✓ No old build found" -ForegroundColor Yellow
}

# Step 2: Check package.json homepage
Write-Host "`n📝 Checking package.json..." -ForegroundColor Cyan
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if ($packageJson.homepage -like "*YOUR_USERNAME*") {
    Write-Host "  ⚠️  WARNING: You need to update 'homepage' in package.json!" -ForegroundColor Red
    Write-Host "     Replace YOUR_USERNAME with your GitHub username" -ForegroundColor Yellow
    Write-Host "     Example: https://dylangill1921.github.io/LovedOnes" -ForegroundColor Yellow
    $continue = Read-Host "     Continue anyway? (y/n)"
    if ($continue -ne "y") {
        Write-Host "`n❌ Deployment cancelled. Update package.json first." -ForegroundColor Red
        exit
    }
} else {
    Write-Host "  ✓ Homepage configured: $($packageJson.homepage)" -ForegroundColor Green
}

# Step 3: Build
Write-Host "`n🔨 Building React app..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Build successful" -ForegroundColor Green

# Step 4: Deploy
Write-Host "`n🚀 Deploying to GitHub Pages..." -ForegroundColor Cyan
npm run deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "`nYour site should be live in 1-2 minutes at:" -ForegroundColor Cyan
Write-Host "  $($packageJson.homepage)" -ForegroundColor Yellow
Write-Host "`n💡 Tip: Clear your browser cache if you see old content!" -ForegroundColor Magenta


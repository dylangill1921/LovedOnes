# PowerShell script to copy CSS files and assets to React project

Write-Host "Setting up React project assets..." -ForegroundColor Green

# Create directories if they don't exist
$stylesDir = "src\assets\styles"
$imagesDir = "public\assets\images"
$audioDir = "public\assets\audio"

if (-not (Test-Path $stylesDir)) {
    New-Item -ItemType Directory -Path $stylesDir -Force | Out-Null
    Write-Host "Created $stylesDir" -ForegroundColor Yellow
}

if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
    Write-Host "Created $imagesDir" -ForegroundColor Yellow
}

if (-not (Test-Path $audioDir)) {
    New-Item -ItemType Directory -Path $audioDir -Force | Out-Null
    Write-Host "Created $audioDir" -ForegroundColor Yellow
}

# Copy CSS files
Write-Host ""
Write-Host "Copying CSS files..." -ForegroundColor Cyan
$cssFiles = @(
    @{Source = "..\views\JordanGeer\Valentines\styles\Valentines2025.css"; Dest = "$stylesDir\Valentines2025.css"},
    @{Source = "..\views\JordanGeer\Anniversarys\styles\1month.css"; Dest = "$stylesDir\1month.css"},
    @{Source = "..\views\JordanGeer\Anniversarys\styles\6mths.css"; Dest = "$stylesDir\6mths.css"},
    @{Source = "..\views\AlexandriaGill\Birthdays\styles\bday26.css"; Dest = "$stylesDir\bday26.css"},
    @{Source = "..\views\Mom&Dad\BigEvents\styles\moving.css"; Dest = "$stylesDir\moving.css"}
)

foreach ($file in $cssFiles) {
    if (Test-Path $file.Source) {
        Copy-Item -Path $file.Source -Destination $file.Dest -Force
        Write-Host "  Copied $(Split-Path $file.Source -Leaf)" -ForegroundColor Green
    } else {
        Write-Host "  Not found: $($file.Source)" -ForegroundColor Red
    }
}

# Copy images
Write-Host ""
Write-Host "Copying images..." -ForegroundColor Cyan
if (Test-Path "..\content\images") {
    Copy-Item -Path "..\content\images\*" -Destination $imagesDir -Recurse -Force
    Write-Host "  Copied images" -ForegroundColor Green
} else {
    Write-Host "  Images folder not found" -ForegroundColor Red
}

# Copy audio files
Write-Host ""
Write-Host "Copying audio files..." -ForegroundColor Cyan
if (Test-Path "..\content\assets") {
    Copy-Item -Path "..\content\assets\*" -Destination $audioDir -Recurse -Force
    Write-Host "  Copied audio files" -ForegroundColor Green
} else {
    Write-Host "  Audio folder not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Setup complete! You can now run npm start to start the React app." -ForegroundColor Green

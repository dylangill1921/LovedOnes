# React Migration Guide

## ✅ Completed
- All HTML pages have been converted to React components
- React Router routes have been set up
- Navbar has been updated with all routes
- Components created:
  - `Valentines2025.jsx`
  - `Anniversary1Month.jsx`
  - `Anniversary6Months.jsx`
  - `Birthday2025.jsx`
  - `MovingHome2025.jsx`

## 📋 Setup Steps Required

### 1. Copy CSS Files
Copy the following CSS files from the original `views` folder to `family-website/src/assets/styles/`:

```powershell
# From project root
Copy-Item "views\JordanGeer\Valentines\styles\Valentines2025.css" -Destination "family-website\src\assets\styles\Valentines2025.css"
Copy-Item "views\JordanGeer\Anniversarys\styles\1month.css" -Destination "family-website\src\assets\styles\1month.css"
Copy-Item "views\JordanGeer\Anniversarys\styles\6mths.css" -Destination "family-website\src\assets\styles\6mths.css"
Copy-Item "views\AlexandriaGill\Birthdays\styles\bday26.css" -Destination "family-website\src\assets\styles\bday26.css"
Copy-Item "views\Mom&Dad\BigEvents\styles\moving.css" -Destination "family-website\src\assets\styles\moving.css"
```

### 2. Copy Assets (Images & Audio)
Copy images and audio files to the React public folder:

```powershell
# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "family-website\public\assets\images"
New-Item -ItemType Directory -Force -Path "family-website\public\assets\audio"

# Copy images
Copy-Item -Path "content\images\*" -Destination "family-website\public\assets\images\" -Recurse -Force

# Copy audio files
Copy-Item -Path "content\assets\*" -Destination "family-website\public\assets\audio\" -Recurse -Force
```

### 3. Install Dependencies
If not already installed:
```bash
cd family-website
npm install
```

### 4. Run the React App
```bash
cd family-website
npm start
```

## 📁 File Structure
```
family-website/
├── public/
│   └── assets/
│       ├── images/     (copy from content/images/)
│       └── audio/      (copy from content/assets/)
├── src/
│   ├── assets/
│   │   └── styles/    (copy CSS files here)
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Valentines2025.jsx
│   │   ├── Anniversary1Month.jsx
│   │   ├── Anniversary6Months.jsx
│   │   ├── Birthday2025.jsx
│   │   └── MovingHome2025.jsx
│   └── App.js
```

## 🔗 Routes
- `/` - Home page
- `/jordan/valentines-2025` - Valentine's Day 2025
- `/jordan/anniversary-1month` - 1 Month Anniversary
- `/jordan/anniversary-6mths` - 6 Month Anniversary
- `/alexandria/birthday-2025` - Birthday 2025
- `/parents/moving-home-2025` - Moving Home 2025

## ⚠️ Notes
- Original HTML files are preserved in the `views/` folder
- All interactive features have been converted to React hooks
- Audio controls use React refs
- Timer functionality uses Luxon library (loaded dynamically)
- The 6-month anniversary page is complex and may need additional JavaScript for full scroll animations

## 🐛 Troubleshooting
- If CSS styles don't load, ensure CSS files are in `src/assets/styles/`
- If images/audio don't load, ensure assets are in `public/assets/`
- Check browser console for any errors


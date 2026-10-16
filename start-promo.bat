@echo off
:: Veechelz Window Blinds Promo Page - Development Server Starter
:: Starts the Next.js development server for the promo motion ad page

echo ============================================
echo Veechelz Window Blinds - Promo Ad Server
echo ============================================
echo.

:: Change to the app directory
cd /d "C:\Users\Null\Music\website"

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

:: Start the Next.js development server
echo Starting Next.js development server...
echo.
echo Promo page will be available at:
echo http://localhost:3000/promo
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev -- -p 3000
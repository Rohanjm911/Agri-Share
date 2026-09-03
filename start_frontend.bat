@echo off
title AgriShare Frontend Server
echo ===================================================
echo Starting AgriShare Next.js Frontend (Port 3000)
echo ===================================================

cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo node_modules not found. Running npm install...
    npm install
)

echo Starting Next.js development server at http://localhost:3000 ...
npm run dev
pause

@echo off
setlocal EnableDelayedExpansion
title AgriShare - Stop All Servers

echo ===============================================================================
echo                   AGRISHARE - STOPPING ALL SERVERS
echo ===============================================================================
echo.

set "STOPPED_ANY=0"

echo [1/2] Checking for Backend process on port 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R ":8000\>" ^| findstr "LISTENING"') do (
    echo   - Terminating Backend PID %%a on port 8000
    taskkill /F /T /PID %%a >nul 2>&1
    set "STOPPED_ANY=1"
)

echo [2/2] Checking for Frontend process on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R ":3000\>" ^| findstr "LISTENING"') do (
    echo   - Terminating Frontend PID %%a on port 3000
    taskkill /F /T /PID %%a >nul 2>&1
    set "STOPPED_ANY=1"
)

echo.
echo ===============================================================================
if "!STOPPED_ANY!"=="1" (
    echo All active AgriShare servers have been successfully stopped.
) else (
    echo No active AgriShare servers were found running on port 8000 or 3000.
)
echo ===============================================================================
echo.
echo Press any key to close this window...
pause >nul
exit /b 0

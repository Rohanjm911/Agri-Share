@echo off
setlocal EnableDelayedExpansion
title AgriShare - Platform Control Center

set "SCRIPT_PATH=%~f0"
set "PROJECT_ROOT=%~dp0"

:: -----------------------------------------------------------------------------
:: Route direct command-line arguments and internal worker tasks
:: -----------------------------------------------------------------------------
if "%~1"=="_worker_backend" goto :worker_backend
if "%~1"=="_worker_frontend" goto :worker_frontend

if /i "%~1"=="start"    goto :cli_start_all
if /i "%~1"=="all"      goto :cli_start_all
if /i "%~1"=="backend"  goto :cli_start_backend
if /i "%~1"=="frontend" goto :cli_start_frontend
if /i "%~1"=="stop"     goto :cli_stop_all
if /i "%~1"=="seed"     goto :cli_seed_data
if /i "%~1"=="open"     goto :cli_open_browser
if /i "%~1"=="swagger"  goto :cli_open_swagger

:: -----------------------------------------------------------------------------
:: Interactive Menu (when launched without arguments, e.g. double-click)
:: -----------------------------------------------------------------------------
:menu
cls
echo ===============================================================================
echo                   AGRISHARE - FULL STACK CONTROL CENTER
echo ===============================================================================
echo.
echo   [1] Start Full Stack Platform (Backend + Frontend)  [DEFAULT]
echo   [2] Start Backend Server Only (Django REST Framework on Port 8000)
echo   [3] Start Frontend Server Only (Next.js on Port 3000)
echo   [4] Stop All AgriShare Servers (Terminates Ports 8000 and 3000)
echo   [5] Apply Migrations and Seed Demo Kisan / Machinery Data
echo   [6] Open Web Application in Browser (http://localhost:3000)
echo   [7] Open Swagger API Documentation (http://127.0.0.1:8000/api/docs/)
echo   [0] Exit
echo.
echo ===============================================================================
set /p choice="Select an option [1-7, default 1, 0 to exit]: "

if "%choice%"=="" set choice=1
if "%choice%"=="1" goto :interactive_start_all
if "%choice%"=="2" goto :interactive_start_backend
if "%choice%"=="3" goto :interactive_start_frontend
if "%choice%"=="4" goto :interactive_stop_all
if "%choice%"=="5" goto :interactive_seed_data
if "%choice%"=="6" goto :cli_open_browser
if "%choice%"=="7" goto :cli_open_swagger
if "%choice%"=="0" exit /b 0

echo Invalid choice. Please choose between 0 and 7.
ping -n 3 127.0.0.1 >nul
goto :menu

:: -----------------------------------------------------------------------------
:: CLI Handlers (exit immediately upon completion)
:: -----------------------------------------------------------------------------
:cli_start_all
call :do_start_backend
ping -n 4 127.0.0.1 >nul
call :do_start_frontend
echo Servers launched successfully.
exit /b 0

:cli_start_backend
call :do_start_backend
echo Backend launched on http://127.0.0.1:8000
exit /b 0

:cli_start_frontend
call :do_start_frontend
echo Frontend launched on http://localhost:3000
exit /b 0

:cli_stop_all
call :do_stop_servers
exit /b 0

:cli_seed_data
call :do_seed_data
exit /b 0

:cli_open_browser
start http://localhost:3000
exit /b 0

:cli_open_swagger
start http://127.0.0.1:8000/api/docs/
exit /b 0

:: -----------------------------------------------------------------------------
:: Interactive Handlers
:: -----------------------------------------------------------------------------
:interactive_start_all
cls
echo ===============================================================================
echo                   AGRISHARE - LAUNCHING FULL STACK PLATFORM
echo ===============================================================================
echo.
echo [1/2] Launching Backend Server (Django REST Framework on Port 8000)...
call :do_start_backend

echo Waiting 3 seconds for Backend to initialize...
ping -n 4 127.0.0.1 >nul

echo [2/2] Launching Frontend Server (Next.js on Port 3000)...
call :do_start_frontend

echo.
echo ===============================================================================
echo                      SERVERS LAUNCHED SUCCESSFULLY!
echo ===============================================================================
echo.
echo   * Frontend Web App:   http://localhost:3000
echo   * Backend REST API:   http://127.0.0.1:8000/api/
echo   * Swagger API Docs:   http://127.0.0.1:8000/api/docs/
echo   * Django Admin:       http://127.0.0.1:8000/admin/
echo.
echo Note: Backend and Frontend run in separate terminal windows.
echo To stop both servers at any time, run: run.bat stop  (or choose Option 4)
echo ===============================================================================
echo.
echo Press any key to open http://localhost:3000 in your browser, or close this window...
pause >nul
start http://localhost:3000
exit /b 0

:interactive_start_backend
cls
echo Launching Backend Server in a new window...
call :do_start_backend
echo Backend launched on http://127.0.0.1:8000
ping -n 3 127.0.0.1 >nul
goto :menu

:interactive_start_frontend
cls
echo Launching Frontend Server in a new window...
call :do_start_frontend
echo Frontend launched on http://localhost:3000
ping -n 3 127.0.0.1 >nul
goto :menu

:interactive_stop_all
cls
call :do_stop_servers
echo.
pause
goto :menu

:interactive_seed_data
cls
call :do_seed_data
echo.
pause
goto :menu

:: -----------------------------------------------------------------------------
:: Core Helper Functions
:: -----------------------------------------------------------------------------
:do_start_backend
start "AgriShare Backend Server (Port 8000)" cmd /k call "%SCRIPT_PATH%" _worker_backend
exit /b 0

:do_start_frontend
start "AgriShare Frontend Server (Port 3000)" cmd /k call "%SCRIPT_PATH%" _worker_frontend
exit /b 0

:do_stop_servers
echo ===============================================================================
echo                   AGRISHARE - STOPPING ALL SERVERS
echo ===============================================================================
echo.
echo Stopping Backend processes on port 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R ":8000\>" ^| findstr "LISTENING"') do (
    echo [OK] Terminating PID %%a on port 8000
    taskkill /F /T /PID %%a >nul 2>&1
)

echo Stopping Frontend processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R ":3000\>" ^| findstr "LISTENING"') do (
    echo [OK] Terminating PID %%a on port 3000
    taskkill /F /T /PID %%a >nul 2>&1
)

echo.
echo ===============================================================================
echo All AgriShare servers have been stopped.
echo ===============================================================================
exit /b 0

:do_seed_data
echo ===============================================================================
echo                  AGRISHARE - SEEDING DEMO DATA
echo ===============================================================================
echo.
cd /d "%PROJECT_ROOT%backend"
if not exist "venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found in backend\venv.
    echo Please start the backend first to initialize the environment.
    exit /b 1
)
echo Applying database migrations...
call venv\Scripts\python.exe manage.py migrate --noinput
echo.
echo Seeding demo Indian farm machinery and kisan user accounts...
call venv\Scripts\python.exe manage.py seed_data
echo.
echo [DONE] Seed data complete!
exit /b 0

:: -----------------------------------------------------------------------------
:: Worker: Backend Server
:: -----------------------------------------------------------------------------
:worker_backend
title AgriShare - Backend Server (Port 8000)
cd /d "%PROJECT_ROOT%backend"
echo ===============================================================================
echo                     AGRISHARE - BACKEND SERVER (Port 8000)
echo ===============================================================================
echo.

:: 1. Check or create Virtual Environment
if exist "venv\Scripts\python.exe" goto :backend_venv_ready

echo [1/4] Setting up Python virtual environment...
py -3.13 -m venv venv 2>nul || py -3 -m venv venv 2>nul || py -m venv venv 2>nul || python -m venv venv 2>nul
if not exist "venv\Scripts\python.exe" (
    echo [ERROR] Could not create virtual environment. Ensure Python 3.12+ is installed.
    echo Download Python: https://www.python.org/downloads/
    pause
    exit /b 1
)
echo [1/4] Installing backend dependencies...
call venv\Scripts\python.exe -m pip install --upgrade pip
call venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Failed to install Python dependencies.
    pause
    exit /b 1
)

:backend_venv_ready
echo [1/4] Virtual environment verified.

:: 2. Ensure environment file
if exist ".env" goto :backend_env_ready
echo [2/4] Creating .env from .env.example...
copy .env.example .env >nul

:backend_env_ready
echo [2/4] Environment configuration file verified.

:: 3. Database migrations
echo [3/4] Running database migrations...
call venv\Scripts\python.exe manage.py makemigrations --noinput
call venv\Scripts\python.exe manage.py migrate --noinput
if errorlevel 1 (
    echo [ERROR] Database migration failed.
    pause
    exit /b 1
)

:: 4. Start Django development server
echo.
echo [4/4] Starting Django Development Server on http://127.0.0.1:8000 ...
call venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
echo.
echo [INFO] Django backend server has stopped.
pause
exit /b 0

:: -----------------------------------------------------------------------------
:: Worker: Frontend Server
:: -----------------------------------------------------------------------------
:worker_frontend
title AgriShare - Frontend Server (Port 3000)
cd /d "%PROJECT_ROOT%frontend"
echo ===============================================================================
echo                     AGRISHARE - FRONTEND SERVER (Port 3000)
echo ===============================================================================
echo.

:: 1. Check Node.js and npm
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not found on your system PATH.
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

:: 2. Check dependencies
if exist "node_modules\" goto :frontend_deps_ready
echo [1/2] Installing frontend npm dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install npm dependencies.
    pause
    exit /b 1
)

:frontend_deps_ready
echo [1/2] Node dependencies verified.

:: 3. Start Next.js development server
echo [2/2] Starting Next.js development server on http://localhost:3000 ...
call npm run dev
echo.
echo [INFO] Next.js frontend server has stopped.
pause
exit /b 0

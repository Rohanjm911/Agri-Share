@echo off
title AgriShare Backend Server
echo ===================================================
echo Starting AgriShare Django Backend Server (Port 8000)
echo ===================================================

cd /d "%~dp0backend"

if not exist ".env" (
    echo [.env] not found. Copying from .env.example...
    copy .env.example .env
)

if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else (
    echo Virtual environment not found. Creating venv...
    py -3.13 -m venv venv || python -m venv venv
    call venv\Scripts\activate.bat
    echo Installing dependencies...
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py seed_data
)

echo Starting Django server at http://127.0.0.1:8000 ...
python manage.py runserver 127.0.0.1:8000
pause

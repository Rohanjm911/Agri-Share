================================================================================
                      AGRISHARE - HOW TO RUN THIS PROJECT
================================================================================

This guide explains how to install, configure, and run both the Backend (Django)
and Frontend (Next.js) for the AgriShare Agricultural Equipment Rental Platform.

--------------------------------------------------------------------------------
1. PREREQUISITES
--------------------------------------------------------------------------------
Ensure you have the following installed on your system:
  - Python 3.12 or higher (Python 3.13 recommended)
  - Node.js 18.0 or higher
  - npm (comes bundled with Node.js)
  - Git

--------------------------------------------------------------------------------
2. QUICK START SUMMARY (TL;DR)
--------------------------------------------------------------------------------

[TERMINAL 1 - BACKEND]
  cd backend
  python -m venv venv
  .\venv\Scripts\activate      # Windows (or: source venv/bin/activate on Mac/Linux)
  pip install -r requirements.txt
  copy .env.example .env        # Windows (or: cp .env.example .env on Mac/Linux)
  python manage.py migrate
  python manage.py seed_data
  python manage.py runserver 127.0.0.1:8000

[TERMINAL 2 - FRONTEND]
  cd frontend
  npm install
  npm run dev

Open your browser at:
  - Frontend App:   http://localhost:3000
  - Backend API:    http://127.0.0.1:8000/api/
  - API Swagger UI: http://127.0.0.1:8000/api/docs/
  - Django Admin:   http://127.0.0.1:8000/admin/

================================================================================
3. DETAILED STEP-BY-STEP SETUP
================================================================================

----------------------------------------------------
STEP A: BACKEND SETUP (Django REST Framework)
----------------------------------------------------

1. Open a terminal and navigate to the backend folder:
   cd backend

2. Create a Python virtual environment:
   - On Windows:
       python -m venv venv
       (or: py -3.13 -m venv venv)
   - On macOS / Linux:
       python3 -m venv venv

3. Activate the virtual environment:
   - On Windows (PowerShell):
       .\venv\Scripts\Activate.ps1
       *Note: If PowerShell throws a script execution policy error, run:
        Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   - On Windows (Command Prompt / CMD):
       .\venv\Scripts\activate.bat
   - On macOS / Linux (Bash/Zsh):
       source venv/bin/activate

4. Install Python dependencies:
   pip install -r requirements.txt

5. Configure environment variables:
   - On Windows:
       copy .env.example .env
   - On macOS / Linux:
       cp .env.example .env

6. Run database migrations:
   python manage.py migrate

7. Populate database with demo data (categories, machinery, users):
   python manage.py seed_data

8. Start the Django development server:
   python manage.py runserver 127.0.0.1:8000

   * Keep this terminal window open!

----------------------------------------------------
STEP B: FRONTEND SETUP (Next.js & TypeScript)
----------------------------------------------------

1. Open a SECOND terminal window and navigate to the frontend folder:
   cd frontend

2. Install Node.js dependencies:
   npm install

3. (Optional) Create .env.local if you change the backend port:
   By default, the frontend connects to http://127.0.0.1:8000/api.
   If you need a custom URL, create a file named `.env.local` inside `frontend/`:
     NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

4. Start the Next.js development server:
   npm run dev

5. Open your web browser and navigate to:
   http://localhost:3000

================================================================================
4. READY-TO-USE DEMO ACCOUNTS
================================================================================

The seed data command generates pre-configured Indian demo accounts:

+-----------+--------------------------------+-------------+----------------------+
| Role      | Email                          | Password    | Location             |
+-----------+--------------------------------+-------------+----------------------+
| Admin     | admin@agrishare.com            | admin12345  | New Delhi            |
| Owner     | gurpreet.singh@agrishare.com   | password123 | Ludhiana, Punjab     |
| Owner     | rajesh.patel@agrishare.com     | password123 | Rajkot, Gujarat      |
| Owner     | vikram.choudhary@agrishare.com | password123 | Karnal, Haryana      |
| Renter    | ramesh.sharma@agrishare.com    | password123 | Indore, MP           |
+-----------+--------------------------------+-------------+----------------------+

* TIP: On the Login page in the browser (http://localhost:3000/login),
  you can click the one-click "Demo Login" buttons to sign in instantly!

================================================================================
5. RUNNING AUTOMATED TESTS
================================================================================

To verify your setup is functioning correctly, you can run tests:

1. Backend Unit Tests (19 automated tests):
   cd backend
   python manage.py test

2. End-to-End API Flow Simulation:
   cd backend
   python ..\scripts\test_e2e_flow.py

================================================================================
6. TROUBLESHOOTING & FAQ
================================================================================

Q1: PowerShell says "running scripts is disabled on this system".
A1: Run this command in PowerShell before activating:
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    .\venv\Scripts\Activate.ps1

Q2: Port 8000 or Port 3000 is already in use.
A2: For backend, specify another port:
      python manage.py runserver 127.0.0.1:8080
    For frontend, specify another port:
      npm run dev -- -p 3001
    Make sure to update NEXT_PUBLIC_API_URL and CORS_ALLOWED_ORIGINS accordingly.

Q3: How to reset the database and re-seed data?
A3: In the backend folder:
      del db.sqlite3           # (or: rm db.sqlite3 on Mac/Linux)
      python manage.py migrate
      python manage.py seed_data

================================================================================
                              HAPPY FARMING! 🚜
================================================================================


# 🚜 AgriShare — Project Startup & Setup Guide

This guide walks you through setting up and running **AgriShare** (both Backend and Frontend) on your local machine.

---

## ⚡ Quick Start (TL;DR)

### Option A: Unified Master Launcher (Windows)

AgriShare provides a master control launcher **`run.bat`** with an interactive menu and direct CLI commands.

#### 1. Method 1: Interactive Menu (Double-Click or Run in Terminal)
Double-click **`run.bat`** in File Explorer, or open your terminal in the project root and run:

- **In Command Prompt (CMD)**:
  ```cmd
  run.bat
  ```
- **In PowerShell**:
  ```powershell
  .\run.bat
  ```

This displays an interactive menu:
```text
===============================================================================
                  AGRISHARE - FULL STACK CONTROL CENTER
===============================================================================

  [1] Start Full Stack Platform (Backend + Frontend)  [DEFAULT]
  [2] Start Backend Server Only (Django REST Framework on Port 8000)
  [3] Start Frontend Server Only (Next.js on Port 3000)
  [4] Stop All AgriShare Servers (Terminates Ports 8000 and 3000)
  [5] Apply Migrations and Seed Demo Kisan / Machinery Data
  [6] Open Web Application in Browser (http://localhost:3000)
  [7] Open Swagger API Documentation (http://127.0.0.1:8000/api/docs/)
  [0] Exit
```

#### 2. Method 2: Direct CLI Commands & 1-Click Stop
You can also run actions directly from CMD or PowerShell, or double-click **`stop.bat`** to instantly shut down all servers:

| Action | CMD Command | PowerShell Command | Description |
| :--- | :--- | :--- | :--- |
| **Start Full Stack** | `run.bat start` | `.\run.bat start` | Starts both Backend (:8000) & Frontend (:3000) in separate windows. |
| **Start Backend Only** | `run.bat backend` | `.\run.bat backend` | Verifies venv, migrations & starts Django server (:8000). |
| **Start Frontend Only** | `run.bat frontend` | `.\run.bat frontend` | Verifies `node_modules` & starts Next.js dev server (:3000). |
| **Stop All Servers (1-Click)** | `stop.bat` | `.\stop.bat` | **Instant Shutdown**: Safely terminates active processes on ports 8000 & 3000. |
| **Stop via run.bat** | `run.bat stop` | `.\run.bat stop` | Stops all servers via master runner. |
| **Seed Demo Data** | `run.bat seed` | `.\run.bat seed` | Populates demo Indian machinery, categories & kisan users. |
| **Open Web App** | `run.bat open` | `.\run.bat open` | Opens `http://localhost:3000` in default browser. |

---

### Option B: Manual Startup (Two Terminals)
Open **two separate terminal windows**:

### Terminal 1: Backend (Django REST Framework)
```bash
cd backend
py -3.13 -m venv venv           # or: python -m venv venv
.\venv\Scripts\Activate.ps1     # on Windows PowerShell (or: source venv/bin/activate on Linux/macOS)
pip install -r requirements.txt
copy .env.example .env          # on Windows (or: cp .env.example .env on Linux/macOS)
python manage.py migrate
python manage.py seed_data      # populates demo equipment, categories & users
python manage.py runserver 127.0.0.1:8000
```
> Backend runs at: **http://127.0.0.1:8000**

### Terminal 2: Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
> Frontend runs at: **http://localhost:3000**

---

## 📋 Prerequisites

Ensure you have the following installed on your system:

| Tool | Minimum Version | Download / Check Command |
| :--- | :--- | :--- |
| **Python** | `3.12+` (3.13 recommended) | `python --version` or `py --version` |
| **Node.js** | `18.0+` (20+ recommended) | `node -v` |
| **npm** | `9.0+` | `npm -v` |
| **Git** | `2.x+` | `git --version` |

---

## 🛠️ Detailed Step-by-Step Instructions

### Part 1: Backend Setup

> 💡 **Windows Quick Shortcut**: You can also simply run **`run.bat backend`** (or choose Option 2 in **`run.bat`**) in the project root; it will automatically create the virtual environment, install dependencies, run migrations, and start Django!

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Create a Python Virtual Environment**:
   - **Windows (PowerShell / CMD)**:
     ```powershell
     py -3.13 -m venv venv
     # or
     python -m venv venv
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     ```

3. **Activate the Virtual Environment**:
   - **Windows PowerShell**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
     *(If you encounter an execution policy error in PowerShell, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` and try again)*
   - **Windows Command Prompt (CMD)**:
     ```cmd
     venv\Scripts\activate.bat
     ```
   - **macOS / Linux**:
     ```bash
     source venv/bin/activate
     ```

4. **Install Python Dependencies**:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

5. **Create Environment File (`.env`)**:
   - **Windows**:
     ```powershell
     copy .env.example .env
     ```
   - **macOS / Linux**:
     ```bash
     cp .env.example .env
     ```

6. **Apply Database Migrations**:
   ```bash
   python manage.py migrate
   ```

7. **Seed Demo Data** *(Creates demo users, categories, machinery, and reviews)*:
   ```bash
   python manage.py seed_data
   ```

8. **Start the Backend Server**:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   Backend will be active at: `http://127.0.0.1:8000`

---

### Part 2: Frontend Setup

> 💡 **Windows Quick Shortcut**: You can also simply run **`run.bat frontend`** (or choose Option 3 in **`run.bat`**) in the project root; it will automatically install `node_modules` if missing and start the Next.js dev server!

Open a **new terminal window** in the project root:

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Visit [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔑 Demo Login Credentials

AgriShare includes pre-seeded demo accounts. The login page also contains **1-Click Demo Login** buttons for instant access.

| Role | Email | Password | Location | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Admin / Superuser** | `admin@agrishare.com` | `admin12345` | New Delhi | Full platform access & Django Admin |
| **Equipment Owner** | `gurpreet.singh@agrishare.com` | `password123` | Ludhiana, Punjab | Owns tractors & harvesters |
| **Equipment Owner** | `rajesh.patel@agrishare.com` | `password123` | Rajkot, Gujarat | Owns tractors & implements |
| **Equipment Owner** | `vikram.choudhary@agrishare.com` | `password123` | Karnal, Haryana | Owns combine harvesters |
| **Farmer / Renter** | `ramesh.sharma@agrishare.com` | `password123` | Indore, MP | Active renter with bookings |

---

## 🌐 Useful URLs & Endpoints

| Service / Interface | URL | Description |
| :--- | :--- | :--- |
| **Frontend Application** | [http://localhost:3000](http://localhost:3000) | Main web interface for farmers & owners |
| **Backend API Root** | [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/) | REST API base URL |
| **Swagger API Docs** | [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/) | Interactive Swagger UI API documentation |
| **OpenAPI Schema** | [http://127.0.0.1:8000/api/schema/](http://127.0.0.1:8000/api/schema/) | Raw OpenAPI schema |
| **Django Admin Panel** | [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) | Django administrative dashboard |

---

## 🧪 Running Tests & Verification

### 1. Backend Automated Tests
With your virtual environment activated in `backend/`:
```bash
python manage.py test
```

### 2. End-to-End Workflow Verification Script
Make sure both backend and frontend servers are running, then run from the root directory:
```bash
python scripts/test_e2e_flow.py
```

### 3. Frontend Production Build Check
In `frontend/`:
```bash
npm run build
```

---

## ❓ Troubleshooting & Common Issues

### 1. PowerShell Script Execution Disabled
**Issue**: `.\venv\Scripts\Activate.ps1 cannot be loaded because running scripts is disabled on this system.`  
**Solution**: Run the following command in PowerShell and then reactivate:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

### 2. Port Already in Use
**Issue**: `Error: That port is already in use.`  
**Solution**:
- For Backend: Run on a different port:
  ```bash
  python manage.py runserver 127.0.0.1:8001
  ```
- For Frontend: Next.js will automatically prompt to use port `3001` or another open port.

### 3. Missing `.env` File
**Issue**: `django.core.exceptions.ImproperlyConfigured` or CORS/secret key warnings.  
**Solution**: Ensure `backend/.env` exists by copying `backend/.env.example` to `backend/.env`.

### 4. Database Not Found or Migration Errors
**Issue**: `no such table: accounts_user`  
**Solution**: Run migrations and seed data:
```bash
python manage.py migrate
python manage.py seed_data
```

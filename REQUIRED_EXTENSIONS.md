# 🚜 AgriShare — Required Extensions & Runtime Prerequisites

This document lists all system runtimes, software tools, recommended VS Code / IDE extensions, and automation scripts required to develop, run, and debug the **AgriShare** platform.

---

## 1. ⚙️ System Runtime Prerequisites

Make sure the following runtimes and command-line tools are installed and available in your system `PATH`:

| Runtime / Tool | Minimum Version | Recommended | Purpose | Verification Command | Official Download |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Python** | `3.12+` | `3.13+` | Django REST Framework backend, ORM migrations, virtual environment | `python --version` | [python.org](https://www.python.org/downloads/) |
| **Node.js** | `18+ LTS` | `20+ LTS` | Next.js 16 frontend development server & SSR compiler | `node --version` | [nodejs.org](https://nodejs.org/) |
| **npm** | `9.0+` | Latest | Manages frontend packages and build scripts | `npm --version` | *Bundled with Node.js* |
| **Git** | `2.x+` | Latest | Source control management and version tracking | `git --version` | [git-scm.com](https://git-scm.com/) |

> [!IMPORTANT]
> **Windows Python Installation Note:**
> During Python installation, make sure to check the box **"Add python.exe to PATH"** to ensure global terminal accessibility.

---

## 2. 🧩 Recommended VS Code / IDE Extensions

To get the optimal developer experience, syntax highlighting, linting, and auto-formatting, install the following extensions:

### A. Python & Backend Development
* **Python** (`ms-python.python`)
  - Official Python extension for VS Code: IntelliSense, linting, debugging, and environment selection.
* **Pylance** (`ms-python.vscode-pylance`)
  - High-performance language server for Python with deep static type checking.
* **Django** (`batisteo.vscode-django`)
  - Django template syntax highlighting, tags, filters, and code completion snippets.
* **SQLite Viewer** (`qwtel.sqlite-viewer`)
  - Allows inspecting and querying the SQLite database (`backend/db.sqlite3`) directly within VS Code without external database GUI software.

### B. Frontend & TypeScript Development
* **ESLint** (`dbaeumer.vscode-eslint`)
  - Integrates ESLint into VS Code to catch code quality and formatting issues in real time.
* **Prettier - Code Formatter** (`esbenp.prettier-vscode`)
  - Consistent code styling for HTML, CSS, JavaScript, TypeScript, and JSON.
* **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
  - Autocompletion and syntax highlighting for utility classes.
* **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
  - High-productivity snippets for React components, hooks, and TypeScript props.

### C. Environment & API Productivity
* **DotENV** (`mikestead.dotenv`)
  - Syntax highlighting for `.env` and `.env.example` configuration files.
* **Thunder Client** (`rangav.vscode-thunder-client`) *or* **REST Client** (`humao.rest-client`)
  - Lightweight REST API client inside VS Code for rapid API testing without needing Postman.

---

## 3. ⚡ Quick One-Click Terminal Install

If you have the `code` CLI command available in your terminal, install all recommended extensions in one go:

```bash
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
code --install-extension batisteo.vscode-django
code --install-extension qwtel.sqlite-viewer
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension mikestead.dotenv
code --install-extension rangav.vscode-thunder-client
```

---

## 4. 🚀 How to Run & Stop AgriShare

AgriShare includes one-click batch scripts for managing local servers:

### 🟢 Launch Servers (Master Control)
Run `run.bat` in the project root directory:
```powershell
.\run.bat
```
**Interactive Menu Options:**
* `[1]` Start Full Stack Platform (Backend on `:8000` + Frontend on `:3000`)
* `[2]` Start Backend Only (Django REST Framework)
* `[3]` Start Frontend Only (Next.js 16)
* `[4]` Stop All AgriShare Servers
* `[5]` Apply Migrations & Seed Demo Data
* `[6]` Open Web App in Browser (`http://localhost:3000`)
* `[0]` Exit

### 🔴 Instant Shutdown
To kill all background servers cleanly at once:
```powershell
.\stop.bat
```

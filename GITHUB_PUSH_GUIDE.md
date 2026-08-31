# 🚀 Guide: How to Push AgriShare to Your GitHub Repository

Follow these step-by-step instructions to push the entire **AgriShare** project to your personal or organization GitHub account.

---

## 📋 Step 1: Create a New Repository on GitHub

1. Open your browser and go to [**GitHub.com/new**](https://github.com/new).
2. Set **Repository name**: `AgriShare` (or any preferred name).
3. Set visibility: **Public** or **Private**.
4. ⚠️ **IMPORTANT**: **Do NOT check** *"Add a README file"*, *"Add .gitignore"*, or *"Choose a license"* (we already have all these files created and configured in the project).
5. Click **Create repository**.
6. Copy your repository URL. It will look like either:
   - **HTTPS**: `https://github.com/<YOUR-USERNAME>/AgriShare.git`
   - **SSH**: `git@github.com:<YOUR-USERNAME>/AgriShare.git`

---

## 💻 Step 2: Open Terminal in Project Directory

Open **PowerShell**, **Command Prompt**, or your terminal in the workspace root:

```bash
cd "d:\projects and certificates\projects\web\AgriShare"
```

---

## 🔍 Step 3: Check Git Status & Stage All Files

Make sure all changes are committed:

```bash
# Check status
git status

# Stage all files (if any untracked files remain)
git add .

# Create a final commit
git commit -m "feat: complete AgriShare agricultural marketplace production build"
```

---

## 🔗 Step 4: Link Your Remote GitHub Repository

Set the `origin` remote URL (replace `<YOUR-USERNAME>` with your actual GitHub username):

### Option A: Using HTTPS (Standard)
```bash
git remote add origin https://github.com/<YOUR-USERNAME>/AgriShare.git
```

### Option B: Using SSH (If you have SSH keys configured)
```bash
git remote add origin git@github.com:<YOUR-USERNAME>/AgriShare.git
```

> 💡 *Note: If `remote origin already exists`, update it with:*
> ```bash
> git remote set-url origin https://github.com/<YOUR-USERNAME>/AgriShare.git
> ```

---

## 🌿 Step 5: Rename Default Branch to `main`

```bash
git branch -M main
```

---

## 🚀 Step 6: Push Code to GitHub

```bash
git push -u origin main
```

---

## 🔑 Authentication Troubleshooting (If Prompted for Password)

### 1. If using HTTPS with Personal Access Token (PAT):
GitHub does not accept standard account passwords for git command line operations. If prompted:
1. Go to GitHub &rarr; **Settings** &rarr; **Developer settings** &rarr; **Personal access tokens** &rarr; **Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Select scope: **`repo`** (Full control of private repositories).
4. Copy the generated token string (`ghp_...`).
5. When prompted for password in terminal, **paste the Token** instead of your account password.

### 2. If using GitHub CLI (`gh`):
```bash
gh auth login
# Follow browser prompts to log in, then:
git push -u origin main
```

### 3. If you initialized the remote repo with a README by mistake:
If GitHub rejects the push with `[rejected - non-fast-forward]`:
```bash
# Pull and merge remote changes
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
```
*(Or force push if you want the local codebase to overwrite the blank GitHub repo):*
```bash
git push -u origin main --force
```

---

## ✅ Step 7: Verify on GitHub

1. Open your repository page: `https://github.com/<YOUR-USERNAME>/AgriShare`
2. You should see all project folders (`backend/`, `frontend/`, `scripts/`), documentation (`README.md`), and commits.

---

### 🎉 Your AgriShare codebase is now live on GitHub!

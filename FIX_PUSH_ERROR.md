# Fixing Git Push Error

The error `400 send-pack: unexpected disconnect` is usually an authentication issue. Here are solutions:

## Solution 1: Use GitHub Personal Access Token (Recommended)

GitHub no longer accepts passwords for HTTPS authentication. You need to use a Personal Access Token (PAT).

### Steps:

1. **Create a Personal Access Token:**
   - Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Name it (e.g., "My Mac Git")
   - Select scopes: Check `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Update your remote URL to use the token:**
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/babapotato/background-attempt.git
   ```
   Replace `YOUR_TOKEN` with your actual token.

3. **Or use Git Credential Manager:**
   When you push, Git will ask for credentials:
   - Username: `babapotato` (your GitHub username)
   - Password: **Paste your Personal Access Token** (not your GitHub password)

4. **Try pushing again:**
   ```bash
   git push origin main
   ```

## Solution 2: Switch to SSH (Alternative)

If you prefer SSH authentication:

1. **Check if you have SSH keys:**
   ```bash
   ls -la ~/.ssh
   ```

2. **Generate SSH key if needed:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

3. **Add SSH key to GitHub:**
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub.com → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your public key and save

4. **Change remote URL to SSH:**
   ```bash
   git remote set-url origin git@github.com:babapotato/background-attempt.git
   ```

5. **Test SSH connection:**
   ```bash
   ssh -T git@github.com
   ```

6. **Try pushing:**
   ```bash
   git push origin main
   ```

## Solution 3: Use GitHub CLI (gh)

If you have GitHub CLI installed:

```bash
gh auth login
git push origin main
```

## Troubleshooting

- **If you still get errors**, try:
  ```bash
  git config --global credential.helper store
  ```
  This will save your credentials for future use.

- **Clear cached credentials:**
  ```bash
  git credential-cache exit
  ```

- **Check your remote URL:**
  ```bash
  git remote -v
  ```

## Quick Fix (Temporary)

If you just want to push once, you can use:
```bash
git push https://YOUR_TOKEN@github.com/babapotato/background-attempt.git main
```

Replace `YOUR_TOKEN` with your Personal Access Token.


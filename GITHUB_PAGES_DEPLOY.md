# GitHub Pages Deployment Guide

This Next.js application is configured for static export and can be deployed to GitHub Pages.

## Prerequisites

1. A GitHub account
2. A GitHub repository (create one if you don't have it)

## Deployment Steps

### Option 1: Deploy to Root URL (e.g., `username.github.io`)

If you want to deploy to `https://username.github.io/` (your user's main GitHub Pages site):

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **The output will be in the `/out` directory**

3. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```

4. **Configure GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select the `main` branch
   - Select the `/out` folder as the source
   - Click "Save"

### Option 2: Deploy to Subdirectory (e.g., `username.github.io/repo-name`)

If you want to deploy to a subdirectory:

1. **Update `next.config.js`:**
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/repo-name',  // Replace with your repository name
     images: {
       unoptimized: true,
     },
   }
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

4. **Configure GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select the `main` branch
   - Select the `/out` folder as the source
   - Click "Save"

5. **Your site will be available at:**
   `https://username.github.io/repo-name/`

## Automated Deployment with GitHub Actions

For automatic deployment on every push, create a GitHub Actions workflow:

1. **Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **Push the workflow file:**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions deployment"
   git push
   ```

3. **Enable GitHub Pages in repository settings:**
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

## Manual Deployment

If you prefer manual deployment:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Copy the `/out` directory contents to the `gh-pages` branch:**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r out/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. **Configure GitHub Pages:**
   - Go to repository settings → Pages
   - Select `gh-pages` branch as the source
   - Save

## Important Notes

1. **`.nojekyll` file:** This file is included to prevent GitHub Pages from processing the site with Jekyll, which can interfere with Next.js static exports.

2. **Base Path:** If you're deploying to a subdirectory, make sure to update `basePath` in `next.config.js` to match your repository name.

3. **Custom Domain:** If you want to use a custom domain, add a `CNAME` file in the `/out` directory with your domain name, and configure DNS settings accordingly.

4. **Build Output:** The static export will be in the `/out` directory after running `npm run build`.

## Troubleshooting

- **404 errors:** Make sure `basePath` is correctly set in `next.config.js` if deploying to a subdirectory
- **Assets not loading:** Check that all paths are relative and the basePath is correct
- **Build errors:** Ensure all dependencies are installed with `npm install`

## Verification

After deployment, your waves animation should be accessible at:
- Root: `https://username.github.io/`
- Subdirectory: `https://username.github.io/repo-name/`

The animation should work exactly as it does locally!


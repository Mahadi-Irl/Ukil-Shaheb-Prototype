# Deploying to Vercel

This guide will help you deploy your Next.js app to Vercel.

## Prerequisites

1. A GitHub account (recommended) or GitLab/Bitbucket
2. A Vercel account (free tier is available)
3. Your code pushed to a Git repository

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Your Code to GitHub

1. Initialize Git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Create a new repository (e.g., "ukil-saheb")
   - Don't initialize with README

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ukil-saheb.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel:**
   - Go to https://vercel.com
   - Sign up with your GitHub account (recommended)

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `ukil-saheb` repository

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Environment Variables (if needed):**
   - If you have any API keys or environment variables, add them here
   - For now, you can skip this as the app uses mock data

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

6. **Your App is Live!**
   - Vercel will provide you with a URL like: `https://ukil-saheb.vercel.app`
   - Every push to your main branch will automatically trigger a new deployment

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:

```bash
cd ukil-saheb
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- Project name? `ukil-saheb` (or your preferred name)
- Directory? `./` (press Enter)
- Override settings? **No**

### Step 4: Production Deploy

For production deployment:

```bash
vercel --prod
```

## Important Notes

### 1. Environment Variables
If you need to add environment variables later:
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add variables like `OPENAI_API_KEY` if you integrate real APIs

### 2. Custom Domain
- Go to Project Settings → Domains
- Add your custom domain (e.g., `ukilshaheb.com`)

### 3. Build Settings
Vercel auto-detects Next.js, but you can verify:
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### 4. Public Files
Files in the `public/` folder are automatically served at the root URL.
- `/data/lawyers.json` → `https://your-app.vercel.app/data/lawyers.json`
- `/data/ngos.json` → `https://your-app.vercel.app/data/ngos.json`

## Troubleshooting

### Build Fails
1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Make sure TypeScript errors are resolved

### API Routes Not Working
- API routes in `app/api/` should work automatically
- Check Vercel function logs if there are errors

### Static Files Not Loading
- Ensure files are in the `public/` directory
- Check file paths are correct (case-sensitive)

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test API routes (`/api/chatbot`, `/api/case`, etc.)
- [ ] Test language toggle functionality
- [ ] Test video call interface in meetings page
- [ ] Test case detail view
- [ ] Verify all images and static files load
- [ ] Test on mobile devices

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every pull request gets a preview URL

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Support: https://vercel.com/support


# Deployment Guide

This project supports deployment to both **Vercel** and **GitHub Pages**.

---

## Option 1: GitHub Pages (Free)

### Setup

1. Go to your GitHub repository
2. Click **Settings** > **Pages**
3. Under "Build and deployment", select **GitHub Actions**

### Configuration (Optional)

By default, the site deploys to `https://username.github.io/repo-name/`.

For a **custom domain**:
1. Go to **Settings** > **Pages** > **Custom domain**
2. Enter your domain (e.g., `vicus-software.com`)
3. Add repository variables under **Settings** > **Secrets and variables** > **Actions** > **Variables**:

| Variable | Value |
|----------|-------|
| `SITE_URL` | `https://vicus-software.com` |
| `BASE_PATH` | *(leave empty)* |

### Deploy

Push to `main` or `master` branch, or manually trigger via **Actions** > **Deploy to GitHub Pages** > **Run workflow**.

### Disable Vercel Workflow

If using GitHub Pages, disable the Vercel workflow by renaming:
```bash
mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
```

### DNS Setup for Custom Domain

Add these DNS records at your domain provider:

**For apex domain (vicus-software.com):**
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**For www subdomain:**
```
CNAME www   username.github.io
```

---

## Option 2: Vercel

This project also supports deployment to Vercel.

## Setup

### 1. Create a Vercel Project

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy (this creates the project)

### 2. Get Vercel Credentials

You need three values from Vercel:

#### VERCEL_TOKEN
1. Go to [Vercel Account Settings > Tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it (e.g., "GitHub Actions")
4. Copy the token

#### VERCEL_ORG_ID
1. Go to [Vercel Account Settings](https://vercel.com/account)
2. Your Org ID is shown under "General"
3. Or run `vercel whoami` locally after `vercel login`

#### VERCEL_PROJECT_ID
1. Go to your project on Vercel
2. Click "Settings" > "General"
3. Copy the "Project ID"

### 3. Add GitHub Secrets

1. Go to your GitHub repository
2. Click "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:

| Secret Name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | Your Vercel token |
| `VERCEL_ORG_ID` | Your Vercel organization/account ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |

### 4. Deploy

Push to `main` or `master` branch to trigger a production deployment.

Create a pull request to get a preview deployment with a unique URL.

## Workflow Behavior

- **Push to main/master**: Deploys to production
- **Pull Request**: Creates a preview deployment and comments the URL on the PR

## Environment Variables

For environment variables needed at build time (like `PUBLIC_GA_ID`), add them in:
1. Vercel Dashboard > Project > Settings > Environment Variables
2. Or in the GitHub Action workflow file

## Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

## Troubleshooting

### Build fails
- Check that `npm run build` works locally
- Verify all environment variables are set in Vercel

### Secrets not working
- Ensure secret names match exactly (case-sensitive)
- Check that secrets are added to the correct repository

### Preview URL not appearing on PR
- Ensure the GitHub Actions bot has permission to comment on issues
- Check the workflow logs for errors

# Paribesh Frontend

A Next.js frontend for `paribesh.ish-vara.com` connected to WordPress backend at `ish-vara.com`.

## 🚀 Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

#### Option 1: Deploy via GitHub (Recommended)

1. **Create a GitHub repository:**
   - Go to GitHub and create a new repository
   - Name it something like `paribesh-frontend`

2. **Push this code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

3. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

4. **Add your custom domain:**
   - In Vercel project settings → Domains
   - Add `paribesh.ish-vara.com`
   - Follow DNS instructions (add CNAME at SiteGround)

#### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

## 🔗 WordPress API Integration

The app connects to WordPress REST API at:
- `https://ish-vara.com/wp-json/wp/v2`

### Current Features:
- Fetches and displays latest 5 posts from WordPress
- Shows connection status
- Error handling for CORS issues

### Next Steps:
- Add API route proxy to avoid CORS issues
- Add authentication for protected endpoints
- Implement caching strategy

## 📝 Notes

- Make sure DNS CNAME record is added at SiteGround
- WordPress REST API must be accessible from the subdomain
- If you encounter CORS errors, you may need to configure WordPress to allow requests from `paribesh.ish-vara.com`


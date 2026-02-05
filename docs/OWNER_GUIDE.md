## Vercel Deployment Checklist (One-click, idiot-proof)

### 0) Pre-flight (local)
- [ ] `npm install`
- [ ] `npm run dev` (site loads, no errors)
- [ ] `npm run lint` (0 errors)
- [ ] `npm run build` (0 errors)

### 1) Push to GitHub
- [ ] Commit changes
- [ ] Push to `main`

### 2) Deploy on Vercel (first time)
- [ ] Vercel → Add New → Project
- [ ] Import GitHub repo
- [ ] Framework: Next.js (auto)
- [ ] Deploy

### 3) Deploy flow (afterwards)
- [ ] Push to `main` → production deploy
- [ ] PR/branch → preview deploy

### 4) Environment Variables (only if needed)
- [ ] Vercel → Project → Settings → Environment Variables
- [ ] Example: `NEXT_PUBLIC_THEME=studio`
- [ ] Redeploy after changes

### 5) Connect Domain (Loopia → Vercel)
- [ ] Vercel → Settings → Domains → add apex + www
- [ ] Apply ONLY the DNS records Vercel asks for (A/CNAME)

**Email safety**
- [ ] Do NOT change/remove MX records (email must keep working)

### 6) Final checks (production)
- [ ] Site loads on domain
- [ ] Mobile header/menu ok
- [ ] Routes ok
- [ ] No console errors


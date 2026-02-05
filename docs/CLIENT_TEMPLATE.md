# Client Template — AWERE Site

This starter is designed to be cloned per client so each project feels like a product, not a one-off build.

## What clients customize

Most client-specific content lives in the `content` directory:

- `content/site.ts` — name, domain, tagline and high-level site info
- `content/services.ts` — service modules and deliverables
- `content/work.ts` — case snapshots, tags, and status
- `content/process.ts` — 3-step process outline

Developers can also adjust:

- `app/(route)/page.tsx` — page-level layout and composition
- `components/sections/*` — how content is presented
- `components/ui/*` — low-level UI primitives (buttons, cards, form fields)

## How to deploy on Vercel

1. Push the project to GitHub.
2. In Vercel, click **Add New → Project**.
3. **Import** the GitHub repo (framework: Next.js should be detected automatically).
4. Configure environment variables if needed (for example `NEXT_PUBLIC_THEME=studio`).
5. Click **Deploy** and wait for the build to finish.

After the first deploy:

- Every push to `main` triggers a **production** deploy.
- Every pull request or branch triggers a **preview** deploy.

## DNS and domains

When you are ready to connect a custom domain:

1. In Vercel, go to **Project → Settings → Domains**.
2. Add the apex domain and `www` (for example `clientdomain.com` and `www.clientdomain.com`).
3. Vercel will show which DNS records to add at your DNS provider (Loopia).

You may safely update:

- **A records** (for apex)
- **CNAME records** (for `www` and other subdomains)

You must **not** touch:

- **MX records** — these control email delivery and must remain unchanged so email keeps working.


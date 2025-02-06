# SaaS Starter Kit

A production-ready foundation for building SaaS applications with modern technologies.

## Features

- 🔐 Authentication with Clerk.dev
- 💳 Payments & Subscriptions with Stripe
- 📧 Email templates with React Email + Resend
- 📊 Admin Dashboard with Tremor
- 🗄️ Database with Neon (Serverless Postgres)
- 🧩 Monorepo architecture with Turborepo
- 🛡️ Security best practices (CSP, rate limiting, secure headers)
- 📦 File storage with Cloudflare R2
- 🧪 Testing with Vitest + Playwright
- 🚀 CI/CD with GitHub Actions

## Tech Stack

**Core**
- Frontend: React + TypeScript + Tailwind CSS
- Backend: Hono.js (Cloudflare Workers)
- Database: Neon (Postgres) + Drizzle ORM
- Hosting: Cloudflare Pages + Workers

**Services**
- Authentication: Clerk.dev
- Payments: Stripe
- Email: Resend + React Email
- Storage: Cloudflare R2
- Monitoring: Sentry + Logflare

**Dev Tools**
- Package Management: JSR
- Monorepo: Turborepo
- Testing: Vitest (Unit) + Playwright (E2E)

## Getting Started

1. Clone repository:
```bash
git clone https://github.com/your-repo/saas-starter.git
cd saas-starter
```

2. Install dependencies:
```bash
jsr install
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Fill in required values
```

4. Run database migrations:
```bash
npm run db:generate
npm run db:migrate
```

5. Start development servers:
```bash
npm run dev
```

## Environment Variables

| Variable                     | Description                     | Required |
|------------------------------|---------------------------------|----------|
| `DATABASE_URL`               | Neon Postgres connection URL    | ✅       |
| `CLERK_SECRET_KEY`           | Clerk.dev API secret            | ✅       |
| `STRIPE_SECRET_KEY`          | Stripe secret key               | ✅       |
| `STRIPE_WEBHOOK_SECRET`      | Stripe webhook secret           | ✅       |
| `RESEND_API_KEY`             | Resend API key                  | ✅       |
| `R2_ACCESS_KEY_ID`           | Cloudflare R2 access key        | ✅       |
| `R2_SECRET_ACCESS_KEY`       | Cloudflare R2 secret key        | ✅       |
| `SENTRY_DSN`                 | Sentry DSN for error tracking   | ✅       |

## Deployment

1. **Cloudflare Workers (Backend)**
```bash
cd apps/backend
npm run build
wrangler deploy
```

2. **Cloudflare Pages (Frontend)**
```bash
cd apps/frontend
npm run build
wrangler pages deploy ./dist
```

## Testing

**Unit Tests (Vitest)**
```bash
npm run test:unit
```

**E2E Tests (Playwright)**
```bash
npm run test:e2e
```

**CI Pipeline**
```bash
npm run test:ci # Runs all tests in CI mode
```

## Project Structure

```
.
├── apps
│   ├── frontend       # React + Vite application
│   └── backend        # Hono.js API server
├── packages
│   ├── db             # Database schema and migrations
│   ├── ui             # Shared UI components (shadcn)
│   ├── config         # Shared ESLint/Tailwind config
│   └── email          # React Email templates
└── turbo.json         # Turborepo configuration
```

## Security Practices

- ✅ Content Security Policy (CSP) headers
- ✅ Rate limiting with Cloudflare KV
- ✅ Secure HTTP headers
- ✅ JWT verification with Clerk sessions
- ✅ Stripe webhook signature verification
- ✅ Environment validation with Zod
- ✅ Error sanitization and logging

## Monitoring

- **Error Tracking:** Sentry integration
- **Logging:** Logflare pipeline
- **Performance:** Cloudflare Analytics
- **Uptime:** Cloudflare Status Monitoring


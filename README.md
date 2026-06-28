# Medico-Legal Pro

Production platform for medico-legal case intake, expert appointments, attorney billing, and report management. Built with **React + Vite + TypeScript** on the frontend and **Supabase** (Postgres + RLS + Edge Functions) on the backend.

- Preview: https://id-preview--d782484e-4dde-4502-9b59-ffe68f3de0a7.lovable.app
- Production: https://kamedico-legal.co.za
- Lovable project: https://lovable.dev/projects/d782484e-4dde-4502-9b59-ffe68f3de0a7

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Local development](#local-development)
3. [Project structure](#project-structure)
4. [Containerized & cloud deployment](#containerized--cloud-deployment)
5. [Health checks](#health-checks)
6. [Edge function API](#edge-function-api)
7. [Error handling contract](#error-handling-contract)
8. [Security & compliance](#security--compliance)
9. [Testing](#testing)

---

## Tech stack

| Layer        | Technology                                                  |
|--------------|-------------------------------------------------------------|
| Frontend     | React 18, Vite 5, TypeScript 5, Tailwind CSS, shadcn/ui     |
| State / data | TanStack Query, Supabase JS client, typed query helpers     |
| Backend      | Supabase Postgres (RLS), Supabase Edge Functions (Deno)     |
| Email        | Resend (`supabase/functions/_shared/email.ts`)              |
| AI           | Lovable AI Gateway (Gemini / GPT) for proofreading + intake |
| Container    | Docker (`oven/bun` build → `nginx:alpine` runtime)          |
| Orchestrate  | Kubernetes manifests + Cloud Run / Fly.io / Render configs  |

Node.js LTS is required for local development (≥ 20).

## Local development

```sh
# Install dependencies
npm i        # or: bun install

# Start the dev server (Vite, hot reload)
npm run dev

# Type-check + production build
npm run build

# Lint
npm run lint

# Unit tests (vitest)
npx vitest run
```

The app reads Supabase config from `.env` (publishable anon key only — service role keys live in Supabase Edge Function secrets).

## Project structure

```
src/
  components/        Reusable UI (shadcn-derived)
  contexts/          App-level providers (sync, auth)
  hooks/             Data + permission hooks (TanStack Query)
  pages/             Route components (admin, attorney-portal, expert-portal)
  utils/             Pure helpers (dates, IDs, PDF branding, typed Supabase)
  integrations/      Supabase client
supabase/
  functions/         Edge functions (Deno) — see API below
  functions/_shared/ Shared CORS, errors, email helpers
docs/
  openapi.yaml       OpenAPI 3.1 spec for every edge function
k8s/                 Kubernetes Deployment + Service + Ingress + HPA
deploy/              Cloud Run service manifest
fly.toml             Fly.io config
render.yaml          Render.com config
Dockerfile           Multi-stage container build
nginx.conf           SPA routing + healthz + cache headers
```

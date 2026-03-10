# Up Banking App

A personal finance dashboard built on top of the [Up Banking API](https://developer.up.com.au). View account balances and transaction history in one place.

## Stack

- **Frontend:** React 19, Vite, MUI, TanStack Query, React Router
- **Backend (BFF):** NestJS — proxies requests to the Up API and handles auth

## Getting started

### Prerequisites

- Node.js 22+
- An [Up API token](https://api.up.com.au/getting_started)

### Backend

```bash
cd backend
cp .env.example .env   # add your UP_API_KEY
npm install
npm run start:dev
```

Runs on `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## Project structure

```
banking-app/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI pipeline
├── backend/                # NestJS BFF
│   └── src/
│       ├── accounts/
│       ├── transactions/
│       └── up-api/
└── frontend/               # React + Vite
    └── src/
        ├── api/
        ├── components/
        ├── pages/
        └── utils/
```

## Environment variables

### Backend

| Variable | Description |
|---|---|
| `UP_API_KEY` | Your Up Banking personal access token |
| `UP_API_BASE_URL` | Up API base URL (`https://api.up.com.au/api/v1`) |
| `PORT` | Port to run on (default: `3001`) |
| `ALLOWED_ORIGIN` | Frontend URL to allow CORS from (default: `http://localhost:5173`) |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (default: `http://localhost:3001/api`) |

> **Note:** `VITE_` variables are baked into the bundle at build time, not read at runtime.

## Deployment

The app is deployed as two separate services:

- **Frontend** → [Vercel](https://vercel.com) — serves the static Vite build via CDN
- **Backend** → [Render](https://render.com) — runs the NestJS server

### How they connect

The frontend is configured with the backend's public Render URL via `VITE_API_URL` in Vercel's environment settings. The backend is configured with the frontend's public Vercel URL via `ALLOWED_ORIGIN` in Render's environment settings (required for CORS).

### Request flow

```
Browser → Vercel (static React app)
        → React calls backend API
        → Render (NestJS) checks CORS, proxies to Up Banking API
        → data returned to browser
```

## CI/CD

GitHub Actions runs on every push to `main`:

- **Backend tests** — installs deps and runs Jest
- **Frontend build** — installs deps and runs `vite build`

Both jobs run in parallel. Render and Vercel each auto-deploy on push to `main` independently of CI.

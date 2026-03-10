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
├── backend/        # NestJS BFF
│   └── src/
│       ├── accounts/
│       ├── transactions/
│       └── up-api/
└── frontend/       # React + Vite
    └── src/
        ├── api/
        ├── components/
        ├── pages/
        └── utils/
```

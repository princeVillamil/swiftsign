# swiftsign App

An e-signing application built with **Bun + ElysiaJS** (backend) and **Vite + React + TypeScript** (frontend).

## Quick Start

```bash
# 1. Install deps (from repo root)
cd backend && bun install
cd ../frontend && bun install

# 2. Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Start both servers
#    Terminal A — backend (http://localhost:3000)
cd backend && bun run dev

#    Terminal B — frontend (http://localhost:5173)
cd frontend && bun run dev
```

## Project Structure

```
esign-app/
├── backend/                   # Bun + ElysiaJS API
│   ├── src/
│   │   ├── index.ts           # Server entry
│   │   ├── routes/
│   │   │   ├── documents.ts   # Upload, list, download
│   │   │   └── signatures.ts  # Sign submission
│   │   ├── services/          # Business logic (to be added)
│   │   ├── middleware/        # Auth, error handling (to be added)
│   │   └── utils/             # Helpers (to be added)
│   ├── tests/                 # Bun test files
│   └── .env.example
│
├── frontend/                  # Vite + React + TS
│   ├── src/
│   │   ├── api/               # Axios client + typed helpers
│   │   ├── components/        # Shared UI components (to be added)
│   │   ├── hooks/             # React Query hooks (to be added)
│   │   ├── pages/             # Route pages (to be added)
│   │   ├── types/             # Shared TS interfaces
│   │   ├── App.tsx            # Router shell
│   │   └── main.tsx           # React root + providers
│   └── .env.example
│
└── .github/workflows/ci.yml   # GitHub Actions (test + lint)
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /documents | List documents |
| POST | /documents | Upload PDF + request signature |
| GET | /documents/:id | Get document status |
| GET | /documents/:id/download | Download signed PDF |
| POST | /signatures/:documentId | Submit signed document |

Swagger UI: **http://localhost:3000/swagger**

## Running Tests

```bash
cd backend && bun test
```

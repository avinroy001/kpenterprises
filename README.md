# KP Enterprises Website

This repository contains:
- `frontend/` (React + Vite, deployed as static files on Hostinger)
- `backend/` (Node.js + Express + MongoDB API, deploy on Render)

## Local setup

1. Install dependencies:
```bash
npm install
npm --prefix frontend install
npm --prefix backend install
```

2. Create env files:
- `frontend/.env` from `frontend/.env.example`
- `backend/.env` from `backend/.env.example`

3. Add environment values:
- `frontend/.env`
  - `VITE_API_BASE_URL=http://localhost:5000`
- `backend/.env`
  - `PORT=5000`
  - `MONGODB_URI=<your mongo atlas uri>`
  - `FRONTEND_ORIGIN=https://kpenterprises.org,http://localhost:5173`

4. Run apps:
```bash
npm run dev:backend
npm run dev:frontend
```

## Production deployment

### Backend (Render)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGODB_URI` = your Atlas URI
  - `FRONTEND_ORIGIN` = `https://kpenterprises.org`
  - `PORT` = `10000` (or leave unset, Render provides `PORT`)

### Frontend (Hostinger)
- Build frontend:
```bash
npm run build
```
- Upload `frontend/dist` files to Hostinger.
- Set `frontend/.env` before build:
  - `VITE_API_BASE_URL=https://<your-render-backend-url>`

## API endpoints
- `GET /api/health`
- `POST /api/leads`

Payload for `POST /api/leads`:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 90000 00000",
  "message": "Need SEO support"
}
```

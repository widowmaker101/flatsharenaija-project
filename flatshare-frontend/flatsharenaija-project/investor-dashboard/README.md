# FlatshareNaija: Roommate Matching for Nigeria

A full-stack app to connect flatseekers in Naija. Features: User auth, property listings, search by city/budget.

## Tech Stack
- **Frontend**: React + Vite + TypeScript
- **Backend**: FastAPI + SQLAlchemy + SQLite/PostgreSQL
- **Auth**: JWT
- **Deployment**: Vercel (FE) + Render (BE)

## Quick Start

### Prerequisites
- Node.js 18+, Python 3.10+
- PostgreSQL (dev: use SQLite via test.db)

### Backend Setup
1. \`cd api\`
2. \`pip install -r requirements.txt\`
3. \`uvicorn main:app --reload\`
4. Visit [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

### Frontend Setup
1. \`cd flatshare-frontend\`
2. \`npm install\`
3. \`npm run dev\` (proxies to backend)
4. Visit [http://localhost:5173](http://localhost:5173)

## Environment Vars
- \`DATABASE_URL\`: postgres://...
- \`SECRET_KEY\`: For JWT
- See \`.env.example\`

## Features
- User registration/login (JWT)
- Post/search flats (location, price filters)
- Admin reset-password

## Contributing
- Fork, branch, PR to main.
- Run tests: \`pytest\` (BE), \`npm test\` (FE)

## Deployment
- FE: Push to Vercel (auto-detect Vite).
- BE: Deploy to Render (use render.yaml).

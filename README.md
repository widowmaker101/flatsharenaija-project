# FlatshareNaija Project

## Frontend (React + DaisyUI)
Location: /frontend

Run locally:
  cd frontend
  npm install
  npm run dev

Deploy: Vercel
  - Root directory: /frontend
  - Build command: npm run build
  - Output directory: dist

## Backend (FastAPI)
Location: /backend

Run locally:
  cd backend
  pip install -r requirements.txt
  uvicorn main:app --reload

Deploy: Render/Heroku
  - Entry point: backend/main.py
  - Start command: uvicorn main:app --host 0.0.0.0 --port $PORT

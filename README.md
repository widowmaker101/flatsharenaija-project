# Flatshare Naija

Full-stack flat-sharing platform for Nigeria (Lagos, Abuja, etc.)

## Features
- User authentication (register/login/JWT)
- Dynamic navbar (shows Post Flat + Logout + email when logged in)
- Protected routes (e.g. /post-flat requires login)
- Backend listings API protected with token
- Image upload for flats

## Setup

### Backend
cd backend
/opt/anaconda3/bin/python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt]
uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## Tech Stack
- Backend: FastAPI + SQLAlchemy + SQLite
- Frontend: React + Vite + Tailwind + daisyUI + React Router
- Auth: JWT

Enjoy!

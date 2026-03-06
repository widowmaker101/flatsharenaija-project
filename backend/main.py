# main.py
from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import Dict, Any
from dotenv import load_dotenv
load_dotenv()  # Must be before importing routers/auth
import os

# Import routers
from routers import auth, listings
from models import Listing
from database import get_db

# Create FastAPI app
app = FastAPI(
    title="Flatshare Naija API",
    description="Backend API for real estate listings",
    version="0.1.0"
)

# Create static folders and mount them
os.makedirs("static/images", exist_ok=True)
os.makedirs("static/avatars", exist_ok=True)
app.mount("/images", StaticFiles(directory="static/images"), name="images")
app.mount("/avatars", StaticFiles(directory="static/avatars"), name="avatars")

# Include all routers
app.include_router(auth.router)
app.include_router(listings.router)  # ← this loads POST /api/listings

# CORS middleware - allows frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://flatsharenaija-project-vno7.vercel.app",  # add your production domain here later
        "*"  # temporary wildcard
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Flatshare Naija API is running!"}


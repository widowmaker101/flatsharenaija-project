# main.py
from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import Dict, Any
from dotenv import load_dotenv
import os

load_dotenv()  # Must be before importing routers/auth

# Import routers
from routers import auth, listings
from models import Listing
from database import get_db

# Create FastAPI app
app = FastAPI(
    title="Flatshare Naija API",
    description="Backend API for real estate/roommate listings in Nigeria",
    version="0.1.0",
    docs_url="/docs",          # Swagger UI
    redoc_url="/redoc",        # optional ReDoc
    openapi_url="/openapi.json"
)

# Create static folders and mount them
os.makedirs("static/images", exist_ok=True)
os.makedirs("static/avatars", exist_ok=True)
app.mount("/images", StaticFiles(directory="static/images"), name="images")
app.mount("/avatars", StaticFiles(directory="static/avatars"), name="avatars")

# Include all routers
app.include_router(auth.router,prefix="/api/auth", tags=["auth"])
app.include_router(listings.router, prefix="/api/listings", tags=["listings"])  # ← this loads POST /api/listings

# CORS middleware - allows your Vercel frontend + local dev───────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://flatsharenaija-project-vno7.vercel.app",  # add your production domain here later
        "https://flatsharenaija-project.vercel.app",     # if you have custom domain later
        "*"  # temporary wildcard
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,  # cache preflight 10 minutes

)

@app.get("/")
def read_root():
    return {
        "message": "Flatshare Naija API is running!",
        "docs": "/docs",
        "version": app.version
        
    }


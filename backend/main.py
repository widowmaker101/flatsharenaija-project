# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

load_dotenv()

# Import routers
from routers import auth, listings

# Create FastAPI app
app = FastAPI(
    title="Flatshare Naija API",
    description="Backend API for real estate/roommate listings in Nigeria",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Static files
os.makedirs("static/images", exist_ok=True)
os.makedirs("static/avatars", exist_ok=True)
app.mount("/images", StaticFiles(directory="static/images"), name="images")
app.mount("/avatars", StaticFiles(directory="static/avatars"), name="avatars")

# Include routers — NO duplicate prefixes
app.include_router(auth.router)      # ← Fixed: No extra prefix
app.include_router(listings.router)  # Router already has its own prefix

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://flatsharenaija-project-vno7.vercel.app",
        "https://flatsharenaija-project.vercel.app",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,
)

@app.get("/")
def read_root():
    return {
        "message": "Flatshare Naija API is running!",
        "docs": "/docs",
        "version": app.version
    }

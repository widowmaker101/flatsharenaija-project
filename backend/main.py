from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Dict, Any

from backend.models import Listing
from backend.database import get_db

app = FastAPI(
    title="Flatshare Naija API",
    description="Backend API for real estate listings",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Flatshare Naija API is running!"}

@app.get("/api/listings", response_model=Dict[str, Any])
def get_listings(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    total = db.query(Listing).count()
    listings = (
        db.query(Listing)
        .order_by(Listing.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    return {
        "items": listings,
        "total": total,
        "limit": limit,
        "offset": offset,
        "has_more": (offset + limit) < total
    }

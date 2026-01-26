from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Dict, Any

from models import Listing
from database import get_db

router = APIRouter(prefix="/listings", tags=["listings"])

@router.get("/", response_model=Dict[str, Any])
def get_listings(
    limit: int = Query(10, ge=1, le=100, description="Number of listings to return"),
    offset: int = Query(0, ge=0, description="Number of listings to skip"),
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

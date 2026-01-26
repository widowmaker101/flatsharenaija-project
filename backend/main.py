from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

# Import your models and database utilities
from models import Listing               # adjust path if needed
from ..database import get_db              # your DB session dependency

router = APIRouter(prefix="/api", tags=["listings"])

@router.get("/listings", response_model=List[Listing])
def get_listings(
    limit: int = Query(10, ge=1, le=100, description="Number of listings to return"),
    offset: int = Query(0, ge=0, description="Number of listings to skip"),
    db: Session = Depends(get_db)
):
    listings = (
        db.query(Listing)
        .order_by(Listing.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    return listings

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Listing
from .auth import verify_token

router = APIRouter(prefix="/api/listings", tags=["listings"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_listings(db: Session = Depends(get_db), username: str = Depends(verify_token)):
    return db.query(Listing).all()

@router.post("/")
def create_listing(title: str, location: str, price: float, db: Session = Depends(get_db), username: str = Depends(verify_token)):
    listing = Listing(title=title, location=location, price=price)
    db.add(listing)
    db.commit()
    db.refresh(listing)
    return listing

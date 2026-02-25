from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from uuid import uuid4
from datetime import datetime
from jose import jwt, JWTError

from fastapi.security import OAuth2PasswordBearer
from routers.auth import oauth2_scheme, SECRET_KEY, ALGORITHM
from database import get_db
from models import Listing, User
from schemas import ListingOut

router = APIRouter(prefix="/api/listings", tags=["listings"])

@router.get("/", response_model=dict)
async def get_listings(limit: int = 10, db: Session = Depends(get_db)):
    listings = db.query(Listing).limit(limit).all()
    return {
        "items": [ListingOut.from_orm(l) for l in listings],
        "total": len(listings),
        "limit": limit,
        "offset": 0,
        "has_more": False
    }

# FIXED ORDER: /my before /{listing_id}
@router.get("/my", response_model=dict)
async def get_my_listings(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    print("GET /my called - token:", token[:20] + "..." if token else "MISSING")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        print("Decoded email:", email)
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError as e:
        print("JWT error:", str(e))
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        print("User not found for email:", email)
        raise HTTPException(status_code=401, detail="User not found")

    listings = db.query(Listing).filter(Listing.owner_id == user.id).all()
    print(f"Found {len(listings)} listings for user {user.id}")
    return {
        "items": [ListingOut.from_orm(l) for l in listings],
        "total": len(listings)
    }

@router.get("/{listing_id}", response_model=ListingOut)
async def get_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return ListingOut.from_orm(listing)

@router.post("/", response_model=ListingOut)
async def create_listing(
    title: str = Form(...),
    location: str = Form(...),
    price: float = Form(...),
    rooms: int = Form(...),
    description: str = Form(None),
    gender_preference: str = Form(None),
    image: UploadFile = File(None),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    image_url = None
    if image:
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        os.makedirs("static/images", exist_ok=True)
        filename = f"{uuid4()}_{image.filename}"
        file_path = f"static/images/{filename}"
        with open(file_path, "wb") as f:
            f.write(await image.read())
        image_url = f"/images/{filename}"

    new_listing = Listing(
        title=title,
        location=location,
        price=price,
        rooms=rooms,
        description=description,
        gender_preference=gender_preference,
        image_url=image_url,
        owner_id=user.id
    )
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return ListingOut.from_orm(new_listing)

print("Listings router loaded successfully")

@router.delete("/{listing_id}")
async def delete_listing(
    listing_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    if listing.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this listing")

    db.delete(listing)
    db.commit()
    return {"message": "Listing deleted successfully"}


@router.put("/{listing_id}", response_model=ListingOut)
async def update_listing(
    listing_id: int,
    title: str = Form(...),
    location: str = Form(...),
    price: float = Form(...),
    rooms: int = Form(...),
    description: str = Form(None),
    gender_preference: str = Form(None),
    image: UploadFile = File(None),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    if listing.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Update fields
    listing.title = title
    listing.location = location
    listing.price = price
    listing.rooms = rooms
    listing.description = description
    listing.gender_preference = gender_preference

    if image:
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        os.makedirs("static/images", exist_ok=True)
        filename = f"{uuid4()}_{image.filename}"
        file_path = f"static/images/{filename}"
        with open(file_path, "wb") as f:
            f.write(await image.read())
        listing.image_url = f"/images/{filename}"

    db.commit()
    db.refresh(listing)
    return ListingOut.from_orm(listing)



@router.delete("/{listing_id}")
async def delete_listing(
    listing_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    if listing.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this listing")

    db.delete(listing)
    db.commit()
    return {"message": "Listing deleted successfully"}

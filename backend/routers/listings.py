from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File, Query
from sqlalchemy.orm import Session
import os
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import jwt

load_dotenv()

from routers.auth import oauth2_scheme, SECRET_KEY, ALGORITHM
from database import get_db
from models import Listing, User
from schemas import ListingOut

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

print("🚀 Listings router imported with Cloudinary support...")

router = APIRouter(
    prefix="/api/listings", 
    tags=["listings"],
    redirect_slashes=False   # This is important
)

async def upload_image_to_cloudinary(image: UploadFile) -> str | None:
    if not image:
        return None
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    result = cloudinary.uploader.upload(image.file, folder="flatsharenaija/listings")
    return result["secure_url"]

# GET all listings - support both with and without trailing slash
@router.get("/", response_model=dict)
@router.get("", response_model=dict)
async def get_listings(limit: int = Query(10, ge=1, le=100), db: Session = Depends(get_db)):
    print("✅ GET /api/listings called")
    listings = db.query(Listing).limit(limit).all()
    return {
        "items": [ListingOut.from_orm(l) for l in listings],
        "total": len(listings)
    }

# POST create listing - support both with and without trailing slash
@router.post("/", response_model=ListingOut)
@router.post("", response_model=ListingOut)
async def create_listing(
    title: str = Form(...),
    location: str = Form(...),
    price: float = Form(...),
    rooms: int = Form(...),
    description: str = Form(None),
    gender_preference: str = Form(None),
    bathrooms: int = Form(None),
    amenities: str = Form(None),
    furnished_status: str = Form(None),
    service_charge_included: bool = Form(False),
    image: UploadFile = File(None),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    print("✅ POST /api/listings CREATE HANDLER WAS CALLED!")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    image_url = await upload_image_to_cloudinary(image) if image else None

    new_listing = Listing(
        title=title,
        location=location,
        price=price,
        rooms=rooms,
        description=description,
        gender_preference=gender_preference,
        bathrooms=bathrooms,
        amenities=amenities,
        furnished_status=furnished_status,
        service_charge_included=service_charge_included,
        image_url=image_url,
        owner_id=user.id
    )
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return ListingOut.from_orm(new_listing)

# Other routes
@router.get("/my", response_model=dict)
async def get_my_listings(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    listings = db.query(Listing).filter(Listing.owner_id == user.id).all()
    return {"items": [ListingOut.from_orm(l) for l in listings], "total": len(listings)}

@router.get("/{listing_id}", response_model=ListingOut)
async def get_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return ListingOut.from_orm(listing)

print("✅ Listings router loaded successfully")

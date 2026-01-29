from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from models import Listing
import os
from uuid import uuid4

router = APIRouter(prefix="/api/listings", tags=["listings"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

@router.post("/")
async def create_listing(
    title: str,
    location: str,
    price: float,
    rooms: int,
    description: str = None,
    image: UploadFile = File(None),
    token: str = Depends(oauth2_scheme),  # <-- Requires valid JWT
    db: Session = Depends(get_db)
):
    # Optional: decode token to get current user (uncomment when needed)
    # from jose import jwt
    # try:
    #     payload = jwt.decode(token, "your-secret-key-change-this", algorithms=["HS256"])
    #     current_user_email = payload.get("sub")
    # except Exception:
    #     raise HTTPException(status_code=401, detail="Invalid token")

    new_listing = Listing(
        title=title,
        location=location,
        price=price,
        rooms=rooms,
        description=description,
    )

    if image:
        os.makedirs("static/images", exist_ok=True)
        filename = f"{uuid4()}_{image.filename}"
        file_path = f"static/images/{filename}"
        with open(file_path, "wb") as f:
            f.write(await image.read())
        new_listing.image_url = f"/images/{filename}"

    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return new_listing

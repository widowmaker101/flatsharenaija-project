from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ListingBase(BaseModel):
    title: str
    location: str
    price: float
    rooms: int
    bathrooms: Optional[int] = None
    amenities: Optional[str] = None
    images: Optional[str] = None
    is_verified: bool = False
    is_available: bool = True

class ListingCreate(ListingBase):
    pass

class Listing(ListingBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True  # ← enables conversion from SQLAlchemy objects

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ListingOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    location: str
    price: float
    gender_preference: Optional[str] = None
    rooms: int
    bathrooms: Optional[int] = None
    amenities: Optional[str] = None              # comma-separated
    furnished_status: Optional[str] = None
    service_charge_included: bool = False
    image_url: Optional[str] = None
    images: Optional[str] = None                 # comma-separated or JSON
    is_verified: bool = False
    is_available: bool = True
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

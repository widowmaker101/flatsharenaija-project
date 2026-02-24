from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ListingOut(BaseModel):
    id: int
    title: str
    location: str
    price: float
    rooms: int
    description: Optional[str] = None
    gender_preference: Optional[str] = None
    image_url: Optional[str] = None
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True  # allows .from_orm() or model_validate()

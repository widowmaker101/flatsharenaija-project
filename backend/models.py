# models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone_number = Column(String(20), nullable=True)
    name = Column(String, nullable=True)
    role = Column(String, default="user")           # e.g. "user", "admin", "landlord"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    listings = relationship("Listing", back_populates="owner")


class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    location = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    gender_preference = Column(String(20), nullable=True)  # 'male_only', 'female_only', 'any'
    rooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=True)            # added
    amenities = Column(String, nullable=True)             # comma-separated string
    furnished_status = Column(String(50), nullable=True)  # 'furnished', 'semi_furnished', 'unfurnished'
    service_charge_included = Column(Boolean, default=False)
    image_url = Column(String, nullable=True)             # main image
    images = Column(String, nullable=True)                # additional images as comma-separated or JSON
    is_verified = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="listings")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

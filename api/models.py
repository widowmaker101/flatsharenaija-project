from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    location = Column(String, index=True)
    price = Column(Float)
    availability = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="listings")

User.listings = relationship("Listing", back_populates="owner")
from sqlalchemy import Column

Listing.image_url = Column(String, nullable=True)
from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

favorites_table = Table(
    "favorites",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("listing_id", Integer, ForeignKey("listings.id"), primary_key=True),
)

User.favorites = relationship("Listing", secondary=favorites_table, backref="favorited_by")
from sqlalchemy import Column, String

# Extend User model with profile fields
User.bio = Column(String, nullable=True)
User.phone = Column(String, nullable=True)
User.preferences = Column(String, nullable=True)

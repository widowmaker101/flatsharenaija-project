from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    images = Column(String)  # store as comma-separated or JSON string

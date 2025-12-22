from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, Date, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DATABASE_URL = "postgresql://user:password@localhost:5432/investordb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    signup_date = Column(Date)
    country = Column(String)

class Revenue(Base):
    __tablename__ = "revenue"
    id = Column(Integer, primary_key=True)
    month = Column(String)
    free = Column(Float)
    paid = Column(Float)
    premium = Column(Float)

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/metrics/users")
def get_user_growth(db: Session = Depends(get_db)):
    # Replace with real aggregation
    return {"months": ["Jan","Feb","Mar"], "signups": [120,250,400]}

@app.get("/metrics/revenue")
def get_revenue(db: Session = Depends(get_db)):
    return {"months": ["Jan","Feb","Mar"], "free":[1000,1200,1500], "paid":[500,800,1200], "premium":[200,400,600]}

@app.get("/metrics/geography")
def get_geo(db: Session = Depends(get_db)):
    return {"labels":["Nigeria","US","UK"], "values":[40,25,15]}

@app.get("/metrics/ops")
def get_ops():
    return {"uptime":"99.9%","deployments":12,"tickets_closed":"95%"}

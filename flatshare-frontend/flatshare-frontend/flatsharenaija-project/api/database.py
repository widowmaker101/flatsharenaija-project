from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from . import models   # <-- import your models here

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Create tables automatically at startup
models.Base.metadata.create_all(bind=engine)

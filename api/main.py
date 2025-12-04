from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Query, Security
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from sqlalchemy import Column, Integer, String, Text, Boolean, TIMESTAMP, create_engine, and_
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from pydantic import BaseModel, Field
from typing import List, Optional
import os, shutil

# ---------------- Database Setup ----------------
SQLALCHEMY_DATABASE_URL = "sqlite:///./db/flatshare.db"
os.makedirs("db", exist_ok=True)
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

# ---------------- Models ----------------
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="tenant", index=True)  # landlord or tenant

class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(Text)
    city = Column(String)
    area = Column(String)
    rent = Column(Integer)
    bedrooms = Column(Integer, default=0)
    bathrooms = Column(Integer, default=0)
    furnished = Column(Boolean, default=False)
    amenities = Column(Text, nullable=True)
    owner_id = Column(Integer, index=True)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP)

class ListingImage(Base):
    __tablename__ = "listing_images"
    id = Column(Integer, primary_key=True)
    listing_id = Column(Integer)
    image_url = Column(String)
    uploaded_at = Column(TIMESTAMP, default=datetime.utcnow)

class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    listing_id = Column(Integer)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer)
    receiver_id = Column(Integer)
    listing_id = Column(Integer)
    content = Column(Text)
    timestamp = Column(TIMESTAMP, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# ---------------- Auth Setup ----------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_password_hash(password): return pwd_context.hash(password)
def verify_password(plain, hashed): return pwd_context.verify(plain, hashed)
def create_access_token(data, expires_delta=None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Security(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None: raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.username == username).first()
    if not user: raise HTTPException(status_code=401, detail="User not found")
    return user

def require_role(user: User, allowed: List[str]):
    if user.role not in allowed:
        raise HTTPException(status_code=403, detail="Insufficient permissions")

# ---------------- FastAPI App ----------------
app = FastAPI()
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ---------------- Schemas ----------------
class RegisterRequest(BaseModel):
    username: str
    password: str
    role: str = Field(default="tenant", pattern="^(tenant|landlord)$")

class ListingCreate(BaseModel):
    title: str
    description: str
    city: str
    area: str
    rent: int = Field(ge=0)
    bedrooms: int = 0
    bathrooms: int = 0
    furnished: bool = False
    amenities: Optional[List[str]] = None

class ListingUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    city: Optional[str]
    area: Optional[str]
    rent: Optional[int] = Field(default=None, ge=0)
    bedrooms: Optional[int]
    bathrooms: Optional[int]
    furnished: Optional[bool]
    amenities: Optional[List[str]]

class FavoriteCreate(BaseModel):
    user_id: int
    listing_id: int

class MessageCreate(BaseModel):
    sender_id: int
    receiver_id: int
    listing_id: int
    content: str

# ---------------- Helpers ----------------
def amenities_to_text(items):
    return ",".join(sorted(set(a.strip().lower() for a in items))) if items else None

def listing_to_dict(l):
    return {
        "id": l.id,
        "title": l.title,
        "description": l.description,
        "city": l.city,
        "area": l.area,
        "rent": l.rent,
        "bedrooms": l.bedrooms,
        "bathrooms": l.bathrooms,
        "furnished": l.furnished,
        "amenities": l.amenities.split(",") if l.amenities else [],
        "owner_id": l.owner_id,
        "created_at": l.created_at,
        "updated_at": l.updated_at,
    }

# ---------------- Routes ----------------
@app.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == req.username).first():
        raise HTTPException(status_code=400, detail="Username exists")
    user = User(username=req.username, password=get_password_hash(req.password), role=req.role)
    db.add(user); db.commit(); db.refresh(user)
    return {"status":"ok","message":f"User {req.username} registered", "role": user.role}

@app.post("/token")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form.username).first()
    if not user or not verify_password(form.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type":"bearer", "role": user.role}

# ---------------- Listings ----------------
@app.post("/listings")
def create_listing(listing: ListingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    require_role(current_user, ["landlord"])
    data = listing.dict(exclude={"amenities"})
    l = Listing(**data, amenities=amenities_to_text(listing.amenities), owner_id=current_user.id)
    db.add(l); db.commit(); db.refresh(l)
    return listing_to_dict(l)

@app.put("/listings/{listing_id}")
def update_listing(listing_id: int, update: ListingUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    require_role(current_user, ["landlord"])
    l = db.query(Listing).filter(Listing.id == listing_id).first()
    if not l: raise HTTPException(status_code=404, detail="Listing not found")
    if l.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only modify your own listings")
    data = update.dict(exclude_unset=True)
    if "amenities" in data: l.amenities = amenities_to_text(data.pop("amenities"))
    for k,v in data.items(): setattr(l,k,v)
    l.updated_at = datetime.utcnow()
    db.commit(); db.refresh(l)
    return listing_to_dict(l)

@app.delete("/listings/{listing_id}")
def delete_listing(listing_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    require_role(current_user, ["landlord"])
    l = db.query(Listing).filter(Listing.id == listing_id).first()
    if not l: raise HTTPException(status_code=404, detail="Listing not found")
    if l.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete your own listings")
    for img in db.query(ListingImage).filter(ListingImage.listing_id == listing_id).all():
        path = img.image_url.lstrip("/")
        if os.path.exists(path):
            try: os.remove(path)
            except Exception: pass
        db.delete(img)
    db.delete(l); db.commit()
    return {"status":"ok","message":f"Listing {listing_id} deleted"}

# ---------------- Gallery ----------------
@app.post("/listings/{listing_id}/upload_images")
def upload_images(listing_id: int, files: List[UploadFile] = File(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    require_role(current_user, ["landlord"])
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing: raise HTTPException(status_code=404, detail="Listing not found")
    if listing.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only add images to your own listings")
    urls=[]
    for f in files:
        fname=f"{listing_id}_{f.filename.replace(' ','_')}"
        path=os.path.join("uploads",fname)
        with open(path,"wb") as buffer: shutil.copyfileobj(f.file,buffer)
        img=ListingImage(listing_id=listing_id,image_url=f"/uploads/{fname}")
        db.add(img); urls.append(img.image_url)
    db.commit()
    return {"status":"ok","images":urls}

@app.get("/listings/{listing_id}/images")
def get_images(listing_id:int,db:Session=Depends(get_db)):
    imgs = db.query(ListingImage).filter(ListingImage.listing_id==listing_id).all()
    return [{"id":i.id,"listing_id":i.listing_id,"image_url":i.image_url,"uploaded_at":i.uploaded_at} for i in imgs]

# ---------------- Search ----------------
@app.get("/search")
def search(
    db: Session = Depends(get_db),
    city: Optional[str] = None,
    area: Optional[str] = None,
    min_rent: Optional[int] = Query(default=None, ge=0),
    max_rent: Optional[int] = Query(default=None, ge=0),
    bedrooms: Optional[int] = Query(default=None, ge=0),
    bathrooms: Optional[int] = Query(default=None, ge=0),
    furnished: Optional[bool] = None,
    amenities: Optional[List[str]] = Query(default=None),
    sort_by: Optional[str] = Query(default="created_at"),
    order: Optional[str] = Query(default="desc"),
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    q = db.query(Listing)
    if city: q = q.filter(Listing.city == city)
    if area: q = q.filter(Listing.area == area)
    if min_rent is not None: q = q.filter(Listing.rent >= min_rent)
    if max_rent is not None: q = q.filter(Listing.rent <= max_rent)
    if bedrooms is not None: q = q.filter(Listing.bedrooms >= bedrooms)
    if bathrooms is not None: q = q.filter(Listing.bathrooms >= bathrooms)
    if furnished is not None: q = q.filter(Listing.furnished == furnished)
    if amenities:
        for a in [x.strip().lower() for x in amenities if x.strip()]:
            q = q.filter(Listing.amenities.like(f"%{a}%"))
    sort_col = getattr(Listing, sort_by, Listing.created_at)
    q = q.order_by(sort_col.asc() if order == "asc" else sort_col.desc())
    total = q.count()
    items = q.offset(offset).limit(limit).all()
    return {"total": total, "results": [listing_to_dict(l) for l in items]}

# ---------------- Moderation ----------------
@app.post("/moderate/{listing_id}")
def moderate_listing(listing_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    require_role(current_user, ["landlord"])
    l = db.query(Listing).filter(Listing.id == listing_id).first()
    if not l: raise HTTPException(status_code=404, detail="Listing not found")
    if l.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only moderate your own listings")
    return {"status": "approved", "listing_id": listing_id}

# ---------------- Favorites ----------------
@app.post("/favorites")
def add_favorite(fav: FavoriteCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    require_role(current_user, ["tenant"])
    if current_user.id != fav.user_id:
        raise HTTPException(status_code=403, detail="You can only favorite as yourself")
    existing = db.query(Favorite).filter(and_(Favorite.user_id == fav.user_id, Favorite.listing_id == fav.listing_id)).first()
    if existing: return {"status": "ok", "message": "Already favorited"}
    f = Favorite(user_id=fav.user_id, listing_id=fav.listing_id)
    db.add(f); db.commit(); db.refresh(f)
    return {"status": "ok", "favorite_id": f.id}

@app.get("/favorites/{user_id}")
def get_favorites(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="You can only view your own favorites")
    favs = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    return [{"id": f.id, "user_id": f.user_id, "listing_id": f.listing_id, "created_at": f.created_at} for f in favs]

# ---------------- Messaging ----------------
@app.post("/messages")

def send_message(msg: MessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Ensure the sender is the current user
    if current_user.id != msg.sender_id:
        raise HTTPException(status_code=403, detail="You can only send messages as yourself")
    # Validate receiver exists
    receiver = db.query(User).filter(User.id == msg.receiver_id).first()
    if not receiver:
        raise HTTPException(status_code=404, detail="Receiver not found")
    # Validate listing exists
    listing = db.query(Listing).filter(Listing.id == msg.listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    m = Message(**msg.dict())
    db.add(m)
    db.commit()
    db.refresh(m)
    return {"status": "ok", "message_id": m.id}

@app.get("/messages/{listing_id}")
def get_messages(listing_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    msgs = db.query(Message).filter(Message.listing_id == listing_id).order_by(Message.timestamp).all()
    return [
        {
            "id": m.id,
            "sender_id": m.sender_id,
            "receiver_id": m.receiver_id,
            "listing_id": m.listing_id,
            "content": m.content,
            "timestamp": m.timestamp,
        }
        for m in msgs
    ]

# ---------------- Dev Utility: Reset DB ----------------
@app.post("/dev/reset_db")
def dev_reset_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    return {"status": "ok", "message": "Database reset complete"}

# routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models import User
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
import os
from uuid import uuid4

router = APIRouter(prefix="/api/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not set in environment variables!")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

class RegisterRequest(BaseModel):
    name: str
    email: str
    phone_number: str | None = None
    password: str

@router.post("/register")
async def register(request: RegisterRequest, db: Session = Depends(get_db)):
    print("Signup payload received:", request.dict(exclude={"password"}))

    if db.query(User).filter(User.email == request.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(request.password)
    new_user = User(
        name=request.name,
        email=request.email,
        phone_number=request.phone_number,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    print(f"Login attempt: username={form_data.username}")

    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        print("User not found")
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user.hashed_password):
        print("Password incorrect")
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/avatar")
async def upload_avatar(
    avatar: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError as e:
        print(f"JWT decode error: {str(e)}")
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception

    if not avatar.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")

    os.makedirs("static/avatars", exist_ok=True)
    filename = f"{uuid4()}_{avatar.filename}"
    file_path = f"static/avatars/{filename}"
    with open(file_path, "wb") as f:
        f.write(await avatar.read())

    avatar_url = f"/avatars/{filename}"
    user.avatar_url = avatar_url
    db.commit()
    db.refresh(user)

    return {"avatar_url": avatar_url}

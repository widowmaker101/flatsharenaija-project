from fastapi import FastAPI, Form, Depends, HTTPException
from sqlalchemy.orm import Session
import logging
from datetime import datetime, timedelta
from jose import jwt

import models
import database
from auth import verify_password
from api.login import get_password_hash, get_current_user

# --- JWT setup ---
SECRET_KEY = "super-secret-key"   # change to something secure
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- FastAPI app ---
app = FastAPI()
logger = logging.getLogger("uvicorn")

# --- Login route ---
@app.post("/login")
def login(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(database.get_db)
):
    logger.info(f"Login attempt for {email}")
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        logger.warning("No user found")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(password, user.hashed_password):
        logger.warning("Password verification failed")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email})
    logger.info("Login successful")
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users")
def list_users(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    users = db.query(models.User).all()
    return [{"email": u.email, "role": u.role} for u in users]

# --- Reset password route ---
from pydantic import BaseModel

class ResetPasswordRequest(BaseModel):
    email: str
    new_password: str

@app.post("/reset-password")
def reset_password(
    email: str,
    new_password: str,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_password = get_password_hash(new_password)
    db.commit()
    return {"message": f"Password reset for {email}"}

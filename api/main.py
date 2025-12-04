from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FlatshareNaija backend is live!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
from fastapi import Depends, HTTPException, status, Form
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from auth import get_password_hash, verify_password, create_access_token

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup")
def signup(username: str = Form(...), email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = get_password_hash(password)
    new_user = User(username=username, email=email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

@app.post("/login")
def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

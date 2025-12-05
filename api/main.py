from fastapi import FastAPI, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from api.auth import verify_password
from . import models, database
import logging

app = FastAPI()
logger = logging.getLogger("uvicorn")

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
    logger.info("Login successful")
    return {"access_token": "dummy-token", "token_type": "bearer"}

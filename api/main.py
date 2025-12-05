from fastapi import FastAPI, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from api.auth import verify_password
from . import models, database

app = FastAPI()

@app.post("/login")
def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": "dummy-token", "token_type": "bearer"}
# force redeploy with Passlib bcrypt

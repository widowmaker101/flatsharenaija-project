from fastapi import FastAPI
from . import auth, listings
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(listings.router)

from prometheus_fastapi_instrumentator import Instrumentator

@app.on_event("startup")
async def startup_event():
    Instrumentator().instrument(app).expose(app)

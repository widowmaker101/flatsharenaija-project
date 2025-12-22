from fastapi import FastAPI
from . import login

app = FastAPI()

app.include_router(login.router)

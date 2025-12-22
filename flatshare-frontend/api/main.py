from fastapi import FastAPI
from . import login

app = FastAPI()

# include your login router
app.include_router(login.router)

# root route
@app.get("/")
def root():
    return {"message": "Hello World"}

# listings route
@app.get("/api/listings")
def get_listings():
    return [
        {"id": 1, "title": "2 Bedroom Apartment", "price": 50000},
        {"id": 2, "title": "Studio Flat", "price": 30000}
    ]

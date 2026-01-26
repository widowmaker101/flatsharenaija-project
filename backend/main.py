from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import the listings router (now that we created routers/listings.py)
from routers.listings import router as listings_router

app = FastAPI(
    title="Flatshare Naija API",
    description="Backend API for real estate listings",
    version="0.1.0"
)

# Allow CORS so frontend (localhost / Vercel) can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the listings router under /api
app.include_router(listings_router, prefix="/api")

# Simple test endpoint
@app.get("/")
def read_root():
    return {"message": "Flatshare Naija API is running!"}

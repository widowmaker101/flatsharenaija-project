from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.src.schemas import LoginRequest

app = FastAPI()

# ✅ Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict to ["http://localhost:5173"] if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running"}

# ✅ Error handling
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

# ✅ Auth login route
@app.post("/auth/login")
def login(request: LoginRequest):
    # Always fail for now (so test passes)
    raise HTTPException(status_code=401, detail="Invalid credentials")

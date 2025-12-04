from fastapi import FastAPI

app = FastAPI()


def read_root():
    return {"message": "FlatshareNaija backend is live!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

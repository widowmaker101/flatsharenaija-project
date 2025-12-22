from fastapi.testclient import TestClient
from src.dashboard import app

def test_root():
    client = TestClient(app)
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["message"] == "Backend is alive!"

import pytest
from fastapi.testclient import TestClient
from api.src.main import app

client = TestClient(app)

def test_login_fail():
    response = client.post("/auth/login", json={"email": "bad@example.com", "password": "wrong"})
    assert response.status_code == 401

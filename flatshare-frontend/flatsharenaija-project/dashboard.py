from fastapi import FastAPI

app = FastAPI()

@app.get("/metrics/users")
def get_user_growth():
    return {"months": ["Jan","Feb","Mar","Apr"], "signups": [120, 250, 400, 600]}

@app.get("/metrics/revenue")
def get_revenue():
    return {
        "months": ["Jan","Feb","Mar","Apr"],
        "free": [1000, 1200, 1500, 1800],
        "paid": [500, 800, 1200, 1600],
        "premium": [200, 400, 600, 900]
    }

@app.get("/metrics/geography")
def get_geography():
    return {"Nigeria": 40, "US": 25, "UK": 15, "Canada": 10, "Kenya": 10}

@app.get("/metrics/ops")
def get_ops():
    return {"uptime": "99.9%", "deployments": 12, "tickets_closed": "95%"}

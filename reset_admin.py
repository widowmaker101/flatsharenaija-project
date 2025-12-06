from api import database, models
from api.login import get_password_hash

db = database.SessionLocal()
user = db.query(models.User).filter(models.User.email=="charles@example.com").first()

if user:
    user.role = "admin"
    user.hashed_password = get_password_hash("admin123")  # reset to known password
    db.commit()
    print("Password reset and role updated for charles@example.com")
else:
    print("User not found")

import bcrypt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a bcrypt hash.
    """
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

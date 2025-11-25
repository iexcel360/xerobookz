"""JWT utilities"""

import jwt
from typing import Optional, Dict, Any
from datetime import datetime, timedelta
import os


JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24


def encode_jwt(
    payload: Dict[str, Any],
    expires_in: Optional[timedelta] = None
) -> str:
    """Encode JWT token"""
    if expires_in is None:
        expires_in = timedelta(hours=JWT_EXPIRATION_HOURS)
    
    payload["exp"] = datetime.utcnow() + expires_in
    payload["iat"] = datetime.utcnow()
    
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_jwt(token: str) -> Optional[Dict[str, Any]]:
    """Decode JWT token"""
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify and decode JWT token"""
    return decode_jwt(token)


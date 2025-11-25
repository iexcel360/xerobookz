"""Redis connection utilities"""

import redis
from typing import Optional
import os

REDIS_URI = os.getenv("REDIS_URI", "redis://localhost:6379/0")

_redis_client: Optional[redis.Redis] = None


def get_redis_client() -> redis.Redis:
    """Get Redis client (singleton)"""
    global _redis_client
    if _redis_client is None:
        _redis_client = redis.from_url(REDIS_URI, decode_responses=True)
    return _redis_client


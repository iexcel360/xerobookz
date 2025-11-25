"""MongoDB connection utilities"""

from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "xerobookz")

_client: Optional[AsyncIOMotorClient] = None


def get_mongo_client() -> AsyncIOMotorClient:
    """Get MongoDB client (singleton)"""
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(MONGO_URI)
    return _client


def get_mongo_db():
    """Get MongoDB database"""
    client = get_mongo_client()
    return client[MONGO_DB_NAME]


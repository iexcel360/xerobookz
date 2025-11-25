"""Configuration for user-service"""

import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SERVICE_NAME: str = "user-service"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    POSTGRES_URI: str = os.getenv("POSTGRES_URI", "postgresql://user:password@localhost:5432/xerobookz")
    REDIS_URI: str = os.getenv("REDIS_URI", "redis://localhost:6379/0")
    RABBITMQ_URI: str = os.getenv("RABBITMQ_URI", "amqp://guest:guest@localhost:5672/")
    TENANT_HEADER: str = os.getenv("TENANT_HEADER", "X-Tenant-ID")
    
    class Config:
        env_file = ".env"


settings = Settings()


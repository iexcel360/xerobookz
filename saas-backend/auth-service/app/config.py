"""Configuration for auth-service"""

import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""
    
    # Service
    SERVICE_NAME: str = "auth-service"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Database
    POSTGRES_URI: str = os.getenv("POSTGRES_URI", "postgresql://user:password@localhost:5432/xerobookz")
    
    # Redis
    REDIS_URI: str = os.getenv("REDIS_URI", "redis://localhost:6379/0")
    
    # RabbitMQ
    RABBITMQ_URI: str = os.getenv("RABBITMQ_URI", "amqp://guest:guest@localhost:5672/")
    
    # JWT
    JWT_SECRET: str = os.getenv("JWT_SECRET", "change-me-in-production")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = int(os.getenv("JWT_EXPIRATION_HOURS", "24"))
    
    # Multi-tenancy
    TENANT_HEADER: str = os.getenv("TENANT_HEADER", "X-Tenant-ID")
    
    class Config:
        env_file = ".env"


settings = Settings()


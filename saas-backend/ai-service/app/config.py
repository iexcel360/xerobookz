"""Configuration for ai-service"""

import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SERVICE_NAME: str = "ai-service"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    POSTGRES_URI: str = os.getenv("POSTGRES_URI", "postgresql://user:password@localhost:5432/xerobookz")
    REDIS_URI: str = os.getenv("REDIS_URI", "redis://localhost:6379/0")
    RABBITMQ_URI: str = os.getenv("RABBITMQ_URI", "amqp://guest:guest@localhost:5672/")
    TENANT_HEADER: str = os.getenv("TENANT_HEADER", "X-Tenant-ID")
    
    # AI Provider Configuration
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")  # Cost-effective default
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    ANTHROPIC_MODEL: str = os.getenv("ANTHROPIC_MODEL", "claude-3-haiku-20240307")
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "openai")  # openai or anthropic
    
    # OCR Configuration
    USE_OCR: bool = os.getenv("USE_OCR", "True").lower() == "true"
    OCR_PROVIDER: str = os.getenv("OCR_PROVIDER", "openai")  # openai, tesseract, or google
    
    # Rate Limiting
    AI_RATE_LIMIT: int = int(os.getenv("AI_RATE_LIMIT", "100"))  # Requests per minute
    
    class Config:
        env_file = ".env"


settings = Settings()


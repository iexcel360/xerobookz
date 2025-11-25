"""Shared error classes"""

from .exceptions import (
    XeroBookzException,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    TenantError,
)

__all__ = [
    "XeroBookzException",
    "ValidationError",
    "NotFoundError",
    "UnauthorizedError",
    "ForbiddenError",
    "TenantError",
]


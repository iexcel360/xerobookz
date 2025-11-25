"""Standard API response schemas"""

from pydantic import BaseModel, Field
from typing import Optional, Any, Generic, TypeVar
from uuid import UUID

T = TypeVar("T")


class ErrorDetail(BaseModel):
    """Error detail structure"""
    
    code: str = Field(..., description="Error code")
    details: Optional[str] = Field(None, description="Error details")
    field: Optional[str] = Field(None, description="Field name if validation error")


class APIResponse(BaseModel, Generic[T]):
    """Standard API response format"""
    
    success: bool = Field(..., description="Whether the request was successful")
    message: Optional[str] = Field(None, description="Response message")
    data: Optional[T] = Field(None, description="Response data")
    error: Optional[ErrorDetail] = Field(None, description="Error information")
    
    @classmethod
    def success_response(cls, data: T = None, message: str = "Success") -> "APIResponse[T]":
        """Create a success response"""
        return cls(success=True, message=message, data=data, error=None)
    
    @classmethod
    def error_response(cls, code: str, details: str = None, message: str = "Error") -> "APIResponse[T]":
        """Create an error response"""
        return cls(
            success=False,
            message=message,
            data=None,
            error=ErrorDetail(code=code, details=details)
        )


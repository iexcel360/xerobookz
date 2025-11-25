"""Custom exception classes"""


class XeroBookzException(Exception):
    """Base exception for XeroBookz"""
    
    def __init__(self, message: str, code: str = "GENERAL_ERROR"):
        self.message = message
        self.code = code
        super().__init__(self.message)


class ValidationError(XeroBookzException):
    """Validation error"""
    
    def __init__(self, message: str, field: str = None):
        super().__init__(message, "VALIDATION_ERROR")
        self.field = field


class NotFoundError(XeroBookzException):
    """Resource not found error"""
    
    def __init__(self, resource: str, identifier: str = None):
        message = f"{resource} not found"
        if identifier:
            message += f": {identifier}"
        super().__init__(message, "NOT_FOUND")


class UnauthorizedError(XeroBookzException):
    """Unauthorized access error"""
    
    def __init__(self, message: str = "Unauthorized"):
        super().__init__(message, "UNAUTHORIZED")


class ForbiddenError(XeroBookzException):
    """Forbidden access error"""
    
    def __init__(self, message: str = "Forbidden"):
        super().__init__(message, "FORBIDDEN")


class TenantError(XeroBookzException):
    """Tenant-related error"""
    
    def __init__(self, message: str = "Tenant error"):
        super().__init__(message, "TENANT_ERROR")


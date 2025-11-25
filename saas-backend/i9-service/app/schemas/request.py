"""Request schemas"""

from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import date


class I9CreateRequest(BaseModel):
    employee_id: UUID


class I9Section1Update(BaseModel):
    last_name: str
    first_name: str
    middle_initial: Optional[str] = None
    other_last_names: Optional[str] = None
    address: str
    date_of_birth: date
    ssn: Optional[str] = None
    citizenship_status: str
    alien_number: Optional[str] = None
    admission_number: Optional[str] = None
    foreign_passport_number: Optional[str] = None
    country_of_issuance: Optional[str] = None
    preparer_translator_used: bool = False
    preparer_name: Optional[str] = None
    preparer_address: Optional[str] = None
    employee_signature: Optional[str] = None
    employee_signature_date: Optional[date] = None


class I9Section2Update(BaseModel):
    document_a: bool = False
    document_b: bool = False
    document_c: bool = False
    document_title: Optional[str] = None
    document_number: Optional[str] = None
    document_issuing_authority: Optional[str] = None
    document_expiration_date: Optional[date] = None
    first_day_of_employment: date
    employer_name: str
    employer_address: str
    employer_city: Optional[str] = None
    employer_state: Optional[str] = None
    employer_zip: Optional[str] = None
    authorized_representative_name: Optional[str] = None
    authorized_representative_title: Optional[str] = None
    authorized_representative_signature: Optional[str] = None
    authorized_representative_signature_date: Optional[date] = None


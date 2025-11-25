"""Repository for i9-service"""

from sqlalchemy.orm import Session
from sqlalchemy import and_
from uuid import UUID
from typing import Optional

from ..models.db_models import I9Form, I9Section1, I9Section2
from ..schemas.request import I9Section1Update, I9Section2Update


class I9Repository:
    """I-9 repository"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_i9_form(
        self,
        employee_id: UUID,
        tenant_id: UUID
    ) -> I9Form:
        """Create I-9 form"""
        i9_form = I9Form(
            tenant_id=tenant_id,
            employee_id=employee_id,
            status="draft"
        )
        self.db.add(i9_form)
        self.db.commit()
        self.db.refresh(i9_form)
        return i9_form
    
    def get_i9_form(
        self,
        i9_id: UUID,
        tenant_id: UUID
    ) -> Optional[I9Form]:
        """Get I-9 form"""
        return self.db.query(I9Form).filter(
            and_(
                I9Form.id == i9_id,
                I9Form.tenant_id == tenant_id
            )
        ).first()
    
    def update_section1(
        self,
        i9_id: UUID,
        data: I9Section1Update,
        tenant_id: UUID
    ) -> Optional[I9Form]:
        """Update Section 1"""
        i9_form = self.get_i9_form(i9_id, tenant_id)
        if not i9_form:
            return None
        
        # Get or create section1
        section1 = self.db.query(I9Section1).filter(
            I9Section1.i9_form_id == i9_id
        ).first()
        
        if not section1:
            section1 = I9Section1(
                tenant_id=tenant_id,
                i9_form_id=i9_id,
                **data.model_dump()
            )
            self.db.add(section1)
        else:
            for key, value in data.model_dump().items():
                setattr(section1, key, value)
        
        self.db.commit()
        self.db.refresh(i9_form)
        return i9_form
    
    def update_section2(
        self,
        i9_id: UUID,
        data: I9Section2Update,
        tenant_id: UUID
    ) -> Optional[I9Form]:
        """Update Section 2"""
        i9_form = self.get_i9_form(i9_id, tenant_id)
        if not i9_form:
            return None
        
        # Get or create section2
        section2 = self.db.query(I9Section2).filter(
            I9Section2.i9_form_id == i9_id
        ).first()
        
        if not section2:
            section2 = I9Section2(
                tenant_id=tenant_id,
                i9_form_id=i9_id,
                **data.model_dump()
            )
            self.db.add(section2)
        else:
            for key, value in data.model_dump().items():
                setattr(section2, key, value)
        
        self.db.commit()
        self.db.refresh(i9_form)
        return i9_form

